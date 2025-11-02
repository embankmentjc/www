# Email Setup for Volunteer Notifications

The volunteer signup form now sends email notifications when someone includes a background/message.

## Current Status

- Newsletter signups (footer, news page) → Constant Contact only (no email)
- Volunteer signups → Constant Contact + email notification (if configured)

## Configuration Required on Server

Update `/public_html/bat/.rd-mailform.config.json`:

```json
{
  "useSmtp": true,
  "host": "smtp.gmail.com",
  "port": 465,
  "username": "embankmentjc@gmail.com",
  "password": "YOUR_APP_PASSWORD_HERE",
  "recipientEmail": "embankmentjc@gmail.com"
}
```

**Important:** Change the password to a Gmail "App Password", not your regular password.

## Creating a Gmail App Password

Gmail no longer accepts regular passwords for SMTP. You need an "App Password":

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (must be enabled)
3. Scroll down to **App passwords**
4. Click **Select app** → Choose "Mail"
5. Click **Select device** → Choose "Other" and enter "Embankment Website"
6. Click **Generate**
7. Copy the 16-character password (no spaces)
8. Paste it into the config file as the password value

## Testing

After updating the config, test by:

1. Visit https://embankment.org/involved#involved-section-signup
2. Fill out the volunteer form including the Background field
3. Submit
4. Check embankmentjc@gmail.com for the notification email
5. Verify the contact also appears in Constant Contact

## Fallback Behavior

If SMTP is not configured (`useSmtp: false` or missing email config):
- Contact will still be added to Constant Contact
- No email notification will be sent
- Error logged to server logs

## Files

- `/bat/cc-signup.php` - Simple signup (newsletter forms, no email)
- `/bat/cc-signup-with-email.php` - Signup with email notification (volunteer form)
- `/bat/.rd-mailform.config.json` - Email configuration (not in Git)
- `/bat/.cc-config.json` - Constant Contact config (not in Git)
- `/bat/.cc-tokens.json` - OAuth tokens (not in Git, auto-refreshed)
