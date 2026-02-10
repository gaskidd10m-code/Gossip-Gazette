import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function listAllCategories() {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY name');
        console.log('\n=== ALL CATEGORIES ===\n');
        result.rows.forEach(cat => {
            console.log(`${cat.name} (${cat.slug}) - ID: ${cat.id}`);
        });
        console.log(`\nTotal: ${result.rows.length} categories`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await pool.end();
    }
}

listAllCategories();
