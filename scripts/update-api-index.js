const fs = require('fs');

let content = fs.readFileSync('api/index.ts', 'utf8');

// Replace Interface
content = content.replace(/interface TransferNews \{[\s\S]*?\}/g, `interface SportsNews {
    id: string;
    title: string;
    content: string;
    category: 'Transfer News' | 'Sports Today';
    status: 'draft' | 'published';
    createdAt: string;
}`);

// Replace db methods
content = content.replace(/\/\/ Transfer News[\s\S]*?async deleteTransferNews/g, `// Sports News
    async getSportsNews(): Promise<SportsNews[]> {
        const result = await executeSql(\`SELECT * FROM sports_news ORDER BY created_at DESC\`);
        return result.map((r: any) => ({
            id: r.id,
            title: r.title,
            content: r.content,
            category: r.category as 'Transfer News' | 'Sports Today',
            status: r.status as 'draft' | 'published',
            createdAt: r.created_at
        }));
    },

    async getPublishedSportsNews(): Promise<SportsNews[]> {
        const result = await executeSql(\`SELECT * FROM sports_news WHERE status = 'published' ORDER BY created_at DESC\`);
        return result.map((r: any) => ({
            id: r.id,
            title: r.title,
            content: r.content,
            category: r.category as 'Transfer News' | 'Sports Today',
            status: r.status as 'draft' | 'published',
            createdAt: r.created_at
        }));
    },

    async createSportsNews(data: Omit<SportsNews, 'id' | 'createdAt'>): Promise<SportsNews> {
        const result = await executeSql(
            \`INSERT INTO sports_news (title, content, category, status) VALUES ($1, $2, $3, $4) RETURNING *\`,
            [data.title, data.content, data.category || 'Sports Today', data.status || 'draft']
        );
        const r = result[0];
        return { id: r.id, title: r.title, content: r.content, category: r.category, status: r.status, createdAt: r.created_at };
    },

    async updateSportsNews(id: string, data: Partial<Omit<SportsNews, 'id' | 'createdAt'>>): Promise<void> {
        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;
        if (data.title !== undefined) { fields.push(\`title = $\${idx++}\`); values.push(data.title); }
        if (data.content !== undefined) { fields.push(\`content = $\${idx++}\`); values.push(data.content); }
        if (data.category !== undefined) { fields.push(\`category = $\${idx++}\`); values.push(data.category); }
        if (data.status !== undefined) { fields.push(\`status = $\${idx++}\`); values.push(data.status); }
        if (fields.length === 0) return;
        values.push(id);
        await executeSql(\`UPDATE sports_news SET \${fields.join(', ')} WHERE id = $\${idx}\`, values);
    },

    async deleteSportsNews`);

// Replace route check
content = content.replace(/\} else if \(path\.startsWith\('\/transfer-news'\)\) \{/g, `} else if (path.startsWith('/sports-news')) {`);
content = content.replace(/return await handleTransferNews\(req, res, path\);/g, `return await handleSportsNews(req, res, path);`);

// Replace handler
content = content.replace(/\/\/ --- TRANSFER NEWS HANDLERS ---[\s\S]*?async function handleTransferNews\(req: VercelRequest, res: VercelResponse, path: string\) \{[\s\S]*?\/\/ GET \/transfer-news/g, `// --- SPORTS NEWS HANDLERS ---
async function handleSportsNews(req: VercelRequest, res: VercelResponse, path: string) {
    const { method } = req;

    // GET /sports-news`);

// Generic sub
content = content.replace(/transfer-news/g, 'sports-news');
content = content.replace(/TransferNews/g, 'SportsNews');
content = content.replace(/transferNews/g, 'sportsNews');
content = content.replace(/Transfer News/g, 'Sports News');

// SITEMAP UPDATE
content = content.replace(/<loc>\$\{domain\}\/<\/loc>/g, `<loc>\${domain}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>\${domain}/sports</loc>
        <changefreq>always</changefreq>
        <priority>0.9</priority>`);

fs.writeFileSync('api/index.ts', content);
console.log('Done replacement for api/index.ts.');
