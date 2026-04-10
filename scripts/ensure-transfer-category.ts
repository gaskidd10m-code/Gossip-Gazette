
import { db } from './lib/db';

async function run() {
  const name = 'Transfer News';
  const slug = 'transfer-news';
  try {
    await db.query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING',
      [name, slug]
    );
    console.log('Category Transfer News ensured in database.');
  } catch (err) {
    console.error('Failed to create category:', err);
  } finally {
    process.exit(0);
  }
}

run();
