# Investment Portfolio Tracker

[![Deploy to Google Apps Script](https://github.com/yusufmukti/investment-tracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/yusufmukti/investment-tracker/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yusufmukti/investment-tracker)

> Automatically track your investments and receive weekly email reports with performance insights

## What It Does

This tool helps you track your investment portfolio automatically. Every week, you'll receive an email with:

- Total portfolio value and how it changed from last week
- Asset breakdown showing how your money is distributed
- Top holdings ranked by value
- Performance trends to see if you're gaining or losing

### Weekly Schedule

- **Saturday 10am**: Reminder email to update your portfolio values
- **Saturday 6pm**: System automatically saves a snapshot of your portfolio
- **Sunday 8am**: Receive your weekly performance report via email

## Getting Started

### What You Need

1. A Google account
2. A Google Spreadsheet to track your investments
3. Basic familiarity with Google Sheets

### Quick Setup

```bash
# Install clasp (Google Apps Script CLI)
npm install -g @google/clasp@3.0.6-alpha

# Authenticate with Google
clasp login

# Clone the repository
git clone https://github.com/yusufmukti/investment-tracker.git
cd investment-tracker

# Deploy to your account
clasp push
```

## Configuration

Open `invest.gs` and update these settings:

```javascript
const CONFIG = {
  SPREADSHEET_ID: 'your-spreadsheet-id-here',
  EMAIL_TO: 'your-email@example.com',
  SHEET_NAME: 'Portfolio',
  
  // Column numbers (1-based)
  TIMESTAMP_COL: 1,
  ASSET_ID_COL: 2,
  ASSET_NAME_COL: 3,
  BROKER_COL: 4,
  DROPDOWN_COL: 5,
  VALUE_COL: 6,
};
```

### Finding Your Spreadsheet ID

From your spreadsheet URL:
```
https://docs.google.com/spreadsheets/d/1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg/edit
                                      ↑ This is your SPREADSHEET_ID ↑
```

## Spreadsheet Structure

Create a Google Spreadsheet with these columns:

| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| Timestamp | Asset ID | Asset Name | Broker | Asset Type | Value |
| 2025-10-26 | BTC001 | Bitcoin | Coinbase | Crypto | 50000000 |

**Important**: Row 2 should have dropdown validation in Column E (Asset Type).

## Setting Up Automation

1. Open the Apps Script editor
2. Click the clock icon (Triggers)
3. Add these three triggers:

| Function | Trigger Type | Schedule |
|----------|-------------|----------|
| `sendWeeklyPortfolioReport` | Time-driven | Weekly, Sunday 8-9am |
| `sendSaturdayReminder` | Time-driven | Weekly, Saturday 10-11am |
| `addWeeklyTimestampRows` | Time-driven | Weekly, Saturday 6-7pm |

## Testing

Run these functions manually before setting up automation:

```javascript
// Test connection and permissions
verifySetup()

// Test weekly report email
testWeeklyReport()

// Test reminder email
testSaturdayReminder()

// Test snapshot creation
testWeeklyTimestampRows()
```

## Features

### Automated Weekly Reports

Every Sunday morning, receive an email with:
- Total portfolio value
- Week-over-week change (percentage and amount)
- Asset allocation breakdown
- Top 5 holdings
- Performance summary

### Automatic Snapshots

Every Saturday evening at 6pm:
- Duplicates all portfolio rows with new timestamp
- Removes duplicates (same Asset ID + Name)
- Preserves dropdown menus and formatting
- Maintains historical data for trend analysis

### Smart Reminders

Every Saturday morning at 10am:
- Sends reminder to update portfolio values
- Ensures fresh data for Sunday's report

### Version Tracking

The script includes version management:
- Tracks deployment timestamp and commit hash
- Detects manual edits in Apps Script console
- Sends alert email if unauthorized changes detected

## Troubleshooting

### Emails Not Arriving

- Check email address in CONFIG
- Look in spam/junk folder
- Free Google accounts limited to 100 emails per day
- Test: `MailApp.sendEmail('your-email@example.com', 'Test', 'Testing')`

### Spreadsheet Not Found

- Verify SPREADSHEET_ID is correct
- Ensure you own the spreadsheet (same Google account)
- Run `verifySetup()` to diagnose

### No New Rows Created

- Check triggers are set up correctly
- Rows may already exist for this week (no duplicates)
- Verify sheet name matches CONFIG.SHEET_NAME
- Test manually: `testWeeklyTimestampRows()`

### Dropdown Menu Missing

- Row 2 must have dropdown in Column E
- Never delete Row 2 (it's the template)
- Script copies validation from Row 2 to new rows

## Git-First Workflow

All code changes should be committed to Git before deployment:

```bash
# 1. Edit code locally
vim invest.gs

# 2. Commit to Git
git add invest.gs
git commit -m "feat: add new feature"

# 3. Deploy to Apps Script
clasp push

# 4. Push to GitHub
git push origin main
```

This enables:
- Easy rollback using `git checkout`
- Complete version history
- Safe experimentation with branches
- Code review via Pull Requests

## Customization

### Email Content

Edit these sections in `invest.gs`:

```javascript
// Subject line
const REPORT_SUBJECT = 'Weekly Portfolio Report - ' + new Date().toLocaleDateString();

// Reminder message
const REMINDER_SUBJECT = 'Reminder: Update Portfolio Values';
```

### Asset Groups

Define how assets are grouped in reports:

```javascript
function getAssetTypeGroup(assetType) {
  const groups = {
    'Cryptocurrency': 'Crypto',
    'Bitcoin': 'Crypto',
    'Stocks': 'Stocks',
    'ETF': 'Stocks',
    'Gold': 'Gold',
    'Savings': 'Cash',
  };
  return groups[assetType] || 'Other';
}
```

## FAQ

**Q: Do I need programming knowledge?**  
A: No. Just follow the setup instructions and update your spreadsheet weekly.

**Q: Is my data safe?**  
A: Yes. The script runs under your Google account. No data is shared with anyone else.

**Q: Can I customize the email format?**  
A: Yes. The template is in the `sendWeeklyPortfolioReport()` function.

**Q: What if I forget to update values?**  
A: You'll get a reminder on Saturday at 10am.

**Q: Can I change the schedule?**  
A: Yes. Edit the triggers in the script editor.

**Q: How do I undo a mistake?**  
A: Use Git: `git log --oneline`, then `git checkout <commit-hash>`, then `clasp push`.

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

Current version: 1.0.0

## License

MIT License - Free for personal use

---

**Last updated: October 2025**
