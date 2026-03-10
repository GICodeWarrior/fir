use std::fs::File;
use std::io::{self, Read};

use fis::Classifier;
use fis::Ocr;
use fis::extract_stockpile;

macro_rules! fir_version {
    () => {
        "airborne-63"
    };
}

macro_rules! fir_path {
    (includes/$file:literal) => {
        concat!("../../../includes/", $file)
    };
    (foxhole/$file:literal) => {
        concat!("../../../foxhole/", fir_version!(), "/", $file)
    };
}

static OCR_RECOGNITION_ONNX: &[u8] =
    include_bytes!(fir_path!(includes / "text-recognition-model.onnx"));
static ICON_ONNX: &[u8] = include_bytes!(fir_path!(foxhole / "classifier/model.onnx"));
static QUANTITY_ONNX: &[u8] = include_bytes!(fir_path!(includes / "quantities/model.onnx"));

static ICON_CLASS_NAMES_JSON: &str =
    include_str!(fir_path!(foxhole / "classifier/class_names.json"));
static QUANTITY_CLASS_NAMES_JSON: &str =
    include_str!(fir_path!(includes / "quantities/class_names.json"));

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

    let mut args = std::env::args();
    let _exe = args.next();
    let filenames: Vec<String> = args.collect();
    if filenames.is_empty() {
        return Ok(());
    }

    let ocr = Ocr::new_from_static(OCR_RECOGNITION_ONNX)?;

    let mut icon_classifier = Classifier::new_from_static(
        ICON_ONNX,
        (32, 32),
        3,
        serde_json::from_str(ICON_CLASS_NAMES_JSON)?,
    )?;

    let mut quantity_classifier = Classifier::new_from_static(
        QUANTITY_ONNX,
        (16, 21),
        1,
        serde_json::from_str(QUANTITY_CLASS_NAMES_JSON)?,
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
