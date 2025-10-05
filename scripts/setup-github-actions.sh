#!/bin/bash
# Quick Setup for GitHub Actions Auto-Deployment

echo "GitHub Actions Auto-Deployment Setup"
echo "====================================="
echo ""

# Check if clasp is authenticated
if [ ! -f ~/.clasprc.json ]; then
    echo "[ERROR] clasp not authenticated. Run: clasp login"
    exit 1
fi

echo "Step 1: Get CLASP_CREDENTIALS"
echo "------------------------------"
echo "Copy this entire JSON and save as GitHub Secret 'CLASP_CREDENTIALS':"
echo ""
cat ~/.clasprc.json
echo ""
echo ""

echo "Step 2: Get CLASP_CONFIG"
echo "------------------------"
echo "Copy this JSON (WITHOUT rootDir) and save as GitHub Secret 'CLASP_CONFIG':"
echo ""
if [ -f .clasp.json ]; then
    # Remove rootDir from output
    cat .clasp.json | grep -v "rootDir"
else
    echo "[ERROR] .clasp.json not found"
    exit 1
fi
echo ""
echo ""

echo "Step 3: Add Secrets to GitHub"
echo "------------------------------"
echo "1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions"
echo "2. Click 'New repository secret'"
echo "3. Add CLASP_CREDENTIALS (from Step 1)"
echo "4. Add CLASP_CONFIG (from Step 2)"
echo ""
echo ""

echo "Step 4: Push to GitHub"
echo "----------------------"
echo "Run these commands:"
echo ""
echo "  git add .github/workflows/deploy.yml docs/GITHUB_ACTIONS_SETUP.md"
echo "  git commit -m 'Added GitHub Actions auto-deployment'"
echo "  git push origin main"
echo ""
echo ""

echo "Step 5: Verify"
echo "--------------"
echo "1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions"
echo "2. Check if workflow runs successfully"
echo "3. Verify deployment in Google Apps Script"
echo ""
echo ""

echo "Once setup, any push to GitHub will auto-deploy to Google Apps Script!"
echo ""
echo "Read full documentation: docs/GITHUB_ACTIONS_SETUP.md"
