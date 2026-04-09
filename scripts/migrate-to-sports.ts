import { Pool } from '@neondatabase/serverless';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  try {
    console.log('Renaming table...');
    await pool.query(`ALTER TABLE transfer_news RENAME TO sports_news`);
    console.log('Adding category column...');
    await pool.query(`ALTER TABLE sports_news ADD COLUMN category TEXT DEFAULT 'Transfer News'`);
    console.log('Migration complete.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    pool.end();
  }
}

migrate();
