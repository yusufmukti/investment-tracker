# 🚀 Git-First Workflow - Quick Reference

## ⚡ Super Quick Commands

```bash
# Deploy changes (Git → Google Apps Script)
./deploy.sh

# Sync from browser edits
./sync.sh

# Open in browser
clasp open-script

# View logs
clasp logs
```

---

## 🔄 Complete Workflow

### Making Changes Locally

```bash
# 1. Go to project
cd ~/repo/investment-tracker

# 2. Edit file
code invest.gs

# 3. Deploy (commits to Git first!)
./deploy.sh
# Enter commit message when prompted

# 4. Test in browser
clasp open-script
# Run test functions

# 5. Push to GitHub
git push origin main
```

**With Aliases** (after running `./setup-aliases.sh`):
```bash
invest              # cd to project
invest-edit         # Open in VS Code
invest-deploy       # Deploy with Git-First
invest-open         # Open in browser
```

---

### If You Edited in Browser

```bash
# 1. Sync from Google Apps Script
./sync.sh
# Or: invest-sync

# 2. Review changes and commit

# 3. Push to GitHub
git push origin main
```

---

## 📊 What Happens Under the Hood

### `./deploy.sh`:
1. ✅ Checks for uncommitted changes
2. 📝 Asks for commit message
3. 💾 **Commits to Git** (version control!)
4. 🚀 Deploys to Google Apps Script (`clasp push`)
5. ✅ Shows next steps

### `./sync.sh`:
1. 📥 Pulls from Google Apps Script (`clasp pull`)
2. 📊 Shows what changed
3. 💬 Asks if you want to commit
4. 💾 **Commits to Git** (if confirmed)

---

## 🎯 Benefits of Git-First

✅ **Version control BEFORE production**
- Changes are committed before deployment
- Can rollback using Git history
- Safe experimentation

✅ **Better history**
- Git log shows true development history
- Not just post-deployment documentation

✅ **Team-ready**
- Can use branches for features
- Pull requests become possible
- Proper collaboration workflow

---

## 🔧 Manual Commands (if scripts fail)

### Deploy Manually:
```bash
git add invest.gs
git commit -m "Your message"
clasp push
```

### Sync Manually:
```bash
clasp pull
git add invest.gs
git commit -m "Synced from browser"
```

### Check Status:
```bash
git status          # See uncommitted changes
git log --oneline   # See commit history
clasp --help        # See clasp commands
```

---

## 🚨 Emergency Rollback

If you deployed bad code:

```bash
# 1. Find last good commit
git log --oneline

# 2. Revert to that commit
git checkout <commit-hash> invest.gs

# 3. Deploy old version
clasp push

# 4. Commit the rollback
git add invest.gs
git commit -m "Rolled back to working version"
```

---

## 📁 File Structure

```
~/repo/investment-tracker/
├── invest.gs              # Main script (edit this)
├── appsscript.json        # Apps Script config
├── deploy.sh              # Deploy script (Git-First)
├── sync.sh                # Sync from browser
├── setup-aliases.sh       # One-time alias setup
├── README.md              # Full documentation
├── CLASP_CHEATSHEET.md    # Command reference
├── SETUP_GUIDE.md         # Initial setup
└── WORKFLOW_GUIDE.md      # Workflow philosophy
```

---

## 🎓 Pro Tips

### Use Branches for Big Changes:
```bash
git checkout -b feature/new-analytics
# ... make changes ...
./deploy.sh
# ... test ...
git checkout main
git merge feature/new-analytics
```

### Tag Stable Versions:
```bash
git tag -a v1.0.0 -m "Stable release"
git push origin v1.0.0
```

### Check What Will Deploy:
```bash
git diff HEAD  # See uncommitted changes
git status     # See modified files
```

### Before Major Changes:
```bash
git branch backup-$(date +%Y%m%d)  # Create backup branch
```

---

## 🔗 Quick Links

- **Apps Script Editor**: https://script.google.com/d/1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf/edit
- **Your Spreadsheet**: https://docs.google.com/spreadsheets/d/1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg/edit

---

## 🎯 Daily Routine

**Morning:**
```bash
invest              # cd to project
invest-sync         # Sync if edited in browser yesterday
```

**Making Changes:**
```bash
invest-edit         # Open VS Code
# ... edit invest.gs ...
invest-deploy       # Deploy with Git-First
invest-open         # Test in browser
```

**End of Day:**
```bash
git push origin main  # Backup to GitHub
```

---

**Remember**: Git-First means **commit BEFORE deploying**, not after! 🎯
