function copyValues() {

  // don't run on weekend
  var day = new Date();
  if (day.getDay() > 5 || day.getDay() === 0) {
    return;
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var attendanceSheet = ss.getSheetByName("EB sites");
  var destinationSheet = ss.getSheetByName("OUSD");

  var range = attendanceSheet.getRange("A1:Z357");
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
  var dateHeaders = destinationSheet.getRange("F1:Z1");
  dateHeaders.setNumberFormat("MM/dd");

  // background colors
  var week1 = destinationSheet.getRange("F1:I1");
  var week3 = destinationSheet.getRange("N1:Q1");
  var week5 = destinationSheet.getRange("V1:Z1");

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

function copyOakland() {
  var sss = SpreadsheetApp.openById('[sourceID]'); // replace with source ID
  var ss = sss.getSheetByName('EB sites');
  var range = ss.getRange('A:Z');        // assign the range you want to copy
  var rawData = range.getValues()        // get value from spreadsheet 1
  var data = rawData.filter(filterOakland); // Filtered Data will be stored in this array

  var destination = sss.getSheetByName('Oakland');
  destination.getRange(2,1,destination.getLastRow() - 1,destination.getLastColumn()).clear(); // Assuming header is in the first row, clears sheet but header
  destination.getRange(2, 1, data.length, data[0].length).setValues(data);

  let row = 2;
  let column = 1;
  let numRows = destination.getLastRow();
  let numCols = destination.getLastColumn();
  var dataRange = destination.getRange(row, column, numRows, numCols);
  let firstNameCol = 4;
  let lastNameCol = 5;

  dataRange.sort([
    {column: firstNameCol, ascending: true},
    {column: lastNameCol, ascending: true}
    ]);


};


// Column Oakland is 2, filtering for Yes
function filterOakland(arr)
{
  return arr[2] == "Yes";
};
