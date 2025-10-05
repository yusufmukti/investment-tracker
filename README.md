# Investment Tracker - Google Apps Script

Automated investment portfolio tracking and reporting system using Google Apps Script.

## Features

- 📊 **Weekly Portfolio Report** - Automated email reports every Sunday
- ⏰ **Saturday Reminder** - Reminder to update values before weekly report
- 🕐 **Auto-Timestamp** - Automatically duplicates portfolio rows every Saturday at 18:00
- 📈 **Portfolio Analytics** - Asset allocation, trends, and performance tracking
- ✅ **Deduplication** - Keeps only the most recent entry per asset
- 🎨 **Format Preservation** - Maintains all cell formatting including dropdowns

## Setup

### Prerequisites
- Google Account with access to Google Sheets
- Node.js and npm (for clasp)
- clasp installed globally: `npm install -g @google/clasp`

### Installation

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd investment-tracker
   ```

2. Login to clasp:
   ```bash
   clasp login
   ```

3. Link to your Google Sheets:
   - Open your Google Sheet
   - Copy the spreadsheet ID from the URL
   - Update `CONFIG.SHEET_NAME` in `invest.gs`

4. Push to Google Apps Script:
   ```bash
   clasp push
   ```

5. Open in browser:
   ```bash
   clasp open
   ```

### Setting Up Triggers

In the Apps Script editor:

1. **Weekly Report** (Sunday 8-9am):
   - Function: `sendWeeklyPortfolioReport`
   - Event: Time-driven → Week timer → Sunday → 8am-9am

2. **Saturday Reminder** (Saturday 10-11am):
   - Function: `sendSaturdayReminder`
   - Event: Time-driven → Week timer → Saturday → 10am-11am

3. **Auto-Timestamp** (Saturday 6-7pm):
   - Function: `addWeeklyTimestampRows`
   - Event: Time-driven → Week timer → Saturday → 6pm-7pm

## Configuration

Edit the `CONFIG` object in `invest.gs`:

```javascript
var CONFIG = {
  EMAIL_TO: 'your-email@gmail.com',
  SHEET_NAME: 'Sheet1',
  HISTORY_SHEET_NAME: 'Portfolio_History',
  // Column mappings...
};
```

## Spreadsheet Format

Your Google Sheet should have these columns:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| effective_timestamp | asset_id | asset_name | asset_amount | asset_type | description |

Example:
```
02-10-2025 18:04:54 | Time Deposit | Deposito Superbank | Rp72,525,847 | Savings | Undefined
```

## Development Workflow

### Local Development

1. Edit files locally in your favorite editor
2. Push changes to Google Apps Script:
   ```bash
   clasp push
   ```

3. Pull remote changes (if edited in browser):
   ```bash
   clasp pull
   ```

4. Open in browser to test:
   ```bash
   clasp open
   ```

### Testing Functions

Run test functions manually:
- `testWeeklyReport()` - Test weekly report email
- `testSaturdayReminder()` - Test reminder email
- `testWeeklyTimestampRows()` - Test auto-timestamp feature

### Viewing Logs

```bash
clasp logs
```

Or use `Logger.log()` in your code and view in Apps Script editor.

## Features Details

### Auto-Timestamp (Saturday 18:00)
- Duplicates all portfolio rows with fresh timestamps
- Deduplicates by Asset ID + Asset Name combination
- Preserves all formatting (dropdowns, colors, fonts)
- Sends confirmation email with statistics

### Weekly Report (Sunday 8am)
- Executive summary with total portfolio value
- Week-over-week comparison
- Asset allocation breakdown with visual charts
- Top 5 holdings
- Historical trend (last 8 weeks)
- Detailed holdings by asset type

### Saturday Reminder (Saturday 10am)
- Reminds you to update portfolio values
- Shows current portfolio snapshot
- Includes checklist of tasks
- Direct link to spreadsheet

## Security

- All data stays in your Google account
- OAuth2 authentication required
- No external services or third-party access
- Email sent only to configured address

## Troubleshooting

### Script not running
- Check trigger permissions in Apps Script
- Verify email address in CONFIG
- Check Apps Script execution logs

### Dropdown not copied
- Ensure reference row (row 2) has dropdown
- Check data validation in original rows

### Timestamp format issues
- Format is copied from source rows
- Ensure consistent format in Column A

## License

MIT License - Feel free to use and modify

## Author

Yusuf Mukti (yusufajarmoekti@gmail.com)

## Support

For issues or questions, check the [Apps Script documentation](https://developers.google.com/apps-script) or contact the author.
