import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function finalConsolidation() {
    console.log('=== FINAL CATEGORY CONSOLIDATION ===\n');

    try {
        // Get all categories
        const categoriesResult = await pool.query('SELECT * FROM categories ORDER BY name');
        const allCategories = categoriesResult.rows;

        console.log('Current categories:');
        allCategories.forEach(cat => {
            console.log(`  - ${cat.name} (${cat.slug})`);
        });

        // Categories to keep
        const keepCategories = ['Sports', 'Technology', 'World News'];

        // Find or create World News
        let worldNews = allCategories.find(c => c.name === 'World News');
        if (!worldNews) {
            console.log('\nCreating World News category...');
            const result = await pool.query(
                `INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *`,
                ['World News', 'world-news']
            );
            worldNews = result.rows[0];
            console.log(`Created World News (ID: ${worldNews.id})`);
        }

        // Find categories to merge
        const categoriesToMerge = allCategories.filter(c =>
            !keepCategories.includes(c.name) && c.name !== 'World News'
        );

        if (categoriesToMerge.length > 0) {
            console.log(`\nMerging ${categoriesToMerge.length} categories into World News:`);
            categoriesToMerge.forEach(c => console.log(`  - ${c.name}`));

            // Move all articles from these categories to World News
            for (const cat of categoriesToMerge) {
                const articlesResult = await pool.query(
                    'SELECT * FROM articles WHERE category_id = $1',
                    [cat.id]
                );

                console.log(`\nMoving ${articlesResult.rows.length} articles from "${cat.name}"...`);

                if (articlesResult.rows.length > 0) {
                    await pool.query(
                        `UPDATE articles SET category_id = $1, category_name = $2 WHERE category_id = $3`,
                        [worldNews.id, worldNews.name, cat.id]
                    );
                }

                // Delete the category
                await pool.query('DELETE FROM categories WHERE id = $1', [cat.id]);
                console.log(`Deleted "${cat.name}"`);
            }
        }

        // Final summary
        console.log('\n=== FINAL CATEGORIES ===');
        const finalResult = await pool.query('SELECT * FROM categories ORDER BY name');
        for (const cat of finalResult.rows) {
            const articleCount = await pool.query(
                'SELECT COUNT(*) FROM articles WHERE category_id = $1',
                [cat.id]
            );
            console.log(`${cat.name}: ${articleCount.rows[0].count} articles`);
        }

        console.log('\n=== CONSOLIDATION COMPLETE ===');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await pool.end();
    }
}

finalConsolidation();
