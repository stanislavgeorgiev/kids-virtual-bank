# 💸 Withdrawal Form Setup Guide

## Overview
The Withdrawal Form allows kids to request withdrawals from their accounts. Parents can review and approve these before processing.

---

## ⚡ Automatic Creation (Recommended)

**Use `/apps-script/setupForms.gs` to create this form automatically!**

1. Add `setupForms.gs` to your Apps Script project
2. Run `createAllForms()`
3. All 3 forms created instantly with kid names populated!

See [SETUP.md](../SETUP.md) for details.

---

## 📝 Manual Creation (Alternative)

**Only use this if you need to customize beyond the automatic setup.**

### Creating the Form

### Step 1: Create New Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Click "+ Blank" to create a new form
3. Name it: **"Kids Bank - Withdrawal Request"**
4. Add description: *"Use this form to request money from your bank account"*

---

### Step 2: Add Questions

#### Question 1: Your Name
- **Type**: Multiple choice
- **Question**: "What's your name?"
- **Options**:
  - Martin
  - Daniel
  - Add more as needed
- **Required**: Yes

#### Question 2: Amount
- **Type**: Short answer
- **Question**: "How much do you want to withdraw?"
- **Description**: "Enter amount in dollars (e.g., 5.00)"
- **Validation**: 
  - Response validation → Number → Greater than → 0
  - Response validation → Number → Less than or equal to → 100 (optional limit)
- **Required**: Yes

#### Question 3: What For
- **Type**: Short answer
- **Question**: "What do you need this money for?"
- **Description**: "Be specific! e.g., Ice cream, Save for toy, Birthday gift for friend"
- **Required**: Yes

#### Question 4 (Optional): Category
- **Type**: Multiple choice
- **Question**: "What category is this?"
- **Options**:
  - Treats/Snacks
  - Toys
  - Gifts
  - Savings Goal
  - Other
- **Required**: No

---

### Step 3: Configure Form Settings

1. Click the **Settings** gear icon (⚙️) at top right
2. Under **Responses**:
   - ✅ Check "Collect email addresses" (optional, for notifications)
   - ✅ Check "Limit to 1 response" (prevents multiple requests per session)
   - Set response receipts to "Always" (kids get confirmation)
3. Under **Presentation**:
   - ✅ Check "Show progress bar"
   - Set confirmation message: *"Request received! Ask your parents to approve it. Check your balance in a few minutes."*

---

### Step 4: Link to Spreadsheet

1. Click the **Responses** tab in your form
2. Click the Google Sheets icon (📊) on the right
3. Select **"Select existing spreadsheet"**
4. Choose your **"Kids Virtual Bank"** spreadsheet
5. Click **"Select"**

This creates a new sheet called something like "Kids Bank - Withdrawal Request (Responses)"

---

### Step 5: Customize Theme

#### Kid-Friendly Design
- Click the palette icon at top right
- Choose bright, fun colors (blue, green, purple)
- Add a header image:
  - Use an emoji: 💰 🏦 💸
  - Or a kid-friendly piggy bank image
  - Size: 800x200 pixels recommended

---

## Form Preview

Here's what your form should look like:

```
═══════════════════════════════════════
    💸 Kids Bank - Withdrawal Request
    Use this form to request money from your bank account
═══════════════════════════════════════

1. What's your name? *
   ○ Martin
   ○ Daniel
   
2. How much do you want to withdraw? *
   [ Enter amount in dollars (e.g., 5.00) ]
   
3. What do you need this money for? *
   [ Be specific! e.g., Ice cream, Save for toy ]
   
4. What category is this?
   ○ Treats/Snacks
   ○ Toys
   ○ Gifts
   ○ Savings Goal
   ○ Other
   
   [Submit]
═══════════════════════════════════════
```

---

## Testing Your Form

### Submit Test Data
1. Open your form
2. Fill it out as if you're a kid:
   - Name: Martin
   - Amount: 3.50
   - What for: Ice cream after school
   - Category: Treats/Snacks
3. Click Submit
4. Check spreadsheet for the response
5. Wait for automation or run `runAllNow()` manually
6. Verify withdrawal appears in Transactions sheet
7. Check that balance decreased

---

## Setting Up Approval (Optional)

If you want to add a manual approval step:

### Create Approval Column
1. Open the withdrawal response sheet
2. Add a new column: **"Approved?"**
3. Parents manually change to "Yes" before processing

### Update Script
Modify the `importWithdrawals()` function to check the Approved column first.

---

## Sharing the Form

### Option 1: Kid-Friendly Access
1. Shorten the URL
2. Create a QR code (use qr-code-generator.com)
3. Print and post on the fridge
4. Add to kids' device bookmarks

### Option 2: Mobile Home Screen
**iPhone/iPad:**
1. Open form in Safari
2. Tap Share button
3. Scroll down → "Add to Home Screen"
4. Name it "My Bank 💰"

**Android:**
1. Open form in Chrome
2. Tap menu (⋮)
3. Select "Add to Home screen"
4. Name it "My Bank 💰"

---

## Withdrawal Rules & Limits

### Suggested Rules (Customize for your family)

**Amount Limits:**
- Minimum: $1.00
- Maximum: $50.00 per request
- Daily limit: $20.00

**Balance Requirements:**
- Can't withdraw more than current balance
- Must keep minimum balance of $5.00

**Approval Process:**
- All withdrawals require parent approval
- Response within 24 hours
- Emergency requests can be expedited

### Communicate Rules to Kids
Create a simple rules sheet:
```
🏦 Withdrawal Rules 🏦

✓ You can request money anytime
✓ Tell us what it's for
✓ We'll approve within 24 hours
✓ You must have enough in your account
✓ Keep at least $5 in your account
✓ Maximum $20 per day

Questions? Ask Mom or Dad!
```

---

## Notifications (Optional)

### Email Alerts for Parents
1. In Google Forms, click the three dots (⋮) at top right
2. Select "Get email notifications for new responses"
3. Parents receive instant notification when kids request money

### SMS Alerts (Advanced)
- Use Zapier or IFTTT to send SMS
- Connect Google Forms → SMS service
- Get text when withdrawal requested

---

## Best Practices

### For Kids
- Be honest about what money is for
- Check your balance first
- Don't request more than you have
- Wait for approval before assuming you have the money

### For Parents
- Review requests promptly
- Discuss large requests
- Use requests as teaching moments
- Track spending patterns

---

## Troubleshooting

### "I don't have enough money"
- Check balance in your ledger sheet
- Make sure recent deposits have processed
- Ask parents about pending allowance

### "My request isn't showing up"
- Wait 5-10 minutes for automation
- Check the response sheet exists
- Ask parent to run `runAllNow()` manually

### Duplicate submissions
- Enable "Limit to 1 response" in settings
- Clear cookies if kid needs to submit again

---

## Advanced Features

### Add Spending Category Tracking
- Create a dropdown for categories
- Track spending by category
- Generate monthly reports

### Add Parent PIN
- Use Google Forms' quiz mode
- Require PIN for withdrawals over certain amount
- Parent must approve high-value requests

### Add Spending Goals
- "What are you saving for?" question
- Track progress toward goals
- Visual progress bars in dashboard

---

## Teaching Moments

Use withdrawal requests to teach:
- **Needs vs Wants**: "Do you need it or want it?"
- **Delayed Gratification**: "Can you wait and save for something bigger?"
- **Budgeting**: "How much do you spend on snacks each week?"
- **Planning**: "Will you have enough for your friend's gift next week?"

---

## Next Steps

1. ✅ Test with each kid
2. ✅ Explain the rules
3. ✅ Show them how to check their balance
4. ✅ Practice with small amounts first
5. ✅ Review weekly spending together

---

**Form URL**: [Paste your form URL here after creating]

**Response Sheet Name**: [Paste sheet name here, e.g., "Kids Bank - Withdrawal Request (Responses)"]

**QR Code**: [Generate and save QR code image here]
