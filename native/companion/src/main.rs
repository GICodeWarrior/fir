use std::fs::File;
use std::io::{self, Read};
use std::time::Instant;

use fis::Classifier;
use fis::Ocr;
use fis::extract_stockpile;

// Helper: read bytes from a filename, where "-" means stdin.
fn read_input_bytes(filename: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let mut bytes = Vec::new();
    if filename == "-" {
        io::stdin().read_to_end(&mut bytes)?;
    } else {
        File::open(filename)?.read_to_end(&mut bytes)?;
    }
    Ok(bytes)
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    unsafe {
        std::env::set_var("RTEN_NUM_THREADS", "1");
    }
    let data_path = std::env::current_exe()?;

    let mut args = std::env::args();
    let _exe = args.next();
    let filenames: Vec<String> = args.collect();
    if filenames.is_empty() {
        return Ok(());
    }

    let ocr = Ocr::new_from_paths(data_path.with_file_name("text-rec-finetuned-5.onnx"))?;

    let mut icon_classifier = Classifier::new_from_paths(
        data_path.with_file_name("model_icon.onnx"),
        (32, 32),
        3,
        data_path.with_file_name("model-icon/class_names.json"),
    )?;

    let mut quantity_classifier = Classifier::new_from_paths(
        data_path.with_file_name("model_quantity.onnx"),
        (16, 21),
        1,
        data_path.with_file_name("model-quantity/class_names.json"),
    )?;

    let mut outputs: Vec<Option<_>> = Vec::with_capacity(filenames.len());

    for filename in filenames {
        let bytes = read_input_bytes(&filename)?;
        let image = image::load_from_memory(&bytes)?.into_rgba8();
        let width = image.width() as usize;

        let stockpile = extract_stockpile(
            &image,
            width,
            &ocr,
            &mut icon_classifier,
            &mut quantity_classifier,
        )?;
        outputs.push(stockpile);
    }
    println!("{}", serde_json::to_string_pretty(&outputs)?);

    Ok(())
}
