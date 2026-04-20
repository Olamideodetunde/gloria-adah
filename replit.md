# Gloria Ondah & Associates — GOA Website

## Project Overview
Full-stack law firm website for Gloria Ondah & Associates — a Nigerian law firm (CAC Reg: BN-3068204, est. 2017, Abuja/Lagos). Burgundy/gold editorial aesthetic with Paystack payments and Brevo email integration.

## Project Structure
```
/
├── src/                          # React + Vite frontend (TypeScript)
│   ├── App.tsx                   # Root app with hash router
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Tailwind v4 + brand tokens
│   ├── lib/
│   │   └── utils.ts              # Tailwind cn() helper
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── shared/               # Nav, Footer, WhatsAppFAB, CTABand, SectionHeader, PageShell, motion.ts, routes.ts, practiceAreas.ts
│   │   └── pages/                # Home, About, PracticeAreas, PracticeDetail, Attorney, Insights, InsightsSingle, CaseStudies, Faq, Contact, Booking, Privacy, Terms, Disclaimer
├── server/                       # Express API (ESM, Node.js)
│   ├── index.js                  # Entry (port 3001)
│   ├── db.js                     # PostgreSQL client (pg + SSL)
│   ├── email.js                  # Brevo transactional email
│   ├── paystack.js               # Paystack payment initiation
│   └── routes/
│       ├── bookings.js           # POST /api/bookings
│       ├── contact.js            # POST /api/contact
│       ├── posts.js              # GET/POST/PUT/DELETE /api/posts (blog CRUD)
│       └── admin.js              # POST /api/admin/login + protected dashboard routes
├── public/
│   ├── favicon.svg
│   └── images/                   # hero.png, gloria.png, insight-1/2/3.png, flyer.png
├── index.html                    # HTML entry with GOA meta tags
├── vite.config.ts                # Port 5000, /api proxy to :3001
├── tsconfig.json
└── package.json                  # Single root package for all deps
```

## Workflows
- **GOA Website** — `npm run dev` (Vite, port 5000, webview)
- **GOA API Server** — `node server/index.js` (Express, port 3001, console)

## Routing
- Hash-based router in App.tsx (no react-router dependency)
- Routes: `#/`, `#/about`, `#/practice-areas`, `#/practice/:slug`, `#/attorneys/gloria-ondah`, `#/insights`, `#/insights/:slug`, `#/case-studies`, `#/faq`, `#/contact`, `#/booking`, `#/privacy`, `#/terms`, `#/disclaimer`, `#/admin`

## Brand
- Primary: `#440a18` (deep burgundy) — HSL `345 74% 15%`
- Secondary: `#b87d39` (gold) — HSL `32 53% 47%`
- Fonts: Playfair Display (serif headings) + Plus Jakarta Sans (sans body)
- Strict editorial aesthetic — `border-radius: 0` (no rounded corners)

## Environment Variables Required
- `DATABASE_URL` — PostgreSQL connection string (SSL)
- `PAYSTACK_SECRET_KEY` — Paystack backend secret
- `PAYSTACK_PUBLIC_KEY` — Paystack frontend key
- `BREVO_API_KEY` — Brevo (formerly Sendinblue) API key
  - ⚠️ Requires IP 34.182.90.163 whitelisted in Brevo dashboard for emails to send
- `ADMIN_PASSWORD` — Admin dashboard password (default: `GOA-Admin-2024`)
- `ADMIN_SECRET` — Token signing secret (default: `goa-law-secret-key`)
- `VITE_GA_MEASUREMENT_ID` — Google Analytics 4 Measurement ID (G-XXXXXXXXXX). Build-time client env var. If absent, GA simply doesn't load.

## Practice Areas (8 total)
company-registration, contracts, compliance, litigation, ip, property, oil-gas, employment

## Contact Details
- Phone: 09029633193
- WhatsApp: 07054588490
- Email: G.ondahlawoffice@gmail.com
- Abuja: No. 28, 3rd Avenue, Gwarinpa Estate

## Key Notes
- Previous mockup-sandbox code lives in `artifacts/mockup-sandbox/` and can eventually be removed
- Booking flow: Service → Schedule → Details → Payment (Paystack) → Confirmation
- All booking/contact submissions create DB records and send Brevo emails
- Calendar sync: Server generates .ics file and emails it as attachment to both client + firm
- Blog system: 6 seeded posts (CAC returns, trademarks, NUPRC, NDPR compliance, employment contracts, tax SMEs). Seed uses ON CONFLICT (slug) DO NOTHING so all 6 are always present.
- Insights page: search bar (client-side title/excerpt filter), category tabs, reading time per post, featured + grid layout
- InsightsSingle page: reading time, author card, related articles section (same category, excludes current)
- Admin dashboard at `#/admin`: password login → tabs for blog posts (CRUD), bookings, contacts, stats
- Admin auth: token = SHA256(ADMIN_PASSWORD:ADMIN_SECRET), stored in localStorage as `goa_admin_token`
- Blog post content supports simple Markdown: ## headings, **bold**, - lists, > blockquotes
- Contact page: 3 clickable info cards (Call Us, WhatsApp, Email), service dropdown + preferred contact method radio in form, business hours section (8am-6pm Mon-Fri, 24/7 WhatsApp), Google Maps embed for Abuja office
- Home hero: 3 CTAs — "Book a Consultation" (primary), "Chat on WhatsApp" (outline), "Call Now" (ghost/tertiary)
- Footer: newsletter subscription form (POST /api/contact/newsletter), office hours display
- Server security: Helmet.js headers, express-rate-limit (20/15min for forms, 50/15min for admin)
- SEO: Full Open Graph, Twitter Card, JSON-LD schema (LegalService type) in index.html
- Accessibility: skip-to-main-content link in index.html
