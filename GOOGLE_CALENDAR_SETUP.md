# 🗓️ Google Calendar Integration Setup Guide

## Overview

The Gloria Ondah & Associates website includes Google Calendar integration for booking appointments. This guide will help you set up the Google Calendar API to enable:

- ✅ Automatic .ics calendar file generation
- ✅ "Add to Google Calendar" button functionality
- ✅ Email calendar invites to clients
- ✅ Sync bookings with firm's Google Calendar (optional)

---

## 🎯 What You'll Need

- Google Account (Gmail)
- 15 minutes
- Access to Google Cloud Console

---

## 📋 Setup Steps

### Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Select a project" dropdown at the top
   - Click "NEW PROJECT"
   - Project name: `GOA-Law-Calendar`
   - Click "CREATE"
   - Wait for project creation (takes ~30 seconds)

3. **Select Your Project**
   - Click "Select a project" dropdown
   - Choose `GOA-Law-Calendar`

---

### Step 2: Enable Google Calendar API

1. **Navigate to APIs & Services**
   - In the left sidebar, click "APIs & Services" → "Library"
   - Or visit: https://console.cloud.google.com/apis/library

2. **Search for Calendar API**
   - In the search bar, type: `Google Calendar API`
   - Click on "Google Calendar API" from results

3. **Enable the API**
   - Click the blue "ENABLE" button
   - Wait for activation (~10 seconds)

---

### Step 3: Create Service Account

1. **Go to Credentials**
   - Left sidebar: "APIs & Services" → "Credentials"
   - Or visit: https://console.cloud.google.com/apis/credentials

2. **Create Service Account**
   - Click "+ CREATE CREDENTIALS" at the top
   - Select "Service account"

3. **Service Account Details**
   - Service account name: `goa-calendar-service`
   - Service account ID: (auto-generated)
   - Description: `Service account for GOA booking calendar integration`
   - Click "CREATE AND CONTINUE"

4. **Grant Permissions (Optional)**
   - Skip this step (click "CONTINUE")

5. **Grant Users Access (Optional)**
   - Skip this step (click "DONE")

---

### Step 4: Create Service Account Key

1. **Find Your Service Account**
   - You should see your service account in the list
   - Email format: `goa-calendar-service@goa-law-calendar.iam.gserviceaccount.com`

2. **Create Key**
   - Click on the service account email
   - Go to "KEYS" tab
   - Click "ADD KEY" → "Create new key"

3. **Download Key**
   - Select "JSON" format
   - Click "CREATE"
   - A JSON file will download automatically
   - **IMPORTANT**: Save this file securely! You can't download it again.

4. **Open the JSON File**
   - Open the downloaded JSON file in Notepad
   - You'll see something like:
   ```json
   {
     "type": "service_account",
     "project_id": "goa-law-calendar",
     "private_key_id": "abc123...",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
     "client_email": "goa-calendar-service@goa-law-calendar.iam.gserviceaccount.com",
     "client_id": "123456789",
     ...
   }
   ```

---

### Step 5: Share Your Google Calendar

1. **Open Google Calendar**
   - Visit: https://calendar.google.com/
   - Sign in with your Google account

2. **Create or Select Calendar**
   - Option A: Use your primary calendar
   - Option B: Create a new calendar for bookings
     - Left sidebar: Click "+" next to "Other calendars"
     - Select "Create new calendar"
     - Name: `GOA Bookings`
     - Click "Create calendar"

3. **Share Calendar with Service Account**
   - Find your calendar in the left sidebar
   - Hover over it and click the three dots (⋮)
   - Select "Settings and sharing"
   - Scroll to "Share with specific people"
   - Click "+ Add people"
   - Enter the service account email:
     ```
     goa-calendar-service@goa-law-calendar.iam.gserviceaccount.com
     ```
   - Permission: "Make changes to events"
   - Click "Send"

4. **Get Calendar ID**
   - Still in calendar settings
   - Scroll to "Integrate calendar"
   - Copy the "Calendar ID"
   - Format: `your-email@gmail.com` or `random-id@group.calendar.google.com`

---

### Step 6: Configure Environment Variables

1. **Open Your .env File**
   ```bash
   notepad C:\Users\User\Desktop\Gloria-adah\.env
   ```

2. **Add Google Calendar Configuration**

   From the JSON file you downloaded, copy these values:

   ```env
   # Google Calendar Integration
   GOOGLE_CLIENT_EMAIL=goa-calendar-service@goa-law-calendar.iam.gserviceaccount.com
   GOOGLE_CALENDAR_ID=your-email@gmail.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
   ...your full private key here...
   ...keep all the line breaks...
   -----END PRIVATE KEY-----"
   ```

   **IMPORTANT NOTES:**
   - Copy the ENTIRE private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Keep all the `\n` characters (line breaks)
   - Wrap the entire key in double quotes
   - The key should be on multiple lines in your .env file

3. **Example .env Configuration**
   ```env
   # Database
   DATABASE_URL=postgresql://postgres:password@localhost:5432/goa_law

   # Admin
   ADMIN_PASSWORD=YourPassword123
   ADMIN_SECRET=your-secret-key

   # Google Calendar
   GOOGLE_CLIENT_EMAIL=goa-calendar-service@goa-law-calendar.iam.gserviceaccount.com
   GOOGLE_CALENDAR_ID=olamideode574@gmail.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfvYg3T159u4gw
   1o/dzWvWJfxZ3AyLwnufJRcE80knId0uDOzYSpiFPv/iwPKkOa2AyKrrM3t2AZlF
   2RYNksT0C3XJkPKS5sBnHHsZd/mwIvBNMlYtIo/lCudvbQRlPDag8EKtlzdUqvc9
   q2zqRsBXR0O2X36SaVoTXcM09nE24O8O5y3c2+aFI6f4a4gn5j1JAeaJSyc4f+O8
   k+UN1MoMt+ikzDtAm2DE8bHDd3zmRSvnIoWWcm3pFbjREqtu9H8WLF+Em3eJGgA4
   MXs69HihyYMPi2L3Ikr12ceVndHXRwdCVdmeXNerMsr1W6ML8G3oka4+FQAvXvXr
   i+m0l6XtAgMBAAECggEACF4bQQ5L12HzFvh/SulK1ih3hpjPM07jtrD5amr62mbO
   0dET7objq2AOy9kxeejaT02x7rfvLxuiMtWKmJlbmlDvZ8lu+QV+Ppz3EZ3GDctQ
   t2JhjLCVNxiwTR+DoZGd7Wju5XUZUaZPNtQ5b42T1e/JXYG2xxz/jGfeTBXHaCjx
   gP7uOcKIuiMU3UTq81BQ+Blr0bRqkyJbMVFr/NvUwKXQ9tCAq62SOgvybszEXQ4D
   Z8SgPtX7lCCVyt8H2ilw9DY626tGmSPs1cSwtfuj6w5SIyxXOSD0PDhJxcBL0Ywz
   xOHZVWfdPsfK+XcVogMXTSgRWd3Jx3nf4GWckWeHoQKBgQDxBKZcubOEU46vhSTC
   qV2eur0o0q0b0bdgLwgER6aDbnxlPlHXcyL+ufZCsicWWVSYwRGYonpwjUDhWavX
   KF8OTRlFxDQvnY3Yfz4jfoctsqcwUmJ/lgaoFCqu1dLW31kIvol6+cod9XBvpFnC
   DqAGbUIOuQwhQttrvKsbqMbyWQKBgQDtpfBD2kdaf7p3hp83G82hH55CxBEC/PxJ
   GLXVduyegznHOZ8axnJwfxv4pqcTHaoGYHLlR7YlCYKLsc5df8pHWy1PPTQtqRB+
   ByBp8aiGSrWS0V9eQ71jC9Nx8WXroYy4hsNCn9o0KMBl1rGMe05jEa0nnwcHG8KW
   yvnFetUVtQKBgQDPU+ioKza5xgcgBbCxo2/dc1X1IAW5wJW2L779r4UV2p03mnxc
   kbaw2Nd2WDo3h3C2Vp8EZgBdgaUmNTUVSK08aCYtVbJuo2G5svuJHPa74MrhTn1c
   s3nWbEKrU1Sjck3sr7skBmxPiSrHXuG3hU0zOhlxAM3mbtTBwPKQQIejQQKBgGif
   SStWCVu6J6k/RxDH2Ls6ZD4YezTJk3fKvSKA/KK8Os+OepEbFH6aNwI8vAkaYiP0
   iiCOdY3QpfxCBwv6ml7XsRbVZwdDCtOw54A8t2iHs3AzZLznLZVRO4FKOQiHUqBa
   E9Rc839LAYjT/85M6rGKsqRiyoFCo2Qnb9aUwQKRAoGARuQ8WHGe9repnNzAD62n
   Ik1/ZehscpPNj9/fn1fiCQDEPmihbcm4UEZjn7B3SEjydHUyn8Q29mHKPJV84MEz
   lTyw1Wh5h5+BsQhNEcoNY1ZdvS7FJDXC9iU6LVgdgw0Lt0gurAEnIv0uuOCapAes
   3+tp8NLJ4KLBfPpeGGw5PZI=
   -----END PRIVATE KEY-----"
   ```

4. **Save the .env File**

---

### Step 7: Test the Integration

1. **Restart Your Servers**
   ```bash
   # Stop both servers (Ctrl+C in each terminal)
   # Then restart:
   start.bat
   ```

2. **Test Booking Flow**
   - Go to: http://localhost:5000/#/booking
   - Complete a test booking
   - After confirmation, try:
     - Download .ics file
     - Click "Add to Google Calendar"

3. **Check Your Google Calendar**
   - Visit: https://calendar.google.com/
   - You should see the booking appear automatically!

---

## 🎯 What Each Feature Does

### 1. .ics File Download
- **What it does**: Creates a calendar file that works with any calendar app
- **How it works**: Generated on the frontend, no API needed
- **Works with**: Google Calendar, Outlook, Apple Calendar, etc.

### 2. "Add to Google Calendar" Button
- **What it does**: Opens Google Calendar with pre-filled event details
- **How it works**: Creates a special Google Calendar URL
- **Requires**: User must be logged into Google

### 3. Automatic Calendar Sync (Optional)
- **What it does**: Automatically adds bookings to your firm's Google Calendar
- **How it works**: Uses Google Calendar API via service account
- **Requires**: Service account setup (this guide)

---

## 🔧 Current Implementation

The current code in the project includes:

### ✅ Already Working (No Setup Needed)
1. **Download .ics file** - Works immediately
2. **"Add to Google Calendar" button** - Works immediately

### ⏳ Requires Setup (This Guide)
3. **Automatic sync to firm calendar** - Needs service account

---

## 📝 Code Implementation

The calendar functionality is in:
- `src/components/pages/Booking.tsx` (lines 30-80)

**Key functions:**
```typescript
// Generate .ics file
function downloadICS(opts) { ... }

// Generate Google Calendar URL
function googleCalendarUrl(opts) { ... }
```

**Backend integration** (optional):
- `server/calendar.js` - Google Calendar API integration
- Uses `googleapis` package

---

## 🐛 Troubleshooting

### Issue: "Invalid credentials"
**Solution:**
- Verify GOOGLE_PRIVATE_KEY is copied correctly
- Ensure all line breaks (`\n`) are preserved
- Check the key is wrapped in double quotes

### Issue: "Calendar not found"
**Solution:**
- Verify GOOGLE_CALENDAR_ID is correct
- Check you shared the calendar with the service account email
- Ensure permission is "Make changes to events"

### Issue: "Access denied"
**Solution:**
- Verify Google Calendar API is enabled in Cloud Console
- Check service account has correct permissions
- Wait 5-10 minutes for permissions to propagate

### Issue: .ics file downloads but is empty
**Solution:**
- Check browser console for errors
- Verify booking data is complete
- Test with a different browser

### Issue: "Add to Google Calendar" button doesn't work
**Solution:**
- Ensure user is logged into Google
- Check popup blockers aren't blocking the window
- Try opening in incognito mode

---

## 🔒 Security Best Practices

1. **Never commit the JSON key file to Git**
   - Already in `.gitignore`
   - Store securely outside the project

2. **Restrict Service Account Permissions**
   - Only grant "Make changes to events"
   - Don't give "Owner" access

3. **Use Environment Variables**
   - Never hardcode credentials in code
   - Always use `.env` file

4. **Rotate Keys Regularly**
   - Create new service account keys every 90 days
   - Delete old keys from Google Cloud Console

5. **Monitor API Usage**
   - Check Google Cloud Console for unusual activity
   - Set up billing alerts

---

## 💰 Pricing

**Google Calendar API:**
- ✅ **FREE** for up to 1,000,000 requests per day
- ✅ No credit card required for basic usage
- ✅ More than enough for a law firm booking system

**Typical usage:**
- 1 booking = 1 API call
- 100 bookings/day = 3,000 calls/month
- Well within free tier

---

## 📊 Testing Checklist

After setup, verify:

- [ ] .ics file downloads successfully
- [ ] .ics file opens in calendar app
- [ ] Event details are correct (date, time, description)
- [ ] "Add to Google Calendar" button opens Google Calendar
- [ ] Event pre-fills correctly in Google Calendar
- [ ] Booking appears in firm's Google Calendar (if using API)
- [ ] No errors in browser console
- [ ] No errors in server logs

---

## 🎓 Additional Resources

**Google Calendar API Documentation:**
- https://developers.google.com/calendar/api/guides/overview

**Service Account Guide:**
- https://cloud.google.com/iam/docs/service-accounts

**Calendar API Quickstart:**
- https://developers.google.com/calendar/api/quickstart/nodejs

**Troubleshooting:**
- https://developers.google.com/calendar/api/guides/errors

---

## 🆘 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review server logs for error messages
3. Check browser console (F12) for frontend errors
4. Verify all environment variables are set correctly
5. Ensure Google Calendar API is enabled
6. Wait 5-10 minutes after making changes (propagation time)

---

## ✅ Summary

**What you accomplished:**
1. ✅ Created Google Cloud project
2. ✅ Enabled Google Calendar API
3. ✅ Created service account
4. ✅ Downloaded service account key
5. ✅ Shared calendar with service account
6. ✅ Configured environment variables
7. ✅ Tested the integration

**What works now:**
- ✅ Download .ics calendar files
- ✅ "Add to Google Calendar" button
- ✅ Automatic sync to firm calendar (optional)
- ✅ Email calendar invites to clients

---

**Setup Time:** 15 minutes  
**Cost:** FREE  
**Difficulty:** Intermediate

**Congratulations! Your Google Calendar integration is complete! 🎉**
