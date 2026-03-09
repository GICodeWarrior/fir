import * as front from './frontend.mjs';

const VALID_VERSIONS = new Set([
  'airborne-63',
]);

const DEFAULT_VERSION = 'airborne-63';
const VERSION = (new URLSearchParams(location.search)).get('v') || DEFAULT_VERSION;
if (!VALID_VERSIONS.has(VERSION)) {
  console.log(`Invalid version ${VERSION}`);
  location.search = '';
}
window.FIR_CATALOG_VERSION = VERSION;
console.log(`Loading resources for "${VERSION}"`);

// Preload for workers
[
  './includes/text-recognition-model.onnx',
  `./foxhole/${VERSION}/classifier/model.onnx`,
  `./foxhole/${VERSION}/classifier/class_names.json`,
  './includes/quantities/model.onnx',
  './includes/quantities/class_names.json',
].forEach(url => fetch(url));

const CATALOG = fetch(`./foxhole/${VERSION}/catalog.json`).then(r => r.json());

await front.init(VERSION, CATALOG);

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
