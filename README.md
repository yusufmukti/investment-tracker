# Investment Portfolio Tracker

Automated Google Apps Script for weekly investment portfolio tracking and reporting with Git-first version control workflow.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Features](#features)
- [Setup](#setup)
- [Workflow](#workflow)
- [Commands](#commands)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture)

---

## Overview

This project automates weekly investment portfolio tracking with:
- Weekly email reports with analytics and trends
- Automatic row duplication with timestamps
- Email reminders before reports
- Git-first deployment workflow for safe version control

**Key Principle:** All code changes are committed to Git before deployment, enabling easy rollback and proper version history.

---

## Quick Start

### 1. Reload Shell
```bash
source ~/.zshrc
```

### 2. Verify Setup
```bash
invest-open
```

In the Apps Script editor:
- Select function: `verifySetup`
- Click Run
- Authorize permissions (first time only)
- Verify success messages in execution log

### 3. Configure Triggers

Set up time-based triggers in Apps Script editor (click Triggers icon):

| Function | Schedule | Time |
|----------|----------|------|
| `sendWeeklyPortfolioReport` | Weekly | Sunday 8-9am |
| `sendSaturdayReminder` | Weekly | Saturday 10-11am |
| `addWeeklyTimestampRows` | Weekly | Saturday 6-7pm |

### 4. Test Functions

Run these test functions manually to verify:
- `testWeeklyReport()`
- `testSaturdayReminder()`
- `testWeeklyTimestampRows()`

---

## Features

### Automated Functions

**Weekly Portfolio Report** (Sunday 8am)
- Email with portfolio analytics
- Week-over-week trends
- Asset allocation breakdown
- Performance summary

**Saturday Reminder** (Saturday 10am)
- Reminder email to update values
- Sent before Sunday report generation

**Weekly Timestamp Rows** (Saturday 6pm)
- Duplicates all portfolio rows with fresh timestamp
- Deduplicates by Asset ID + Asset Name
- Preserves dropdown validation and formatting

### Git-First Workflow

- Version control before deployment (not after)
- Easy rollback using `git checkout`
- Safe experimentation with branches
- Complete development history
- Automated deployment scripts with safety checks

---

## Setup

### Prerequisites

```bash
# Install clasp globally
npm install -g @google/clasp

# Authenticate with Google
clasp login
```

### Initial Configuration

1. Clone or navigate to project:
   ```bash
   cd ~/repo/investment-tracker
   ```

2. Configure spreadsheet ID in `invest.gs`:
   ```javascript
   const CONFIG = {
     SPREADSHEET_ID: 'your-spreadsheet-id-here',
     EMAIL_TO: 'your-email@example.com',
     // ...
   };
   ```

3. Install shell aliases:
   ```bash
   ./scripts/setup-aliases.sh
   source ~/.zshrc
   ```

4. Deploy initial version:
   ```bash
   ./scripts/deploy.sh
   ```

### Spreadsheet Setup

Your spreadsheet should have columns:
- Column A: Timestamp
- Column B: Asset ID
- Column C: Asset Name
- Column D: Broker
- Column E: Dropdown (Asset Type, etc.)
- Column F: Value

Row 2 must contain reference formatting (especially dropdown in column E).

---

## Workflow

### Making Changes Locally

```bash
# 1. Navigate to project
invest

# 2. Edit code
invest-edit

# 3. Deploy (commits to Git first)
invest-deploy

# 4. Test in browser
invest-open

# 5. Push to remote (optional)
git push origin main
```

### After Editing in Browser

```bash
# 1. Sync from Google Apps Script
invest-sync

# 2. Push to remote (optional)
git push origin main
```

### Workflow Comparison

**Git-First (Current):**
```
Edit → Git Commit → Deploy → Git Push
```
Benefits: Code is versioned before deployment, easy rollback, complete history

**Deploy-First (Avoid):**
```
Edit → Deploy → Git Commit → Git Push
```
Problems: Code goes live before version control, difficult rollback

---

## Commands

### Installed Aliases

```bash
invest          # cd ~/repo/investment-tracker
invest-edit     # Open in VS Code
invest-deploy   # Deploy with Git-first workflow
invest-sync     # Sync from browser edits
invest-open     # Open Apps Script editor
invest-logs     # View execution logs
```

### Manual Commands

```bash
# clasp commands
clasp push              # Deploy to Google Apps Script
clasp pull              # Pull from Google Apps Script
clasp open --script     # Open in browser
clasp logs              # View execution logs

# Git commands
git status              # Check uncommitted changes
git log --oneline       # View commit history
git diff                # See changes
git checkout <hash>     # Restore old version
```

### Emergency Rollback

```bash
# 1. Find last good version
git log --oneline

# 2. Restore file
git checkout <commit-hash> invest.gs

# 3. Deploy immediately
clasp push

# 4. Commit the rollback
git add invest.gs
git commit -m "Rollback to <commit-hash>"
```

---

## Configuration

### Required Configuration

Edit `invest.gs` CONFIG object:

```javascript
const CONFIG = {
  // Spreadsheet
  SPREADSHEET_ID: '1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg',
  SHEET_NAME: 'Portfolio',
  
  // Email
  EMAIL_TO: 'yusufajarmoekti@gmail.com',
  
  // Column mappings
  TIMESTAMP_COL: 1,    // Column A
  ASSET_ID_COL: 2,     // Column B
  ASSET_NAME_COL: 3,   // Column C
  BROKER_COL: 4,       // Column D
  DROPDOWN_COL: 5,     // Column E
  VALUE_COL: 6,        // Column F
  
  // Report settings
  REPORT_NAME: 'Weekly Portfolio Report',
  // ...
};
```

### Verification

Run `verifySetup()` after any configuration change:
1. Open Apps Script editor
2. Select `verifySetup` function
3. Click Run
4. Check execution log for success messages

---

## Troubleshooting

### Setup Issues

**Command not found: invest**
```bash
source ~/.zshrc
# Or open new terminal
```

**Command not found: clasp**
```bash
npm install -g @google/clasp
```

**Cannot authorize clasp**
```bash
clasp logout
clasp login
```

### Script Execution Issues

**Error: Cannot read properties of null**
- Check SPREADSHEET_ID is correct in CONFIG
- Run `verifySetup()` to test connection
- Verify spreadsheet is accessible

**Emails not sending**
- Check EMAIL_TO is correct
- Check spam folder
- Run `testWeeklyReport()` manually
- Check execution logs: `invest-logs`
- Verify email quota not exceeded (100/day for free accounts)

**Timestamp rows not adding**
- Check triggers are configured correctly
- Run `testWeeklyTimestampRows()` manually
- Verify sheet name matches CONFIG
- Check if rows already exist (deduplication prevents duplicates)

**Dropdown validation disappearing**
- Ensure row 2 has dropdown validation in column E
- Row 2 is the reference template
- Never delete row 2

### Workflow Issues

**deploy.sh says "uncommitted changes"**

This is correct behavior. Git-first requires committing before deploying.
```bash
# Let deploy.sh handle it (recommended)
./scripts/deploy.sh

# Or commit manually first
git add invest.gs
git commit -m "Your message"
./scripts/deploy.sh
```

**Want to undo last deployment**

If not pushed to remote:
```bash
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit, discard changes
```

If already pushed:
```bash
git log --oneline
git checkout <commit-hash> invest.gs
clasp push
git add invest.gs
git commit -m "Rollback to <commit-hash>"
```

### Data Issues

**Report shows wrong data**

Check CONFIG mappings match your spreadsheet:
```javascript
SHEET_NAME: 'Portfolio',  // Verify sheet name
TIMESTAMP_COL: 1,         // Verify column A
// ... verify all column numbers
```

**Duplicate rows appearing**

- Verify Asset ID and Asset Name are unique together
- Deduplication uses: `assetId + '|' + assetName`
- Empty cells are treated as unique

### Permission Issues

**"You do not have permission to access this file"**
- Verify SPREADSHEET_ID is correct
- Ensure spreadsheet is owned by same Google account
- Re-authorize: run `verifySetup()` and grant permissions

**"Authorization required" on every run**
- Open script editor
- Run any function
- Click "Review Permissions"
- Grant all permissions

### Git Issues

**Merge conflict**
```bash
# Keep local version
git checkout --ours invest.gs
git add invest.gs
git commit -m "Resolved conflict: kept local"

# Keep browser version
git checkout --theirs invest.gs
git add invest.gs
git commit -m "Resolved conflict: kept browser"
```

**See what changed**
```bash
git diff                 # Uncommitted changes
git diff invest.gs       # Specific file
git show                 # Last commit
git diff HEAD~2 HEAD     # Between commits
```

### Performance Issues

**Script timeout (6 minutes)**
- Reduce data range
- Archive old data
- Process in batches
- Consider workspace account (30 min timeout)

**Execution quota exceeded**

Check quotas at https://script.google.com/dashboard

Free account limits:
- 90 min/day runtime
- 20,000 URL Fetch calls/day
- 100 emails/day

---

## Architecture

### Project Structure

```
investment-tracker/
├── README.md                 # This file
├── invest.gs                 # Main Apps Script
├── appsscript.json          # Apps Script manifest
├── .clasp.json              # clasp configuration (git-ignored)
├── .gitignore               # Git ignore rules
└── scripts/                 # Automation scripts
    ├── deploy.sh            # Git-first deployment
    ├── sync.sh              # Browser sync
    └── setup-aliases.sh     # Alias installer
```

### Main Functions

**sendWeeklyPortfolioReport()**
- Reads latest portfolio data
- Calculates trends and analytics
- Generates HTML email report
- Sends to configured email address

**sendSaturdayReminder()**
- Simple reminder email
- Prompts user to update values
- Sent before Sunday report

**addWeeklyTimestampRows()**
- Reads all existing rows (skips header)
- Deduplicates by composite key (Asset ID + Asset Name)
- Copies formatting from source rows
- Preserves dropdown validation from row 2
- Appends new rows with fresh timestamp

**verifySetup()**
- Tests spreadsheet connection
- Validates configuration
- Sends test email
- Returns status report

### Helper Functions

**getSpreadsheet()**
- Returns spreadsheet by SPREADSHEET_ID
- Required for standalone scripts (not bound to sheet)

### Configuration Object

All settings centralized in CONFIG object at top of invest.gs:
- Spreadsheet settings
- Email settings
- Column mappings
- Report templates
- Styling options

### Deduplication Logic

```javascript
const compositeKey = assetId + '|' + assetName;
```

Prevents duplicate rows for same asset, even with different values in other columns.

### Dropdown Preservation

Always copies validation from reference row 2:
```javascript
const referenceCell = sheet.getRange(2, DROPDOWN_COL);
const validation = referenceCell.getDataValidation();
newCell.setDataValidation(validation);
```

### Git-First Scripts

**deploy.sh**
1. Checks for uncommitted changes
2. Prompts for commit message
3. Commits to Git
4. Deploys with clasp push
5. Shows next steps

**sync.sh**
1. Pulls from Google Apps Script
2. Shows diff
3. Prompts to commit
4. Commits to Git

**setup-aliases.sh**
- Adds convenience aliases to ~/.zshrc
- One-time setup

---

## Development

### Adding New Features

```bash
# 1. Create feature branch
git checkout -b feature/new-analytics

# 2. Make changes
invest-edit

# 3. Deploy and test
invest-deploy
invest-open

# 4. Merge to main
git checkout main
git merge feature/new-analytics

# 5. Push to remote
git push origin main
```

### Testing

Test functions are prefixed with `test`:
- `testWeeklyReport()`
- `testSaturdayReminder()`
- `testWeeklyTimestampRows()`

Always test manually before setting up triggers.

### Best Practices

**DO:**
- Always use `invest-deploy` for local changes
- Use `invest-sync` after browser edits
- Test after every deployment
- Commit frequently with descriptive messages
- Push to remote regularly

**DON'T:**
- Don't use `clasp push` directly (bypasses Git-first)
- Don't forget to sync after browser edits
- Don't delete reference row 2
- Don't change column mappings without updating CONFIG

---

## Links

- **Apps Script Editor:** https://script.google.com/d/1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf/edit
- **Spreadsheet:** https://docs.google.com/spreadsheets/d/1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg/edit
- **Execution Logs:** https://script.google.com/home/executions
- **Apps Script Dashboard:** https://script.google.com/dashboard

---

## License

This project is for personal use.

## Version

Current version: 1.0.0
Last updated: October 2025
# Testing deployment



