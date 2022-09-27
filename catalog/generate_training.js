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

const CORNER_ICON_RATIO = 7 / 16;
const CORNER_ICON_ALPHA = 0.75;
async function drawIcon(objectValues, size, smear, cache, modName) {
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
  context.drawImage(cache.icon, 0, 0, size + smear, size);

  if (objectValues.SubTypeIcon) {
    cache.subTypeIcon ||= await loadImage(
      `${WAR_LOCATION}/${objectValues.SubTypeIcon.replace(/\.[0-9]+$/, '.png')}`
    );
    const cornerWidth = (size + smear) * CORNER_ICON_RATIO;
    const cornerHeight = size * CORNER_ICON_RATIO;

    context.globalAlpha = CORNER_ICON_ALPHA;
    context.drawImage(cache.subTypeIcon, 0, 0, cornerWidth, cornerHeight);
    context.globalAlpha = 1;
  }

  return canvas;
}

const CRATE_ICON = loadImage(`${WAR_LOCATION}/War/Content/Textures/UI/Menus/IconFilterCrates.png`);
async function addCrate(canvas, smear) {
  const size = canvas.width;

  const cornerWidth = (size + smear) * CORNER_ICON_RATIO;
  const cornerHeight = size * CORNER_ICON_RATIO;

  const crateOffsetX = (size + smear) - cornerWidth;
  const crateOffsetY = size - cornerHeight;

  const context = canvas.getContext('2d');
  context.globalAlpha = CORNER_ICON_ALPHA;
  context.drawImage(await CRATE_ICON, crateOffsetX, crateOffsetY, cornerWidth, cornerHeight);
  context.globalAlpha = 1;
}

async function writeTrainingPNG(objectValues, baseName, size, smear, cache, modName) {
  const canvas = await drawIcon(objectValues, size, smear, cache, modName);
  if (!canvas) {
    return;
  }
  modName = modName ? `${modName}-` : '';

  await fs.promises.mkdir(baseName, {recursive: true});
  await writePNG(canvas, `${baseName}/${modName}${size}-${smear}.png`);

  await addCrate(canvas, smear);
  await fs.promises.mkdir(`${baseName}-crated`, {recursive: true});
  await writePNG(canvas, `${baseName}-crated/${modName}${size}-${smear}.png`);
}

async function writeTrainingPNGs(objectValues) {
  const smallestSize = 25; // 26-27 at 1600x900
  const largestSize = 72; // 64 at 4k
  const baseName = `${TRAINING_LOCATION}/${objectValues.CodeName}`;

  const mods = fs.readdirSync(`${WAR_LOCATION}/mod-files/`)
  mods.push(undefined);

  const promises = [];

  for (const modName of mods) {
    const cache = {};
    for (let size = smallestSize; size <= largestSize; ++size) {
      promises.push(writeTrainingPNG(objectValues, baseName, size, 0, cache, modName));
      promises.push(writeTrainingPNG(objectValues, baseName, size, 1, cache, modName));
    }
  }

  await Promise.all(promises);
}

const catalog = JSON.parse(fs.readFileSync(CATALOG_LOCATION));
const ourEntries = catalog.filter( (e, i) => i % WORKER_COUNT == WORKER_ID );

await eachLimit(ourEntries, ASYNC_LIMIT, writeTrainingPNGs);
