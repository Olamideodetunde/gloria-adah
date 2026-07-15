import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString?.includes('neon.tech') ? { rejectUnauthorized: false } : false
});

async function run() {
  try {
    await pool.query(`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS paystack_reference VARCHAR(200);`);
    console.log('Successfully added paystack_reference column');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

run();
