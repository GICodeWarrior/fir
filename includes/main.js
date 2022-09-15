import * as front from './frontend.mjs'

const BRANCH=location.search.replace(/^\?/, '');

const res = {
  CATALOG: fetch(`./includes/catalog${BRANCH}.json`).then(r => r.json()),
  ICON_CLASS_NAMES: fetch(`./includes/classifier${BRANCH}/class_names.json`).then(r => r.json()),
  QUANTITY_CLASS_NAMES: fetch('./includes/quantities/class_names.json').then(r => r.json()),
}

const ICON_MODEL_URL = `./includes/classifier${BRANCH}/model.json`;
const QUANTITY_MODEL_URL = './includes/quantities/model.json';

await front.init(res, ICON_MODEL_URL, QUANTITY_MODEL_URL);

(async function() {
  const input = document.querySelector('form input');
  const downloadCollage = document.querySelector('button.collage');
  const downloadTotals = document.querySelector('button.totals');
  const downloadTSV = document.querySelector('button.tsv');
  const appendGoogle = document.querySelector('button.append-google');

  front.registerDefaultListeners();
  front.addInputListener(input);
  front.addDownloadCollageListener(downloadCollage);
  front.addDownloadTotalsListener(downloadTotals);
  front.addDownloadTSVListener(downloadTSV);
  await front.addAppendGoogleListener(appendGoogle);
})();
