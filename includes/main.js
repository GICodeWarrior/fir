import * as front from './frontend.mjs'

const VALID_VERSIONS = new Set([
  'entrenched',
  'inferno',
  'inferno-52',
]);

const DEFAULT_VERSION = 'inferno-52';
const VERSION = (new URLSearchParams(location.search)).get('v') || DEFAULT_VERSION;
if (!VALID_VERSIONS.has(VERSION)) {
  console.log(`Invalid version ${VERSION}`);
  location.search = '';
}
console.log(`Loading resources for "${VERSION}"`);

const res = {
  CATALOG: fetch(`./includes/foxhole/${VERSION}/catalog.json`).then(r => r.json()),
  ICON_CLASS_NAMES: fetch(`./includes/foxhole/${VERSION}/classifier/class_names.json`).then(r => r.json()),
  QUANTITY_CLASS_NAMES: fetch('./includes/quantities/class_names.json').then(r => r.json()),
}

const ICON_MODEL_URL = `./includes/foxhole/${VERSION}/classifier/model.json`;
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
