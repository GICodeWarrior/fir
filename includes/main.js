import * as front from './frontend.mjs'

const VALID_VERSIONS = new Set([
  'entrenched',
  'inferno',
  'inferno-52',
  'naval',
  'naval-56',
  'naval-57',
  'infantry-59',
  'infantry-60',
]);

const DEFAULT_VERSION = 'infantry-60';
const VERSION = (new URLSearchParams(location.search)).get('v') || DEFAULT_VERSION;
if (!VALID_VERSIONS.has(VERSION)) {
  console.log(`Invalid version ${VERSION}`);
  location.search = '';
}
window.FIR_CATALOG_VERSION = VERSION;
console.log(`Loading resources for "${VERSION}"`);

const res = {
  CATALOG: fetch(`./foxhole/${VERSION}/catalog.json`).then(r => r.json()),
  ICON_CLASS_NAMES: fetch(`./foxhole/${VERSION}/classifier/class_names.json`).then(r => r.json()),
  QUANTITY_CLASS_NAMES: fetch('./includes/quantities/class_names.json').then(r => r.json()),
}

const ICON_MODEL_URL = `./foxhole/${VERSION}/classifier/model.json`;
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
