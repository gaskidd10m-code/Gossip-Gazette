import { db } from './lib/db';

async function checkArticles() {
  const articles = await db.query('SELECT count(*) as count FROM articles WHERE status = \'published\'');
  console.log(`TOTAL PUBLISHED ARTICLES: ${articles[0].count}`);
}

checkArticles().catch(console.error);
