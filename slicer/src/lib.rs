use std::collections::HashMap;

use serde::Serialize;
use wasm_bindgen::prelude::*;

const MAX_MERGE_VARIANCE: isize = 3;

/*
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
*/
// log(&format!("message {}", variable));

#[derive(Serialize)]
struct Bounds {
    pub x: usize,
    pub y: usize,
    pub width: usize,
    pub height: usize,
}

impl Bounds {
    fn offset(&self, x: usize, y: usize) -> Bounds {
        Bounds {
            x: self.x + x,
            y: self.y + y,
            width: self.width,
            height: self.height,
        }
    }
}

#[derive(Serialize)]
struct StockpileType {
    pub bounds: Bounds,
}

#[derive(Serialize)]
struct StockpileName {
    pub bounds: Bounds,
}

#[derive(Serialize)]
struct Header {
    pub bounds: Bounds,
    pub stockpile_type: StockpileType,
    pub stockpile_name: Option<StockpileName>,
}

#[derive(Serialize)]
struct Icon {
    pub bounds: Bounds,
}

#[derive(Serialize)]
struct Quantity {
    pub bounds: Bounds,
}

#[derive(Serialize)]
struct Entry {
    pub icon: Icon,
    pub quantity: Quantity,
}

#[derive(Serialize)]
struct Stockpile {
    pub bounds: Bounds,
    pub header: Option<Header>,
    pub contents: Vec<Entry>,
    pub quantity_grey: Option<u8>, // temporary
}

fn calc_red_index(row: usize, col: usize, width: usize) -> usize {
    (row * width + col) * 4
}

fn slice_rgba(rgba: &[u8], width: usize, bounds: &Bounds) -> Vec<u8> {
    let mut sliced_rgba: Vec<u8> = Vec::with_capacity(bounds.width * bounds.height * 4);

    for row in bounds.y..(bounds.y + bounds.height) {
        let left = calc_red_index(row, bounds.x, width);
        let right_exclusive = left + bounds.width * 4;
        sliced_rgba.extend_from_slice(&rgba[left..right_exclusive]);
    }

    sliced_rgba
}

#[wasm_bindgen]
pub fn slice_stockpile(rgba: &[u8], width: usize) -> Option<JsValue> {
    let Some(body) = find_stockpile(rgba, width) else {
        return None;
    };

    // TODO avoid copy
    let body_rgba: Vec<u8> = slice_rgba(&rgba, width, &body);
    let (raw_contents, quantity_grey) = extract_contents(&body_rgba, body.width, body.height);

    let mut contents: Vec<Entry> = Vec::with_capacity(raw_contents.len());
    for (icon_bounds, quantity_bounds) in raw_contents {
        contents.push(Entry {
            icon: Icon {
                bounds: icon_bounds.offset(body.x, body.y),
            },
            quantity: Quantity {
                bounds: quantity_bounds.offset(body.x, body.y),
            },
        });
    }

    let mut header_bounds: Option<Bounds> = None;
    let mut bounds = body;
    if contents.len() > 0 {
        let header_y = bounds.y.saturating_sub(contents[0].quantity.bounds.height);
        let header_height = bounds.y - header_y;

        if header_height > contents[0].quantity.bounds.height * 9 / 10 {
            header_bounds = Some(Bounds {
                x: bounds.x,
                y: header_y,
                width: bounds.width,
                height: header_height,
            });
            bounds = Bounds {
                x: bounds.x,
                y: bounds.y - header_height,
                width: bounds.width,
                height: bounds.height + header_height,
            };
        }
    }

    let mut header: Option<Header> = None;
    if let Some(header_bounds) = header_bounds {
        // TODO avoid copy
        let header_rgba: Vec<u8> = slice_rgba(&rgba, width, &header_bounds);

        let (type_bounds, name_bounds) = extract_header(
            &header_rgba,
            header_bounds.width,
            header_bounds.height,
            contents[0].quantity.bounds.width,
        );

        let stockpile_type = StockpileType {
            bounds: type_bounds.offset(header_bounds.x, header_bounds.y),
        };

        let stockpile_name = if let Some(name_bounds) = name_bounds {
            Some(StockpileName {
                bounds: name_bounds.offset(header_bounds.x, header_bounds.y),
            })
        } else {
            None
        };

        header = Some(Header {
            bounds: header_bounds,
            stockpile_type,
            stockpile_name,
        });
    }

    let stockpile = Stockpile {
        bounds,
        header,
        contents,
        quantity_grey: Some(quantity_grey), // temporary
    };
    Some(serde_wasm_bindgen::to_value(&stockpile).ok()?)
}

struct Stripe {
    row: usize,
    right: usize,
    left: usize,
}

#[derive(Copy, Clone)]
struct InternalBox {
    top: usize,
    right: usize,
    bottom: usize,
    left: usize,
    dark_stripes: usize,
}

/// Returns (chroma, lightness) for an RGB triple.
fn get_cl(r: u8, g: u8, b: u8) -> (u8, u8) {
    let min = r.min(g).min(b);
    let max = r.max(g).max(b);

    (max - min, ((min as u16 + max as u16 + 1) / 2) as u8)
}

fn check_pixel(
    r: u8,
    g: u8,
    b: u8,
    max_chroma: u8,
    desired_lightness: u8,
    lightness_variance: u8,
) -> bool {
    let (chroma, lightness) = get_cl(r, g, b);
    chroma <= max_chroma && lightness.abs_diff(desired_lightness) <= lightness_variance
}

fn is_dark(rgba: &[u8], offset: usize) -> bool {
    const MAX_DARK_CHANNEL_CHROMA: u8 = 24;
    const MAX_DARK_PIXEL_LIGHTNESS: u8 = 32;

    let r = rgba[offset];
    let g = rgba[offset + 1];
    let b = rgba[offset + 2];
    let (chroma, lightness) = get_cl(r, g, b);

    chroma <= MAX_DARK_CHANNEL_CHROMA && lightness < MAX_DARK_PIXEL_LIGHTNESS
}

fn fit_dark_sides(rgba: &[u8], width: usize, b: &mut InternalBox) -> bool {
    const MIN_DARK_EDGE_PERCENT: f64 = 0.8;

    let mut dark_left: HashMap<usize, usize> = HashMap::new();
    let mut dark_right: HashMap<usize, usize> = HashMap::new();

    for row in b.top..=b.bottom {
        for offset in -MAX_MERGE_VARIANCE..MAX_MERGE_VARIANCE {
            let left_col = b.left as isize + offset;
            let right_col = b.right as isize + offset;

            if left_col >= 0 && (left_col as usize) < width {
                let idx = calc_red_index(row, left_col as usize, width);
                *dark_left.entry(left_col as usize).or_insert(0) += usize::from(is_dark(rgba, idx));
            }

            if right_col >= 0 && (right_col as usize) < width {
                let idx = calc_red_index(row, right_col as usize, width);
                *dark_right.entry(right_col as usize).or_insert(0) +=
                    usize::from(is_dark(rgba, idx));
            }
        }
    }

    let box_height = b.bottom - b.top + 1;

    let mut new_left: Option<usize> = None;
    let mut sorted_left: Vec<_> = dark_left.into_iter().collect();
    sorted_left.sort_by_key(|(k, _)| *k);
    for (left_col, count) in sorted_left {
        if count as f64 / box_height as f64 >= MIN_DARK_EDGE_PERCENT {
            new_left = Some(left_col);
            break;
        }
    }

    let mut new_right: Option<usize> = None;
    let mut sorted_right: Vec<_> = dark_right.into_iter().collect();
    sorted_right.sort_by_key(|(k, _)| *k);
    for (right_col, count) in sorted_right {
        if count as f64 / box_height as f64 >= MIN_DARK_EDGE_PERCENT {
            new_right = Some(right_col);
        }
    }

    match (new_left, new_right) {
        (Some(l), Some(r)) => {
            b.left = l;
            b.right = r;
            true
        }
        _ => false,
    }
}

fn find_stockpile(rgba: &[u8], width: usize) -> Option<Bounds> {
    const MIN_INVENTORY_WIDTH: usize = 100;
    const MIN_INVENTORY_HEIGHT: usize = 25;

    let mut dark_stripes: HashMap<usize, Vec<Stripe>> = HashMap::new();

    for row in 0..(rgba.len() / width / 4) {
        let mut dark_count = 0usize;
        for col in 0..width {
            let red_index = calc_red_index(row, col, width);

            if is_dark(rgba, red_index) && (col + 1 != width) {
                dark_count += 1;
            } else if dark_count >= MIN_INVENTORY_WIDTH {
                if col + 1 == width {
                    dark_count += 1;
                }
                let left = col.saturating_sub(dark_count);
                dark_stripes.entry(left).or_default().push(Stripe {
                    row,
                    right: col - 1,
                    left,
                });
                dark_count = 0;
            } else {
                dark_count = 0;
            }
        }
    }

    let mut boxes: Vec<InternalBox> = Vec::new();

    for left in dark_stripes.keys() {
        let mut stripes: Vec<&Stripe> = Vec::new();

        let merge_start = (*left as isize) - MAX_MERGE_VARIANCE + 1;
        let merge_end = (*left as isize) + MAX_MERGE_VARIANCE;

        for left_offset in merge_start..merge_end {
            if left_offset < 0 {
                continue;
            }
            if let Some(s) = dark_stripes.get(&(left_offset as usize)) {
                stripes.extend(s.iter());
            }
        }

        let mut rights: HashMap<usize, usize> = HashMap::new();
        for stripe in &stripes {
            *rights.entry(stripe.right).or_insert(0) += 1;
        }

        let most_right = *rights
            .iter()
            .max_by_key(|(_, count)| **count)
            .map(|(right, _)| right)
            .unwrap();

        let mut top = usize::MAX;
        let mut bottom = 0usize;
        let mut stripes_count = 0usize;

        for stripe in &stripes {
            if ((stripe.right as isize) > (most_right as isize) - MAX_MERGE_VARIANCE)
                || ((stripe.right as isize) < (most_right as isize) + MAX_MERGE_VARIANCE)
            {
                top = top.min(stripe.row);
                bottom = bottom.max(stripe.row);
                stripes_count += 1;
            }
        }

        boxes.push(InternalBox {
            top,
            right: most_right,
            bottom,
            left: *left,
            dark_stripes: stripes_count,
        });
    }

    if boxes.is_empty() {
        return None;
    }

    for outer_index in 0..boxes.len() {
        for inner_index in 0..boxes.len() {
            if outer_index == inner_index
                || boxes[inner_index].left > boxes[outer_index].left
                || boxes[inner_index].right < boxes[outer_index].right
            {
                continue;
            }

            let inner_top = boxes[inner_index].top;

            if inner_top < boxes[outer_index].top {
                let mut trial = boxes[outer_index].clone();
                trial.top = inner_top;

                if fit_dark_sides(rgba, width, &mut trial) {
                    boxes[outer_index] = trial;
                }
            }
        }
    }

    // Sort by area descending
    boxes.sort_by(|a, b| {
        let area_b = (b.right - b.left + 1) * (b.bottom - b.top + 1);
        let area_a = (a.right - a.left + 1) * (a.bottom - a.top + 1);
        area_b.cmp(&area_a)
    });

    // Merge overlapping boxes
    let mut primary_offset = 0;
    while primary_offset < boxes.len().saturating_sub(1) {
        let mut inner_offset = primary_offset + 1;
        while inner_offset < boxes.len() {
            let should_merge = {
                let primary = &boxes[primary_offset];
                let inner = &boxes[inner_offset];
                ((primary.top as isize) - MAX_MERGE_VARIANCE <= (inner.top as isize))
                    && ((primary.right as isize) + MAX_MERGE_VARIANCE >= (inner.right as isize))
                    && ((primary.bottom as isize) + MAX_MERGE_VARIANCE >= (inner.bottom as isize))
                    && ((primary.left as isize) - MAX_MERGE_VARIANCE <= (inner.left as isize))
            };

            if should_merge {
                let inner_stripes = boxes[inner_offset].dark_stripes;
                boxes[primary_offset].dark_stripes += inner_stripes;
                boxes.remove(inner_offset);
            } else {
                inner_offset += 1;
            }
        }
        primary_offset += 1;
    }

    // Filter by minimum height
    boxes.retain(|b| b.bottom - b.top >= MIN_INVENTORY_HEIGHT);

    // Check left and right sides are mostly dark
    boxes = boxes
        .into_iter()
        .filter_map(|mut b| {
            if fit_dark_sides(rgba, width, &mut b) {
                Some(b)
            } else {
                None
            }
        })
        .collect();

    if boxes.is_empty() {
        return None;
    }

    // Prefer the box closest to the middle
    let middle = width.div_ceil(2);
    boxes.sort_by_key(|b| b.left.abs_diff(middle));
    let result = &boxes[0];

    Some(Bounds {
        x: result.left,
        y: result.top,
        width: result.right - result.left + 1,
        height: result.bottom - result.top + 1,
    })
}

fn extract_contents(rgba: &[u8], width: usize, height: usize) -> (Vec<(Bounds, Bounds)>, u8) {
    const MIN_QUANTITY_WIDTH: usize = 30;
    const MAX_QUANTITY_WIDTH: usize = 90;
    const MIN_QUANTITY_HEIGHT: usize = 22;
    const MAX_QUANTITY_HEIGHT: usize = 70;
    const MAX_GREY_CHROMA: u8 = 16;
    const MAX_GREY_LIGHTNESS_VARIANCE: u8 = 16;

    // Find the most common grey which is probably the quantity background
    const MIN_GREY: u8 = 32;
    const MAX_GREY: u8 = 224;

    let mut greys: HashMap<u8, usize> = HashMap::from([(128u8, 0usize)]);
    for chunk in rgba.chunks_exact(4) {
        let (_, value) = get_cl(chunk[0], chunk[1], chunk[2]);
        if value >= MIN_GREY && value <= MAX_GREY {
            *greys.entry(value).or_insert(0) += 1;
        }
    }

    let (quantity_grey_value, _) = greys.iter().max_by_key(|(_, count)| **count).unwrap();

    let is_grey = |r: u8, g: u8, b: u8| -> bool {
        check_pixel(
            r,
            g,
            b,
            MAX_GREY_CHROMA,
            *quantity_grey_value,
            MAX_GREY_LIGHTNESS_VARIANCE,
        )
    };

    let mut contents: Vec<(Bounds, Bounds)> = Vec::new();
    let mut row = 0;

    while row < height {
        let mut grey_count: usize = 0;
        let mut quantity_bottom: Option<usize> = None;
        let mut quantity_bottom_verified = false;

        for col in 0..width {
            let idx = calc_red_index(row, col, width);
            if is_grey(rgba[idx], rgba[idx + 1], rgba[idx + 2]) {
                grey_count += 1;
            } else if grey_count >= MIN_QUANTITY_WIDTH && grey_count <= MAX_QUANTITY_WIDTH {
                let qty_x = col - grey_count;
                let qty_y = row;

                let quantity_gap: usize;

                if quantity_bottom.is_none() || !quantity_bottom_verified {
                    quantity_bottom =
                        Some(find_qty_bottom(rgba, qty_y, qty_x, width, height, &is_grey));
                    quantity_gap = qty_x;
                } else {
                    let prev = &contents.last().unwrap().1;
                    quantity_gap = qty_x - (prev.x + prev.width);
                }

                let qty_h = quantity_bottom.unwrap() - qty_y + 1;

                if qty_h >= MIN_QUANTITY_HEIGHT && qty_h <= MAX_QUANTITY_HEIGHT {
                    quantity_bottom_verified = true;

                    let quantity_box = Bounds {
                        x: qty_x,
                        y: qty_y,
                        width: grey_count,
                        height: qty_h,
                    };

                    let icon_width = qty_h;
                    let icon_gap = quantity_gap.saturating_sub(icon_width).div_ceil(2);
                    let icon_x = qty_x.saturating_sub(icon_gap).saturating_sub(icon_width);

                    let icon_box = Bounds {
                        x: icon_x,
                        y: qty_y,
                        width: qty_h,
                        height: qty_h,
                    };

                    contents.push((icon_box, quantity_box));
                }

                grey_count = 0;
            } else {
                grey_count = 0;
            }
        }

        // Skip past the bottom of the quantity row we just scanned
        row = quantity_bottom.map_or(row + 1, |qb| qb + 1);
    }

    (contents, *quantity_grey_value)
}

fn find_qty_bottom<F: Fn(u8, u8, u8) -> bool>(
    rgba: &[u8],
    row: usize,
    col: usize,
    width: usize,
    height: usize,
    is_grey: &F,
) -> usize {
    let mut check_row = row + 1;
    while check_row < height {
        let idx = calc_red_index(check_row, col, width);
        if !is_grey(rgba[idx], rgba[idx + 1], rgba[idx + 2]) {
            break;
        }
        check_row += 1;
    }
    check_row - 1
}

fn extract_header(
    rgba: &[u8],
    width: usize,
    height: usize,
    quantity_width: usize,
) -> (Bounds, Option<Bounds>) {
    const MAX_GREY_CHROMA: u8 = 16;
    const MAX_GREY_LIGHTNESS_VARIANCE: u8 = 16;

    // Build lightness histogram over all pixels
    let mut histogram: HashMap<u8, usize> = HashMap::new();
    for chunk in rgba.chunks_exact(4) {
        let (_, value) = get_cl(chunk[0], chunk[1], chunk[2]);
        *histogram.entry(value).or_insert(0) += 1;
    }

    // Find the most frequent lightness value (the background grey)
    let grey_value = histogram
        .iter()
        .max_by_key(|(_, count)| **count)
        .map(|(value, _)| value)
        .unwrap_or(&128u8);

    let dark_value_cutoff = grey_value - MAX_GREY_LIGHTNESS_VARIANCE;

    // Scan the middle row of the header
    let packed_width = width * 4;
    let scan_start = ((height + 1) / 2) * packed_width;
    let scan_end = scan_start + packed_width;
    let expect_tab = scan_end - (quantity_width * 4);

    let mut longest_grey_length: usize = 0;
    let mut longest_grey_center: usize = 0;
    let mut current_grey_count: usize = 0;
    let mut tab_start: Option<usize> = None;
    let mut has_name = true;

    let is_grey = |r: u8, g: u8, b: u8| -> bool {
        check_pixel(
            r,
            g,
            b,
            MAX_GREY_CHROMA,
            *grey_value,
            MAX_GREY_LIGHTNESS_VARIANCE,
        )
    };

    for offset in (scan_start..scan_end).step_by(4) {
        let (r, g, b) = (rgba[offset], rgba[offset + 1], rgba[offset + 2]);

        if is_grey(r, g, b) && offset + 4 < scan_end {
            current_grey_count += 1;
        } else if current_grey_count > 0 {
            if current_grey_count > longest_grey_length {
                longest_grey_length = current_grey_count;
                let pixel_x = (offset - scan_start) / 4;
                longest_grey_center = pixel_x - ((current_grey_count + 1) / 2);

                if offset + 4 >= scan_end {
                    has_name = false;
                }
            }
            current_grey_count = 0;
        }

        if offset >= expect_tab {
            let (chroma, lightness) = get_cl(r, g, b);
            if chroma < MAX_GREY_CHROMA && lightness < dark_value_cutoff {
                tab_start = Some((offset - scan_start) / 4);
                break;
            }
        }
    }

    let name_box = if has_name {
        Some(Bounds {
            x: longest_grey_center,
            y: 0,
            width: tab_start.unwrap_or(width) - longest_grey_center,
            height,
        })
    } else {
        None
    };

    let type_box = Bounds {
        x: 0,
        y: 0,
        width: longest_grey_center,
        height,
    };

    (type_box, name_box)
}
