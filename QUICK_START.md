# 🎯 QUICK START - 5 Minutes to Running

```
┌─────────────────────────────────────────────────────────────┐
│  Gloria Ondah & Associates - Local Development Setup       │
└─────────────────────────────────────────────────────────────┘
```

## Step 1: Prerequisites (One-time)

```
┌─────────────────────────────────────────────────────────────┐
│  Install These First:                                       │
├─────────────────────────────────────────────────────────────┤
│  ✓ Node.js 18+     → https://nodejs.org/                   │
│  ✓ PostgreSQL 15+  → https://postgresql.org/download/      │
└─────────────────────────────────────────────────────────────┘
```

## Step 2: Install Dependencies

```bash
cd C:\Users\User\Desktop\Gloria-adah
npm install
```

```
⏱️  Takes 2-3 minutes
📦  Installs ~500 packages
```

## Step 3: Setup Database

```bash
# Open Command Prompt
psql -U postgres
# Enter your postgres password

# Create database
CREATE DATABASE goa_law;
\q
```

```
✅ Database created: goa_law
📊 Tables will be auto-created on first run
```

## Step 4: Configure Environment

```bash
# Copy template
copy .env.example .env

# Edit with your settings
notepad .env
```

**Minimum configuration:**
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/goa_law
ADMIN_PASSWORD=YourSecurePassword123
ADMIN_SECRET=your-random-secret-key
```

```
⚠️  Replace YOUR_PASSWORD with your actual postgres password
🔐 Choose a strong admin password
```

## Step 5: Start Application

### Option A: Double-click `start.bat`

```
┌─────────────────────────────────────────────────────────────┐
│  Two windows will open:                                     │
├─────────────────────────────────────────────────────────────┤
│  Window 1: GOA API Server (port 3001)                       │
│  Window 2: GOA Frontend (port 5000)                         │
└─────────────────────────────────────────────────────────────┘
```

### Option B: Manual (2 terminals)

**Terminal 1:**
```bash
npm run api
```
```
✅ Backend running on http://localhost:3001
```

**Terminal 2:**
```bash
npm run dev
```
```
✅ Frontend running on http://localhost:5000
```

## Step 6: Access Application

```
┌─────────────────────────────────────────────────────────────┐
│  Open in Browser:                                           │
├─────────────────────────────────────────────────────────────┤
│  🌐 Public Site:  http://localhost:5000                     │
│  🔐 Admin Panel:  http://localhost:5000/#/admin             │
└─────────────────────────────────────────────────────────────┘
```

**Admin Login:**
- Password: (what you set in .env)

---

## 🎉 You're Done!

```
┌─────────────────────────────────────────────────────────────┐
│  What's Working:                                            │
├─────────────────────────────────────────────────────────────┤
│  ✅ Homepage with hero section                              │
│  ✅ 15 public pages                                         │
│  ✅ Blog with 6 pre-seeded articles                         │
│  ✅ Admin dashboard                                         │
│  ✅ Blog CMS (create, edit, delete)                         │
│  ✅ Booking system                                          │
│  ✅ Contact form                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Optional: Add Payment & Email

### Paystack (Payments)
1. Sign up: https://dashboard.paystack.com/signup
2. Get API keys: Settings → API Keys
3. Add to .env:
```env
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
```

### Brevo (Emails)
1. Sign up: https://app.brevo.com/account/register
2. Get API key: Settings → API Keys
3. Add to .env:
```env
BREVO_API_KEY=xkeysib-xxxxx
BREVO_SENDER_EMAIL=noreply@yourdomain.com
```

### Cloudinary (Image Uploads)
1. Sign up: https://cloudinary.com/users/register_free
2. Get credentials from Dashboard
3. Add to .env:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🐛 Troubleshooting

### Database Connection Error
```
❌ Error: connect ECONNREFUSED
```
**Fix:**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists

### Port Already in Use
```
❌ Error: EADDRINUSE :::5000
```
**Fix:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found
```
❌ Error: Cannot find module
```
**Fix:**
```bash
rmdir /s /q node_modules
npm install
```

---

## 📚 Documentation

| File | What's Inside |
|------|---------------|
| `README.md` | Full setup guide |
| `SETUP_CHECKLIST.md` | Step-by-step checklist |
| `PROJECT_OVERVIEW.md` | All features documented |
| `CLEANUP_SUMMARY.md` | What was cleaned up |

---

## 🎯 Test Your Setup

```
┌─────────────────────────────────────────────────────────────┐
│  Verification Checklist:                                    │
├─────────────────────────────────────────────────────────────┤
│  □ Homepage loads at http://localhost:5000                  │
│  □ Blog page shows 6 articles                               │
│  □ Admin login works                                        │
│  □ Can create new blog post                                 │
│  □ Booking form saves to database                           │
│  □ No errors in browser console (F12)                       │
│  □ No errors in server terminal                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Development Workflow

```
Daily Development:
1. Double-click start.bat
2. Code in your editor
3. Changes auto-reload
4. Test in browser
5. Commit to git

Production Build:
1. npm run build
2. npm start
3. Deploy dist/ folder
```

---

**Need Help?** Check README.md for detailed troubleshooting

**Happy Coding! 🎉**
