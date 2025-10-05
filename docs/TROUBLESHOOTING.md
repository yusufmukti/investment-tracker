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
