# Development Workflow - Investment Tracker

## 🎯 Recommended Git-First Workflow

### Daily Development Process:

```bash
# 1. Make sure you're up to date
cd ~/repo/investment-tracker
git pull origin main
clasp pull  # In case you edited in browser

# 2. Create a feature branch (optional but recommended)
git checkout -b feature/update-email-template

# 3. Make your changes
code invest.gs  # or any editor

# 4. Test locally (if possible) or review carefully

# 5. Commit to Git FIRST (version control)
git add invest.gs
git commit -m "Updated email template with new styling"

# 6. Deploy to production
clasp push

# 7. Test in production
clasp open-script
# Run test functions manually

# 8. If everything works, push to GitHub
git push origin feature/update-email-template

# 9. Merge to main (if using branches)
git checkout main
git merge feature/update-email-template
git push origin main
```

---

## 🔄 Different Workflows for Different Scenarios

### Scenario 1: Quick Fix (Low Risk)
```bash
# Edit
code invest.gs

# Commit
git add invest.gs
git commit -m "Fixed typo in email subject"

# Deploy
clasp push

# Backup
git push origin main
```

### Scenario 2: Major Feature (High Risk)
```bash
# Branch
git checkout -b feature/new-report-section

# Develop with multiple commits
# ... make changes ...
git add .
git commit -m "WIP: Added new section structure"
# ... more changes ...
git commit -m "Completed new report section"

# Test deployment
clasp push

# Test in production thoroughly
clasp logs

# If good, merge and push
git checkout main
git merge feature/new-report-section
git push origin main
```

### Scenario 3: Emergency Hotfix
```bash
# If broken in production, rollback via Git:
git log --oneline  # Find last good commit
git checkout <commit-hash> invest.gs
clasp push  # Deploy old working version
git add invest.gs
git commit -m "Hotfix: Rolled back to working version"
git push origin main

# Then fix properly
# ... make fix ...
git commit -m "Properly fixed the issue"
clasp push
```

### Scenario 4: Edited in Browser
```bash
# Pull changes from Google Apps Script
clasp pull

# Review changes
git diff invest.gs

# Commit to Git
git add invest.gs
git commit -m "Updated config via browser"
git push origin main
```

---

## 📋 Workflow Comparison

| Step | Git-First (Recommended) | Current (Push-First) |
|------|------------------------|----------------------|
| 1 | Edit locally | Edit locally |
| 2 | `git commit` | `clasp push` ⚠️ |
| 3 | `clasp push` | `git commit` |
| 4 | `git push` | `git push` |
| **Risk** | ✅ Low - committed first | ❌ High - live before commit |
| **Rollback** | ✅ Easy via Git | ❌ Manual |
| **History** | ✅ True dev history | ⚠️ Post-deployment only |

---

## 🛡️ Safety Best Practices

### 1. Always Test Before Deploy
```bash
# Option A: Use test functions in script
# testWeeklyReport(), etc.

# Option B: Use separate test script
clasp create --title "Investment Tracker TEST" --type standalone
# Deploy to test project first
```

### 2. Use Branches for Features
```bash
git checkout -b feature/new-analytics
# ... develop ...
clasp push  # Test
git push origin feature/new-analytics
# Only merge to main when confirmed working
```

### 3. Tag Releases
```bash
git tag -a v1.0.0 -m "Initial stable release"
git push origin v1.0.0

# Later, rollback to a tag if needed
git checkout v1.0.0
clasp push
```

### 4. Keep a Backup Branch
```bash
# Before major changes
git checkout -b backup-stable
git push origin backup-stable
git checkout main
# ... make risky changes ...
```

---

## 🎯 Your Current Situation

Right now:
- ✅ Git repo initialized
- ✅ 4 commits made
- ❌ Not pushed to GitHub yet
- ⚠️ All commits are post-deployment

### To Get on Track:

```bash
# 1. Create GitHub repo (if not exists)
# Go to https://github.com/new
# Name: investment-tracker
# Don't initialize with README (you already have files)

# 2. Connect local repo to GitHub
git remote add origin https://github.com/YOUR_USERNAME/investment-tracker.git

# 3. Push existing history
git push -u origin main

# 4. Going forward, use Git-First workflow
```

---

## 💭 The Real Question: How Much Control Do You Want?

### If you want **FULL version control** (like professional software):
- Use Git-First workflow
- Create branches for features
- Never push to production without committing first
- Use GitHub as source of truth

### If you want **simple backup** (current setup is fine):
- Edit freely
- clasp push whenever
- git commit as documentation
- GitHub is just a backup

Both are valid! It depends on:
- How often you make changes
- How critical uptime is
- Whether multiple people collaborate
- Your comfort with Git

---

## 🎓 My Recommendation for You:

**Hybrid Approach:**

```bash
# For small changes (typos, config):
edit → clasp push → git commit → git push

# For big changes (new features):
edit → git commit → clasp push → test → git push

# Always:
- Keep Git history
- Push to GitHub weekly
- Test functions manually before trusting automation
```

This gives you:
- ✅ Flexibility for quick fixes
- ✅ Safety for major changes  
- ✅ Git history as documentation
- ✅ GitHub as backup

---

## 📝 Quick Reference Card

```bash
# Morning routine (if edited in browser yesterday)
clasp pull && git add . && git commit -m "Synced from browser"

# Making changes
code invest.gs

# Safe deployment
git add invest.gs
git commit -m "Your change description"
clasp push
# Test manually in browser
git push origin main

# Rollback if something breaks
git log --oneline
git checkout HEAD~1 invest.gs
clasp push

# Check what's different between local and Google
clasp pull --dry-run  # (not a real command, just for illustration)
```

---

**Want me to help you set up a specific workflow or push to GitHub now?**
