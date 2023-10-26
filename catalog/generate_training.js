import events from 'node:events';
import process from 'node:process';

import eachLimit from 'async/eachLimit.js';
import { createCanvas, loadImage } from 'canvas';
import fs from 'graceful-fs';

const ASYNC_LIMIT = 1;

const WAR_LOCATION = process.argv[2];
const CATALOG_LOCATION = process.argv[3];
const TRAINING_LOCATION = process.argv[4];

const WORKER_ID = parseInt(process.argv[5], 10);
const WORKER_COUNT = parseInt(process.argv[6], 10);

async function writePNG(canvas, file) {
  const out = fs.createWriteStream(file);
  const png = canvas.createPNGStream();
  png.pipe(out);
  await events.once(out, 'finish');
}

async function loadCornerIcon(path) {
  const image = await loadImage(path);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');

  context.drawImage(image, 0, 0);

  const imageData = context.getImageData(0, 0, image.width, image.height);
  const length = imageData.data.length;

  // Attempt to replicate brown effect on corner icons
  for (let offset = 0; offset < length; offset += 4) {
    imageData.data[offset] *= 240 / 255;
    imageData.data[offset + 1] *= 234 / 255;
    imageData.data[offset + 2] *= 220 / 255;
  }
  context.putImageData(imageData, 0, 0);

  return canvas;
}

const CORNER_ICON_RATIO = 7 / 16;
const CORNER_ICON_ALPHA = 0.75;
async function drawIcon(objectValues, size, xsmear, ysmear, cache, modName) {
  const canvas = createCanvas(size, size);
  const context = canvas.getContext('2d');
  context.fillRect(0, 0, size, size);

  if (!cache.icon) {
    const iconPath = objectValues.Icon.replace(/\.[0-9]+$/, '.png');

    let iconFile = `${WAR_LOCATION}/${iconPath}`;
    if (modName) {
      const modIconPath = `mod-files/${modName}/${iconPath}`;
      iconFile = `${WAR_LOCATION}/${modIconPath}`;
      if (!fs.existsSync(iconFile)) {
        return;
      }
    }

    cache.icon = await loadImage(iconFile);
  }
  context.drawImage(cache.icon, 0, 0, size + xsmear, size + ysmear);

  if (objectValues.SubTypeIcon) {
    cache.subTypeIcon ||= await loadCornerIcon(
      `${WAR_LOCATION}/${objectValues.SubTypeIcon.replace(/\.[0-9]+$/, '.png')}`
    );
    const cornerWidth = (size + xsmear) * CORNER_ICON_RATIO;
    const cornerHeight = (size + ysmear) * CORNER_ICON_RATIO;

    context.globalAlpha = CORNER_ICON_ALPHA;
    context.drawImage(cache.subTypeIcon, 0, 0, cornerWidth, cornerHeight);
    context.globalAlpha = 1;
  }

  return canvas;
}

const CRATE_ICON = loadCornerIcon(`${WAR_LOCATION}/War/Content/Textures/UI/Menus/IconFilterCrates.png`);
async function addCrate(canvas, xsmear, ysmear) {
  const size = canvas.width;

  const cornerWidth = (size + xsmear) * CORNER_ICON_RATIO;
  const cornerHeight = (size + ysmear) * CORNER_ICON_RATIO;

  const crateOffsetX = (size + xsmear) - cornerWidth;
  const crateOffsetY = (size + ysmear) - cornerHeight;

  const context = canvas.getContext('2d');
  context.globalAlpha = CORNER_ICON_ALPHA;
  context.drawImage(await CRATE_ICON, crateOffsetX, crateOffsetY, cornerWidth, cornerHeight);
  context.globalAlpha = 1;
}

async function writeTrainingPNG(objectValues, baseName, size, xsmear, ysmear, cache, modName) {
  const canvas = await drawIcon(objectValues, size, xsmear, ysmear, cache, modName);
  if (!canvas) {
    return;
  }
  modName = modName ? `${modName}-` : '';

  await fs.promises.mkdir(baseName, {recursive: true});
  await writePNG(canvas, `${baseName}/${modName}${size}-${xsmear}-${ysmear}.png`);

  await addCrate(canvas, xsmear, ysmear);
  await fs.promises.mkdir(`${baseName}-crated`, {recursive: true});
  await writePNG(canvas, `${baseName}-crated/${modName}${size}-${xsmear}-${ysmear}.png`);
}

async function writeTrainingPNGs(objectValues) {
  const smallestSize = 22; // 22-23 at 1366x768
  const largestSize = 72; // 64 at 4k
  const baseName = `${TRAINING_LOCATION}/${objectValues.CodeName}`;

  const mods = fs.readdirSync(`${WAR_LOCATION}/mod-files/`)
  mods.push(undefined);

  const promises = [];

  for (const modName of mods) {
    const cache = {};
    for (let size = smallestSize; size <= largestSize; ++size) {
      //promises.push(writeTrainingPNG(objectValues, baseName, size, -1, -1, cache, modName));
      //promises.push(writeTrainingPNG(objectValues, baseName, size, 0, -1, cache, modName));
      promises.push(writeTrainingPNG(objectValues, baseName, size, -1, 0, cache, modName));
      promises.push(writeTrainingPNG(objectValues, baseName, size, 0, 0, cache, modName));
      promises.push(writeTrainingPNG(objectValues, baseName, size, 1, 0, cache, modName));
      //promises.push(writeTrainingPNG(objectValues, baseName, size, 0, 1, cache, modName));
      //promises.push(writeTrainingPNG(objectValues, baseName, size, 1, 1, cache, modName));
    }
  }

  await Promise.all(promises);
}

const catalog = JSON.parse(fs.readFileSync(CATALOG_LOCATION));
const ourEntries = catalog.filter( (e, i) => i % WORKER_COUNT == WORKER_ID );

await eachLimit(ourEntries, ASYNC_LIMIT, writeTrainingPNGs);
