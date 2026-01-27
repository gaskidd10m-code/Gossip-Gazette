import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function auditCategories() {
    try {
        console.log('📊 Category Audit Report\n');
        console.log('='.repeat(60) + '\n');

        // Get category counts
        const categoryStats = await pool.query(`
            SELECT 
                category_name, 
                COUNT(*) as article_count,
                AVG(LENGTH(content)) as avg_content_length
            FROM articles 
            WHERE status = 'published'
            GROUP BY category_name 
            ORDER BY COUNT(*) DESC
        `);

        console.log('Category Distribution:\n');

        let totalArticles = 0;
        const thinCategories = [];
        const goodCategories = [];

        for (const row of categoryStats.rows) {
            const count = parseInt(row.article_count);
            const avgLength = Math.round(row.avg_content_length);
            totalArticles += count;

            const status = count < 10 ? '⚠️  THIN' : '✅ GOOD';

            console.log(`${status} ${row.category_name.padEnd(20)} ${count.toString().padStart(3)} articles   (avg: ${avgLength} chars)`);

            if (count < 10) {
                thinCategories.push({ name: row.category_name, count });
            } else {
                goodCategories.push({ name: row.category_name, count });
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log(`Total Articles: ${totalArticles}\n`);

        // Content length analysis
        console.log('Content Quality Analysis:\n');

        const contentStats = await pool.query(`
            SELECT 
                CASE 
                    WHEN LENGTH(content) < 600 THEN 'Under 600 (Thin)'
                    WHEN LENGTH(content) BETWEEN 600 AND 1000 THEN '600-1000 (Good)'
                    ELSE 'Over 1000 (Excellent)'
                END as content_category,
                COUNT(*) as count
            FROM articles 
            WHERE status = 'published'
            GROUP BY content_category
            ORDER BY content_category
        `);

        for (const row of contentStats.rows) {
            const icon = row.content_category.includes('Thin') ? '⚠️' :
                row.content_category.includes('Excellent') ? '🌟' : '✅';
            console.log(`${icon} ${row.content_category.padEnd(25)} ${row.count} articles`);
        }

        // Recommendations
        console.log('\n' + '='.repeat(60));
        console.log('📋 Recommendations:\n');

        if (thinCategories.length > 0) {
            console.log('⚠️  Categories needing more content:');
            thinCategories.forEach(cat => {
                console.log(`   - ${cat.name}: Add ${10 - cat.count} more articles`);
            });
            console.log('');
        }

        if (goodCategories.length > 0) {
            console.log('✅ Categories with sufficient content:');
            goodCategories.forEach(cat => {
                console.log(`   - ${cat.name}: ${cat.count} articles`);
            });
        }

        // Check for articles without authors
        const noAuthor = await pool.query(`
            SELECT COUNT(*) 
            FROM articles 
            WHERE author_slug IS NULL OR author_slug = ''
        `);

        if (parseInt(noAuthor.rows[0].count) > 0) {
            console.log(`\n⚠️  ${noAuthor.rows[0].count} articles don't have author attribution`);
            console.log('   Run: tsx scripts/create-authors.ts to fix this');
        }

        console.log('\n' + '='.repeat(60));

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await pool.end();
    }
}

auditCategories();
