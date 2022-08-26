import OCR from './ocr.js'

const fetch = (window && window.fetch) || (await import('node-fetch'));

const res = {
  CATALOG: fetch('./includes/catalog.json').then(r => r.json()),
  CLASS_NAMES: fetch('./includes/class_names.json').then(r => r.json()),
  MODEL: tf.loadGraphModel('./includes/classifier/model.json'),
}

await Promise.all([...Object.values(res)]).then(function (results) {
  let index = 0;
  for (const key of Object.keys(res)) {
    res[key] = results[index++];
  }
});

export async function process(screenshotCanvas, options) {
  if (options && options.ocrConcurrency){
    OCR.concurrency = options.ocrConcurrency;
  }

  const stockpile = extractStockpile(screenshotCanvas);
  if (!stockpile) {
    return undefined;
  }

  stockpile.box.canvas = cropCanvas(screenshotCanvas, stockpile.box);
  stockpile.contents = await extractContents(stockpile.box.canvas);

  if (stockpile.contents && stockpile.contents.length) {
    const existingTop = stockpile.box.y;
    stockpile.box.y = Math.max(existingTop - stockpile.contents[0].quantityBox.height, 0);

    const topOffset = existingTop - stockpile.box.y
    stockpile.box.height += topOffset;
    
    for (const element of stockpile.contents) {
      element.iconBox.y += topOffset;
      element.quantityBox.y += topOffset;
    }

    stockpile.box.canvas = cropCanvas(screenshotCanvas, stockpile.box);
  }

  return stockpile;
}

const Screenshot = {
  process,
};
export default Screenshot;

function extractStockpile(canvas) {
  // These tune the cropping of inventory boxes
  const MIN_INVENTORY_WIDTH = 100;
  const MIN_INVENTORY_HEIGHT = 25;

  const MAX_DARK_CHANNEL_VARIANCE = 16;
  const MAX_DARK_PIXEL_VALUE = 32;

  const MAX_GREY_CHANNEL_VARIANCE = 5;
  const MAX_GREY_PIXEL_VARIANCE = 8;
  const HEADER_GREY_VALUE = 131;

  const MAX_MERGE_VARIANCE = 3;

  const width = canvas.width;
  const height = canvas.height;

  const context = canvas.getContext('2d');
  const pixels = context.getImageData(0, 0, width, height).data;
  let darkStripes = {};

  let darkCount = 0;
  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      const redIndex = calcRedIndex(row, col, width);
      if (isDark(pixels[redIndex], pixels[redIndex+1], pixels[redIndex+2])) {
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
    stripes.forEach(function(stripe) {
      rights[stripe.right] = (rights[stripe.right] || 0) + 1;
    });
    // parseInt since keys are strings
    let mostRight = parseInt(Object.keys(rights).sort((a, b) => rights[b] - rights[a])[0], 10);

    let top = Number.MAX_SAFE_INTEGER;
    let bottom = 0;
    let darkStripes = 0;
    stripes.forEach(function(stripe) {
      if ((stripe.right > mostRight - MAX_MERGE_VARIANCE) ||
          (stripe.right < mostRight + MAX_MERGE_VARIANCE)) {
        if (stripe.row < top) top = stripe.row;
        if (stripe.row > bottom) bottom = stripe.row;

        ++darkStripes;
      }
    });

    return {
      top: top,
      right: mostRight,
      bottom: bottom,
      left: stripes[0].left,
      darkStripes: darkStripes,
    };
  });
  boxes = boxes.filter(b => b.bottom - b.top >= MIN_INVENTORY_HEIGHT);

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

    // Prefer the box closest to the middle
    let middle = Math.round(width / 2);
    boxes.sort((a, b) => Math.abs(a.left - middle) - Math.abs(b.left - middle));
    let box = boxes[0];

    // Prefer the box with the most dark stripes by volume
    //boxes.sort((a, b) => (b.darkStripes / (b.bottom - b.top)) - (a.darkStripes / (a.bottom - a.top)));
    //box = boxes[0];

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

  function isDark(r, g, b) {
    return checkPixel(r, g, b, MAX_DARK_CHANNEL_VARIANCE, 0, MAX_DARK_PIXEL_VALUE);
  }

  function isGrey(r, g, b) {
    return checkPixel(r, g, b, MAX_GREY_CHANNEL_VARIANCE, HEADER_GREY_VALUE, MAX_GREY_PIXEL_VARIANCE);
  }

  function isLight(r, g, b) {
    return !isDark(r, g, b) && !isGrey(r, g, b);
  }
}

async function extractContents(canvas) {
  // These tune the cropping of inventory items
  const MIN_QUANTITY_WIDTH = 40;
  const MAX_QUANTITY_WIDTH = 90;

  const MIN_QUANTITY_HEIGHT = 30;
  const MAX_QUANTITY_HEIGHT = 70;

  const MAX_GREY_CHANNEL_VARIANCE = 16;
  const MAX_GREY_PIXEL_VARIANCE = 16;

  const width = canvas.width;
  const height = canvas.height;

  const context = canvas.getContext('2d');
  const pixels = context.getImageData(0, 0, width, height).data;

  // Find the most common grey which is probably the quantity background
  const MIN_GREY = 32;
  const MAX_GREY = 224;
  let greys = {};
  for (let offset = 0; offset < pixels.length; offset += 4) {
    let value = pixels[offset];
    if ((value >= MIN_GREY) &&
        (value <= MAX_GREY) &&
        (pixels[offset + 1] == value) &&
        (pixels[offset + 2] == value)) {
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
          element.quantityBox.canvas = cropCanvas(canvas, quantityBox, 'invert(100%) contrast(250%)', 5);
          promises.push(ocrQuantity(element.quantityBox.canvas).then(q => element.quantity = q));

          const iconWidth = quantityBox.height;
          const iconGap = Math.ceil((quantityGap - iconWidth) / 2);
          element.iconBox = {
            x: quantityBox.x - iconGap - iconWidth,
            y: quantityBox.y,
            width: iconWidth,
            height: iconWidth,
          };

          element.iconBox.canvas = cropCanvas(canvas, element.iconBox);
          Object.assign(element, classifyIcon(element.iconBox.canvas));

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
    return checkPixel(r, g, b, MAX_GREY_CHANNEL_VARIANCE, QUANTITY_GREY_VALUE, MAX_GREY_PIXEL_VARIANCE);
  }
}

async function ocrQuantity(canvas) {
  const result = await OCR.recognize(canvas);

  let value = result.data.text.trim();
  if (value.match(/^[1-9][0-9]*k\+$/)) {
    value = parseInt(value.slice(0, -2), 10) * 1000;
  } else if (value.match(/^([1-9][0-9]*|[0-9])$/)) {
    value = parseInt(value, 10);
  } else {
    value = 0;
    console.log('unable to parse quantity...', result);
  }

  return value;
}

const CRATED_REGEXP = new RegExp('-crated$');
function classifyIcon(canvas) {
  const tfImage = tf.image.resizeBilinear(tf.browser.fromPixels(canvas), [32, 32])
  const prediction = res.MODEL.predict(tfImage.expandDims(0));

  const best = prediction.argMax(1).dataSync()[0];
  const key = res.CLASS_NAMES[best];

  return {
    CodeName: key.replace(CRATED_REGEXP, ''),
    isCrated: !!key.match(CRATED_REGEXP),
  };
}

function cropCanvas(input, box, filter, resize) {
  if (!filter) filter = 'none';
  if (!resize) resize = 1;

  const outputWidth = Math.round(box.width * resize);
  const outputHeight = Math.round(box.height * resize);

  const output = document.createElement('canvas');
  output.width = outputWidth;
  output.height = outputHeight;

  const outputContext = output.getContext("2d");
  outputContext.filter = filter;
  outputContext.drawImage(input,
      box.x, box.y, box.width, box.height,
      0, 0, outputWidth, outputHeight);

  return output;
}

function calcRedIndex(row, col, width) {
  // Assumes RGBA packing
  return (col * 4) + (row * width * 4);
}

function checkPixel(r, g, b, channel_variance, pixel_value, pixel_variance) {
  const avg = (r + g + b) / 3;
  return (Math.abs(avg - r) < channel_variance) &&
    (Math.abs(avg - g) < channel_variance) &&
    (Math.abs(avg - b) < channel_variance) &&
    (Math.abs(avg - pixel_value) < pixel_variance);
}