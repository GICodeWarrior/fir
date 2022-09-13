import * as front from './frontend.mjs'

const res = {
  CATALOG: fetch('./includes/catalog.json').then(r => r.json()),
  ICON_CLASS_NAMES: fetch('./includes/class_names.json').then(r => r.json()),
  QUANTITY_CLASS_NAMES: fetch('./includes/quantities/class_names.json').then(r => r.json()),
}

const ICON_MODEL_URL = './includes/classifier/model.json';
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
