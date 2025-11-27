# 🏦 Kids Virtual Bank System

A complete virtual banking system for kids using Google Sheets and Google Forms. Track allowances, chores, deposits, withdrawals, and teach financial literacy!

## 🌟 Features

- **Multi-kid support** - Manage accounts for multiple children
- **Automated allowances** - Weekly deposits run automatically
- **Chores system** - Kids submit chores, parents approve, money posts automatically
- **Google Forms integration** - Easy deposits, withdrawals, and chore submissions
- **Parent dashboard** - Real-time overview of all accounts
- **Transaction history** - Complete audit trail with running balances
- **Automated reconciliation** - No manual calculation needed

## 📁 Project Structure

```
kids-virtual-bank/
├── README.md                          # This file
├── FEATURES.md                        # Complete feature list
├── SETUP.md                           # Step-by-step setup guide
├── google-sheets/
│   ├── template-structure.md          # Sheet structure documentation
│   └── formulas.md                    # All formulas reference
├── apps-script/
│   ├── Code.gs                        # Main automation script
│   ├── allowance.gs                   # Allowance automation
│   ├── chores.gs                      # Chore processing
│   ├── forms.gs                       # Form import handlers
│   └── triggers.gs                    # Trigger management
├── forms/
│   ├── deposit-form.md                # Deposit form setup
│   ├── withdrawal-form.md             # Withdrawal form setup
│   └── chores-form.md                 # Chores form setup
└── examples/
    ├── sample-transactions.csv        # Example data
    └── dashboard-screenshots/         # Visual guides
```

## 🚀 Quick Start

### Prerequisites
- Google Account
- Google Sheets
- Google Forms
- 5-10 minutes to set up

### Installation Steps

1. **Create blank Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create new blank spreadsheet
   - Name it "Kids Virtual Bank"

2. **Run AutoSetup script (This does everything!)**
   - Extensions → Apps Script
   - Copy/paste `apps-script/AutoSetup.gs`
   - Run `setupCompleteSystem()`
   - Enter number of kids and their names
   - ✨ All sheets, formulas, and structure created automatically!

3. **Add automation scripts**
   - Add `Code.gs`, `forms.gs`, `chores.gs`, `triggers.gs`
   - Run `createTriggers()` to enable automation

4. **Create Google Forms (Automatic!)**
   - Add `setupForms.gs` to Apps Script
   - Run `createAllForms()`
   - ✨ All 3 forms created and linked automatically!
   - Alternative: Follow manual guides in `forms/` folder

5. **Done!**
   - Test with `runAllNow()`
   - Submit test forms
   - Start using with your family!

For detailed instructions, see [SETUP.md](./SETUP.md)

## 💡 How It Works

### For Parents
1. Set weekly allowance amounts in the Allowance Rules sheet
2. Approve chores in the Chores sheet (change "No" to "Yes")
3. View the Dashboard for real-time balances
4. Submit deposits via Google Form

### For Kids
1. Submit chores via Google Form
2. Request withdrawals via Google Form
3. Check balance in their ledger sheet

### Automation
- Every 5 minutes: Process new form submissions and approved chores
## 📊 Sheets Overview

| Sheet Name | Purpose |
|------------|---------|
| **Transactions** | Master log of all transactions |
| **Summary** | Current balances for all kids |
| **Dashboard** | Parent overview with charts |
| **Chores** | Chore submissions and approvals |
| **Allowance Rules** | Weekly allowance settings |
| **[Kid Name] Ledger** | Individual transaction history (one per kid) |
| **Deposit Responses** | Form submissions (auto-created) |
| **Withdrawal Responses** | Form submissions (auto-created) |
| **Chores Responses** | Form submissions (auto-created) |

💡 **Note:** AutoSetup.gs creates all core sheets automatically. Form response sheets are created when you link your forms.
## 🔧 Customization

### Adding More Kids
**Option 1: During setup**
- Run `setupCompleteSystem()` and enter all kids upfront (supports 2-10 kids)

**Option 2: After setup**
1. Manually add row to Summary sheet
2. Manually add row to Allowance Rules sheet
3. Manually create new "[Name] Ledger" sheet with formulas
4. Update Dashboard to include new kid
5. Add name to all form dropdowns

💡 **Tip:** It's easier to include all kids during initial setup!

### Changing Allowance Schedule
3. Update Summary formulas
4. Add to Dashboard

### Changing Allowance Schedule
Edit the trigger in Apps Script to run bi-weekly or monthly instead of weekly.

### Custom Chore Values
Add point values or custom amounts in the Chores sheet.

## 🛠️ Maintenance

### Weekly Tasks
- Review and approve pending chores
- Check Dashboard for anomalies

### Monthly Tasks
- Review transaction history
- Archive old data if needed
- Discuss finances with kids

### Troubleshooting
- Check Apps Script logs for errors
- Verify triggers are running
- Ensure forms are linked correctly
- Check for duplicate "Posted?" entries

## 📱 Optional Enhancements

- **Mobile app** with Glide or AppSheet
- **Email notifications** for low balances
- **Savings goals** tracker
- **Interest calculations** on balances
- **Report generation** for tax year
- **Spending categories** and budgets

## 📄 License

MIT License - Feel free to use and modify for your family!

## 🤝 Contributing

This is a personal project template, but suggestions are welcome! Open an issue or submit a pull request.

## 📞 Support

See [SETUP.md](./SETUP.md) for detailed setup help and troubleshooting.

---

**Built with ❤️ for teaching kids about money management**
