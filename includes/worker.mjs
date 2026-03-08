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
        fetch('./text-recognition-model.onnx').then(r => r.bytes()),
        fetch(`../foxhole/${version}/classifier/model.onnx`).then(r => r.bytes()),
        fetch(`../foxhole/${version}/classifier/class_names.json`).then(r => r.json()),
        fetch('./quantities/model.onnx').then(r => r.bytes()),
        fetch('./quantities/class_names.json').then(r => r.json()),
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
