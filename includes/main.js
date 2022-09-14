import Screenshot from './screenshot.mjs'

const res = {
  CATALOG: fetch('./includes/catalog.json').then(r => r.json()),
  ICON_CLASS_NAMES: fetch('./includes/class_names.json').then(r => r.json()),
  QUANTITY_CLASS_NAMES: fetch('./includes/quantities/class_names.json').then(r => r.json()),
}

const ready = new Promise(function(resolve) {
  if (document.readyState != 'loading') {
    resolve();
  } else {
    window.addEventListener('DOMContentLoaded', () => resolve());
  }
});

await Promise.all([...Object.values(res), ready]).then(function (results) {
  let index = 0;
  for (const key of Object.keys(res)) {
    res[key] = results[index++];
  }
});

const ICON_MODEL_URL = './includes/classifier/model.json';
const QUANTITY_MODEL_URL = './includes/quantities/model.json';
let stockpiles = [];
let imagesProcessed = 0;
let imagesTotal = 0;

(async function() {
  const input = document.querySelector('form input');
  const downloadCollage = document.querySelector('button.collage');
  const downloadTotals = document.querySelector('button.totals');
  const downloadTSV = document.querySelector('button.tsv');
  const appendGoogle = document.querySelector('button.append-google');

  document.querySelector('form').addEventListener('submit', function(e) {
    // Prevent a submit that would lose our work
    e.preventDefault();
  });

  window.addEventListener('paste', function(event) {
    const files = event.clipboardData.files || [];
    const images = Array.prototype.filter.call(files, f => f.type.startsWith('image/'));
    gtag('event', 'select_content', {content_type: 'paste_screenshots', item_id: `ss_count_${images.length}`});
    addImages(images);
  });

  input.addEventListener('change', function() {
    if (!this.files.length) {
      return;
    }
    stockpiles = [];
    imagesProcessed = 0;
    imagesTotal = 0;

    document.querySelector('div.render').innerHTML = '';

    const files = Array.from(this.files).sort(function(a, b) {
      // Consistent ordering based on when each screenshot was captured
      return a.lastModified - b.lastModified;
    });

    gtag('event', 'select_content', {content_type: 'open_screenshots', item_id: `ss_count_${files.length}`});
    addImages(files);
  });

  downloadCollage.addEventListener('click', function() {
    gtag('event', 'select_content', {content_type: 'download', item_id: 'download_collage'});
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
      link.download = time.toISOString() + "_" + 'foxhole-inventory-collage.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  downloadTotals.addEventListener('click', function() {
    gtag('event', 'select_content', {content_type: 'download', item_id: 'download_totals'});
    const totals = document.querySelector('div.report');
    html2canvas(totals, {
      width: totals.scrollWidth,
      height: totals.scrollHeight,
      windowWidth: totals.scrollWidth + 16,
      windowHeight: totals.scrollHeight + 16,
    }).then(function(canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();

      const time = new Date();
      link.download = time.toISOString() + "_" + 'foxhole-inventory-totals.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  downloadTSV.addEventListener('click', function() {
    gtag('event', 'select_content', {content_type: 'download', item_id: 'download_tsv'});
    const items = [[
      'Stockpile Title',
      'Stockpile Name',
      'Structure Type',
      'Quantity',
      'Name',
      'Crated?',
      'Per Crate',
      'Total',
      'Description',
      'CodeName',
    ].join('\t')];
    for (const stockpile of stockpiles) {
      for (const element of stockpile.contents) {
        if (element.quantity == 0) {
          continue;
        }

        const details = res.CATALOG.find(e => e.CodeName == element.CodeName);
        const perCrate = ((details.ItemDynamicData || {}).QuantityPerCrate || 3)
            + (details.VehiclesPerCrateBonusQuantity || 0);
        const perUnit = element.isCrated ? perCrate : 1;

        items.push([
          stockpile.label.textContent.trim(),
          stockpile.header.name || '',
          stockpile.header.type || '',
          element.quantity,
          details.DisplayName,
          element.isCrated,
          element.isCrated ? perUnit : '',
          element.quantity * perUnit,
          details.Description,
          element.CodeName,
        ].join('\t'));
      }
    }

    const encoder = new TextEncoder();
    function toBinary(string) {
      // Expand UTF-8 characters to equivalent bytes
      let byteString = '';
      for (const byte of encoder.encode(string)) {
        byteString += String.fromCharCode(byte);
      }
      return byteString;
    }
    const base64TSV = window.btoa(toBinary(items.join('\n')));

    const link = document.createElement('a');
    link.href = `data:text/tab-separated-values;base64,${base64TSV}`;

    const time = new Date();
    link.download = time.toISOString() + "_" + 'foxhole-inventory.tsv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  appendGoogle.addEventListener('click', async function() {
    gtag('event', 'select_content', {content_type: 'append_google', item_id: 'append_google'});

    const authPromise = new Promise(function(resolve, reject) {
      tokenClient.callback = (resp) => {
        if (resp.error !== undefined) {
          reject(resp);
        }
        //console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
        resolve(resp);
      };
    });
    tokenClient.requestAccessToken();
    await authPromise;

    const pickerData = await new Promise(function(resolve, reject) {
      const picker = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.SPREADSHEETS)
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .setOAuthToken(gapi.client.getToken().access_token)
        .setDeveloperKey(gIds().apiKey)
        .setAppId(gIds().appId)
        .setCallback(function(data) {
          if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            resolve(data);
          } else if (data[google.picker.Response.ACTION] == google.picker.Action.CANCEL) {
            reject();
          }
        })
        .build();
      picker.setVisible(true);
    });
    const spreadsheetId = pickerData[google.picker.Response.DOCUMENTS][0][google.picker.Document.ID];
    //console.log(pickerData);
    //console.log(pickerData[google.picker.Response.DOCUMENTS][0][google.picker.Document.ID]);

    const spreadsheetResponse = await gapi.client.sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });
    //console.log(spreadsheetResponse);

    const sheetName = 'fir';
    const sheet = spreadsheetResponse.result.sheets.find( s => s.properties.title == sheetName);
    const columns = [
      'Export Time',
      'Screenshot Time',
      'Structure Type',
      'Stockpile Name',
      'Stockpile Title',
      'CodeName',
      'Name',
      'Quantity',
      'Crated?',
      'ID',
    ].map( c => stringValue(c) );

    const exportTime = new Date();
    const rows = [];
    stockpiles.sort( (a, b) => a.lastModified - b.lastModified );
    for (const stockpile of stockpiles) {
      const stockpileTime = new Date(stockpile.lastModified);
      //const stockpileID = Math.random().toString(36).replace(/^0\./, '');
      const stockpileID = Math.floor(Math.random() * 10000000000000000);
      for (const element of stockpile.contents) {
        if (element.quantity == 0) {
          continue;
        }

        const details = res.CATALOG.find(e => e.CodeName == element.CodeName);
        const perCrate = ((details.ItemDynamicData || {}).QuantityPerCrate || 3)
            + (details.VehiclesPerCrateBonusQuantity || 0);
        const perUnit = element.isCrated ? perCrate : 1;

        rows.push({
          values: [
            dateValue(exportTime),
            dateValue(stockpileTime),
            stringValue(stockpile.header.type || ''),
            stringValue(stockpile.header.name || ''),
            stringValue(stockpile.label.textContent.trim()),
            stringValue(element.CodeName),
            stringValue(details.DisplayName),
            numberValue(element.quantity),
            { userEnteredValue: { boolValue: element.isCrated } },
            stringValue(stockpileID),
          ],
        });
      }
    }
    function stringValue(value, other) {
      return { userEnteredValue: { stringValue: value }, ...other };
    }
    function dateValue(date) {
      // Courtesy of https://stackoverflow.com/a/64814390
      const SheetDate = {
        origin: Date.UTC(1899, 11, 30, 0, 0, 0, 0),
        dayToMs: 24 * 60 * 60 * 1000,
      };
      const serial = (date.getTime() - SheetDate.origin) / SheetDate.dayToMs;
      return numberValue(serial, { userEnteredFormat: { numberFormat: { type: 'DATE_TIME' } } });
    }
    function numberValue(value, other) {
      return { userEnteredValue: { numberValue: value }, ...other };
    }

    const sheetId = ((sheet || {}).properties || {}).sheetId ||  Math.floor(Math.random() * 1000000000);
    if (!sheet) {
      const addSheetResponse = await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
      }, {
        requests: [{
          addSheet: {
            properties: {
              sheetId,
              title: sheetName,
              index: 0,
              gridProperties: {
                frozenRowCount: 1,
                rowCount: 2,
                columnCount: columns.length + 1,
              },
            },
          },
        }, {
          appendCells: {
            sheetId: sheetId,
            fields: '*',
            rows: [{
              values: columns,
            }],
          },
        }]
      });
      //console.log(addSheetResponse);
    }

    const appendCellsResponse = await gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
    }, {
      requests: [{
        appendCells: {
          sheetId: sheetId,
          fields: '*',
          rows,
        },
      }],
    });
    //console.log(appendCellsResponse);
  });

  await Promise.all([
    new Promise((res, rej) => gapi.load('client', {callback: res, onerror: rej})),
    new Promise((res, rej) => gapi.load('picker', {callback: res, onerror: rej})),
  ]);
  await gapi.client.init({}).then(function() {
    gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4');
  });

  const tokenClient = await new Promise((resolve, reject) => {
    try {
      resolve(google.accounts.oauth2.initTokenClient({
          client_id: gIds().clientId,
          scope: 'https://www.googleapis.com/auth/drive.file',
          //prompt: 'consent',
      }));
    } catch (err) {
      reject(err);
    }
  });
})();

function addImages(files) {
  imagesTotal += files.length;

  const collage = document.querySelector('div.render');
  document.querySelector('li span').textContent = imagesProcessed + " of " + imagesTotal;

  files.forEach(function(file) {
    const container = document.createElement('div');
    const label = document.createElement('span');
    label.textContent = file.name;
    label.contentEditable = true;
    label.spellcheck = false;
    container.appendChild(label);

    const image = document.createElement('img');
    image.style.display = 'none';
    image.addEventListener('load', getProcessImage(label, file.lastModified), { once: true });
    image.src = URL.createObjectURL(file);
    container.appendChild(image);

    collage.appendChild(container);
  });
}

function gIds() {
  if (location.host == 'fir.gicode.net') {
    return {
      clientId: '432701922574-m5mkt6dp2bp8hbt27fuoo4s7bfhpq3jr.apps.googleusercontent.com',
      apiKey: 'AIzaSyB1FQ72hY28Ovc1mPbrBBVspj68-BvICOo',
      appId: '432701922574',
    };
  }

  return {
    clientId: '977197840282-f5c1jf3f4rumgnbv4rdm61l85gs0ue7m.apps.googleusercontent.com',
    apiKey: 'AIzaSyB0oavB9RY-kegde_YDLTM6H2PHhu5z7t4',
    appId: '977197840282',
  };
}

function getProcessImage(label, lastModified) {
  return function() {
    return processImage.call(this, label, lastModified);
  };

  async function processImage(label, lastModified) {
    URL.revokeObjectURL(this.src);

    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;

    const context = canvas.getContext('2d');
    context.drawImage(this, 0, 0);

    const stockpile = await Screenshot.process(canvas, ICON_MODEL_URL, res.ICON_CLASS_NAMES, QUANTITY_MODEL_URL, res.QUANTITY_CLASS_NAMES);
    if (stockpile) {
      this.src = stockpile.box.canvas.toDataURL();
      stockpile.label = label;
      stockpile.lastModified = lastModified;
      stockpiles.push(stockpile);
    }

    this.style.display = '';
    ++imagesProcessed;
    document.querySelector('li span').textContent = imagesProcessed + " of " + imagesTotal;

    if (imagesProcessed == imagesTotal) {
      window.stockpiles = stockpiles;
      window.stockpilesJSON = JSON.stringify(stockpiles.map(function(s) {
        return {
          file: s.label.textContent.trim(),
          header: {
            type: s.header.type || null,
            name: s.header.name || null,
          },
          contents: s.contents.map(function(e) {
            return {
              CodeName: e.CodeName,
              quantity: e.quantity,
              isCrated: e.isCrated,
            };
          }),
        };
      }), undefined, 2);

      outputTotals();

      // Timeout gives the UI a chance to reflow
      setTimeout(function() {
        const maxHeight = Array.from(document.querySelectorAll('div.render > div'))
            .map(e => e.getBoundingClientRect().height)
            .reduce((a, b) => Math.max(a, b), 0);

        const render = document.querySelector('div.render');
        if (maxHeight > render.clientHeight) {
          const margins = render.getBoundingClientRect().height - render.clientHeight;
          render.style.height = `${maxHeight + margins}px`;
        }
      }, 1);
    }
  }
}

function outputTotals() {
  const totals = {};
  const categories = {};

  for (const stockpile of stockpiles) {
    for (const element of stockpile.contents) {
      let key = element.CodeName;
      if (element.isCrated) {
        key += '-crated';
      }

      if (!totals[key]) {
        const catalogItem = res.CATALOG.find(e=>e.CodeName == element.CodeName);
        const itemCategory = (catalogItem.ItemCategory || '').replace(/^EItemCategory::/, '');
        const vehicleCategory = catalogItem.VehicleProfileType ? 'Vehicles' : undefined;
        const structureCategory = catalogItem.BuildLocationType ? 'Structures' : undefined;

        const category = itemCategory || vehicleCategory || structureCategory;
        categories[category] ||= [];
        categories[category].push(key);

        totals[key] = {
          CodeName: element.CodeName,
          isCrated: element.isCrated,
          name: catalogItem.DisplayName,
          category: category,
          total: 0,
          collection: [],
        };
      }
      totals[key].total += element.quantity;
      totals[key].collection.push(element);
    }
  }

  const categoryOrder = {
    SmallArms: 1,
    HeavyArms: 2,
    HeavyAmmo: 3,
    Utility: 4,
    Medical: 5,
    Supplies: 6,
    Uniforms: 7,
    Vehicles: 8,
    Structures: 9,
  };
  const sortedCategories = Object.keys(categories).sort(function(a, b) {
    return (categoryOrder[a] || Infinity) - (categoryOrder[b] || Infinity);
  });

  const report = document.querySelector('div.report');
  report.innerHTML = '';
  for (const category of sortedCategories) {
    const keys = categories[category];
    if (!keys) {
      continue;
    }
    keys.sort(function(a, b) {
      const crateDiff = totals[b].isCrated - totals[a].isCrated;
      if (crateDiff != 0) {
        return crateDiff;
      }
      return totals[b].total - totals[a].total;
    });

    const headerPrinted = {};
    for (const key of keys) {
      const type = totals[key];
      if (!headerPrinted[type.isCrated]) {
        if (type.isCrated || (!type.isCrated && !headerPrinted[true])) {
          const columnBreak = document.createElement('div');
          columnBreak.classList.add('column-break');
          report.appendChild(columnBreak);
        }

        const cell = document.createElement('div');
        const quantity = document.createElement('div');
        cell.appendChild(quantity);

        const name = document.createElement('h3');
        const suffix = type.isCrated ? ' (crated)' : '';
        name.textContent = category.replace(/([A-Z])/g, ' $1').trim() + suffix;
        cell.appendChild(name);
        report.appendChild(cell);

        headerPrinted[type.isCrated] = true;
      }

      const cell = document.createElement('div');
      const quantity = document.createElement('div');
      quantity.textContent = type.total;
      cell.appendChild(quantity);

      cell.appendChild(type.collection[0].iconBox.canvas);

      const name = document.createElement('div');
      name.textContent = type.name;
      cell.appendChild(name);

      report.appendChild(cell);
    }
  }
}
