/*
After someone edits the attached spreadsheet on "Request for Change" column, admin(s) receive email with time, site, grade, requester, message, and url to sheets.
Also appends requests to 2018-2020 Attendance Log File.
*/

// define who is admin separated by commas
var admin = ["ADMIN_EMAIL", "ADMIN2_EMAIL"];

// returns true if admin
function isAdmin(admin, requester)
{
  return (admin.indexOf(requester) > -1);  // indexOf returns -1 if string not found in array
}

function onEdit(e) 
{
  // determine which cell was editted
  var sheet = SpreadsheetApp.getActiveSheet();
  var editRange = sheet.getActiveRange();
  var editRow = editRange.getRow();
  var editCol = editRange.getColumn();
  
  // declare interested range 
  var range = sheet.getRange("F4:F100");
  var rangeRowStart = range.getRow();
  var rangeRowEnd = rangeRowStart + range.getHeight()-1;
  var rangeColStart = range.getColumn();
  var rangeColEnd = rangeColStart + range.getWidth()-1;
  
  // determine spreadsheet 
  var ss = SpreadsheetApp.getActiveSpreadsheet();  
  
  // get edited cell value & who requested change
  var cellValue = sheet.getRange(editRow, editCol).getValue();  
  var requester = Session.getActiveUser().toString();
  
  // send out email to admin
  // ~ only if additions are made in interested row and they are not admin 
  if (editRow >= rangeRowStart && editRow <= rangeRowEnd 
      && editCol >= rangeColStart && editCol <= rangeColEnd && cellValue != "") // ADD THIS WHEN DONE W TESTS: && !isAdmin(admin,requester))
  {
    var recipients = admin;
    var grade = sheet.getName(); // returns string
    var site = ss.getName(); // returns string
    var tabUrl = sheet.getSheetId(); // returns gid (int)
    var url = ss.getUrl() + "#gid=" + tabUrl;
    var subject = 'Request to Change from: ' + ss.getName() + ' ' + grade; 
    var body = ss.getName() + ' ' + grade + '\nUpdated by ' + requester + '.\nMessage: ' + cellValue + '\n\nCheck document to view new comment: ' + url; 
    MailApp.sendEmail(recipients, subject, body);
    
    // gather stats for log file!
    var date = new Date();
    var data = [date,site, grade, requester, cellValue, url];    
    
    // direct path to log file
    var log_ss = SpreadsheetApp.openById("[Attendance Log File ID]"); // points to Attendance Log File
    var log_sheet = log_ss.getSheets()[0];
 
 // checks that we're writing to correct sheet, appends array
    if (log_ss.getName() == "2018-2020 Attendance Log File")
    {
      log_sheet.appendRow(data);
    } 
   }
}

