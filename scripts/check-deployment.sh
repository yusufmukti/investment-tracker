#!/bin/bash

echo "=========================================="
echo "   DEPLOYMENT STATUS CHECKER"
echo "=========================================="
echo ""

# Check if clasp is configured
if [ ! -f .clasp.json ]; then
    echo "❌ .clasp.json not found"
    exit 1
fi

SCRIPT_ID=$(grep -o '"scriptId":"[^"]*"' .clasp.json | cut -d'"' -f4)

echo "📋 Script ID: $SCRIPT_ID"
echo ""

# Check GitHub Actions
echo "🔍 Checking GitHub Actions..."
echo "   URL: https://github.com/yusufmukti/investment-tracker/actions"
echo ""

# Check Apps Script editor
echo "🔍 Checking Apps Script Editor..."
echo "   URL: https://script.google.com/home/projects/$SCRIPT_ID/edit"
echo ""

# Check last commit
echo "📝 Last Local Commit:"
git log -1 --pretty=format:"   %h - %s (%cr)" 
echo ""
echo ""

# Check remote commits
echo "📤 Last Pushed Commit:"
git log origin/master -1 --pretty=format:"   %h - %s (%cr)"
echo ""
echo ""

# Check clasp status
echo "🔧 Clasp Status:"
clasp status 2>&1 | grep -E "(Tracked|Not logged)" || echo "   Connected"
echo ""

# Check if there are unpushed changes
UNPUSHED=$(git log origin/master..HEAD --oneline | wc -l | xargs)
if [ "$UNPUSHED" -gt 0 ]; then
    echo "⚠️  You have $UNPUSHED unpushed commit(s)"
    echo "   Run: git push origin master"
else
    echo "✅ All commits are pushed to GitHub"
fi
echo ""

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes"
    echo "   Run: git add . && git commit -m 'your message'"
else
    echo "✅ No uncommitted changes"
fi
echo ""

echo "=========================================="
echo "   QUICK ACTIONS"
echo "=========================================="
echo ""
echo "• Check GitHub Actions:"
echo "  open https://github.com/yusufmukti/investment-tracker/actions"
echo ""
echo "• Check Apps Script Editor:"
echo "  open https://script.google.com/home/projects/$SCRIPT_ID/edit"
echo ""
echo "• Manual deployment:"
echo "  invest-deploy"
echo ""
echo "=========================================="
