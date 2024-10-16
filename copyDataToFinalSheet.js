function runner() {
  var sourceTrixUrl = "https://docs.google.com/spreadsheets/d/1XJAduyj-wL-kVE12Ib93htKbiEyTXuzYOG7j4BedrOA/edit?gid=0#gid=0"
  var destTrixUrl = "https://docs.google.com/spreadsheets/d/1Exdtvg5WLRB2kcT7X_isY_a_0hy7lZidmzW-HBRkgV0/edit?gid=659013003#gid=659013003"
  copyDataToFinalSheet(sourceTrixUrl, destTrixUrl)
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
  for (i = 1; i < destData.length; i++) {
    //console.log(destData[i])
    destExistingGuids.push(destData[i][0])
  }

  var sourceValues = source.getValues();
  for (i = 1; i < sourceValues.length; i++) {
    console.log("source", sourceValues[i])
    console.log(i);
    console.log("source guid:", sourceValues[i][0])
    console.log("index of", destExistingGuids.indexOf(sourceValues[i][0]))
    var month = sourceValues[i][1].toISOString().substring(0, 7);


    var sourceGuidCell = source.getCell(i + 1, 1);
    sourceGuidCellValue = "";
    console.log("sourceGuidCellValue", sourceGuidCellValue)
    var sourceGuidCellValue = sourceGuidCell.getValue();
    console.log("sourceGuidCellValue", sourceGuidCellValue)
    if (sourceGuidCellValue == "") {
      sourceGuidCell.setValue(Utilities.getUuid());
      var sourceGuidCellValue = sourceGuidCell.getValue();
    }

    console.log("destExistingGuids.indexOf(sourceValues[i][1]", sourceValues[i][0]);
    if (destExistingGuids.indexOf(sourceValues[i][0]) == -1) {
      dest.appendRow([sourceGuidCellValue, sourceValues[i][1], month, sourceValues[i][6], sourceValues[i][7], sourceValues[i][8], sourceValues[i][9], sourceValues[i][10], sourceValues[i][11]]);
    }
  }
}

function getSheet(trixUrl, sheetName) {
  var mainsheet = SpreadsheetApp.openByUrl(trixUrl);
  var sheet = mainsheet.getSheetByName(sheetName)
  return sheet;
}
