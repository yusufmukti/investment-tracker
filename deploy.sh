#!/bin/bash
# Git-First Deployment Script for Investment Tracker
# This script ensures you commit to Git BEFORE deploying to Google Apps Script

set -e  # Exit on any error

echo "🚀 Investment Tracker - Git-First Deployment"
echo "============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "invest.gs" ]; then
    echo "❌ Error: invest.gs not found. Run this from ~/repo/investment-tracker/"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "📝 Uncommitted changes detected"
    echo ""
    
    # Show what's changed
    echo "Changed files:"
    git status --short
    echo ""
    
    # Ask for commit message
    read -p "Enter commit message: " commit_msg
    
    if [ -z "$commit_msg" ]; then
        echo "❌ Commit message cannot be empty"
        exit 1
    fi
    
    # Commit changes
    echo ""
    echo "📦 Committing to Git..."
    git add invest.gs appsscript.json
    git commit -m "$commit_msg"
    echo "✅ Committed to Git"
else
    echo "✅ No uncommitted changes - Git is clean"
fi

echo ""
echo "🚀 Deploying to Google Apps Script..."
clasp push

if [ $? -eq 0 ]; then
    echo "✅ Deployed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Test in browser: clasp open-script"
    echo "   2. Push to GitHub: git push origin main"
    echo ""
    echo "💡 Tip: Run test functions before trusting automation!"
else
    echo "❌ Deployment failed!"
    exit 1
fi
