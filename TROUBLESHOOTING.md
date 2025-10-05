# 🔧 Troubleshooting Guide

Common issues and their solutions for the Investment Tracker.

---

## 🚨 Setup Issues

### Problem: "invest command not found"

**Cause**: Shell aliases not loaded yet.

**Solution**:
```bash
source ~/.zshrc
# Or open a new terminal window
```

---

### Problem: "clasp: command not found"

**Cause**: clasp not installed globally.

**Solution**:
```bash
npm install -g @google/clasp
```

---

### Problem: Can't authorize clasp

**Cause**: Browser authentication issue.

**Solution**:
```bash
clasp logout
clasp login
# Follow browser authorization flow
```

---

## 📝 Script Execution Issues

### Problem: "Cannot read properties of null (reading 'getSheetByName')"

**Cause**: SPREADSHEET_ID not configured or incorrect.

**Solution**:
1. Check SPREADSHEET_ID in CONFIG object at top of `invest.gs`
2. Verify it matches your spreadsheet:
   ```javascript
   SPREADSHEET_ID: '1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg',
   ```
3. Run `verifySetup()` to test connection

---

### Problem: "You do not have permission to call SpreadsheetApp.openById"

**Cause**: Script not authorized yet.

**Solution**:
1. Open Apps Script editor: `invest-open`
2. Select `verifySetup` function
3. Click Run ▶️
4. Authorize all permissions when prompted
5. Re-run the function

---

### Problem: Email not sending

**Cause**: Multiple possible causes.

**Solution**:
1. Check EMAIL_TO is correct:
   ```javascript
   EMAIL_TO: 'yusufajarmoekti@gmail.com',
   ```
2. Check spam folder
3. Run test function: `testWeeklyReport()`
4. Check execution logs: `invest-logs`
5. Verify email quota not exceeded (Gmail: 100/day)

---

### Problem: Timestamp rows not adding

**Cause**: Function not running or duplicate detection working.

**Solution**:
1. Check triggers are set up correctly (Saturday 6-7pm)
2. Run manually: `testWeeklyTimestampRows()`
3. Check execution logs: `invest-logs`
4. Verify sheet name matches CONFIG: `'Portfolio'`
5. Check if rows already exist (deduplication by Asset ID + Name)

---

### Problem: Dropdown validation disappearing

**Cause**: Reference row 2 doesn't have validation.

**Solution**:
1. Ensure row 2 has dropdown validation in column E
2. This row is used as template for copying validation
3. Never delete row 2!

---

## 🔄 Workflow Issues

### Problem: deploy.sh says "uncommitted changes"

**This is correct behavior!** Git-First workflow requires committing before deploying.

**Solution**:
```bash
# Let deploy.sh handle it (recommended)
./deploy.sh
# It will prompt you to commit

# Or commit manually first:
git add invest.gs
git commit -m "Your message"
./deploy.sh
```

---

### Problem: sync.sh shows no changes but I edited in browser

**Cause**: Changes not saved in Apps Script editor, or already synced.

**Solution**:
1. Make sure you saved in browser (Ctrl+S or Cmd+S)
2. Check if already synced: `git status`
3. Try: `clasp pull` to force fetch

---

### Problem: Want to undo last deploy

**Solution - If not pushed to GitHub yet**:
```bash
# See last commit
git log --oneline -1

# Undo commit, keep changes
git reset --soft HEAD~1

# Undo commit, discard changes
git reset --hard HEAD~1

# Deploy previous version
clasp push
```

**Solution - If already pushed**:
```bash
# Find last good commit
git log --oneline

# Checkout that version
git checkout <commit-hash> invest.gs

# Deploy it
clasp push

# Commit the rollback
git add invest.gs
git commit -m "Rolled back to <commit-hash>"
```

---

### Problem: Deployed broken code, need emergency rollback

**Solution (< 2 minutes)**:
```bash
# 1. Find last working version
git log --oneline

# 2. Restore it
git checkout <commit-hash> invest.gs

# 3. Deploy immediately
clasp push

# 4. Test
invest-open

# 5. Commit the rollback
git add invest.gs
git commit -m "Emergency rollback to <commit-hash>"
```

---

## 📊 Data Issues

### Problem: Report shows wrong data

**Cause**: Sheet name or column mapping incorrect.

**Solution**:
Check CONFIG matches your spreadsheet:
```javascript
const CONFIG = {
  SHEET_NAME: 'Portfolio',  // Your sheet name
  TIMESTAMP_COL: 1,         // Column A
  ASSET_ID_COL: 2,          // Column B
  ASSET_NAME_COL: 3,        // Column C
  BROKER_COL: 4,            // Column D
  DROPDOWN_COL: 5,          // Column E
  VALUE_COL: 6,             // Column F
  // ... etc
};
```

---

### Problem: Duplicate rows appearing

**Cause**: Deduplication not working.

**Solution**:
1. Verify Asset ID (column B) and Asset Name (column C) are unique together
2. Check deduplication logic in `addWeeklyTimestampRows()`:
   ```javascript
   const compositeKey = assetId + '|' + assetName;
   ```
3. Empty cells treated as unique - fill in missing IDs/Names

---

### Problem: Formatting not copying to new rows

**Cause**: Reference row has wrong format.

**Solution**:
The script copies formatting from existing rows (1-6 columns).
Make sure your first data row has correct formatting:
- Timestamp format in column A
- Dropdown validation in column E
- Number formats in value columns

---

## 🔐 Permission Issues

### Problem: "You do not have permission to access this file"

**Cause**: Script can't access spreadsheet.

**Solution**:
1. Verify SPREADSHEET_ID is correct
2. Make sure spreadsheet is owned by same Google account as clasp
3. Check spreadsheet isn't deleted or moved
4. Re-authorize: Run `verifySetup()` and grant permissions

---

### Problem: "Authorization required" on every run

**Cause**: Script authorization lost.

**Solution**:
1. Open script: `invest-open`
2. Run any function
3. Click "Review Permissions"
4. Grant all permissions
5. Try running again

---

## 📈 Performance Issues

### Problem: Script timeout (exceeds 6 minutes)

**Cause**: Too many rows to process.

**Solution**:
1. Reduce data range in script
2. Archive old data to separate sheet
3. Process in batches
4. Consider upgrading to workspace account (30 min timeout)

---

### Problem: Execution quota exceeded

**Cause**: Too many executions in 24 hours.

**Solution**:
1. Check current quotas: https://script.google.com/dashboard
2. Free account limits:
   - 90 min/day runtime
   - 20,000 URL Fetch calls/day
   - 100 emails/day
3. Space out triggers
4. Remove unnecessary executions

---

## 🔧 Git Issues

### Problem: "fatal: not a git repository"

**Cause**: Not in project directory.

**Solution**:
```bash
invest  # Use alias to cd to project
# Or:
cd ~/repo/investment-tracker
```

---

### Problem: Merge conflict

**Cause**: Edited in browser AND locally without syncing.

**Solution**:
```bash
# See conflicted files
git status

# Option 1: Keep local version
git checkout --ours invest.gs
git add invest.gs
git commit -m "Resolved conflict: kept local changes"

# Option 2: Keep browser version
git checkout --theirs invest.gs
git add invest.gs
git commit -m "Resolved conflict: kept browser changes"

# Option 3: Manually edit file to keep both
code invest.gs
# Fix conflicts marked with <<<<<<< ======= >>>>>>>
git add invest.gs
git commit -m "Resolved conflict: merged both changes"
```

---

### Problem: Want to see what changed

**Solution**:
```bash
# See uncommitted changes
git diff

# See specific file
git diff invest.gs

# See last commit changes
git show

# See changes between commits
git diff HEAD~2 HEAD
```

---

## 🌐 Browser Issues

### Problem: "invest-open" opens wrong project

**Cause**: Multiple clasp projects or wrong .clasp.json.

**Solution**:
```bash
# Check current project
cat .clasp.json

# Should show:
# {"scriptId":"1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf"}

# If wrong, manually open:
open https://script.google.com/d/1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf/edit
```

---

## 📋 Testing Issues

### Problem: Test functions not working

**Cause**: Functions don't exist or syntax error.

**Solution**:
1. Check function exists in script
2. Check for syntax errors: invest-logs
3. Try running simpler function first: `verifySetup()`
4. Check execution log in browser

---

### Problem: Can't see execution logs

**Solution**:
```bash
# In terminal
invest-logs

# In browser
# Open: https://script.google.com/home/executions

# Or in Apps Script editor:
invest-open
# Click "Executions" icon (clock) on left sidebar
```

---

## 🆘 When All Else Fails

### Nuclear Option: Fresh Start

```bash
# 1. Backup current code
cp invest.gs invest.gs.backup

# 2. Pull fresh from Google Apps Script
clasp pull

# 3. If that fails, recreate from backup
cp invest.gs.backup invest.gs

# 4. Force deploy
clasp push --force

# 5. Test
invest-open
```

---

## 📞 Getting More Help

### Check Logs
```bash
# Apps Script logs
invest-logs

# Or in browser:
# https://script.google.com/home/executions
```

### Check Configuration
```bash
# Run setup verification
invest-open
# Select verifySetup
# Click Run
# Check execution log
```

### Check Git Status
```bash
invest
git status
git log --oneline -5
```

### Verify File Contents
```bash
invest
cat invest.gs | grep "SPREADSHEET_ID"
cat invest.gs | grep "EMAIL_TO"
```

---

## 🎯 Prevention Tips

### ✅ Good Practices:
- Always test with test functions before relying on triggers
- Run `verifySetup()` after config changes
- Use `invest-deploy` (not `clasp push` directly)
- Commit frequently with descriptive messages
- Test in browser after every deployment
- Keep backup of working version

### ❌ Avoid:
- Direct `clasp push` without Git commit
- Editing in browser without `invest-sync`
- Deleting row 2 (reference row)
- Changing sheet/column names without updating CONFIG
- Running multiple heavy scripts simultaneously
- Exceeding execution quotas

---

**Still stuck?** Review the documentation:
- `START_HERE.md` - Quick start
- `VISUAL_GUIDE.md` - Workflow diagrams
- `CLASP_CHEATSHEET.md` - Command reference

**Remember**: Most issues are configuration or authorization related. Run `verifySetup()` first! ✅
