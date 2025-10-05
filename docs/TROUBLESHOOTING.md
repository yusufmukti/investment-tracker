# GitHub Actions Deployment Troubleshooting

## Error: "Could not read API credentials. Are you logged in globally?"

This error means GitHub Actions doesn't have your Google authentication credentials.

### Solution: Add GitHub Secrets

#### Step 1: Get Your Credentials

Run this command in your terminal:
```bash
./scripts/setup-github-actions.sh
```

This will show you two JSON blocks you need to copy.

#### Step 2: Add Secrets to GitHub

1. **Go to your repository on GitHub:**
   - URL: `https://github.com/yusufmukti/investment-tracker`

2. **Navigate to Settings:**
   - Click the "Settings" tab at the top
   - In the left sidebar, click "Secrets and variables"
   - Click "Actions"

3. **Add CLASP_CREDENTIALS:**
   - Click "New repository secret"
   - Name: `CLASP_CREDENTIALS`
   - Value: Paste the ENTIRE JSON from "Step 1" of the setup script
   - Click "Add secret"

4. **Add CLASP_CONFIG:**
   - Click "New repository secret" again
   - Name: `CLASP_CONFIG`
   - Value: Paste the JSON from "Step 2" of the setup script
   - Click "Add secret"

#### Step 3: Verify Secrets Are Added

You should see two secrets listed:
- `CLASP_CREDENTIALS`
- `CLASP_CONFIG`

#### Step 4: Re-run the Workflow

1. Go to the "Actions" tab in your GitHub repository
2. Click on the failed workflow run
3. Click "Re-run all jobs" button

### Common Mistakes

❌ **Mistake 1:** Only copying part of the JSON
   - Make sure you copy the ENTIRE JSON block including the opening `{` and closing `}`

❌ **Mistake 2:** Adding extra text or formatting
   - Copy only the JSON, nothing else

❌ **Mistake 3:** Wrong secret names
   - Must be exactly: `CLASP_CREDENTIALS` and `CLASP_CONFIG` (case-sensitive)

❌ **Mistake 4:** Forgetting to remove `rootDir` from CLASP_CONFIG
   - The setup script already does this for you, just copy exactly what it shows

### How to Verify It Works

After adding the secrets and re-running:

✅ **Success:** You should see all steps complete with green checkmarks
✅ **Deploy step:** Should say "Deployment successful!"
✅ **Your Google Apps Script:** Will be updated with your latest code

### Still Having Issues?

1. **Double-check secret names:** They must match exactly
2. **Verify JSON format:** Make sure the JSON is valid (no extra commas, brackets match)
3. **Check permissions:** Make sure you have admin access to the repository
4. **Re-generate credentials:** Run `clasp login` again if credentials are old

### Alternative: Use Manual Deployment

If GitHub Actions continues to fail, you can always use manual deployment:

```bash
invest-deploy
```

This works immediately without any GitHub setup!

---

## Error: "Cannot read properties of undefined (reading 'access_token')"

This error occurs when clasp can't properly read the access token from credentials.

### Common Causes & Solutions

#### Cause 1: clasp Version Mismatch

**Problem**: Your local environment uses a different clasp version than GitHub Actions.

**Solution**: Pin clasp version in `.github/workflows/deploy.yml`:

```yaml
- name: Install clasp
  run: npm install -g @google/clasp@3.0.6-alpha
```

**How to Check Your Local Version**:
```bash
clasp --version
# Output: 3.0.6-alpha
```

#### Cause 2: Invalid JSON Format

**Problem**: GitHub Secrets contain JSON without proper quotes.

**Example of WRONG format**:
```json
{tokens:{default:{client_id:1072...}}}
```

**Example of CORRECT format**:
```json
{"tokens":{"default":{"client_id":"1072..."}}}
```

**Solution**: Use `printf` instead of `echo` in workflow:

```yaml
- name: Configure clasp credentials
  run: |
    printf '%s\n' '${{ secrets.CLASP_CREDENTIALS }}' > ~/.clasprc.json
    printf '%s\n' '${{ secrets.CLASP_CONFIG }}' > .clasp.json
    chmod 600 ~/.clasprc.json
    chmod 600 .clasp.json
```

#### Cause 3: Expired OAuth Tokens

**Problem**: OAuth access tokens expire after ~1 hour.

**Solution**: Re-generate credentials:

```bash
# 1. Logout and login again
clasp logout
clasp login --no-localhost

# 2. Get fresh credentials
cat ~/.clasprc.json | jq -c .

# 3. Update GitHub Secret CLASP_CREDENTIALS with the new output
```

**Important**: Update the GitHub Secret immediately after generating (within 1 hour).

---

## Error: "npm warn EBADENGINE Unsupported engine"

This warning appears when installing clasp 3.0.6-alpha with Node.js 18.

```
npm warn EBADENGINE   package: '@google/clasp@3.0.6-alpha',
npm warn EBADENGINE   required: { node: ' >=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
```

### Is This a Problem?

**No, it's just a warning.** clasp 3.0.6-alpha works fine with Node.js 18, even though it officially requires Node 20+.

### If You Want to Fix It

Update `.github/workflows/deploy.yml`:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '20'  # Changed from '18'
```

---

## GitHub Actions Keeps Failing - Complete Checklist

Use this checklist to diagnose GitHub Actions deployment issues:

### ✅ Credentials

- [ ] **CLASP_CREDENTIALS** secret exists in GitHub
- [ ] **CLASP_CONFIG** secret exists in GitHub
- [ ] Credentials are valid JSON (check with `jq`)
- [ ] Credentials were generated within last hour
- [ ] No extra characters or spaces in secrets

### ✅ Workflow Configuration

- [ ] clasp version matches local version
- [ ] Using `printf` (not `echo`) for credential injection
- [ ] Correct file permissions (600) on credential files
- [ ] Correct file paths (~/.clasprc.json and .clasp.json)

### ✅ JSON Validation

Run these commands in GitHub Actions logs:

```bash
# Should show: ✓ .clasprc.json is valid JSON
node -e "JSON.parse(require('fs').readFileSync(process.env.HOME + '/.clasprc.json', 'utf8'))"

# Should show all true and token length > 0
node -e "const c=JSON.parse(require('fs').readFileSync(process.env.HOME+'/.clasprc.json','utf8')); console.log('Has tokens:', !!c.tokens); console.log('Has default:', !!c.tokens?.default); console.log('Has access_token:', !!c.tokens?.default?.access_token); console.log('Access token length:', c.tokens?.default?.access_token?.length || 0);"
```

### ✅ Testing Locally

Before debugging GitHub Actions, verify it works locally:

```bash
# Test local deployment
clasp push --force

# Should output:
# Pushed 2 files.
# └─ appsscript.json
# └─ invest.gs
```

---

## Complete Fix History (For Reference)

Here's the complete timeline of fixes we applied:

1. **Initial Issue**: "Could not read API credentials"
   - **Fix**: Added GitHub Secrets (CLASP_CREDENTIALS, CLASP_CONFIG)

2. **JSON Format Error**: "Unexpected token %"
   - **Fix**: Changed from `echo` with quotes to heredoc (`cat > file << 'EOF'`)

3. **Access Token Error**: "Cannot read properties of undefined"
   - **Fix**: Regenerated fresh OAuth credentials (tokens expire in 1 hour)

4. **Version Mismatch**: Different credential format
   - **Fix**: Pinned clasp version to 3.0.6-alpha in workflow

5. **JSON Quotes Missing**: `{tokens:...}` instead of `{"tokens":...}`
   - **Fix**: Changed from `echo` to `printf` for credential injection

6. **Final Success**: All validations pass, deployment works! ✅

---

## Still Need Help?

1. **Check GitHub Actions Logs**: Look for specific error messages
2. **Verify Locally**: Make sure `clasp push` works on your computer
3. **Check Issues**: Search existing GitHub issues
4. **Ask for Help**: Open a new issue with:
   - Error message from GitHub Actions
   - Output of `clasp --version`
   - Output of `node --version`
   - Steps you've already tried

````
