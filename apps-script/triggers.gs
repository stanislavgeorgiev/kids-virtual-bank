/**
 * ⏰ Trigger Management
 * 
 * Creates and manages automatic triggers for the Kids Virtual Bank system.
 */

/**
 * Create all required triggers
 * Run this once to set up automation
 */
function createTriggers() {
  // First, delete any existing triggers to avoid duplicates
  deleteTriggers();
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create time-based trigger: Every 5 minutes for form processing
  ScriptApp.newTrigger('importFormResponses')
    .timeBased()
    .everyMinutes(5)
    .create();
  Logger.log('✓ Created trigger: Form import every 5 minutes');
  
  // Create time-based trigger: Every 5 minutes for chore processing
  ScriptApp.newTrigger('processApprovedChores')
    .timeBased()
    .everyMinutes(5)
    .create();
  Logger.log('✓ Created trigger: Chore processing every 5 minutes');
  
  // Create time-based trigger: Weekly allowance every Monday at 8 AM
  ScriptApp.newTrigger('weeklyAllowance')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(8)
    .create();
  Logger.log('✓ Created trigger: Weekly allowance every Monday at 8 AM');
  
  // Optional: Import chore form responses every 5 minutes
  ScriptApp.newTrigger('importChoreFormResponses')
    .timeBased()
    .everyMinutes(5)
    .create();
  Logger.log('✓ Created trigger: Chore form import every 5 minutes');
  
  SpreadsheetApp.getActiveSpreadsheet().toast('All triggers created successfully!', '✓ Success', 3);
  Logger.log('=== All triggers created ===');
}

/**
 * Delete all existing triggers
 */
function deleteTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  
  triggers.forEach(trigger => {
    ScriptApp.deleteTrigger(trigger);
  });
  
  Logger.log(`✓ Deleted ${triggers.length} existing triggers`);
}

/**
 * List all current triggers
 */
function listTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  
  Logger.log('=== Current Triggers ===');
  
  if (triggers.length === 0) {
    Logger.log('No triggers found');
    SpreadsheetApp.getActiveSpreadsheet().toast('No triggers found. Run createTriggers() to set them up.', 'ℹ Info', 4);
    return;
  }
  
  triggers.forEach((trigger, index) => {
    const handlerFunction = trigger.getHandlerFunction();
    const eventType = trigger.getEventType();
    
    Logger.log(`${index + 1}. Function: ${handlerFunction}, Type: ${eventType}`);
    
    if (eventType === ScriptApp.EventType.CLOCK) {
      // It's a time-based trigger
      Logger.log(`   (Time-based trigger)`);
    }
  });
  
  Logger.log(`=== Total: ${triggers.length} triggers ===`);
  SpreadsheetApp.getActiveSpreadsheet().toast(`Found ${triggers.length} active triggers. Check logs for details.`, 'ℹ Info', 3);
}

/**
 * Create a custom trigger for testing (runs every minute for 10 minutes)
 */
function createTestTrigger() {
  deleteTriggers();
  
  // Create a trigger that runs every minute (for testing only)
  ScriptApp.newTrigger('runAllNow')
    .timeBased()
    .everyMinutes(1)
    .create();
  
  Logger.log('✓ Created test trigger: Runs every 1 minute');
  SpreadsheetApp.getActiveSpreadsheet().toast('Test trigger created! Runs every minute. Delete it when done testing.', '⚠ Warning', 5);
}

/**
 * Create production triggers with different schedule
 * 
 * Alternative schedule options:
 * - Forms/Chores: Every 10 minutes instead of 5
 * - Allowance: Different day/time
 */
function createProductionTriggers() {
  deleteTriggers();
  
  // Every 10 minutes for forms
  ScriptApp.newTrigger('importFormResponses')
    .timeBased()
    .everyMinutes(10)
    .create();
  
  // Every 10 minutes for chores
  ScriptApp.newTrigger('processApprovedChores')
    .timeBased()
    .everyMinutes(10)
    .create();
  
  // Every 10 minutes for chore form import
  ScriptApp.newTrigger('importChoreFormResponses')
    .timeBased()
    .everyMinutes(10)
    .create();
  
  // Sunday evening at 8 PM for allowance (instead of Monday morning)
  ScriptApp.newTrigger('weeklyAllowance')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(20)
    .create();
  
  Logger.log('✓ Created production triggers');
  SpreadsheetApp.getActiveSpreadsheet().toast('Production triggers created!', '✓ Success', 3);
}

/**
 * Disable all triggers (without deleting them)
 * Note: Apps Script doesn't support disabling, so this deletes them
 */
function disableTriggers() {
  deleteTriggers();
  SpreadsheetApp.getActiveSpreadsheet().toast('All triggers disabled (deleted).', 'ℹ Info', 3);
}
