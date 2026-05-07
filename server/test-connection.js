import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

console.log('Testing database connection...');
console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 30) + '...');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

try {
  const result = await pool.query('SELECT NOW()');
  console.log('✅ Connection successful!');
  console.log('Server time:', result.rows[0].now);
  await pool.end();
  process.exit(0);
} catch (error) {
  console.error('❌ Connection failed:', error.message);
  console.error('Full error:', error);
  await pool.end();
  process.exit(1);
}
