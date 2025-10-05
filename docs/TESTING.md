# Testing Guide

This document describes how to test the Investment Portfolio Tracker before and after making changes.

## Table of Contents

- [Overview](#overview)
- [Manual Testing](#manual-testing)
- [Test Functions](#test-functions)
- [Testing Checklist](#testing-checklist)
- [Common Test Scenarios](#common-test-scenarios)
- [Debugging Tips](#debugging-tips)
- [Future: Automated Testing](#future-automated-testing)

---

## Overview

Currently, this project uses **manual testing** in the Google Apps Script editor. All functions must be tested manually before deployment.

### Testing Philosophy

1. **Test locally first**: Always test in Apps Script editor before committing
2. **Test all affected functions**: If you change shared code, test all functions that use it
3. **Verify emails**: Check that emails arrive and render correctly
4. **Check spreadsheet**: Verify data is written/read correctly
5. **Review logs**: Check execution logs for errors or warnings

---

## Manual Testing

### Setup Test Environment

1. **Open Apps Script Editor**:
   ```bash
   invest-open
   ```

2. **Ensure Test Configuration**:
   - Use a test email address (or your personal email)
   - Use a copy of your production spreadsheet for testing
   - Keep the original CONFIG but test functions use different email

3. **Check Authorization**:
   - First time: Run any function to trigger authorization flow
   - Grant necessary permissions (Sheets, Gmail)

---

## Test Functions

### Available Test Functions

#### 1. Test Weekly Report

**Function**: `testWeeklyReport()`

**What it tests**:
- Portfolio data collection
- Trend calculation (week-over-week)
- Asset allocation calculations
- Email generation and sending
- HTML formatting

**How to run**:
```javascript
// In Apps Script editor
1. Select function: testWeeklyReport
2. Click Run
3. Check execution log
4. Check your email inbox
```

**Expected output**:
```
=== Testing Weekly Portfolio Report ===
Collecting portfolio data...
Found 15 assets
Calculating trends...
Week-over-week change: +2.5%
Generating email...
Email sent successfully to: your.email@example.com
Test complete!
```

**Verify**:
- [ ] Email received
- [ ] All portfolio data shown correctly
- [ ] Trends calculated accurately
- [ ] HTML renders properly (no broken formatting)
- [ ] Asset allocation percentages add up to 100%

---

#### 2. Test Saturday Reminder

**Function**: `testSaturdayReminder()`

**What it tests**:
- Reminder email generation
- Email sending

**How to run**:
```javascript
// In Apps Script editor
1. Select function: testSaturdayReminder
2. Click Run
3. Check execution log
4. Check your email inbox
```

**Expected output**:
```
=== Testing Saturday Reminder ===
Sending reminder email...
Email sent successfully to: your.email@example.com
Test complete!
```

**Verify**:
- [ ] Email received
- [ ] Reminder message is clear
- [ ] Subject line correct: "Reminder: Update Portfolio Values"

---

#### 3. Test Weekly Timestamp Rows

**Function**: `testWeeklyTimestampRows()`

**What it tests**:
- Row duplication with new timestamp
- Deduplication by Asset ID + Name
- Data validation preservation
- Formatting preservation

**How to run**:
```javascript
// In Apps Script editor
1. Select function: testWeeklyTimestampRows
2. Click Run
3. Check execution log
4. Check your spreadsheet
```

**Expected output**:
```
=== Testing Weekly Timestamp Row Addition ===
Reading current portfolio...
Found 15 unique assets
Duplicating rows with new timestamp...
Rows added: 15
Deduplicating by Asset ID + Asset Name...
Unique rows after dedup: 15
Preserving data validation...
✓ Validation preserved for 15 cells
Test complete!
```

**Verify**:
- [ ] New rows added with current timestamp
- [ ] No duplicate Asset ID + Name combinations
- [ ] Dropdown validation works in new rows
- [ ] Formatting (currency, percentage) preserved
- [ ] No data loss from original rows

---

#### 4. Test Validation Preservation

**Function**: `testValidationPreservation()`

**What it tests**:
- Data validation rules are correctly copied
- Dropdown lists work in new rows

**How to run**:
```javascript
// In Apps Script editor
1. Select function: testValidationPreservation
2. Click Run
3. Check execution log
4. Manually test dropdowns in new rows
```

**Expected output**:
```
=== Testing Validation Preservation ===
Checking Asset Type column (E)...
Source validation rule: List from range
Copying validation to new row...
✓ Validation copied successfully
Testing dropdown functionality...
✓ Dropdown values match source
Test complete!
```

**Verify**:
- [ ] Dropdown works in new rows
- [ ] Dropdown values match original
- [ ] Can select values from dropdown

---

## Testing Checklist

### Before Committing Code

- [ ] **All test functions pass** without errors
- [ ] **Execution logs** show expected output
- [ ] **Emails sent** and received correctly
- [ ] **Spreadsheet data** is accurate
- [ ] **No breaking changes** to existing functionality
- [ ] **Documentation updated** if behavior changed

### After Deployment

- [ ] **GitHub Actions passes** (green checkmark)
- [ ] **Manual test** in production environment
- [ ] **Monitor execution logs** for first few runs
- [ ] **Verify emails** in production

### Weekly Maintenance

- [ ] **Check execution logs** for automated runs
- [ ] **Verify emails** are being sent on schedule
- [ ] **Review spreadsheet data** for accuracy
- [ ] **Check for errors** in execution history

---

## Common Test Scenarios

### Scenario 1: Testing Email Changes

When modifying email templates or content:

1. **Run test function**:
   ```javascript
   testWeeklyReport()
   ```

2. **Verify email content**:
   - [ ] Subject line correct
   - [ ] Greeting personalized
   - [ ] Data displays correctly
   - [ ] HTML renders properly
   - [ ] Links work (if any)
   - [ ] Mobile-friendly formatting

3. **Test edge cases**:
   - Empty portfolio (no data)
   - Single asset
   - Many assets (50+)
   - Negative values
   - Large numbers (millions)

---

### Scenario 2: Testing Data Processing

When modifying calculations or data processing:

1. **Prepare test data**:
   - Create test spreadsheet with known values
   - Include edge cases (zero, negative, very large)

2. **Run function manually**:
   ```javascript
   // In Apps Script editor, step through code
   var data = getCurrentPortfolio();
   Logger.log(data); // Inspect data structure
   
   var trends = calculateTrends(data);
   Logger.log(trends); // Verify calculations
   ```

3. **Verify calculations**:
   - [ ] Percentages sum to 100%
   - [ ] Negative values handled correctly
   - [ ] Division by zero prevented
   - [ ] Rounding errors minimized

---

### Scenario 3: Testing Triggers

When testing time-based triggers:

1. **Disable production triggers** temporarily
2. **Create test trigger** (run in 5 minutes)
3. **Monitor execution**:
   - Check Apps Script dashboard
   - Review execution logs
   - Verify expected outcome

4. **Re-enable production triggers** after testing

---

## Debugging Tips

### Check Execution Logs

**View logs in Apps Script editor**:
1. Click "Executions" icon (list with clock)
2. Find recent execution
3. Click to view logs and errors

**Common log commands**:
```javascript
Logger.log('Variable value:', myVariable);
Logger.log('Data structure:', JSON.stringify(data, null, 2));
console.log('Debug info:', debugInfo); // Shows in Stackdriver
```

### Debug Email Issues

**Test email sending**:
```javascript
function debugEmail() {
  var subject = 'Test Email';
  var body = 'This is a test';
  
  try {
    MailApp.sendEmail({
      to: CONFIG.EMAIL_TO,
      subject: subject,
      htmlBody: body
    });
    Logger.log('✓ Email sent successfully');
  } catch (error) {
    Logger.log('✗ Email failed:', error.message);
  }
}
```

### Debug Spreadsheet Issues

**Test spreadsheet access**:
```javascript
function debugSpreadsheet() {
  try {
    var ss = getSpreadsheet();
    Logger.log('✓ Spreadsheet accessed:', ss.getName());
    
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    Logger.log('✓ Sheet accessed:', sheet.getName());
    
    var data = sheet.getDataRange().getValues();
    Logger.log('✓ Data retrieved:', data.length, 'rows');
  } catch (error) {
    Logger.log('✗ Spreadsheet error:', error.message);
  }
}
```

### Debug Data Validation

**Inspect validation rules**:
```javascript
function debugValidation() {
  var sheet = getSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  var range = sheet.getRange(2, CONFIG.COL_ASSET_TYPE); // First data row
  var rule = range.getDataValidation();
  
  if (rule) {
    Logger.log('✓ Validation exists');
    Logger.log('Type:', rule.getCriteriaType());
    Logger.log('Values:', rule.getCriteriaValues());
  } else {
    Logger.log('✗ No validation found');
  }
}
```

---

## Future: Automated Testing

### Planned Improvements

**Unit Tests**:
```javascript
// Future: Jest or similar testing framework
describe('Portfolio Calculations', () => {
  test('calculates total value correctly', () => {
    const portfolio = [
      { asset: 'BTC', amount: 1000 },
      { asset: 'ETH', amount: 2000 }
    ];
    expect(calculateTotal(portfolio)).toBe(3000);
  });
  
  test('handles empty portfolio', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

**Integration Tests**:
```javascript
// Future: Test with mock Google Sheets API
test('reads portfolio data from spreadsheet', async () => {
  const mockSheet = createMockSheet();
  const data = await getCurrentPortfolio(mockSheet);
  expect(data.length).toBeGreaterThan(0);
});
```

**Email Template Tests**:
```javascript
// Future: Validate HTML structure
test('email template renders correctly', () => {
  const html = generateEmailHTML(mockData);
  expect(html).toContain('<table');
  expect(html).toContain('Total Value');
  expect(html).not.toContain('undefined');
});
```

### CI/CD Testing

**Planned GitHub Actions tests**:
- Syntax validation (eslint)
- JSON schema validation
- Email template validation
- Mock API testing

---

## Questions or Issues?

If you encounter testing issues:

1. **Check execution logs** first
2. **Review error messages** carefully
3. **Search existing issues** on GitHub
4. **Open new issue** with:
   - Test function name
   - Expected behavior
   - Actual behavior
   - Execution logs
   - Error messages

---

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Development workflow
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [README.md](../README.md) - Project overview
