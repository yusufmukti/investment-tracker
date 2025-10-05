# 🎯 START HERE - New User Guide

**Welcome to Your Investment Tracker!** 

This is your automated Google Apps Script for weekly portfolio tracking with a **Git-First workflow** for safe, version-controlled development.

---

## 🚀 Quick Start (5 minutes)

### Step 1: Reload Your Shell
```bash
source ~/.zshrc
# Or just open a new terminal window
```

### Step 2: Test Your Setup
```bash
invest-open
```

This opens the Apps Script editor in your browser. Then:
1. Select function: `verifySetup`
2. Click **Run** ▶️
3. Authorize permissions (first time only)
4. Check execution log for:
   - ✅ SPREADSHEET_ID configured
   - ✅ Test email sent successfully!

### Step 3: Set Up Triggers

In the Apps Script editor:
1. Click **⏰ Triggers** (clock icon on left)
2. Click **+ Add Trigger** for each:

| Function | Event | Time | Timezone |
|----------|-------|------|----------|
| `sendWeeklyPortfolioReport` | Time-driven | Week timer - Sunday 8-9am | Your timezone |
| `sendSaturdayReminder` | Time-driven | Week timer - Saturday 10-11am | Your timezone |
| `addWeeklyTimestampRows` | Time-driven | Week timer - Saturday 6-7pm | Your timezone |

### Step 4: Test Each Function

Select and run:
- ✅ `testWeeklyReport()` - Check your email
- ✅ `testSaturdayReminder()` - Check your email  
- ✅ `testWeeklyTimestampRows()` - Check spreadsheet for new rows

---

## 📖 Documentation Quick Links

Choose your learning style:

### 🎯 **Just Want Commands?**
→ Read: `GIT_FIRST_QUICK_REF.md`

### 📊 **Visual Learner?**
→ Read: `VISUAL_GUIDE.md`

### 🎓 **Want to Understand Why?**
→ Read: `WORKFLOW_GUIDE.md`

### 🔧 **Need Command Reference?**
→ Read: `CLASP_CHEATSHEET.md`

### 📚 **Want Everything?**
→ Read: `README.md`

---

## ⚡ Daily Commands (After Setup)

### Making Changes:
```bash
invest-edit      # Open VS Code
# ... edit invest.gs ...
invest-deploy    # Deploy with Git-First (commits automatically)
invest-open      # Test in browser
```

### After Editing in Browser:
```bash
invest-sync      # Sync back to Git
```

### View Logs:
```bash
invest-logs      # See execution history
```

---

## 🎯 What You Have Now

### ✅ 3 Automated Functions:
1. **Weekly Portfolio Report** (Sunday 8am)
   - Email with analytics, trends, allocation breakdown
   
2. **Saturday Reminder** (Saturday 10am)
   - Reminder to update values before Sunday report
   
3. **Auto-Timestamp Rows** (Saturday 6pm)
   - Duplicates all rows with fresh timestamp
   - Preserves dropdowns and formatting
   - Deduplicates by Asset ID + Asset Name

### ✅ Git-First Workflow:
- **Version control BEFORE deployment** (not after!)
- Easy rollback with `git checkout`
- Safe experimentation with branches
- Complete development history

### ✅ Helper Scripts:
- `deploy.sh` - Commits to Git, then deploys
- `sync.sh` - Syncs browser edits back to Git
- `invest-deploy`, `invest-sync`, etc. - Shell aliases

### ✅ Documentation:
- Complete guides for setup, workflow, commands
- Visual diagrams and quick references
- Troubleshooting tips

---

## 🔥 Your First Edit

Let's make a simple change to verify everything works:

1. **Open VS Code:**
   ```bash
   invest-edit
   ```

2. **Make a tiny change** in `invest.gs`:
   Find the line with `EMAIL_TO` and add a comment:
   ```javascript
   EMAIL_TO: 'yusufajarmoekti@gmail.com', // Your notification email
   ```

3. **Deploy with Git-First:**
   ```bash
   invest-deploy
   ```
   
   When prompted, enter commit message:
   ```
   Added comment to EMAIL_TO field
   ```

4. **Verify in browser:**
   ```bash
   invest-open
   ```
   
   Check that your comment appears in the code.

5. **Check Git history:**
   ```bash
   cd ~/repo/investment-tracker
   git log --oneline | head -3
   ```
   
   You should see your commit!

**Congratulations!** 🎉 You just completed a full Git-First deployment cycle.

---

## 🚨 Important Reminders

### ✅ DO:
- Always use `./deploy.sh` or `invest-deploy` to deploy changes
- Use `./sync.sh` or `invest-sync` after editing in browser
- Test functions after each deploy
- Push to GitHub regularly: `git push origin main`

### ❌ DON'T:
- Don't use `clasp push` directly (bypasses Git-First workflow)
- Don't forget to sync after browser edits
- Don't deploy without testing

---

## 🎓 Learning Path

### Week 1: Get Comfortable
- [ ] Complete Quick Start above
- [ ] Make 2-3 small changes using `invest-deploy`
- [ ] Read `GIT_FIRST_QUICK_REF.md`

### Week 2: Understand the System
- [ ] Read `VISUAL_GUIDE.md`
- [ ] Try editing in browser, then use `invest-sync`
- [ ] Review `git log` to see your history

### Week 3: Master the Workflow
- [ ] Read `WORKFLOW_GUIDE.md`
- [ ] Try creating a branch for experimentation
- [ ] Read `CLASP_CHEATSHEET.md` for advanced commands

### Week 4: Production Ready
- [ ] Set up GitHub remote (optional)
- [ ] Try emergency rollback procedure
- [ ] Customize triggers or functions as needed

---

## 🆘 Need Help?

### Problem: Commands don't work
```bash
# Did you reload your shell?
source ~/.zshrc
```

### Problem: Can't find project
```bash
# Use the invest alias
invest
```

### Problem: Not sure what changed
```bash
cd ~/repo/investment-tracker
git status
git diff
```

### Problem: Want to see execution logs
```bash
invest-logs
# Or visit: https://script.google.com/home/executions
```

---

## 📊 Your Configuration

- **Spreadsheet ID**: `1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg`
- **Email**: `yusufajarmoekti@gmail.com`
- **Script ID**: `1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf`
- **Project Location**: `~/repo/investment-tracker/`

---

## 🎯 Next Steps

1. ✅ Complete **Quick Start** above (5 minutes)
2. 📖 Read **one** documentation file that matches your style
3. 🔥 Make **your first edit** (see "Your First Edit" above)
4. 🚀 Start using the system!

---

## 🔗 Important Links

- **Apps Script Editor**: https://script.google.com/d/1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf/edit
- **Your Spreadsheet**: https://docs.google.com/spreadsheets/d/1a-sx-kSTcYVSGu2chn8sUUmoyOt8ZBYu7GnoMhl8AMg/edit
- **Execution Logs**: https://script.google.com/home/executions

---

**You're all set!** 🎉

Start with the Quick Start above, then read the documentation that fits your learning style.

**Remember**: Git-First means commit BEFORE deploying. The scripts handle this automatically! 🚀
