# GitHub Actions Auto-Deployment Setup

This document explains how to set up automatic deployment from GitHub to Google Apps Script.

## Overview

When you push code to GitHub, GitHub Actions automatically deploys it to Google Apps Script using clasp.

**Flow:**
```
Local Edit → Git Commit → Git Push → GitHub → GitHub Actions → Google Apps Script
                                                    ↓
                                            Auto-deployment
```

## Prerequisites

1. GitHub repository created
2. clasp installed locally (`npm install -g @google/clasp`)
3. clasp authenticated (`clasp login`)

## Setup Instructions

### Step 1: Get clasp Credentials

Run this command to get your clasp credentials:

```bash
cat ~/.clasprc.json
```

Copy the entire JSON content. It looks like:
```json
{
  "token": {
    "access_token": "ya29.a0...",
    "refresh_token": "1//0e...",
    "scope": "...",
    "token_type": "Bearer",
    "expiry_date": 1234567890
  },
  "oauth2ClientSettings": {
    "clientId": "...",
    "clientSecret": "...",
    "redirectUri": "..."
  },
  "isLocalCreds": false
}
```

### Step 2: Get clasp Project Config

Run this command:

```bash
cat .clasp.json
```

Copy the JSON content. It looks like:
```json
{
  "scriptId": "1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf",
  "rootDir": "/Users/yusuf.mukti/repo/investment-tracker"
}
```

**Important:** Remove the `rootDir` field for GitHub Actions. Final should be:
```json
{
  "scriptId": "1GMfMEl8eXo_sPyFrNVZfddnQ-fhKhymvb080XhtdmTE8B8ul9ASgMExf"
}
```

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add these two secrets:

**Secret 1: CLASP_CREDENTIALS**
- Name: `CLASP_CREDENTIALS`
- Value: Contents of `~/.clasprc.json` (from Step 1)

**Secret 2: CLASP_CONFIG**
- Name: `CLASP_CONFIG`
- Value: Contents of `.clasp.json` WITHOUT `rootDir` (from Step 2)

### Step 4: Push to GitHub

```bash
# Add GitHub remote (if not already added)
git remote add origin https://github.com/YOUR_USERNAME/investment-tracker.git

# Push code and GitHub Actions workflow
git push -u origin main
```

### Step 5: Verify Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see "Deploy to Google Apps Script" workflow running
4. Once complete, verify in Google Apps Script editor

## Usage

After setup, deployment is automatic:

```bash
# 1. Edit code locally
code invest.gs

# 2. Commit to Git
git add invest.gs
git commit -m "Updated portfolio calculation"

# 3. Push to GitHub
git push

# GitHub Actions automatically deploys to Google Apps Script!
```

## Workflow Triggers

The workflow runs when:
- You push to `main` or `master` branch
- Changes are made to `invest.gs` or `appsscript.json`
- Manually triggered from Actions tab

## Updated Daily Workflow

**Before (Manual deployment):**
```bash
1. Edit code
2. invest-deploy     # Manual deploy
3. Test
```

**After (Auto deployment):**
```bash
1. Edit code
2. git add .
3. git commit -m "message"
4. git push          # Auto-deploys via GitHub Actions!
5. Test (after 1-2 minutes)
```

## Monitoring

- Check deployment status: GitHub repo → **Actions** tab
- View logs: Click on workflow run → Click on "deploy" job
- Errors will be shown in the Actions log

## Security Notes

- Never commit `.clasprc.json` or credentials to Git
- `.clasp.json` is in `.gitignore` (safe)
- Credentials stored securely in GitHub Secrets
- Only repository admins can access secrets

## Troubleshooting

### Deployment fails with "401 Unauthorized"

Your clasp token expired. Refresh credentials:
```bash
clasp login
cat ~/.clasprc.json
# Update CLASP_CREDENTIALS secret in GitHub
```

### Workflow doesn't trigger

Check:
- Push is to `main` or `master` branch
- Changes include `invest.gs` or `appsscript.json`
- Workflow file is in `.github/workflows/deploy.yml`

### Deployment succeeds but code not updated

- Wait 1-2 minutes for Google to process
- Hard refresh browser (Cmd+Shift+R)
- Check execution log in GitHub Actions

## Local Development vs GitHub

You can still use local deployment:
```bash
invest-deploy     # Deploy directly from local machine
```

Or rely on GitHub:
```bash
git push          # Auto-deploys via GitHub Actions
```

Both work! GitHub Actions is for team collaboration and automation.

## Benefits

- GitHub is single source of truth
- No manual clasp push needed
- Team members can collaborate via pull requests
- Automatic deployment on merge
- Deployment history in GitHub Actions
- Can roll back by reverting commits

## Alternative: Branch Protection

For production use, add branch protection:

1. Settings → Branches → Add rule
2. Require pull request reviews
3. Require status checks (GitHub Actions)
4. Code reviewed before deployment

This ensures quality control before auto-deployment.
