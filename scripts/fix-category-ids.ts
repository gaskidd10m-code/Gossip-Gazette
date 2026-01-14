import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function fixCategoryIds() {
    try {
        console.log('Fixing article category IDs...\n');

        // Get all categories
        const categoriesResult = await pool.query('SELECT id, name FROM categories');
        const categories = categoriesResult.rows;

        console.log('Categories found:');
        categories.forEach(c => console.log(`  - ${c.name}: ${c.id}`));

        console.log('\nUpdating articles...');

        let totalUpdated = 0;

        for (const category of categories) {
            // Update articles where category_name matches but category_id might be wrong
            const result = await pool.query(
                `UPDATE articles 
                 SET category_id = $1 
                 WHERE category_name = $2 AND category_id != $1
                 RETURNING title`,
                [category.id, category.name]
            );

            if (result.rows.length > 0) {
                console.log(`\n${category.name}:`);
                result.rows.forEach(r => console.log(`  ✅ Updated: ${r.title}`));
                totalUpdated += result.rows.length;
            }
        }

        console.log(`\n✅ Total articles updated: ${totalUpdated}`);

        // Verify the fix
        console.log('\nVerifying fix...');
        for (const category of categories) {
            const count = await pool.query(
                'SELECT COUNT(*) as count FROM articles WHERE category_id = $1',
                [category.id]
            );
            console.log(`  ${category.name}: ${count.rows[0].count} articles`);
        }

        await pool.end();

    } catch (error) {
        console.error('Error:', error);
        await pool.end();
    }
}

fixCategoryIds();
