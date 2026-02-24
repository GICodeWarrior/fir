import argparse
import os
from dataclasses import dataclass
from functools import lru_cache
from concurrent.futures import ProcessPoolExecutor, as_completed

from PIL import Image, ImageDraw, ImageFont


DATA_DIR_DEFAULT = "quantities"

PRIORITY_HEIGHT = {22, 27, 32, 34, 43, 64}
PRIORITY_VALUE = {68, 84, 98}


@dataclass(frozen=True)
class ShiftSpec:
    label: str
    dx: int
    dy: int


@dataclass(frozen=True)
class SmearSpec:
    label: str
    dw: int
    dh: int


SHIFTS = [
    ShiftSpec("noshift", 0, 0),

    ShiftSpec("shiftw", -1, 0),
    ShiftSpec("shifte", +1, 0),
    ShiftSpec("shifts", 0, +1),
    ShiftSpec("shiftn", 0, -1),

    ShiftSpec("shiftnw", -1, -1),
    ShiftSpec("shiftse", +1, +1),
    ShiftSpec("shiftne", +1, -1),
    ShiftSpec("shiftsw", -1, +1),

    ShiftSpec("shift2w", -2, 0),
    ShiftSpec("shift2e", +2, 0),
    ShiftSpec("shift2s", 0, +2),
    ShiftSpec("shift2n", 0, -2),

    ShiftSpec("shift2nw", -2, -2),
    ShiftSpec("shift2se", +2, +2),
    ShiftSpec("shift2ne", +2, -2),
    ShiftSpec("shift2sw", -2, +2),
]

SMEARS = [
    SmearSpec("nosmear", 0, 0),
    SmearSpec("smearh", 0, +1),
    SmearSpec("smearw", +1, 0),
    SmearSpec("smearwh", +1, +1),

    SmearSpec("smear2h", 0, +2),
    SmearSpec("smear2w", +2, 0),
]


def compute_width(height: int) -> int:
    return round(21 * height / 16)


def compute_font_size(height: int) -> int:
    return round(height / 2)


def ensure_dir(path: str) -> None:
    os.makedirs(path, exist_ok=True)


def shift_with_fill(img: Image.Image, dx: int, dy: int, fill_rgba: tuple[int, int, int, int]) -> Image.Image:
    if dx == 0 and dy == 0:
        return img
    w, h = img.size
    out = Image.new("RGBA", (w, h), fill_rgba)
    out.paste(img, (dx, dy))
    return out


def smear_resize(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    if img.size == (target_w, target_h):
        return img
    return img.resize((target_w, target_h), resample=Image.Resampling.LANCZOS)


def load_font(font_path: str, font_size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(font_path, font_size, layout_engine=ImageFont.Layout.BASIC)


def render_text_layer(quantity: str, width: int, height: int, font: ImageFont.ImageFont) -> Image.Image:
    out = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    d = ImageDraw.Draw(out)

    left, top, right, bottom = d.textbbox((0, 0), quantity, font=font)
    text_w = right - left
    text_h = bottom - top

    x = (width - text_w) / 2 - left
    y = (height - text_h) / 2 - top

    d.text((x, y), quantity, font=font, fill=(255, 255, 255, 255))
    return out


def should_emit(height: int, value: int, shift_label: str, smear_label: str) -> bool:
    if not (height in PRIORITY_HEIGHT and value in PRIORITY_VALUE):
        return False
    if height < 32 and shift_label.startswith("shift2"):
        return False
    return True


def generate_for_quantity(
    quantity: str,
    out_dir: str,
    font_path: str | None,
    overwrite: bool,
) -> int:
    q_dir = os.path.join(out_dir, quantity)
    ensure_dir(q_dir)

    written = 0

    for height in range(16, 65):
        width = compute_width(height)
        font_size = compute_font_size(height)

        font = load_font(font_path, font_size)
        text_layer = render_text_layer(quantity, width, height, font)

        for value in range(64, 113):
            for sh in SHIFTS:
                for sm in SMEARS:
                    if not should_emit(height, value, sh.label, sm.label):
                        continue

                    color_hex = f"{value:02X}{value:02X}{value:02X}"
                    filename = f"{width}x{height}-{font_size}pt-{color_hex}-{sh.label}-{sm.label}.png"
                    full_path = os.path.join(q_dir, filename)

                    if (not overwrite) and os.path.exists(full_path):
                        continue

                    bg_rgba = (value, value, value, 255)

                    base = Image.new("RGBA", (width, height), bg_rgba)
                    base.alpha_composite(text_layer)

                    shifted = shift_with_fill(base, sh.dx, sh.dy, bg_rgba)

                    target_w = width + sm.dw
                    target_h = height + sm.dh
                    final_img = smear_resize(shifted, target_w, target_h)

                    final_img.save(full_path, format="PNG", optimize=True)
                    written += 1

    return written


def iter_quantities() -> list[str]:
    out = []
    for i in range(1000):
        for suffix in ("", "k+", "x"):
            if suffix == "k+" and (i < 1 or i > 32):
                continue
            out.append(f"{i}{suffix}")
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=DATA_DIR_DEFAULT, help="Output root directory (default: quantities)")
    ap.add_argument("--font", default=None, help="Path to a .ttf/.otf font file (recommended for Renner)")
    ap.add_argument("--procs", type=int, default=os.cpu_count() or 4, help="Number of worker processes")
    ap.add_argument("--overwrite", action="store_true", help="Overwrite existing PNGs")
    args = ap.parse_args()

    ensure_dir(args.out)
    quantities = iter_quantities()

    total_written = 0
    with ProcessPoolExecutor(max_workers=args.procs) as ex:
        futures = {
            ex.submit(generate_for_quantity, q, args.out, args.font, args.overwrite): q
            for q in quantities
        }
        for fut in as_completed(futures):
            q = futures[fut]
            try:
                written = fut.result()
                total_written += written
            except Exception as e:
                raise RuntimeError(f"Failed for quantity {q}: {e}") from e

    print(f"Wrote {total_written} files to {args.out}")


if __name__ == "__main__":
    main()
