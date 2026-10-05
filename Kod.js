function doGet(){
  fillTransactions();
}

function fillTransactions() {
  var sourceTrixUrl = "https://docs.google.com/spreadsheets/d/1XJAduyj-wL-kVE12Ib93htKbiEyTXuzYOG7j4BedrOA/edit?gid=0#gid=0"
  var destTrixUrl = "https://docs.google.com/spreadsheets/d/1Exdtvg5WLRB2kcT7X_isY_a_0hy7lZidmzW-HBRkgV0/edit?gid=659013003#gid=659013003"
  copyDataToFinalSheet(sourceTrixUrl, destTrixUrl)
}

function clear(){
    var destTrixUrl = "https://docs.google.com/spreadsheets/d/1Exdtvg5WLRB2kcT7X_isY_a_0hy7lZidmzW-HBRkgV0/edit?gid=659013003#gid=659013003"
    clearAllTransactions(destTrixUrl)
}

function clearTransactionandFill() {
  var sourceTrixUrl = "https://docs.google.com/spreadsheets/d/1XJAduyj-wL-kVE12Ib93htKbiEyTXuzYOG7j4BedrOA/edit?gid=0#gid=0"
  var destTrixUrl = "https://docs.google.com/spreadsheets/d/1Exdtvg5WLRB2kcT7X_isY_a_0hy7lZidmzW-HBRkgV0/edit?gid=659013003#gid=659013003"
  clearAllTransactions(destTrixUrl)
  copyDataToFinalSheet(sourceTrixUrl, destTrixUrl)
}


function clearAllTransactions(destTrixUrl) {
  var sheetAllTransactions = getSheet(destTrixUrl, "AllTransactions")
  var data = sheetAllTransactions.getDataRange().getValues();
  for (i = data.length - 1; i > 0; i--) {
    sheetAllTransactions.deleteRow(i + 1)
  }
}

function copyDataToFinalSheet(sourceTrixUrl, destTrixUrl) {
  var sheetAllTransactions = getSheet(destTrixUrl, "AllTransactions")
  var dest = sheetAllTransactions;

  var sheetmBankAccountExpenses = getSheet(sourceTrixUrl, "ManualExpenses")
  var source = sheetmBankAccountExpenses.getDataRange();
  CopyData(source, dest)

  var sheetmBankAccountExpenses = getSheet(sourceTrixUrl, "mBankAccountExpenses")
  var source = sheetmBankAccountExpenses.getDataRange();
  CopyData(source, dest)

}


function CopyData(source, dest) {
  var destExistingGuids = new Array(dest.getDataRange().getValues().length);
  var destData = dest.getDataRange().getValues();
  for (i = 1000; i < destData.length; i++) {
    //console.log(destData[i])
    destExistingGuids.push(destData[i][0])
  }

  var sourceValues = source.getValues();
  for (i = 3000; i < sourceValues.length; i++) {
    //console.log("source", sourceValues[i])
    //console.log(i);
    console.log(sourceValues[i][1])
    var month2 = Utilities.formatDate(sourceValues[i][1], 'Europe/Warsaw', 'yyyy-MM');
    //console.log("month:", sourceValues[i][1], sourceValues[i][1].toISOString(), month2)

    var sourceGuidCell = source.getCell(i + 1, 1);
    sourceGuidCellValue = "";
    //console.log("sourceGuidCellValue", sourceGuidCellValue)
    var sourceGuidCellValue = sourceGuidCell.getValue();
    //console.log("sourceGuidCellValue", sourceGuidCellValue)
    if (sourceGuidCellValue == "") {
      sourceGuidCell.setValue(Utilities.getUuid());
      var sourceGuidCellValue = sourceGuidCell.getValue();
    }

    //console.log("destExistingGuids.indexOf(sourceValues[i][1]", sourceValues[i][0]);
    if (destExistingGuids.indexOf(sourceValues[i][0]) == -1) {
      dest.appendRow([sourceGuidCellValue, sourceValues[i][1], month2, sourceValues[i][6], sourceValues[i][7], sourceValues[i][8], sourceValues[i][9], sourceValues[i][10], sourceValues[i][11]]);
    }
  }
}

function getSheet(trixUrl, sheetName) {
  var mainsheet = SpreadsheetApp.openByUrl(trixUrl);
  var sheet = mainsheet.getSheetByName(sheetName)
  return sheet;
}
