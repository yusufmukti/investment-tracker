# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-05

### Added
- **GitHub Actions CI/CD Pipeline**: Automated deployment from GitHub to Google Apps Script
  - Automatic deployment on every push to master branch
  - Manual deployment trigger available via workflow_dispatch
  - Comprehensive credential validation and diagnostics
- **Git-First Workflow**: Complete local development setup with clasp
  - `invest-deploy`: Deploy changes after Git commit
  - `invest-sync`: Pull latest code from Apps Script
  - `invest-status`: Check deployment status
  - `invest-open`: Open Apps Script editor
- **Professional Documentation**:
  - Comprehensive README with setup instructions
  - GitHub Actions setup guide
  - Troubleshooting documentation
  - Helper scripts for common tasks
- **Weekly Portfolio Automation**:
  - Automated weekly email reports with portfolio analytics
  - Saturday reminder emails
  - Automatic timestamp row duplication
  - Asset deduplication by ID + Name
  - Week-over-week trend analysis
- **Core Features**:
  - Portfolio value tracking by asset type
  - Asset allocation breakdown
  - Top 5 largest holdings report
  - Historical data preservation
  - Data validation preservation during duplication

### Fixed
- **GitHub Actions Deployment Issues** (Multiple iterations):
  - Fixed clasp version mismatch (pinned to 3.0.6-alpha)
  - Resolved JSON formatting issues (heredoc → echo → printf)
  - Fixed credential structure compatibility
  - Resolved OAuth token expiration handling
  - Fixed Node.js engine warnings (clasp 3.0.6 requires Node 20+, using 18 with warning)
- **Credential Management**:
  - Proper JSON formatting with printf command
  - Secure credential injection via GitHub Secrets
  - Correct permissions (600) on credential files

### Security
- Credentials stored securely in GitHub Secrets
- No hardcoded sensitive data in repository
- Proper file permissions for credential files
- OAuth 2.0 authentication for Google APIs

### Technical Details
- **Environment**: Ubuntu 24.04 (GitHub Actions runner)
- **Node.js**: v18.20.8
- **clasp**: 3.0.6-alpha (pinned for consistency)
- **Git**: Version control with master branch workflow

---

## [Unreleased]

### Planned
- Add unit tests for core functions
- Add integration tests for email sending
- Implement error notification system
- Add support for multiple portfolios
- Create dashboard visualization
- Add mobile-friendly email templates

---

## Version History

### Version Format
- **Major.Minor.Patch** (Semantic Versioning)
- **Major**: Breaking changes or major feature additions
- **Minor**: New features (backwards compatible)
- **Patch**: Bug fixes and minor improvements

### Release Notes
Each version includes:
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements
