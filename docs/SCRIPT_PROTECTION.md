# Script Protection Guidelines

## Why You Cannot Make Scripts Read-Only

Google Apps Script does **not support** making scripts read-only or preventing edits in the console. As the script owner, you always have full edit access.

## What Happens If You Edit in Console

**When you edit directly in Apps Script console:**

1. ❌ **Changes are NOT in Git** - No version history
2. ❌ **Changes WILL BE LOST** - Next `clasp push` overwrites them
3. ❌ **No code review** - Changes bypass your development workflow
4. ❌ **No testing** - Changes go live immediately
5. ❌ **No rollback** - Can't easily undo mistakes

**Example Timeline:**
```
Day 1, 10am: Edit script in console (add new feature)
Day 1, 11am: Feature works! ✓
Day 2, 9am:  Someone pushes to GitHub
Day 2, 9:05am: GitHub Actions deploys → YOUR CHANGES DELETED! ✗
```

## Best Practices to Prevent Console Edits

### 1. Visual Warnings

We've added prominent warnings at the top of all script files:

```javascript
/**
 * ⚠️  WARNING: DO NOT EDIT IN CONSOLE  ⚠️
 * This file is managed by GitHub
 * Changes here WILL BE OVERWRITTEN
 */
```

### 2. Version Tracking

The `version.gs` file tracks:
- Who deployed (GitHub Actions vs Manual)
- When it was deployed
- Which commit was deployed

### 3. Integrity Checking

Run this function periodically to detect manual edits:

```javascript
// In Apps Script console
checkScriptIntegrity()
```

If manual edits detected, it will email you a warning.

### 4. Education & Documentation

**Share this with your team:**

> "Never edit in Apps Script console. Always edit locally → commit → deploy."

### 5. Trigger Configuration

Set up a daily integrity check:

1. Go to Apps Script editor
2. Click Triggers (clock icon)
3. Add trigger:
   - Function: `checkForManualEdits`
   - Event: Time-driven
   - Type: Day timer
   - Time: 7am-8am

This emails you if someone made manual edits.

## The Correct Workflow

```bash
# ✓ CORRECT - Git-first workflow
1. cd ~/repo/investment-tracker
2. code invest.gs                    # Edit locally
3. git add invest.gs                 # Stage changes
4. git commit -m "your changes"      # Commit to Git
5. invest-deploy                     # Deploy to Apps Script
6. git push origin master            # Trigger GitHub Actions

# ✗ WRONG - Console editing
1. Open Apps Script console
2. Edit invest.gs directly
3. Save
4. (Changes will be lost on next deployment!)
```

## Recovery Process

**If someone accidentally edited in console:**

1. **Save the console changes** (copy to text file)
2. **Check what was changed** (compare with GitHub version)
3. **Apply changes locally**:
   ```bash
   cd ~/repo/investment-tracker
   # Paste the changes from console into local file
   code invest.gs
   ```
4. **Commit and deploy**:
   ```bash
   git add invest.gs
   git commit -m "fix: recover console edits"
   invest-deploy
   git push origin master
   ```

## Access Control

### For Team Projects

If multiple people have access:

**Option 1: Separate Development & Production**
- **Dev Script**: Everyone has edit access (for testing)
- **Prod Script**: Only 1-2 people have access
- Deploy from Dev → Prod via clasp

**Option 2: Role-Based Access**
- **Developers**: No direct Apps Script access
- **DevOps**: Only they can access Apps Script console
- All changes go through Pull Requests

**Option 3: Audit Trail**
- Keep detailed logs of who deployed when
- Require commit messages explaining changes
- Review all deployments in team meetings

## Monitoring

### Set Up Alerts

1. **Version Mismatch Alert**:
   - Daily check if deployed version matches GitHub
   - Email alert if mismatch detected

2. **Deployment Notification**:
   - Email on every GitHub Actions deployment
   - Include commit hash and changes

3. **Execution Monitoring**:
   - Monitor script execution logs
   - Alert on errors or unexpected behavior

### Example Alert Email

```
Subject: ⚠️ Script Version Mismatch Detected

The investment tracker script version doesn't match GitHub.

Deployed By: Manual (not GitHub Actions)
Last Deployed: 2025-10-05 10:30:00
Current GitHub Commit: 4fd2167

Action Required:
Please redeploy from GitHub to ensure consistency.

1. cd ~/repo/investment-tracker
2. git pull origin master
3. invest-deploy
```

## Summary

**You CANNOT prevent console edits, but you CAN:**

✅ Add prominent warnings
✅ Track who deployed (GitHub vs Manual)
✅ Detect and alert on manual edits
✅ Educate team on proper workflow
✅ Set up daily integrity checks
✅ Document the risks clearly

**The key is making the correct workflow so easy that nobody wants to edit in console!**

---

## Related Documentation

- [Git-First Workflow](../README.md#workflow)
- [Deployment Guide](../README.md#commands)
- [Contributing Guidelines](../CONTRIBUTING.md)
