use wasm_bindgen::prelude::*;

use fis::slicer;
use fis::resizer;

const ICON_MODEL_WIDTH: usize = 32;
const ICON_MODEL_HEIGHT: usize = 32;
const TENSOR_BYTES_PER_ICON: usize = ICON_MODEL_WIDTH * ICON_MODEL_HEIGHT * 3;

const QUANTITY_MODEL_WIDTH: usize = 21;
const QUANTITY_MODEL_HEIGHT: usize = 16;
const TENSOR_BYTES_PER_QUANTITY: usize = QUANTITY_MODEL_WIDTH * QUANTITY_MODEL_HEIGHT;

/*
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
*/
// log(&format!("message {}", variable));

#[wasm_bindgen]
pub struct StockpileWithTensors {
    stockpile: slicer::Stockpile,
    icons_tensor: Vec<u8>,
    quantities_tensor: Vec<u8>,
}

#[wasm_bindgen]
impl StockpileWithTensors {
    #[wasm_bindgen(getter)]
    pub fn stockpile(&self) -> JsValue {
        serde_wasm_bindgen::to_value(&self.stockpile).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn icons_tensor(&self) -> Vec<u8> {
        self.icons_tensor.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn quantities_tensor(&self) -> Vec<u8> {
        self.quantities_tensor.clone()
    }
}

#[wasm_bindgen]
pub fn slice_stockpile_and_prepare_images(rgba: &[u8], width: usize) -> Option<StockpileWithTensors> {
    let stockpile = match slicer::slice_stockpile(rgba, width) {
        Some(s) => s,
        None => return None,
    };

    let mut icons_tensor: Vec<u8> = Vec::with_capacity(TENSOR_BYTES_PER_ICON * stockpile.contents.len());
    let mut quantities_tensor: Vec<u8> = Vec::with_capacity(TENSOR_BYTES_PER_QUANTITY * stockpile.contents.len());

    let mut bicubic = resizer::BicubicResizerFixed::new();

    for entry in stockpile.contents.iter() {
        let icon_slice = slicer::slice_rgba(&rgba, width, &entry.icon.bounds);
        let icon_resized = bicubic.resize(
            &icon_slice,
            entry.icon.bounds.width,
            entry.icon.bounds.height,
            ICON_MODEL_WIDTH,
            ICON_MODEL_HEIGHT,
        );

        for chunk in icon_resized.chunks_exact(4) {
            icons_tensor.extend_from_slice(&chunk[0..3]);
        }

        let quantity_slice = slicer::slice_rgba(&rgba, width, &entry.quantity.bounds);
        let quantity_resized = bicubic.resize(
            &quantity_slice,
            entry.quantity.bounds.width,
            entry.quantity.bounds.height,
            QUANTITY_MODEL_WIDTH,
            QUANTITY_MODEL_HEIGHT,
        );

        for chunk in quantity_resized.chunks_exact(4) {
            quantities_tensor.push(chunk[0]);
        }
    }

    let stockpile_with_tensors = StockpileWithTensors {
        stockpile,
        icons_tensor,
        quantities_tensor,
    };

    Some(stockpile_with_tensors)
}

