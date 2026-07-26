import 'dotenv/config';
import { pool } from './db.js';

async function seedDatabase() {
  try {
    console.log('[SEED] Connecting to database...');
    
    // Create tables
    console.log('[SEED] Creating tables...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ref_code VARCHAR(50) UNIQUE NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        service_price INT NOT NULL,
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ref_code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        subject VARCHAR(300) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(200) UNIQUE NOT NULL,
        title VARCHAR(300) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'Insights',
        cover_image VARCHAR(500),
        author VARCHAR(200) DEFAULT 'Gloria Ondah',
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('[SEED] ✓ Tables created');

    // Seed blog posts
    console.log('[SEED] Seeding blog posts...');
    const posts = [
      {
        slug: 'cac-annual-returns-guide-2026',
        title: 'Filing Annual Returns with the CAC: A 2026 Guide',
        excerpt: 'Every business registered in Nigeria must file annual returns with the CAC. Failure to do so attracts penalties and potential striking off the register.',
        content: 'Every business registered in Nigeria under the Corporate Affairs Commission (CAC) has a statutory obligation to file annual returns...',
        category: 'Corporate Law',
        cover_image: '/images/insight-1.png',
        author: 'Gloria Ondah',
        is_published: true
      },
      {
        slug: 'trademark-protection-nigerian-startups',
        title: 'Trademark Protection for Nigerian Startups',
        excerpt: 'Why securing your brand identity early is crucial for tech startups and how to navigate the Nigerian trademark registry.',
        content: 'For startups, the brand is everything. Your name, logo, and tagline are assets that can appreciate in value...',
        category: 'Intellectual Property',
        cover_image: '/images/insight-2.png',
        author: 'Gloria Ondah',
        is_published: true
      },
      {
        slug: 'nuprc-compliance-indigenous-operators',
        title: 'Navigating NUPRC Compliance for Indigenous Operators',
        excerpt: 'A breakdown of recent regulatory changes affecting local content requirements in the Nigerian oil and gas sector.',
        content: 'The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) was established by the Petroleum Industry Act...',
        category: 'Energy Law',
        cover_image: '/images/insight-3.png',
        author: 'Gloria Ondah',
        is_published: true
      },
      {
        slug: 'ndpr-compliance-nigerian-businesses',
        title: 'Understanding NDPR Compliance for Nigerian Businesses',
        excerpt: 'The Nigeria Data Protection Regulation (NDPR) has significant obligations for businesses.',
        content: 'The Nigeria Data Protection Regulation (NDPR), issued by NITDA in 2019, is Nigeria\'s primary data protection framework...',
        category: 'Compliance',
        cover_image: '/images/insight-1.png',
        author: 'Gloria Ondah',
        is_published: true
      },
      {
        slug: 'essential-contract-clauses-nigerian-employment',
        title: 'Essential Contract Clauses for Nigerian Employment Agreements',
        excerpt: 'What every Nigerian employer must include in employment contracts to comply with the Labour Act.',
        content: 'A well-drafted employment contract is one of the most important documents a Nigerian business can have...',
        category: 'Employment',
        cover_image: '/images/insight-2.png',
        author: 'Gloria Ondah',
        is_published: true
      },
      {
        slug: 'tax-compliance-checklist-nigerian-smes',
        title: 'Tax Compliance Checklist for SMEs in Nigeria',
        excerpt: 'A practical guide to the key tax obligations every small and medium-sized enterprise in Nigeria must meet.',
        content: 'Tax compliance is one of the most frequently overlooked legal obligations for SMEs in Nigeria...',
        category: 'Tax',
        cover_image: '/images/insight-3.png',
        author: 'Gloria Ondah',
        is_published: true
      }
    ];

    for (const post of posts) {
      const result = await pool.query(
        `INSERT IGNORE INTO blog_posts (slug, title, excerpt, content, category, cover_image, author, is_published, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [post.slug, post.title, post.excerpt, post.content, post.category, post.cover_image, post.author, post.is_published]
      );
      if (result.rowCount > 0) {
        console.log(`[SEED] ✓ Created post: ${post.title}`);
      } else {
        console.log(`[SEED] - Post already exists: ${post.title}`);
      }
    }

    console.log('[SEED] ✓ Blog posts seeded successfully');
    console.log('[SEED] ✓ Database setup complete!');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('[SEED] Error:', error.message);
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

seedDatabase();
