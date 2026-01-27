import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const slugify = (text: string) => {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};

const authors = [
    {
        name: 'Sarah Mitchell',
        bio: `Sarah Mitchell is the Editor-in-Chief of Gossip Gazette with over 10 years of digital journalism experience. She previously served as Senior Editor at TechDaily and Contributing Writer for Global Business Review. Sarah holds a Master's degree in Journalism from Columbia University and specializes in investigative reporting and editorial strategy.`,
        photoUrl: '/authors/sarah-mitchell.jpg',
        email: 'sarah@gossipgazettegh.com',
        twitterUrl: 'https://twitter.com/sarahmitchell',
        linkedinUrl: 'https://linkedin.com/in/sarahmitchell',
        expertise: ['Editorial Leadership', 'Investigative Journalism', 'Digital Media']
    },
    {
        name: 'Marcus Chen',
        bio: `Marcus Chen is the Technology Editor at Gossip Gazette, bringing 8 years of experience covering the tech industry. With a background in computer science, Marcus specializes in emerging technologies, artificial intelligence, and cybersecurity. He previously worked as a Technology Correspondent for The Digital Times and has contributed to major tech publications.`,
        photoUrl: '/authors/marcus-chen.jpg',
        email: 'marcus@gossipgazettegh.com',
        twitterUrl: 'https://twitter.com/marcuschen_tech',
        linkedinUrl: 'https://linkedin.com/in/marcuschen',
        expertise: ['Technology', 'Artificial Intelligence', 'Cybersecurity', 'Gadgets']
    },
    {
        name: 'Elena Rodriguez',
        bio: `Elena Rodriguez covers business trends, market analysis, and political developments for Gossip Gazette. She has 7 years of experience in financial journalism and holds an MBA from Harvard Business School. Her work has appeared in Financial Chronicle and Business Insider. Elena specializes in making complex economic topics accessible to general audiences.`,
        photoUrl: '/authors/elena-rodriguez.jpg',
        email: 'elena@gossipgazettegh.com',
        twitterUrl: 'https://twitter.com/elena_biz',
        linkedinUrl: 'https://linkedin.com/in/elenarodriguez',
        expertise: ['Business', 'Politics', 'Economics', 'Finance']
    },
    {
        name: 'James Brooks',
        bio: `James Brooks brings passion and analytical insight to sports and entertainment coverage at Gossip Gazette. With 6 years in sports journalism, he's covered everything from local leagues to international championships. James holds a BA in Sports Journalism from Northwestern University and has a keen eye for emerging entertainment trends.`,
        photoUrl: '/authors/james-brooks.jpg',
        email: 'james@gossipgazettegh.com',
        twitterUrl: 'https://twitter.com/jamesbrooks_sports',
        linkedinUrl: 'https://linkedin.com/in/jamesbrooks',
        expertise: ['Sports', 'Entertainment', 'Pop Culture', 'Celebrity News']
    }
];

async function createAuthors() {
    try {
        console.log('🚀 Starting author creation...\n');

        // Apply schema first (create authors table if it doesn't exist)
        console.log('📊 Applying schema updates...');
        const schemaResult = await pool.query(`
            CREATE TABLE IF NOT EXISTS authors (
                id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
                name TEXT NOT NULL,
                slug TEXT UNIQUE NOT NULL,
                bio TEXT,
                photo_url TEXT,
                email TEXT,
                twitter_url TEXT,
                linkedin_url TEXT,
                expertise TEXT[],
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Schema applied\n');

        // Insert authors
        for (const author of authors) {
            const slug = slugify(author.name);

            // Check if author already exists
            const existing = await pool.query('SELECT id FROM authors WHERE slug = $1', [slug]);

            if (existing.rows.length > 0) {
                console.log(`⏭️  Author already exists: ${author.name}`);
                continue;
            }

            await pool.query(
                `INSERT INTO authors (name, slug, bio, photo_url, email, twitter_url, linkedin_url, expertise)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    author.name,
                    slug,
                    author.bio,
                    author.photoUrl,
                    author.email,
                    author.twitterUrl,
                    author.linkedinUrl,
                    author.expertise
                ]
            );

            console.log(`✅ Created author: ${author.name} (${slug})`);
        }

        console.log('\n📝 Linking existing articles to authors...\n');

        // Map categories to authors
        const categoryAuthorMap = {
            'Technology': 'marcus-chen',
            'Business': 'elena-rodriguez',
            'Politics': 'elena-rodriguez',
            'Sports': 'james-brooks',
            'Entertainment': 'james-brooks',
            'World News': 'sarah-mitchell'
        };

        // Update articles to link to authors based on category
        for (const [category, authorSlug] of Object.entries(categoryAuthorMap)) {
            const result = await pool.query(
                `UPDATE articles 
                 SET author_slug = $1 
                 WHERE category_name = $2 AND (author_slug IS NULL OR author_slug = '')`,
                [authorSlug, category]
            );

            console.log(`✅ Linked ${result.rowCount} ${category} articles to ${authorSlug}`);
        }

        // Get author name mapping
        const authorMap = new Map(authors.map(a => [slugify(a.name), a.name]));

        // Update author_name field to match the linked author
        for (const [_, authorSlug] of Object.entries(categoryAuthorMap)) {
            const authorName = authorMap.get(authorSlug);
            if (authorName) {
                await pool.query(
                    `UPDATE articles 
                     SET author_name = $1 
                     WHERE author_slug = $2`,
                    [authorName, authorSlug]
                );
            }
        }

        console.log('\n✨ Author creation and linking complete!');
        console.log('\n📋 Summary:');
        const authorCount = await pool.query('SELECT COUNT(*) FROM authors');
        const linkedCount = await pool.query('SELECT COUNT(*) FROM articles WHERE author_slug IS NOT NULL');
        console.log(`   - Total authors: ${authorCount.rows[0].count}`);
        console.log(`   - Linked articles: ${linkedCount.rows[0].count}\n`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await pool.end();
    }
}

createAuthors();
