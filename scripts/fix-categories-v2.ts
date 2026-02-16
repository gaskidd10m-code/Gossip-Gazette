import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function fix() {
    try {
        console.log('Fetching categories...');
        const cats = await neonService.getCategories();
        console.log('Categories:', cats.map(c => `${c.name}: ${c.id}`));

        console.log('Fetching articles...');
        const articles = await neonService.getArticles();

        // Filter for articles with short/invalid category IDs
        const badArticles = articles.filter(a => !a.categoryId || a.categoryId.length < 10);
        console.log(`Found ${badArticles.length} articles with invalid category IDs.`);

        for (const a of badArticles) {
            const cat = cats.find(c => c.name === a.categoryName);
            if (cat) {
                console.log(`Updating "${a.title}" (ID: ${a.id})`);
                console.log(`  Current CategoryID: "${a.categoryId}"`);
                console.log(`  New CategoryID:     "${cat.id}"`);

                await neonService.updateArticle(a.id, { categoryId: cat.id });
                console.log(`  ✓ Update successful`);
            } else {
                console.error(`  ✗ No category found for article "${a.title}" with categoryName "${a.categoryName}"`);
            }
        }
        console.log('Done.');
    } catch (e) {
        console.error('Fatal error:', e);
    }
}

fix();
