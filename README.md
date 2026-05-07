# Gloria Ondah & Associates — Local Setup Guide

> Full-stack law firm website with booking system, blog CMS, and admin dashboard

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/))
- **Git** (optional)

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

**Create Database:**
```bash
# Using psql
psql -U postgres
CREATE DATABASE goa_law;
\q
```

**Or using pgAdmin:**
- Open pgAdmin
- Right-click "Databases" → Create → Database
- Name: `goa_law`

### 3. Configure Environment Variables

```bash
# Copy example file
copy .env.example .env

# Edit .env with your credentials
notepad .env
```

**Minimum Required Variables:**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/goa_law
ADMIN_PASSWORD=your-secure-password
ADMIN_SECRET=your-secret-key
```

**Optional Services:**
- **Paystack**: For payment processing ([Get API keys](https://dashboard.paystack.com/#/settings/developer))
- **Brevo**: For email notifications ([Get API key](https://app.brevo.com/settings/keys/api))
- **Cloudinary**: For image uploads ([Get credentials](https://cloudinary.com/console))

### 4. Start Development Servers

**Terminal 1 - Backend API:**
```bash
npm run api
```
Server runs on: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Website runs on: http://localhost:5000

### 5. Access the Application

- **Public Website**: http://localhost:5000
- **Admin Dashboard**: http://localhost:5000/#/admin
  - Default password: `GOA-Admin-2024` (change in .env)

---

## 📁 Project Structure

```
Gloria-adah/
├── src/                    # React frontend
│   ├── components/
│   │   ├── pages/         # 15 route pages
│   │   ├── shared/        # Reusable components
│   │   └── ui/            # shadcn/ui components
│   ├── App.tsx            # Main app with routing
│   └── main.tsx           # Entry point
├── server/                # Express backend
│   ├── routes/            # API endpoints
│   ├── db.js              # Database + schema
│   ├── email.js           # Email service
│   ├── paystack.js        # Payment service
│   └── index.js           # Server entry
├── public/                # Static assets
├── .env                   # Environment variables (create this)
├── .env.example           # Template
└── package.json           # Dependencies
```

---

## 🗄️ Database Setup

The database schema is automatically created when you start the API server for the first time.

**Tables Created:**
- `bookings` - Consultation bookings
- `contact_submissions` - Contact form inquiries
- `blog_posts` - Blog articles (6 pre-seeded)

**Verify Database:**
```bash
psql -U postgres -d goa_law
\dt  # List tables
SELECT * FROM blog_posts;  # View seeded posts
\q
```

---

## 🔧 Configuration

### Database Connection

**Local PostgreSQL:**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/goa_law
```

**Remote Database (e.g., Neon, Supabase):**
```env
DATABASE_URL=postgresql://user:pass@host.region.provider.com:5432/dbname?sslmode=require
```

### Admin Access

Change default password in `.env`:
```env
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_SECRET=your-random-secret-key-min-32-chars
```

### Payment Integration (Optional)

Get Paystack API keys from https://dashboard.paystack.com/#/settings/developer

```env
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
```

### Email Service (Optional)

Get Brevo API key from https://app.brevo.com/settings/keys/api

```env
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxx
BREVO_SENDER_EMAIL=noreply@yourdomain.com
```

**Important**: Whitelist your server IP in Brevo dashboard for emails to send.

### Image Upload (Optional)

Get Cloudinary credentials from https://cloudinary.com/console

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📝 Available Scripts

```bash
npm run dev       # Start Vite dev server (port 5000)
npm run api       # Start Express API server (port 3001)
npm run build     # Build for production
npm start         # Start production server
npm run preview   # Preview production build
npm run typecheck # TypeScript type checking
```

---

## 🎯 Features

### Public Website
- ✅ Homepage with hero, practice areas, testimonials
- ✅ 8 practice area detail pages
- ✅ Blog with search, filtering, 6 pre-seeded articles
- ✅ Booking system with calendar and payments
- ✅ Contact form with Google Maps
- ✅ Attorney profile, FAQ, case studies

### Admin Dashboard
- ✅ Blog CMS with Markdown editor
- ✅ Image upload to Cloudinary
- ✅ Booking management
- ✅ Contact inquiry management
- ✅ Statistics dashboard

### Integrations
- ✅ Paystack payment processing
- ✅ Brevo email notifications
- ✅ Cloudinary image hosting
- ✅ Google Calendar .ics generation

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: 
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists: `psql -U postgres -l`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change port in vite.config.ts if needed
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Admin Login Not Working
- Check ADMIN_PASSWORD in .env
- Clear browser localStorage
- Verify token generation in server logs

### Images Not Uploading
- Check Cloudinary credentials in .env
- Verify API key is active
- Check file size (max 8MB)

---

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized frontend files.

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
# ... other production credentials
```

### Deployment Platforms

**Recommended:**
- **Railway** - Full-stack deployment with PostgreSQL
- **Vercel** - Frontend + Serverless functions
- **Render** - Full-stack with free PostgreSQL
- **Heroku** - Traditional PaaS deployment

See `PROJECT_OVERVIEW.md` for detailed deployment instructions.

---

## 📚 Documentation

- **PROJECT_OVERVIEW.md** - Complete feature documentation
- **API Endpoints** - See server/routes/ folder
- **Database Schema** - See server/db.js

---

## 🔒 Security Checklist

Before going live:
- [ ] Change ADMIN_PASSWORD from default
- [ ] Use strong ADMIN_SECRET (32+ characters)
- [ ] Use production Paystack keys (sk_live_*)
- [ ] Enable HTTPS
- [ ] Whitelist server IP in Brevo
- [ ] Set NODE_ENV=production
- [ ] Review rate limiting settings
- [ ] Backup database regularly

---

## 📞 Support

For issues:
1. Check troubleshooting section above
2. Review server logs in terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set

---

## 📄 License

Proprietary - Built for Gloria Ondah & Associates

**Contact:**
- Phone: +234 902 963 3193
- WhatsApp: +234 705 458 8490
- Email: G.ondahlawoffice@gmail.com

---

**Built with ❤️ for Nigerian Legal Practice**
