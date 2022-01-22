'use strict';

// These parameters tune the detection of inventory boxes
const MIN_INVENTORY_WIDTH = 100;
const MIN_CORNER_LIGHT = 5; // out of 7
const MIN_CORNER_DARK = 6; // out of 6

const MAX_DARK_CHANNEL_VARIANCE = 16;
const MAX_DARK_PIXEL_VALUE = 32;

const MAX_GREY_CHANNEL_VARIANCE = 5;
const MAX_GREY_PIXEL_VARIANCE = 8;
const IDEAL_GREY_VALUE = 131;

const MAX_MERGE_VARIANCE = 3;

var imagesProcessed = 0;
var imagesTotal = 0;

addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('form input');
  const download = document.querySelector('button');

  document.querySelector('form').addEventListener('submit', function(e) {
    // Prevent a submit that would lose our work
    e.preventDefault();
  });

  input.addEventListener('change', function() {
    const collage = document.querySelector('div.render');
    collage.innerHTML = '';

    imagesProcessed = 0;
    imagesTotal = input.files.length;
    document.querySelector('li span').textContent = imagesProcessed + " of " + imagesTotal;

    const files = Array.from(input.files).sort(function(a, b) {
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
      image.addEventListener('load', cropImage);
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

function cropImage() {
  this.removeEventListener('load', cropImage);

  // Cache width and height as these are very expensive to read
  const width = this.width;
  const height = this.height;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  context.drawImage(this, 0, 0);

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

    const cropped = document.createElement('canvas');
    const croppedWidth = box.right - box.left;
    const croppedHeight = box.bottom - box.top;

    cropped.width = croppedWidth;
    cropped.height = croppedHeight;
    cropped.getContext("2d").drawImage(canvas,
        box.left, box.top, croppedWidth, croppedHeight,
        0, 0, croppedWidth, croppedHeight);
    this.src = cropped.toDataURL();

    // Crop item icons and quantities
    // Scan each line
    // If > N of same pixel counted, skip to next line
    // When grey pixels of certain count detected
    // Scan down from horizontal midpoint to find bottom of box
    // If reasonable box size, save it
    // Then scan from vertical midpoint right
    // If correct number of grey pixels detected, save as another box
    // Continue scan Npx below these grey boxes

    // Send each quantity box to Tesseract
    /*
    Tesseract.recognize(
      'https://tesseract.projectnaptha.com/img/eng_bw.png',
      'eng',
      { logger: m => console.log(m), langPath: 'https://tessdata.projectnaptha.com/4.0.0_fast' }
    ).then(({ data: { text } }) => {
      console.log(text);
    })
    */

    // Crop item icon
    // width/height equal to quantity height
    // located half way between grey boxes
    // average all channels of all pixels to a single float
  }

  this.style.display = '';
  ++imagesProcessed;
  document.querySelector('li span').textContent = imagesProcessed + " of " + imagesTotal;
}

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

function calcRedIndex(row, col, width) {
  // Assumes RGBA packing
  return (col * 4) + (row * width * 4);
}

function isDark(r, g, b) {
  var avg = (r + g + b) / 3;
  return (Math.abs(avg - r) < MAX_DARK_CHANNEL_VARIANCE) &&
    (Math.abs(avg - g) < MAX_DARK_CHANNEL_VARIANCE) &&
    (Math.abs(avg - b) < MAX_DARK_CHANNEL_VARIANCE) &&
    (avg < MAX_DARK_PIXEL_VALUE);
}

function isGrey(r, g, b) {
  var avg = (r + g + b) / 3;
  return (Math.abs(avg - r) < MAX_GREY_CHANNEL_VARIANCE) &&
    (Math.abs(avg - g) < MAX_GREY_CHANNEL_VARIANCE) &&
    (Math.abs(avg - b) < MAX_GREY_CHANNEL_VARIANCE) &&
    (Math.abs(avg - IDEAL_GREY_VALUE) < MAX_GREY_PIXEL_VARIANCE);
}

function isLight(r, g, b) {
  return !isDark(r, g, b) && !isGrey(r, g, b);
}
