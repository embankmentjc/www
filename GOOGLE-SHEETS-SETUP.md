# Google Sheets Integration Setup

Website signups are now automatically logged to a Google Sheet.

## Setup Steps

### 1. Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create a service account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name it "Embankment Website" (or similar)
   - Click "Create and Continue"
   - Skip roles (not needed)
   - Click "Done"
5. Create a key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON" format
   - Download the file

### 2. Upload Service Account Key to Server

The downloaded JSON file should be uploaded to the server as:
- **Dev**: `/home/embankme/dev_html/bat/.google-service-account.json`
- **Prod**: `/home/embankme/public_html/bat/.google-service-account.json`

Set permissions to 600 (owner read/write only):
```bash
chmod 600 .google-service-account.json
```

### 3. Share Spreadsheet with Service Account

1. Open the service account JSON file
2. Find the `client_email` field (looks like: `embankment-website@project-id.iam.gserviceaccount.com`)
3. Copy this email address
4. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1IO6K_JXvo4eTGu5bmIeV38XpQUjVZfGgbEYSRPd1WME/edit
5. Click "Share" button
6. Paste the service account email
7. Give it "Editor" access
8. Uncheck "Notify people"
9. Click "Share"

### 4. Create Sheet Tab

1. In your Google Sheet, create a new tab called **"Website Signups"** (exact name)
2. Add header row (optional but recommended):
   - Column A: Timestamp
   - Column B: Name
   - Column C: Email
   - Column D: Phone
   - Column E: Message/Background

### 5. Test

Test the integration from the command line:
```bash
ssh epc
cd dev_html/bat
php google-sheets-append.php
```

Should see "Success!" and a test row in your sheet.

## How It Works

Every signup from the website:
1. ✅ Added to Constant Contact (for email list)
2. ✅ Logged to `bat/signups.log` (backup)
3. ✅ Appended to Google Sheet (for review)
4. ❌ Email notification (blocked by hosting provider)

## Files

- `google-sheets-append.php` - Helper functions for Google Sheets API
- `.google-service-account.json` - Service account credentials (not in Git)
- Spreadsheet ID: `1IO6K_JXvo4eTGu5bmIeV38XpQUjVZfGgbEYSRPd1WME`
- Sheet name: `Website Signups`

## Troubleshooting

Check server logs for errors:
```bash
ssh epc
tail -50 dev_html/bat/error_log
```

Common issues:
- "Service account credentials not found" - Upload the JSON file
- "Failed to get access token" - Check service account key is valid
- "Failed to append to Google Sheet" - Check sheet is shared with service account email
- "Sheet not found" - Create a tab named exactly "Website Signups"
