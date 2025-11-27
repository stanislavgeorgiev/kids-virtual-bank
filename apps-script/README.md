# 📜 Apps Script Files Overview

This folder contains all the Google Apps Script files needed for the Kids Virtual Bank system.

---

## 🚀 Setup Scripts (Run Once)

### **AutoSetup.gs**
- **Purpose**: Automatically creates entire spreadsheet structure
- **When to use**: During initial setup only (run first)
- **What it does**:
  - Prompts for number of kids and their names
  - Creates all required sheets
  - Sets up formulas and formatting
  - Adds sample data
  - Configures everything automatically
- **Run**: `setupCompleteSystem()`
- **After setup**: Can be deleted (optional to keep)

### **setupForms.gs**
- **Purpose**: Automatically creates all 3 Google Forms
- **When to use**: After AutoSetup, before triggers (run second)
- **What it does**:
  - Reads kid names from Summary sheet
  - Creates Deposit form (for parents)
  - Creates Withdrawal form (for kids)
  - Creates Chores form (for kids)
  - Links all forms to spreadsheet
  - Populates kid names in dropdowns
  - Returns URLs for all forms
- **Run**: `createAllForms()`
- **After setup**: Can be deleted (optional to keep)

---

## ⚙️ Automation Scripts (Keep Forever)

These scripts run continuously to make your bank work day-to-day.

### **Code.gs**
- **Purpose**: Main controller and custom menu
- **Functions**:
  - `runAllNow()` - Process everything immediately
  - `weeklyAllowance()` - Post weekly allowances
  - `testSetup()` - Verify configuration
  - `initializeWithSampleData()` - Add sample data
  - `onOpen()` - Creates custom menu in spreadsheet
- **When it runs**: On demand via menu, manually, or scheduled

### **forms.gs**
- **Purpose**: Import form responses (deposits & withdrawals)
- **Functions**:
  - `importFormResponses()` - Main entry point
  - `importDeposits()` - Process deposit form
  - `importWithdrawals()` - Process withdrawal form
  - Helper functions for finding and processing form sheets
- **When it runs**: Every 5 minutes (via trigger)
- **What it does**: 
  - Finds form response sheets
  - Imports new responses
  - Marks as "Imported?" to prevent duplicates
  - Posts to Transactions sheet

### **chores.gs**
- **Purpose**: Process chore submissions and approvals
- **Functions**:
  - `processApprovedChores()` - Post approved chores as deposits
  - `importChoreFormResponses()` - Import chore form submissions
- **When it runs**: Every 5 minutes (via trigger)
- **What it does**:
  - Checks for chores with "Approved? = Yes"
  - Posts payment to Transactions
  - Marks as "Posted? = Yes"

### **triggers.gs**
- **Purpose**: Manage automation triggers
- **Functions**:
  - `createTriggers()` - Set up all automation (run once after setup)
  - `deleteTriggers()` - Remove all triggers
  - `listTriggers()` - Show current triggers
  - `createTestTrigger()` - Testing version
  - `createProductionTriggers()` - Alternative schedule
- **When to use**: 
  - Run `createTriggers()` once after adding all scripts
  - Use other functions for troubleshooting
- **What it creates**:
  - Form import: Every 5 minutes
  - Chore processing: Every 5 minutes
  - Chore form import: Every 5 minutes
  - Weekly allowance: Mondays at 8 AM

---

## 📋 Installation Order

### Step 1: AutoSetup (Create spreadsheet structure)
```
1. Create blank Google Spreadsheet
2. Extensions → Apps Script
3. Copy/paste AutoSetup.gs
4. Save
5. Run setupCompleteSystem()
6. Authorize and follow prompts
7. Enter number of kids and their names
```

### Step 2: Create Forms (Automatic)
```
1. In Apps Script, click + next to Files
2. Create new script file: setupForms
3. Copy/paste setupForms.gs content
4. Save
5. Run createAllForms()
6. Copy the 3 form URLs from popup
7. Share URLs with your family
```

### Step 3: Add Automation Scripts
```
1. In Apps Script, click + next to Files
2. Create new script file: Code
3. Copy/paste Code.gs content
4. Save
5. Repeat for: forms, chores, triggers
```

### Step 4: Enable Automation
```
1. In Apps Script, select createTriggers from dropdown
2. Click Run
3. Wait for success message
4. Verify in Triggers view (clock icon)
```

### Step 5: Optional Cleanup
```
1. Delete AutoSetup.gs file (no longer needed)
2. Delete setupForms.gs file (no longer needed)
3. Keep the other 4 scripts (Code, forms, chores, triggers)
```

---

## 🧪 Testing Functions

After installation, test each component:

### Test 1: Verify Setup
```javascript
testSetup()  // From Code.gs
```
Should show: "All sheets exist! ✓"

### Test 2: Manual Processing
```javascript
runAllNow()  // From Code.gs
```
Processes all pending forms and chores immediately.

### Test 3: Check Triggers
```javascript
listTriggers()  // From triggers.gs
```
Should show 4 triggers running.

---

## 🔄 What Runs When

### Every 5 Minutes (Automatic)
- `importFormResponses()` - Checks for new deposits/withdrawals
- `processApprovedChores()` - Posts approved chores
- `importChoreFormResponses()` - Imports new chore submissions

### Weekly (Monday 8 AM)
- `weeklyAllowance()` - Posts weekly allowance for all kids

### On Demand (Manual)
- `runAllNow()` - Process everything immediately
- Via custom menu: 🏦 Bank Actions

### On Spreadsheet Open
- `onOpen()` - Creates custom menu

---

## 🛠️ Customization

### Change Trigger Frequency
Edit `triggers.gs`:
```javascript
// Change from every 5 minutes to every 10 minutes
.everyMinutes(10)  // instead of .everyMinutes(5)
```

### Change Allowance Day/Time
Edit `triggers.gs`:
```javascript
// Change from Monday 8 AM to Sunday 8 PM
.onWeekDay(ScriptApp.WeekDay.SUNDAY)  // instead of MONDAY
.atHour(20)  // instead of 8
```

### Add Custom Function
Add to `Code.gs`:
```javascript
function myCustomFunction() {
  // Your code here
  Logger.log('Custom function running');
}
```

---

## 📊 File Sizes

Approximate line counts:
- **AutoSetup.gs**: ~450 lines (setup only)
- **setupForms.gs**: ~280 lines (form creation)
- **Code.gs**: ~120 lines (main controller)
- **forms.gs**: ~150 lines (form processing)
- **chores.gs**: ~100 lines (chore processing)
- **triggers.gs**: ~150 lines (trigger management)

**Total**: ~1,250 lines of code

---

## 🆘 Troubleshooting

### "Sheet not found" errors
- Run `testSetup()` to verify all sheets exist
- Check exact spelling (case-sensitive)
- Re-run AutoSetup if needed

### Triggers not running
- Check trigger status: Click clock icon in Apps Script
- Re-authorize if needed
- Delete and recreate: `deleteTriggers()` then `createTriggers()`

### Forms not importing
- Verify form is linked to spreadsheet
- Check response sheet exists
- Run `importFormResponses()` manually
- Check logs for errors

### Script authorization issues
- Run any function to trigger auth flow
- Click "Advanced" → "Go to [Project] (unsafe)"
- Click "Allow"

---

## 📚 Documentation References

- **QUICK-START.md** - Simplified setup guide using AutoSetup
- **SETUP.md** - Detailed manual setup (alternative method)
- **DEPLOYMENT.md** - Advanced deployment topics
- **TROUBLESHOOTING.md** - Common issues and solutions

---

## 🔐 Security Notes

- Scripts only access your spreadsheet (no external data)
- Authorization is required on first run
- Triggers run under your account
- No data is sent outside Google Sheets
- Safe to use with family data

---

## 💡 Best Practices

1. **Keep all 4 automation scripts** (Code, forms, chores, triggers)
2. **Delete AutoSetup after initial setup** (optional)
3. **Test manually first** before relying on triggers
4. **Check execution logs weekly** (Apps Script → Executions)
5. **Back up your scripts** (File → Make a copy)
6. **Document customizations** if you modify the code

---

**Need help?** See TROUBLESHOOTING.md or check Apps Script execution logs.
