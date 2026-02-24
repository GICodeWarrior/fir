use std::env;
use std::fs;
use std::io;
use std::io::BufWriter;
use std::path::{Path, PathBuf};

use image::codecs::png::{CompressionType, FilterType, PngEncoder};
use image::{DynamicImage, ExtendedColorType, GenericImageView, ImageBuffer, ImageEncoder};

use fis::resizer::BicubicResizerFixed;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().collect();
    if args.len() != 5 {
        eprintln!(
            "Usage: {} <rgb|grayscale> <width> <height> <dir>",
            args[0]
        );
        std::process::exit(1);
    }

    let to_grayscale = match args[1].as_str() {
        "rgb" => false,
        "grayscale" => true,
        _ => {
            eprintln!("First argument must be 'rgb' or 'grayscale'");
            std::process::exit(1);
        }
    };

    let dst_w: u32 = args[2].parse()?;
    let dst_h: u32 = args[3].parse()?;
    let dir = Path::new(&args[4]);

    let mut bicubic = BicubicResizerFixed::new();

    for entry in fs::read_dir(dir)?.collect::<Vec<io::Result<fs::DirEntry>>>().into_iter() {
        let entry = entry?;
        let path = entry.path();

        // Try to open as an image; skip if not an image.
        let img = match image::open(&path) {
            Ok(img) => img,
            Err(_) => {
                eprintln!("Skipping non-image file: {}", path.display());
                continue;
            }
        };

        let rgba = img.to_rgba8();
        let (src_w, src_h) = img.dimensions();

        let resized = bicubic.resize(
            &rgba,
            src_w as usize,
            src_h as usize,
            dst_w as usize,
            dst_h as usize,
        );

        let out_path = dir.join(output_filename(&path));
        let file = fs::File::create(&out_path)?;
        let writer = BufWriter::new(file);

        let encoder = PngEncoder::new_with_quality(
            writer,
            CompressionType::Best,
            FilterType::Adaptive,
        );

        let out_img = DynamicImage::ImageRgba8(
            ImageBuffer::from_raw(dst_w, dst_h, resized).expect("Invalid image buffer size"),
        );

        if to_grayscale {
            encoder.write_image(
                &out_img.into_luma8().into_vec(),
                dst_w,
                dst_h,
                ExtendedColorType::L8,
            )?;
        } else {
            encoder.write_image(
                &out_img.into_rgb8().into_vec(),
                dst_w,
                dst_h,
                ExtendedColorType::Rgb8,
            )?;
        }

        // Delete the source file only after the resized output is successfully written.
        if let Err(e) = fs::remove_file(&path) {
            eprintln!(
                "Warning: wrote {}, but failed to delete source {}: {}",
                out_path.display(),
                path.display(),
                e
            );
        }
    }

    Ok(())
}

fn output_filename(src_path: &Path) -> PathBuf {
    let stem = src_path
        .file_stem()
        .and_then(|s| s.to_str())
        .expect("Missing file name");

    let ext = src_path
        .extension()
        .and_then(|e| e.to_str())
        .expect("Missing file extension")
        .to_lowercase();

    // e.g. image.jpg -> image-jpg.png
    PathBuf::from(format!("{stem}-{ext}.png"))
}
