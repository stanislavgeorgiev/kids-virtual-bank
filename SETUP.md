# 🚀 Setup Guide - Kids Virtual Bank

Get your Kids Virtual Bank running in **1 MINUTE** with a single script!

---

## ⚡ One-Click Setup (Recommended)

**The absolute easiest way - everything in one go!**

### Single Step Setup (1 minute)

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank**
3. Name it: **"Kids Virtual Bank"**
4. **Extensions** → **Apps Script**
5. **IMPORTANT**: Add Google Sheets API:
   - Click **Services** (+ icon on left sidebar)
   - Find **Google Sheets API**
   - Click **Add**
6. Copy ALL code from `/apps-script/CompleteSetup.gs`
7. Paste into the editor (replace any existing code)
8. Click **Save** (disk icon)
9. Select **`setupEverything`** from dropdown
10. Click **Run** (▶️)
11. Authorize when prompted
12. Answer prompts (number of kids, names)
13. **Done!** Copy the 3 form URLs from the popup

✅ **What just happened:**
- All sheets created with formulas
- All 3 forms created and linked
- Automation triggers enabled
- Custom menu added
- Ready to use immediately!

**Total time: 60 seconds** ⏱️

---

## 🔧 Advanced: Modular Setup

**Use this if you want more control or to understand each component.**

### Step 1: Create Spreadsheet (30 seconds)

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** 
3. Name it: **"Kids Virtual Bank"**

---

### Step 2: Run Auto-Setup Script (2 minutes)

1. In your spreadsheet: **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Open `/apps-script/AutoSetup.gs` from this project
4. **Copy ALL the code** (Cmd+A, Cmd+C)
5. **Paste into Apps Script** (Cmd+V)
6. Click **Save** (disk icon) 
7. Select **`setupCompleteSystem`** from dropdown at top
8. Click **Run** (▶️ play button)

**First-time authorization:**
- Click **Review permissions**
- Choose your Google account
- Click **Advanced** → **Go to Kids Virtual Bank (unsafe)**
- Click **Allow**

**Answer the prompts:**
- **How many kids?** Enter 2-10
- **Kid names:** Enter each kid's name when prompted

**Wait 10-20 seconds** - All sheets, formulas, and structure created automatically! ✅

---

### Step 3: Add Automation Scripts (2 minutes)

Still in Apps Script editor, add the scripts that handle ongoing automation:

**A. Add setupForms.gs (for form creation)**
1. Click **+** next to Files → **Script**
2. Name it: **`setupForms`**
3. Copy code from `/apps-script/setupForms.gs` and paste
4. Click **Save**

**B. Add operational scripts**
Repeat the process above for each of these files:
- **`Code`** ← Copy from `/apps-script/Code.gs`
- **`forms`** ← Copy from `/apps-script/forms.gs`
- **`chores`** ← Copy from `/apps-script/chores.gs`
- **`triggers`** ← Copy from `/apps-script/triggers.gs`

💡 You now have 6 script files total. You can delete `AutoSetup` after this step (optional).

---

### Step 4: Create Forms & Enable Automation (1 minute)

**A. Create all forms automatically:**
1. Select **`createAllForms`** from dropdown
2. Click **Run** (▶️)
3. Authorize if prompted
4. Wait 10 seconds
5. **Copy the 3 form URLs** from the popup message
6. Share these URLs with your family!

**B. Enable automation:**
1. Back in your spreadsheet, refresh page (F5)
2. Wait 5 seconds for **🏦 Bank Actions** menu to appear
3. Click **🏦 Bank Actions** → **⚙️ Create Triggers**
4. Wait for success message

✅ **Done! Your system is fully operational!**

---

## Verify Setup

Test that everything works:

1. Click **🏦 Bank Actions** → **▶ Run All Now**
2. Check **Dashboard** sheet - should show kid names and $0 balances
3. Submit a test deposit using the Deposit form URL
4. Wait 5 minutes or run **▶ Run All Now** again
5. Check **Transactions** sheet - deposit should appear
6. Check **Dashboard** - balance should update
7. Check kid's ledger sheet - transaction should appear

✅ **If all checks pass, system is working perfectly!**

---

## Share with Family

### Spreadsheet Access
1. Click **Share** button (top right)
2. Add family emails
3. Set permissions:
   - **Parents**: Editor (can approve chores)
   - **Kids**: Viewer (can only view balances)
4. Click **Send**

### Form URLs
**Give to Kids:**
- Withdrawal form URL (to request money)
- Chores form URL (to submit chores)

**Give to Parents:**
- Deposit form URL (to add money)

💡 Create QR codes or bookmarks for easy access!

---

## What Was Created

### AutoSetup.gs created:
- ✅ Transactions sheet (master log)
- ✅ Summary sheet (current balances)
- ✅ Dashboard sheet (parent overview with charts)
- ✅ Chores sheet (approval workflow)
- ✅ Allowance Rules sheet (weekly allowance config)
- ✅ Individual ledger sheets (one per kid)
- ✅ All formulas and formatting
- ✅ Sample opening balance data

### setupForms.gs created:
- ✅ Deposit form (for parents)
- ✅ Withdrawal form (for kids)
- ✅ Chores form (for kids)
- ✅ All forms linked to spreadsheet
- ✅ Kid names in form dropdowns
- ✅ Validation rules

### Triggers enabled:
- ✅ Import form responses: Every 5 minutes
- ✅ Process approved chores: Every 5 minutes
- ✅ Weekly allowance: Mondays at 8 AM

---

## Customization

### Change Allowance Amount
1. Open **Allowance Rules** sheet
2. Edit weekly allowance value for any kid
3. Takes effect next Monday

### Change Allowance Day/Time
1. Extensions → Apps Script → Clock icon (triggers)
2. Find "weeklyAllowance" → Three dots → Edit
3. Change day/time → Save

### Add/Edit Chores
1. Open Chores form (use URL from setup)
2. Edit "Which chore" question
3. Add/remove/edit chore options

### Add More Kids Later
**Option 1**: Run `setupCompleteSystem()` again with all kids (recreates everything)
**Option 2**: Manually add rows to Summary/Allowance Rules, create ledger sheet, update forms

### Adjust Automation Frequency
1. Extensions → Apps Script → Open `triggers.gs`
2. Edit `createTriggers()` function
3. Change `.everyMinutes(5)` to desired interval
4. Save and run `createTriggers()` again

---

## Daily Usage

### Parents (2 minutes/day)
- Review **Chores** sheet
- Change "Approved?" to "Yes" for completed chores
- Check **Dashboard** for any issues

### Kids (as needed)
- Submit chores via Chores form
- Request withdrawals via Withdrawal form
- Check their ledger sheet for balance

### System (automatic)
- Processes forms every 5 minutes
- Posts allowances every Monday 8 AM
- Updates all balances in real-time

---

## Maintenance

**Weekly (10 min)**
- Verify allowance posted Monday morning
- Review spending patterns with kids
- Check Dashboard for anomalies

**Monthly (15 min)**
- Review transaction history
- Check Apps Script execution logs
- Update chore values if needed
- Discuss savings goals with kids

---

## Troubleshooting

### Quick Fixes

**Forms not importing?**
- Check triggers are active (Apps Script → Clock icon)
- Run **🏦 Bank Actions** → **▶ Run All Now**
- Verify form response sheets exist

**Balances not updating?**
- Check Summary sheet formulas
- Verify kid names match exactly (case-sensitive)
- Check Transactions sheet has data

**Chores not posting?**
- Ensure "Approved?" is exactly "Yes"
- Check "Posted?" isn't already "Yes"
- Run **🏦 Bank Actions** → **✅ Process Chores**

**Script errors?**
- Check execution logs (Apps Script → Executions)
- Re-authorize if needed
- Verify all sheet names are correct

**For detailed troubleshooting**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## Teaching Opportunities

Use the system to teach:

### Financial Concepts
- Income vs. expenses
- Saving for goals
- Budgeting basics
- Needs vs. wants
- Delayed gratification

### Life Skills
- Work ethic (earning through chores)
- Goal setting (saving for purchases)
- Decision making (spending choices)
- Responsibility (tracking money)

### Math Skills
- Addition/subtraction
- Money calculations
- Percentages (if you add interest)
- Long-term planning

**More ideas**: See `/examples/teaching-resources.md`

---

## Manual Controls

Access via **🏦 Bank Actions** menu:

- **▶ Run All Now** - Process everything immediately
- **💰 Post Weekly Allowance** - Manual allowance posting
- **📝 Process Forms** - Import form responses now
- **✅ Process Chores** - Post approved chores now
- **⚙️ Create Triggers** - Set up automation
- **🗑️ Delete Triggers** - Remove automation
- **📋 List Triggers** - View current triggers

---

## Important Sheet Names

**Don't rename these sheets:**
- Transactions
- Summary
- Dashboard
- Chores
- Allowance Rules
- [KidName] Ledger (for each kid)

**Auto-created by forms:**
- Kids Bank - Deposit (Responses)
- Kids Bank - Withdrawal (Responses)
- Kids Bank - Chores (Responses)

---

## Success Checklist

Before you're done:

- ✅ AutoSetup.gs run successfully
- ✅ All sheets created with kid names
- ✅ setupForms.gs run successfully
- ✅ All 3 form URLs saved
- ✅ Automation scripts added (Code, forms, chores, triggers)
- ✅ Triggers created and active
- ✅ Test transaction posted successfully
- ✅ Family members added to spreadsheet
- ✅ Form URLs shared with family

---


## How to Add a New File in Apps Script

If you want to add a new script file (for custom features, bug fixes, or splitting up code):

1. In the Apps Script editor, click the **+** next to "Files" → **Script**.
2. Enter a name (e.g., `myNewFeature`).
3. Copy code from your local `/apps-script/myNewFeature.gs` (or write new code).
4. Paste into the new file in the editor.
5. Click **Save** (disk icon).

**Tips:**
- File names in Apps Script do not need the `.gs` extension (just use the base name).
- You can have as many script files as you want; Apps Script will run them all together.
- To delete a file, right-click its name in the Apps Script sidebar and select **Delete**.
- If you update code locally, just copy-paste the changes into the corresponding Apps Script file.

---

## Documentation Reference

- **FEATURES.md** - Complete feature list
- **TROUBLESHOOTING.md** - Detailed problem solving
- **apps-script/README.md** - Script documentation
- **forms/*.md** - Manual form setup (if needed)
- **google-sheets/*.md** - Sheet structure details
- **examples/teaching-resources.md** - Financial lessons

---

## 🎉 Congratulations!

Your Kids Virtual Bank is operational!

**You now have:**
- ✅ Automated banking system
- ✅ Real-time balance tracking
- ✅ Chore approval workflow
- ✅ Weekly automatic allowances
- ✅ Easy-to-use forms
- ✅ Complete transaction history
- ✅ Parent dashboard with insights

**Remember:**
- Be patient during learning phase
- Make it fun for kids
- Use as teaching opportunities
- Adjust as needs change
- Celebrate financial milestones!

---

**Setup completed on**: ________________

**Kids using system**: ________________

**Form URLs saved**: ✅ Yes / ❌ No

---

**Questions?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or test functions in Apps Script.


### Step 1: Create Blank Spreadsheet (30 seconds)
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "+ Blank" to create a new spreadsheet
3. Click "Untitled spreadsheet" at top left
4. Rename to: **"Kids Virtual Bank"**

---

### Step 2: Run AutoSetup Script (2 minutes)
1. In your spreadsheet: **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy ALL code from `/apps-script/AutoSetup.gs`
4. Paste into the editor
5. Click **Save** (disk icon)
6. Select **`setupCompleteSystem`** from dropdown at top
7. Click **Run** (▶️ button)

**First-time authorization:**
- Click "Review permissions"
- Choose your Google account
- Click "Advanced" → "Go to Kids Virtual Bank (unsafe)"
- Click "Allow"

**Answer the prompts:**
- How many kids? (Enter 2-10)
- Enter each kid's name when prompted

**Wait 10-20 seconds** - All sheets, formulas, and structure created automatically! ✅

---

### Step 3: Add Automation Scripts (2 minutes)

Still in Apps Script editor, add the scripts that handle ongoing automation:

**A. Add setupForms.gs (for form creation)**
1. Click **+** next to Files → **Script**
2. Name it: **`setupForms`**
3. Copy code from `/apps-script/setupForms.gs` and paste
4. Click **Save**

**B. Add operational scripts**
Repeat the process above for each of these files:
- **`Code`** ← Copy from `/apps-script/Code.gs`
- **`forms`** ← Copy from `/apps-script/forms.gs`
- **`chores`** ← Copy from `/apps-script/chores.gs`
- **`triggers`** ← Copy from `/apps-script/triggers.gs`

💡 You now have 6 script files total (AutoSetup, setupForms, Code, forms, chores, triggers)

---

### Step 4: Create Forms & Enable Automation (1 minute)

**A. Create all forms automatically:**
1. Select **`createAllForms`** from dropdown
2. Click **Run** (▶️)
3. Wait 10 seconds
4. **Copy the 3 form URLs** from the popup message
5. Share these URLs with your family!

**B. Enable automation:**
1. Select **`createTriggers`** from dropdown
2. Click **Run** (▶️)
3. Wait for success message

✅ **Done! Your system is fully operational!**

---

## Verify Setup

Run a quick test to make sure everything works:

1. Click **🏦 Bank Actions** → **▶ Run All Now**
2. Check **Dashboard** sheet - should show kid names and $0 balances
3. Submit a test deposit using the Deposit form URL
4. Wait 5 minutes or run **▶ Run All Now** again
5. Check **Transactions** sheet - deposit should appear
6. Check **Dashboard** - balance should update
7. Check kid's ledger sheet - transaction should appear

If all checks pass ✅ - **System is working perfectly!**

---

## What Just Happened?

### AutoSetup.gs created:
- ✅ Transactions sheet (master log)
- ✅ Summary sheet (current balances)
- ✅ Dashboard sheet (parent overview with charts)
- ✅ Chores sheet (approval workflow)
- ✅ Allowance Rules sheet (weekly allowance config)
- ✅ Individual ledger sheets (one per kid)
- ✅ All formulas and formatting
- ✅ Sample opening balance data

### setupForms.gs created:
- ✅ Deposit form (for parents)
- ✅ Withdrawal form (for kids)
- ✅ Chores form (for kids)
- ✅ All forms linked to spreadsheet
- ✅ Kid names populated in form dropdowns
- ✅ Validation rules (amounts must be positive numbers)

### Triggers enabled:
- ✅ Import form responses: Every 5 minutes
- ✅ Process approved chores: Every 5 minutes
- ✅ Weekly allowance: Mondays at 8 AM

---

## Share with Family

### Share Spreadsheet
1. Click **Share** button (top right of spreadsheet)
2. Add family members' email addresses
3. Set permissions:
   - **Parents**: Editor (can approve chores, edit settings)
   - **Kids**: Viewer (can only view their balances)
4. Click **Send**

### Share Form URLs
**Give to Kids:**
- Withdrawal form URL (to request money)
- Chores form URL (to submit chores)

**Give to Parents:**
- Deposit form URL (to add money)

💡 **Tip**: Create QR codes or bookmarks for easy access!

---

## Customization

### Add More Kids Later
If you need to add a kid after initial setup:
1. Run `setupCompleteSystem()` again with all kids (will recreate everything)
2. Or manually: Add rows to Summary/Allowance Rules, create ledger sheet, update forms

### Change Allowance Amount
1. Edit **Allowance Rules** sheet
2. Change weekly allowance value for any kid
3. Takes effect next Monday

### Change Allowance Day/Time
1. Extensions → Apps Script → Click clock icon (triggers)
2. Find "weeklyAllowance" trigger → Click three dots → Edit
3. Change day/time → Save

### Add/Edit Chores
Chore list is in the form. To modify:
1. Open Chores form (use URL from setup)
2. Edit "Which chore" question
3. Add/remove/edit chore options

### Adjust Trigger Frequency
1. Extensions → Apps Script → Open `triggers.gs`
2. Edit `createTriggers()` function
3. Change `.everyMinutes(5)` to `.everyMinutes(10)` or other interval
4. Save and run `createTriggers()` again

---

## Maintenance

### Daily (2 minutes)
- Review and approve pending chores in **Chores** sheet
- Check for unusual transactions in **Dashboard**

### Weekly (10 minutes)
- Verify allowance posted (check **Transactions** Monday morning)
- Review spending patterns with kids
- Check **Dashboard** for any anomalies

### Monthly (15 minutes)
- Review full transaction history
- Check Apps Script execution logs (Extensions → Apps Script → Executions)
- Update chore values if needed
- Discuss savings goals with kids

### As Needed
- Add new kids (re-run AutoSetup or add manually)
- Adjust allowances (edit Allowance Rules sheet)
- Update chore lists (edit forms)
- Archive old data if needed

---

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for comprehensive troubleshooting guide.

### Quick Fixes

**Forms not importing?**
- Check triggers are active (Apps Script → Clock icon)
- Run `importFormResponses()` manually
- Verify form response sheets exist

**Balances not updating?**
- Check Summary sheet formulas are intact
- Verify kid names match exactly (case-sensitive)
- Run **▶ Run All Now** manually

**Chores not posting after approval?**
- Make sure "Approved?" is exactly "Yes"
- Check "Posted?" isn't already "Yes"
- Run `processApprovedChores()` manually

**Script errors?**
- Check execution logs (Apps Script → Executions)
- Re-authorize if needed (run any function)
- Verify all sheet names are correct

---

## Teaching & Learning

Use the system to teach your kids about:

### Financial Concepts
- Income vs. expenses
- Saving for goals
- Budgeting basics
- Needs vs. wants
- Delayed gratification

### Life Skills
- Work ethic (earning through chores)
- Goal setting (saving for purchases)
- Decision making (spending choices)
- Responsibility (tracking money)

### Math Skills
- Addition/subtraction of money
- Budgeting calculations
- Long-term planning
- Percentages (if you add interest)

See `/examples/teaching-resources.md` for detailed curriculum ideas!

---

## Success Checklist

Before considering setup complete:

- ✅ AutoSetup.gs run successfully
- ✅ All sheets created with kid names
- ✅ setupForms.gs run successfully
- ✅ All 3 form URLs copied and shared
- ✅ Automation scripts added (Code, forms, chores, triggers)
- ✅ Triggers created and active
- ✅ Test transaction posted and visible
- ✅ Family members added to spreadsheet
- ✅ Form URLs shared with kids/parents
- ✅ Initial test complete and successful

---

## Congratulations! 🎉

Your Kids Virtual Bank is now operational!

**What you have:**
- ✅ Fully automated banking system
- ✅ Real-time balance tracking
- ✅ Chore approval workflow
- ✅ Weekly automatic allowances
- ✅ Easy-to-use forms for everyone
- ✅ Complete transaction history
- ✅ Parent dashboard with insights

**Remember:**
- Be patient during the learning phase
- Make it fun for kids
- Use as teaching opportunities
- Adjust system as family needs change
- Celebrate financial milestones together

**Need help?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or [QUICK-START.md](./QUICK-START.md)

---

**Setup completed on**: ________________

**Kids using system**: ________________

**Form URLs saved**: ✅ Yes / ❌ No

**Notes**: ________________

