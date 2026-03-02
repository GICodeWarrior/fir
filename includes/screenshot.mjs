import OCR from './ocr.mjs'
import fiw_init, { slice_stockpile_and_prepare_images } from './wasm/fiw.js'

const globalInitPromises = [
  fiw_init(),
  tf.setBackend('wasm'),
];

const headerOCR = new OCR({
  concurrency: 2,
  stop_delay: 5000,
});

let models = {};
export async function process(screenshotCanvas, iconModelURL, iconClassNames, quantityModelURL, quantityClassNames) {
  models[iconModelURL] ||= tf.loadGraphModel(iconModelURL);
  models[quantityModelURL] ||= tf.loadGraphModel(quantityModelURL);

  const width = screenshotCanvas.width;
  const height = screenshotCanvas.height;

  const context = screenshotCanvas.getContext('2d', { alpha: false, willReadFrequently: true });
  const rgba = context.getImageData(0, 0, width, height).data;

  const initPromises = [
    models[iconModelURL],
    models[quantityModelURL],
    ...globalInitPromises,
  ];
  const [iconModel, quantityModel, ] = await Promise.all(initPromises);

  const stockpile_with_tensors = slice_stockpile_and_prepare_images(rgba, width);
  if (!stockpile_with_tensors) {
    console.log("extraction failed");
    return;
  }
  const stockpile = stockpile_with_tensors.stockpile;

  const promises = [];

  if (stockpile.contents.length) {
    promises.push(
      classifyIcons(
        stockpile_with_tensors.icons_tensor,
        stockpile.contents.length,
        iconModel,
        iconClassNames,
      ).then(results => {
        results.forEach((classification, index) => {
          Object.assign(stockpile.contents[index].icon, classification);
        });
      })
    );

    promises.push(
      classifyQuantities(
        stockpile_with_tensors.quantities_tensor,
        stockpile.contents.length,
        quantityModel,
        quantityClassNames,
      ).then(results => {
        results.forEach((classification, index) => {
          Object.assign(stockpile.contents[index].quantity, classification);
        });
      })
    );
  }

  if (stockpile.header) {
    stockpile.header.stockpile_type.bounds
    promises.push(
      ocrHeader(
        screenshotCanvas,
        stockpile.header.stockpile_type.bounds,
        stockpile.quantity_grey,
      ).then(value => {
        value = value.replace(/[^A-Za-z ]/g, '').trim();
        stockpile.header.stockpile_type.value = value;
      })
    );

    if (stockpile.header.stockpile_name) {
      promises.push(
        ocrHeader(
          screenshotCanvas,
          stockpile.header.stockpile_name.bounds,
          stockpile.quantity_grey,
        ).then(v => stockpile.header.stockpile_name.value = v)
      );
    }
  }

  await Promise.all(promises);

  return stockpile;
}

const Screenshot = {
  process,
};
export default Screenshot;

async function ocrHeader(canvas, box, quantityGrey) {
  const cropAmount = Math.floor(box.height / 6);
  const cropBox = {
    x: box.x + cropAmount,
    y: box.y + cropAmount,
    width: box.width - cropAmount,
    height: box.height - (cropAmount * 2),
  }
  const resizeFactor = 80 / box.height;
  canvas = cropCanvas(canvas, cropBox, 'grayscale(100%) invert(100%)', resizeFactor);

  const threshold = (255 - quantityGrey) / 2;
  thresholdCanvas(canvas, threshold);

  const result = await headerOCR.recognize(canvas);
  //document.body.appendChild(canvas);

  let value = result.data.text.trim();
  if (!value.length) {
    console.log('empty header text', box);
  }

  return value;
}

/*
async function debugShowTensor(t) {
  const data = await t.data();
  const [B, H, W, C] = t.shape;

  if (C !== 1 && C !== 3) {
    throw new Error(`Expected channels 1 or 3, got ${C}`);
  }

  for (let b = 0; b < B; b++) {
    const img = new ImageData(W, H);
    const base = b * H * W * C;

    for (let p = 0; p < H * W; p++) {
      const src = base + p * C;
      const dst = p * 4;

      if (C === 1) {
        const v = Math.max(0, Math.min(255, Math.round(data[src])));
        img.data[dst + 0] = v;
        img.data[dst + 1] = v;
        img.data[dst + 2] = v;
        img.data[dst + 3] = 255;
      } else {
        img.data[dst + 0] = Math.max(0, Math.min(255, Math.round(data[src + 0])));
        img.data[dst + 1] = Math.max(0, Math.min(255, Math.round(data[src + 1])));
        img.data[dst + 2] = Math.max(0, Math.min(255, Math.round(data[src + 2])));
        img.data[dst + 3] = 255;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.style.imageRendering = 'pixelated';
    canvas.style.border = '1px solid #ccc';
    canvas.style.margin = '8px';

    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.putImageData(img, 0, 0);

    document.body.appendChild(canvas);
  }
}
*/

async function batchPredict(raw_tensor, shape, model) {
  const tensor = tf.tensor4d(raw_tensor, shape, 'float32');
  const predictions = model.predict(tensor);

  const argMax = predictions.argMax(1);
  const results = await argMax.data();

  tensor.dispose();
  predictions.dispose();
  argMax.dispose();

  return results;
}

const CRATED_REGEXP = new RegExp('-crated$');
async function classifyIcons(tensor, count, model, classNames) {
  const bestIndices = await batchPredict(tensor, [count, 32, 32, 3], model);

  return Array.from(bestIndices, index => {
    const key = classNames[index];
    return {
      CodeName: key.replace(CRATED_REGEXP, ''),
      isCrated: !!key.match(CRATED_REGEXP),
    };
  });
}

async function classifyQuantities(tensor, count, model, classNames) {
  const bestIndices = await batchPredict(tensor, [count, 16, 21, 1], model);

  return Array.from(bestIndices, index => {
    const label = classNames[index];
    let value;

    if (label.match(/k\+$/)) {
      value = parseInt(label.slice(0, -2), 10) * 1000;
    } else if (label.match(/x$/)) {
      value = parseInt(label.slice(0, -1), 10);
    } else {
      value = parseInt(label, 10);
    }

    return {
      label: label,
      value: value,
    };
  });
}

function thresholdCanvas(canvas, threshold) {
  const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const length = imageData.data.length;

  for (let offset = 0; offset < length; offset += 4) {
    const value = (imageData.data[offset] <= threshold) ? imageData.data[offset] : 255;

    imageData.data[offset] = value;
    imageData.data[offset + 1] = value;
    imageData.data[offset + 2] = value;
  }
  context.putImageData(imageData, 0, 0);
}

function cropCanvas(input, box, filter, resize) {
  if (!filter) filter = 'none';
  if (!resize) resize = 1;

  const outputWidth = Math.round(box.width * resize);
  const outputHeight = Math.round(box.height * resize);

  const output = document.createElement('canvas');
  output.width = outputWidth;
  output.height = outputHeight;

  const outputContext = output.getContext('2d', { alpha: false, willReadFrequently: true });
  outputContext.filter = filter;
  outputContext.drawImage(input,
      box.x, box.y, box.width, box.height,
      0, 0, outputWidth, outputHeight);

  return output;
}

