import OCR from './ocr.mjs'

class UnableToParseQuantity extends Error {}

const quantityOCR = new OCR();
const headerOCR = new OCR({
  charset: OCR.CHARSETS['any'],
  concurrency: 1,
});

let models = {};
export async function process(screenshotCanvas, modelURL, classNames) {
  models[modelURL] ||= tf.loadGraphModel(modelURL);

  const stockpile = extractStockpile(screenshotCanvas);
  if (!stockpile) {
    return undefined;
  }

  stockpile.box.canvas = cropCanvas(screenshotCanvas, stockpile.box);
  stockpile.contents = await extractContents(stockpile.box.canvas, models[modelURL], classNames);

  if (stockpile.contents && stockpile.contents.length) {
    const existingTop = stockpile.box.y;
    const headerHeight = stockpile.contents[0].quantityBox.height;
    stockpile.box.y = Math.max(existingTop - headerHeight, 0);

    const topOffset = existingTop - stockpile.box.y
    stockpile.box.height += topOffset;
    
    for (const element of stockpile.contents) {
      element.iconBox.y += topOffset;
      element.quantityBox.y += topOffset;
    }

    stockpile.box.canvas = cropCanvas(screenshotCanvas, stockpile.box);

    if (topOffset == headerHeight) {
      stockpile.header = await extractHeader(stockpile.box.canvas, topOffset, stockpile.contents[0].quantityBox.width);
    } else {
      stockpile.header = {};
      console.log('Unable to parse header (too small).');
    }
  }

  return stockpile;
}

const Screenshot = {
  process,
};
export default Screenshot;

function extractStockpile(canvas) {
  const MIN_INVENTORY_WIDTH = 100;
  const MIN_INVENTORY_HEIGHT = 25;

  const MAX_DARK_CHANNEL_SATURATION = 16;
  const MAX_DARK_PIXEL_LIGHTNESS = 32;

  const MAX_MERGE_VARIANCE = 3;

  const width = canvas.width;
  const height = canvas.height;

  const context = canvas.getContext('2d');
  const pixels = context.getImageData(0, 0, width, height).data;
  let darkStripes = {};

  for (let row = 0; row < height; ++row) {
    let darkCount = 0;
    for (let col = 0; col < width; ++col) {
      const redIndex = calcRedIndex(row, col, width);
      if (isDark(pixels, redIndex)) {
        ++darkCount;
      } else if (darkCount >= MIN_INVENTORY_WIDTH) {
        let left = col - darkCount;
        darkStripes[left] = darkStripes[left] || [];
        darkStripes[left].push({
          row: row,
          right: col - 1,
          left: left,
        });

        darkCount = 0;
      } else {
        darkCount = 0;
      }
    }
  }

  let boxes = Object.values(darkStripes).map(function(stripes) {
    let rights = {};
    for (const stripe of stripes) {
      rights[stripe.right] ||= 0
      rights[stripe.right] += 1;
    }
    // parseInt since keys are strings
    let mostRight = parseInt(Object.keys(rights).sort((a, b) => rights[b] - rights[a])[0], 10);

    let top = Number.MAX_SAFE_INTEGER;
    let bottom = 0;
    let darkStripes = 0;
    for (const stripe of stripes) {
      if ((stripe.right > mostRight - MAX_MERGE_VARIANCE) ||
          (stripe.right < mostRight + MAX_MERGE_VARIANCE)) {
        if (stripe.row < top) top = stripe.row;
        if (stripe.row > bottom) bottom = stripe.row;

        ++darkStripes;
      }
    }

    return {
      top: top,
      right: mostRight,
      bottom: bottom,
      left: stripes[0].left,
      darkStripes: darkStripes,
    };
  });

  if (boxes.length) {
    // Merge overlapping boxes
    let primaryOffset = 0;
    while (primaryOffset < boxes.length - 1) {
      let primary = boxes[primaryOffset];
      let innerOffset = primaryOffset + 1;
      while (innerOffset < boxes.length) {
        let inner = boxes[innerOffset];
        if ((primary.top <= inner.top) &&
            (primary.right >= inner.right) &&
            (primary.bottom >= inner.bottom) &&
            (primary.left <= inner.left)) {
          primary.darkStripes += inner.darkStripes;
          boxes.splice(innerOffset, 1);
        } else {
          ++innerOffset;
        }
      }
      ++primaryOffset;
    }
    boxes = boxes.filter(b => b.bottom - b.top >= MIN_INVENTORY_HEIGHT);

    //check left and right sides are mostly dark
    const MIN_DARK_EDGE_PERCENT = 0.8;
    boxes = boxes.filter(function(box) {
      let darkLeft = 0;
      let darkRight = 0;
      for (let row = box.top; row <= box.bottom; ++row) {
        darkLeft += isDark(pixels, calcRedIndex(row, box.left, width)) ? 1 : 0;
        darkRight += isDark(pixels, calcRedIndex(row, box.right, width)) ? 1 : 0;
      }
      const height = box.bottom - box.top + 1;

      return (darkLeft / height >= MIN_DARK_EDGE_PERCENT)
        && (darkRight / height >= MIN_DARK_EDGE_PERCENT);
    });

    // Prefer the box closest to the middle
    const middle = Math.round(width / 2);
    boxes.sort((a, b) => Math.abs(a.left - middle) - Math.abs(b.left - middle));
    const box = boxes[0];

    // Prefer the box with the most dark stripes by volume
    //boxes.sort((a, b) => (b.darkStripes / (b.bottom - b.top)) - (a.darkStripes / (a.bottom - a.top)));
    //const box = boxes[0];

    return {
      box: {
        x: box.left,
        y: box.top,
        width: box.right - box.left + 1,
        height: box.bottom - box.top + 1,
      }
    };
  }
  return undefined;

  function isDark(pixels, offset) {
    return checkPixel(
      pixels[offset], pixels[offset + 1], pixels[offset + 2],
      MAX_DARK_CHANNEL_SATURATION, 0, MAX_DARK_PIXEL_LIGHTNESS);
  }
}

async function extractContents(canvas, model, classNames) {
  // These tune the cropping of inventory items
  const MIN_QUANTITY_WIDTH = 40;
  const MAX_QUANTITY_WIDTH = 90;

  const MIN_QUANTITY_HEIGHT = 30;
  const MAX_QUANTITY_HEIGHT = 70;

  const MAX_GREY_SATURATION = 16;
  const MAX_GREY_LIGHTNESS_VARIANCE = 16;

  const width = canvas.width;
  const height = canvas.height;

  const context = canvas.getContext('2d');
  const pixels = context.getImageData(0, 0, width, height).data;

  // Find the most common grey which is probably the quantity background
  const MIN_GREY = 32;
  const MAX_GREY = 224;
  const greys = {};
  for (let offset = 0; offset < pixels.length; offset += 4) {
    const value = Math.round(getSL(pixels[offset], pixels[offset + 1], pixels[offset + 2]).lightness);
    if ((value >= MIN_GREY) && (value <= MAX_GREY)) {
      greys[value] = (greys[value] || 0) + 1;
    }
  }
  const QUANTITY_GREY_VALUE = Object.keys(greys).sort((a, b) => greys[b] - greys[a])[0];

  const contents = [];
  const promises = [];

  for (let row = 0; row < height; ++row) {
    let greyCount = 0;
    let quantityBottom = null;
    let quantityBottomVerified = false;

    for (let col = 0; col < width; ++col) {
      // Opportunity: If > N of same pixel counted, skip to next line
      const redIndex = calcRedIndex(row, col, width);
      if (isGrey(pixels[redIndex], pixels[redIndex+1], pixels[redIndex+2])) {
        ++greyCount;
      } else if ((greyCount >= MIN_QUANTITY_WIDTH) && (greyCount <= MAX_QUANTITY_WIDTH)) {
        const quantityBox = {
          x: col - greyCount,
          y: row,
          width: greyCount,
        };
        let quantityGap;

        if (!quantityBottom || !quantityBottomVerified) {
          quantityBottom = findQtyBottom(pixels, quantityBox.y, quantityBox.x, width, height);
          quantityGap = quantityBox.x;
        } else {
          const previous = contents[contents.length - 1].quantityBox;
          quantityGap = quantityBox.x - (previous.x + previous.width);
        }
        quantityBox.height = quantityBottom - quantityBox.y + 1;
        //console.log(quantityBox);

        if ((quantityBox.height >= MIN_QUANTITY_HEIGHT) && (quantityBox.height <= MAX_QUANTITY_HEIGHT)) {
          // Found an item quantity
          quantityBottomVerified = true;

          const element = {
            quantityBox,
          };
          //element.quantityBox.canvas = cropCanvas(canvas, quantityBox, 'grayscale(100%) invert(100%)', 5);

          promises.push(ocrQuantity(canvas, quantityBox, (265 - QUANTITY_GREY_VALUE) * 2/3).then(q => element.quantity = q).catch(function(e) {
            if (e instanceof UnableToParseQuantity) {
              console.log('Unable to parse quantity:', quantityBox);
            } else {
              throw e;
            }
          }));

          const iconWidth = quantityBox.height;
          const iconGap = Math.ceil((quantityGap - iconWidth) / 2);
          element.iconBox = {
            x: quantityBox.x - iconGap - iconWidth,
            y: quantityBox.y,
            width: iconWidth,
            height: iconWidth,
          };

          element.iconBox.canvas = cropCanvas(canvas, element.iconBox);
          Object.assign(element, await classifyIcon(element.iconBox.canvas, model, classNames));

          contents.push(element);
        }

        greyCount = 0;
      } else {
        greyCount = 0;
      }
    }

    //console.log(contents.length, quantityBottom);
    if (quantityBottom) {
      row = quantityBottom;
    }
  }

  await Promise.all(promises);

  return contents;

  function findQtyBottom(pixels, row, col, width, height) {
    for (var checkRow = row + 1; checkRow <= height; ++checkRow) {
      const redIndex = calcRedIndex(checkRow, col, width);
      if (!isGrey(pixels[redIndex], pixels[redIndex+1], pixels[redIndex+2])) {
        break;
      }
    }
    return checkRow - 1;
  }

  function isGrey(r, g, b) {
    return checkPixel(r, g, b, MAX_GREY_SATURATION, QUANTITY_GREY_VALUE, MAX_GREY_LIGHTNESS_VARIANCE);
  }
}

async function extractHeader(canvas, height, quantityWidth) {
  const MAX_GREY_SATURATION = 16;
  const MAX_GREY_LIGHTNESS_VARIANCE = 16;

  const width = canvas.width;
  const context = canvas.getContext('2d');
  const pixels = context.getImageData(0, 0, width, height).data;

  const histogram = {};
  for (let offset = 0; offset < pixels.length; offset += 4) {
    //const value = Math.round((0.299 * pixels[offset]) + (0.587 * pixels[offset + 1]) + (0.114 * pixels[offset + 2]));
    const value = Math.round(getSL(pixels[offset], pixels[offset + 1], pixels[offset + 2]).lightness);
    histogram[value] ||= 0;
    histogram[value] += 1;
  }
  const greyValue = Object.keys(histogram).sort((a, b) => histogram[b] - histogram[a])[0];
  const darkValueCutoff = Math.round(greyValue * 2 / 3);

  const packedWidth = width * 4;
  const scanStart = Math.round(height / 2) * packedWidth;
  const scanEnd = scanStart + packedWidth;
  const expectTab = scanEnd - (quantityWidth * 4);
  const longestGrey = {
    length: 0,
  };
  let currentGreyCount = 0;
  let tabStart = undefined;
  let hasName = true;

  for (let offset = scanStart; offset < scanEnd; offset += 4) {
    if (isGrey(pixels[offset], pixels[offset+1], pixels[offset+2]) && (offset + 4 < scanEnd)) {
      currentGreyCount += 1;
    } else if (currentGreyCount > 0) {
      if (currentGreyCount > longestGrey.length) {
        longestGrey.length = currentGreyCount;
        longestGrey.center = (offset - scanStart) / 4 - Math.round(currentGreyCount / 2);

        if (offset + 4 >= scanEnd) {
          hasName = false;
        }
      }

      currentGreyCount = 0;
    }

    if (offset >= expectTab) {
      const sl = getSL(pixels[offset], pixels[offset + 1], pixels[offset + 2]);
      if ((sl.saturation < MAX_GREY_SATURATION) && (sl.lightness < darkValueCutoff)) {
        tabStart = (offset - scanStart) / 4;
        break;
      }
    }
  }

  /*
  console.log('greyValue: ', greyValue);
  console.log('darkValueCutoff: ', darkValueCutoff);
  console.log('Header center: ', longestGrey.center);
  console.log('tabStart: ', tabStart);
  */

  const result = {
    typeBox: {
      x: 0,
      y: 0,
      width: longestGrey.center,
      height: height,
    },
  }
  const promises = [
    ocrHeader(canvas, result.typeBox).then( t => result.type = t ),
  ];

  if (hasName) {
    result.nameBox = {
      x: longestGrey.center,
      y: 0,
      width: (tabStart || width) - longestGrey.center,
      height: height,
    };
    promises.push(ocrHeader(canvas, result.nameBox).then( n => result.name = n ));
  }

  await Promise.all(promises);

  result.type = result.type.replace(/[^A-Za-z ]/g, '');

  return result;

  function isGrey(r, g, b) {
    return checkPixel(r, g, b, MAX_GREY_SATURATION, greyValue, MAX_GREY_LIGHTNESS_VARIANCE);
  }
}

async function ocrHeader(canvas, box) {
  const cropAmount = Math.floor(box.height / 6);
  const cropBox = {
    x: box.x + cropAmount,
    y: box.y + cropAmount,
    width: box.width - (cropAmount * 2),
    height: box.height - (cropAmount * 2),
  }
  canvas = cropCanvas(canvas, cropBox, 'grayscale(100%) invert(100%)', 5);

  const threshold = Math.round(256 / 3);
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

async function ocrQuantity(canvas, box, threshold) {
  /*const cropAmount = Math.floor(box.height / 4);
  const cropBox = {
    x: box.x,
    y: box.y + cropAmount,
    width: box.width,
    height: box.height - (cropAmount * 2),
  }*/
  //const desiredHeight = 75;
  //canvas = cropCanvas(canvas, box, 'grayscale(100%) invert(100%)', desiredHeight / (box.height * 12/32));
  canvas = cropCanvas(canvas, box, 'grayscale(100%) invert(100%)', 5);

  thresholdCanvas(canvas, threshold);
  //canvas = autoCropCanvas(canvas);
  //document.body.appendChild(canvas);

  const result = await quantityOCR.recognize(canvas);

  let value = result.data.text.trim();
  if (value.match(/^[1-9][0-9]*k\+$/)) {
    value = parseInt(value.slice(0, -2), 10) * 1000;
  } else if (value.match(/^([1-9][0-9]*|[0-9])$/)) {
    value = parseInt(value, 10);
  } else {
    throw new UnableToParseQuantity(value);
  }

  return value;
}

const CRATED_REGEXP = new RegExp('-crated$');
async function classifyIcon(canvas, model, classNames) {
  const tfImage = tf.image.resizeBilinear(tf.browser.fromPixels(canvas), [32, 32])
  const prediction = (await model).predict(tfImage.expandDims(0));

  const best = prediction.argMax(1).dataSync()[0];
  const key = classNames[best];

  return {
    CodeName: key.replace(CRATED_REGEXP, ''),
    isCrated: !!key.match(CRATED_REGEXP),
  };
}

function thresholdCanvas(canvas, threshold) {
  const context = canvas.getContext('2d');
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  for (let offset = 0; offset < imageData.data.length; offset += 4) {
    let value;
    if ((imageData.data[offset] <= threshold)
        && (imageData.data[offset + 1] <= threshold)
        && (imageData.data[offset + 2] <= threshold)) {
      value = 0;
    } else {
      value = 255;
    }

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

  const outputContext = output.getContext('2d');
  outputContext.filter = filter;
  outputContext.drawImage(input,
      box.x, box.y, box.width, box.height,
      0, 0, outputWidth, outputHeight);

  return output;
}

function autoCropCanvas(image) {
  const MIN_VALUE_CROP = 128;

  const imageWidth = image.width;
  const imageHeight = image.height;

  let top = 0;
  let right = imageWidth - 1;
  let bottom = imageHeight - 1;
  let left = 0;
  const imgContext = image.getContext('2d');
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

  const cropWidth = right - left + 6;
  const cropHeight = bottom - top + 6;

  const canvas = document.createElement('canvas');
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  const context = canvas.getContext('2d');
  //context.filter = 'blur(2px)';
  context.drawImage(image,
    left - 3, top - 3, cropWidth, cropHeight,
    0, 0, cropWidth, cropHeight);
  //document.body.appendChild(cropCanvas);
  //console.log("top: " + top + " right: " + right + " bottom: " + bottom + " left: " + left);

  return canvas;
}

function calcRedIndex(row, col, width) {
  // Assumes RGBA packing
  return (col * 4) + (row * width * 4);
}

function getSL(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return {
    saturation: max > 0 ? (max - min) / max : 0,
    lightness: (max + min) / 2,
  };
}

function checkPixel(r, g, b, max_saturation, desired_lightness, lightness_variance) {
  const sl = getSL(r, g, b);
  return (sl.saturation <= max_saturation) &&
    (Math.abs(sl.lightness - desired_lightness) < lightness_variance);
}