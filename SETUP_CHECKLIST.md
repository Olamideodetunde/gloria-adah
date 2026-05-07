# 🚀 Quick Setup Checklist

## Prerequisites Installation

### 1. Install Node.js
- [ ] Download from https://nodejs.org/ (LTS version recommended)
- [ ] Verify installation: `node --version` (should show v18+)
- [ ] Verify npm: `npm --version`

### 2. Install PostgreSQL
- [ ] Download from https://www.postgresql.org/download/windows/
- [ ] During installation, remember your postgres password
- [ ] Verify installation: `psql --version`

---

## Project Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
cd C:\Users\User\Desktop\Gloria-adah
npm install
```
⏱️ Takes 2-3 minutes

### Step 2: Create Database
```bash
# Open Command Prompt and run:
psql -U postgres
# Enter your postgres password when prompted

# Then run:
CREATE DATABASE goa_law;
\q
```

### Step 3: Configure Environment
```bash
# Copy the example file
copy .env.example .env

# Edit .env file
notepad .env
```

**Minimum configuration:**
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/goa_law
ADMIN_PASSWORD=YourSecurePassword123
ADMIN_SECRET=your-random-secret-key-here
```

### Step 4: Start the Application

**Option A: Use the start script (Recommended)**
```bash
# Double-click start.bat
# Or run from command prompt:
start.bat
```

**Option B: Manual start (2 terminals)**

Terminal 1 - Backend:
```bash
npm run api
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### Step 5: Access the Application
- [ ] Open browser: http://localhost:5000
- [ ] Test admin login: http://localhost:5000/#/admin
  - Password: (what you set in .env)

---

## ✅ Verification Checklist

### Backend API (http://localhost:3001)
- [ ] Server starts without errors
- [ ] Database tables created automatically
- [ ] Console shows: "GOA Server running on port 3001"
- [ ] Test health endpoint: http://localhost:3001/api/health

### Frontend (http://localhost:5000)
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Images display
- [ ] Blog page shows 6 pre-seeded articles

### Admin Dashboard (http://localhost:5000/#/admin)
- [ ] Login page displays
- [ ] Can login with password from .env
- [ ] Dashboard shows statistics
- [ ] Blog posts tab shows 6 articles
- [ ] Can create new blog post

---

## 🔧 Optional Services Setup

### Paystack (For Payment Processing)
1. [ ] Sign up at https://dashboard.paystack.com/signup
2. [ ] Get test API keys from Settings → API Keys & Webhooks
3. [ ] Add to .env:
```env
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
```

### Brevo (For Email Notifications)
1. [ ] Sign up at https://app.brevo.com/account/register
2. [ ] Get API key from Settings → API Keys
3. [ ] Add to .env:
```env
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxx
BREVO_SENDER_EMAIL=noreply@yourdomain.com
```
4. [ ] Whitelist your IP in Brevo dashboard

### Cloudinary (For Image Uploads)
1. [ ] Sign up at https://cloudinary.com/users/register_free
2. [ ] Get credentials from Dashboard
3. [ ] Add to .env:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to database"
**Solution:**
- Verify PostgreSQL is running (check Services)
- Check DATABASE_URL in .env
- Ensure database 'goa_law' exists

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find and kill the process
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Issue: "Module not found"
**Solution:**
```bash
# Reinstall dependencies
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Issue: Admin login not working
**Solution:**
- Check ADMIN_PASSWORD in .env matches what you're typing
- Clear browser cache and localStorage
- Try incognito/private window

---

## 📁 Project Structure

```
Gloria-adah/
├── src/              # React frontend
├── server/           # Express backend
├── public/           # Static assets
├── .env              # Your configuration (create this)
├── .env.example      # Template
├── setup.bat         # Setup script
├── start.bat         # Start both servers
├── README.md         # Full documentation
└── package.json      # Dependencies
```

---

## 🎯 What's Included

### Pre-configured Features
✅ 15 public pages (Home, About, Practice Areas, Blog, etc.)
✅ Admin dashboard with blog CMS
✅ Booking system with calendar
✅ Contact form
✅ 6 pre-seeded blog articles
✅ 8 practice area pages
✅ Mobile responsive design
✅ Security headers and rate limiting

### Ready for Integration
⏳ Paystack payments (add API keys)
⏳ Email notifications (add Brevo key)
⏳ Image uploads (add Cloudinary credentials)
⏳ Google Calendar sync (add service account)

---

## 📞 Need Help?

1. Check README.md for detailed documentation
2. Review PROJECT_OVERVIEW.md for feature list
3. Check server console for error messages
4. Check browser console (F12) for frontend errors

---

## 🎉 You're All Set!

Once everything is running:
1. Explore the public website
2. Login to admin dashboard
3. Create a test blog post
4. Try the booking system
5. Customize content for your needs

**Default Admin Credentials:**
- URL: http://localhost:5000/#/admin
- Password: (set in your .env file)

---

**Happy Coding! 🚀**
