# 💰 Deposit Form Setup Guide

## Overview
The Deposit Form allows parents to quickly add deposits to any kid's account.

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
3. Name it: **"Kids Bank - Deposit"**
4. Add description: *"Use this form to deposit money into a kid's account"*

---

### Step 2: Add Questions

#### Question 1: Kid Name
- **Type**: Multiple choice
- **Question**: "Which kid is this deposit for?"
- **Options**:
  - Martin
  - Daniel
  - Add more as needed
- **Required**: Yes

#### Question 2: Amount
- **Type**: Short answer
- **Question**: "How much are you depositing?"
- **Description**: "Enter amount in dollars (e.g., 10.50)"
- **Validation**: 
  - Response validation → Number → Greater than → 0
- **Required**: Yes

#### Question 3: Description
- **Type**: Short answer
- **Question**: "What is this deposit for?"
- **Description**: "e.g., Birthday gift, Extra chore, Bonus"
- **Required**: No

---

### Step 3: Configure Form Settings

1. Click the **Settings** gear icon (⚙️) at top right
2. Under **Responses**:
   - ✅ Check "Collect email addresses" (optional)
   - ✅ Check "Response receipts" → "Always" (optional)
3. Under **Presentation**:
   - ✅ Check "Show progress bar"
   - Set confirmation message: *"Deposit recorded! Check the spreadsheet in a few minutes."*

---

### Step 4: Link to Spreadsheet

1. Click the **Responses** tab in your form
2. Click the Google Sheets icon (📊) on the right
3. Select **"Select existing spreadsheet"**
4. Choose your **"Kids Virtual Bank"** spreadsheet
5. Click **"Select"**

This creates a new sheet in your spreadsheet called something like "Kids Bank - Deposit (Responses)"

---

### Step 5: Customize (Optional)

#### Add a Theme
- Click the palette icon at top right
- Choose colors that match your family's style
- Add a header image if desired

#### Shorten URL
- Click **Send** button
- Click the link icon (🔗)
- Click **"Shorten URL"**
- Copy this link for easy access

---

## Form Preview

Here's what your form should look like:

```
═══════════════════════════════════════
    Kids Bank - Deposit
    Use this form to deposit money into a kid's account
═══════════════════════════════════════

1. Which kid is this deposit for? *
   ○ Martin
   ○ Daniel
   
2. How much are you depositing? *
   [ Enter amount in dollars (e.g., 10.50) ]
   
3. What is this deposit for? *
   [ e.g., Birthday gift, Extra chore, Bonus ]
   
   [Submit]
═══════════════════════════════════════
```

---

## Testing Your Form

### Submit Test Data
1. Open your form
2. Fill it out with test data:
   - Kid: Martin
   - Amount: 5.00
   - Description: Test deposit
3. Click Submit
4. Check your spreadsheet for a new sheet with responses
5. Wait 5 minutes for the automation to run, or run `runAllNow()` manually
6. Verify the transaction appears in the Transactions sheet

---

## Sharing the Form

### Option 1: Direct Link
1. Click **Send** at top right
2. Click the link icon (🔗)
3. Copy the shortened URL
4. Share with parents via text, email, or bookmark it

### Option 2: Email
1. Click **Send**
2. Click envelope icon (📧)
3. Enter email addresses
4. Click **Send**

### Option 3: Embed in Website
1. Click **Send**
2. Click embed icon (</>)
3. Copy the HTML code
4. Paste into your family website

---

## Best Practices

### For Parents
- Bookmark the form URL for quick access
- Add to home screen on mobile devices
- Use clear descriptions for tracking
- Double-check amounts before submitting

### Security
- Keep form URL private (family only)
- Don't share publicly
- Consider using Google Forms' "Limit to 1 response" if needed
- Review responses regularly

---

## Troubleshooting

### Form not linked to spreadsheet
- Check Responses tab → Make sure green Sheets icon shows connected
- Reconnect if needed

### Responses not appearing in Transactions
- Check if response sheet was created
- Verify Apps Script is installed and authorized
- Check script logs (Extensions → Apps Script → Executions)
- Run `importFormResponses()` manually

### Validation errors
- Make sure Amount field has number validation
- Check that all required fields are marked with *

---

## Advanced Options

### Add More Fields
- **Category**: Dropdown for gift, allowance bonus, etc.
- **Notes**: Paragraph text for longer descriptions
- **Receipt Upload**: File upload for receipts

### Conditional Logic
- Show different questions based on kid selected
- Custom amounts for specific categories

### Notifications
- Set up email notifications for large deposits
- Send copy of responses to specific email

---

## Next Steps

1. ✅ Create the Withdrawal Form
2. ✅ Create the Chores Form
3. ✅ Test all forms together
4. ✅ Share with family members
5. ✅ Set up Apps Script automation (if not done already)

---

**Form URL**: [Paste your form URL here after creating]

**Response Sheet Name**: [Paste sheet name here, e.g., "Kids Bank - Deposit (Responses)"]
