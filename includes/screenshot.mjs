import OCR from './ocr.mjs'
import fis_init, { slice_stockpile } from './slicer/fis.js'

const globalInitPromises = [
  fis_init(),
  tf.setBackend('wasm'),
];

const quantityOCR = new OCR();
const headerOCR = new OCR({
  charset: OCR.CHARSETS['any'],
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

  const stockpile = slice_stockpile(rgba, width);
  if (!stockpile) {
    console.log("extraction failed");
    return;
  }

  const promises = [];

  promises.push(
    classifyIcons(
      screenshotCanvas,
      stockpile.contents.map(e => e.icon.bounds),
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
      screenshotCanvas,
      stockpile.contents.map(e => e.quantity.bounds),
      quantityModel,
      quantityClassNames,
    ).then(results => {
      results.forEach((classification, index) => {
        Object.assign(stockpile.contents[index].quantity, classification);
      });
    })
  );

  if (stockpile.header) {
    stockpile.header.stockpile_type.bounds
    promises.push(
      ocrHeader(
        screenshotCanvas,
        stockpile.header.stockpile_type.bounds,
      ).then(value => {
        value = value.replace(/[^A-Za-z ]/g, '');
        stockpile.header.stockpile_type.value = value;
      })
    );

    if (stockpile.header.stockpile_name) {
      promises.push(
        ocrHeader(
          screenshotCanvas,
          stockpile.header.stockpile_name.bounds,
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

async function ocrHeader(canvas, box) {
  const cropAmount = Math.floor(box.height / 6);
  const cropBox = {
    x: box.x + cropAmount,
    y: box.y + cropAmount,
    width: box.width - cropAmount,
    height: box.height - (cropAmount * 2),
  }
  canvas = cropCanvas(canvas, cropBox, 'grayscale(100%) invert(100%)', 2);

  const threshold = Math.round(256 * 3 / 10);
  thresholdCanvas(canvas, threshold);

  const result = await headerOCR.recognize(canvas);
  //document.body.appendChild(canvas);

  let value = result.data.text.trim();
  if (!value.length) {
    console.log('empty header text', box);
  }

  return value;
}

async function batchPredict(canvas, bounds, model, classNames, shape, channels) {
  const groups = {};
  bounds.forEach((b, i) => {
    const key = `${b.width}x${b.height}`;
    groups[key] ||= [];
    groups[key].push(Object.assign({ index: i }, b));
  });

  const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });

  const reorderIndices = [];
  const predictionDataPromises = [];

  const toDispose = [];

  for (const group of Object.values(groups)) {
    const batch = group.map(box => {
      reorderIndices.push(box.index);

      const data = context.getImageData(box.x, box.y, box.width, box.height).data;
      const result = [];

      for (let y = 0; y < box.height; ++y) {
        const row = [];
        for (let x = 0; x < box.width; ++x) {
          const index = (y * box.width + x) * 4;
          if (channels === 1) {
            row.push([data[index]]);
          } else if (channels === 3) {
            row.push([data[index], data[index + 1], data[index + 2]]);
          }
        }
        result.push(row);
      }

      return result;
    });

    const resized = tf.image.resizeBilinear(batch, shape);
    toDispose.push(resized);

    const predictions = model.predict(resized);
    toDispose.push(predictions);

    const argMax = predictions.argMax(1);
    toDispose.push(argMax);

    predictionDataPromises.push(argMax.data());
  }

  const groupedResults = await Promise.all(predictionDataPromises);
  toDispose.concat(groupedResults);

  const results = new Array(bounds.length);
  let offset = 0;
  for (const group of groupedResults) {
    for (const result of group) {
      results[reorderIndices[offset++]] = result;
    }
  }

  for (const tensor of toDispose) {
    tensor.dispose();
  }

  return results;
}

const CRATED_REGEXP = new RegExp('-crated$');
async function classifyIcons(canvas, iconBounds, model, classNames) {
  const bestIndices = await batchPredict(canvas, iconBounds, model, classNames, [32, 32], 3);

  return bestIndices.map(index => {
    const key = classNames[index];
    return {
      CodeName: key.replace(CRATED_REGEXP, ''),
      isCrated: !!key.match(CRATED_REGEXP),
    };
  });
}

async function classifyQuantities(canvas, quantityBounds, model, classNames) {
  const bestIndices = await batchPredict(canvas, quantityBounds, model, classNames, [21, 16], 1);

  return bestIndices.map(index => {
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
    const value = !(imageData.data[offset] <= threshold) * 255;

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

