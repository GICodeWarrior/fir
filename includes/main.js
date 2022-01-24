'use strict';

var imagesProcessed = 0;
var imagesTotal = 0;
var itemBundles = [];

addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('form input');
  const download = document.querySelector('button');

  document.querySelector('form').addEventListener('submit', function(e) {
    // Prevent a submit that would lose our work
    e.preventDefault();
  });

  input.addEventListener('change', function() {
    if (!this.files.length) {
      return;
    }

    const scheduler = initTesseractScheduler();

    const collage = document.querySelector('div.render');
    collage.innerHTML = '';

    document.querySelector('table > tbody').innerHTML = '';
    itemBundles = [];

    imagesProcessed = 0;
    imagesTotal = this.files.length;
    document.querySelector('li span').textContent = imagesProcessed + " of " + imagesTotal;

    const files = Array.from(this.files).sort(function(a, b) {
      // Consistent ordering based on when each screenshot was captured
      return a.lastModified - b.lastModified;
    });

    files.forEach(function(file) {
      const container = document.createElement('div');
      const label = document.createElement('span');
      label.textContent = file.name;
      label.contentEditable = true;
      label.spellcheck = false;
      container.appendChild(label);

      const image = document.createElement('img');
      image.style.display = 'none';
      image.addEventListener('load', getProcessImage(scheduler), { once: true });
      image.src = URL.createObjectURL(file);
      container.appendChild(image);

      collage.appendChild(container);
    });
  });

  download.addEventListener('click', function() {
    const collage = document.querySelector('div.render');
    html2canvas(collage, {
      width: collage.scrollWidth,
      height: collage.scrollHeight,
      windowWidth: collage.scrollWidth + 16,
      windowHeight: collage.scrollHeight + 16,
    }).then(function(canvas) {
      var link = document.createElement('a');
      link.href = canvas.toDataURL();

      var time = new Date();
      link.download = time.toISOString() + "_" + 'foxhole-inventory.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
});

function getProcessImage(scheduler) {
  return function() {
    return processImage.call(this, scheduler);
  };

  async function processImage(scheduler) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = this.width;
    canvas.height = this.height;
    context.drawImage(this, 0, 0);

    const inventory = cropInventory(canvas);
    if (inventory) {
      this.src = inventory.canvas.toDataURL();
    }

    const items = await cropItems(scheduler, inventory.canvas);
    itemBundles.push(items);

    this.style.display = '';
    ++imagesProcessed;
    document.querySelector('li span').textContent = imagesProcessed + " of " + imagesTotal;

    if (imagesProcessed == imagesTotal) {
      coalesceAndIdentifyItems(itemBundles);

      await terminateTesseractScheduler(scheduler);
    }
  }
}

function cropInventory(canvas) {
  // These tune the cropping of inventory boxes
  const MIN_INVENTORY_WIDTH = 100;
  const MIN_CORNER_LIGHT = 5; // out of 7
  const MIN_CORNER_DARK = 6; // out of 6

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
  var boxes = [];

  var darkCount = 0;
  for (var row = 0; row < height; ++row) {
    for (var col = 0; col < width; ++col) {
      const redIndex = calcRedIndex(row, col, width);
      if (isDark(pixels[redIndex], pixels[redIndex+1], pixels[redIndex+2])) {
        ++darkCount;
      } else if (darkCount >= MIN_INVENTORY_WIDTH) {
        var box = {
          right: col - 1,
          bottom: row,
          left: col - darkCount,
        };

        if (checkRightCorner(pixels, box.bottom, box.right, width) &&
              checkLeftCorner(pixels, box.bottom, box.left, width)) {
          box.top = findTop(pixels, box.bottom, Math.round(box.right - darkCount / 2), width);

          // Inventory windows can't start at the top
          if (box.top > 0) {
            var leftOffset = Math.abs((box.right - box.left) - width / 2);
            var topOffset = Math.abs((box.bottom - box.top) - height / 2);
            box.middleOffset = Math.sqrt(leftOffset * leftOffset + topOffset * topOffset);
            boxes.push(box);
          }
        }

        darkCount = 0;
      } else {
        darkCount = 0;
      }
    }
  }

  if (boxes.length) {
    // Prefer the box closest to the middle
    boxes.sort((a, b) => a.middleOffset - b.middleOffset);
    var box = boxes[0];

    // Prefer tallest box with similar left and right
    boxes = boxes.filter(function(a) {
      return Math.abs(a.left - box.left) <= MAX_MERGE_VARIANCE &&
        Math.abs(a.right - box.right) <= MAX_MERGE_VARIANCE
    });
    boxes.sort((a, b) => (b.bottom - b.top) - (a.bottom - a.top));
    box = boxes[0];

    box.canvas = cropCanvas(canvas, box.top, box.right, box.bottom, box.left);
    return box;
  }
  return false;

  function checkRightCorner(pixels, row, col, width) {
    var darkCornerCount = 0;
    for (var darkRow = row - 2; darkRow < row; ++darkRow) {
      for (var darkCol = col - 2; darkCol <= col; ++darkCol) {
        const darkRedIdx = calcRedIndex(darkRow, darkCol, width);
        if (isDark(pixels[darkRedIdx], pixels[darkRedIdx+1], pixels[darkRedIdx+2])) {
          ++darkCornerCount;
        }
      }
    }

    var lightCornerCount = 0;
    var lightCol = col + 1;
    for (var lightRow = row - 2; lightRow <= row + 1; ++lightRow) {
      const lightRedIdx = calcRedIndex(lightRow, lightCol, width);
      if (!isDark(pixels[lightRedIdx], pixels[lightRedIdx+1], pixels[lightRedIdx+2])) {
        ++lightCornerCount;
      }
    }

    lightRow = row + 1;
    for (lightCol = col - 2; lightCol <= col; ++lightCol) {
      const lightRedIdx = calcRedIndex(lightRow, lightCol, width);
      if (!isDark(pixels[lightRedIdx], pixels[lightRedIdx+1], pixels[lightRedIdx+2])) {
        ++lightCornerCount;
      }
    }

    return (darkCornerCount >= MIN_CORNER_DARK) &&
      (lightCornerCount >= MIN_CORNER_LIGHT);
  }

  function checkLeftCorner(pixels, row, col, width) {
    var darkCornerCount = 0;
    for (var darkRow = row - 2; darkRow < row; ++darkRow) {
      for (var darkCol = col; darkCol <= col + 2; ++darkCol) {
        const darkRedIdx = calcRedIndex(darkRow, darkCol, width);
        if (isDark(pixels[darkRedIdx], pixels[darkRedIdx+1], pixels[darkRedIdx+2])) {
          ++darkCornerCount;
        }
      }
    }

    var lightCornerCount = 0;
    var lightCol = col - 1;
    for (var lightRow = row - 2; lightRow <= row + 1; ++lightRow) {
      const lightRedIdx = calcRedIndex(lightRow, lightCol, width);
      if (!isDark(pixels[lightRedIdx], pixels[lightRedIdx+1], pixels[lightRedIdx+2])) {
        ++lightCornerCount;
      }
    }

    lightRow = row + 1;
    for (lightCol = col; lightCol <= col + 2; ++lightCol) {
      const lightRedIdx = calcRedIndex(lightRow, lightCol, width);
      if (!isDark(pixels[lightRedIdx], pixels[lightRedIdx+1], pixels[lightRedIdx+2])) {
        ++lightCornerCount;
      }
    }

    return (darkCornerCount >= MIN_CORNER_DARK) &&
      (lightCornerCount >= MIN_CORNER_LIGHT);
  }

  function findTop(pixels, row, col, width) {
    var checkRow = row - 1;
    var foundGrey = false;
    while (checkRow > 0) {
      var lightRedIdx = calcRedIndex(checkRow, col, width);
      if (foundGrey && isLight(pixels[lightRedIdx], pixels[lightRedIdx+1], pixels[lightRedIdx+2])) {
        break;
      } else if (isGrey(pixels[lightRedIdx], pixels[lightRedIdx+1], pixels[lightRedIdx+2])) {
        foundGrey = true;
      } else {
        foundGrey = false;
      }
      --checkRow;
    }
    return checkRow;
  }

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

async function cropItems(tesseract, canvas) {
  // These tune the cropping of inventory items
  const MIN_QUANTITY_WIDTH = 50;
  const MAX_QUANTITY_WIDTH = 60;

  const MIN_QUANTITY_HEIGHT = 40;
  const MAX_QUANTITY_HEIGHT = 50;

  const MAX_GREY_CHANNEL_VARIANCE = 16;
  const MAX_GREY_PIXEL_VARIANCE = 16;
  const QUANTITY_GREY_VALUE = 84;

  const width = canvas.width;
  const height = canvas.height;

  const context = canvas.getContext('2d');
  const pixels = context.getImageData(0, 0, width, height).data;
  const quantities = [];

  var greyCount = 0;
  var quantityBottom = null;
  var quantityGap = null;
  var iconWidth = null;
  for (var row = 0; row < height; ++row) {
    for (var col = 0; col < width; ++col) {
      // Opportunity: If > N of same pixel counted, skip to next line
      const redIndex = calcRedIndex(row, col, width);
      if (isGrey(pixels[redIndex], pixels[redIndex+1], pixels[redIndex+2], QUANTITY_GREY_VALUE)) {
        ++greyCount;
      } else if ((greyCount >= MIN_QUANTITY_WIDTH) && (greyCount <= MAX_QUANTITY_WIDTH)) {
        var quantity = {
          right: col - 1,
          top: row,
          left: col - greyCount,
        };
        if (!quantityBottom) {
          quantityBottom = findQtyBottom(pixels, quantity.top, quantity.left, width, height);
        } else if (!quantityGap) {
          var previous = quantities[quantities.length - 1];
          quantityGap = quantity.left - previous.right - 1;
          iconWidth = previous.bottom - previous.top + 1;
        }
        quantity.bottom = quantityBottom;

        var quantityHeight = quantity.bottom - quantity.top;
        if ((quantityHeight >= MIN_QUANTITY_HEIGHT) && (quantityHeight <= MAX_QUANTITY_HEIGHT)) {
          quantity.canvas = cropCanvas(canvas,
              quantity.top, quantity.right, quantity.bottom, quantity.left,
              'invert(100%) contrast(200%)');

          quantity.analysis = (await tesseract).addJob('recognize', quantity.canvas);
          quantities.push(quantity);
        }

        greyCount = 0;
      } else {
        greyCount = 0;
      }
    }

    if (quantityBottom) {
      row = quantityBottom;
      quantityBottom = null;
    }
  }

  const iconRightOffset = Math.ceil((quantityGap - iconWidth) / 2);
  const iconLeftOffset = iconRightOffset + iconWidth;
  const items = quantities.map(function(quantity) {
    var icon = {
      top: quantity.top,
      right: quantity.left - iconRightOffset,
      bottom: quantity.bottom,
      left: quantity.left - iconLeftOffset,
    };
    icon.canvas = cropCanvas(canvas, icon.top, icon.right, icon.bottom, icon.left);

    //document.body.appendChild(icon.canvas);
    //document.body.appendChild(quantity.canvas);
    //console.log("icon: ", icon, "quantity: ", quantity);

    return {quantity: quantity, icon: icon};
  });

  for (const item of items) {
    var result = await (item.quantity.analysis);
    item.quantity.tesseractResult = result;
    item.quantity.amount = parseInt(result.data.text.trim(), 10);
  }

  //console.log("quantityGap: " + quantityGap + " iconWidth: " + iconWidth);

  return items;

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

function coalesceAndIdentifyItems(itemBundles) {
  const MAX_HAMMING_DISTANCE = 5;
  const MAX_PERFECT_HAMMING_DISTANCE = 1;
  const MAX_IMAGE_DIFF = 20;
  const MAX_IMAGE_TOP_CORNER_DIFF = 20;
  const MAX_IMAGE_MIDDLE_DIFF = 20;
  const MAX_IMAGE_BOTTOM_CORNER_DIFF = 20;

  const table = document.querySelector('table > tbody');

  const items = [];
  for (let bundleIdx = 0; bundleIdx < itemBundles.length; ++bundleIdx) {
    for (const rawItem of itemBundles[bundleIdx]) {
      /*
      const width = item.icon.canvas.width;
      const height = item.icon.canvas.height;

      const context = item.icon.canvas.getContext('2d');
      const pixels = context.getImageData(0, 0, width, height).data;

      var totalValue = 0;
      for (var i = 0; i < pixels.length; ++i) {
        totalValue += pixels[i++];
        totalValue += pixels[i++];
        totalValue += pixels[i++];
        // Ignore alpha channel
      }
      item.icon.avgValue = totalValue / (width * height * 3);
      */

      rawItem.icon.cropped = autoCropImage(rawItem.icon.canvas);
      rawItem.icon.aHash = pHashImage(rawItem.icon.cropped);

      const canvasA = rawItem.icon.cropped;
      const subWidth = Math.floor(canvasA.width / 3);
      const subHeight = Math.floor(canvasA.height / 3);

      var found = false;
      for (const item of items) {
        const distance = hammingDistance(rawItem.icon.aHash, item.aHash);
        if (distance > MAX_PERFECT_HAMMING_DISTANCE) {
          if (distance > MAX_HAMMING_DISTANCE) {
            continue;
          }

/*
          const canvasB = item.collection[0].icon.cropped;
          if (diffImages(canvasA, canvasB) > MAX_IMAGE_DIFF) {
            continue;
          }

          if (diffImages(canvasA, canvasB, 0, 0, subWidth, subHeight) > MAX_IMAGE_TOP_CORNER_DIFF) {
            continue;
          }

          if (diffImages(canvasA, canvasB, subWidth, subHeight, subWidth, subHeight) > MAX_IMAGE_MIDDLE_DIFF) {
            continue;
          }

          if (diffImages(canvasA, canvasB, subWidth * 2, subHeight * 2, subWidth, subHeight) > MAX_IMAGE_BOTTOM_CORNER_DIFF) {
            continue;
          }
*/
        }

        item.collection.push(rawItem);
        item.total += rawItem.quantity.amount;
        found = true;
        break;
      }

      if (!found) {
        items.push({
          aHash: rawItem.icon.aHash,
          collection: [rawItem],
          total: rawItem.quantity.amount,
        });
      }
    }
  }

  items.sort(function(a, b) {
    const diff = a.aHash - b.aHash;
    if (diff > 0n) return 1;
    if (diff < 0n) return -1;
    return 0;
  });

  var index = 0
  for (const item of items) {
    const row = document.createElement('tr');
    const quantity = document.createElement('td');
    quantity.textContent = item.total;
    row.appendChild(quantity);

    const icon = document.createElement('td');
    for (const rawItem of item.collection) {
      icon.appendChild(rawItem.icon.canvas);
    }
    icon.appendChild(document.createElement('br'));
    for (const rawItem of item.collection) {
      icon.appendChild(rawItem.icon.cropped);
    }
    row.appendChild(icon);

    const name = document.createElement('td');
    name.textContent = "" + index++ + " diffs: " +
      item.collection.map((i) => hammingDistance(i.icon.aHash, item.aHash));
    row.appendChild(name);

    table.appendChild(row);
  }

  window.items = items;
}

function autoCropImage(image) {
  const MIN_VALUE_CROP = 128;
  const MIN_VALUE_COUNT = 3;

  const imageWidth = image.width;
  const imageHeight = image.height;

  var top = 0;
  var right = imageWidth - 1;
  var bottom = imageHeight - 1;
  var left = 0;
  const imgContext = image.getContext('2d');
  const imgPixels = imgContext.getImageData(0, 0, imageWidth, imageHeight).data;

  var highCount = 0;
  for (let offset = 0; offset < imgPixels.length; offset += 4) {
    if (!(offset / 4 % imageWidth)) highCount = 0;
    if ((imgPixels[offset] > MIN_VALUE_CROP) ||
        (imgPixels[offset + 1] > MIN_VALUE_CROP) ||
        (imgPixels[offset + 2] > MIN_VALUE_CROP)) {
      if (++highCount >= MIN_VALUE_COUNT) {
        top = Math.floor((offset - 4) / 4 / imageWidth);
        break;
      }
    }
  }

  right:
  for (let col = imageWidth - 1; col >= 0; --col) {
    highCount = 0;
    for (let row = 0; row <= imageHeight; ++row) {
      const offset = (row * imageWidth + col) * 4;
      if ((imgPixels[offset] > MIN_VALUE_CROP) ||
          (imgPixels[offset + 1] > MIN_VALUE_CROP) ||
          (imgPixels[offset + 2] > MIN_VALUE_CROP)) {
        if (++highCount >= MIN_VALUE_COUNT) {
          right = col;
          break right;
        }
      }
    }
  }

  highCount = 0;
  for (let offset = imgPixels.length - 4; offset >= 0; offset -= 4) {
    if (!(offset / 4 % imageWidth)) highCount = 0;
    if ((imgPixels[offset] > MIN_VALUE_CROP) ||
        (imgPixels[offset + 1] > MIN_VALUE_CROP) ||
        (imgPixels[offset + 2] > MIN_VALUE_CROP)) {
      if (++highCount >= MIN_VALUE_COUNT) {
        bottom = Math.floor((offset + 4) / 4 / imageWidth);
        break;
      }
    }
  }

  left:
  for (let col = 0; col < imageWidth; ++col) {
    highCount = 0;
    for (let row = 0; row < imageHeight; ++row) {
      const offset = (row * imageWidth + col) * 4;
      if ((imgPixels[offset] > MIN_VALUE_CROP) ||
          (imgPixels[offset + 1] > MIN_VALUE_CROP) ||
          (imgPixels[offset + 2] > MIN_VALUE_CROP)) {
        if (++highCount >= MIN_VALUE_COUNT) {
          left = col;
          break left;
        }
      }
    }
  }

  const cropWidth = right - left;
  const cropHeight = bottom - top;

  const canvas = document.createElement('canvas');
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  canvas.getContext('2d').drawImage(image,
    left, top, cropWidth, cropHeight,
    0, 0, cropWidth, cropHeight);
  //document.body.appendChild(cropCanvas);
  //console.log("top: " + top + " right: " + right + " bottom: " + bottom + " left: " + left);

  return canvas;
}

const PHASH_CANVAS = document.createElement('canvas');
// Perceptual Hash implementation per:
// https://content-blockchain.org/research/testing-different-image-hash-functions/
function pHashImage(image) {
  const HASH_SIZE = 8;
  const HASH_FACTOR = 4;

  const width = image.width;
  const height = image.height;

  const workSize = HASH_SIZE * HASH_FACTOR;

  PHASH_CANVAS.width = HASH_SIZE * HASH_FACTOR;
  PHASH_CANVAS.height = HASH_SIZE * HASH_FACTOR;

  const context = PHASH_CANVAS.getContext('2d');

  context.filter = 'grayscale(100%)';
  context.drawImage(image, 0, 0, workSize, workSize);

  const greyPixels = context.getImageData(0, 0, workSize, workSize).data;
  const rows = [];
  for (let row = 0; row < workSize; ++row) {
    const rowPixels = greyPixels.subarray(row * workSize * 4, (row + 1) * workSize * 4);
    rows.push(discreteCosineTransform(rowPixels, 4));
  }

  const cols = [];
  for (let col = 0; col < workSize; ++col) {
    const colPixels = rows.map(r => r[col]);
    cols.push(discreteCosineTransform(colPixels));
  }

  cols.length = HASH_SIZE;
  const hashPixels = [];
  for (let row = 0; row < HASH_SIZE; ++row) {
    for (const col of cols) {
      hashPixels.push(col[row]);
    }
  }
  const medianValue = hashPixels.slice().sort()[Math.floor(hashPixels.length / 2)];

  var pHash = 0n;
  for (const pixel of hashPixels) {
    pHash = pHash << 1n;
    if (pixel > medianValue) {
      pHash = pHash | 1n;
    }
  }

  return pHash;
}

// DCT-II, orthogonal
// https://en.wikipedia.org/wiki/Discrete_cosine_transform#DCT-II
// Use skipFactor to operate on RGBA data. Always returns single-channel data.
function discreteCosineTransform(vector, skipFactor) {
  if (!skipFactor) skipFactor = 1;
  const N = vector.length / skipFactor;

  const result = [];
  for (let k = 0; k < N; ++k) {
    let total = 0;
    for (let n = 0; n < N; ++n) {
      total += vector[n * skipFactor] * Math.cos(Math.PI / N * (n + 0.5) * k);
    }
    total *= Math.sqrt(2 / N);

    if (k == 0) {
      total *= 1 / Math.sqrt(2);
    }

    result[k] = total;
  }

  return result;
}

const AHASH_CANVAS = document.createElement('canvas');
function aHashImage(image) {
  const HASH_SIZE = 8;
  AHASH_CANVAS.width = HASH_SIZE;
  AHASH_CANVAS.height = HASH_SIZE;

  const context = AHASH_CANVAS.getContext('2d');

  context.filter = 'grayscale(100%)';
  context.drawImage(image, 0, 0, HASH_SIZE, HASH_SIZE);

  const pixels = context.getImageData(0, 0, HASH_SIZE, HASH_SIZE).data;

  var totalValue = 0;
  for (let offset = 0; offset < pixels.length; offset += 4) {
    totalValue += pixels[offset];
  }
  const averageValue = Math.round(totalValue / (HASH_SIZE * HASH_SIZE));

  var aHash = 0n;
  for (var offset = 0; offset < pixels.length; offset += 4) {
    aHash = aHash << 1n;
    if (pixels[offset] >= averageValue) {
      aHash = aHash | 1n;
    }
  }

  return aHash;
}

function hammingDistance(a, b) {
  var bits = a ^ b;

  var distance = 0;
  while (bits != 0n) {
    if (bits & 1n) {
      ++distance;
    }
    bits = bits >> 1n;
  }

  return distance;
}

const DIFF_CANVAS = document.createElement('canvas');
function diffImages(a, b, x, y, width, height) {
  if (!x) x = 0;
  if (!y) y = 0;
  if (!width) width = Math.min(a.width, b.width);
  if (!height) height = Math.min(a.height, b.height);

  DIFF_CANVAS.width = width;
  DIFF_CANVAS.height = height;

  const context = DIFF_CANVAS.getContext('2d');

  context.drawImage(a, x, y, width, height, 0, 0, width, height);
  context.globalCompositeOperation = 'difference';
  context.drawImage(b, x, y, width, height, 0, 0, width, height);

  const pixels = context.getImageData(0, 0, width, height).data;

  var totalValue = 0;
  for (var i = 0; i < pixels.length; ++i) {
    totalValue += pixels[i++];
    totalValue += pixels[i++];
    totalValue += pixels[i++];
    // Ignore alpha channel
  }

  return totalValue / (width * height * 3);
}

async function initTesseractScheduler() {
  const WORKER_COUNT = Math.max(Math.round(navigator.hardwareConcurrency / 2) - 1, 1);
  console.log("Launching " + WORKER_COUNT + " Tesseract OCR workers.");

  const scheduler = Tesseract.createScheduler();

  const workers = [];
  for (var i = 0; i < WORKER_COUNT; ++i) {
    const worker = Tesseract.createWorker({
      //logger: m => console.log(m),
      langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
    });

    workers.push(initWorker(scheduler, worker));
  }

  await Promise.all(workers);

  return scheduler;

  async function initWorker(scheduler, worker) {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789',
    });

    scheduler.addWorker(worker);
  }
}

async function terminateTesseractScheduler(scheduler) {
  console.log("Terminating Tesseract OCR workers.");
  return await (await scheduler).terminate();
}

function cropCanvas(input, top, right, bottom, left, filter) {
  if (!filter) filter = 'none';

  const cropped = document.createElement('canvas');
  const croppedWidth = right - left + 1;
  const croppedHeight = bottom - top + 1;

  cropped.width = croppedWidth;
  cropped.height = croppedHeight;

  const croppedContext = cropped.getContext("2d");
  croppedContext.filter = filter;
  croppedContext.drawImage(input,
      left, top, croppedWidth, croppedHeight,
      0, 0, croppedWidth, croppedHeight);

  return cropped;
}

function calcRedIndex(row, col, width) {
  // Assumes RGBA packing
  return (col * 4) + (row * width * 4);
}

function checkPixel(r, g, b, channel_variance, pixel_value, pixel_variance) {
  var avg = (r + g + b) / 3;
  return (Math.abs(avg - r) < channel_variance) &&
    (Math.abs(avg - g) < channel_variance) &&
    (Math.abs(avg - b) < channel_variance) &&
    (Math.abs(avg - pixel_value) < pixel_variance);
}
