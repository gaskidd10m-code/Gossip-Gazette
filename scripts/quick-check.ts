import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function quickCheck() {
    // Get categories
    const cats = await pool.query('SELECT id, name FROM categories ORDER BY name');
    console.log('\nCATEGORIES:');
    cats.rows.forEach(c => console.log(`  ${c.name}: ${c.id}`));

    // Get article counts by category_id
    console.log('\nARTICLES PER CATEGORY:');
    for (const cat of cats.rows) {
        const result = await pool.query('SELECT COUNT(*) as count FROM articles WHERE category_id = $1', [cat.id]);
        console.log(`  ${cat.name} (${cat.id}): ${result.rows[0].count} articles`);
    }

    // Show sample articles
    console.log('\nSAMPLE ARTICLES:');
    const articles = await pool.query('SELECT title, category_id, category_name FROM articles LIMIT 5');
    articles.rows.forEach(a => console.log(`  "${a.title}" -> ID: ${a.category_id}, Name: ${a.category_name}`));

    await pool.end();
}

quickCheck();
