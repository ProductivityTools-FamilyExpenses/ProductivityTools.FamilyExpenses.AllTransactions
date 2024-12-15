function onOpen(e) {
    var ui = SpreadsheetApp.getUi();
  ui.createMenu('Family Expenses')
      .addItem('Move mBankExpenses to AllTransactions', 'runner')
      .addToUi();
}
