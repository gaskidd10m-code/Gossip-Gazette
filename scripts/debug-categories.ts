import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function debugCategories() {
    try {
        console.log('=== DEBUGGING CATEGORY FILTERING ===\n');

        // Get all categories
        const categories = await neonService.getCategories();
        console.log('Categories in database:');
        categories.forEach(cat => {
            console.log(`  ID: ${cat.id} | Name: ${cat.name} | Slug: ${cat.slug}`);
        });

        console.log('\n=== ARTICLES BY CATEGORY ===\n');

        for (const cat of categories) {
            console.log(`\nCategory: ${cat.name} (ID: ${cat.id})`);
            const articles = await neonService.getArticlesByCategory(cat.id);
            console.log(`  Articles found: ${articles.length}`);

            if (articles.length > 0) {
                articles.forEach(a => {
                    console.log(`    - "${a.title}"`);
                    console.log(`      Category ID in article: ${a.categoryId}`);
                    console.log(`      Category Name in article: ${a.categoryName}`);
                });
            } else {
                console.log(`    ⚠️  NO ARTICLES FOUND!`);

                // Check if there are articles with this category name
                const allArticles = await neonService.getArticles();
                const matchingByName = allArticles.filter(a => a.categoryName === cat.name);
                if (matchingByName.length > 0) {
                    console.log(`    ❌ MISMATCH! Found ${matchingByName.length} articles with categoryName="${cat.name}" but different categoryId:`);
                    matchingByName.forEach(a => {
                        console.log(`       - "${a.title}" has categoryId="${a.categoryId}" (should be "${cat.id}")`);
                    });
                }
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

debugCategories();
