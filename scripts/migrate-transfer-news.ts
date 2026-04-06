import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error("Missing DATABASE_URL");
    process.exit(1);
  }
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log("Creating transfer_news table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transfer_news (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT DEFAULT 'draft',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Success! transfer_news table created.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await pool.end();
  }
}

migrate();
