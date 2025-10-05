# clasp Cheat Sheet - Investment Tracker

## 🔥 Git-First Workflow (Recommended)

### Quick Deploy (Commit + Push in one command)
```bash
cd ~/repo/investment-tracker
./deploy.sh
# This will:
# 1. Commit your changes to Git
# 2. Deploy to Google Apps Script
# 3. Show next steps
```

### If You Edited in Browser
```bash
./sync.sh
# This will:
# 1. Pull from Google Apps Script
# 2. Show what changed
# 3. Commit to Git
```

---

## Daily Workflow (Step by Step)

### 1. Edit Files Locally
```bash
cd ~/repo/investment-tracker
code invest.gs  # or any editor
```

### 2. Deploy (Git-First)
```bash
./deploy.sh
# Or manually:
git add invest.gs
git commit -m "Your change description"
clasp push
```

### 3. If Edited in Browser
```bash
./sync.sh
# Or manually:
clasp pull
git add invest.gs
git commit -m "Synced from browser"
```

### 4. Open in Browser
```bash
clasp open-script
```

### 5. View Logs
```bash
clasp logs
```

### 6. Push to GitHub
```bash
git push origin main
```

---

## Project Setup (Already Done!)

✅ Install clasp: `npm install -g @google/clasp`
✅ Login: `clasp login`
✅ Create project: `clasp create --title "Investment Tracker" --type standalone`
✅ Push script: `clasp push`

---

## Common Commands

| Command | Description |
|---------|-------------|
| `clasp push` | Upload local files to Google Apps Script |
| `clasp pull` | Download remote files to local |
| `clasp open-script` | Open Apps Script IDE in browser |
| `clasp logs` | View execution logs |
| `clasp status` | Check which files will be pushed |
| `clasp version` | Create a new version |
| `clasp versions` | List all versions |
| `clasp deployments` | List all deployments |

---

## Setting Up Triggers (In Browser)

After running `clasp open-script`, set up these triggers:

### 1. Weekly Report (Sunday 8-9am)
- Click ⏰ Triggers
- Add Trigger
- Function: `sendWeeklyPortfolioReport`
- Event: Time-driven → Week timer → Sunday → 8am-9am

### 2. Saturday Reminder (Saturday 10-11am)
- Function: `sendSaturdayReminder`  
- Event: Time-driven → Week timer → Saturday → 10am-11am

### 3. Auto-Timestamp (Saturday 6-7pm)
- Function: `addWeeklyTimestampRows`
- Event: Time-driven → Week timer → Saturday → 6pm-7pm

---

## Testing Functions

In the browser Apps Script editor:

1. Select function from dropdown (e.g., `testWeeklyReport`)
2. Click ▶ Run
3. Check execution log or your email

Test functions available:
- `testWeeklyReport()` - Test weekly report email
- `testSaturdayReminder()` - Test reminder email  
- `testWeeklyTimestampRows()` - Test auto-timestamp

---

## Connecting to Your Google Sheet

The script is **standalone** (not bound to a specific sheet).

To connect it to your sheet:

1. Open your Google Sheet
2. Copy the Spreadsheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. In your script, access it like this:
   ```javascript
   var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
   ```

**OR** use the current setup which uses:
```javascript
var ss = SpreadsheetApp.getActiveSpreadsheet();
```
(This requires the script to be run from the sheet or have proper authorization)

---

## Git Workflow

### Commit Changes
```bash
cd ~/repo/investment-tracker
git add .
git commit -m "Updated email template"
git push origin main
```

### Create Branch
```bash
git checkout -b feature/new-report
# Make changes
git commit -m "Added new report feature"
git push origin feature/new-report
```

---

## Troubleshooting

### Error: Script not authorized
- Run a function manually in browser first
- Click "Review Permissions" and authorize

### Error: Cannot find module
- Make sure you're in the project directory
- Check `.clasp.json` exists

### Changes not showing
- Make sure you ran `clasp push`
- Refresh browser if Apps Script editor is open
- Check `clasp status` to see pending changes

### Want to start fresh
```bash
# Pull latest from Google
clasp pull --force

# Or push local changes
clasp push --force
```

---

## Project Structure

```
~/repo/investment-tracker/
├── .clasp.json          # clasp configuration (DO NOT commit)
├── .gitignore           # Git ignore file
├── README.md            # Project documentation
├── CLASP_CHEATSHEET.md  # This file
├── appsscript.json      # Apps Script manifest
└── invest.gs            # Main script file
```

---

## Useful Links

- **Apps Script Editor**: https://script.google.com/d/1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf/edit
- **clasp Documentation**: https://github.com/google/clasp
- **Apps Script Reference**: https://developers.google.com/apps-script/reference

---

## Quick Tips

✅ **Always pull before editing** if you might have changed the script in browser
✅ **Test functions manually first** before setting up triggers
✅ **Check logs** with `clasp logs` when debugging
✅ **Use Git** to track all your changes
✅ **Comment your code** for future reference

---

## Email Configuration

Don't forget to update CONFIG in invest.gs:

```javascript
var CONFIG = {
  EMAIL_TO: 'yusufajarmoekti@gmail.com',  // ✅ Already configured
  SHEET_NAME: 'Sheet1',                   // Update to your sheet name
  HISTORY_SHEET_NAME: 'Portfolio_History',
  // ...
};
```

---

## Next Steps

1. ✅ clasp setup complete
2. 🔄 Open browser and set up triggers
3. 📧 Update CONFIG with your sheet name
4. 🧪 Test all three functions manually
5. ✅ Verify emails are sent correctly
6. 🎉 Let automation run weekly!

**Happy automating! 🚀**
