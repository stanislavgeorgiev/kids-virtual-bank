/**
 * Kids Virtual Bank - Automatic Form Creation
 * 
 * This script automatically creates all three required Google Forms
 * and links them to your spreadsheet.
 * 
 * USAGE:
 * 1. Make sure AutoSetup.gs has been run first (spreadsheet structure exists)
 * 2. Run createAllForms() function
 * 3. Enter the same kid names you used during AutoSetup
 * 4. Forms will be created and linked automatically
 */

/**
 * Main function - Creates all three forms and links them to the spreadsheet
 */
function createAllForms() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get kid names from Summary sheet
  const summarySheet = ss.getSheetByName('Summary');
  if (!summarySheet) {
    SpreadsheetApp.getUi().alert('Error: Summary sheet not found. Please run AutoSetup.gs first.');
    return;
  }
  
  // Extract kid names from Summary sheet (skip header row)
  const summaryData = summarySheet.getDataRange().getValues();
  const kidNames = [];
  for (let i = 1; i < summaryData.length; i++) {
    const name = summaryData[i][0]; // Column A = Kid Name
    if (name) kidNames.push(name);
  }
  
  if (kidNames.length === 0) {
    SpreadsheetApp.getUi().alert('Error: No kids found in Summary sheet. Please run AutoSetup.gs first.');
    return;
  }
  
  // Create all three forms
  const depositForm = createDepositForm(kidNames, ss);
  const withdrawalForm = createWithdrawalForm(kidNames, ss);
  const choresForm = createChoresForm(kidNames, ss);
  
  // Show completion message with URLs
  const message = 
    '✅ All forms created successfully!\n\n' +
    '📋 FORM URLS (share these with your family):\n\n' +
    '💰 Deposit Form (for parents):\n' +
    depositForm.getPublishedUrl() + '\n\n' +
    '💸 Withdrawal Form (for kids):\n' +
    withdrawalForm.getPublishedUrl() + '\n\n' +
    '🧹 Chores Form (for kids):\n' +
    choresForm.getPublishedUrl() + '\n\n' +
    '✨ Forms are linked to your spreadsheet!\n' +
    '✨ New response sheets have been created!\n\n' +
    'NEXT STEP: Run createTriggers() to enable automation.';
  
  SpreadsheetApp.getUi().alert('Forms Created!', message, SpreadsheetApp.getUi().ButtonSet.OK);
  
  Logger.log('All forms created successfully');
  Logger.log('Deposit: ' + depositForm.getPublishedUrl());
  Logger.log('Withdrawal: ' + withdrawalForm.getPublishedUrl());
  Logger.log('Chores: ' + choresForm.getPublishedUrl());
}

/**
 * Creates the Deposit Form (for parents to add money)
 */
function createDepositForm(kidNames, spreadsheet) {
  const form = FormApp.create('Kids Bank - Deposit');
  
  // Set form description
  form.setDescription(
    'Parents: Use this form to deposit money into your kids\' bank accounts.\n\n' +
    '💡 Examples: Birthday money, allowance advances, rewards, etc.'
  );
  
  // Question 1: Which kid? (Multiple choice)
  const kidQuestion = form.addMultipleChoiceItem();
  kidQuestion.setTitle('Which kid is this deposit for?')
    .setRequired(true);
  
  const kidChoices = kidNames.map(name => kidQuestion.createChoice(name));
  kidQuestion.setChoices(kidChoices);
  
  // Question 2: Amount (Short answer with validation)
  const amountQuestion = form.addTextItem();
  amountQuestion.setTitle('Amount')
    .setHelpText('Enter the dollar amount (e.g., 10 or 10.50)')
    .setRequired(true);
  
  const amountValidation = FormApp.createTextValidation()
    .setHelpText('Please enter a valid positive number')
    .requireNumber()
    .build();
  amountQuestion.setValidation(amountValidation);
  
  // Question 3: Description (Short answer)
  const descriptionQuestion = form.addTextItem();
  descriptionQuestion.setTitle('Description')
    .setHelpText('What is this deposit for? (e.g., "Birthday gift", "Good grades", "Chore bonus")')
    .setRequired(true);
  
  // Set form properties
  form.setAcceptingResponses(true);
  form.setLimitOneResponsePerUser(false); // Parents can make multiple deposits
  form.setShowLinkToRespondAgain(true);
  form.setConfirmationMessage('✅ Deposit recorded! Check the spreadsheet in a few minutes.');
  
  // Link form to spreadsheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  return form;
}

/**
 * Creates the Withdrawal Form (for kids to request money)
 */
function createWithdrawalForm(kidNames, spreadsheet) {
  const form = FormApp.create('Kids Bank - Withdrawal');
  
  // Set form description
  form.setDescription(
    'Kids: Use this form to withdraw money from your bank account.\n\n' +
    '💡 Tell us what you want to buy or save for!\n' +
    '⚠️ Make sure you have enough balance!'
  );
  
  // Question 1: Your name (Multiple choice)
  const nameQuestion = form.addMultipleChoiceItem();
  nameQuestion.setTitle('What is your name?')
    .setRequired(true);
  
  const nameChoices = kidNames.map(name => nameQuestion.createChoice(name));
  nameQuestion.setChoices(nameChoices);
  
  // Question 2: Amount (Short answer with validation)
  const amountQuestion = form.addTextItem();
  amountQuestion.setTitle('How much money do you want to withdraw?')
    .setHelpText('Enter the dollar amount (e.g., 5 or 5.50)')
    .setRequired(true);
  
  const amountValidation = FormApp.createTextValidation()
    .setHelpText('Please enter a valid positive number')
    .requireNumber()
    .build();
  amountQuestion.setValidation(amountValidation);
  
  // Question 3: What for? (Short answer)
  const purposeQuestion = form.addTextItem();
  purposeQuestion.setTitle('What do you want to buy or save for?')
    .setHelpText('Examples: "Toy car", "Save for bike", "Candy", "Video game"')
    .setRequired(true);
  
  // Set form properties
  form.setAcceptingResponses(true);
  form.setLimitOneResponsePerUser(false); // Kids can make multiple withdrawals
  form.setShowLinkToRespondAgain(true);
  form.setConfirmationMessage('✅ Withdrawal requested! Check your ledger in a few minutes.');
  
  // Link form to spreadsheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  return form;
}

/**
 * Creates the Chores Form (for kids to submit completed chores)
 */
function createChoresForm(kidNames, spreadsheet) {
  const form = FormApp.create('Kids Bank - Chores');
  
  // Set form description
  form.setDescription(
    'Kids: Submit your completed chores here to earn money!\n\n' +
    '✨ Choose the chore you completed\n' +
    '⏳ Wait for parent approval\n' +
    '💰 Money will be added to your account!'
  );
  
  // Question 1: Your name (Multiple choice)
  const nameQuestion = form.addMultipleChoiceItem();
  nameQuestion.setTitle('What is your name?')
    .setRequired(true);
  
  const nameChoices = kidNames.map(name => nameQuestion.createChoice(name));
  nameQuestion.setChoices(nameChoices);
  
  // Question 2: Which chore? (Dropdown)
  const choreQuestion = form.addListItem();
  choreQuestion.setTitle('Which chore did you complete?')
    .setRequired(true)
    .setChoiceValues([
      'Clean room ($5)',
      'Wash dishes ($5)',
      'Take out trash ($3)',
      'Vacuum house ($7)',
      'Yard work ($10)',
      'Help with laundry ($5)',
      'Set table for dinner ($2)',
      'Help cook meal ($8)',
      'Clean bathroom ($7)',
      'Organize garage ($10)',
      'Walk dog ($4)',
      'Feed pets ($2)',
      'Water plants ($3)',
      'Homework without reminder ($5)',
      'Extra credit project ($10)'
    ]);
  
  // Question 3: Notes (Optional paragraph)
  const notesQuestion = form.addParagraphTextItem();
  notesQuestion.setTitle('Notes (Optional)')
    .setHelpText('Add any details about the chore, or upload a photo in the next question')
    .setRequired(false);
  
  // Question 4: Photo (Optional file upload)
  const photoQuestion = form.addFileUploadItem();
  photoQuestion.setTitle('Photo of completed chore (Optional)')
    .setHelpText('Take a photo to show your work! (Optional but helps with approval)')
    .setRequired(false);
  
  // Set form properties
  form.setAcceptingResponses(true);
  form.setLimitOneResponsePerUser(false); // Kids can submit multiple chores
  form.setShowLinkToRespondAgain(true);
  form.setConfirmationMessage('✅ Chore submitted! Wait for parent approval in the spreadsheet.');
  
  // Link form to spreadsheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  return form;
}

/**
 * Helper function - Get all kid names from Summary sheet
 */
function getKidNames() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const summarySheet = ss.getSheetByName('Summary');
  
  if (!summarySheet) {
    throw new Error('Summary sheet not found. Run AutoSetup.gs first.');
  }
  
  const data = summarySheet.getDataRange().getValues();
  const names = [];
  
  for (let i = 1; i < data.length; i++) { // Skip header
    if (data[i][0]) names.push(data[i][0]);
  }
  
  return names;
}

/**
 * Test function - Check if forms can be created
 */
function testFormCreation() {
  try {
    const names = getKidNames();
    Logger.log('Found ' + names.length + ' kids: ' + names.join(', '));
    Logger.log('✅ Ready to create forms!');
    return true;
  } catch (e) {
    Logger.log('❌ Error: ' + e.message);
    return false;
  }
}

/**
 * Utility function - Delete all forms (use with caution!)
 * This is useful if you need to recreate forms from scratch
 */
function deleteAllForms() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Delete All Forms?',
    '⚠️ WARNING: This will permanently delete all forms!\n\n' +
    'Are you sure you want to continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    ui.alert('Cancelled', 'No forms were deleted.', ui.ButtonSet.OK);
    return;
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formUrl = ss.getFormUrl();
  
  if (!formUrl) {
    ui.alert('No forms found', 'This spreadsheet has no linked forms.', ui.ButtonSet.OK);
    return;
  }
  
  // Note: This only unlinks the form, doesn't delete it from Drive
  // Forms must be manually deleted from Google Drive
  FormApp.openByUrl(formUrl).removeDestination();
  
  ui.alert(
    'Forms Unlinked',
    'Forms have been unlinked from this spreadsheet.\n\n' +
    'To fully delete them, go to Google Drive and delete the form files.',
    ui.ButtonSet.OK
  );
}
