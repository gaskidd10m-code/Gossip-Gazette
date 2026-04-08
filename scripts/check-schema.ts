import { Pool } from '@neondatabase/serverless';
import 'dotenv/config';

async function run() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const res = await pool.query('SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = $1', ['categories']);
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
