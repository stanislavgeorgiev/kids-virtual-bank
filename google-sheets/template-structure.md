# 📊 Google Sheets Template Structure

This document describes the complete structure for your Kids Virtual Bank spreadsheet.

## Sheet Creation Order

Create these sheets in your Google Spreadsheet in this order:

1. Transactions
2. Summary
3. Dashboard
4. Chores
5. Allowance Rules
6. Kid1 Ledger
7. Kid2 Ledger
8. Deposit Responses (auto-created by form)
9. Withdrawal Responses (auto-created by form)
10. Chores Responses (auto-created by form)

---

## 1. Transactions Sheet

**Purpose**: Master log of ALL transactions across all kids

### Columns (A-F)

| Column | Header | Description |
|--------|--------|-------------|
| A | Date | Transaction date (auto-filled) |
| B | Kid | Child's name |
| C | Type | Deposit or Withdrawal |
| D | Description | What the transaction is for |
| E | Amount | Dollar amount |
| F | Balance | Running balance (calculated) |

### Sample Data (Row 2+)

```
Date         Kid      Type        Description          Amount    Balance
1/1/2024     Martin   Deposit     Opening Balance      100.00    100.00
1/1/2024     Daniel   Deposit     Opening Balance      50.00     50.00
1/8/2024     Martin   Deposit     Weekly Allowance     10.00     110.00
1/8/2024     Daniel   Deposit     Weekly Allowance     10.00     60.00
```

### Format
- Column A: Date format
- Column E: Currency format ($0.00)
- Column F: Currency format ($0.00)

---

## 2. Summary Sheet

**Purpose**: Current balance for each kid (one row per kid)

### Columns (A-B)

| Column | Header | Description |
|--------|--------|-------------|
| A | Kid | Child's name |
| B | Current Balance | Latest balance (formula) |

### Sample Data

```
Kid       Current Balance
Martin    $110.00
Daniel    $60.00
```

### Formulas
See `formulas.md` for balance calculation formulas.

---

## 3. Dashboard Sheet

**Purpose**: Parent overview with quick stats and visuals

### Layout

```
A1: Kids Virtual Bank Dashboard
A3: Kid          B3: Balance    C3: Last Activity    D3: This Month
A4: Martin       [formula]      [formula]            [formula]
A5: Daniel       [formula]      [formula]            [formula]

A7: Recent Transactions (All Kids)
A8: [Last 10 transactions from Transactions sheet]

A20: Charts and Sparklines Area
```

### Suggested Sections
1. **Balance Summary** (Rows 3-6)
2. **Recent Activity** (Rows 8-18)
3. **Charts** (Rows 20+)
   - Balance trend
   - Deposits vs Withdrawals
   - Chore earnings

---

## 4. Chores Sheet

**Purpose**: Kids submit chores, parents approve, system posts deposits

### Columns (A-F)

| Column | Header | Description |
|--------|--------|-------------|
| A | Timestamp | When submitted |
| B | Kid | Child's name |
| C | Chore | What they did |
| D | Value | Amount earned |
| E | Approved? | Yes/No (parent edits) |
| F | Posted? | Yes/blank (script marks) |

### Sample Data

```
Timestamp           Kid      Chore              Value   Approved?   Posted?
1/5/2024 10:30 AM   Martin   Washed dishes      5.00    Yes         Yes
1/6/2024 3:15 PM    Daniel   Cleaned room       7.50    No          
1/7/2024 11:00 AM   Martin   Took out trash     2.50    Yes         Yes
```

### Workflow
1. Kid submits via form → appears here
2. Parent reviews and changes "Approved?" to "Yes"
3. Script runs, posts deposit, marks "Posted?" as "Yes"

---

## 5. Allowance Rules Sheet

**Purpose**: Configure weekly allowance for each kid

### Columns (A-C)

| Column | Header | Description |
|--------|--------|-------------|
| A | Kid | Child's name |
| B | Weekly Allowance | Amount to post each week |
| C | Notes | Optional: start date, conditions |

### Sample Data

```
Kid       Weekly Allowance    Notes
Martin    10.00               Started Jan 1, 2024
Daniel    10.00               Started Jan 1, 2024
```

### How It Works
- Script reads this sheet every Monday
- Posts deposit to Transactions
- Updates each kid's ledger

---

## 6-7. Kid Ledger Sheets (Kid1 Ledger, Kid2 Ledger, etc.)

**Purpose**: Individual transaction history for each child

### Columns (A-E)

| Column | Header | Description |
|--------|--------|-------------|
| A | Date | Transaction date |
| B | Type | Deposit or Withdrawal |
| C | Description | What it's for |
| D | Amount | Dollar amount |
| E | Balance | Running balance |

### Sample Data (Martin Ledger)

```
Date         Type        Description          Amount    Balance
1/1/2024     Deposit     Opening Balance      100.00    100.00
1/8/2024     Deposit     Weekly Allowance     10.00     110.00
1/10/2024    Deposit     Washed dishes        5.00      115.00
1/12/2024    Withdrawal  Ice cream            3.50      111.50
```

### Formulas
- Filtered from Transactions sheet (see formulas.md)
- Balance column calculates running total

---

## 8-10. Form Response Sheets (Auto-Created)

These sheets are automatically created when you link Google Forms to your spreadsheet.

### Deposit Responses
- Timestamp
- Kid
- Amount
- Description
- Imported? (added by script)

### Withdrawal Responses
- Timestamp
- Kid
- Amount
- Description
- Imported? (added by script)

### Chores Responses
- Timestamp
- Kid
- Chore
- Points/Value
- Imported? (added by script)

**Note**: The script adds an "Imported?" column to prevent duplicate processing.

---

## Initial Setup Checklist

- [ ] Create all sheets with exact names
- [ ] Add column headers (row 1)
- [ ] Format currency columns
- [ ] Format date columns
- [ ] Add initial balances in Transactions
- [ ] Set up Allowance Rules
- [ ] Add formulas (see formulas.md)
- [ ] Protect important formula cells
- [ ] Create and link Google Forms
- [ ] Add Apps Script code
- [ ] Test with sample data

---

## Sheet Protection (Optional)

Protect these sheets from accidental edits:
- Transactions (except from script)
- Summary (all formulas)
- Dashboard (except approval columns)
- Kid Ledgers (all formulas)

Allow editing:
- Chores "Approved?" column
- Allowance Rules (for updates)

---

## Naming Conventions

**Important**: Sheet names are case-sensitive and used in the script!

Required exact names:
- `Transactions`
- `Summary`
- `Dashboard`
- `Chores`
- `Allowance Rules`
- `Martin Ledger`
- `Daniel Ledger`

Form response sheets can have any name (script finds them by content).

---

## Next Steps

1. ✅ Create all sheets with this structure
2. 📄 Add formulas from `formulas.md`
3. 📝 Set up forms using guides in `/forms/`
4. 🤖 Add Apps Script from `/apps-script/`
5. 🚀 Test the system!
