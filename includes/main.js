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

    document.querySelector('div.report').innerHTML = '';
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
      const link = document.createElement('a');
      link.href = canvas.toDataURL();

      const time = new Date();
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
      const items = await cropItems(scheduler, inventory.canvas);
      itemBundles.push(items);

      if (items.length) {
        const bannerHeight = items[0].quantity.bottom - items[0].quantity.top;
        const invTop = Math.max(inventory.top - bannerHeight, 0);
        inventory.canvas = cropCanvas(canvas, invTop, inventory.right, inventory.bottom, inventory.left);
      }
      this.src = inventory.canvas.toDataURL();
    }

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
  const MIN_INVENTORY_HEIGHT = 25;
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

    box.canvas = cropCanvas(canvas, box.top, box.right, box.bottom, box.left);
    return box;
  }
  return false;

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
  const MIN_QUANTITY_WIDTH = 40;
  const MAX_QUANTITY_WIDTH = 60;

  const MIN_QUANTITY_HEIGHT = 30;
  const MAX_QUANTITY_HEIGHT = 50;

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

  const quantities = [];

  let greyCount = 0;
  let quantityBottom = null;
  let quantityGap = null;
  let iconWidth = null;
  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      // Opportunity: If > N of same pixel counted, skip to next line
      const redIndex = calcRedIndex(row, col, width);
      if (isGrey(pixels[redIndex], pixels[redIndex+1], pixels[redIndex+2])) {
        ++greyCount;
      } else if ((greyCount >= MIN_QUANTITY_WIDTH) && (greyCount <= MAX_QUANTITY_WIDTH)) {
        const quantity = {
          right: col - 1,
          top: row,
          left: col - greyCount,
        };
        if (!quantityBottom) {
          quantityBottom = findQtyBottom(pixels, quantity.top, quantity.left, width, height);
        } else if (!quantityGap && quantities.length) {
          const previous = quantities[quantities.length - 1];
          quantityGap = quantity.left - previous.right - 1;
          iconWidth = previous.bottom - previous.top + 1;
        }
        quantity.bottom = quantityBottom;

        const quantityHeight = quantity.bottom - quantity.top;
        if ((quantityHeight >= MIN_QUANTITY_HEIGHT) && (quantityHeight <= MAX_QUANTITY_HEIGHT)) {
          quantity.canvas = cropCanvas(canvas,
              quantity.top, quantity.right, quantity.bottom, quantity.left,
              'invert(100%) contrast(250%)', 1.25);

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
    const icon = {
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
    let result = await (item.quantity.analysis);
    item.quantity.tesseractResult = result;

    let value = result.data.text.trim();
    if (value.match(/^[1-9][0-9]*k\+$/)) {
      value = parseInt(value.slice(0, -2), 10) * 1000;
    } else if (value.match(/^([1-9][0-9]*|[0-9])$/)) {
      value = parseInt(value, 10);
    } else {
      value = 0;
      console.log('unable to parse quantity: ', item);
    }
    item.quantity.amount = value;
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

  const report = document.querySelector('div.report');

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
      const hashes = {
        pHashFull: pHashImage(rawItem.icon.canvas),
        pHashCrop: pHashImage(rawItem.icon.cropped),
        aHashFull: aHashImage(rawItem.icon.canvas),
        aHashCrop: aHashImage(rawItem.icon.cropped),
      };
      rawItem.icon.hashes = hashes;

      //rawItem.icon.hash = pHashImage(rawItem.icon.canvas);

      //const canvasA = rawItem.icon.canvas;
      //const subWidth = Math.floor(canvasA.width / 3);
      //const subHeight = Math.floor(canvasA.height / 3);

      const matches = [];
      for (const item of items) {
        const distances = Object.entries(hashes).map(([k, v]) => hammingDistance(v, item.hashes[k]));

        const average = distances.reduce((a, b) => a + b, 0) / distances.length;
        if (average > MAX_HAMMING_DISTANCE) {
          continue;
        }

/*
        if (distance > MAX_PERFECT_HAMMING_DISTANCE) {
          if (distance > MAX_HAMMING_DISTANCE) {
            continue;
          }

          const canvasB = item.collection[0].icon.canvas;

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
        }
*/

        matches.push([average, item])
      }

      if (matches.length) {
        matches.sort((a, b) => a[0] - b[0]);

        matches[0][1].collection.push(rawItem);
        matches[0][1].total += rawItem.quantity.amount;
      } else {
        items.push({
          hashes: rawItem.icon.hashes,
          collection: [rawItem],
          total: rawItem.quantity.amount,
        });
      }
    }
  }

  items.sort(function(a, b) {
    const countDiff = b.collection.length - a.collection.length;
    if (countDiff != 0) {
      return countDiff;
    }
    return b.total - a.total;
  });

  let index = 0;
  for (const item of items) {
    const cell = document.createElement('div');
    const quantity = document.createElement('div');
    quantity.textContent = item.total;
    cell.appendChild(quantity);

    const icon = document.createElement('div');
    for (const rawItem of item.collection) {
      icon.appendChild(rawItem.icon.canvas);
    }
    //icon.appendChild(document.createElement('br'));
    //for (const rawItem of item.collection) {
    //  icon.appendChild(rawItem.icon.cropped);
    //}
    cell.appendChild(icon);

    //const name = document.createElement('td');
    //name.textContent = "" + index++ + " diffs: " +
    //  item.collection.map((i) => hammingDistance(i.icon.hashes.pHashFull, item.hashes.pHashFull));
    //row.appendChild(name);

    report.appendChild(cell);
  }

  window.items = items;
}

function autoCropImage(image) {
  const MIN_VALUE_CROP = 128;
  const MIN_VALUE_COUNT = 3;

  const imageWidth = image.width;
  const imageHeight = image.height;

  let top = 0;
  let right = imageWidth - 1;
  let bottom = imageHeight - 1;
  let left = 0;
  const imgContext = image.getContext('2d');
  const imgPixels = imgContext.getImageData(0, 0, imageWidth, imageHeight).data;

  let highCount = 0;
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
  let totalValue = 0;
  for (let row = 0; row < HASH_SIZE; ++row) {
    for (const col of cols) {
      totalValue += col[row];
      hashPixels.push(col[row]);
    }
  }
  const averageValue = totalValue / hashPixels.length;
  //const medianValue = hashPixels.slice().sort()[Math.floor(hashPixels.length / 2)];

  let pHash = 0n;
  for (const pixel of hashPixels) {
    pHash = pHash << 1n;
    if (pixel > averageValue) {
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

  let totalValue = 0;
  for (let offset = 0; offset < pixels.length; offset += 4) {
    totalValue += pixels[offset];
  }
  const averageValue = Math.round(totalValue / (HASH_SIZE * HASH_SIZE));

  let aHash = 0n;
  for (let offset = 0; offset < pixels.length; offset += 4) {
    aHash = aHash << 1n;
    if (pixels[offset] >= averageValue) {
      aHash = aHash | 1n;
    }
  }

  return aHash;
}

function hammingDistance(a, b) {
  let bits = a ^ b;

  let distance = 0;
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

  let totalValue = 0;
  for (let i = 0; i < pixels.length; ++i) {
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
  for (let i = 0; i < WORKER_COUNT; ++i) {
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
      tessedit_char_whitelist: '0123456789k+',
      tessedit_pageseg_mode: 7,  // Single line
    });

    scheduler.addWorker(worker);
  }
}

async function terminateTesseractScheduler(scheduler) {
  console.log("Terminating Tesseract OCR workers.");
  return await (await scheduler).terminate();
}

function cropCanvas(input, top, right, bottom, left, filter, resize) {
  if (!filter) filter = 'none';
  if (!resize) resize = 1;

  const croppedWidth = right - left + 1;
  const croppedHeight = bottom - top + 1;

  const outputWidth = Math.round(croppedWidth * resize);
  const outputHeight = Math.round(croppedHeight * resize);

  const output = document.createElement('canvas');

  output.width = outputWidth;
  output.height = outputHeight;

  const outputContext = output.getContext("2d");
  outputContext.filter = filter;
  outputContext.drawImage(input,
      left, top, croppedWidth, croppedHeight,
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
