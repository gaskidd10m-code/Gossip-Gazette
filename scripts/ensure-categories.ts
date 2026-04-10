import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.DATABASE_URL || 'postgres://neondb_owner:npg_1fXtzH6WkivQ@ep-withered-rain-a2e6b22c.eu-central-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  await sql`
    INSERT INTO categories (name, slug)
    VALUES ('Transfer News', 'transfer-news')
    ON CONFLICT (slug) DO NOTHING;
  `;
  await sql`
    INSERT INTO categories (name, slug)
    VALUES ('Sports News', 'sports-news')
    ON CONFLICT (slug) DO NOTHING;
  `;
  console.log('Categories Transfer News and Sports News ensured!');
}

main().catch(console.error);
