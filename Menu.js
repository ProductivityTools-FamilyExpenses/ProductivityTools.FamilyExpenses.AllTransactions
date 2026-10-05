function onOpen(e) {
    var ui = SpreadsheetApp.getUi();
  ui.createMenu('Family Expenses')
      .addItem('Move mBankExpenses to AllTransactions', 'fillTransactions')
      .addItem('Clear all transactions', 'clear')

      .addItem('Clear all transactions and move mBankExpenses to AllTransactions', 'clearTransactionandFill')
      .addToUi();
}
