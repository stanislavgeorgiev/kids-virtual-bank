/**
 * 🏦 Kids Virtual Bank - Main Script
 * 
 * This is the main entry point for all automation.
 * Run createTriggers() once to set up automatic execution.
 * Run runAllNow() to manually process everything immediately.
 */

/**
 * Manual execution - runs all processes right now
 */
function runAllNow() {
  Logger.log('=== Running all processes manually ===');
  
  try {
    importFormResponses();
    Logger.log('✓ Form responses imported');
  } catch (e) {
    Logger.log('✗ Error importing forms: ' + e.toString());
  }
  
  try {
    processApprovedChores();
    Logger.log('✓ Chores processed');
  } catch (e) {
    Logger.log('✗ Error processing chores: ' + e.toString());
  }
  
  Logger.log('=== Manual run complete ===');
  SpreadsheetApp.getActiveSpreadsheet().toast('All processes completed!', '✓ Success', 3);
}

/**
 * Weekly allowance posting - runs every Monday
 */
function weeklyAllowance() {
  Logger.log('=== Starting weekly allowance ===');
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allowanceSheet = ss.getSheetByName('Allowance Rules');
  const transactionsSheet = ss.getSheetByName('Transactions');
  
  if (!allowanceSheet || !transactionsSheet) {
    Logger.log('✗ Required sheets not found');
    return;
  }
  
  // Get allowance rules (skip header row)
  const allowanceData = allowanceSheet.getRange(2, 1, allowanceSheet.getLastRow() - 1, 3).getValues();
  const today = new Date();
  
  let count = 0;
  
  allowanceData.forEach(row => {
    const kid = row[0];
    const amount = row[1];
    
    if (kid && amount > 0) {
      // Add to transactions
      transactionsSheet.appendRow([
        today,
        kid,
        'Deposit',
        'Weekly Allowance',
        amount
      ]);
      count++;
      Logger.log(`✓ Posted $${amount} allowance for ${kid}`);
    }
  });
  
  Logger.log(`=== Weekly allowance complete: ${count} kids processed ===`);
  SpreadsheetApp.flush();
}

/**
 * Test function to verify setup
 */
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const requiredSheets = ['Transactions', 'Summary', 'Dashboard', 'Chores', 'Allowance Rules'];
  const missingSheets = [];
  
  Logger.log('=== Testing setup ===');
  
  requiredSheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      Logger.log(`✓ Found sheet: ${sheetName}`);
    } else {
      Logger.log(`✗ Missing sheet: ${sheetName}`);
      missingSheets.push(sheetName);
    }
  });
  
  if (missingSheets.length === 0) {
    Logger.log('✓✓✓ All required sheets found! ✓✓✓');
    SpreadsheetApp.getActiveSpreadsheet().toast('Setup looks good!', '✓ Success', 3);
  } else {
    Logger.log(`✗✗✗ Missing ${missingSheets.length} sheets: ${missingSheets.join(', ')}`);
    SpreadsheetApp.getActiveSpreadsheet().toast(`Missing sheets: ${missingSheets.join(', ')}`, '✗ Error', 5);
  }
  
  return missingSheets.length === 0;
}

/**
 * Initialize the system with sample data
 */
function initializeWithSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transactionsSheet = ss.getSheetByName('Transactions');
  const allowanceSheet = ss.getSheetByName('Allowance Rules');
  const summarySheet = ss.getSheetByName('Summary');
  
  if (!transactionsSheet || !allowanceSheet || !summarySheet) {
    SpreadsheetApp.getUi().alert('Error: Required sheets not found. Please create them first.');
    return;
  }
  
  // Default kid names
  const kid1 = 'Martin';
  const kid2 = 'Daniel';
  
  // Add to Summary sheet
  summarySheet.appendRow([kid1, 0]);
  summarySheet.appendRow([kid2, 0]);
  
  // Add to Allowance Rules
  allowanceSheet.appendRow([kid1, 10, 'Weekly allowance']);
  allowanceSheet.appendRow([kid2, 10, 'Weekly allowance']);
  
  // Add opening balance transactions
  const today = new Date();
  transactionsSheet.appendRow([today, kid1, 'Deposit', 'Opening Balance', 0]);
  transactionsSheet.appendRow([today, kid2, 'Deposit', 'Opening Balance', 0]);
  
  SpreadsheetApp.getActiveSpreadsheet().toast(`Setup complete for ${kid1} and ${kid2}!`, '✓ Success', 3);
  Logger.log(`✓ Initialized with kids: ${kid1}, ${kid2}`);
}

/**
 * Create a custom menu in the spreadsheet
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏦 Bank Actions')
    .addItem('▶ Run All Now', 'runAllNow')
    .addItem('💰 Post Weekly Allowance', 'weeklyAllowance')
    .addSeparator()
    .addItem('📝 Process Forms', 'importFormResponses')
    .addItem('✅ Process Chores', 'processApprovedChores')
    .addSeparator()
    .addItem('⚙️ Create Triggers', 'createTriggers')
    .addItem('🔍 Test Setup', 'testSetup')
    .addItem('🚀 Initialize Sample Data', 'initializeWithSampleData')
    .addToUi();
}
