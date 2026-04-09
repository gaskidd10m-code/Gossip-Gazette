import { Pool } from '@neondatabase/serverless';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  try {
    await pool.query('ALTER TABLE sports_news ADD COLUMN IF NOT EXISTS image_url TEXT');
    console.log('✅ Column image_url added to sports_news');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await pool.end();
  }
}

migrate();
