import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function fixCategories() {
    console.log('Starting category fix...');

    // 1. Fetch all categories
    const categories = await neonService.getCategories();
    console.log(`Found ${categories.length} categories.`);
    console.log(JSON.stringify(categories, null, 2));

    // Create a map of category Name -> ID
    const categoryMap = new Map<string, string>();
    categories.forEach(c => categoryMap.set(c.name, c.id));

    // 2. Fetch all articles
    const articles = await neonService.getArticles();
    console.log(`Found ${articles.length} articles.`);

    let updatedCount = 0;

    for (const article of articles) {
        console.log(`Checking article: ${article.title.substring(0, 20)}... | CategoryId: "${article.categoryId}" | CategoryName: "${article.categoryName}"`);

        // Use a more inclusive check for invalid IDs. 
        // If it's not a UUID (36 chars), it's likely wrong.
        if (!article.categoryId || article.categoryId.length < 30) {
            console.log(`  -> INVALID ID DETECTED`);

            // Try to find the correct ID based on the categoryName
            const correctId = categoryMap.get(article.categoryName);

            if (correctId) {
                console.log(`  -> FOUND CORRECT ID: ${correctId} for category "${article.categoryName}"`);

                // Perform the update
                // We need to implement a specific update method or expose direct SQL if `updateArticle` doesn't handle this well.
                // Assuming neonService.updateArticle works for this.
                try {
                    await neonService.updateArticle(article.id, { categoryId: correctId });
                    console.log(`  -> UPDATE SUCCESSFUL`);
                    updatedCount++;
                } catch (e) {
                    console.error(`  -> UPDATE FAILED:`, e);
                }

            } else {
                console.warn(`  -> ⚠️ Could not find category ID for name: "${article.categoryName}". Available categories: ${Array.from(categoryMap.keys()).join(', ')}`);
            }
        }
    }

    console.log(`\nFixed ${updatedCount} articles.`);
}

fixCategories().catch(console.error);
