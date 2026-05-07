# Gloria Ondah & Associates — Complete Project Overview

> **Full-stack law firm website with booking system, blog CMS, and admin dashboard**

---

## 🎯 Project Summary

**Gloria Ondah & Associates (GOA)** is a production-ready, full-featured law firm website built for a Nigerian legal practice (CAC Reg: BN-3068204, est. 2017, Abuja/Lagos). The platform combines a modern public-facing website with a comprehensive admin dashboard, booking system, and blog management.

### Key Stats
- **15 Public Pages** - Complete website with all legal practice information
- **4 Admin Modules** - Dashboard, Blog CMS, Bookings, Inquiries
- **8 Practice Areas** - Comprehensive legal service coverage
- **6 Pre-seeded Blog Posts** - Ready-to-publish legal insights
- **Real-time Calendar Integration** - Live booking availability
- **Payment Integration** - Paystack for consultation payments
- **Email Automation** - Brevo for transactional emails

---

## 🏗️ Architecture

### Tech Stack

**Frontend**
- React 19.1.0 + TypeScript 5.8.3
- Vite 7.3.0 (development server)
- Tailwind CSS 4.1.14 (utility-first styling)
- Framer Motion 12.23.24 (animations)
- React Hook Form 7.66.0 + Zod 3.25.76 (form validation)
- shadcn/ui components (Radix UI primitives)

**Backend**
- Node.js + Express 5.2.1 (ESM modules)
- PostgreSQL (via pg 8.20.0)
- Cloudinary 2.9.0 (image uploads)
- Google Calendar API (googleapis 171.4.0)
- Helmet 8.1.0 (security headers)
- Express Rate Limit 8.3.2 (DDoS protection)

**Integrations**
- **Paystack** - Payment processing for consultations
- **Brevo (Sendinblue)** - Transactional email service
- **Google Calendar** - .ics file generation for appointments
- **Cloudinary** - Blog post cover image hosting

### Project Structure
```
Gloria-adah/
├── src/                          # React frontend
│   ├── components/
│   │   ├── pages/               # 15 route pages
│   │   ├── shared/              # Nav, Footer, WhatsApp FAB, etc.
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/utils.ts
│   ├── App.tsx                  # Hash router
│   └── main.tsx
├── server/                       # Express API
│   ├── routes/
│   │   ├── bookings.js          # Booking CRUD + availability
│   │   ├── contact.js           # Contact form + newsletter
│   │   ├── posts.js             # Blog CRUD
│   │   ├── admin.js             # Admin auth + dashboard
│   │   └── upload.js            # Cloudinary image upload
│   ├── db.js                    # PostgreSQL + schema + seeds
│   ├── email.js                 # Brevo email service
│   ├── paystack.js              # Payment initiation
│   └── index.js                 # Express app entry
├── public/images/               # Static assets
├── package.json                 # Single root package
├── vite.config.ts               # Port 5000, /api proxy
└── replit.md                    # Full documentation
```

---

## 🎨 Design System

### Brand Identity
- **Primary Color**: `#440a18` (Deep burgundy) — HSL `345 74% 15%`
- **Secondary Color**: `#b87d39` (Gold) — HSL `32 53% 47%`
- **Typography**: 
  - Headings: Playfair Display (serif, elegant)
  - Body: Plus Jakarta Sans (sans-serif, modern)
- **Design Philosophy**: Strict editorial aesthetic with `border-radius: 0` (no rounded corners)

### Visual Features
- Full-bleed hero image with gradient overlays
- Burgundy/gold color scheme throughout
- Professional, corporate aesthetic
- Mobile-first responsive design
- Smooth Framer Motion animations
- WhatsApp floating action button

---

## 📄 Complete Page List

### Public Pages (15 total)

1. **Home** (`#/`)
   - Hero section with 3 CTAs (Book, WhatsApp, Call)
   - 8 practice area cards
   - Client testimonials carousel
   - Trusted partners marquee
   - Stats display (10+ years, 200+ clients, 95% success rate)

2. **About** (`#/about`)
   - Firm history and mission
   - Core values
   - Team introduction
   - Professional credentials

3. **Practice Areas** (`#/practice-areas`)
   - Grid of 8 legal service categories
   - Each with icon, description, and CTA

4. **Practice Detail** (`#/practice/:slug`)
   - Individual practice area pages
   - Detailed service descriptions
   - Related case studies
   - Booking CTA

5. **Attorney Profile** (`#/attorneys/gloria-ondah`)
   - Founder biography
   - Professional qualifications
   - Bar admissions
   - Contact information

6. **Insights (Blog)** (`#/insights`)
   - Search functionality
   - Category filtering (8 categories)
   - Featured post (large card)
   - Grid of regular posts
   - Reading time estimates

7. **Single Insight** (`#/insights/:slug`)
   - Full blog post with Markdown rendering
   - Author card
   - Related articles section
   - Social sharing ready

8. **Case Studies** (`#/case-studies`)
   - Success stories
   - Client testimonials
   - Industry-specific examples

9. **FAQ** (`#/faq`)
   - Accordion-style Q&A
   - Common legal questions
   - Process explanations

10. **Contact** (`#/contact`)
    - Contact form with service dropdown
    - 3 clickable info cards (Call, WhatsApp, Email)
    - Business hours display
    - Google Maps embed (Abuja office)
    - Newsletter subscription

11. **Booking** (`#/booking`)
    - 4-step wizard (Service → Schedule → Details → Payment)
    - Real-time calendar availability
    - 4 service types (Initial, Strategy, Document Review, Retainer)
    - Paystack payment integration
    - .ics calendar file download
    - Google Calendar link
    - WhatsApp confirmation

12. **Privacy Policy** (`#/privacy`)
    - NDPR compliance statement
    - Data collection practices
    - User rights

13. **Terms of Service** (`#/terms`)
    - Website usage terms
    - Service agreements
    - Liability disclaimers

14. **Disclaimer** (`#/disclaimer`)
    - Legal disclaimers
    - Attorney-client relationship clarification

15. **Admin Dashboard** (`#/admin`)
    - Password-protected access
    - 4 main modules (see below)

---

## 🔐 Admin Dashboard Features

### Authentication
- Password-based login (default: `GOA-Admin-2024`)
- Token stored in localStorage (`goa_admin_token`)
- SHA256 hash verification
- Session management
- Auto-logout on 401 responses

### Module 1: Dashboard Overview
- **Statistics Cards**:
  - Total bookings (with confirmed count)
  - Published posts (with total count)
  - New inquiries (unread count)
  - Total revenue (from paid bookings)
- **Recent Activity**:
  - Last 5 bookings with status
  - Last 5 inquiries with read/unread status
- **Real-time Updates**: Refresh button with loading state

### Module 2: Blog Management
- **Post Editor**:
  - Rich text content area (Markdown support)
  - Title + auto-slug generation
  - Excerpt field
  - Category dropdown (8 categories)
  - Author field
  - Cover image upload (Cloudinary)
  - Publish/draft toggle
  - Preview before publishing
- **Post List**:
  - All posts with cover thumbnails
  - Status badges (Published/Draft)
  - Category tags
  - Quick actions: Edit, Publish/Unpublish, Delete
  - Expandable details (excerpt, slug, preview link)
- **Image Upload**:
  - Drag-and-drop or click to upload
  - Cloudinary integration
  - Image preview
  - Change/remove options
  - Max 8MB, supports JPG/PNG/WEBP

### Module 3: Bookings Management
- **Booking List**:
  - Reference code (e.g., GOA-BOOK-20260422-ABCD)
  - Client details (name, email, phone, company)
  - Service type and price
  - Appointment date and time
  - Status badges (Confirmed, Pending, Awaiting Payment)
  - Payment status (Paid, Free, Pending)
  - Description preview
  - Booking date
- **Filters**: Status, payment status, date range
- **Actions**: View details, update status, contact client

### Module 4: Contact Inquiries
- **Inquiry List**:
  - Reference code
  - Client details
  - Subject line
  - Full message
  - Status (Unread/Read)
  - Submission date
- **Actions**:
  - Mark as read
  - Reply via email (mailto link)
  - Archive/delete
- **Unread Badge**: Visual indicator for new inquiries

---

## 📅 Booking System Features

### Service Types
1. **Initial Consultation** - 30 min, ₦15,000
2. **Strategy Session** - 60 min, ₦35,000
3. **Document Review** - 45 min, ₦25,000
4. **Retainer Discovery** - 15 min, Free

### Booking Flow
1. **Step 1: Service Selection**
   - Choose service type
   - Select related practice area (optional)
   - View pricing and duration

2. **Step 2: Schedule**
   - Calendar picker (excludes Sundays and past dates)
   - Real-time availability check via API
   - Time slots: 9:00 AM, 10:00 AM, 11:30 AM, 1:00 PM, 2:30 PM, 4:00 PM
   - Booked slots shown as unavailable
   - Past times grayed out

3. **Step 3: Client Details**
   - Full name, email, phone (required)
   - Company name (optional)
   - Brief description of legal issue (required)
   - NDPR consent checkbox

4. **Step 4: Payment**
   - Paystack checkout UI
   - Card payment form
   - Secure payment processing
   - Free consultations skip this step

5. **Step 5: Confirmation**
   - Booking reference code
   - Appointment summary
   - Email confirmation sent
   - Calendar integration:
     - Download .ics file
     - Add to Google Calendar
   - WhatsApp notification link

### Backend Features
- **Availability API**: `/api/bookings/availability?date=YYYY-MM-DD&duration=30`
  - Checks existing bookings
  - Filters past times
  - Returns available/unavailable slots with reasons
- **Booking Creation**: POST `/api/bookings`
  - Generates unique reference code
  - Creates database record
  - Initiates Paystack payment (if required)
  - Sends confirmation email via Brevo
  - Attaches .ics calendar file
- **Email Notifications**:
  - Client confirmation email
  - Firm notification email
  - Calendar invite attachment

---

## 📝 Blog System Features

### Content Management
- **6 Pre-seeded Posts**:
  1. CAC Annual Returns Guide 2026
  2. Trademark Protection for Nigerian Startups
  3. Navigating NUPRC Compliance for Indigenous Operators
  4. Understanding NDPR Compliance for Nigerian Businesses
  5. Essential Contract Clauses for Nigerian Employment Agreements
  6. Tax Compliance Checklist for SMEs in Nigeria

- **Categories** (8 total):
  - Insights (general)
  - Corporate Law
  - Intellectual Property
  - Energy Law
  - Compliance
  - Tax
  - Property
  - Employment

### Public Blog Features
- **Search**: Real-time client-side filtering by title/excerpt
- **Category Tabs**: Filter posts by category
- **Featured Post**: Large hero card for latest/featured article
- **Grid Layout**: 3-column responsive grid for regular posts
- **Reading Time**: Auto-calculated based on word count (200 words/min)
- **Post Metadata**: Category, date, author, reading time
- **Cover Images**: Full-width images with hover effects
- **Markdown Support**: 
  - `## Headings`
  - `**Bold text**`
  - `- Bullet lists`
  - `> Blockquotes`

### Single Post Page
- Full article content with Markdown rendering
- Author card with bio
- Related articles (same category, excludes current)
- Social sharing ready (Open Graph meta tags)
- Reading progress indicator

---

## 🔌 API Endpoints

### Public Endpoints
```
GET  /api/health                          # Health check
GET  /api/posts                           # Published posts
GET  /api/posts/:slug                     # Single post by slug
GET  /api/bookings/availability           # Check time slot availability
POST /api/bookings                        # Create booking
POST /api/contact                         # Submit contact form
POST /api/contact/newsletter              # Newsletter subscription
```

### Admin Endpoints (Protected)
```
POST   /api/admin/login                   # Admin authentication
GET    /api/admin/stats                   # Dashboard statistics
GET    /api/admin/bookings                # All bookings
GET    /api/admin/contacts                # All inquiries
PATCH  /api/admin/contacts/:id/status     # Update inquiry status
GET    /api/posts/all                     # All posts (including drafts)
POST   /api/posts                         # Create post
PUT    /api/posts/:id                     # Update post
DELETE /api/posts/:id                     # Delete post
POST   /api/upload                        # Upload image to Cloudinary
```

---

## 💳 Payment Integration

### Paystack Setup
- **Test Mode**: Uses test keys for development
- **Live Mode**: Production keys for real payments
- **Supported Methods**: Cards, Bank Transfer, USSD, QR Code
- **Currency**: Nigerian Naira (NGN)

### Payment Flow
1. User completes booking details
2. Backend calls Paystack Initialize Transaction API
3. Returns authorization URL
4. User redirected to Paystack checkout
5. Payment processed securely
6. Webhook confirms payment (future enhancement)
7. Booking status updated to "confirmed"

### Security
- API keys stored in environment variables
- HTTPS required for production
- Webhook signature verification ready

---

## 📧 Email System

### Brevo Integration
- **API Key**: Stored in `BREVO_API_KEY` env var
- **Sender Email**: Configured in `BREVO_SENDER_EMAIL`
- **IP Whitelisting**: Requires server IP whitelisted in Brevo dashboard

### Email Types
1. **Booking Confirmation** (Client)
   - Booking reference
   - Appointment details
   - Calendar invite (.ics attachment)
   - Contact information

2. **Booking Notification** (Firm)
   - New booking alert
   - Client details
   - Service requested
   - Calendar invite

3. **Contact Form Submission**
   - Inquiry details
   - Client contact info
   - Message content

4. **Newsletter Subscription**
   - Welcome email
   - Unsubscribe link

---

## 🗄️ Database Schema

### Tables

**1. bookings**
```sql
id                SERIAL PRIMARY KEY
ref_code          VARCHAR(50) UNIQUE NOT NULL
service_type      VARCHAR(100) NOT NULL
service_price     INTEGER NOT NULL
practice_area     VARCHAR(100)
appointment_date  DATE NOT NULL
appointment_time  VARCHAR(20) NOT NULL
client_name       VARCHAR(200) NOT NULL
client_email      VARCHAR(200) NOT NULL
client_phone      VARCHAR(50) NOT NULL
client_company    VARCHAR(200)
description       TEXT
paystack_reference VARCHAR(200)
payment_status    VARCHAR(50) DEFAULT 'pending'
status            VARCHAR(50) DEFAULT 'pending'
created_at        TIMESTAMPTZ DEFAULT NOW()
```

**2. contact_submissions**
```sql
id          SERIAL PRIMARY KEY
ref_code    VARCHAR(50) UNIQUE NOT NULL
name        VARCHAR(200) NOT NULL
email       VARCHAR(200) NOT NULL
phone       VARCHAR(50) NOT NULL
subject     VARCHAR(300) NOT NULL
message     TEXT NOT NULL
status      VARCHAR(50) DEFAULT 'unread'
created_at  TIMESTAMPTZ DEFAULT NOW()
```

**3. blog_posts**
```sql
id            SERIAL PRIMARY KEY
slug          VARCHAR(200) UNIQUE NOT NULL
title         VARCHAR(300) NOT NULL
excerpt       TEXT
content       TEXT NOT NULL
category      VARCHAR(100) DEFAULT 'Insights'
cover_image   VARCHAR(500)
author        VARCHAR(200) DEFAULT 'Gloria Ondah'
is_published  BOOLEAN DEFAULT false
published_at  TIMESTAMPTZ
created_at    TIMESTAMPTZ DEFAULT NOW()
updated_at    TIMESTAMPTZ DEFAULT NOW()
```

### Seed Data
- **6 blog posts** automatically seeded on first run
- Uses `ON CONFLICT (slug) DO NOTHING` to prevent duplicates
- All posts pre-published with cover images

---

## 🔒 Security Features

### Backend Security
- **Helmet.js**: Security headers (CSP, XSS protection, etc.)
- **CORS**: Configured for specific origins
- **Rate Limiting**:
  - Forms: 20 requests per 15 minutes
  - Admin: 50 requests per 15 minutes
- **Input Validation**: Zod schemas on frontend + backend
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization

### Authentication
- Password hashing (SHA256)
- Token-based admin auth
- Secure token storage (localStorage)
- Session expiration
- HTTPS required for production

### Data Privacy
- NDPR compliance statement
- Consent checkboxes
- Privacy policy page
- Data retention policies
- Secure email handling

---

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Hamburger menu navigation
- Touch-friendly buttons (min 44px)
- Swipeable testimonial carousel
- Responsive grid layouts
- Optimized images
- Fast loading times

### Performance
- Lazy loading images
- Code splitting
- Minified assets
- Gzip compression
- CDN-ready

---

## 🌍 SEO & Analytics

### SEO Features
- **Meta Tags**: Title, description, keywords
- **Open Graph**: Facebook/LinkedIn sharing
- **Twitter Cards**: Twitter sharing
- **JSON-LD Schema**: LegalService structured data
- **Sitemap Ready**: All routes accessible
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: All images have descriptions

### Google Analytics
- GA4 integration ready
- Environment variable: `VITE_GA_MEASUREMENT_ID`
- Page view tracking
- Event tracking ready
- Conversion tracking ready

---

## 🚀 Deployment

### Environment Variables Required
```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Paystack
PAYSTACK_SECRET_KEY=sk_live_xxx
PAYSTACK_PUBLIC_KEY=pk_live_xxx

# Brevo Email
BREVO_API_KEY=xkeysib-xxx
BREVO_SENDER_EMAIL=noreply@goa-law.ng

# Admin
ADMIN_PASSWORD=your-secure-password
ADMIN_SECRET=your-secret-key

# Google Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Server
PORT=5000
NODE_ENV=production
```

### Deployment Platforms
- **Replit**: Currently hosted (development)
- **Vercel**: Frontend deployment ready
- **Railway**: Full-stack deployment ready
- **Heroku**: Full-stack deployment ready
- **DigitalOcean**: VPS deployment ready

### Build Commands
```bash
# Development
npm run dev          # Vite dev server (port 5000)
node server/index.js # API server (port 3001)

# Production
npm run build        # Build frontend
npm start            # Start production server
```

---

## 📊 Project Statistics

### Code Metrics
- **Total Files**: 50+
- **Lines of Code**: ~8,000+
- **Components**: 30+
- **API Routes**: 15+
- **Database Tables**: 3
- **Pages**: 15 public + 1 admin

### Features Count
- **8 Practice Areas**
- **4 Service Types**
- **6 Time Slots per day**
- **8 Blog Categories**
- **6 Pre-seeded Posts**
- **4 Admin Modules**
- **3 Email Types**
- **2 Payment Methods** (Paystack + Free)

---

## 🎯 Key Differentiators

### What Makes This Special
1. **Production-Ready**: Not a demo, fully functional law firm website
2. **Real Business**: Actual Nigerian law firm (CAC registered)
3. **Complete CMS**: Full blog management without external dependencies
4. **Live Booking**: Real-time calendar availability checking
5. **Payment Integration**: Actual Paystack payment processing
6. **Email Automation**: Brevo transactional emails with attachments
7. **Calendar Sync**: .ics file generation + Google Calendar integration
8. **Admin Dashboard**: Comprehensive management interface
9. **Mobile-First**: Fully responsive on all devices
10. **SEO Optimized**: Complete meta tags and structured data

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Paystack webhook for payment confirmation
- [ ] SMS notifications via Termii/Africa's Talking
- [ ] Client portal for case tracking
- [ ] Document upload for consultations
- [ ] Multi-language support (English + Yoruba/Igbo/Hausa)
- [ ] Live chat integration
- [ ] Video consultation booking (Zoom/Google Meet)
- [ ] Automated appointment reminders (24h before)
- [ ] Client testimonial submission form
- [ ] Newsletter email campaigns
- [ ] Advanced analytics dashboard
- [ ] Two-factor authentication for admin
- [ ] Role-based access (Admin, Lawyer, Receptionist)
- [ ] Invoice generation for paid consultations
- [ ] Recurring appointment scheduling

---

## 📞 Contact Information

### Law Firm Details
- **Name**: Gloria Ondah & Associates
- **CAC Registration**: BN-3068204
- **Established**: 2017
- **Locations**: Abuja (HQ) + Lagos
- **Phone**: +234 902 963 3193
- **WhatsApp**: +234 705 458 8490
- **Email**: G.ondahlawoffice@gmail.com
- **Address**: No. 28, 3rd Avenue, Gwarinpa Estate, Abuja

### Practice Areas
1. Company Registration & Corporate Law
2. Contracts & Commercial Agreements
3. Regulatory Compliance
4. Litigation & Dispute Resolution
5. Intellectual Property
6. Property & Real Estate
7. Oil & Gas / Energy Law
8. Employment & Labour Law

---

## 📝 License & Credits

### Technology Credits
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **shadcn/ui** - Component library
- **Express** - Backend framework
- **PostgreSQL** - Database
- **Paystack** - Payment gateway
- **Brevo** - Email service
- **Cloudinary** - Image hosting

### License
Proprietary - Built for Gloria Ondah & Associates

---

## 🎓 Learning Outcomes

### What This Project Demonstrates
1. **Full-Stack Development**: React + Node.js + PostgreSQL
2. **Payment Integration**: Paystack API implementation
3. **Email Automation**: Transactional email with attachments
4. **Calendar Integration**: .ics file generation
5. **CMS Development**: Custom blog management system
6. **Admin Dashboard**: Protected routes and authentication
7. **Real-time Features**: Live booking availability
8. **Form Validation**: Zod + React Hook Form
9. **Image Upload**: Cloudinary integration
10. **Security Best Practices**: Rate limiting, input validation, HTTPS
11. **Responsive Design**: Mobile-first approach
12. **SEO Optimization**: Meta tags, structured data
13. **API Design**: RESTful endpoints
14. **Database Design**: Normalized schema
15. **Production Deployment**: Environment configuration

---

**Built with ❤️ for Gloria Ondah & Associates** | Making legal services accessible in Nigeria

**Last Updated**: January 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
