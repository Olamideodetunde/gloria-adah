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
  `);
  console.log('[DB] Tables ready');
}
