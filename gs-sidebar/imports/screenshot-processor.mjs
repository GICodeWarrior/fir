import fiw_init, { ScreenshotProcessor } from '../../includes/wasm/fiw.js'
const VERSION = "airborne-63"



const [
  OCR_RECOGNITION_ONNX,
  ICON_ONNX,
  ICON_CLASS_NAMES,
  QUANTITY_ONNX,
  QUANTITY_CLASS_NAMES,
] = await Promise.all([
  fetch(new URL(`../../includes/text-recognition-model.onnx`, import.meta.url)).then(r => r.bytes()),
  fetch(new URL(`../../foxhole/${VERSION}/classifier/model.onnx`, import.meta.url)).then(r => r.bytes()),
  fetch(new URL(`../../foxhole/${VERSION}/classifier/class_names.json`, import.meta.url)).then(r => r.json()),
  fetch(new URL(`../../includes/quantities/model.onnx`, import.meta.url)).then(r => r.bytes()),
  fetch(new URL(`../../includes/quantities/class_names.json`, import.meta.url)).then(r => r.json()),
  fiw_init(),
])



export const processor = new ScreenshotProcessor(
  OCR_RECOGNITION_ONNX,
  ICON_ONNX,
  ICON_CLASS_NAMES,
  QUANTITY_ONNX,
  QUANTITY_CLASS_NAMES,
)

export default processor