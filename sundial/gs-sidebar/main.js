import * as front from '../../includes/frontend.mjs'

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
  const insertGoogle = document.querySelector('button.insert-gs');
  const appendGoogle = document.querySelector('button.append-gs');

  front.registerDefaultListeners();
  front.addInputListener(input);
  front.addDownloadCollageListener(downloadCollage);
  front.addDownloadTotalsListener(downloadTotals);
  front.addDownloadTSVListener(downloadTSV);
  if (insertGoogle !== null) {
    addInsertGSListener(insertGoogle);
  }
  if (appendGoogle !== null) {
    addAppendGSListener(appendGoogle);
  }
})();

function _alert(msg) {
  google.script.run.fhAlert(msg);
}

function addAppendGSListener(appendGoogle) {
  appendGoogle.addEventListener('click', function() {
    function append(rows) {
      google.script.run
      .withSuccessHandler((ret) => {
        console.log(ret);
      })
      .withFailureHandler((error) => {
        console.error(error);
        _alert(error);
      })
      .firAppend(rows, [0, 1]); // rows and which cols have to be converted to Date
    }

    append(front.getAppendGoogleRows("google-script"));
  });
}

function addInsertGSListener(insertGoogle) {
  insertGoogle.addEventListener('click', function() {

    function insert(findings, stockpileColumn) {
      // insert
      google.script.run
      .withSuccessHandler((ret) => {
        console.log(ret);
      })
      .withFailureHandler((error) => {
        console.error(error);
        _alert(error);
      })
      .fhInsert(findings, stockpileColumn);
    }

    function contents2Findings(contents) {
      let nameMap = {
        ".44mm": ".44",
        "No.1 “The Liar” Submachinegun": "No.1 \"The Liar\" Submachinegun",
        "9mm": "9mm SMG",
        "20 Neville Anti-Tank Rifle": "135 Neville Anti-Tank Rifle",
        "ARC/RPG": "A.T.R.P.G. Indirect Shell",
        "Flare Mortar Shell": "Mortar Flare Shell",
        "Shrapnel Mortar Shell": "Mortar Shrapnel Shell",
        "RPG": "R.P.G Shell",
        "68mm": "68mm AT",
        "Specialist’s Overcoat": "Specialist's Overcoat",
        "Gunner’s Breastplate": "Gunner's Breastplate",
        "Physician’s Jacket": "Physician's Jacket",
        "Officer’s Regalia": "Officer's Regalia",
        "Outrider’s Mantle": "Outrider's Mantle",
        "Dunne Caravaner 2f": "Dunne Caravaner 2F",
        "O’Brien V.101 Freeman": "O'Brien v.101 Freeman",
        "O’Brien V.121 Highlander": "O'Brien v.121 Highlander",
        "O’Brien V.110": "O'Brien v.110",
        "O’Brien V.113 Gravekeeper": "O’Brien v.113 Gravekeeper",
        "Swallowtail 988/127-2 ": "Swallowtail 988/127-2",
        "Devitt Ironhide Mk. IV ": "Devitt Ironhide Mk. IV",
        "BMS - Universal Assembly Rig": "BMS - Universal Assemly Rig",
      }; // Bonesaws?
      function mapName(catalogItem) {
        if (catalogItem.CodeName === "ATRPGTW") {
          return "Mounted Bonesaw MK.3";
        }
        if (catalogItem.CodeName === "ATRPGW") {
          return "Bonesaw MK.3";
        }
        if (!nameMap.hasOwnProperty(catalogItem.DisplayName)) {
          return catalogItem.DisplayName;
        } else {
          return nameMap[catalogItem.DisplayName];
        }
      }

      let findings = [];
      for (const item of res.CATALOG) {
        let content2 = contents.filter((i) => i.CodeName == item.CodeName);
        let nextShippable = "unknown";
        for (let i = 0; i<2; i++) {
          // for shippables, there may be two entries: crated and uncrated
          let content = content2[i];
          let count = 0;
          if (typeof content !== 'undefined') {
            count = content.quantity;
          }
          let name = mapName(item);
          if (typeof item.ShippableInfo !== 'undefined'
          || typeof item.VehicleProfileType !== 'undefined') {
            if (nextShippable == "crated" || (typeof content !== 'undefined' && content.isCrated)) {
              name += " (crated)";
              nextShippable = "uncrated";
            } else {
              name += " (uncrated)";
              nextShippable = "crated";
            }
          } else {
            i++;
          }
          let finding = {
            "name": name,
            "count": count,
          };
          findings.push(finding);
        }
      }
      //console.log(findings);
      return {
        "items": findings,
      };
    }

    function resetButton() {
      insertGoogle.textContent = "Insert into Spreadsheet";
      insertGoogle.removeAttribute("disabled");
    }

    insertGoogle.textContent = "Inserting ...";
    insertGoogle.setAttribute("disabled", "disabled");

    let ret = google.script.run
    .withSuccessHandler((piles) => {
      console.log(piles);
      for (const stockpile of front.getStockpiles()) {
        let pile = piles.find((pile) => pile.stockpile == stockpile.header.name);
        if (typeof pile === 'undefined') {
          continue;
        } else {
          let findings = contents2Findings(stockpile.contents);
          insert(findings, pile.column);
        }
      }
      resetButton(); // i'm too lazy to await all the insert() success and error handlers
    })
    .withFailureHandler((error) => {
      console.error(error);
      _alert(error);
      resetButton();
    })
    .fhColumnMap();
    console.warn(ret);
  });
}
