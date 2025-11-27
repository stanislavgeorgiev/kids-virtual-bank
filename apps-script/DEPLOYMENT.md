# 📝 Apps Script Deployment Guide

## Overview
This guide covers how to deploy and manage your Apps Script code for the Kids Virtual Bank.

---

## Quick Deployment (Recommended)

**Use the automated setup scripts for fastest deployment:**

### Step 1: Run AutoSetup.gs
1. Create blank Google Spreadsheet
2. Extensions → Apps Script
3. Copy/paste `AutoSetup.gs`
4. Run `setupCompleteSystem()`
5. Enter kid count and names
6. ✅ All sheets and structure created!

### Step 2: Add setupForms.gs
1. Create new script file: `setupForms`
2. Copy/paste `setupForms.gs`
3. Run `createAllForms()`
4. ✅ All 3 forms created and linked!

### Step 3: Add Operational Scripts
1. Create script files: `Code`, `forms`, `chores`, `triggers`
2. Copy/paste code from each `.gs` file
3. Run `createTriggers()`
4. ✅ Automation enabled!

**Total time: 5-10 minutes**

See [SETUP.md](../SETUP.md) for detailed instructions.

---

## Manual Deployment (Advanced)

**Only use if you need deep customization or understanding.**

### Step 1: Copy Script Files Manually
1. Open your Google Spreadsheet
2. Go to **Extensions** → **Apps Script**
3. Create script files for all 6 scripts:
   - `AutoSetup.gs` (one-time setup)
   - `setupForms.gs` (one-time form creation)
   - `Code.gs` (operational)
   - `forms.gs` (operational)
   - `chores.gs` (operational)
   - `triggers.gs` (operational)
4. Copy the code from the `/apps-script/` folder into each file
5. Save all files (File → Save All)

### Step 2: Project Settings
1. Click the gear icon (⚙️) on the left sidebar
2. Check the project name: "Kids Virtual Bank"
3. Note the Script ID (you may need this later)

### Step 3: First Run Authorization
1. Select `setupCompleteSystem` from the function dropdown
2. Click Run (▶️)
3. Click "Review permissions"
4. Choose your Google account
5. Click "Advanced" → "Go to [Project Name] (unsafe)"
6. Click "Allow"
7. Answer prompts for kid setup
8. Check spreadsheet - all sheets should be created!

---

## Understanding the Scripts

### AutoSetup.gs - One-Time Setup (Run Once)
**Functions:**
- `setupCompleteSystem()` - Main entry point, creates all sheets
- `createAllSheets()` - Creates sheet structure
- `setupKidLedger()` - Creates individual kid ledger
- `addSampleData()` - Adds initial balances

**When to use:**
- First-time setup only
- Re-running to add/change kids
- Can be deleted after setup

### setupForms.gs - One-Time Form Creation (Run Once)
**Functions:**
- `createAllForms()` - Creates all 3 forms automatically
- `createDepositForm()` - Creates deposit form
- `createWithdrawalForm()` - Creates withdrawal form
- `createChoresForm()` - Creates chores form with pre-populated chore list
- `getKidNames()` - Reads kid names from Summary sheet

**When to use:**
- After AutoSetup completes
- To recreate forms if needed
- Can be deleted after setup

### Code.gs - Main Controller (Keep Forever)
**Functions:**
- `runAllNow()` - Manual execution of all processes
- `weeklyAllowance()` - Posts weekly allowances
- `testSetup()` - Verifies all sheets exist
- `initializeWithSampleData()` - Sets up initial data
- `onOpen()` - Creates custom menu

**When to use:**
- Run `testSetup()` first to verify setup
- Use `runAllNow()` to manually trigger all automation
- `onOpen()` runs automatically when spreadsheet opens

### forms.gs - Form Response Handler (Keep Forever)
**Functions:**
- `importFormResponses()` - Main entry point
- `importDeposits()` - Processes deposit forms
- `importWithdrawals()` - Processes withdrawal forms
- `processFormSheet()` - Generic processor
- `findSheetByPattern()` - Finds form response sheets
- `findColumnIndex()` - Locates columns by header name

**How it works:**
- Finds form response sheets automatically
- Marks imported rows to prevent duplicates
- Flexible column matching (works with different form structures)

### chores.gs - Chore Processing
**Functions:**
- `processApprovedChores()` - Posts approved chores as deposits
- `importChoreFormResponses()` - Imports chore form submissions

**Workflow:**
1. Form submissions → Chores sheet (Approved? = No)
2. Parent changes Approved? to Yes
3. Script posts to Transactions
4. Marks Posted? as Yes

### triggers.gs - Automation Management
**Functions:**
- `createTriggers()` - Sets up all automation
- `deleteTriggers()` - Removes all triggers
- `listTriggers()` - Shows current triggers
- `createTestTrigger()` - Testing version (runs every minute)
- `createProductionTriggers()` - Alternative schedule

**Trigger Schedule:**
- Form imports: Every 5 minutes
- Chore processing: Every 5 minutes
- Weekly allowance: Mondays at 8 AM

---

## Managing Triggers

### View Current Triggers
1. Apps Script editor → Click clock icon (⏰)
2. See all active triggers
3. Check execution history

### Create Triggers
**Method 1: Using Menu**
- Spreadsheet → 🏦 Bank Actions → ⚙️ Create Triggers

**Method 2: Manual**
- Apps Script → Select `createTriggers` → Run

### Delete All Triggers
**Method 1: Manual Selection**
- Apps Script → Triggers (clock icon)
- Click three dots on each trigger → Delete

**Method 2: Using Function**
- Apps Script → Select `deleteTriggers` → Run

### Modify Trigger Schedule
Edit `triggers.gs`:
```javascript
// Change from every 5 minutes to every 10 minutes
ScriptApp.newTrigger('importFormResponses')
  .timeBased()
  .everyMinutes(10)  // Changed from 5
  .create();

// Change allowance from Monday 8 AM to Sunday 8 PM
ScriptApp.newTrigger('weeklyAllowance')
  .timeBased()
  .onWeekDay(ScriptApp.WeekDay.SUNDAY)  // Changed from MONDAY
  .atHour(20)  // Changed from 8
  .create();
```

Then run `createTriggers()` again.

---

## Testing

### Test Individual Functions

**Test Setup:**
```javascript
function testSetup() {
  // Verifies all required sheets exist
}
```
Run this first after setup.

**Test Form Import:**
```javascript
function testFormImport() {
  importFormResponses();
  Logger.log('Check logs for results');
}
```

**Test Chore Processing:**
```javascript
function testChoreProcessing() {
  processApprovedChores();
  Logger.log('Check Transactions sheet');
}
```

**Test Allowance:**
```javascript
function testAllowance() {
  weeklyAllowance();
  Logger.log('Check Transactions sheet for allowances');
}
```

### Check Logs
1. Apps Script editor
2. View → Logs (or Ctrl+Enter)
3. Review output from function execution

### Check Execution History
1. Apps Script editor
2. Click clock icon (⏰)
3. View past executions
4. Click on execution to see logs
5. Check for errors (red X)

---

## Error Handling

### Common Errors

**Error: "Sheet not found"**
- Verify sheet names match exactly
- Check for typos
- Run `testSetup()` to identify missing sheets

**Error: "Cannot read property"**
- Form response sheet might not exist yet
- Submit a test form to create the sheet
- Check column headers match expected names

**Error: "Service invoked too many times"**
- Hit Google's quota limit (rare)
- Reduce trigger frequency
- Check for infinite loops

**Error: "Authorization required"**
- Re-authorize the script
- Run any function and go through auth flow
- Check script permissions

### Debugging Tips

**Add logging:**
```javascript
function myFunction() {
  Logger.log('Starting function');
  // your code
  Logger.log('Variable value: ' + myVariable);
  // more code
  Logger.log('Function complete');
}
```

**Test with small data:**
- Create test transactions
- Submit test forms
- Verify each step works

**Run manually:**
- Use `runAllNow()` instead of waiting for triggers
- Immediate feedback
- Easier debugging

---

## Performance Optimization

### Reduce API Calls
**Bad:**
```javascript
for (let i = 0; i < data.length; i++) {
  sheet.getRange(i, 1).setValue(data[i]);  // Many API calls
}
```

**Good:**
```javascript
sheet.getRange(1, 1, data.length, 1).setValues(data);  // One API call
```

### Batch Operations
The scripts already use batch operations where possible:
- Read all data at once
- Process in memory
- Write all at once

### Minimize Spreadsheet Reads
- Cache data when possible
- Read ranges instead of individual cells
- Use `getValues()` instead of multiple `getValue()` calls

---

## Maintenance

### Regular Tasks

**Weekly:**
- Check trigger execution history
- Review error logs (if any)
- Verify automation is running

**Monthly:**
- Review execution quota usage
- Check for script updates/improvements
- Backup script code

**As Needed:**
- Update kid names in validation
- Adjust chore values
- Modify trigger schedules
- Add new features

### Backups

**Script Backup:**
1. Apps Script editor
2. File → Make a copy
3. Name: "Kids Virtual Bank - Backup [Date]"
4. Keep in Google Drive

**Version History:**
- Apps Script automatically tracks versions
- Click clock icon (🕐) on left to see history
- Revert if needed

---

## Advanced Features

### Add Email Notifications

```javascript
function notifyLargeWithdrawal(kid, amount) {
  if (amount > 20) {
    MailApp.sendEmail({
      to: 'parent@example.com',
      subject: 'Large Withdrawal Alert',
      body: `${kid} withdrew $${amount}`
    });
  }
}
```

Add this to the withdrawal processing function.

### Add Balance Checks

```javascript
function checkBalance(kid, amount) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const summarySheet = ss.getSheetByName('Summary');
  const data = summarySheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === kid) {
      const balance = data[i][1];
      if (amount > balance) {
        throw new Error(`Insufficient funds: ${kid} has $${balance}`);
      }
    }
  }
}
```

### Add Transaction Limits

```javascript
function checkDailyLimit(kid, amount) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet = ss.getSheetByName('Transactions');
  const data = transSheet.getDataRange().getValues();
  
  let dailyTotal = 0;
  for (let i = 1; i < data.length; i++) {
    const date = new Date(data[i][0]);
    date.setHours(0, 0, 0, 0);
    
    if (data[i][1] === kid && 
        data[i][2] === 'Withdrawal' && 
        date.getTime() === today.getTime()) {
      dailyTotal += data[i][4];
    }
  }
  
  if (dailyTotal + amount > 20) {
    throw new Error(`Daily limit exceeded: ${kid} already withdrew $${dailyTotal} today`);
  }
}
```

---

## Quota Limits

### Google Apps Script Limits (Free Account)

**Time-driven triggers:**
- 90 min/day total runtime
- Shouldn't be an issue for this project

**MailApp calls:**
- 100 emails/day (if using notifications)

**Script runtime:**
- 6 minutes maximum per execution

**Spreadsheet operations:**
- Usually not a concern for small family use

### Monitor Usage
1. Apps Script editor
2. Click "Executions" (clock with checkmark)
3. See all runs and duration
4. Watch for failures

---

## Deployment Checklist

Setup complete when:
- ✅ All 4 script files created and saved
- ✅ First authorization completed
- ✅ `testSetup()` passes
- ✅ Triggers created successfully
- ✅ Test form submissions processed correctly
- ✅ Manual `runAllNow()` works
- ✅ Custom menu appears in spreadsheet
- ✅ No errors in execution log
- ✅ Backup created

---

## Troubleshooting Common Issues

### Menu Doesn't Appear
- Refresh the spreadsheet page
- Wait 10 seconds after opening
- Run `onOpen()` manually from Apps Script

### Forms Not Processing
- Check trigger is running (clock icon)
- Run `importFormResponses()` manually
- Check logs for errors
- Verify response sheets exist

### Triggers Not Running
- Check execution history for errors
- Re-authorize if needed
- Delete and recreate triggers
- Check Google account status

### Script Running Slow
- Reduce data size (archive old transactions)
- Optimize code (batch operations)
- Reduce trigger frequency

---

## Next Steps

1. ✅ Complete initial deployment
2. ✅ Test all functions
3. ✅ Create triggers
4. ✅ Monitor for 1 week
5. ✅ Make adjustments as needed
6. ✅ Add advanced features (optional)

---

**Deployment Date**: ________________

**Script ID**: ________________

**Last Updated**: ________________

**Notes**: ________________
