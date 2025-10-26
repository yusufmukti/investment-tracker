# Investment Portfolio Tracker# Investment Portfolio Tracker



[![Deploy to Google Apps Script](https://github.com/yusufmukti/investment-tracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/yusufmukti/investment-tracker/actions/workflows/deploy.yml)[![Deploy to Google Apps Script](https://github.com/yusufmukti/investment-tracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/yusufmukti/investment-tracker/actions/workflows/deploy.yml)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yusufmukti/investment-tracker)[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yusufmukti/investment-tracker)



> **Automated portfolio tracking with weekly email reports, Git version control, and CI/CD deployment**> **Automated portfolio tracking with weekly email reports, Git version control, and CI/CD deployment**



A Google Apps Script that automatically tracks your investment portfolio, sends weekly analytics emails, and uses a Git-first workflow for safe version control and deployment.A Google Apps Script that automatically tracks your investment portfolio, sends weekly analytics emails, and uses a Git-first workflow for safe version control and deployment.



---## 📋 Table of Contents



## 📋 Table of Contents- [What It Does](#what-it-does)

- [Quick Start](#quick-start)

- [What It Does](#-what-it-does)- [Features](#features)

- [Quick Start](#-quick-start)- [Setup Guide](#setup-guide)

- [Features](#-features)- [Daily Workflow](#daily-workflow)

- [Setup Guide](#-setup-guide)- [Configuration](#configuration)

- [Daily Workflow](#-daily-workflow)- [Testing](#testing)

- [Configuration](#-configuration)- [GitHub Actions Setup](#github-actions-setup)

- [Testing](#-testing)- [Troubleshooting](#troubleshooting)

- [GitHub Actions Setup](#-github-actions-setup)- [Version History](#version-history)

- [Troubleshooting](#-troubleshooting)- [Contributing](#contributing)

- [Version History](#-version-history)

- [Contributing](#-contributing)---



---## Demo



## 🎯 What It Does### Weekly Email Report



### Weekly Email Report (Sunday 8am)The system automatically sends HTML-formatted emails with:

Automatically sends you an HTML email with:

- **Total Portfolio Value** with week-over-week change```

- **Asset Allocation** breakdown by type (Crypto, Stocks, Gold, etc.)┌─────────────────────────────────────────┐

- **Top 5 Holdings** ranked by value│ Weekly Portfolio Report                 │

- **Performance Trends** showing gains/losses├─────────────────────────────────────────┤

│                                         │

### Saturday Reminder (Saturday 10am)│ Total Value: Rp 150,000,000            │

Sends reminder email: "Update your portfolio values before tomorrow's report"│ Week Change: +5.2% (↑ Rp 7,500,000)   │

│                                         │

### Auto Row Duplication (Saturday 6pm)│ ━━━ Asset Allocation ━━━                │

Automatically duplicates all portfolio rows with new timestamp for weekly tracking while:│ Cryptocurrency    45% Rp 67,500,000    │

- Preserving dropdown validation│ Stocks           30% Rp 45,000,000     │

- Maintaining cell formatting│ Gold             15% Rp 22,500,000     │

- Deduplicating by Asset ID + Name│ Cash             10% Rp 15,000,000     │

- Keeping historical data intact│                                         │

│ ━━━ Top 5 Holdings ━━━                  │

### Git-First Workflow│ 1. Bitcoin (BTC)      Rp 35,000,000    │

All code changes are committed to Git **before** deployment, enabling:│ 2. Ethereum (ETH)     Rp 25,000,000    │

- Easy rollback using `git checkout`│ 3. Apple Stock        Rp 20,000,000    │

- Complete version history│ 4. Gold Bar          Rp 22,500,000     │

- Safe experimentation with branches│ 5. Emergency Fund     Rp 15,000,000    │

- Team collaboration via Pull Requests└─────────────────────────────────────────┘

```

---

### Automated Schedule

## 🚀 Quick Start

```

### 1. Install PrerequisitesSaturday 10am  →  Reminder: "Update your portfolio values"

Saturday 6pm   →  Duplicate rows with new timestamp

```bashSunday 8am     →  Send weekly report email

# Install clasp (Google Apps Script CLI)```

npm install -g @google/clasp@3.0.6-alpha

### Git-First Workflow

# Authenticate with Google

clasp login```bash

```# 1. Edit code locally

vim invest.gs

### 2. Configure the Script

# 2. Commit to Git (version control)

Edit `invest.gs` and update the CONFIG object:git add invest.gs

git commit -m "feat: add monthly summary"

```javascript

const CONFIG = {# 3. Deploy to Google Apps Script

  SPREADSHEET_ID: 'your-spreadsheet-id-here',invest-deploy

  EMAIL_TO: 'your-email@example.com',

  SHEET_NAME: 'Portfolio',# 4. Automatic GitHub sync

  // ... other settingsgit push origin master

};# → GitHub Actions automatically deploys!

``````



### 3. Setup Shell Aliases### Spreadsheet Integration



```bash**Before (Saturday 6pm)**:

./scripts/setup-aliases.sh| Timestamp | Asset ID | Asset Name | Amount | Type |

source ~/.zshrc|-----------|----------|------------|--------|------|

```| 2025-09-28 | BTC001 | Bitcoin | 35,000,000 | Crypto |



### 4. Deploy**After (New row with current timestamp)**:

| Timestamp | Asset ID | Asset Name | Amount | Type |

```bash|-----------|----------|------------|--------|------|

invest-deploy| 2025-09-28 | BTC001 | Bitcoin | 35,000,000 | Crypto |

```| **2025-10-05** | **BTC001** | **Bitcoin** | **37,500,000** | **Crypto** |



### 5. Setup Triggers*Note: Dropdowns and formatting automatically preserved*



Open Apps Script editor:---

```bash

invest-open## Overview

```

This project automates weekly investment portfolio tracking with:

Click Triggers icon and add:- Weekly email reports with analytics and trends

- `sendWeeklyPortfolioReport` → Weekly, Sunday 8-9am- Automatic row duplication with timestamps

- `sendSaturdayReminder` → Weekly, Saturday 10-11am- Email reminders before reports

- `addWeeklyTimestampRows` → Weekly, Saturday 6-7pm- Git-first deployment workflow for safe version control



### 6. Test**Key Principle:** All code changes are committed to Git before deployment, enabling easy rollback and proper version history.



Run these functions manually in Apps Script editor:---

- `testWeeklyReport()`

- `testSaturdayReminder()`## Quick Start

- `testWeeklyTimestampRows()`

### 1. Reload Shell

---```bash

source ~/.zshrc

## ✨ Features```



### Automated Functions### 2. Verify Setup

```bash

| Function | When | What It Does |invest-open

|----------|------|--------------|```

| `sendWeeklyPortfolioReport` | Sunday 8am | Sends portfolio analytics email |

| `sendSaturdayReminder` | Saturday 10am | Sends reminder to update values |In the Apps Script editor:

| `addWeeklyTimestampRows` | Saturday 6pm | Duplicates rows with new timestamp |- Select function: `verifySetup`

- Click Run

### Git-First Workflow- Authorize permissions (first time only)

- Verify success messages in execution log

**Philosophy:** Commit to Git **before** deploying (not after)

### 3. Configure Triggers

**Benefits:**

- ✅ Easy rollback if something breaksSet up time-based triggers in Apps Script editor (click Triggers icon):

- ✅ Complete development history

- ✅ Safe experimentation with branches| Function | Schedule | Time |

- ✅ Code review before deployment|----------|----------|------|

- ✅ Never lose work| `sendWeeklyPortfolioReport` | Weekly | Sunday 8-9am |

| `sendSaturdayReminder` | Weekly | Saturday 10-11am |

**Comparison:**| `addWeeklyTimestampRows` | Weekly | Saturday 6-7pm |



| Approach | Workflow | Risk |### 4. Test Functions

|----------|----------|------|

| **Git-First** ✅ | Edit → Git Commit → Deploy | Low - can rollback anytime |Run these test functions manually to verify:

| **Deploy-First** ❌ | Edit → Deploy → Git Commit | High - code live before version control |- `testWeeklyReport()`

- `testSaturdayReminder()`

### Version Tracking- `testWeeklyTimestampRows()`



The `version.gs` file tracks:---

- Deployment timestamp

- Commit hash## Features

- Deployed by (GitHub Actions vs Manual)

- Branch name### Automated Functions



**Check version:****Weekly Portfolio Report** (Sunday 8am)

```javascript- Email with portfolio analytics

// In Apps Script console- Week-over-week trends

checkScriptIntegrity();  // Logs version info- Asset allocation breakdown

showVersionInfo();       // Shows UI dialog- Performance summary

```

**Saturday Reminder** (Saturday 10am)

**Manual edit detection:**- Reminder email to update values

- Daily integrity check emails you if script is manually edited in console- Sent before Sunday report generation

- Prevents unauthorized changes

**Weekly Timestamp Rows** (Saturday 6pm)

---- Duplicates all portfolio rows with fresh timestamp

- Deduplicates by Asset ID + Asset Name

## 📦 Setup Guide- Preserves dropdown validation and formatting



### Spreadsheet Structure### Git-First Workflow



Your spreadsheet should have these columns:- Version control before deployment (not after)

- Easy rollback using `git checkout`

| Column | Name | Description |- Safe experimentation with branches

|--------|------|-------------|- Complete development history

| A | Timestamp | Auto-populated by script |- Automated deployment scripts with safety checks

| B | Asset ID | Unique identifier (e.g., "BTC001") |

| C | Asset Name | Descriptive name (e.g., "Bitcoin") |---

| D | Broker | Where asset is held |

| E | Asset Type | Dropdown (Crypto, Stock, Gold, Cash) |## Setup

| F | Value | Current value in your currency |

### Prerequisites

**Important:** Row 2 must contain reference formatting (especially dropdown in Column E). The script copies this when duplicating rows.

```bash

### Initial Configuration# Install clasp globally

npm install -g @google/clasp

**1. Get Your Spreadsheet ID**

# Authenticate with Google

From your spreadsheet URL:clasp login

``````

https://docs.google.com/spreadsheets/d/1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg/edit

                                      ↑ This is your SPREADSHEET_ID ↑### Initial Configuration

```

1. Clone or navigate to project:

**2. Update CONFIG in invest.gs**   ```bash

   cd ~/repo/investment-tracker

```javascript   ```

const CONFIG = {

  SPREADSHEET_ID: '1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg',2. Configure spreadsheet ID in `invest.gs`:

  SHEET_NAME: 'Portfolio',   ```javascript

  EMAIL_TO: 'your-email@example.com',   const CONFIG = {

       SPREADSHEET_ID: 'your-spreadsheet-id-here',

  // Column mappings (1-based)     EMAIL_TO: 'your-email@example.com',

  TIMESTAMP_COL: 1,     // ...

  ASSET_ID_COL: 2,   };

  ASSET_NAME_COL: 3,   ```

  BROKER_COL: 4,

  DROPDOWN_COL: 5,3. Install shell aliases:

  VALUE_COL: 6,   ```bash

     ./scripts/setup-aliases.sh

  // Customize report   source ~/.zshrc

  REPORT_NAME: 'Weekly Portfolio Report',   ```

};

```4. Deploy initial version:

   ```bash

**3. Verify Setup**   ./scripts/deploy.sh

   ```

In Apps Script editor:

1. Select function: `verifySetup`### Spreadsheet Setup

2. Click Run

3. Grant permissions (first time only)Your spreadsheet should have columns:

4. Check execution log for success messages- Column A: Timestamp

- Column B: Asset ID

### Shell Aliases (Optional but Recommended)- Column C: Asset Name

- Column D: Broker

The setup script adds these convenient aliases:- Column E: Dropdown (Asset Type, etc.)

- Column F: Value

| Command | What It Does |

|---------|-------------|Row 2 must contain reference formatting (especially dropdown in column E).

| `invest` | cd ~/repo/investment-tracker |

| `invest-edit` | Open in VS Code |---

| `invest-deploy` | Git-first deploy (commits then pushes to Apps Script) |

| `invest-sync` | Pull from Apps Script (if edited in browser) |## Workflow

| `invest-open` | Open Apps Script editor in browser |

| `invest-logs` | View execution logs |### Making Changes Locally



**Install:**```bash

```bash# 1. Navigate to project

./scripts/setup-aliases.shinvest

source ~/.zshrc

```# 2. Edit code

invest-edit

---

# 3. Deploy (commits to Git first)

## 🔄 Daily Workflowinvest-deploy



### Making Changes Locally# 4. Test in browser

invest-open

```bash

# 1. Navigate to project# 5. Push to remote (optional)

investgit push origin main

```

# 2. Edit code

code invest.gs### After Editing in Browser

# OR

invest-edit```bash

# 1. Sync from Google Apps Script

# 3. Deploy (automatically commits to Git first)invest-sync

invest-deploy

# 2. Push to remote (optional)

# 4. Test in browsergit push origin main

invest-open```



# 5. Push to GitHub (triggers auto-deployment)### Workflow Comparison

git push origin main

```**Git-First (Current):**

```

### After Editing in Browser ConsoleEdit → Git Commit → Deploy → Git Push

```

⚠️ **Warning:** Avoid editing in browser when possible. Always prefer local editing.Benefits: Code is versioned before deployment, easy rollback, complete history



If you must edit in browser:**Deploy-First (Avoid):**

```

```bashEdit → Deploy → Git Commit → Git Push

# 1. Sync changes from Apps Script```

invest-syncProblems: Code goes live before version control, difficult rollback



# 2. Review and commit---

git add invest.gs

git commit -m "Description of browser changes"## Commands



# 3. Push to GitHub### Installed Aliases

git push origin main

``````bash

invest          # cd ~/repo/investment-tracker

### Emergency Rollbackinvest-edit     # Open in VS Code

invest-deploy   # Deploy with Git-first workflow

If you deployed broken code:invest-sync     # Sync from browser edits

invest-open     # Open Apps Script editor

```bashinvest-logs     # View execution logs

# 1. Find last good version```

git log --oneline

### Manual Commands

# 2. Restore the file

git checkout <commit-hash> invest.gs```bash

# clasp commands

# 3. Deploy immediatelyclasp push              # Deploy to Google Apps Script

clasp pushclasp pull              # Pull from Google Apps Script

clasp open --script     # Open in browser

# 4. Commit the rollbackclasp logs              # View execution logs

git add invest.gs

git commit -m "Rollback to <commit-hash> due to bug"# Git commands

git push origin maingit status              # Check uncommitted changes

```git log --oneline       # View commit history

git diff                # See changes

---git checkout <hash>     # Restore old version

```

## ⚙️ Configuration

### Emergency Rollback

### Required Settings

```bash

```javascript# 1. Find last good version

const CONFIG = {git log --oneline

  // === Spreadsheet Settings ===

  SPREADSHEET_ID: '1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg',# 2. Restore file

  SHEET_NAME: 'Portfolio',git checkout <commit-hash> invest.gs

  

  // === Email Settings ===# 3. Deploy immediately

  EMAIL_TO: 'yusufajarmoekti@gmail.com',clasp push

  REPORT_NAME: 'Weekly Portfolio Report',

  # 4. Commit the rollback

  // === Column Mappings (1-based) ===git add invest.gs

  TIMESTAMP_COL: 1,    // Column Agit commit -m "Rollback to <commit-hash>"

  ASSET_ID_COL: 2,     // Column B```

  ASSET_NAME_COL: 3,   // Column C

  BROKER_COL: 4,       // Column D---

  DROPDOWN_COL: 5,     // Column E (must have dropdown validation in row 2)

  VALUE_COL: 6,        // Column F## Configuration

};

```### Required Configuration



### Email CustomizationEdit `invest.gs` CONFIG object:



Modify these in `invest.gs`:```javascript

const CONFIG = {

```javascript  // Spreadsheet

// Subject lines  SPREADSHEET_ID: '1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg',

const REPORT_SUBJECT = 'Weekly Portfolio Report - ' + new Date().toLocaleDateString();  SHEET_NAME: 'Portfolio',

const REMINDER_SUBJECT = 'Reminder: Update Portfolio Values';  

  // Email

// Email styling  EMAIL_TO: 'yusufajarmoekti@gmail.com',

const EMAIL_STYLE = `  

  font-family: Arial, sans-serif;  // Column mappings

  color: #333;  TIMESTAMP_COL: 1,    // Column A

  line-height: 1.6;  ASSET_ID_COL: 2,     // Column B

`;  ASSET_NAME_COL: 3,   // Column C

```  BROKER_COL: 4,       // Column D

  DROPDOWN_COL: 5,     // Column E

### Asset Type Mapping  VALUE_COL: 6,        // Column F

  

Define asset types for grouping in `getAssetTypeGroup()`:  // Report settings

  REPORT_NAME: 'Weekly Portfolio Report',

```javascript  // ...

function getAssetTypeGroup(assetType) {};

  const groups = {```

    'Cryptocurrency': 'Crypto',

    'Bitcoin': 'Crypto',### Verification

    'Stocks': 'Stocks',

    'Gold': 'Gold',Run `verifySetup()` after any configuration change:

    'Cash': 'Cash',1. Open Apps Script editor

  };2. Select `verifySetup` function

  return groups[assetType] || 'Other';3. Click Run

}4. Check execution log for success messages

```

---

---

## Troubleshooting

## 🧪 Testing

### Setup Issues

### Test Functions

**Command not found: invest**

Always test manually before setting up triggers:```bash

source ~/.zshrc

| Function | What It Tests |# Or open new terminal

|----------|---------------|```

| `testWeeklyReport()` | Email generation and sending |

| `testSaturdayReminder()` | Reminder email |**Command not found: clasp**

| `testWeeklyTimestampRows()` | Row duplication and deduplication |```bash

| `verifySetup()` | Configuration and permissions |npm install -g @google/clasp

```

### How to Test

**Cannot authorize clasp**

**In Apps Script Editor:**```bash

1. Select test function from dropdownclasp logout

2. Click "Run" buttonclasp login

3. Check execution log (View → Logs)```

4. Check your email inbox

5. Check spreadsheet for changes### Script Execution Issues



### Test Checklist**Error: Cannot read properties of null**

- Check SPREADSHEET_ID is correct in CONFIG

Before deploying to production:- Run `verifySetup()` to test connection

- Verify spreadsheet is accessible

- [ ] All test functions pass without errors

- [ ] Execution logs show expected output**Emails not sending**

- [ ] Emails sent and received correctly- Check EMAIL_TO is correct

- [ ] Email HTML renders properly in Gmail/Outlook- Check spam folder

- [ ] Spreadsheet data is accurate- Run `testWeeklyReport()` manually

- [ ] No duplicate rows created- Check execution logs: `invest-logs`

- [ ] Dropdown validation preserved in new rows- Verify email quota not exceeded (100/day for free accounts)

- [ ] No breaking changes to existing functionality

**Timestamp rows not adding**

### Testing Edge Cases- Check triggers are configured correctly

- Run `testWeeklyTimestampRows()` manually

Test with unusual data:- Verify sheet name matches CONFIG

- ✅ Empty portfolio (no rows)- Check if rows already exist (deduplication prevents duplicates)

- ✅ Single asset only

- ✅ Many assets (50+)**Dropdown validation disappearing**

- ✅ Negative values- Ensure row 2 has dropdown validation in column E

- ✅ Very large numbers (millions/billions)- Row 2 is the reference template

- ✅ Missing Asset ID or Name- Never delete row 2

- ✅ Special characters in names

### Workflow Issues

### Manual Trigger Testing

**deploy.sh says "uncommitted changes"**

Test time-based triggers without waiting:

This is correct behavior. Git-first requires committing before deploying.

1. **Temporarily disable production triggers**```bash

2. **Create test trigger:** Run in 5 minutes# Let deploy.sh handle it (recommended)

3. **Monitor execution:** Check dashboard./scripts/deploy.sh

4. **Verify outcome:** Check logs and emails

5. **Re-enable production triggers**# Or commit manually first

git add invest.gs

---git commit -m "Your message"

./scripts/deploy.sh

## 🔧 GitHub Actions Setup```



### Why Use GitHub Actions?**Want to undo last deployment**



**Benefits:**If not pushed to remote:

- ✅ Automatic deployment on every push```bash

- ✅ Team collaboration via Pull Requestsgit reset --soft HEAD~1  # Undo commit, keep changes

- ✅ Deployment history and audit trailgit reset --hard HEAD~1  # Undo commit, discard changes

- ✅ No manual clasp push needed```

- ✅ Can rollback by reverting commits

If already pushed:

**Flow:**```bash

```git log --oneline

Local Edit → Git Commit → Git Push → GitHub Actions → Google Apps Scriptgit checkout <commit-hash> invest.gs

```clasp push

git add invest.gs

### Setup Stepsgit commit -m "Rollback to <commit-hash>"

```

**1. Get clasp Credentials**

### Data Issues

```bash

cat ~/.clasprc.json**Report shows wrong data**

```

Check CONFIG mappings match your spreadsheet:

Copy the entire JSON output.```javascript

SHEET_NAME: 'Portfolio',  // Verify sheet name

**2. Get clasp Config**TIMESTAMP_COL: 1,         // Verify column A

// ... verify all column numbers

```bash```

cat .clasp.json

```**Duplicate rows appearing**



Copy the JSON and **remove the `rootDir` field**:- Verify Asset ID and Asset Name are unique together

- Deduplication uses: `assetId + '|' + assetName`

```json- Empty cells are treated as unique

{

  "scriptId": "your-script-id-here"### Permission Issues

}

```**"You do not have permission to access this file"**

- Verify SPREADSHEET_ID is correct

**3. Add GitHub Secrets**- Ensure spreadsheet is owned by same Google account

- Re-authorize: run `verifySetup()` and grant permissions

1. Go to your GitHub repository

2. Click **Settings** → **Secrets and variables** → **Actions****"Authorization required" on every run**

3. Click **New repository secret**- Open script editor

4. Add two secrets:- Run any function

- Click "Review Permissions"

| Secret Name | Value |- Grant all permissions

|-------------|-------|

| `CLASP_CREDENTIALS` | Contents of `~/.clasprc.json` |### Git Issues

| `CLASP_CONFIG` | Contents of `.clasp.json` (without rootDir) |

**Merge conflict**

**4. Push to GitHub**```bash

# Keep local version

```bashgit checkout --ours invest.gs

git push origin maingit add invest.gs

```git commit -m "Resolved conflict: kept local"



GitHub Actions will automatically deploy!# Keep browser version

git checkout --theirs invest.gs

**5. Verify Deployment**git add invest.gs

git commit -m "Resolved conflict: kept browser"

1. Go to **Actions** tab in GitHub```

2. Check workflow run (should be green ✅)

3. Open Apps Script editor to verify code updated**See what changed**

```bash

### Automatic vs Manual Deploymentgit diff                 # Uncommitted changes

git diff invest.gs       # Specific file

You can use either or both:git show                 # Last commit

git diff HEAD~2 HEAD     # Between commits

**Option 1: GitHub Actions (Automatic)**```

```bash

git push origin main  # Auto-deploys### Performance Issues

```

**Script timeout (6 minutes)**

**Option 2: Local (Manual)**- Reduce data range

```bash- Archive old data

invest-deploy  # Direct deploy from local- Process in batches

```- Consider workspace account (30 min timeout)



### Monitoring Deployments**Execution quota exceeded**



**Check Status:**Check quotas at https://script.google.com/dashboard

- GitHub repo → **Actions** tab

- Green checkmark = Success ✅Free account limits:

- Red X = Failed ❌- 90 min/day runtime

- 20,000 URL Fetch calls/day

**View Logs:**- 100 emails/day

- Click workflow run → Click "deploy" job

- View detailed logs of each step---



---## Architecture



## 🔍 Troubleshooting### Project Structure



### Common Issues```

investment-tracker/

#### "Cannot read properties of null"├── README.md                 # This file

├── invest.gs                 # Main Apps Script

**Problem:** Spreadsheet not found or wrong ID├── appsscript.json          # Apps Script manifest

├── .clasp.json              # clasp configuration (git-ignored)

**Solution:**├── .gitignore               # Git ignore rules

```javascript└── scripts/                 # Automation scripts

// 1. Verify SPREADSHEET_ID in CONFIG    ├── deploy.sh            # Git-first deployment

// 2. Check spreadsheet is accessible    ├── sync.sh              # Browser sync

// 3. Run verifySetup() to test connection    └── setup-aliases.sh     # Alias installer

``````



#### Emails Not Sending### Main Functions



**Checklist:****sendWeeklyPortfolioReport()**

- [ ] EMAIL_TO is correct in CONFIG- Reads latest portfolio data

- [ ] Check spam/junk folder- Calculates trends and analytics

- [ ] Run `testWeeklyReport()` manually- Generates HTML email report

- [ ] Check execution logs: `invest-logs`- Sends to configured email address

- [ ] Verify email quota not exceeded (100/day for free accounts)

- [ ] Ensure script is authorized to send emails**sendSaturdayReminder()**

- Simple reminder email

**Test email permissions:**- Prompts user to update values

```javascript- Sent before Sunday report

// Run in Apps Script console

MailApp.sendEmail('your-email@example.com', 'Test', 'Testing permissions');**addWeeklyTimestampRows()**

```- Reads all existing rows (skips header)

- Deduplicates by composite key (Asset ID + Asset Name)

#### Timestamp Rows Not Adding- Copies formatting from source rows

- Preserves dropdown validation from row 2

**Checklist:**- Appends new rows with fresh timestamp

- [ ] Triggers configured correctly

- [ ] Run `testWeeklyTimestampRows()` manually**verifySetup()**

- [ ] Sheet name matches CONFIG.SHEET_NAME- Tests spreadsheet connection

- [ ] Check if rows already exist (deduplication prevents duplicates)- Validates configuration

- [ ] Verify Asset ID and Asset Name columns have values- Sends test email

- Returns status report

#### Dropdown Validation Disappearing

### Helper Functions

**Solution:**

- Ensure row 2 has dropdown validation in Column E**getSpreadsheet()**

- Row 2 is the reference template - never delete it- Returns spreadsheet by SPREADSHEET_ID

- Script copies validation from row 2 to new rows- Required for standalone scripts (not bound to sheet)



#### GitHub Actions Failing### Configuration Object



**"Could not read API credentials"**All settings centralized in CONFIG object at top of invest.gs:

- Spreadsheet settings

Your GitHub Secrets are missing or invalid:- Email settings

- Column mappings

1. Run: `./scripts/setup-github-actions.sh`- Report templates

2. Copy the two JSON blocks it shows- Styling options

3. Add as GitHub Secrets (see [GitHub Actions Setup](#-github-actions-setup))

4. Re-run the workflow### Deduplication Logic



**"Cannot read properties of undefined (reading 'access_token')"**```javascript

const compositeKey = assetId + '|' + assetName;

OAuth tokens expired:```



```bashPrevents duplicate rows for same asset, even with different values in other columns.

# Re-generate credentials

clasp logout### Dropdown Preservation

clasp login

Always copies validation from reference row 2:

# Update GitHub Secret CLASP_CREDENTIALS```javascript

cat ~/.clasprc.jsonconst referenceCell = sheet.getRange(2, DROPDOWN_COL);

# Copy and update in GitHub Settingsconst validation = referenceCell.getDataValidation();

```newCell.setDataValidation(validation);

```

**"npm warn EBADENGINE Unsupported engine"**

### Git-First Scripts

Just a warning - clasp works fine. To fix:

**deploy.sh**

```yaml1. Checks for uncommitted changes

# In .github/workflows/deploy.yml2. Prompts for commit message

node-version: '20'  # Change from '18'3. Commits to Git

```4. Deploys with clasp push

5. Shows next steps

### Git Issues

**sync.sh**

**Merge Conflict**1. Pulls from Google Apps Script

2. Shows diff

```bash3. Prompts to commit

# Keep local version4. Commits to Git

git checkout --ours invest.gs

git add invest.gs**setup-aliases.sh**

git commit -m "Resolved conflict: kept local"- Adds convenience aliases to ~/.zshrc

- One-time setup

# OR keep browser version

git checkout --theirs invest.gs---

git add invest.gs

git commit -m "Resolved conflict: kept browser"## Development

```

### Adding New Features

**See What Changed**

```bash

```bash# 1. Create feature branch

git diff                 # Uncommitted changesgit checkout -b feature/new-analytics

git diff invest.gs       # Specific file

git show                 # Last commit# 2. Make changes

git diff HEAD~2 HEAD     # Between commitsinvest-edit

```

# 3. Deploy and test

**Undo Last Commit**invest-deploy

invest-open

```bash

git reset --soft HEAD~1  # Undo commit, keep changes# 4. Merge to main

git reset --hard HEAD~1  # Undo commit, discard changesgit checkout main

```git merge feature/new-analytics



### Performance Issues# 5. Push to remote

git push origin main

**Script Timeout (6 minutes)**```



Solutions:### Testing

- Reduce data range (archive old data)

- Process in smaller batchesTest functions are prefixed with `test`:

- Consider Google Workspace account (30 min timeout)- `testWeeklyReport()`

- `testSaturdayReminder()`

**Execution Quota Exceeded**- `testWeeklyTimestampRows()`



Free account limits (check at https://script.google.com/dashboard):Always test manually before setting up triggers.

- 90 min/day runtime

- 20,000 URL Fetch calls/day### Best Practices

- 100 emails/day

**DO:**

### Shell Alias Issues- Always use `invest-deploy` for local changes

- Use `invest-sync` after browser edits

**"Command not found: invest"**- Test after every deployment

- Commit frequently with descriptive messages

```bash- Push to remote regularly

# Reload shell configuration

source ~/.zshrc**DON'T:**

- Don't use `clasp push` directly (bypasses Git-first)

# OR open new terminal- Don't forget to sync after browser edits

```- Don't delete reference row 2

- Don't change column mappings without updating CONFIG

**"Command not found: clasp"**

---

```bash

# Install clasp## Links

npm install -g @google/clasp@3.0.6-alpha

- **Apps Script Editor:** https://script.google.com/d/1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf/edit

# Verify installation- **Spreadsheet:** https://docs.google.com/spreadsheets/d/1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg/edit

clasp --version- **Execution Logs:** https://script.google.com/home/executions

```- **Apps Script Dashboard:** https://script.google.com/dashboard



### Permission Issues---



**"You do not have permission to access this file"**## License



- Verify SPREADSHEET_ID is correctThis project is for personal use.

- Ensure spreadsheet is owned by same Google account

- Re-authorize: Run `verifySetup()` and grant permissions## Version



**"Authorization required" on every run**Current version: 1.0.0

Last updated: October 2025

1. Open Apps Script editor# Testing deployment

2. Run any function

3. Click "Review Permissions"

4. Grant all permissions

5. Check "Remember this authorization"

---

## 📖 Version History

### Current Version: 1.0.0 (October 2025)

#### Added
- ✅ **GitHub Actions CI/CD Pipeline**: Automated deployment from GitHub
- ✅ **Git-First Workflow**: Complete local development setup with clasp
- ✅ **Shell Aliases**: Convenient commands (invest-deploy, invest-sync, etc.)
- ✅ **Weekly Portfolio Automation**: Email reports, reminders, auto row duplication
- ✅ **Version Tracking**: Deployment metadata and manual edit detection
- ✅ **Comprehensive Documentation**: Setup, testing, troubleshooting guides
- ✅ **Test Functions**: Manual testing helpers for all main functions

#### Fixed
- ✅ GitHub Actions deployment issues (clasp version, JSON formatting, OAuth)
- ✅ Credential management and security
- ✅ Dropdown validation preservation
- ✅ Asset deduplication logic

#### Security
- ✅ Credentials stored securely in GitHub Secrets
- ✅ No hardcoded sensitive data
- ✅ OAuth 2.0 authentication
- ✅ Version tracking prevents unauthorized changes

### Planned Features
- 🔜 Unit tests for core functions
- 🔜 Integration tests for email sending
- 🔜 Error notification system
- 🔜 Support for multiple portfolios
- 🔜 Dashboard visualization
- 🔜 Mobile-friendly email templates

---

## 🤝 Contributing

### Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/investment-tracker.git
cd investment-tracker

# 2. Set up upstream
git remote add upstream https://github.com/yusufmukti/investment-tracker.git

# 3. Create feature branch
git checkout -b feature/your-feature-name

# 4. Make changes
code invest.gs

# 5. Test
invest-open
# Run test functions manually

# 6. Commit
git add .
git commit -m "feat: add your feature description"

# 7. Deploy and verify
invest-deploy

# 8. Push to your fork
git push origin feature/your-feature-name

# 9. Create Pull Request on GitHub
```

### Coding Standards

**JavaScript Style:**
- **Indentation:** 2 spaces (no tabs)
- **Line Length:** Max 100 characters
- **Quotes:** Single quotes for strings
- **Semicolons:** Always use
- **Naming:**
  - `camelCase` for functions and variables
  - `UPPER_SNAKE_CASE` for constants

**Documentation:**
```javascript
/**
 * Sends a weekly portfolio report via email
 * 
 * @description Collects portfolio data, calculates trends, and sends
 *              a formatted HTML email with portfolio analytics
 * 
 * @returns {void}
 * @throws {Error} If spreadsheet cannot be accessed
 */
function sendWeeklyPortfolioReport() {
  // Implementation
}
```

**Comments:**
- Explain **why**, not **what**
- Keep concise and relevant
- Update when code changes

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting (no logic change)
- `refactor:` Code restructuring (no behavior change)
- `test:` Adding tests
- `chore:` Build process, dependencies

**Example:**
```
feat: add monthly summary in email report

- Calculate month-over-month trends
- Add monthly performance section to email
- Include charts for visual analysis

Closes #42
```

### Testing Requirements

Before submitting PR:
- [ ] All test functions pass
- [ ] New features have test functions
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
- [ ] Code follows style guidelines

---

## 📚 Additional Resources

### Links

- **Apps Script Editor:** https://script.google.com/d/1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf/edit
- **Execution Logs:** https://script.google.com/home/executions
- **Apps Script Dashboard:** https://script.google.com/dashboard
- **clasp Documentation:** https://github.com/google/clasp
- **Apps Script Reference:** https://developers.google.com/apps-script/reference

### Commands Reference

```bash
# clasp commands
clasp push              # Deploy to Google Apps Script
clasp pull              # Pull from Google Apps Script
clasp open --script     # Open in browser
clasp logs              # View execution logs
clasp logout            # Logout
clasp login             # Login/re-authenticate

# Git commands
git status              # Check uncommitted changes
git log --oneline       # View commit history
git diff                # See changes
git checkout <hash>     # Restore old version
git branch              # List branches
git checkout -b <name>  # Create new branch

# Project aliases (after setup)
invest                  # cd ~/repo/investment-tracker
invest-edit             # Open in VS Code
invest-deploy           # Deploy with Git-first workflow
invest-sync             # Sync from browser edits
invest-open             # Open Apps Script editor
invest-logs             # View execution logs
```

---

## 📄 License

This project is for personal use. MIT License.

---

## 🙋 Support

### Getting Help

1. **Check this README** - Most answers are here
2. **Check execution logs** - `invest-logs` or Apps Script dashboard
3. **Run verifySetup()** - Tests configuration and permissions
4. **Test manually** - Use test functions before automated triggers

### Common Questions

**Q: Can I use this for multiple portfolios?**  
A: Currently supports one spreadsheet. You can duplicate the script for multiple sheets.

**Q: How do I change the email schedule?**  
A: Update triggers in Apps Script editor (Triggers icon → Edit trigger → Change time).

**Q: Can I customize the email format?**  
A: Yes! Edit the HTML templates in `sendWeeklyPortfolioReport()`.

**Q: What if I don't want row duplication?**  
A: Simply don't create the `addWeeklyTimestampRows` trigger.

**Q: Is my data secure?**  
A: Yes. Script runs under your Google account with your permissions. No data is shared externally.

---

**Made with ❤️ for personal portfolio tracking**

*Last updated: October 2025 | Version 1.0.0*
