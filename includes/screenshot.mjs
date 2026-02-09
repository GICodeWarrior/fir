import OCR from './ocr.mjs'
import fis_init, { slice_stockpile } from './slicer/fis.js'

const fis_init_promise = fis_init();

class UnableToParseQuantity extends Error {}

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

  await fis_init_promise;
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
      models[iconModelURL],
      iconClassNames,
    ).then(results => {
      results.forEach((classification, index) => {
        Object.assign(stockpile.contents[index].icon, classification);
      });
    })
  );

  const quantityThreshold = (265 - stockpile.quantity_grey) * 2/3;
  for (const entry of stockpile.contents) {
    promises.push(
      ocrQuantity(
        screenshotCanvas,
        entry.quantity.bounds,
        models[quantityModelURL],
        quantityClassNames,
        quantityThreshold,
      ).then(q => entry.quantity.value = q).catch(function(e) {
        if (e instanceof UnableToParseQuantity) {
          console.log('Unable to parse quantity:', quantityBox);
        } else {
          throw e;
        }
      })
    );
  }

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
    //throw new UnableToParseQuantity(value);
    console.log('empty header text', box);
  }

  return value;
}

async function ocrQuantity(canvas, box, model, classNames, threshold) {
  canvas = cropCanvas(canvas, box, 'grayscale(100%) invert(100%)', 5);
  thresholdCanvas(canvas, threshold);
  //document.body.appendChild(canvas);

  canvas = autoCropCanvas(canvas, 32, 32);

  const tfImage = tf.browser.fromPixels(canvas, 1).toFloat();
  const prediction = (await model).predict(tfImage.expandDims(0));

  const best = (await prediction.argMax(1).data())[0];
  let value = classNames[best];

  if (value.match(/^[1-9][0-9]*k\+$/)) {
    value = parseInt(value.slice(0, -2), 10) * 1000;
  } else if (value.match(/^[0-9]+x$/)) {
    value = parseInt(value.slice(0, -1), 10);
  } else if (value.match(/^([1-9][0-9]*|[0-9])$/)) {
    value = parseInt(value, 10);
  } else {
    throw new UnableToParseQuantity(value);
  }

  return value;
}

const CRATED_REGEXP = new RegExp('-crated$');
async function classifyIcons(canvas, iconBounds, model, classNames) {
  const image = tf.browser.fromPixels(canvas);

  const resizedIcons = iconBounds.map(bounds => {
    const sliced = tf.slice(
      image,
      [bounds.y, bounds.x, 0],
      [bounds.height, bounds.width, 3],
    );
    const resized = tf.image.resizeBilinear(sliced, [32, 32]);
    sliced.dispose();

    return resized;
  });
  image.dispose();

  const iconsBatch = tf.stack(resizedIcons);
  resizedIcons.forEach(t => t.dispose());

  const predictions = (await model).predict(iconsBatch);
  const bestIndices = Array.from(await predictions.argMax(1).data());
  iconsBatch.dispose();
  predictions.dispose();

  return bestIndices.map(idx => {
    const key = classNames[idx];
    return {
      CodeName: key.replace(CRATED_REGEXP, ''),
      isCrated: !!key.match(CRATED_REGEXP),
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

function autoCropCanvas(image, outputWidth, outputHeight) {
  const MIN_VALUE_CROP = 128;

  const imageWidth = image.width;
  const imageHeight = image.height;

  let top = 0;
  let right = imageWidth - 1;
  let bottom = imageHeight - 1;
  let left = 0;

  const imgContext = image.getContext('2d', { alpha: false, willReadFrequently: true });
  const imgPixels = imgContext.getImageData(0, 0, imageWidth, imageHeight).data;

  for (let offset = 0; offset < imgPixels.length; offset += 4) {
    if ((imgPixels[offset] < MIN_VALUE_CROP) ||
        (imgPixels[offset + 1] < MIN_VALUE_CROP) ||
        (imgPixels[offset + 2] < MIN_VALUE_CROP)) {
      top = Math.floor((offset - 4) / 4 / imageWidth);
      break;
    }
  }

  right:
  for (let col = imageWidth - 1; col >= 0; --col) {
    for (let row = 0; row <= imageHeight; ++row) {
      const offset = (row * imageWidth + col) * 4;
      if ((imgPixels[offset] < MIN_VALUE_CROP) ||
          (imgPixels[offset + 1] < MIN_VALUE_CROP) ||
          (imgPixels[offset + 2] < MIN_VALUE_CROP)) {
        right = col;
        break right;
      }
    }
  }

  for (let offset = imgPixels.length - 4; offset >= 0; offset -= 4) {
    if ((imgPixels[offset] < MIN_VALUE_CROP) ||
        (imgPixels[offset + 1] < MIN_VALUE_CROP) ||
        (imgPixels[offset + 2] < MIN_VALUE_CROP)) {
      bottom = Math.floor((offset + 4) / 4 / imageWidth);
      break;
    }
  }

  left:
  for (let col = 0; col < imageWidth; ++col) {
    for (let row = 0; row < imageHeight; ++row) {
      const offset = (row * imageWidth + col) * 4;
      if ((imgPixels[offset] < MIN_VALUE_CROP) ||
          (imgPixels[offset + 1] < MIN_VALUE_CROP) ||
          (imgPixels[offset + 2] < MIN_VALUE_CROP)) {
        left = col;
        break left;
      }
    }
  }

  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;

  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
  //context.filter = 'blur(2px)';
  context.drawImage(image,
    left, top, cropWidth, cropHeight,
    0, 0, outputWidth, outputHeight);
  //document.body.appendChild(cropCanvas);
  //console.log("top: " + top + " right: " + right + " bottom: " + bottom + " left: " + left);

  return canvas;
}
