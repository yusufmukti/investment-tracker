# Contributing to Investment Portfolio Tracker

Thank you for your interest in contributing! This document provides guidelines and best practices for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We expect all contributors to:

- Be respectful and professional
- Accept constructive criticism gracefully
- Focus on what is best for the project
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Publishing others' private information
- Other unethical or unprofessional conduct

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18+ (clasp 3.0.6-alpha officially requires 20+)
- **clasp**: Version 3.0.6-alpha
- **Git**: For version control
- **Google Account**: With Apps Script access

### Initial Setup

1. **Fork the repository**
   ```bash
   # On GitHub, click "Fork" button
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/investment-tracker.git
   cd investment-tracker
   ```

3. **Set up upstream remote**
   ```bash
   git remote add upstream https://github.com/yusufmukti/investment-tracker.git
   ```

4. **Install clasp**
   ```bash
   npm install -g @google/clasp@3.0.6-alpha
   ```

5. **Authenticate with Google**
   ```bash
   clasp login
   ```

6. **Load shell aliases**
   ```bash
   source scripts/setup-aliases.sh
   source ~/.zshrc
   ```

---

## Development Workflow

### Git-First Approach

**Important**: Always commit to Git BEFORE deploying to Apps Script.

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature-name

# 2. Make your changes
# Edit invest.gs or other files

# 3. Test locally (manually in Apps Script editor)
invest-open
# Run your test functions

# 4. Commit changes
git add .
git commit -m "feat: add your feature description"

# 5. Deploy to Apps Script
invest-deploy

# 6. Push to your fork
git push origin feature/your-feature-name

# 7. Create Pull Request on GitHub
```

### Keeping Your Fork Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Merge into your local master
git checkout master
git merge upstream/master

# Push to your fork
git push origin master
```

---

## Coding Standards

### JavaScript/Google Apps Script

**Style Guidelines**:
- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Maximum 100 characters
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use semicolons
- **Naming Conventions**:
  - `camelCase` for functions and variables
  - `UPPER_SNAKE_CASE` for constants
  - `PascalCase` for class names (if used)

**Example**:
```javascript
// Good
var CONFIG = {
  EMAIL_TO: 'user@example.com',
  SHEET_NAME: 'asset'
};

function sendWeeklyReport() {
  var sheet = getSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  
  if (!data || data.length === 0) {
    Logger.log('No data found');
    return;
  }
  
  processData(data);
}

// Bad
var config={email:'user@example.com',sheet:'asset'}
function send_weekly_report(){var sheet=getSpreadsheet().getSheetByName(config.sheet);var data=sheet.getDataRange().getValues();if(!data||data.length===0){Logger.log('No data found');return}processData(data)}
```

### Documentation

**Function Documentation**:
```javascript
/**
 * Sends a weekly portfolio report via email
 * 
 * @description Collects portfolio data, calculates trends, and sends
 *              a formatted HTML email with portfolio analytics
 * 
 * @returns {void}
 * 
 * @throws {Error} If spreadsheet cannot be accessed
 * 
 * @example
 * // Manually trigger report
 * sendWeeklyPortfolioReport();
 */
function sendWeeklyPortfolioReport() {
  // Implementation
}
```

**Inline Comments**:
- Use comments to explain **why**, not **what**
- Keep comments concise and relevant
- Update comments when code changes

```javascript
// Good: Explains why
// Deduplicate by Asset ID + Name to handle manual duplicates
var uniqueRows = removeDuplicates(rows);

// Bad: States the obvious
// Loop through rows
for (var i = 0; i < rows.length; i++) {
```

---

## Commit Guidelines

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring (no feature/bug change)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build, etc.)
- `ci`: CI/CD configuration changes

**Examples**:
```bash
# Feature
git commit -m "feat: add monthly report generation"

# Bug fix
git commit -m "fix: prevent duplicate email sends on retry"

# Documentation
git commit -m "docs: update setup instructions for clasp 3.x"

# CI/CD
git commit -m "ci: pin clasp version to 3.0.6-alpha"

# With body
git commit -m "feat: add asset allocation chart

Add pie chart visualization for asset allocation in email reports.
Uses Google Charts API for rendering.

Closes #42"
```

---

## Pull Request Process

### Before Submitting

1. ✅ **Code works**: Test all functions manually
2. ✅ **No errors**: Check Apps Script execution logs
3. ✅ **Documentation updated**: Update README if adding features
4. ✅ **Commits are clean**: Squash unnecessary commits
5. ✅ **Branch is updated**: Merge latest upstream/master

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] CI/CD change

## Testing
- [ ] Tested manually in Apps Script editor
- [ ] Verified email sends correctly
- [ ] Checked execution logs for errors

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] No breaking changes (or documented)

## Related Issues
Closes #<issue_number>
```

### Review Process

1. **Automated checks**: GitHub Actions must pass
2. **Code review**: Maintainer will review code
3. **Changes requested**: Address feedback and push updates
4. **Approval**: Once approved, maintainer will merge

---

## Testing

### Manual Testing

Currently, this project uses manual testing in Apps Script editor.

**Test Functions**:
```javascript
// Test weekly report
testWeeklyReport()

// Test reminder email
testSaturdayReminder()

// Test timestamp rows
testWeeklyTimestampRows()

// Test validation preservation
testValidationPreservation()
```

**Testing Checklist**:
- [ ] Function executes without errors
- [ ] Email sends correctly (check inbox)
- [ ] Email formatting is correct (HTML renders properly)
- [ ] Data calculations are accurate
- [ ] Spreadsheet updates correctly
- [ ] No duplicate data created
- [ ] Validation rules preserved
- [ ] Execution logs show expected output

### Future: Automated Testing

Planned improvements:
- Unit tests with Jest or similar
- Integration tests for Google Sheets API
- Email template validation tests
- CI/CD test automation

---

## Documentation

### When to Update Documentation

**README.md**:
- New features or functionality
- Changed setup/installation steps
- New commands or aliases
- Configuration changes

**CHANGELOG.md**:
- Every version release
- Significant bug fixes
- New features
- Breaking changes
- Security updates

**TROUBLESHOOTING.md**:
- Common errors encountered
- Known issues and workarounds
- FAQ items

**Code Comments**:
- Complex logic or algorithms
- Important business rules
- Non-obvious implementations
- Configuration options

---

## Questions or Need Help?

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact maintainer at yusufajarmoekti@gmail.com

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
