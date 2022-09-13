import * as front from '../frontend.mjs'

const b64ToFile = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new File(byteArrays, "myfilename", {type: contentType});
  return blob;
}

const res = {
  CATALOG: JSON.parse(JSON_CATALOG),
  ICON_CLASS_NAMES: JSON.parse(JSON_CLASS_NAMES),
  QUANTITY_CLASS_NAMES: JSON.parse(JSON_QUANTITIES_CLASS_NAMES),
}

// bin model url is relative to ICON_MODEL_URL
const ICON_BINARY_MODEL_URL = URL.createObjectURL(b64ToFile(BASE64_CLASSIFIER_BINARY_MODEL)).split("/").at(-1);
console.log(ICON_BINARY_MODEL_URL);
const ICON_MODEL_JSON = JSON_CLASSIFIER_MODEL.replace("group1-shard1of1.bin", ICON_BINARY_MODEL_URL);
const ICON_MODEL_URL = URL.createObjectURL(new File([ICON_MODEL_JSON], "model.json"));
console.log(ICON_MODEL_URL);

const QUANTITY_BINARY_MODEL_URL = URL.createObjectURL(b64ToFile(BASE64_QUANTITY_BINARY_MODEL)).split("/").at(-1);
console.log(QUANTITY_BINARY_MODEL_URL);
const QUANTITY_MODEL_JSON = JSON_QUANTITIES_MODEL.replace("group1-shard1of1.bin", QUANTITY_BINARY_MODEL_URL);
const QUANTITY_MODEL_URL = URL.createObjectURL(new File([QUANTITY_MODEL_JSON], "model.json"));
console.log(QUANTITY_MODEL_URL);

await front.init(res, ICON_MODEL_URL, QUANTITY_MODEL_URL);

(async function() {
  const input = document.querySelector('form input');
  const downloadCollage = document.querySelector('button.collage');
  const downloadTotals = document.querySelector('button.totals');
  const downloadTSV = document.querySelector('button.tsv');
  const insertGoogle = document.querySelector('button.insert-google');

  front.registerDefaultListeners();
  front.addInputListener(input);
  front.addDownloadCollageListener(downloadCollage);
  front.addDownloadTotalsListener(downloadTotals);
  front.addDownloadTSVListener(downloadTSV);
  front.addInsertGoogleListener(insertGoogle);
})();
