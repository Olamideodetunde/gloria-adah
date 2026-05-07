import pkg from 'pg';
const { Pool } = pkg;

// Parse connection string manually to handle special characters
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString?.includes('neon.tech') 
    ? { rejectUnauthorized: false } 
    : false
});

// Test connection on startup
pool.on('error', (err) => {
  console.error('[DB] Unexpected error:', err.message);
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
  console.log('[DB] Tables ready and seeded');
}

async function seedBlogPosts() {

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
    },
    {
      slug: 'ndpr-compliance-nigerian-businesses',
      title: 'Understanding NDPR Compliance for Nigerian Businesses',
      excerpt: 'The Nigeria Data Protection Regulation (NDPR) has significant obligations for businesses. Here is what every company must know to stay compliant.',
      content: `The Nigeria Data Protection Regulation (NDPR), issued by the National Information Technology Development Agency (NITDA) in 2019, is Nigeria's primary data protection framework. Every business that collects, stores, or processes personal data of Nigerian citizens must comply, regardless of whether the business is physically located in Nigeria.

## What Is Personal Data Under the NDPR?

Personal data includes any information that can identify a living individual, directly or indirectly. This includes:

- Full names, phone numbers, email addresses
- Bank account details, BVN, NIN
- IP addresses, browser cookies, location data
- Employee records, client files

## Core Obligations for Businesses

**1. Lawful Basis for Processing**
You must have at least one lawful basis before processing personal data: consent, contract performance, legal obligation, vital interests, public task, or legitimate interests.

**2. Privacy Policy**
Every website or application that collects personal data must publish a clear, accessible Privacy Policy explaining what data you collect, why, and how long you retain it.

**3. Data Subject Rights**
Individuals have the right to access their data, correct errors, and request deletion. You must have a process for handling these requests.

**4. Data Audit**
Conduct a data audit to map what personal data your organisation holds, where it came from, and who it is shared with.

**5. Annual DPCO Report**
Organisations that process large volumes of personal data must engage a **Data Protection Compliance Organisation (DPCO)** and file an annual compliance audit report with NITDA.

## Penalties for Non-Compliance

Failure to comply can attract penalties of up to **₦10,000,000** or **2% of annual gross revenue** for major violations. NITDA has actively pursued enforcement actions against non-compliant organisations.

## How We Can Help

Gloria Ondah & Associates assists businesses with NDPR gap assessments, privacy policy drafting, data processing agreements, staff training, and DPCO coordination. Contact us today to begin your compliance journey.`,
      category: 'Compliance',
      cover_image: '/images/insight-1.png',
      author: 'Gloria Ondah',
      is_published: true
    },
    {
      slug: 'essential-contract-clauses-nigerian-employment',
      title: 'Essential Contract Clauses for Nigerian Employment Agreements',
      excerpt: 'What every Nigerian employer must include in employment contracts to comply with the Labour Act and protect the organisation from disputes.',
      content: `A well-drafted employment contract is one of the most important documents a Nigerian business can have. It protects both the employer and the employee, sets clear expectations, and reduces the risk of costly disputes. Many organisations use generic templates without considering the specific requirements of Nigerian law.

## The Legal Framework

Employment in Nigeria is primarily governed by the **Labour Act, Cap L1 LFN 2004**. For certain categories of employees, additional legislation applies, including the **Factories Act**, **Employees' Compensation Act**, and sector-specific regulations.

## Clauses Every Nigerian Employment Contract Must Have

**1. Identification of Parties**
Clearly identify the employer entity (including CAC registration number) and the employee, including their role, department, and reporting line.

**2. Commencement Date and Probationary Period**
State the start date and the length of any probationary period (typically 3-6 months), along with the terms applicable during probation.

**3. Job Description and Responsibilities**
Define the scope of work. A vague job description is the source of most performance management disputes.

**4. Remuneration Package**
Specify the gross salary, payment schedule, and clearly list all deductions (PAYE, pension) and benefits (health insurance, leave allowances, transport).

**5. Working Hours**
State daily and weekly working hours. Under the Labour Act, the maximum is 8 hours per day or 40 hours per week for most categories.

**6. Leave Entitlements**
Include annual leave (minimum 6 working days under the Labour Act, though best practice is 15-21 days), sick leave, maternity/paternity leave, and public holidays.

**7. Confidentiality and Non-Disclosure**
Protect sensitive business information with a clear confidentiality clause that survives the end of employment.

**8. Intellectual Property Assignment**
All work created by the employee in the course of employment should belong to the employer. This clause must be explicit.

**9. Termination Provisions**
Specify the notice period required by both parties, grounds for summary dismissal, and the exit process including handover obligations.

**10. Dispute Resolution**
Include a clause specifying how disputes will be resolved — ideally, internal escalation, then mediation, before litigation.

> "A contract is not just a formality. It is the rulebook for the entire employment relationship."

## Common Mistakes to Avoid

- Using a template from another jurisdiction without adapting to Nigerian law
- Failing to obtain a signed copy from the employee before they commence work
- Not updating contracts when roles or salaries change significantly
- Omitting a social media and communications policy by reference

Gloria Ondah & Associates drafts bespoke employment contracts and staff handbooks for organisations of all sizes. Schedule a consultation to ensure your workforce documentation is legally sound.`,
      category: 'Employment',
      cover_image: '/images/insight-2.png',
      author: 'Gloria Ondah',
      is_published: true
    },
    {
      slug: 'tax-compliance-checklist-nigerian-smes',
      title: 'Tax Compliance Checklist for SMEs in Nigeria',
      excerpt: 'A practical guide to the key tax obligations every small and medium-sized enterprise in Nigeria must meet to stay compliant and avoid penalties.',
      content: `Tax compliance is one of the most frequently overlooked legal obligations for small and medium-sized enterprises (SMEs) in Nigeria. Falling behind on filings does not just attract penalties — it can prevent your business from obtaining tax clearance certificates needed for contracts, tenders, and regulatory approvals.

## The Key Tax Obligations for Nigerian SMEs

### 1. Company Income Tax (CIT)
All companies registered in Nigeria must pay Company Income Tax on taxable profits.

- **Rate**: 30% for companies with gross turnover above ₦100 million. **Small companies** (turnover below ₦25 million) are exempt. **Medium companies** (₦25m-₦100m) pay 20%.
- **Filing deadline**: 6 months after the end of your accounting year

### 2. Pay-As-You-Earn (PAYE)
Every employer must deduct and remit employees' income tax monthly to the relevant State Internal Revenue Service.

- **Deadline**: 10th of the following month
- **Documentation**: Monthly schedules, annual reconciliation

### 3. Value Added Tax (VAT)
Businesses with annual turnover exceeding ₦25 million must register for VAT and collect 7.5% on applicable transactions.

- **Filing deadline**: 21st of the following month
- **Exemptions**: Basic food items, medical services, educational materials

### 4. Withholding Tax (WHT)
WHT must be deducted from payments for services, rents, dividends, and certain other transactions at the applicable rate (5-10%) and remitted to the FIRS or relevant state authority.

### 5. Pension Contributions
Under the **Contributory Pension Scheme**, businesses with 15 or more employees must enroll staff and remit contributions of at least 8% (employee) and 10% (employer) to a PFA monthly.

### 6. NSITF Contributions
The **Nigeria Social Insurance Trust Fund** contribution of 1% of employees' total monthly payroll must be remitted monthly.

### 7. ITF Levy
Companies with 5 or more employees or an annual payroll exceeding ₦500,000 must pay the **Industrial Training Fund** levy of 1% of annual payroll.

### 8. Annual Tax Clearance Certificate (TCC)
Businesses need a current TCC to bid for government contracts, obtain certain licenses, and complete some regulatory filings. Apply to your tax office before the certificate expires.

## Compliance Timeline at a Glance

- **Monthly**: PAYE, VAT, WHT, pension, NSITF
- **Annually**: CIT, ITF, TCC renewal, audited accounts

## The Cost of Non-Compliance

Late filing penalties, interest on outstanding liabilities, and potential criminal liability for directors can far exceed the cost of proper compliance. The Federal Inland Revenue Service (FIRS) has significantly intensified enforcement through its data-sharing arrangements with banks and CAC.

Gloria Ondah & Associates works with SMEs to establish tax compliance processes, review outstanding liabilities, and engage with tax authorities. Reach out today for a compliance review.`,
      category: 'Tax',
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
