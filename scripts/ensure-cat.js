
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const name = 'Transfer News';
  const slug = 'transfer-news';
  try {
    const res = await pool.query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING RETURNING id',
      [name, slug]
    );
    if (res.rows[0]) {
      console.log('Category Transfer News created with ID:', res.rows[0].id);
    } else {
      console.log('Category Transfer News already exists.');
    }
  } catch (err) {
    console.error('Failed to create category:', err);
  } finally {
    await pool.end();
  }
}

run();
