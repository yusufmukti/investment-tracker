#!/bin/bash
# Sync Script - Pull changes from Google Apps Script and commit to Git
# Use this after editing in the browser

set -e

echo "Syncing from Google Apps Script"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "invest.gs" ]; then
    echo "[ERROR] invest.gs not found. Run this from ~/repo/investment-tracker/"
    exit 1
fi

# Check for uncommitted local changes
if ! git diff-index --quiet HEAD --; then
    echo "[WARNING] You have uncommitted local changes!"
    echo ""
    git status --short
    echo ""
    read -p "Pull anyway? This might cause conflicts (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo "[INFO] Sync cancelled"
        exit 1
    fi
fi

echo "Pulling from Google Apps Script..."
clasp pull

if [ $? -ne 0 ]; then
    echo "[ERROR] Pull failed!"
    exit 1
fi

echo "[OK] Pulled successfully"
echo ""

# Check if anything changed
if git diff-index --quiet HEAD --; then
    echo "[OK] No changes detected - already in sync"
else
    echo "Changes detected:"
    git status --short
    echo ""
    
    # Show diff
    echo "Changes:"
    git diff invest.gs | head -20
    echo ""
    
    read -p "Commit these changes? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        read -p "Enter commit message (or press enter for default): " commit_msg
        
        if [ -z "$commit_msg" ]; then
            commit_msg="Synced changes from Google Apps Script"
        fi
        
        git add invest.gs appsscript.json
        git commit -m "$commit_msg"
        echo "[OK] Changes committed to Git"
        echo ""
        echo "Note: Don't forget to push to GitHub: git push origin main"
    else
        echo "[INFO] Changes not committed"
    fi
fi
