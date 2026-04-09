import { Pool } from '@neondatabase/serverless';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const res = await pool.query('SELECT name FROM categories');
  console.log('Categories:', res.rows.map(r => r.name));
  pool.end();
}

check();
