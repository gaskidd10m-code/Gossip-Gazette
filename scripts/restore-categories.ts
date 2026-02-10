import 'dotenv/config';
import { neonService } from '../services/neon-service';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Keywords to help categorize articles
const categoryKeywords = {
    'Politics': ['election', 'president', 'congress', 'senate', 'government', 'policy', 'vote', 'political', 'democrat', 'republican', 'campaign', 'legislation', 'parliament', 'minister'],
    'Business': ['business', 'company', 'corporate', 'stock', 'market', 'economy', 'financial', 'investment', 'investor', 'startup', 'ceo', 'revenue', 'profit', 'trade', 'industry'],
    'Technology': ['tech', 'technology', 'ai', 'artificial intelligence', 'software', 'hardware', 'app', 'digital', 'cyber', 'data', 'computer', 'internet', 'smartphone', 'iphone', 'android', 'google', 'apple', 'microsoft', 'meta', 'facebook'],
    'Entertainment': ['entertainment', 'movie', 'film', 'music', 'celebrity', 'actor', 'actress', 'singer', 'concert', 'album', 'show', 'series', 'netflix', 'streaming', 'hollywood', 'grammy', 'oscar']
};

function categorizeArticle(title: string, content: string): string {
    const text = (title + ' ' + content).toLowerCase();
    const scores: { [key: string]: number } = {
        'Politics': 0,
        'Business': 0,
        'Technology': 0,
        'Entertainment': 0
    };

    // Count keyword matches for each category
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        for (const keyword of keywords) {
            const regex = new RegExp(keyword, 'gi');
            const matches = text.match(regex);
            if (matches) {
                scores[category] += matches.length;
            }
        }
    }

    // Find category with highest score
    let bestCategory = 'World News';
    let maxScore = 0;

    for (const [category, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            bestCategory = category;
        }
    }

    // If no clear match, keep as World News
    return maxScore > 0 ? bestCategory : 'World News';
}

async function restoreCategories() {
    console.log('=== RESTORING ORIGINAL CATEGORIES ===\n');

    try {
        // 1. Create the original categories if they don't exist
        const categoriesToCreate = ['Politics', 'Business', 'Technology', 'Entertainment'];
        const createdCategories: { [key: string]: any } = {};

        console.log('Creating categories...');
        const existingCategories = await neonService.getCategories();

        for (const categoryName of categoriesToCreate) {
            const existing = existingCategories.find(c => c.name === categoryName);
            if (existing) {
                console.log(`  ✓ ${categoryName} already exists (ID: ${existing.id})`);
                createdCategories[categoryName] = existing;
            } else {
                console.log(`  Creating ${categoryName}...`);
                const newCategory = await neonService.createCategory(categoryName);
                console.log(`  ✓ Created ${categoryName} (ID: ${newCategory.id})`);
                createdCategories[categoryName] = newCategory;
            }
        }

        // Also keep track of World News
        const worldNews = existingCategories.find(c => c.name === 'World News');
        if (worldNews) {
            createdCategories['World News'] = worldNews;
        }

        // 2. Get all articles from World News
        console.log('\nAnalyzing World News articles...');
        const worldNewsArticles = worldNews ? await neonService.getArticlesByCategory(worldNews.id) : [];
        console.log(`Found ${worldNewsArticles.length} articles in World News`);

        // 3. Categorize and move articles
        console.log('\nRecategorizing articles...');
        const categoryCounts: { [key: string]: number } = {
            'Politics': 0,
            'Business': 0,
            'Technology': 0,
            'Entertainment': 0,
            'World News': 0
        };

        for (const article of worldNewsArticles) {
            const newCategory = categorizeArticle(article.title, article.content || '');
            categoryCounts[newCategory]++;

            if (newCategory !== 'World News' && createdCategories[newCategory]) {
                console.log(`  Moving "${article.title}" → ${newCategory}`);
                await pool.query(
                    `UPDATE articles SET category_id = $1, category_name = $2 WHERE id = $3`,
                    [createdCategories[newCategory].id, newCategory, article.id]
                );
            } else {
                console.log(`  Keeping "${article.title}" in World News`);
            }
        }

        // 4. Display summary
        console.log('\n=== SUMMARY ===');
        console.log('Articles per category:');
        for (const [category, count] of Object.entries(categoryCounts)) {
            console.log(`  ${category}: ${count} articles`);
        }

        console.log('\n=== RESTORATION COMPLETE ===');

    } catch (error) {
        console.error('Restoration failed:', error);
    } finally {
        await pool.end();
    }
}

restoreCategories();
