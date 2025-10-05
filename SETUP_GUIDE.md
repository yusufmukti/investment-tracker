# 🚀 Investment Tracker - Setup Guide

## ⚠️ IMPORTANT: Spreadsheet ID Configuration

Since this is a **standalone script** (not bound to a specific sheet), you **MUST** configure your spreadsheet ID.

---

## 📋 Step-by-Step Setup

### Step 1: Get Your Spreadsheet ID

1. Open your Google Sheet with investment data
2. Look at the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. Copy the **SPREADSHEET_ID** part

**Example:**
```
https://docs.google.com/spreadsheets/d/1abc123XYZ456-your-id-here/edit
                                      ^^^^^^^^^^^^^^^^^^^^^^^^
                                      This is your SPREADSHEET_ID
```

---

### Step 2: Add Spreadsheet ID to Script

**Option A: Edit Locally (Recommended)**

1. Open `invest.gs` in your editor:
   ```bash
   cd ~/repo/investment-tracker
   code invest.gs
   ```

2. Find the CONFIG section (around line 29):
   ```javascript
   var CONFIG = {
     EMAIL_TO: 'yusufajarmoekti@gmail.com',
     SPREADSHEET_ID: '', // REQUIRED: Add your Google Sheets ID here!
   ```

3. Paste your spreadsheet ID:
   ```javascript
   SPREADSHEET_ID: '1abc123XYZ456-your-id-here',
   ```

4. Push changes:
   ```bash
   clasp push
   ```

**Option B: Edit in Browser**

1. Open the script:
   ```bash
   clasp open-script
   ```

2. Find the CONFIG section and add your SPREADSHEET_ID

3. Click Save (💾)

---

### Step 3: Verify Configuration

1. Open the Apps Script editor (browser)

2. Select function: **`verifySetup`**

3. Click **Run** (▶)

4. **Authorize permissions** when prompted:
   - Click "Review Permissions"
   - Choose your account
   - Click "Advanced" → "Go to Investment Tracker (unsafe)"
   - Click "Allow"

5. Check the execution log - you should see:
   ```
   ✅ SPREADSHEET_ID configured
   ✅ Successfully opened spreadsheet
   ✅ Found sheet: Sheet1
   ✅ Email configured
   ✅ Test email sent successfully!
   🎉 All checks passed!
   ```

6. **Check your email** - you should receive a test email

---

### Step 4: Set Up Triggers

After verification succeeds, set up automated triggers:

1. Click **⏰ Triggers** (clock icon on left sidebar)

2. Click **+ Add Trigger** (bottom right)

3. **Create 3 triggers:**

#### Trigger 1: Weekly Portfolio Report
- **Function**: `sendWeeklyPortfolioReport`
- **Event source**: Time-driven
- **Type of time-based trigger**: Week timer
- **Day of week**: Sunday
- **Time of day**: 8am to 9am
- Click **Save**

#### Trigger 2: Saturday Reminder
- **Function**: `sendSaturdayReminder`
- **Event source**: Time-driven
- **Type of time-based trigger**: Week timer
- **Day of week**: Saturday  
- **Time of day**: 10am to 11am
- Click **Save**

#### Trigger 3: Auto-Timestamp
- **Function**: `addWeeklyTimestampRows`
- **Event source**: Time-driven
- **Type of time-based trigger**: Week timer
- **Day of week**: Saturday
- **Time of day**: 6pm to 7pm
- Click **Save**

---

### Step 5: Test Functions Manually

Before letting automation run, test each function:

#### Test 1: Weekly Report
- Select function: `testWeeklyReport`
- Click **Run** (▶)
- Check your email for the weekly report

#### Test 2: Saturday Reminder
- Select function: `testSaturdayReminder`
- Click **Run** (▶)
- Check your email for the reminder

#### Test 3: Auto-Timestamp
- Select function: `testWeeklyTimestampRows`
- Click **Run** (▶)
- Check your spreadsheet - new rows should be added
- Check your email for confirmation

---

## ✅ Verification Checklist

- [ ] Spreadsheet ID added to CONFIG
- [ ] `verifySetup()` runs successfully
- [ ] Test email received
- [ ] All 3 triggers created
- [ ] `testWeeklyReport()` works - email received
- [ ] `testSaturdayReminder()` works - email received
- [ ] `testWeeklyTimestampRows()` works - rows added + email received
- [ ] Checked Apps Script execution log for errors

---

## 🐛 Troubleshooting

### Error: "Cannot read properties of null (reading 'getSheetByName')"

**Cause**: SPREADSHEET_ID not configured

**Fix**: Add your spreadsheet ID to CONFIG as shown in Step 2

---

### Error: "Spreadsheet not found"

**Cause**: Wrong spreadsheet ID or no access

**Fix**:
1. Double-check the spreadsheet ID
2. Make sure you have access to the spreadsheet
3. Make sure you're logged in with the correct Google account

---

### Error: "Sheet 'Sheet1' not found"

**Cause**: Sheet name doesn't match CONFIG.SHEET_NAME

**Fix**: Update CONFIG.SHEET_NAME to match your actual sheet name:
```javascript
SHEET_NAME: 'Your Actual Sheet Name',
```

---

### No email received

**Cause**: Email address not configured or script not authorized

**Fix**:
1. Check CONFIG.EMAIL_TO is correct
2. Run `verifySetup()` to authorize
3. Check spam folder
4. Check Apps Script execution log for errors

---

### Dropdown not working after auto-timestamp

**Cause**: Reference row (row 2) doesn't have dropdown

**Fix**: Make sure row 2 of your spreadsheet has the dropdown validation in column E

---

## 📊 Expected Sheet Structure

Your Google Sheet should have:

| Column | Header | Type | Example |
|--------|--------|------|---------|
| A | effective_timestamp | Date/Time | 02-10-2025 18:04:54 |
| B | asset_id | Text | Time Deposit |
| C | asset_name | Text | Deposito Superbank |
| D | asset_amount | Number | Rp72,525,847 |
| E | asset_type | Dropdown | Savings |
| F | description | Text | Undefined |

---

## 🎯 What Happens After Setup

### Saturday 10am:
- 📧 Reminder email sent to update your portfolio

### Saturday 6pm:
- 🔄 All portfolio rows duplicated with fresh timestamp
- 📧 Confirmation email sent with statistics

### Sunday 8am:
- 📊 Weekly portfolio report email sent
- 📈 Includes trends, allocation, top holdings

---

## 🔐 Security Notes

- Your spreadsheet ID is stored in the script (not in Git)
- Script runs with your Google account permissions
- Only you have access to the script and data
- Emails sent only to configured address

---

## 📞 Support

If you encounter issues:

1. Check execution log: **View → Execution log** in Apps Script editor
2. Run `verifySetup()` to diagnose
3. Review error messages carefully
4. Check CLASP_CHEATSHEET.md for common commands

---

## 🎉 Success!

Once all tests pass and triggers are set up, you're done! 

Your portfolio will be automatically tracked and reported every week. 🚀

---

**Last Updated**: October 5, 2025
