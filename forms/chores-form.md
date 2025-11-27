# ✅ Chores Form Setup Guide

## Overview
The Chores Form allows kids to submit completed chores for approval. Parents review and approve, then the system automatically posts the payment.

---

## ⚡ Automatic Creation (Recommended)

**Use `/apps-script/setupForms.gs` to create this form automatically!**

1. Add `setupForms.gs` to your Apps Script project
2. Run `createAllForms()`
3. All 3 forms created instantly with kid names and chore list populated!

See [SETUP.md](../SETUP.md) for details.

---

## 📝 Manual Creation (Alternative)

**Only use this if you need to customize beyond the automatic setup.**

### Creating the Form

### Step 1: Create New Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Click "+ Blank" to create a new form
3. Name it: **"Kids Bank - Chore Submission"**
4. Add description: *"Submit your completed chores here to earn money!"*

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

#### Question 2: Which Chore
- **Type**: Dropdown or Multiple choice
- **Question**: "Which chore did you complete?"
- **Options** (customize for your family):
  - Wash dishes ($5)
  - Clean room ($7)
  - Take out trash ($3)
  - Vacuum living room ($6)
  - Feed pet ($2)
  - Make bed ($1)
  - Homework without asking ($4)
  - Help with laundry ($5)
  - Yard work ($10)
  - Other (specify below)
- **Required**: Yes

#### Question 3: If "Other" - Specify
- **Type**: Short answer
- **Question**: "If you selected 'Other', what chore did you do?"
- **Description**: "Describe the chore and suggested amount"
- **Required**: No (only if "Other" was selected)
- **Show based on**: Previous answer = "Other"

#### Question 4: Proof (Optional)
- **Type**: File upload
- **Question**: "Upload a photo showing the completed chore (optional)"
- **Description**: "Take a picture of your clean room, washed dishes, etc."
- **File types**: Images only
- **Max files**: 1
- **Max size**: 10 MB
- **Required**: No

#### Question 5: Notes
- **Type**: Short answer
- **Question**: "Anything else we should know?"
- **Description**: "Optional: Was it extra hard? Did you do extra?"
- **Required**: No

---

### Step 3: Configure Form Settings

1. Click the **Settings** gear icon (⚙️) at top right
2. Under **Responses**:
   - ✅ Check "Collect email addresses" (optional)
   - ✅ Check "Response receipts" → "Always"
   - ✅ Check "Limit to 1 response" (kids can submit again after clearing cookies)
3. Under **Presentation**:
   - ✅ Check "Show progress bar"
   - Set confirmation message: *"Chore submitted! Your parents will review it soon. Keep up the great work! 🌟"*

---

### Step 4: Link to Spreadsheet

1. Click the **Responses** tab in your form
2. Click the Google Sheets icon (📊)
3. Select **"Select existing spreadsheet"**
4. Choose your **"Kids Virtual Bank"** spreadsheet
5. Click **"Select"**

This creates a sheet like "Kids Bank - Chore Submission (Responses)"

---

### Step 5: Create Chore Values Reference

In your spreadsheet, you can create a "Chore Values" sheet:

| Chore | Value |
|-------|-------|
| Wash dishes | $5.00 |
| Clean room | $7.00 |
| Take out trash | $3.00 |
| Vacuum living room | $6.00 |
| Feed pet | $2.00 |
| Make bed | $1.00 |
| Homework without asking | $4.00 |
| Help with laundry | $5.00 |
| Yard work | $10.00 |

The script will automatically pull values from the form submission.

---

## Form Preview

```
═══════════════════════════════════════
    ✅ Kids Bank - Chore Submission
    Submit your completed chores here to earn money!
═══════════════════════════════════════

1. What's your name? *
   ○ Martin
   ○ Daniel
   
2. Which chore did you complete? *
   [Dropdown menu]
   • Wash dishes ($5)
   • Clean room ($7)
   • Take out trash ($3)
   • Vacuum living room ($6)
   • Feed pet ($2)
   • Make bed ($1)
   • Homework without asking ($4)
   • Help with laundry ($5)
   • Yard work ($10)
   • Other (specify below)
   
3. If you selected 'Other', what chore did you do?
   [ Describe the chore and suggested amount ]
   
4. Upload a photo showing the completed chore (optional)
   [📎 Choose file]
   
5. Anything else we should know?
   [ Optional notes ]
   
   [Submit]
═══════════════════════════════════════
```

---

## Setting Up the Approval Workflow

### In the Chores Sheet
1. Open your "Chores" sheet
2. Ensure these columns exist:
   - A: Timestamp
   - B: Kid
   - C: Chore
   - D: Value
   - E: Approved? (Yes/No)
   - F: Posted? (Yes/blank)

### Manual Approval Process
1. Kids submit chores via form
2. Script imports to Chores sheet every 5 minutes
3. "Approved?" column defaults to "No"
4. Parents review and change to "Yes"
5. Script automatically posts payment
6. "Posted?" column marked as "Yes"

---

## Chore Management Tips

### Setting Fair Prices
**Age-Appropriate:**
- Ages 5-7: $1-3 per chore
- Ages 8-10: $3-7 per chore
- Ages 11+: $5-10 per chore

**Effort-Based:**
- Quick tasks (< 5 min): $1-2
- Medium tasks (5-15 min): $3-5
- Long tasks (15-30 min): $6-10
- Major tasks (30+ min): $10-20

### Bonus Chores
Create special high-value chores:
- Deep clean garage: $25
- Babysit sibling: $10/hour
- Help with big project: $15-30
- Cook dinner: $8
- Organize closet: $12

---

## Sharing the Form

### Make it Easy for Kids
1. **Shorten URL**: Click Send → Link → Shorten
2. **Create QR Code**: Use qr-code-generator.com
3. **Print Chore Chart**: Include QR code at bottom
4. **Bookmark on Devices**: Add to tablets/phones
5. **Home Screen Icon**: Instructions in Withdrawal Form guide

---

## Parent Dashboard Integration

### Quick Review Area
Add a section in your Dashboard sheet:

```
A1: Pending Chore Approvals

A2: Kid      B2: Chore    C2: Value    D2: Approve?
[Formula to show unapproved chores from Martin and Daniel]
```

**Formula for Pending Chores:**
```excel
=QUERY(Chores!A:F, "SELECT B, C, D WHERE E='No' OR E=false", 1)
```

---

## Automation Details

### How It Works
1. **Every 5 minutes**: `importChoreFormResponses()` runs
   - Checks form response sheet
   - Finds new submissions (not marked "Imported?")
   - Adds to Chores sheet with "Approved? = No"
   - Marks form response as "Imported?"

2. **Every 5 minutes**: `processApprovedChores()` runs
   - Checks Chores sheet
   - Finds rows where "Approved? = Yes" and "Posted? ≠ Yes"
   - Adds transaction to Transactions sheet
   - Marks chore as "Posted? = Yes"

3. **Result**: Money appears in kid's ledger automatically!

---

## Quality Control

### Photo Verification (If Using File Upload)
- Parents can click photo link in response sheet
- Verify chore quality before approving
- Teach kids good work habits

### Rejection Process
If chore wasn't done well:
1. Leave "Approved?" as "No"
2. Add note in separate column
3. Talk to kid about quality
4. Kid must redo and resubmit

### Partial Credit
For partially completed chores:
1. Change the Value amount (reduce it)
2. Then approve
3. Explain to kid why value was reduced

---

## Teaching Moments

Use the chore system to teach:

**Work Ethic:**
- Quality matters, not just completion
- Take pride in your work
- Attention to detail pays off

**Responsibility:**
- Complete what you start
- Don't wait to be asked
- Consistency builds trust

**Economics:**
- Time = money
- Harder work = more pay
- Skills improve earning potential
- Save vs spend decisions

---

## Common Scenarios

### "I did the chore but forgot to submit!"
- Submit as soon as you remember
- Add note explaining timing
- Parent can verify and approve

### "Can I do the same chore multiple times?"
- Yes! (if allowed by family rules)
- Daily chores (dishes, pet care) can be repeated
- Weekly chores (room cleaning) might be once/week

### "The chore took longer than expected!"
- Add note in form
- Parents can adjust value
- Learn to estimate time better

### "Can I split a big chore?"
- Yes, break into smaller tasks
- Submit each part separately
- Or complete fully for full amount

---

## Gamification Ideas

### Chore Challenges
- **Speed Bonus**: Complete in under X minutes for extra $1
- **Quality Bonus**: Extra $2 for exceptional work
- **Streak Bonus**: 5 days in a row = bonus $5
- **Team Bonus**: Both kids work together = bonus for each

### Achievement Badges (Track in separate sheet)
- 🏆 First Chore
- 🌟 10 Chores Complete
- 💯 Perfect Week (all chores done)
- 🚀 $100 Earned
- 🎯 Consistency Award (4 weeks straight)

---

## Advanced Features

### Recurring Chores
Set up daily/weekly chores that auto-populate:
- Feed pet daily: $2/day
- Make bed daily: $1/day
- Weekly room clean: $7/week

### Chore Schedule
Create a weekly chore schedule:
```
Monday: Alice - Dishes, Bob - Trash
Tuesday: Bob - Dishes, Alice - Trash
...
```

Kids submit when complete.

### Chore Trading
Allow kids to trade chores:
- Both submit who did what
- Parent approves the swap
- Payments go to whoever actually did it

---

## Troubleshooting

### Chore appears in responses but not Chores sheet
- Check if script is running (see trigger status)
- Run `importChoreFormResponses()` manually
- Verify response sheet has data

### Payment not posting after approval
- Make sure "Approved?" says exactly "Yes"
- Check "Posted?" column isn't already "Yes"
- Run `processApprovedChores()` manually
- Check Apps Script logs for errors

### Kids can't access form
- Check sharing settings (Anyone with link)
- Verify URL is correct
- Try opening in incognito mode

---

## Printable Chore Chart

Create a visual chart for younger kids:

```
═══════════════════════════════════════
         🏠 FAMILY CHORE CHART 🏠
═══════════════════════════════════════

DAILY CHORES:
□ Make bed ................ $1
□ Feed pet ................ $2
□ Homework ................ $4

WEEKLY CHORES:
□ Clean room .............. $7
□ Help with laundry ....... $5

ANYTIME CHORES:
□ Wash dishes ............. $5
□ Vacuum .................. $6
□ Take out trash .......... $3
□ Yard work ............... $10

[QR CODE]
Scan to submit your chore!

═══════════════════════════════════════
```

---

## Next Steps

1. ✅ Test the form with each kid
2. ✅ Do a practice chore submission
3. ✅ Practice approving a chore
4. ✅ Verify payment appears in ledger
5. ✅ Create and print chore chart
6. ✅ Establish family chore rules

---

**Form URL**: [Paste your form URL here after creating]

**Response Sheet Name**: [Paste sheet name here, e.g., "Kids Bank - Chore Submission (Responses)"]

**QR Code**: [Generate and save QR code image here]

**Chore Values Updated**: [Date of last chore list update]
