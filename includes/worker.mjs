import fiw_init, { ScreenshotProcessor } from './wasm/fiw.js';

const WORKER_ID = Math.floor(Math.random() * 1024);

let processor;

self.onmessage = async (e) => {
  const { type } = e.data;

  if (type === 'init') {
    const version = e.data.version;
    processor = (async () => {
      const [
        ocrRecognitionOnnx,
        iconOnnx,
        iconClassNames,
        quantityOnnx,
        quantityClassNames,
      ] = await Promise.all([
        fetch(new URL('./text-recognition-model.onnx', import.meta.url)).then(r => r.bytes()),
        fetch(new URL(`../foxhole/${version}/classifier/model.onnx`, import.meta.url)).then(r => r.bytes()),
        fetch(new URL(`../foxhole/${version}/classifier/class_names.json`, import.meta.url)).then(r => r.json()),
        fetch(new URL('./quantities/model.onnx', import.meta.url)).then(r => r.bytes()),
        fetch(new URL('./quantities/class_names.json', import.meta.url)).then(r => r.json()),
        fiw_init(),
      ]);

      //console.log(`worker ${WORKER_ID} ready`);
      return new ScreenshotProcessor(
        ocrRecognitionOnnx,
        iconOnnx,
        iconClassNames,
        quantityOnnx,
        quantityClassNames,
      );
    })();

    return;
  }

  //console.log(`worker ${WORKER_ID} starting extracting`);
  const { rgba_buffer, width } = e.data;
  const rgba = new Uint8Array(rgba_buffer);
  const stockpile = (await processor).extract_stockpile(rgba, width);
  self.postMessage(stockpile);
  //console.log(`worker ${WORKER_ID} finished extracting`, stockpile);
};
