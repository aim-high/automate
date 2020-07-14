function copyValues() {
  
  // don't run on weekend
  var day = new Date();
  if (day.getDay() > 5 || day.getDay() === 0) {
    return;
  }
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var attendanceSheet = ss.getSheetByName("EB sites");
  var destinationSheet = ss.getSheetByName("OUSD/Oak");
  
  var range = attendanceSheet.getRange("A1:Y357");
  range.copyTo(destinationSheet.getRange("A1"), {contentsOnly:true});
  
  // all data except for headers
  let row = 2;
  let column = 1;
  let numRows = destinationSheet.getLastRow();
  let numCols = destinationSheet.getLastColumn();
  var dataRange = destinationSheet.getRange(row, column, numRows, numCols);

  // sort data using first name and last name columns, in that order
  let firstNameCol = 4;
  let lastNameCol = 5;
  
  dataRange.sort([
    {column: firstNameCol, ascending: true},
    {column: lastNameCol, ascending: true}
    ]);
  
  // format the date headers from columns F1:Y1
  var dateHeaders = destinationSheet.getRange("F1:Y1");
  dateHeaders.setNumberFormat("MM/dd");
  
  // background colors
  var week1 = destinationSheet.getRange("F1:I1");
  var week3 = destinationSheet.getRange("N1:Q1");
  var week5 = destinationSheet.getRange("V1:Y1");
  
  week1.setBackground("#EB9899");
  week3.setBackground("#B4A7D6");
  week5.setBackground("#A4C2F4");
}

// Add UI menu item to run copyValues script
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('AH@H')
      .addItem('Copy and Paste', 'copyValues')
      .addToUi();
}

// Creates trigger to run copyValues() anytime between 2:45pm-3:15pm window
// run once to add the new trigger
function newTrigger() {
  ScriptApp.newTrigger("copyValues")
    .timeBased()
    .atHour(15)
    .everyMinutes(1)
    .everyDays(1)
    .inTimezone("America/Los_Angeles")
    .create(); 
}
