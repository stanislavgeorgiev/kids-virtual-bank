/**
 * ✅ Chores Processor
 * 
 * Processes approved chores and posts them as deposits.
 * Marks processed chores to prevent duplicates.
 */

/**
 * Process all approved chores
 */
function processApprovedChores() {
  Logger.log('=== Starting chore processing ===');
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const choresSheet = ss.getSheetByName('Chores');
  const transactionsSheet = ss.getSheetByName('Transactions');
  
  if (!choresSheet || !transactionsSheet) {
    Logger.log('✗ Chores or Transactions sheet not found');
    return 0;
  }
  
  const lastRow = choresSheet.getLastRow();
  if (lastRow < 2) {
    Logger.log('No chores to process');
    return 0;
  }
  
  // Get all chore data
  const data = choresSheet.getRange(2, 1, lastRow - 1, 6).getValues();
  let processed = 0;
  
  // Process each row
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const timestamp = row[0];
    const kid = row[1];
    const chore = row[2];
    const value = parseFloat(row[3]);
    const approved = row[4];
    const posted = row[5];
    
    // Check if approved but not yet posted
    if ((approved === 'Yes' || approved === true) && posted !== 'Yes' && posted !== true) {
      
      if (!kid || !value || value <= 0) {
        Logger.log(`✗ Invalid chore data in row ${i + 2}: kid="${kid}", value=${value}`);
        continue;
      }
      
      // Add to transactions
      transactionsSheet.appendRow([
        timestamp || new Date(),
        kid,
        'Deposit',
        `Chore: ${chore}`,
        value
      ]);
      
      // Mark as posted
      choresSheet.getRange(i + 2, 6).setValue('Yes');
      
      processed++;
      Logger.log(`✓ Posted chore: ${kid} - ${chore} - $${value}`);
    }
  }
  
  Logger.log(`=== Chore processing complete: ${processed} chores posted ===`);
  return processed;
}

/**
 * Import chores from form responses (similar to form import)
 */
function importChoreFormResponses() {
  Logger.log('=== Starting chore form import ===');
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const choresSheet = ss.getSheetByName('Chores');
  
  // Find the chores form response sheet
  const choresFormSheet = findSheetByPattern(['Chore', 'chore']);
  
  if (!choresFormSheet || !choresSheet || choresFormSheet.getName() === 'Chores') {
    Logger.log('✗ Chores form response sheet not found (or found Chores sheet itself)');
    return 0;
  }
  
  const lastRow = choresFormSheet.getLastRow();
  if (lastRow < 2) {
    Logger.log('No chore form responses to process');
    return 0;
  }
  
  const data = choresFormSheet.getRange(1, 1, lastRow, choresFormSheet.getLastColumn()).getValues();
  const headers = data[0];
  
  // Find or create "Imported?" column
  let importedColIndex = headers.indexOf('Imported?');
  if (importedColIndex === -1) {
    importedColIndex = headers.length;
    choresFormSheet.getRange(1, importedColIndex + 1).setValue('Imported?');
  }
  
  // Find required columns
  const timestampCol = 0;
  const kidCol = findColumnIndex(headers, ['Kid', 'Name', 'Child']);
  const choreCol = findColumnIndex(headers, ['Chore', 'Task', 'What did you do']);
  const valueCol = findColumnIndex(headers, ['Value', 'Points', 'Amount', 'How much']);
  
  if (kidCol === -1 || choreCol === -1) {
    Logger.log('✗ Could not find required columns in chores form sheet');
    return 0;
  }
  
  let processed = 0;
  
  // Process each row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const alreadyImported = row[importedColIndex];
    
    if (alreadyImported === 'Yes' || alreadyImported === true) {
      continue;
    }
    
    const timestamp = row[timestampCol];
    const kid = row[kidCol];
    const chore = row[choreCol];
    const value = valueCol !== -1 ? parseFloat(row[valueCol]) : 5.00; // Default value if not specified
    
    if (!kid || !chore) {
      Logger.log(`✗ Invalid chore data in row ${i + 1}`);
      continue;
    }
    
    // Add to Chores sheet (awaiting approval)
    choresSheet.appendRow([
      timestamp,
      kid,
      chore,
      value,
      'No', // Approved?
      ''    // Posted?
    ]);
    
    // Mark form response as imported
    choresFormSheet.getRange(i + 1, importedColIndex + 1).setValue('Yes');
    
    processed++;
    Logger.log(`✓ Imported chore request: ${kid} - ${chore}`);
  }
  
  Logger.log(`=== Chore form import complete: ${processed} chores imported ===`);
  return processed;
}
