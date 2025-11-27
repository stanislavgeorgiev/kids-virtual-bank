/**
 * 📝 Form Response Importer
 * 
 * Processes Google Form responses for deposits and withdrawals.
 * Prevents duplicate imports by marking processed rows.
 */

/**
 * Import all form responses (deposits and withdrawals)
 */
function importFormResponses() {
  Logger.log('=== Starting form import ===');
  
  let depositsProcessed = importDeposits();
  let withdrawalsProcessed = importWithdrawals();
  
  Logger.log(`=== Form import complete: ${depositsProcessed} deposits, ${withdrawalsProcessed} withdrawals ===`);
}

/**
 * Import deposit form responses
 */
function importDeposits() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transactionsSheet = ss.getSheetByName('Transactions');
  
  // Find the deposit form response sheet (may be named various ways)
  const depositSheet = findSheetByPattern(['Deposit', 'deposit']);
  
  if (!depositSheet || !transactionsSheet) {
    Logger.log('✗ Deposit sheet or Transactions sheet not found');
    return 0;
  }
  
  return processFormSheet(depositSheet, transactionsSheet, 'Deposit');
}

/**
 * Import withdrawal form responses
 */
function importWithdrawals() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transactionsSheet = ss.getSheetByName('Transactions');
  
  // Find the withdrawal form response sheet
  const withdrawalSheet = findSheetByPattern(['Withdrawal', 'withdrawal', 'Withdraw']);
  
  if (!withdrawalSheet || !transactionsSheet) {
    Logger.log('✗ Withdrawal sheet or Transactions sheet not found');
    return 0;
  }
  
  return processFormSheet(withdrawalSheet, transactionsSheet, 'Withdrawal');
}

/**
 * Generic form sheet processor
 * 
 * @param {Sheet} formSheet - The form response sheet
 * @param {Sheet} transactionsSheet - The transactions sheet
 * @param {string} type - 'Deposit' or 'Withdrawal'
 * @return {number} Number of rows processed
 */
function processFormSheet(formSheet, transactionsSheet, type) {
  const lastRow = formSheet.getLastRow();
  if (lastRow < 2) {
    Logger.log(`No ${type} data to process`);
    return 0;
  }
  
  // Get all data
  const data = formSheet.getRange(1, 1, lastRow, formSheet.getLastColumn()).getValues();
  const headers = data[0];
  
  // Find or create "Imported?" column
  let importedColIndex = headers.indexOf('Imported?');
  if (importedColIndex === -1) {
    importedColIndex = headers.length;
    formSheet.getRange(1, importedColIndex + 1).setValue('Imported?');
  }
  
  // Find required columns (typical form response format)
  const timestampCol = 0; // Forms always have timestamp in column A
  const kidCol = findColumnIndex(headers, ['Kid', 'Name', 'Child']);
  const amountCol = findColumnIndex(headers, ['Amount', 'amount', 'How much']);
  const descCol = findColumnIndex(headers, ['Description', 'What for', 'Note', 'Reason']);
  
  if (kidCol === -1 || amountCol === -1) {
    Logger.log(`✗ Could not find required columns in ${type} sheet`);
    return 0;
  }
  
  let processed = 0;
  
  // Process each row (skip header)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const alreadyImported = row[importedColIndex];
    
    if (alreadyImported === 'Yes' || alreadyImported === true) {
      continue; // Skip already imported
    }
    
    const timestamp = row[timestampCol];
    const kid = row[kidCol];
    const amount = parseFloat(row[amountCol]);
    const description = row[descCol] || `${type} via form`;
    
    if (!kid || !amount || amount <= 0) {
      Logger.log(`✗ Invalid data in row ${i + 1}: kid="${kid}", amount=${amount}`);
      continue;
    }
    
    // Add to transactions
    transactionsSheet.appendRow([
      timestamp,
      kid,
      type,
      description,
      amount
    ]);
    
    // Mark as imported
    formSheet.getRange(i + 1, importedColIndex + 1).setValue('Yes');
    
    processed++;
    Logger.log(`✓ Imported ${type}: ${kid} - $${amount}`);
  }
  
  return processed;
}

/**
 * Find a sheet by pattern matching
 * 
 * @param {string[]} patterns - Array of patterns to match
 * @return {Sheet|null} The found sheet or null
 */
function findSheetByPattern(patterns) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  
  for (let sheet of sheets) {
    const name = sheet.getName();
    for (let pattern of patterns) {
      if (name.toLowerCase().includes(pattern.toLowerCase())) {
        Logger.log(`✓ Found sheet matching "${pattern}": ${name}`);
        return sheet;
      }
    }
  }
  
  Logger.log(`✗ No sheet found matching patterns: ${patterns.join(', ')}`);
  return null;
}

/**
 * Find column index by header name patterns
 * 
 * @param {string[]} headers - Array of header values
 * @param {string[]} patterns - Array of patterns to match
 * @return {number} Column index or -1 if not found
 */
function findColumnIndex(headers, patterns) {
  for (let i = 0; i < headers.length; i++) {
    const header = String(headers[i]).toLowerCase();
    for (let pattern of patterns) {
      if (header.includes(pattern.toLowerCase())) {
        return i;
      }
    }
  }
  return -1;
}
