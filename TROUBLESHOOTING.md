# 🔧 Troubleshooting Guide

Complete troubleshooting reference for the Kids Virtual Bank system.

---

## Quick Diagnostic Checklist

Run through this checklist first:
- ✅ All required sheets exist with correct names?
- ✅ Apps Script installed and authorized?
- ✅ Triggers created and active?
- ✅ Forms linked to spreadsheet?
- ✅ Recent execution logs show success?

---

## Issue Category Index

1. [Setup Issues](#setup-issues)
2. [Form Problems](#form-problems)
3. [Script Errors](#script-errors)
4. [Trigger Issues](#trigger-issues)
5. [Formula Errors](#formula-errors)
6. [Data Issues](#data-issues)
7. [Performance Problems](#performance-problems)
8. [Authorization Issues](#authorization-issues)

---

## Setup Issues

### Problem: Sheets won't create
**Symptoms**: Can't add new sheets, "+" button doesn't work

**Solutions**:
- Refresh browser
- Try different browser
- Check Google account permissions
- Try incognito mode
- Create new spreadsheet

### Problem: Can't access Apps Script
**Symptoms**: Extensions menu missing or grayed out

**Solutions**:
- Make sure you own the spreadsheet (not just viewer)
- Try: Extensions → Apps Script
- Check browser popup blocker
- Try different browser
- Sign out and back in to Google

### Problem: Sheet names incorrect
**Symptoms**: Script can't find sheets, errors in logs

**Solutions**:
- Check exact spelling (case-sensitive)
- No extra spaces before/after names
- Required names:
  - Transactions
  - Summary
  - Dashboard
  - Chores
  - Allowance Rules
- Double-click tab to rename

---

## Form Problems

### Problem: Form won't link to spreadsheet
**Symptoms**: Can't select existing spreadsheet when linking form

**Solutions**:
1. In form: Responses tab → Green Sheets icon
2. Click "Select existing spreadsheet"
3. Browse to find your spreadsheet
4. If not showing up:
   - Make sure you own it
   - Check it's in your Drive (not shared with you)
   - Try creating form from within spreadsheet instead

### Problem: Form responses not appearing
**Symptoms**: Submit form but nothing shows in spreadsheet

**Solutions**:
- Check form is linked (Responses tab → should show green icon)
- Look for new sheet named "[Form Name] (Responses)"
- Check form settings → Accepting responses = ON
- Try submitting again
- Refresh spreadsheet

### Problem: Multiple response sheets created
**Symptoms**: Several sheets with similar names

**Solutions**:
- This happens if you link/unlink repeatedly
- Choose the most recent one
- Delete extra sheets
- Update form link if needed

### Problem: "Imported?" column missing
**Symptoms**: Script doesn't mark rows as imported, duplicates created

**Solutions**:
- Script auto-creates this column on first run
- If missing, manually add "Imported?" header in last column
- Run script again

---

## Script Errors

### Error: "Cannot read property of undefined"
**Cause**: Trying to access data that doesn't exist

**Solutions**:
- Check sheet names match exactly
- Verify row/column references
- Make sure form response sheets exist
- Look at log to see which line failed
- Check if kid names match between sheets

### Error: "Sheet not found"
**Cause**: Script looking for sheet that doesn't exist

**Solutions**:
- Run `testSetup()` to identify missing sheets
- Check spelling of sheet names
- Create missing sheets
- Verify no extra spaces in names

### Error: "Service invoked too many times"
**Cause**: Hit Google's API quota limit

**Solutions**:
- Reduce trigger frequency (10 min instead of 5)
- Optimize code (use batch operations)
- Wait an hour and try again
- Usually not an issue for normal use

### Error: "Authorization required"
**Cause**: Script needs permission to run

**Solutions**:
1. Open Apps Script editor
2. Run any function (like `testSetup`)
3. Click "Review permissions"
4. Choose your account
5. Click "Advanced" → "Go to [Project] (unsafe)"
6. Click "Allow"

### Error: "TypeError: Cannot call method 'appendRow'"
**Cause**: Trying to write to null/undefined sheet

**Solutions**:
- Verify sheet exists
- Check sheet name spelling
- Look at the code line that failed
- Make sure spreadsheet is accessible

---

## Trigger Issues

### Problem: Triggers not running
**Symptoms**: Nothing happening automatically, no new executions

**Solutions**:
1. Check triggers exist:
   - Apps Script → Clock icon
   - Should see 3-4 triggers
2. If no triggers:
   - Run `createTriggers()` from script
3. If triggers exist but not running:
   - Check execution history for errors
   - Delete and recreate triggers
   - Verify authorization is current

### Problem: "No triggers found"
**Symptoms**: Trigger list is empty

**Solutions**:
- Run `createTriggers()` function
- Make sure you're in the right project
- Check you have permission to create triggers
- Try signing out and back in

### Problem: Triggers running but failing
**Symptoms**: Executions show red X (failure)

**Solutions**:
1. Click on failed execution
2. Read error message
3. Common causes:
   - Missing sheet
   - Authorization expired
   - Formula error
   - Network issue
4. Fix issue and triggers will resume

### Problem: Too many trigger notifications
**Symptoms**: Constant emails about executions

**Solutions**:
1. Apps Script → Triggers → Click trigger
2. Notifications → Change frequency
3. Set to "notify me weekly" instead of "notify me immediately"

---

## Formula Errors

### Error: #REF!
**Cause**: Formula references deleted/moved cell or sheet

**Solutions**:
- Check if referenced sheet exists
- Verify sheet names are correct
- Look at formula: which part is broken?
- Re-enter formula with correct reference

### Error: #N/A
**Cause**: VLOOKUP or QUERY can't find matching data

**Solutions**:
- Check if lookup value exists
- Verify kid names match exactly
- Use IFERROR to handle gracefully:
  ```excel
  =IFERROR(VLOOKUP(...), 0)
  ```

### Error: #VALUE!
**Cause**: Wrong data type for operation

**Solutions**:
- Check if text in number field
- Verify date format
- Look for extra spaces
- Use VALUE() or DATEVALUE() to convert

### Error: Circular dependency
**Cause**: Formula references itself

**Solutions**:
- Review formula logic
- Balance calculations shouldn't be circular
- Use ARRAYFORMULA or different approach

### Error: Formula not calculating
**Symptoms**: Shows formula text instead of result

**Solutions**:
- Formula must start with =
- Check for single quote before formula
- Format → Number → Automatic

---

## Data Issues

### Problem: Duplicate transactions
**Symptoms**: Same transaction appears multiple times

**Solutions**:
- Check "Imported?" column marks rows
- Verify script runs only once
- Look for multiple triggers doing same thing
- Delete duplicates manually
- Fix script to prevent future duplicates

### Problem: Balance not updating
**Symptoms**: Balance stays same despite transactions

**Solutions**:
- Check formula in Balance column
- Verify kid name matches exactly
- Try recalculating: Ctrl+Shift+F9 (Cmd+Shift+F9 on Mac)
- Check if manual calculation mode enabled
- Look at formula: is sheet reference correct?

### Problem: Kid not showing up
**Symptoms**: One kid's transactions not visible

**Solutions**:
- Check kid name spelling (case-sensitive - "Martin" not "martin")
- Verify name is consistent across all sheets
- Check filter settings on sheet
- Look at raw data in Transactions sheet
- Update Summary sheet if needed

### Problem: Wrong amounts
**Symptoms**: Numbers don't add up correctly

**Solutions**:
- Check formula logic
- Verify deposits are positive, withdrawals negative
- Look for currency format issues
- Check for hidden rows
- Manually verify a few calculations

---

## Performance Problems

### Problem: Spreadsheet slow to load
**Cause**: Too much data or complex formulas

**Solutions**:
- Archive old data (move to new sheet)
- Remove unused sheets
- Simplify formulas where possible
- Clear formatting on unused cells
- Reduce number of conditional formatting rules

### Problem: Script timeout
**Error**: "Exceeded maximum execution time"

**Solutions**:
- Optimize script (batch operations)
- Reduce data being processed
- Split into smaller functions
- Run less frequently

### Problem: Forms slow to submit
**Cause**: Large spreadsheet or network issue

**Solutions**:
- Check internet connection
- Try different browser
- Clear browser cache
- Archive old form responses

---

## Authorization Issues

### Problem: "Authorization required" repeatedly
**Symptoms**: Must authorize every time script runs

**Solutions**:
- Complete authorization fully (don't skip steps)
- Check Google account security settings
- Try different Google account
- Clear browser cookies
- Verify email is verified in Google account

### Problem: Can't authorize script
**Symptoms**: Error during authorization flow

**Solutions**:
- Check account has permission to run scripts
- Try: Google Account → Security → Less secure app access
- Use Google Workspace account if available
- Try different browser
- Check Apps Script settings

### Problem: "This app isn't verified"
**Symptoms**: Warning during authorization

**Solutions**:
- This is normal for personal scripts
- Click "Advanced"
- Click "Go to [Project Name] (unsafe)"
- It's your own code, safe to proceed

---

## Advanced Troubleshooting

### Enable Debug Logging
Add detailed logging to scripts:

```javascript
function debugFunction() {
  Logger.log('=== Starting Debug ===');
  Logger.log('Current user: ' + Session.getActiveUser().getEmail());
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Spreadsheet: ' + ss.getName());
  
  const sheets = ss.getSheets();
  Logger.log('Total sheets: ' + sheets.length);
  sheets.forEach(sheet => {
    Logger.log('- ' + sheet.getName() + ' (' + sheet.getLastRow() + ' rows)');
  });
  
  Logger.log('=== Debug Complete ===');
}
```

### Check Execution Quotas
```javascript
function checkQuotas() {
  Logger.log('Script runs today: ' + ScriptApp.getProjectTriggers().length);
  // Check specific service usage if needed
}
```

### Test Individual Components

**Test form import only:**
```javascript
function testFormImportOnly() {
  importDeposits();
  Logger.log('Check logs and Transactions sheet');
}
```

**Test chore processing only:**
```javascript
function testChoreProcessOnly() {
  processApprovedChores();
  Logger.log('Check Transactions and Chores sheets');
}
```

---

## Getting Help

### Check Logs First
1. Apps Script editor
2. View → Logs (or Ctrl+Enter)
3. Read error messages
4. Note which function failed

### Check Execution History
1. Apps Script editor
2. Clock icon (Executions)
3. Find failed execution
4. Read error details

### Debug Step by Step
1. Run function manually (not via trigger)
2. Add Logger.log statements
3. Check logs after each step
4. Identify exact failure point

### Verify Setup
Run the diagnostic function:
```javascript
function runDiagnostics() {
  testSetup();
  listTriggers();
  Logger.log('=== Diagnostics Complete ===');
  Logger.log('Check logs for any issues');
}
```

---

## Prevention Tips

### Regular Maintenance
- ✅ Check execution logs weekly
- ✅ Verify balances match expectations
- ✅ Test forms monthly
- ✅ Backup spreadsheet regularly
- ✅ Update documentation when changing

### Best Practices
- ✅ Use consistent naming
- ✅ Don't rename sheets after setup
- ✅ Test changes before deploying
- ✅ Keep scripts simple
- ✅ Document custom changes

### Backup Strategy
**Weekly**: File → Make a copy
**Monthly**: Download as Excel (.xlsx)
**Before changes**: Duplicate sheet/script

---

## Emergency Reset

If everything is broken and you need to start over:

### Option 1: Reset Triggers Only
```javascript
function resetTriggers() {
  deleteTriggers();
  Utilities.sleep(2000);
  createTriggers();
  Logger.log('Triggers reset');
}
```

### Option 2: Reset Scripts
1. Delete all .gs files
2. Re-copy from source
3. Save all
4. Run testSetup()
5. Reauthorize
6. Create triggers

### Option 3: Start Fresh
1. File → Make a copy (backup)
2. Create new spreadsheet
3. Follow setup guide from beginning
4. Copy data from backup if needed

---

## Common Mistakes to Avoid

❌ Renaming sheets after setup
✅ Use original sheet names

❌ Editing formulas without understanding
✅ Test in separate column first

❌ Deleting response sheets
✅ Leave them even if they look messy

❌ Running multiple triggers for same task
✅ One trigger per function

❌ Modifying script while trigger running
✅ Disable triggers first

---

## When to Ask for Help

Seek help if:
- Error persists after trying solutions
- Can't understand error message
- Setup worked before, now doesn't
- Lost data or corrupted sheet
- Security/authorization concerns

Where to ask:
- Google Sheets Help Forum
- Apps Script documentation
- Reddit: r/googlesheets
- Stack Overflow (tag: google-apps-script)

---

## Success Checklist

System is healthy when:
- ✅ No errors in execution log
- ✅ Forms submit successfully
- ✅ Transactions appear automatically
- ✅ Balances update correctly
- ✅ Triggers show green checkmarks
- ✅ Custom menu appears
- ✅ Chore approval workflow works
- ✅ Weekly allowance posts on schedule

---

**Last Updated**: [Date]
**Version**: 1.0
**Status**: [Working / Needs Attention]
