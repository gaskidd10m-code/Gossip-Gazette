import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function checkData() {
    console.log('--- Categories ---');
    const categories = await neonService.getCategories();
    console.log(JSON.stringify(categories, null, 2));

    console.log('\n--- Articles (First 20) ---');
    const articles = await neonService.getArticles();
    // Show only title, categoryName, categoryId
    const simplifiedArticles = articles.slice(0, 20).map(a => ({
        slug: a.slug,
        title: a.title,
        categoryName: a.categoryName,
        categoryId: a.categoryId
    }));
    console.log(JSON.stringify(simplifiedArticles, null, 2));
}

checkData().catch(console.error);
