#!/bin/bash
# Setup Git-First Workflow Aliases
# Run this once to add helpful aliases to your shell

SHELL_RC="$HOME/.zshrc"

echo "Setting up Git-First Workflow Aliases"
echo "====================================="
echo ""

# Check if aliases already exist
if grep -q "# Investment Tracker aliases" "$SHELL_RC"; then
    echo "[WARNING] Aliases already exist in $SHELL_RC"
    read -p "Overwrite? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo "[INFO] Setup cancelled"
        exit 0
    fi
    # Remove old aliases
    sed -i '' '/# Investment Tracker aliases/,/# End Investment Tracker aliases/d' "$SHELL_RC"
fi

# Add aliases
cat >> "$SHELL_RC" << 'EOF'

# Investment Tracker aliases
alias invest='cd ~/repo/investment-tracker'
alias invest-deploy='cd ~/repo/investment-tracker && ./scripts/deploy.sh'
alias invest-sync='cd ~/repo/investment-tracker && ./scripts/sync.sh'
alias invest-open='cd ~/repo/investment-tracker && clasp open-script'
alias invest-logs='cd ~/repo/investment-tracker && clasp logs'
alias invest-edit='cd ~/repo/investment-tracker && code .'
# End Investment Tracker aliases
EOF

echo "[OK] Aliases added to $SHELL_RC"
echo ""
echo "Available aliases:"
echo "   invest          - cd to project directory"
echo "   invest-deploy   - Deploy with Git-First workflow"
echo "   invest-sync     - Sync from browser edits"
echo "   invest-open     - Open in browser"
echo "   invest-logs     - View execution logs"
echo "   invest-edit     - Open in VS Code"
echo ""
echo "Reload your shell to use aliases:"
echo "   source ~/.zshrc"
echo ""
echo "Or open a new terminal window"
