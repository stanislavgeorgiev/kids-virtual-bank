# 📐 Google Sheets Formulas Reference

Complete formula reference for the Kids Virtual Bank system.

---

## Summary Sheet Formulas

### Current Balance (Column B)

**Purpose**: Get the latest balance for each kid from the Transactions sheet

**Formula for Martin (B2)**:
```excel
=IFERROR(INDEX(Transactions!$F:$F, MAX(IF(Transactions!$B:$B=A2, ROW(Transactions!$B:$B)))), 0)
```

**Note**: This is an array formula. In Google Sheets, you may need to use:
```excel
=IFERROR(FILTER(Transactions!F:F, Transactions!B:B=A2, Transactions!A:A<>""), 0)
```
Then use the last value, or simpler:
```excel
=SUMIF(Transactions!$B:$B, A2, Transactions!$E:$E)
```
This sums all amounts (positive deposits, negative withdrawals).

**Recommended approach**:
```excel
=QUERY(Transactions!A:F, "SELECT F WHERE B='"&A2&"' ORDER BY A DESC LIMIT 1", 0)
```

---

## Kid Ledger Formulas

### Filter Transactions by Kid

**Purpose**: Show only transactions for this specific kid

**Formula for Martin Ledger (A2)**:
```excel
=QUERY(Transactions!A:F, "SELECT A, C, D, E WHERE B='Martin' ORDER BY A", 1)
```

**For dynamic kid name** (if sheet name = kid name):
```excel
=QUERY(Transactions!A:F, "SELECT A, C, D, E WHERE B='"&SUBSTITUTE(REGEXEXTRACT(CELL("filename", A1), "[^/]+$"), " Ledger", "")&"' ORDER BY A", 1)
```

**Simpler manual approach**:
```excel
=FILTER(Transactions!A:F, Transactions!B:B="Martin", Transactions!A:A<>"Date")
```

### Running Balance (Column E in Ledger)

**If using QUERY** (balance already comes from Transactions):
- Balance is column F in Transactions, shows as column E in ledger
- No additional formula needed

**If manually building**:
Row 2: `=D2`
Row 3: `=E2+D3`
Row 4: `=E3+D4`
(Copy down)

---

## Dashboard Formulas

### Balance Display (B4)

**Purpose**: Show current balance for each kid

```excel
=VLOOKUP(A4, Summary!A:B, 2, FALSE)
```

Or directly:
```excel
=QUERY(Transactions!A:F, "SELECT F WHERE B='"&A4&"' ORDER BY A DESC LIMIT 1", 0)
```

### Last Activity Date (C4)

**Purpose**: When was the last transaction?

```excel
=QUERY(Transactions!A:B, "SELECT MAX(A) WHERE B='"&A4&"' LABEL MAX(A) ''", 0)
```

### This Month Total (D4)

**Purpose**: Total deposits this month

```excel
=SUMIFS(Transactions!E:E, Transactions!B:B, A4, Transactions!C:C, "Deposit", Transactions!A:A, ">="&DATE(YEAR(TODAY()), MONTH(TODAY()), 1))
```

### Recent Transactions (A8)

**Purpose**: Show last 10 transactions across all kids

```excel
=QUERY(Transactions!A:F, "SELECT A, B, C, D, E ORDER BY A DESC LIMIT 10", 1)
```

### Total Balance (Summary Cell)

**Purpose**: Sum of all kids' balances (Martin and Daniel)

```excel
=SUM(B4:B5)
```

Or:
```excel
=SUM(Summary!B:B)
```

---

## Chores Sheet Formulas

### Auto-calculate Value (Column D)

**If you have a chore points system**:

Create a "Chore Values" reference table:
```
Chore              Value
Wash dishes        5.00
Clean room         7.50
Take out trash     2.50
```

Then in Chores sheet D2:
```excel
=VLOOKUP(C2, ChoreValues!A:B, 2, FALSE)
```

**Manual entry**: Parents can just type the amount.

---

## Advanced Dashboard Formulas

### Sparkline (Trend)

**Balance trend for past 30 days**:
```excel
=SPARKLINE(QUERY(Transactions!A:F, "SELECT A, F WHERE B='Martin' AND A > date '"&TEXT(TODAY()-30, "yyyy-mm-dd")&"' ORDER BY A", 0), {"charttype", "line"})
```

### Deposits vs Withdrawals (This Month)

**Deposits**:
```excel
=SUMIFS(Transactions!E:E, Transactions!B:B, "Martin", Transactions!C:C, "Deposit", Transactions!A:A, ">=" &DATE(YEAR(TODAY()), MONTH(TODAY()), 1))
```

**Withdrawals**:
```excel
=SUMIFS(Transactions!E:E, Transactions!B:B, "Martin", Transactions!C:C, "Withdrawal", Transactions!A:A, ">=" &DATE(YEAR(TODAY()), MONTH(TODAY()), 1))
```

### Count Transactions

**Total transactions this month**:
```excel
=COUNTIFS(Transactions!B:B, "Martin", Transactions!A:A, ">=" &DATE(YEAR(TODAY()), MONTH(TODAY()), 1))
```

---

## Transaction Sheet Formulas

### Balance Column (F2)

**First row (F2)**:
```excel
=IF(C2="Deposit", E2, -E2)
```

**Subsequent rows (F3)**:
```excel
=IF(B3=B2, F2, SUMIF($B$2:B2, B3, $F$2:F2)) + IF(C3="Deposit", E3, -E3)
```

**Simpler approach** - Calculate balance per kid:

Since transactions may be mixed, use this in each ledger:
Row 2: `=IF(B2="Deposit", D2, -D2)`
Row 3: `=E2 + IF(B3="Deposit", D3, -D3)`

---

## Conditional Formatting

### Chores "Approved?" Column

**Highlight approved chores**:
- Range: E2:E1000
- Condition: `=$E2="Yes"`
- Format: Light green background

**Highlight posted chores**:
- Range: F2:F1000
- Condition: `=$F2="Yes"`
- Format: Light blue background

### Low Balance Warning

**In Dashboard or Summary**:
- Range: B4:B10 (balance columns)
- Condition: `<10`
- Format: Red background

### Recent Activity

**Highlight transactions from today**:
- Range: Transactions!A2:F
- Condition: `=$A2=TODAY()`
- Format: Yellow background

---

## Data Validation

### Type Column (Transactions C:C)

**List validation**:
- Range: C2:C1000
- Criteria: List from range
- Values: `Deposit, Withdrawal`

### Kid Names

**Create a named range "KidNames"** = Summary!A2:A10

**Apply to all Kid columns**:
- Transactions B:B
- Chores B:B
- Criteria: List from range "KidNames"

---

## Named Ranges (Optional but Helpful)

Create these for easier formula writing:

| Name | Range | Used For |
|------|-------|----------|
| `KidNames` | Summary!A2:A10 | Drop-down lists |
| `AllTransactions` | Transactions!A2:F | Easier queries |
| `AllChores` | Chores!A2:F | Chore processing |
| `AllowanceList` | AllowanceRules!A2:C | Allowance automation |

---

## Formula Tips

### QUERY Function

**Basic syntax**:
```excel
=QUERY(range, "SELECT columns WHERE condition ORDER BY column", headers)
```

**Examples**:
```excel
=QUERY(A:F, "SELECT A, B, C WHERE D > 10 ORDER BY A DESC", 1)
```

### FILTER Function

**Syntax**:
```excel
=FILTER(range, condition1, condition2)
```

**Example**:
```excel
=FILTER(Transactions!A:F, Transactions!B:B="Martin", Transactions!A:A<>"")
```

### SUMIFS for Conditional Sums

**Syntax**:
```excel
=SUMIFS(sum_range, criteria_range1, criterion1, criteria_range2, criterion2)
```

---

## Common Issues & Solutions

### #REF! Error
- Check sheet names are spelled correctly
- Ensure referenced sheets exist

### #N/A Error in VLOOKUP
- Kid name doesn't exist in Summary
- Use IFERROR to handle: `=IFERROR(VLOOKUP(...), 0)`

### Circular Reference
- Don't reference a cell from itself
- Check balance calculation logic

### Formula Not Updating
- Check if automatic calculation is on (File > Settings)
- Force recalculation with Ctrl+Shift+F9

---

## Testing Your Formulas

### Test Checklist

- [ ] Add a deposit manually - balance updates?
- [ ] Add a withdrawal - balance decreases?
- [ ] Check kid ledger filters correctly
- [ ] Verify dashboard shows current data
- [ ] Test summary pulls latest balance
- [ ] Try with multiple kids
- [ ] Test date filtering
- [ ] Verify conditional formatting works

---

## Next Steps

1. ✅ Copy formulas into your sheets
2. 🧪 Test with sample data
3. 🔒 Protect formula cells
4. 📝 Document any custom changes
5. 🤖 Proceed to Apps Script setup
