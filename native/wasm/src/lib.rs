use wasm_bindgen::prelude::*;

use fis::Classifier;
use fis::Ocr;
use fis::extract_stockpile;

/*
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
*/
// log(&format!("message {}", variable));

#[wasm_bindgen]
pub struct ScreenshotProcessor {
    ocr: Ocr,
    icon_classifier: Classifier,
    quantity_classifier: Classifier,
}

#[wasm_bindgen]
impl ScreenshotProcessor {
    #[wasm_bindgen(constructor)]
    pub fn new(
        ocr_recognition_onnx: &[u8],
        icon_onnx: &[u8],
        icon_class_names: Vec<String>,
        quantity_onnx: &[u8],
        quantity_class_names: Vec<String>,
    ) -> Result<ScreenshotProcessor, JsValue> {
        Self::new_with_errors(
            ocr_recognition_onnx,
            icon_onnx,
            icon_class_names,
            quantity_onnx,
            quantity_class_names,
        )
        .map_err(|e| JsValue::from_str(&e.to_string()))
    }

    fn new_with_errors(
        ocr_recognition_onnx: &[u8],
        icon_onnx: &[u8],
        icon_class_names: Vec<String>,
        quantity_onnx: &[u8],
        quantity_class_names: Vec<String>,
    ) -> Result<ScreenshotProcessor, Box<dyn std::error::Error>> {
        let ocr = Ocr::new_from_bytes(ocr_recognition_onnx.to_vec())?;

        let icon_classifier =
            Classifier::new_from_data(icon_onnx.to_vec(), (32, 32), 3, icon_class_names)?;

        let quantity_classifier =
            Classifier::new_from_data(quantity_onnx.to_vec(), (16, 21), 1, quantity_class_names)?;

        Ok(ScreenshotProcessor {
            ocr,
            icon_classifier,
            quantity_classifier,
        })
    }

    #[wasm_bindgen]
    pub fn extract_stockpile(
        &mut self,
        rgba: &[u8],
        width: usize,
    ) -> Result<Option<JsValue>, JsValue> {
        let stockpile = extract_stockpile(
            &rgba,
            width,
            &self.ocr,
            &mut self.icon_classifier,
            &mut self.quantity_classifier,
        )
        .map_err(|e| JsValue::from_str(&e.to_string()));

        match stockpile {
            Ok(Some(s)) => Ok(Some(serde_wasm_bindgen::to_value(&s)?)),
            Ok(None) => Ok(None),
            Err(e) => Err(e),
        }
    }
}
