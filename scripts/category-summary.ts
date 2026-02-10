import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function showCategorySummary() {
    try {
        const categories = await neonService.getCategories();

        console.log('\n=== CATEGORY SUMMARY ===\n');

        for (const cat of categories) {
            const articles = await neonService.getArticlesByCategory(cat.id);
            console.log(`${cat.name}: ${articles.length} articles`);
        }

        const allArticles = await neonService.getArticles();
        console.log(`\nTotal: ${allArticles.length} articles`);

    } catch (error) {
        console.error('Error:', error);
    }
}

showCategorySummary();
