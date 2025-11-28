/**
 * Kids Virtual Bank - Complete One-Click Setup
 * 
 * This script does EVERYTHING in one go:
 * 1. Creates all spreadsheet sheets and structure
 * 2. Creates all 3 Google Forms
 * 3. Sets up automation triggers
 * 
 * USAGE:
 * 1. Create blank Google Spreadsheet
 * 2. Extensions → Apps Script
 * 3. Paste this ENTIRE file
 * 4. Run testConnection() first to verify
 * 5. Then run setupEverything()
 * 6. Done! ✨
 */

/**
 * ⚡ ONE-CLICK SETUP - Run this function!
 */
function setupEverything() {
  const ui = SpreadsheetApp.getUi();
  
  // Welcome message
  const welcomeResponse = ui.alert(
    '🏦 Kids Virtual Bank - Complete Setup',
    '✨ This will set up EVERYTHING automatically:\n\n' +
    '✅ Create all spreadsheet sheets\n' +
    '✅ Set up formulas and formatting\n' +
    '✅ Create 3 Google Forms\n' +
    '✅ Link forms to spreadsheet\n' +
    '✅ Enable automation triggers\n\n' +
    'Ready to begin?',
    ui.ButtonSet.YES_NO
  );
  
  if (welcomeResponse !== ui.Button.YES) {
    ui.alert('Setup cancelled.');
    return;
  }
  
  // Get kid information
  const numKidsResponse = ui.prompt(
    'Step 1: How many kids?',
    'Enter the number of kids (2-10):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (numKidsResponse.getSelectedButton() !== ui.Button.OK) {
    ui.alert('Setup cancelled.');
    return;
  }
  
  const numKids = parseInt(numKidsResponse.getResponseText());
  if (isNaN(numKids) || numKids < 2 || numKids > 10) {
    ui.alert('Error: Please enter a number between 2 and 10.');
    return;
  }
  
  // Collect kid names
  const kidNames = [];
  for (let i = 0; i < numKids; i++) {
    const nameResponse = ui.prompt(
      `Kid ${i + 1} of ${numKids}`,
      `Enter name for kid #${i + 1}:`,
      ui.ButtonSet.OK_CANCEL
    );
    
    if (nameResponse.getSelectedButton() !== ui.Button.OK) {
      ui.alert('Setup cancelled.');
      return;
    }
    
    const name = nameResponse.getResponseText().trim();
    if (!name) {
      ui.alert('Error: Name cannot be empty.');
      return;
    }
    kidNames.push(name);
  }
  
  // Show progress
  ui.alert(
    'Setting up your bank...',
    `Creating system for: ${kidNames.join(', ')}\n\n` +
    'This will take 20-30 seconds.\n' +
    'Click OK and wait for completion message.',
    ui.ButtonSet.OK
  );
  
  try {
    // PART 1: Create spreadsheet structure
    createAllSheets(kidNames);
    
    // PART 2: Create forms
    const formUrls = createAllFormsInternal(kidNames);
    
    // PART 2.5: Create Form Links reference sheet
    createFormLinksSheet(formUrls);
    
    // PART 3: Set up triggers
    createTriggersInternal();
    
    // Success message with form URLs
    const successMessage = 
      '🎉 SETUP COMPLETE!\n\n' +
      '✅ All sheets created\n' +
      '✅ All formulas configured\n' +
      '✅ 3 forms created and linked\n' +
      '✅ Automation triggers enabled\n\n' +
      '📋 FORM URLS (save these!):\n\n' +
      '💰 DEPOSIT (for parents):\n' + formUrls.deposit + '\n\n' +
      '💸 WITHDRAWAL (for kids):\n' + formUrls.withdrawal + '\n\n' +
      '🧹 CHORES (for kids):\n' + formUrls.chores + '\n\n' +
      '✨ Your Kids Virtual Bank is ready to use!\n\n' +
      'NEXT STEPS:\n' +
      '1. Share form URLs with family\n' +
      '2. Share spreadsheet with family\n' +
      '3. Test with a deposit!\n\n' +
      'Check the Dashboard sheet for overview.';
    
    ui.alert('🎉 Success!', successMessage, ui.ButtonSet.OK);
    
    // Add custom menu
    createCustomMenu();
    
  } catch (error) {
    ui.alert('Error', '❌ Setup failed: ' + error.toString(), ui.ButtonSet.OK);
    Logger.log('Setup error: ' + error);
  }
}

// ============================================================================
// PART 1: SPREADSHEET SETUP (from AutoSetup.gs)
// ============================================================================

function createAllSheets(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // First create Transactions sheet if it doesn't exist (ensures we always have at least one sheet)
  if (!ss.getSheetByName('Transactions')) {
    ss.insertSheet('Transactions', 0);
  }
  
  // Now safe to delete old sheets
  const oldSheets = ['Dashboard', 'Chores', 'Allowance Rules', 'Form Links', 'Summary'];
  oldSheets.forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet) ss.deleteSheet(sheet);
  });
  
  // Delete old ledger sheets
  ss.getSheets().forEach(sheet => {
    if (sheet.getName().endsWith(' Ledger')) {
      ss.deleteSheet(sheet);
    }
  });
  
  // Delete old form response sheets
  ss.getSheets().forEach(sheet => {
    if (sheet.getName().startsWith('Form: ')) {
      ss.deleteSheet(sheet);
    }
  });
  
  // Delete default Sheet1 if it exists
  ss.getSheets().forEach(sheet => {
    if (sheet.getName().match(/^Sheet\d+$/)) {
      ss.deleteSheet(sheet);
    }
  });
  
  // Create/recreate all sheets in desired order
  setupDashboardSheet(kidNames);
  setupChoresSheet();
  setupTransactionsSheet();
  setupAllowanceRulesSheet(kidNames);
  
  // Create individual kid ledgers
  for (let i = 0; i < kidNames.length; i++) {
    setupKidLedger(kidNames[i]);
  }
  
  // Delete default Sheet1 only if we have other sheets now
  const sheets = ss.getSheets();
  sheets.forEach(sheet => {
    if (sheet.getName().match(/^Sheet\d+$/) && sheets.length > 1) {
      ss.deleteSheet(sheet);
    }
  });
  
  // Add sample data
  addSampleData(kidNames);
  
  Logger.log('All sheets created successfully for: ' + kidNames.join(', '));
}

function setupTransactionsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Transactions');
  
  if (!sheet) {
    sheet = ss.insertSheet('Transactions', 0);
  }
  
  sheet.clear();
  
  const headers = ['Date', 'Kid', 'Type', 'Description', 'Amount', 'Balance'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
  
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 250);
  sheet.setColumnWidth(5, 100);
  sheet.setColumnWidth(6, 100);
  
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd');
  sheet.getRange('E:F').setNumberFormat('$#,##0.00');
  
  sheet.setFrozenRows(1);
  
  Logger.log('Transactions sheet created');
}

function setupSummarySheet(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Summary');
  
  if (!sheet) {
    sheet = ss.insertSheet('Summary');
  }
  
  sheet.clear();
  
  const headers = ['Kid', 'Current Balance'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#34a853').setFontColor('#ffffff');
  
  for (let i = 0; i < kidNames.length; i++) {
    const row = i + 2;
    sheet.getRange(row, 1).setValue(kidNames[i]);
    sheet.getRange(row, 2).setFormula(`=SUMIF(Transactions!$B:$B,A${row},Transactions!$E:$E)`);
  }
  
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.getRange('B:B').setNumberFormat('$#,##0.00');
  
  Logger.log('Summary sheet created');
}

function setupDashboardSheet(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Dashboard');
  
  if (!sheet) {
    sheet = ss.insertSheet('Dashboard');
  }
  
  sheet.clear();
  
  sheet.getRange('A1').setValue('🏦 Kids Virtual Bank Dashboard');
  sheet.getRange('A1').setFontSize(18).setFontWeight('bold').setBackground('#fbbc04').setFontColor('#ffffff');
  sheet.setRowHeight(1, 40);
  sheet.getRange('A1:E1').merge();
  
  sheet.getRange('A3').setValue('Kid');
  sheet.getRange('B3').setValue('Balance');
  sheet.getRange('C3').setValue('Last Activity');
  sheet.getRange('A3:C3').setFontWeight('bold').setBackground('#ea4335').setFontColor('#ffffff');
  
  for (let i = 0; i < kidNames.length; i++) {
    const row = i + 4;
    sheet.getRange(row, 1).setValue(kidNames[i]);
    sheet.getRange(row, 2).setFormula(`=SUMIF(Transactions!$B:$B,A${row},Transactions!$E:$E)`);
    sheet.getRange(row, 3).setFormula(`=QUERY(Transactions!A:B,"SELECT MAX(A) WHERE B='"&A${row}&"' LABEL MAX(A) ''",0)`);
  }
  
  sheet.getRange('B:B').setNumberFormat('$#,##0.00');
  sheet.getRange('C:C').setNumberFormat('yyyy-mm-dd');
  
  const startRow = kidNames.length + 6;
  sheet.getRange(startRow, 1).setValue('Recent Transactions (Last 10)');
  sheet.getRange(startRow, 1).setFontWeight('bold').setFontSize(12);
  
  sheet.getRange(startRow + 1, 1).setFormula('=QUERY(Transactions!A:E,"SELECT A,B,C,D,E ORDER BY A DESC LIMIT 10",1)');
  
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 100);
  
  Logger.log('Dashboard sheet created');
}

function setupChoresSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Chores');
  
  if (!sheet) {
    sheet = ss.insertSheet('Chores');
  }
  
  sheet.clear();
  
  const headers = ['Timestamp', 'Kid', 'Chore', 'Value', 'Approved?', 'Posted?'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#9c27b0').setFontColor('#ffffff');
  
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 80);
  sheet.setColumnWidth(5, 100);
  sheet.setColumnWidth(6, 100);
  
  sheet.getRange('D:D').setNumberFormat('$#,##0.00');
  sheet.setFrozenRows(1);
  
  const approvedRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Yes', 'No'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('E2:E1000').setDataValidation(approvedRule);
  
  Logger.log('Chores sheet created');
}

function setupAllowanceRulesSheet(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Allowance Rules');
  
  if (!sheet) {
    sheet = ss.insertSheet('Allowance Rules');
  }
  
  sheet.clear();
  
  const headers = ['Kid', 'Weekly Allowance', 'Notes'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#ff6d00').setFontColor('#ffffff');
  
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  
  for (let i = 0; i < kidNames.length; i++) {
    const row = i + 2;
    sheet.getRange(row, 1).setValue(kidNames[i]);
    sheet.getRange(row, 2).setValue(10.00);
    sheet.getRange(row, 3).setValue('Started ' + today);
  }
  
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 250);
  sheet.getRange('B:B').setNumberFormat('$#,##0.00');
  
  Logger.log('Allowance Rules sheet created');
}

function setupKidLedger(kidName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = kidName + ' Ledger';
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  
  sheet.clear();
  
  const headers = ['Date', 'Type', 'Description', 'Amount', 'Balance'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  const colorCode = hashCode(kidName);
  const bgColor = '#' + ((colorCode & 0xFFFFFF) | 0x808080).toString(16).padStart(6, '0');
  
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground(bgColor).setFontColor('#ffffff');
  
  sheet.getRange('A2').setFormula(`=QUERY(Transactions!A:E,"SELECT A,C,D,E WHERE B='${kidName}' ORDER BY A",1)`);
  
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 250);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 100);
  
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd');
  sheet.getRange('D:E').setNumberFormat('$#,##0.00');
  sheet.setFrozenRows(1);
  
  Logger.log(kidName + ' Ledger created');
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function addSampleData(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Transactions');
  const today = new Date();
  
  const data = [];
  for (let i = 0; i < kidNames.length; i++) {
    data.push([today, kidNames[i], 'Deposit', 'Opening Balance', 0]);
  }
  
  if (data.length > 0) {
    sheet.getRange(2, 1, data.length, 5).setValues(data);
  }
  
  Logger.log('Sample data added');
}

// ============================================================================
// PART 2: FORM CREATION (from setupForms.gs)
// ============================================================================

function createAllFormsInternal(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const depositForm = createDepositForm(kidNames, ss);
  const withdrawalForm = createWithdrawalForm(kidNames, ss);
  const choresForm = createChoresForm(kidNames, ss);
  
  Logger.log('All forms created successfully');
  
  return {
    deposit: depositForm.getPublishedUrl(),
    withdrawal: withdrawalForm.getPublishedUrl(),
    chores: choresForm.getPublishedUrl()
  };
}

function createDepositForm(kidNames, spreadsheet) {
  const form = FormApp.create('Kids Bank - Deposit');
  
  form.setDescription(
    'Parents: Use this form to deposit money into your kids\' bank accounts.\n\n' +
    '💡 Examples: Birthday money, allowance advances, rewards, etc.'
  );
  
  const kidQuestion = form.addMultipleChoiceItem();
  kidQuestion.setTitle('Which kid is this deposit for?').setRequired(true);
  const kidChoices = kidNames.map(name => kidQuestion.createChoice(name));
  kidQuestion.setChoices(kidChoices);
  
  const amountQuestion = form.addTextItem();
  amountQuestion.setTitle('Amount')
    .setHelpText('Enter the dollar amount (e.g., 10 or 10.50)')
    .setRequired(true);
  const amountValidation = FormApp.createTextValidation()
    .setHelpText('Please enter a valid positive number')
    .requireNumber()
    .build();
  amountQuestion.setValidation(amountValidation);
  
  const descriptionQuestion = form.addTextItem();
  descriptionQuestion.setTitle('Description')
    .setHelpText('What is this deposit for? (e.g., "Birthday gift", "Good grades", "Chore bonus")')
    .setRequired(true);
  
  form.setAcceptingResponses(true);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(true);
  form.setConfirmationMessage('✅ Deposit recorded! Check the spreadsheet in a few minutes.');
  
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  // Rename the response sheet
  Utilities.sleep(1000);
  const sheets = spreadsheet.getSheets();
  const responseSheet = sheets[sheets.length - 1];
  responseSheet.setName('Form: Deposit');
  
  return form;
}

function createWithdrawalForm(kidNames, spreadsheet) {
  const form = FormApp.create('Kids Bank - Withdrawal');
  
  form.setDescription(
    'Kids: Use this form to withdraw money from your bank account.\n\n' +
    '💡 Tell us what you want to buy or save for!\n' +
    '⚠️ Make sure you have enough balance!'
  );
  
  const nameQuestion = form.addMultipleChoiceItem();
  nameQuestion.setTitle('What is your name?').setRequired(true);
  const nameChoices = kidNames.map(name => nameQuestion.createChoice(name));
  nameQuestion.setChoices(nameChoices);
  
  const amountQuestion = form.addTextItem();
  amountQuestion.setTitle('How much money do you want to withdraw?')
    .setHelpText('Enter the dollar amount (e.g., 5 or 5.50)')
    .setRequired(true);
  const amountValidation = FormApp.createTextValidation()
    .setHelpText('Please enter a valid positive number')
    .requireNumber()
    .build();
  amountQuestion.setValidation(amountValidation);
  
  const purposeQuestion = form.addTextItem();
  purposeQuestion.setTitle('What do you want to buy or save for?')
    .setHelpText('Examples: "Toy car", "Save for bike", "Candy", "Video game"')
    .setRequired(true);
  
  form.setAcceptingResponses(true);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(true);
  form.setConfirmationMessage('✅ Withdrawal requested! Check your ledger in a few minutes.');
  
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  // Rename the response sheet
  Utilities.sleep(1000);
  const sheets = spreadsheet.getSheets();
  const responseSheet = sheets[sheets.length - 1];
  responseSheet.setName('Form: Withdrawal');
  
  return form;
}

function createChoresForm(kidNames, spreadsheet) {
  const form = FormApp.create('Kids Bank - Chores');
  
  form.setDescription(
    'Kids: Submit your completed chores here to earn money!\n\n' +
    '✨ Choose the chore you completed\n' +
    '⏳ Wait for parent approval\n' +
    '💰 Money will be added to your account!'
  );
  
  const nameQuestion = form.addMultipleChoiceItem();
  nameQuestion.setTitle('What is your name?').setRequired(true);
  const nameChoices = kidNames.map(name => nameQuestion.createChoice(name));
  nameQuestion.setChoices(nameChoices);
  
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
  
  const notesQuestion = form.addParagraphTextItem();
  notesQuestion.setTitle('Notes (Optional)')
    .setHelpText('Add any details about the chore')
    .setRequired(false);
  
  form.setAcceptingResponses(true);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(true);
  form.setConfirmationMessage('✅ Chore submitted! Wait for parent approval in the spreadsheet.');
  
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  // Rename the response sheet
  Utilities.sleep(1000);
  const sheets = spreadsheet.getSheets();
  const responseSheet = sheets[sheets.length - 1];
  responseSheet.setName('Form: Chores');
  
  return form;
}

/**
 * Create Form Links reference sheet
 */
function createFormLinksSheet(formUrls) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Form Links');
  
  if (!sheet) {
    sheet = ss.insertSheet('Form Links');
  }
  
  sheet.clear();
  
  // Title
  sheet.getRange('A1').setValue('📋 Form Links - Share These!');
  sheet.getRange('A1').setFontSize(16).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
  sheet.setRowHeight(1, 40);
  sheet.getRange('A1:B1').merge();
  
  // Headers
  sheet.getRange('A3:B3').setValues([['Form Name', 'URL']]);
  sheet.getRange('A3:B3').setFontWeight('bold').setBackground('#34a853').setFontColor('#ffffff');
  
  // Form links
  const data = [
    ['💰 Deposit Form (for parents)', formUrls.deposit],
    ['💸 Withdrawal Form (for kids)', formUrls.withdrawal],
    ['🧹 Chores Form (for kids)', formUrls.chores]
  ];
  
  sheet.getRange(4, 1, data.length, 2).setValues(data);
  
  // Format URLs as hyperlinks and make them blue
  for (let i = 0; i < data.length; i++) {
    const cell = sheet.getRange(4 + i, 2);
    cell.setFontColor('#1155cc');
    cell.setFontWeight('normal');
  }
  
  // Column widths
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 450);
  
  // Instructions
  sheet.getRange('A7').setValue('📖 Instructions:');
  sheet.getRange('A7').setFontWeight('bold').setFontSize(12);
  
  const instructions = [
    ['1. Click any URL above to open the form'],
    ['2. Copy the URL and share with your family'],
    ['3. Or create shortcuts on phones/tablets'],
    ['4. Forms automatically update the spreadsheet every 5 minutes'],
    ['5. Parents approve chores in the Chores sheet']
  ];
  
  sheet.getRange(8, 1, instructions.length, 1).setValues(instructions);
  sheet.getRange('A8:A12').setWrap(true);
  
  Logger.log('Form Links sheet created');
}

// ============================================================================
// PART 3: AUTOMATION SETUP (from Code.gs + forms.gs + chores.gs + triggers.gs)
// ============================================================================

function createTriggersInternal() {
  // Delete existing triggers first
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  // Create new triggers
  ScriptApp.newTrigger('importFormResponses')
    .timeBased()
    .everyMinutes(5)
    .create();
  
  ScriptApp.newTrigger('processApprovedChores')
    .timeBased()
    .everyMinutes(5)
    .create();
  
  ScriptApp.newTrigger('importChoreFormResponses')
    .timeBased()
    .everyMinutes(5)
    .create();
  
  ScriptApp.newTrigger('weeklyAllowance')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(8)
    .create();
  
  Logger.log('All triggers created successfully');
}

function createCustomMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏦 Bank Actions')
    .addItem('▶ Run All Now', 'runAllNow')
    .addItem('💰 Post Weekly Allowance', 'weeklyAllowance')
    .addSeparator()
    .addItem('📝 Process Forms', 'importFormResponses')
    .addItem('✅ Process Chores', 'processApprovedChores')
    .addSeparator()
    .addItem('⚙️ Create Triggers', 'createTriggers')
    .addItem('🗑️ Delete Triggers', 'deleteTriggers')
    .addItem('📋 List Triggers', 'listTriggers')
    .addToUi();
}

function onOpen() {
  createCustomMenu();
}

// ============================================================================
// OPERATIONAL FUNCTIONS (needed for ongoing use)
// ============================================================================

function runAllNow() {
  importFormResponses();
  processApprovedChores();
  importChoreFormResponses();
  SpreadsheetApp.getUi().alert('✅ All processes completed!');
}

function weeklyAllowance() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rulesSheet = ss.getSheetByName('Allowance Rules');
  const transSheet = ss.getSheetByName('Transactions');
  
  if (!rulesSheet || !transSheet) {
    Logger.log('Required sheets not found');
    return;
  }
  
  const data = rulesSheet.getDataRange().getValues();
  const today = new Date();
  
  for (let i = 1; i < data.length; i++) {
    const kid = data[i][0];
    const amount = data[i][1];
    
    if (kid && amount > 0) {
      transSheet.appendRow([today, kid, 'Deposit', 'Weekly Allowance', amount]);
    }
  }
  
  Logger.log('Weekly allowances posted');
}

function importFormResponses() {
  importDeposits();
  importWithdrawals();
}

function importDeposits() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = findSheetByPattern(ss, 'Deposit');
  
  if (!formSheet) {
    Logger.log('Deposit form sheet not found');
    return;
  }
  
  processFormSheet(formSheet, 'Deposit');
}

function importWithdrawals() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = findSheetByPattern(ss, 'Withdrawal');
  
  if (!formSheet) {
    Logger.log('Withdrawal form sheet not found');
    return;
  }
  
  processFormSheet(formSheet, 'Withdrawal');
}

function processFormSheet(formSheet, type) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet = ss.getSheetByName('Transactions');
  
  if (!transSheet) return;
  
  const data = formSheet.getDataRange().getValues();
  if (data.length <= 1) return;
  
  const headers = data[0];
  const importedColIndex = headers.indexOf('Imported?');
  
  if (importedColIndex === -1) {
    formSheet.getRange(1, headers.length + 1).setValue('Imported?');
    return processFormSheet(formSheet, type);
  }
  
  const kidColIndex = headers.findIndex(h => h.toLowerCase().includes('kid') || h.toLowerCase().includes('name'));
  const amountColIndex = headers.findIndex(h => h.toLowerCase().includes('amount'));
  const descColIndex = headers.findIndex(h => 
    h.toLowerCase().includes('description') || 
    h.toLowerCase().includes('what') || 
    h.toLowerCase().includes('for')
  );
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const imported = row[importedColIndex];
    
    if (imported === 'Yes') continue;
    
    const timestamp = row[0];
    const kid = row[kidColIndex];
    const amount = parseFloat(row[amountColIndex]);
    const description = row[descColIndex] || type;
    
    if (kid && !isNaN(amount)) {
      const finalAmount = type === 'Withdrawal' ? -Math.abs(amount) : Math.abs(amount);
      transSheet.appendRow([timestamp, kid, type, description, finalAmount]);
      formSheet.getRange(i + 1, importedColIndex + 1).setValue('Yes');
    }
  }
  
  Logger.log(type + ' forms processed');
}

function findSheetByPattern(ss, pattern) {
  const sheets = ss.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    const name = sheets[i].getName();
    if (name.toLowerCase().includes(pattern.toLowerCase())) {
      return sheets[i];
    }
  }
  return null;
}

function processApprovedChores() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const choresSheet = ss.getSheetByName('Chores');
  const transSheet = ss.getSheetByName('Transactions');
  
  if (!choresSheet || !transSheet) return;
  
  const data = choresSheet.getDataRange().getValues();
  if (data.length <= 1) return;
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const approved = row[4];
    const posted = row[5];
    
    if (approved === 'Yes' && posted !== 'Yes') {
      const timestamp = row[0];
      const kid = row[1];
      const chore = row[2];
      const value = parseFloat(row[3]);
      
      if (kid && !isNaN(value) && value > 0) {
        transSheet.appendRow([timestamp, kid, 'Deposit', 'Chore: ' + chore, value]);
        choresSheet.getRange(i + 1, 6).setValue('Yes');
      }
    }
  }
  
  Logger.log('Approved chores processed');
}

function importChoreFormResponses() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = findSheetByPattern(ss, 'Chores');
  const choresSheet = ss.getSheetByName('Chores');
  
  if (!formSheet || !choresSheet || formSheet.getName() === 'Chores') return;
  
  const data = formSheet.getDataRange().getValues();
  if (data.length <= 1) return;
  
  const headers = data[0];
  const importedColIndex = headers.indexOf('Imported?');
  
  if (importedColIndex === -1) {
    formSheet.getRange(1, headers.length + 1).setValue('Imported?');
    return importChoreFormResponses();
  }
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const imported = row[importedColIndex];
    
    if (imported === 'Yes') continue;
    
    const timestamp = row[0];
    const kid = row[1];
    const choreRaw = row[2];
    
    const valueMatch = choreRaw.match(/\$(\d+(?:\.\d{2})?)/);
    const value = valueMatch ? parseFloat(valueMatch[1]) : 0;
    const chore = choreRaw.replace(/\s*\(\$[\d.]+\)/, '');
    
    if (kid && value > 0) {
      choresSheet.appendRow([timestamp, kid, chore, value, 'No', '']);
      formSheet.getRange(i + 1, importedColIndex + 1).setValue('Yes');
    }
  }
  
  Logger.log('Chore form responses imported');
}

function createTriggers() {
  createTriggersInternal();
  SpreadsheetApp.getUi().alert('✅ Triggers created successfully!\n\nAutomation is now enabled.');
}

function deleteTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  SpreadsheetApp.getUi().alert('🗑️ All triggers deleted.');
}

function listTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  let message = 'Current triggers (' + triggers.length + '):\n\n';
  
  for (let i = 0; i < triggers.length; i++) {
    message += (i + 1) + '. ' + triggers[i].getHandlerFunction() + '\n';
  }
  
  SpreadsheetApp.getUi().alert('Triggers', message, SpreadsheetApp.getUi().ButtonSet.OK);
}
