/*
After a form is submitted, script will copy and paste a row from Form Responses to the corresponding Student Support Specialist (SSS) tab within the same spreadsheet and email them with select submission details.
Last Modified: 07/06/2020 by Erica Ching
*/

function submitForm() 
{
  let form = FormApp.getActiveForm();
  let formResponses = form.getResponses();
  let rawResponses = SpreadsheetApp.openById(form.getDestinationId()).getSheetByName("Form Responses");
  
  // getRange(row, column, numRows, numColumns)
  // get last row from spreadsheet
  const numRows = 1;
  const numColumns = rawResponses.getLastColumn();
  let responseRange = rawResponses.getRange(rawResponses.getLastRow(), 1, numRows, numColumns);
  
  // region is in column B
  let region = responseRange.getValues()[0][1];
  Logger.log(`region: ${region}`);
   
  // set destination sheet based on region value
  // designate email recipient
  if (region === "SF1 Ingleside" || region === "SF2 Excelsior" || region === "SF3 Haight/WA"){
    var destination = SpreadsheetApp.openById(form.getDestinationId()).getSheetByName("SF1, SF 2, SF 3");
    var recipients = ["[EMAIL1]", "[EMAIL2]"];
    var greeting = "[SSS name]";
  } else if (region === "SF4 Chinatown" || region === "SF5 Mission" || region === "SF6 Bayview/Portola") {
    var destination = SpreadsheetApp.openById(form.getDestinationId()).getSheetByName("SF4, SF5, SF6");
    var recipients = ["[EMAIL3]", "[EMAIL4]"];
    var greeting = "[SSS name]";
  } else if (region === "SB1 Peninsula" || region === "NB1 Marin" || region === "NB2 Napa") {
    var destination = SpreadsheetApp.openById(form.getDestinationId()).getSheetByName("SB1, NB1, NB2");
    var recipients = ["[EMAIL5]", "[EMAIL6]"];
    var greeting = "[SSS name]";
  } else if (region === "EB1 Oakland Central" || region === "EB2 Oakland East" || region === "EB3 Richmond") {
    var destination = SpreadsheetApp.openById(form.getDestinationId()).getSheetByName("EB1, EB2, EB3");
    var recipients = ["[EMAIL7]", "[EMAIL8]"];
    var greeting = "[SSS name]";
  } else if (region === "TT1 Tahoe/Truckee") {
    var destination = SpreadsheetApp.openById(form.getDestinationId()).getSheetByName("TT1");
    var recipients = ["[EMAIL9]", "[EMAIL10]"];
    var greeting = "[SSS name]";
  }
  
  // copy row to sheet and gray out raw response row
  let destinationRange = destination.getRange(destination.getLastRow() + 1, 1)
    responseRange.copyTo(destinationRange);
  responseRange.setBackground("light gray 2");
  
  // Student information
  let studentName = responseRange.getValues()[0][4]; // column E
  let reason = responseRange.getValues()[0][8]; // column I
  let studentContact = responseRange.getValues()[0][7]; // column H
  let studentInfo = responseRange.getValues()[0][9]; // column J
  
  // email
  var subject = `New SSS Student Referral Form`;
  var body = `Hi ${greeting}!
    
${studentName}, from ${region} has been referred to a Student Support Specialist. They were referred for the following reason(s): ${reason}.
    
This notification was sent via automatic email.`;
  MailApp.sendEmail(recipients, subject, body);

}
