use std::collections::HashMap;

/// Deterministic signed fixed-point bicubic resize for RGBA8 (alpha assumed 255).
/// - No floating point (bitwise identical across native/wasm).
/// - Separable convolution with fixed-point weights.
/// - Bicubic kernel: Keys/Catmull-Rom with a = -0.5 (support 2).
/// - For downscaling, widens kernel (anti-alias): evaluate kernel(x/scale)/scale,
///   but caps support radius to avoid excessive blur and remainder artifacts.
///
/// Input/output: tightly packed RGBA bytes, row-major.
/// Output alpha is always set to 255.
pub struct BicubicResizerFixed {
    // Cache tap tables per axis (src_len, dst_len).
    x_cache: HashMap<(usize, usize), TapTable>,
    y_cache: HashMap<(usize, usize), TapTable>,

    // Reused temp buffer: horizontal intermediate [src_h][dst_w][3] in Q14.
    // Length = src_h * dst_w * 3.
    interm: Vec<i32>,
}

impl Default for BicubicResizerFixed {
    fn default() -> Self {
        Self {
            x_cache: HashMap::new(),
            y_cache: HashMap::new(),
            interm: Vec::new(),
        }
    }
}

impl BicubicResizerFixed {
    pub fn new() -> Self {
        Self::default()
    }

    /// Resize RGBA8 -> RGBA8. Output alpha is set to 255.
    pub fn resize(
        &mut self,
        src_rgba: &[u8],
        src_w: usize,
        src_h: usize,
        dst_w: usize,
        dst_h: usize,
    ) -> Vec<u8> {
        assert!(src_w > 0 && src_h > 0 && dst_w > 0 && dst_h > 0);
        assert_eq!(src_rgba.len(), src_w * src_h * 4);

        // Fixed-point formats:
        // - Positions/scales: Q16 (1.0 == 1<<16)
        // - Weights: Q14 (sum == 1<<14)
        // - Intermediate horizontal results: Q14 (pixel*weight summed)
        // - Final vertical sum: Q28 (Q14 * Q14)
        const QW: i32 = 14;

        // Taps cached per axis.
        let x_table = self
            .x_cache
            .entry((src_w, dst_w))
            .or_insert_with(|| TapTable::precompute_axis(src_w, dst_w))
            as *const TapTable; // avoid borrow issues across passes
        let y_table = self
            .y_cache
            .entry((src_h, dst_h))
            .or_insert_with(|| TapTable::precompute_axis(src_h, dst_h))
            as *const TapTable;

        // Reuse intermediate buffer.
        let need_interm = src_h * dst_w * 3;
        if self.interm.len() < need_interm {
            self.interm.resize(need_interm, 0);
        }
        let interm = &mut self.interm[..need_interm];

        // Horizontal pass: src_h rows -> interm[src_h][dst_w][3] in Q14.
        // SAFETY: x_table points to a stable entry in self.x_cache for this call.
        let x_table = unsafe { &*x_table };

        for y in 0..src_h {
            let src_row = &src_rgba[y * src_w * 4..(y + 1) * src_w * 4];

            for x_out in 0..dst_w {
                let (t0, t1) = x_table.range(x_out);

                let mut acc_r: i64 = 0;
                let mut acc_g: i64 = 0;
                let mut acc_b: i64 = 0;

                for t in &x_table.taps[t0..t1] {
                    let p = (t.idx as usize) * 4;
                    let r = src_row[p] as i64;
                    let g = src_row[p + 1] as i64;
                    let b = src_row[p + 2] as i64;
                    let ww = t.w as i64; // Q14 signed

                    acc_r += r * ww; // Q14
                    acc_g += g * ww;
                    acc_b += b * ww;
                }

                let base = (y * dst_w + x_out) * 3;
                interm[base] = acc_r as i32;
                interm[base + 1] = acc_g as i32;
                interm[base + 2] = acc_b as i32;
            }
        }

        // Vertical pass: interm -> dst in Q28, then round to u8.
        // SAFETY: y_table points to a stable entry in self.y_cache for this call.
        let y_table = unsafe { &*y_table };

        let mut dst: Vec<u8> = vec![0u8; dst_w * dst_h * 4];

        for y_out in 0..dst_h {
            let (t0, t1) = y_table.range(y_out);
            let y_taps = &y_table.taps[t0..t1];

            for x_out in 0..dst_w {
                let mut acc_r: i64 = 0;
                let mut acc_g: i64 = 0;
                let mut acc_b: i64 = 0;

                for t in y_taps {
                    let base = (t.idx as usize * dst_w + x_out) * 3;
                    let r = interm[base] as i64; // Q14
                    let g = interm[base + 1] as i64;
                    let b = interm[base + 2] as i64;
                    let ww = t.w as i64; // Q14

                    acc_r += r * ww; // Q28
                    acc_g += g * ww;
                    acc_b += b * ww;
                }

                // Q28 -> i32 with symmetric rounding, then clamp to u8.
                let r = round_shift_i64(acc_r, 2 * QW) as i32;
                let g = round_shift_i64(acc_g, 2 * QW) as i32;
                let b = round_shift_i64(acc_b, 2 * QW) as i32;

                let o = (y_out * dst_w + x_out) * 4;
                dst[o] = r.clamp(0, 255) as u8;
                dst[o + 1] = g.clamp(0, 255) as u8;
                dst[o + 2] = b.clamp(0, 255) as u8;
                dst[o + 3] = 255;
            }
        }

        dst
    }
}

/// Flattened tap storage: taps are in a single Vec<Tap>.
/// For each output coordinate j, offsets[j] gives (start, len) into taps.
#[derive(Clone)]
struct TapTable {
    offsets: Vec<(u32, u16)>,
    taps: Vec<Tap>,
}

#[derive(Clone, Copy)]
struct Tap {
    idx: u16, // src index (<= 128 fits)
    w: i32,   // Q14 signed
}

impl TapTable {
    #[inline(always)]
    fn range(&self, out_coord: usize) -> (usize, usize) {
        let (s, l) = self.offsets[out_coord];
        let s = s as usize;
        let e = s + (l as usize);
        (s, e)
    }

    // Precompute per-destination coordinate taps (flattened):
    // - Merges clamped duplicates in Q16 before Q14 conversion.
    // - Caps downscale support radius.
    // - Normalization remainder is applied to the largest-|w| tap (deterministic).
    fn precompute_axis(src_len: usize, dst_len: usize) -> Self {
        // Fixed-point formats:
        // - Positions/scales: Q16
        // - Weights: Q14
        const QPOS: i32 = 16;
        const QW: i32 = 14;
        const ONE_POS: i64 = 1i64 << QPOS;
        const ONE_W: i64 = 1i64 << QW;

        // Cap support radius (in source pixels) used for downscaling.
        const MAX_SUPPORT_PX_Q16: i64 = 4i64 << QPOS; // 4.0px radius

        // scale = src / dst in Q16
        let scale_q16: i64 = ((src_len as i64) << QPOS) / (dst_len as i64);

        // For downscale (scale > 1), widen support to 2*scale but cap it.
        // For upscale, support radius is 2.
        let support_q16: i64 = if scale_q16 > ONE_POS {
            let widened = 2 * scale_q16;
            if widened > MAX_SUPPORT_PX_Q16 {
                MAX_SUPPORT_PX_Q16
            } else {
                widened
            }
        } else {
            2 * ONE_POS
        };

        // Conservative reserve for flattened taps:
        // small icons + capped support => tap count stays modest.
        let mut offsets: Vec<(u32, u16)> = Vec::with_capacity(dst_len);
        let mut taps: Vec<Tap> = Vec::with_capacity(dst_len * 12);

        #[inline(always)]
        fn nearest_fallback(center_q16: i64, src_len: usize) -> (u16, i32) {
            const QPOS: i32 = 16;
            const ONE_W: i64 = 1i64 << 14;
            let idx_i32 = ((center_q16 + ((1i64 << QPOS) / 2)) >> QPOS) as i32;
            let idx = clamp_i32(idx_i32, 0, (src_len as i32) - 1) as u16;
            (idx, ONE_W as i32)
        }

        for j in 0..dst_len {
            // center = (j + 0.5) * scale - 0.5  (Q16)
            let j_q16: i64 = (j as i64) << QPOS;
            let center_q16: i64 =
                (((j_q16 + (ONE_POS / 2)) * scale_q16) >> QPOS) - (ONE_POS / 2);

            // Candidate integer range around center within support (+margin for quantization).
            let start: i32 = ((center_q16 - support_q16) >> QPOS) as i32 - 2;
            let end: i32 = ((center_q16 + support_q16) >> QPOS) as i32 + 2;

            // Collect clamped taps in Q16 (idx already clamped), then sort+merge by idx.
            let mut taps_tmp: Vec<(usize, i32)> = Vec::new(); // (idx, weight Q16)
            if end >= start {
                taps_tmp.reserve((end - start + 1) as usize);
            }

            for i in start..=end {
                let dist_q16: i64 = center_q16 - ((i as i64) << QPOS);
                let abs_dist_q16: i64 = dist_q16.abs();

                if abs_dist_q16 >= support_q16 {
                    continue;
                }

                // For downscale: u = dist/scale, w = cubic(u)/scale
                // For upscale:   u = dist,       w = cubic(u)
                let w_q16: i32 = if scale_q16 > ONE_POS {
                    let u_q16: i64 = (abs_dist_q16 << QPOS) / scale_q16;
                    let base_q16: i64 = cubic_a_neg_half(u_q16 as i32) as i64; // Q16
                    ((base_q16 << QPOS) / scale_q16) as i32
                } else {
                    cubic_a_neg_half(abs_dist_q16 as i32)
                };

                if w_q16 == 0 {
                    continue;
                }

                let clamped = clamp_i32(i, 0, (src_len as i32) - 1) as usize;
                taps_tmp.push((clamped, w_q16));
            }

            let out_start = taps.len() as u32;

            if taps_tmp.is_empty() {
                let (idx, w) = nearest_fallback(center_q16, src_len);
                taps.push(Tap { idx, w });
                offsets.push((out_start, 1));
                continue;
            }

            // Sort by idx to make merging deterministic and stable across platforms.
            taps_tmp.sort_unstable_by_key(|&(idx, _)| idx);

            // Merge duplicates (same idx) by summing weights in Q16.
            let mut merged_q16: Vec<(usize, i32)> = Vec::with_capacity(taps_tmp.len());
            {
                let mut cur_idx = taps_tmp[0].0;
                let mut acc_w: i64 = taps_tmp[0].1 as i64;
                for &(idx, wq16) in taps_tmp.iter().skip(1) {
                    if idx == cur_idx {
                        acc_w += wq16 as i64;
                    } else {
                        merged_q16.push((cur_idx, clamp_i64_to_i32(acc_w)));
                        cur_idx = idx;
                        acc_w = wq16 as i64;
                    }
                }
                merged_q16.push((cur_idx, clamp_i64_to_i32(acc_w)));
            }

            // Convert weights Q16 -> Q14 and accumulate sum (signed).
            // Use symmetric rounding in conversion.
            let shift = 16 - QW; // == 2
            let mut tmp_qw: Vec<(u16, i32)> = Vec::with_capacity(merged_q16.len());
            let mut sum_qw: i64 = 0;

            for &(idx, w_q16) in &merged_q16 {
                if w_q16 == 0 {
                    continue;
                }
                let w_qw: i64 = if shift > 0 {
                    round_shift_i64(w_q16 as i64, shift)
                } else {
                    (w_q16 as i64) << (-shift)
                };
                if w_qw == 0 {
                    continue;
                }
                tmp_qw.push((idx as u16, w_qw as i32));
                sum_qw += w_qw;
            }

            if tmp_qw.is_empty() || sum_qw == 0 {
                let (idx, w) = nearest_fallback(center_q16, src_len);
                taps.push(Tap { idx, w });
                offsets.push((out_start, 1));
                continue;
            }

            // Renormalize so sum == ONE_W.
            // 1) Normalize with rounding deterministically.
            // 2) Apply remainder to the tap with the largest absolute weight.
            let mut norm_w: Vec<(u16, i32)> = Vec::with_capacity(tmp_qw.len());
            let mut sum_norm: i64 = 0;

            for &(idx, w) in &tmp_qw {
                let scaled: i64 = (w as i64) * ONE_W;
                let w_norm: i64 = if scaled >= 0 {
                    (scaled + (sum_qw / 2)) / sum_qw
                } else {
                    (scaled - (sum_qw / 2)) / sum_qw
                };
                norm_w.push((idx, w_norm as i32));
                sum_norm += w_norm;
            }

            // Remainder correction.
            let rem: i64 = ONE_W - sum_norm;
            if rem != 0 {
                let mut best_k: usize = 0;
                let mut best_abs: i64 = (norm_w[0].1 as i64).abs();
                for k in 1..norm_w.len() {
                    let a = (norm_w[k].1 as i64).abs();
                    if a > best_abs {
                        best_abs = a;
                        best_k = k;
                    }
                }
                let corrected = (norm_w[best_k].1 as i64) + rem;
                norm_w[best_k].1 = clamp_i64_to_i32(corrected);
            }

            // Emit flattened taps.
            for (idx, w) in norm_w {
                taps.push(Tap { idx, w });
            }

            let out_len = (taps.len() as u32) - out_start;
            // Fits comfortably for these icon sizes; keep deterministic behavior otherwise.
            let out_len_u16 = if out_len > u16::MAX as u32 {
                u16::MAX
            } else {
                out_len as u16
            };
            offsets.push((out_start, out_len_u16));
        }

        Self { offsets, taps }
    }
}

// Signed, symmetric rounding when shifting right.
#[inline(always)]
fn round_shift_i64(x: i64, shift: i32) -> i64 {
    debug_assert!(shift > 0 && shift < 63);
    let half = 1i64 << (shift - 1);
    if x >= 0 {
        (x + half) >> shift
    } else {
        (x - half) >> shift
    }
}

#[inline(always)]
fn clamp_i32(x: i32, lo: i32, hi: i32) -> i32 {
    if x < lo {
        lo
    } else if x > hi {
        hi
    } else {
        x
    }
}

#[inline(always)]
fn clamp_i64_to_i32(x: i64) -> i32 {
    if x > i32::MAX as i64 {
        i32::MAX
    } else if x < i32::MIN as i64 {
        i32::MIN
    } else {
        x as i32
    }
}

// Cubic kernel (Keys) with a = -0.5, input t in Q16, output in Q16.
// Support: t in [0, 2).
#[inline(always)]
fn cubic_a_neg_half(t_q16: i32) -> i32 {
    if t_q16 >= (2 << 16) {
        return 0;
    }
    let t = t_q16 as i64;
    let t2 = (t * t) >> 16; // Q16
    let t3 = (t2 * t) >> 16; // Q16

    if t_q16 < (1 << 16) {
        // (3/2)t^3 - (5/2)t^2 + 1
        let num = 3 * t3 - 5 * t2; // Q16
        ((num >> 1) + (1i64 << 16)) as i32
    } else {
        // (-1/2)t^3 + (5/2)t^2 - 4t + 2
        let num = -t3 + 5 * t2; // Q16
        ((num >> 1) - (4 * t) + (2i64 << 16)) as i32
    }
}
