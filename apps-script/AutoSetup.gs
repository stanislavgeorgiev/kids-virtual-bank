/**
 * 🚀 AUTOMATIC SETUP SCRIPT
 * 
 * This script automatically creates and configures your entire Kids Virtual Bank system.
 * 
 * INSTRUCTIONS:
 * 1. Create a new Google Spreadsheet
 * 2. Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste this ENTIRE file
 * 5. Click Save (disk icon)
 * 6. Select "setupCompleteSystem" from function dropdown
 * 7. Click Run (▶️)
 * 8. Authorize when prompted
 * 9. Wait 10-30 seconds
 * 10. Check your spreadsheet - everything is ready!
 */

/**
 * MAIN SETUP FUNCTION - Run this once
 */
function setupCompleteSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  // Ask for number of kids
  const numKidsResponse = ui.prompt(
    'Kids Virtual Bank Setup',
    'How many kids do you want to set up? (2-10)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (numKidsResponse.getSelectedButton() !== ui.Button.OK) {
    showToast('Setup cancelled', 'Setup was cancelled by user', 3);
    return;
  }
  
  const numKids = parseInt(numKidsResponse.getResponseText());
  if (isNaN(numKids) || numKids < 2 || numKids > 10) {
    ui.alert('Invalid Input', 'Please enter a number between 2 and 10', ui.ButtonSet.OK);
    return;
  }
  
  // Ask for each kid's name
  const kidNames = [];
  for (let i = 1; i <= numKids; i++) {
    const nameResponse = ui.prompt(
      'Kids Virtual Bank Setup',
      `Enter name for kid #${i}:`,
      ui.ButtonSet.OK_CANCEL
    );
    
    if (nameResponse.getSelectedButton() !== ui.Button.OK) {
      showToast('Setup cancelled', 'Setup was cancelled by user', 3);
      return;
    }
    
    const name = nameResponse.getResponseText().trim();
    if (!name) {
      ui.alert('Invalid Input', 'Name cannot be empty', ui.ButtonSet.OK);
      return;
    }
    
    kidNames.push(name);
  }
  
  Logger.log('🚀 Starting Kids Virtual Bank Setup for: ' + kidNames.join(', '));
  showToast('Starting setup...', 'Setting up for ' + kidNames.length + ' kids', 30);
  
  try {
    // Step 1: Delete default sheets if they exist
    deleteDefaultSheets();
    
    // Step 2: Create all required sheets
    createAllSheets(kidNames);
    
    // Step 3: Set up each sheet with headers and formatting
    setupTransactionsSheet();
    setupSummarySheet(kidNames);
    setupDashboardSheet(kidNames);
    setupChoresSheet();
    setupAllowanceRulesSheet(kidNames);
    
/**
 * Create all required sheets
 */
function createAllSheets(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const requiredSheets = [
    'Transactions',
    'Summary', 
    'Dashboard',
    'Chores',
    'Allowance Rules'
  ];
  
  // Add ledger sheet for each kid
  kidNames.forEach(name => {
    requiredSheets.push(name + ' Ledger');
  });
  
  requiredSheets.forEach(name => {
    if (!ss.getSheetByName(name)) {
      ss.insertSheet(name);
      Logger.log('Created: ' + name);
    }
  });
  
  // Delete any remaining default sheets
  const sheets = ss.getSheets();
  sheets.forEach(sheet => {
    const name = sheet.getName();
    if (name.match(/^Sheet\d+$/)) {
      ss.deleteSheet(sheet);
    }
  });
} const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  
  // Keep at least one sheet (will delete later if needed)
  if (sheets.length === 1) return;
  
  sheets.forEach(sheet => {
    const name = sheet.getName();
    if (name.match(/^Sheet\d+$/)) {
      ss.deleteSheet(sheet);
      Logger.log('Deleted: ' + name);
    }
  });
}

/**
 * Create all required sheets
 */
function createAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const requiredSheets = [
    'Transactions',
    'Summary', 
    'Dashboard',
    'Chores',
    'Allowance Rules',
    'Martin Ledger',
    'Daniel Ledger'
  ];
  
  requiredSheets.forEach(name => {
    if (!ss.getSheetByName(name)) {
      ss.insertSheet(name);
/**
 * Setup Summary Sheet
 */
function setupSummarySheet(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Summary');
  
  sheet.clear();
  
  // Headers
  sheet.getRange('A1').setValue('Kid');
  sheet.getRange('B1').setValue('Current Balance');
  
  // Kid names and formulas
  kidNames.forEach((name, index) => {
    const row = index + 2;
    sheet.getRange(row, 1).setValue(name);
    sheet.getRange(row, 2).setFormula('=SUMIF(Transactions!$B:$B,A' + row + ',Transactions!$E:$E)');
  });
  
  // Format headers
  sheet.getRange(1, 1, 1, 2)
    .setFontWeight('bold')
    .setBackground('#34a853')
    .setFontColor('#ffffff');
  
  // Format currency
  sheet.getRange(2, 2, kidNames.length, 1).setNumberFormat('$#,##0.00');
  
  // Set column widths
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 150);
  
  Logger.log('✓ Summary sheet configured');
} sheet.setColumnWidth(1, 100); // Date
  sheet.setColumnWidth(2, 100); // Kid
  sheet.setColumnWidth(3, 100); // Type
/**
 * Setup Dashboard Sheet
 */
function setupDashboardSheet(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Dashboard');
  
  sheet.clear();
  
  // Title
  sheet.getRange('A1').setValue('🏦 Kids Virtual Bank Dashboard');
  sheet.getRange('A1')
    .setFontSize(18)
    .setFontWeight('bold')
    .setBackground('#fbbc04')
    .setFontColor('#000000');
  sheet.setRowHeight(1, 40);
  
  // Balance summary header
  sheet.getRange('A3:C3').setValues([['Kid', 'Balance', 'Last Activity']]);
  sheet.getRange('A3:C3')
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('#ffffff');
  
  // Kids data and formulas
  kidNames.forEach((name, index) => {
    const row = index + 4;
    sheet.getRange(row, 1).setValue(name);
    sheet.getRange(row, 2).setFormula('=VLOOKUP(A' + row + ',Summary!A:B,2,FALSE)');
    sheet.getRange(row, 3).setFormula('=QUERY(Transactions!A:B,"SELECT MAX(A) WHERE B=\'"&A' + row + '&"\' LABEL MAX(A) \'\'",0)');
  });
  
  // Recent transactions section (starts after kid rows + 1 blank row)
  const recentTxRow = 4 + kidNames.length + 2;
  sheet.getRange(recentTxRow, 1).setValue('Recent Transactions (Last 10)');
  sheet.getRange(recentTxRow, 1)
    .setFontWeight('bold')
    .setFontSize(12)
    .setBackground('#34a853')
    .setFontColor('#ffffff');
  
  sheet.getRange(recentTxRow + 1, 1).setFormula('=QUERY(Transactions!A:E,"SELECT A,B,C,D,E ORDER BY A DESC LIMIT 10",1)');
  
  // Format currency
  sheet.getRange(4, 2, kidNames.length, 1).setNumberFormat('$#,##0.00');
  
  // Set column widths
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  
  Logger.log('✓ Dashboard sheet configured');
} // Title
  sheet.getRange('A1').setValue('🏦 Kids Virtual Bank Dashboard');
  sheet.getRange('A1')
    .setFontSize(18)
    .setFontWeight('bold')
    .setBackground('#fbbc04')
    .setFontColor('#000000');
  sheet.setRowHeight(1, 40);
  
  // Balance summary header
  sheet.getRange('A3:C3').setValues([['Kid', 'Balance', 'Last Activity']]);
  sheet.getRange('A3:C3')
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('#ffffff');
  
  // Kids data
  sheet.getRange('A4').setValue('Martin');
  sheet.getRange('A5').setValue('Daniel');
  
  // Balance formulas
  sheet.getRange('B4').setFormula('=VLOOKUP(A4,Summary!A:B,2,FALSE)');
  sheet.getRange('B5').setFormula('=VLOOKUP(A5,Summary!A:B,2,FALSE)');
  
  // Last activity formulas
  sheet.getRange('C4').setFormula('=QUERY(Transactions!A:B,"SELECT MAX(A) WHERE B=\'"&A4&"\' LABEL MAX(A) \'\'",0)');
  sheet.getRange('C5').setFormula('=QUERY(Transactions!A:B,"SELECT MAX(A) WHERE B=\'"&A5&"\' LABEL MAX(A) \'\'",0)');
  
  // Recent transactions section
  sheet.getRange('A8').setValue('Recent Transactions (Last 10)');
  sheet.getRange('A8')
    .setFontWeight('bold')
    .setFontSize(12)
    .setBackground('#34a853')
    .setFontColor('#ffffff');
  
  sheet.getRange('A9').setFormula('=QUERY(Transactions!A:E,"SELECT A,B,C,D,E ORDER BY A DESC LIMIT 10",1)');
  
  // Format currency
  sheet.getRange('B4:B5').setNumberFormat('$#,##0.00');
  
  // Set column widths
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  
  Logger.log('✓ Dashboard sheet configured');
}

/**
 * Setup Chores Sheet
 */
function setupChoresSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Chores');
  
  sheet.clear();
  
  // Headers
  const headers = [['Timestamp', 'Kid', 'Chore', 'Value', 'Approved?', 'Posted?']];
  sheet.getRange(1, 1, 1, 6).setValues(headers);
  
  // Format headers
  sheet.getRange(1, 1, 1, 6)
    .setFontWeight('bold')
    .setBackground('#ea4335')
    .setFontColor('#ffffff');
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 100); // Kid
  sheet.setColumnWidth(3, 200); // Chore
  sheet.setColumnWidth(4, 100); // Value
  sheet.setColumnWidth(5, 100); // Approved?
  sheet.setColumnWidth(6, 100); // Posted?
  
  // Freeze header
  sheet.setFrozenRows(1);
  
  // Add data validation for Approved column
  const approvedRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Yes', 'No'])
    .setAllowInvalid(false)
    .build();
  sheet.getRange('E2:E1000').setDataValidation(approvedRule);
  
  Logger.log('✓ Chores sheet configured');
}

/**
/**
 * Setup Allowance Rules Sheet
 */
function setupAllowanceRulesSheet(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Allowance Rules');
  
  sheet.clear();
  
  // Headers
  sheet.getRange('A1:C1').setValues([['Kid', 'Weekly Allowance', 'Notes']]);
  sheet.getRange('A1:C1')
    .setFontWeight('bold')
    .setBackground('#9c27b0')
    .setFontColor('#ffffff');
  
  // Default data for each kid
  const today = new Date().toLocaleDateString();
  kidNames.forEach((name, index) => {
    const row = index + 2;
    sheet.getRange(row, 1, 1, 3).setValues([[name, 10.00, 'Started ' + today]]);
  });
  
  // Format currency
  sheet.getRange(2, 2, kidNames.length, 1).setNumberFormat('$#,##0.00');
  
  // Set column widths
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 250);
  
  Logger.log('✓ Allowance Rules sheet configured');
/**
 * Setup Kid Ledger (generic function for any kid)
 */
function setupKidLedger(kidName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = kidName + ' Ledger';
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    Logger.log('✗ Sheet not found: ' + sheetName);
    return;
  }
  
  sheet.clear();
  
  // Headers
  sheet.getRange('A1:E1').setValues([['Date', 'Type', 'Description', 'Amount', 'Balance']]);
  
  // Rotating colors for different kids
  const colors = ['#4285f4', '#34a853', '#fbbc04', '#ea4335', '#9c27b0', '#00bcd4', '#ff9800', '#795548', '#607d8b', '#e91e63'];
  const colorIndex = Math.abs(hashCode(kidName)) % colors.length;
  
  sheet.getRange('A1:E1')
    .setFontWeight('bold')
    .setBackground(colors[colorIndex])
    .setFontColor('#ffffff');
  
  // Formula to pull transactions for this kid
  sheet.getRange('A2').setFormula('=QUERY(Transactions!A:F,"SELECT A,C,D,E,F WHERE B=\'' + kidName + '\' ORDER BY A",0)');
  
  // Format currency
  sheet.getRange('D:E').setNumberFormat('$#,##0.00');
  
  // Set column widths
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 100);
  
  sheet.setFrozenRows(1);
  
  Logger.log('✓ ' + sheetName + ' configured');
}

/**
 * Simple hash function for string (for color selection)
 */
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
} Logger.log('✓ Daniel Ledger configured');
}

/**
 * Add sample data to demonstrate the system
 */
function addSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Transactions');
  
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
/**
 * Add sample data to demonstrate the system
 */
function addSampleData(kidNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Transactions');
  
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Sample transactions for each kid
  const sampleData = [];
  const startingBalances = [100, 75, 50, 60, 80, 90, 70, 85, 95, 65]; // Different starting amounts
  
  kidNames.forEach((name, index) => {
    const balance = startingBalances[index % startingBalances.length];
    sampleData.push([today, name, 'Deposit', 'Opening Balance', balance, balance]);
    sampleData.push([lastWeek, name, 'Deposit', 'Weekly Allowance', 10.00, balance + 10.00]);
  });
  
  if (sampleData.length > 0) {
    sheet.getRange(2, 1, sampleData.length, 6).setValues(sampleData);
    
    // Format dates and currency
    sheet.getRange(2, 1, sampleData.length, 1).setNumberFormat('yyyy-mm-dd');
    sheet.getRange(2, 5, sampleData.length, 2).setNumberFormat('$#,##0.00');
  }
  
  Logger.log('✓ Sample data added for ' + kidNames.length + ' kids');
} const transSheet = ss.getSheetByName('Transactions');
  transSheet.getRange('A:A').setNumberFormat('yyyy-mm-dd');
  transSheet.getRange('E:F').setNumberFormat('$#,##0.00');
  
  // Add conditional formatting for transaction types
  const depositRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Deposit')
    .setBackground('#d9ead3')
    .setRanges([transSheet.getRange('C:C')])
    .build();
  
  const withdrawalRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Withdrawal')
    .setBackground('#f4cccc')
    .setRanges([transSheet.getRange('C:C')])
    .build();
  
  transSheet.setConditionalFormatRules([depositRule, withdrawalRule]);
  
  // Chores sheet - highlight approved
  const choresSheet = ss.getSheetByName('Chores');
  const approvedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Yes')
    .setBackground('#b6d7a8')
    .setRanges([choresSheet.getRange('E:E')])
    .build();
  
  choresSheet.setConditionalFormatRules([approvedRule]);
  
  Logger.log('✓ Formatting applied');
}

/**
 * Show next steps dialog
 */
function showNextSteps() {
  const html = `
/**
 * Show next steps dialog
 */
function showNextSteps(kidNames) {
  const kidList = kidNames.map(name => '<li>' + name + '</li>').join('');
  
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4285f4;">🎉 Setup Complete!</h2>
        <p><strong>Your Kids Virtual Bank is ready for ${kidNames.length} kids!</strong></p>
        
        <div style="background: #e8f0fe; padding: 10px; margin: 10px 0; border-radius: 4px;">
          <strong>Kids configured:</strong>
          <ul style="margin: 5px 0;">
            ${kidList}
          </ul>
        </div>
        
        <h3>📋 Next Steps:</h3>
        <ol>
          <li><strong>Review the sheets</strong> - Check Dashboard, Summary, and Transactions</li>
          <li><strong>Create Google Forms</strong> - Add these names as options:
            <ul>
              <li><strong>Deposit Form</strong> (for parents)</li>
              <li><strong>Withdrawal Form</strong> (for kids)</li>
              <li><strong>Chores Form</strong> (for kids)</li>
            </ul>
            Use these names in dropdowns: <strong>${kidNames.join(', ')}</strong>
          </li>
          <li><strong>Add remaining scripts</strong> - Copy these files:
            <ul>
              <li>Code.gs (main automation)</li>
              <li>forms.gs (form processing)</li>
              <li>chores.gs (chore processing)</li>
              <li>triggers.gs (automation triggers)</li>
            </ul>
          </li>
          <li><strong>Create triggers</strong> - Run createTriggers() from Code.gs</li>
          <li><strong>Test the system</strong> - Submit forms and verify automation</li>
        </ol>
        
        <h3>📚 Documentation:</h3>
        <ul>
          <li><strong>QUICK-START.md</strong> - 5-minute guide</li>
          <li><strong>forms/</strong> - Form creation guides</li>
          <li><strong>TROUBLESHOOTING.md</strong> - Common issues</li>
        </ul>
        
        <p><strong>Current Status:</strong></p>
        <ul>
          <li>✅ ${kidNames.length} kid ledger sheets created</li>
          <li>✅ All formulas configured</li>
          <li>✅ Sample data added</li>
          <li>⏳ Forms needed (create next)</li>
          <li>⏳ Automation scripts needed (add next)</li>
        </ul>
        
        <p style="margin-top: 20px; padding: 10px; background: #e8f0fe; border-left: 4px solid #4285f4;">
          <strong>Tip:</strong> Check the Dashboard tab to see your system in action!
        </p>
        
        <button onclick="google.script.host.close()" style="margin-top: 20px; padding: 10px 20px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Got it!
        </button>
      </body>
    </html>
  `;
  
  const htmlOutput = HtmlService.createHtmlOutput(html)
    .setWidth(550)
    .setHeight(650);
  
/**
 * Test function to verify everything works
 */
function testSystemSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const sheetNames = sheets.map(sheet => sheet.getName());
  
  const requiredSheets = [
    'Transactions',
    'Summary',
    'Dashboard',
    'Chores',
    'Allowance Rules'
  ];
  
  Logger.log('=== Testing System Setup ===');
  
  let allGood = true;
  let ledgerCount = 0;
  
  // Check required sheets
  requiredSheets.forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      Logger.log('✓ Found: ' + name);
    } else {
      Logger.log('✗ Missing: ' + name);
      allGood = false;
    }
  });
  
  // Count ledger sheets
  sheetNames.forEach(name => {
    if (name.endsWith(' Ledger')) {
      ledgerCount++;
      Logger.log('✓ Found ledger: ' + name);
    }
  });
  
  Logger.log('Found ' + ledgerCount + ' kid ledger sheet(s)');
  
  if (allGood && ledgerCount > 0) {
    showToast('Test Passed', 'All sheets exist! ' + ledgerCount + ' kids configured ✓', 3);
    Logger.log('=== Test PASSED ===');
  } else {
    showToast('Test Failed', 'Some sheets missing or no kids configured', 5);
    Logger.log('=== Test FAILED ===');
  }
  
  return allGood && ledgerCount > 0;
}   showToast('Test Failed', 'Some sheets missing', 5);
    Logger.log('=== Test FAILED ===');
  }
  
  return allGood;
}

/**
 * Create custom menu (runs automatically when spreadsheet opens)
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 Setup')
    .addItem('⚡ Run Complete Setup', 'setupCompleteSystem')
    .addItem('🧪 Test Setup', 'testSystemSetup')
    .addSeparator()
    .addItem('📖 Show Next Steps', 'showNextSteps')
    .addToUi();
}
