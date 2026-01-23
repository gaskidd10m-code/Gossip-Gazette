import 'dotenv/config';
import { neonService } from '../services/neon-service';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function consolidateCategories() {
    console.log('=== CONSOLIDATING CATEGORIES ===\n');

    const sourceCategories = ['Politics', 'Business', 'Technology', 'Entertainment'];
    const targetCategoryName = 'World News';

    try {
        // 1. Get or Create Target Category
        console.log(`Checking for target category: "${targetCategoryName}"...`);
        const allCategories = await neonService.getCategories();
        let targetCategory = allCategories.find(c => c.name === targetCategoryName);

        if (!targetCategory) {
            console.log(`  Creating new category: "${targetCategoryName}"...`);
            targetCategory = await neonService.createCategory(targetCategoryName);
            console.log(`  Created! ID: ${targetCategory.id}`);
        } else {
            console.log(`  Found existing category. ID: ${targetCategory.id}`);
        }

        // 2. Find Source Categories
        const categoriesToMerge = allCategories.filter(c => sourceCategories.includes(c.name));

        if (categoriesToMerge.length === 0) {
            console.log('No source categories found to merge. Exiting.');
            return;
        }

        console.log(`Found ${categoriesToMerge.length} categories to merge: ${categoriesToMerge.map(c => c.name).join(', ')}`);

        // 3. Move Articles
        for (const oldCat of categoriesToMerge) {
            console.log(`\nProcessing "${oldCat.name}" (ID: ${oldCat.id})...`);
            const articles = await neonService.getArticlesByCategory(oldCat.id);
            console.log(`  Found ${articles.length} articles.`);

            for (const article of articles) {
                console.log(`  Moving article: "${article.title}"...`);
                // Direct SQL update to be efficient and ensure we update both ID and Name denormalized fields
                await pool.query(
                    `UPDATE articles SET category_id = $1, category_name = $2 WHERE id = $3`,
                    [targetCategory.id, targetCategory.name, article.id]
                );
            }
            console.log(`  All articles moved.`);
        }

        // 4. Delete Old Categories
        console.log('\nDeleting old categories...');
        for (const oldCat of categoriesToMerge) {
            console.log(`  Deleting "${oldCat.name}"...`);
            await neonService.deleteCategory(oldCat.id);
        }

        console.log('\n=== CONSOLIDATION COMPLETE ===');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await pool.end();
    }
}

consolidateCategories();
