import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testPosts() {
  try {
    console.log('Testing database connection...\n');
    
    const result = await pool.query(`
      SELECT id, slug, title, is_published, published_at 
      FROM blog_posts 
      ORDER BY created_at DESC
    `);
    
    console.log(`Total posts in database: ${result.rowCount}\n`);
    
    result.rows.forEach(post => {
      console.log(`ID: ${post.id}`);
      console.log(`Title: ${post.title}`);
      console.log(`Slug: ${post.slug}`);
      console.log(`Published: ${post.is_published}`);
      console.log(`Published At: ${post.published_at}`);
      console.log('---');
    });
    
    console.log('\nTesting API query (published posts only)...\n');
    
    const apiResult = await pool.query(`
      SELECT id, slug, title, excerpt, category, cover_image, author, published_at, created_at
      FROM blog_posts 
      WHERE is_published = true
      ORDER BY published_at DESC
    `);
    
    console.log(`Published posts: ${apiResult.rowCount}\n`);
    
    apiResult.rows.forEach(post => {
      console.log(`- ${post.title}`);
    });
    
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

testPosts();
