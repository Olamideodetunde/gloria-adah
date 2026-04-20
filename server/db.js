import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      ref_code VARCHAR(50) UNIQUE NOT NULL,
      service_type VARCHAR(100) NOT NULL,
      service_price INTEGER NOT NULL,
      practice_area VARCHAR(100),
      appointment_date DATE NOT NULL,
      appointment_time VARCHAR(20) NOT NULL,
      client_name VARCHAR(200) NOT NULL,
      client_email VARCHAR(200) NOT NULL,
      client_phone VARCHAR(50) NOT NULL,
      client_company VARCHAR(200),
      description TEXT,
      paystack_reference VARCHAR(200),
      payment_status VARCHAR(50) DEFAULT 'pending',
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      ref_code VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      subject VARCHAR(300) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'unread',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(200) UNIQUE NOT NULL,
      title VARCHAR(300) NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      category VARCHAR(100) DEFAULT 'Insights',
      cover_image VARCHAR(500),
      author VARCHAR(200) DEFAULT 'Gloria Ondah',
      is_published BOOLEAN DEFAULT false,
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await seedBlogPosts();
  console.log('[DB] Tables ready');
}

async function seedBlogPosts() {
  const { rows } = await pool.query('SELECT COUNT(*) FROM blog_posts');
  if (parseInt(rows[0].count) > 0) return;

  const posts = [
    {
      slug: 'cac-annual-returns-guide-2026',
      title: 'Filing Annual Returns with the CAC: A 2026 Guide',
      excerpt: 'Every business registered in Nigeria must file annual returns with the CAC. Failure to do so attracts penalties and potential striking off the register.',
      content: `Every business registered in Nigeria under the Corporate Affairs Commission (CAC) has a statutory obligation to file annual returns. Failure to do so can result in severe penalties, including the delisting of the company from the companies register.

## What are Annual Returns?

An annual return is not a financial statement or a tax return. Rather, it is a mandatory yearly filing that confirms to the CAC that your business is still active and operational. It typically includes:

- Confirmation of registered address
- Updated director and shareholder information
- Statement of share capital (for limited liability companies)

## When is the Deadline?

- **Business Names (Enterprises):** Must be filed not later than the 30th of June every year.
- **Limited Liability Companies (LTD):** Must be filed within 42 days after the Annual General Meeting (AGM).
- **Incorporated Trustees (NGOs):** Must be filed between the 30th of June and the 31st of December every year.

> "Ignoring annual returns is the most common compliance mistake made by Nigerian SMEs, often discovered only when applying for a major contract or bank loan."

## Consequences of Default

If a company fails to file its annual returns, it is classified as "Inactive" on the CAC portal. The CAC imposes daily default penalties and may strike the company's name off the register entirely.

## How We Can Help

At Gloria Ondah & Associates, we manage the entire compliance calendar for our clients. We prepare the necessary documents, liaise with auditors, and ensure prompt filing on the CAC portal. Contact us today to avoid costly penalties.`,
      category: 'Corporate Law',
      cover_image: '/images/insight-1.png',
      author: 'Gloria Ondah',
      is_published: true
    },
    {
      slug: 'trademark-protection-nigerian-startups',
      title: 'Trademark Protection for Nigerian Startups',
      excerpt: 'Why securing your brand identity early is crucial for tech startups and how to navigate the Nigerian trademark registry.',
      content: `For startups, the brand is everything. Your name, logo, and tagline are assets that can appreciate in value as your business grows. Yet intellectual property protection remains one of the most neglected areas of startup legal planning in Nigeria.

## Why Register Your Trademark?

A registered trademark gives you the exclusive legal right to use your brand name and logo in Nigeria. Without registration, you have no legal standing to prevent a competitor from copying your branding.

## The Nigerian Trademark Registry

The Trademarks, Patents and Designs Registry, under the Federal Ministry of Industry, Trade and Investment, is responsible for trademark registrations in Nigeria.

## The Registration Process

1. **Clearance Search** — Verify availability of your proposed mark.
2. **Application Filing** — Submit Form TM1 along with the prescribed fees.
3. **Examination** — The registry examines the mark for conflicts.
4. **Advertisement** — The mark is published in the Trademark Journal for two months (opposition period).
5. **Registration** — If no opposition is filed, a certificate is issued.

## How Long Does It Take?

The process typically takes 12 to 24 months in Nigeria. However, you enjoy protection from the date of application, not the date of registration.

## Protect Your Brand Today

Gloria Ondah & Associates handles trademark searches, applications, prosecution, and renewals. We advise early registration — before your brand gains traction and becomes a target for copycats.`,
      category: 'Intellectual Property',
      cover_image: '/images/insight-2.png',
      author: 'Gloria Ondah',
      is_published: true
    },
    {
      slug: 'nuprc-compliance-indigenous-operators',
      title: 'Navigating NUPRC Compliance for Indigenous Operators',
      excerpt: 'A breakdown of recent regulatory changes affecting local content requirements in the Nigerian oil and gas sector.',
      content: `The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) was established by the Petroleum Industry Act (PIA) 2021 to regulate all upstream petroleum operations in Nigeria. For indigenous operators and international service companies, understanding the new compliance landscape is non-negotiable.

## Key Changes Under the PIA 2021

The Petroleum Industry Act fundamentally restructured Nigeria's oil and gas regulatory framework. Key changes include:

- **Creation of NUPRC** — replaces the Department of Petroleum Resources (DPR) for upstream regulation.
- **Nigerian Midstream and Downstream Petroleum Regulatory Authority (NMDPRA)** — covers midstream and downstream activities.
- **Host Community Development** — mandatory 3% of annual operating expenditure for host community development.

## Local Content Requirements

The Nigerian Oil and Gas Industry Content Development Act (NOGICD Act) remains in force and requires:

- Minimum Nigerian content in procurement and employment
- NipeX registration for service companies
- Nigerian Content Compliance Certificate (NCCC) for contracts

## Practical Steps for Compliance

1. Obtain your NipeX Vendor Registration
2. Ensure your technical staff meet local content thresholds
3. File your Annual Nigerian Content Performance Report
4. Engage a legal advisor for contract reviews

Gloria Ondah & Associates provides end-to-end support for energy sector clients, from regulatory registration to contract advisory. Reach out for a consultation.`,
      category: 'Energy Law',
      cover_image: '/images/insight-3.png',
      author: 'Gloria Ondah',
      is_published: true
    }
  ];

  for (const post of posts) {
    await pool.query(
      `INSERT INTO blog_posts (slug, title, excerpt, content, category, cover_image, author, is_published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       ON CONFLICT (slug) DO NOTHING`,
      [post.slug, post.title, post.excerpt, post.content, post.category, post.cover_image, post.author, post.is_published]
    );
  }
}
