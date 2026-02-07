# SendGrid Setup Guide

## Overview
Your portfolio contact form now uses SendGrid instead of Gmail SMTP. This allows emails to show the visitor's email address as the sender.

## Why SendGrid?
- **Custom "From" Addresses**: Send emails that appear to be from your visitors
- **Better Deliverability**: Professional email service with high delivery rates
- **Free Tier**: 100 emails/day for free
- **Professional**: HTML email templates with your brand colors

## Setup Instructions

### Step 1: Create a SendGrid Account
1. Go to [SendGrid](https://signup.sendgrid.com/)
2. Sign up for a **free account** (100 emails/day)
3. Verify your email address
4. Complete the onboarding process

### Step 2: Create an API Key
1. Log in to your SendGrid account
2. Go to **Settings** → **API Keys** (or visit https://app.sendgrid.com/settings/api_keys)
3. Click **Create API Key**
4. Name it something like "Portfolio Contact Form"
5. Select **Full Access** permissions (or at least **Mail Send**)
6. Click **Create & View**
7. **IMPORTANT**: Copy the API key immediately (you won't be able to see it again!)

### Step 3: Configure Your Portfolio
1. Open the `.env` file in your portfolio folder
2. Replace `your_sendgrid_api_key_here` with your actual API key:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Save the file

### Step 4: Sender Verification (IMPORTANT!)
For SendGrid to send emails "from" visitor email addresses, you have two options:

#### Option A: Single Sender Verification (Recommended for testing)
1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Add your email: **hegdepunithramesh@gmail.com**
4. Fill in your details and verify

**Note**: With single sender verification, emails will be sent FROM your verified email, but visitors can still reply directly to their email address.

#### Option B: Domain Authentication (Best for production)
1. Go to **Settings** → **Sender Authentication**
2. Click **Authenticate Your Domain**
3. Follow the steps to add DNS records to your domain
4. Once verified, you can send from any email address on your domain

**IMPORTANT LIMITATION**: SendGrid (like most email services) won't let you send emails "from" random visitor email addresses without verification. This is to prevent spam and phishing. The current code sets `from: email`, but SendGrid will likely reject this unless that domain is verified.

### Step 5: Update the Code (For Production)
For better deliverability, modify `index.js` line 52-53:

**Current (may fail):**
```javascript
to: "hegdepunithramesh@gmail.com",
from: email, // Visitor's email - requires domain verification
```

**Recommended for production:**
```javascript
to: "hegdepunithramesh@gmail.com",
from: "hegdepunithramesh@gmail.com", // Your verified sender
replyTo: email, // Visitor's email for easy reply
```

This way:
- Emails are sent FROM your verified address (works reliably)
- Reply-To is set to the visitor's email (you can reply directly)
- Subject line shows visitor's name
- Email body clearly shows visitor's email with a clickable mailto link

### Step 6: Test the Contact Form
1. Start your server: `npm start` or `node index.js`
2. Visit http://localhost:3000/contact
3. Fill out and submit the form
4. Check your inbox at hegdepunithramesh@gmail.com
5. You should receive a nicely formatted HTML email with:
   - Visitor's name
   - Visitor's email (clickable)
   - Their message
   - Your brand colors (blue and purple gradients)

## Troubleshooting

### Error: "SENDGRID_API_KEY not found"
- Make sure you added the API key to the `.env` file
- Make sure there are no spaces around the `=` sign
- Restart your server after updating the .env file

### Error: "The from email does not match a verified Sender Identity"
- You need to verify a sender email in SendGrid
- Go to Settings → Sender Authentication → Verify a Single Sender
- Verify hegdepunithramesh@gmail.com
- OR update the code to use a verified sender as shown in Step 5

### Emails not being received
- Check SendGrid's Activity Feed: https://app.sendgrid.com/email_activity
- Look for bounces or blocks
- Verify the recipient email is correct
- Check your spam folder

### Rate Limit (Free Tier: 100 emails/day)
- SendGrid free tier allows 100 emails per day
- If you hit the limit, emails will be queued for the next day
- Consider upgrading if you need more

## Cost
- **Free Tier**: 100 emails/day forever (perfect for portfolio contact forms)
- **Essentials**: $19.95/month for 50,000 emails
- **Pro**: $89.95/month for 100,000 emails

## Security Notes
- ✅ `.env` file is in `.gitignore` (your API key won't be committed to Git)
- ✅ Never share your API key publicly
- ✅ If you accidentally expose your API key, delete it immediately from SendGrid and create a new one

## What Changed from Gmail?
| Feature | Gmail SMTP | SendGrid |
|---------|-----------|----------|
| From Address | Must be your Gmail | Can be verified senders |
| Deliverability | Good | Excellent |
| Daily Limit | ~500/day | 100/day (free) |
| HTML Emails | Yes | Yes (better formatting) |
| Analytics | No | Yes (Activity Feed) |
| Security | App password needed | API key |

## Need Help?
- SendGrid Documentation: https://docs.sendgrid.com/
- SendGrid Support: https://support.sendgrid.com/
