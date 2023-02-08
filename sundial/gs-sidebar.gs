//@OnlyCurrentDoc

function onOpen() {
 SpreadsheetApp
   .getUi()
   .createMenu("Screenshots")
   .addItem("Scan screenshots (FIR)", "showSidebar")
   .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('fir-sidebar.html')
      .setTitle('Foxhole Inventory Report');
  SpreadsheetApp.getUi().showSidebar(html);
}

function find2D(haystack, needle) {
  for (let row = 0; row <= haystack.length; row++) {
    for (let col = 0; col <= haystack[0].length; col++) {
      if (haystack[row][col] == needle) {
        return [row, col];
      }
    }
  }
}

function fhAlert(msg) {
  SpreadsheetApp.getUi().alert(msg);
}

function fhColumnMap() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheets().find((s) => {
    return s.getName() === 'Input / Screenparse';
  });
  //var sheet = SpreadsheetApp.getActiveSheet();
  //let column = sheet.getCurrentCell().getColumn();
  var data = sheet.getDataRange().getValues();
  let stockpiles = [];
  let magicCol = find2D(data, 'Labels for foxhole-screenparse to find rows')[1] + 1;

  // town range
  let townrow = data.findIndex((a) => {
    return a.indexOf("Town Name") !== -1;
  });
  if (townrow === -1) { 
    throw "Town Name not found";
  }
  let townnames = data[townrow];
  townrow += 1; // fix start counting at 0
  let column = magicCol + 1;
  while (column<townnames.length) {
    console.log(sheet.getRange(townrow, column).getValues());
    let range = sheet.getRange(townrow, column).getMergedRanges()[0];
    if (typeof range === 'undefined' | range == "") {
      column += 1;
      continue;
    }
    let rCount = range.getNumColumns();
    rangeSize = rCount;
    let rStart = range.getColumn();
    let townname = sheet.getRange(townrow, rStart).getValue();

    // region names
    let row = data.findIndex((a) => {
      return a.indexOf("Region Name") !== -1;
    });
    if (row === -1) { 
      throw "Region Name not found";
    }
    row += 1; // fix start counting at 0
    let regionname = sheet.getRange(row, rStart).getValue();  

    // Stockpile Description
    row = data.findIndex((a) => {
      return a.indexOf("Stockpile Description") !== -1;
    });
    if (row === -1) { 
      throw "Stockpile Description not found";
    }
    row += 1; // fix start counting at 0
    let stockdesc = sheet.getRange(row, rStart).getValue();  

    // stockpile names
    row = data.findIndex((a) => {
      return a.indexOf("Stockpile Name") !== -1;
    });
    if (row === -1) { 
      throw "Stockpile Name not found";
    }
    row += 1; // fix start counting at 0
    let pilenames = sheet.getRange(row, rStart, 1, rCount).getValues()[0];
    for (let i = 0; i<pilenames.length; i++) {
      let pilename = pilenames[i];
      if (pilename === 'Total' || pilename === '--' || stockdesc === 'inactive') {
        continue;
      }
      stockpiles.push({
        "townname": townname,
        "regionname": regionname,
        "stockdesc": stockdesc,
        "stockpile": pilename,
        "column": column + i,
      });
    }
    column += rangeSize;
  }
  return stockpiles;
}

function fhInsert(s, column) {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheets().find((s) => {
    return s.getName() === 'Input / Screenparse';
  });
  //var sheet = SpreadsheetApp.getActiveSheet();
  //let column = sheet.getCurrentCell().getColumn();
  var data = sheet.getDataRange().getValues();

  // update item counts
  for (let item of s.items) {
    var row = data.findIndex((a) => {
      return a.indexOf(item.name) !== -1;
    });
    if (row === -1) {
      continue;
    }
    row += 1; // fix start counting at 1
    sheet.getRange(row, column).setValue(item.count);
  }

  // update timedate
  row = data.findIndex((a) => {
    return a.indexOf("Last updated with foxhole-screenparse") !== -1;
  });
  if (row !== -1) {
    row += 1; // fix start counting at 1
    sheet.getRange(row, column).setValue(new Date()).setNumberFormat("hh:mm");
  }
}

function firAppend(rows, date_cols) {
  let TYPE_COL = 2; // column on fir sheet that specifies type (i.e. Storage Depot)
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheets().find((s) => {
    return s.getName() === 'fir';
  });
  let appendable = [];
  for(const row of rows) {
    // js Dates dont automatically convert to gs Dates. We have to do that manually.
    const row_ = row.map(function(field, idx) {
      if (date_cols.includes(idx)) {
        return new Date(field);
      }
      if (idx == TYPE_COL) { 
        // French, German, Portugese
        if (field == "Entrepot" || field == "Lagerdepot" || field == "Armazem") {
          return "Storage Depot";
        }
        if (field == "Port" || field == "Seehafen" || field == "Porto") {
          return "Seaport";
        }
      }
      return field;
    })
    appendable.push(row_);
  }
  appendRows(sheet, appendable);
}

// Tombstone: set a stockpile to 0 to make it disappear in future history.
// Implemented next to firAppend, since both have to adhere to the same append format. 
// Note however, that deactivateStockpile() is purpose-built the be called from and with a button from our/my stockpiles sheet.
// Specifically it expects the following named ranges as inputs: deactivateStockpileID, deactivateStockpileIDs, deactivateStockpileStructureTypeGenerator, deactivateStockpileNameGenerator, deactivateStockpileTitleGenerator
function deactivateStockpile() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let stockpiles = spreadsheet.getSheets().find((s) => {
    return s.getName() === 'Stockpiles';
  });
  let fir = spreadsheet.getSheets().find((s) => {
    return s.getName() === 'fir';
  });

  // get stockpile row
  let stockpileId = stockpiles.getRange("deactivateStockpileID").getValue();
  let stockpileIds = stockpiles.getRange("deactivateStockpileIDs");
  let stockpileRow = stockpileIds.getValues().findIndex(function(value) { return value[0] == stockpileId; });
  if (stockpileRow == -1) {
    console.log("error: no stockpile with this id found");
    spreadsheet.toast('No stockpile with this id found. ', 'Error');
    return;
  }
  stockpileRow += stockpileIds.getRow();

  // collect data
  let date = new Date();
  let screenshotId = parseInt(Math.random() * 1000000000000000);
  let structureType = stockpiles.getRange(stockpileRow, spreadsheet.getRange("deactivateStockpileStructureTypeGenerator").getColumn()).getValue();
  let stockpileName = stockpiles.getRange(stockpileRow, spreadsheet.getRange("deactivateStockpileNameGenerator").getColumn()).getValue();
  let stockpileTitle = stockpiles.getRange(stockpileRow, spreadsheet.getRange("deactivateStockpileTitleGenerator").getColumn()).getValue();
  
  let rows = [];
  rows.push([date, date, structureType, stockpileName, stockpileTitle, "Tombstone", "Nulling this tockpile", 0, true, screenshotId]);

  // append rows
  appendRows(fir, rows);

  // succeeded. Set inactive flag. 
  stockpiles.getRange(stockpileRow, spreadsheet.getRange("C1").getColumn()).setValue(true);
}

function appendRows(sheet, rows) {
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1,1,rows.length, rows[0].length).setValues(rows);
}
