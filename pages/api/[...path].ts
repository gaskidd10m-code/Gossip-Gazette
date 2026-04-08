import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from '@neondatabase/serverless';

// Types
interface Article { id: string; title: string; slug: string; excerpt: string; content: string; coverImage: string; authorId: string; authorName: string; categoryId: string; categoryName: string; tags: string[]; status: 'draft' | 'published' | 'archived'; publishedAt: string; views: number; source: string; }
interface Category { id: string; name: string; slug: string; }
interface Comment { id: string; articleId: string; userId: string; userName: string; content: string; createdAt: string; parentId?: string; status: 'pending' | 'approved' | 'rejected'; }
interface Author { id: string; name: string; slug: string; bio?: string; photoUrl?: string; email?: string; twitterUrl?: string; linkedinUrl?: string; expertise?: string[]; }
interface TransferNews { id: string; title: string; content: string; status: 'draft' | 'published'; createdAt: string; }

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function executeSql(query: string, params: any[] = []) {
    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw error;
    }
}

const mapArticle = (row: any): Article => ({ id: row.id, title: row.title, slug: row.slug, excerpt: row.excerpt, content: row.content, coverImage: row.cover_image, authorId: row.author_id, authorName: row.author_name, categoryId: row.category_id, categoryName: row.category_name, tags: row.tags || [], status: row.status as any, publishedAt: row.published_at, views: row.views || 0, source: row.source });
const mapCategory = (row: any): Category => ({ id: row.id, name: row.name, slug: row.slug });
const mapComment = (row: any): Comment => ({ id: row.id, articleId: row.article_id, userId: row.user_id, userName: row.user_name, content: row.content, createdAt: row.created_at, parentId: row.parent_id, status: row.status as any });
const mapAuthor = (row: any): Author => ({ id: row.id, name: row.name, slug: row.slug, bio: row.bio, photoUrl: row.photo_url, email: row.email, twitterUrl: row.twitter_url, linkedinUrl: row.linkedin_url, expertise: row.expertise || [] });

const db = {
    // Articles
    async getArticles(): Promise<Article[]> { return (await executeSql(`SELECT * FROM articles ORDER BY published_at DESC`)).map(mapArticle); },
    async getArticleBySlug(slug: string): Promise<Article | undefined> { const res = await executeSql(`SELECT * FROM articles WHERE slug = $1`, [slug]); return res.length ? mapArticle(res[0]) : undefined; },
    async getArticlesByCategory(categoryId: string): Promise<Article[]> { return (await executeSql(`SELECT * FROM articles WHERE category_id = $1 ORDER BY published_at DESC`, [categoryId])).map(mapArticle); },
    async searchArticles(query: string): Promise<Article[]> { return (await executeSql(`SELECT * FROM articles WHERE title ILIKE $1 OR excerpt ILIKE $1 OR content ILIKE $1`, [`%${query}%`])).map(mapArticle); },
    async createArticle(data: Omit<Article, 'id'>): Promise<Article> { const res = await executeSql(`INSERT INTO articles (title, slug, excerpt, content, cover_image, author_id, author_name, category_id, category_name, tags, status, published_at, views, source) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, [data.title, data.slug, data.excerpt, data.content, data.coverImage, data.authorId, data.authorName, data.categoryId, data.categoryName, data.tags, data.status, data.publishedAt, data.views, data.source]); return mapArticle(res[0]); },
    async updateArticle(id: string, data: Partial<Article>): Promise<void> { const fields: string[] = []; const values: any[] = []; let idx = 1; const map: Record<string, string> = { title: 'title', slug: 'slug', excerpt: 'excerpt', content: 'content', coverImage: 'cover_image', categoryId: 'category_id', categoryName: 'category_name', tags: 'tags', status: 'status', publishedAt: 'published_at', views: 'views' }; Object.entries(data).forEach(([key, val]) => { const dbKey = map[key]; if (dbKey) { fields.push(`${dbKey} = $${idx++}`); values.push(val); } }); if (fields.length === 0) return; values.push(id); await executeSql(`UPDATE articles SET ${fields.join(', ')} WHERE id = $${idx}`, values); },
    async deleteArticle(id: string): Promise<void> { await executeSql(`DELETE FROM articles WHERE id = $1`, [id]); },

    // Categories
    async getCategories(): Promise<Category[]> { return (await executeSql(`SELECT * FROM categories ORDER BY name ASC`)).map(mapCategory); },
    async createCategory(name: string): Promise<Category> { const slug = name.toLowerCase().replace(/ /g, '-'); const res = await executeSql(`INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *`, [name, slug]); return mapCategory(res[0]); },
    async deleteCategory(id: string): Promise<void> { await executeSql(`DELETE FROM categories WHERE id = $1`, [id]); },

    // Comments
    async getComments(articleId: string): Promise<Comment[]> { return (await executeSql(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [articleId])).map(mapComment); },
    async getAllComments(): Promise<Comment[]> { return (await executeSql(`SELECT * FROM comments ORDER BY created_at DESC`)).map(mapComment); },
    async addComment(data: Omit<Comment, 'id' | 'createdAt' | 'status'>): Promise<Comment> { const res = await executeSql(`INSERT INTO comments (article_id, user_id, user_name, content, status) VALUES ($1, $2, $3, $4, 'pending') RETURNING *`, [data.articleId, data.userId, data.userName, data.content]); return mapComment(res[0]); },
    async updateCommentStatus(id: string, status: 'approved' | 'rejected'): Promise<void> { await executeSql(`UPDATE comments SET status = $1 WHERE id = $2`, [status, id]); },
    async deleteComment(id: string): Promise<void> { await executeSql(`DELETE FROM comments WHERE id = $1`, [id]); },

    // Settings
    async getSetting(key: string): Promise<string> { const res = await executeSql(`SELECT value FROM settings WHERE key = $1`, [key]); return res.length ? res[0].value : ''; },
    async updateSetting(key: string, value: string): Promise<void> { await executeSql(`INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`, [key, value]); },

    // Authors
    async getAuthors(): Promise<Author[]> { return (await executeSql(`SELECT * FROM authors ORDER BY name ASC`)).map(mapAuthor); },
    async getAuthorBySlug(slug: string): Promise<Author | undefined> { const res = await executeSql(`SELECT * FROM authors WHERE slug = $1`, [slug]); return res.length ? mapAuthor(res[0]) : undefined; },
    async getArticlesByAuthor(authorSlug: string): Promise<Article[]> { return (await executeSql(`SELECT * FROM articles WHERE author_slug = $1 ORDER BY published_at DESC`, [authorSlug])).map(mapArticle); },

    // Tags & Archive
    async getArticlesByTag(tag: string): Promise<Article[]> { return (await executeSql(`SELECT * FROM articles WHERE $1 = ANY(tags) ORDER BY published_at DESC`, [tag])).map(mapArticle); },
    async getArticlesByDate(year: number, month?: number): Promise<Article[]> { let query = `SELECT * FROM articles WHERE EXTRACT(YEAR FROM published_at) = $1`; const params: any[] = [year]; if (month) { query += ` AND EXTRACT(MONTH FROM published_at) = $2`; params.push(month); } query += ` ORDER BY published_at DESC`; return (await executeSql(query, params)).map(mapArticle); },
    async getTags(): Promise<string[]> { const res = await executeSql(`SELECT DISTINCT unnest(tags) as tag FROM articles WHERE status = 'published' ORDER BY tag ASC`); return res.map(r => r.tag); },
    async getArchiveDates(): Promise<{ year: number, month: number, count: number }[]> { const res = await executeSql(`SELECT EXTRACT(YEAR FROM published_at) as year, EXTRACT(MONTH FROM published_at) as month, COUNT(*) as count FROM articles WHERE status = 'published' GROUP BY year, month ORDER BY year DESC, month DESC`); return res.map(r => ({ year: parseInt(r.year), month: parseInt(r.month), count: parseInt(r.count) })); },

    // Transfer News
    async getTransferNews(): Promise<TransferNews[]> { const result = await executeSql(`SELECT * FROM transfer_news ORDER BY created_at DESC`); return result.map((r: any) => ({ id: r.id, title: r.title, content: r.content, status: r.status as 'draft' | 'published', createdAt: r.created_at })); },
    async getPublishedTransferNews(): Promise<TransferNews[]> { const result = await executeSql(`SELECT * FROM transfer_news WHERE status = 'published' ORDER BY created_at DESC`); return result.map((r: any) => ({ id: r.id, title: r.title, content: r.content, status: r.status as 'draft' | 'published', createdAt: r.created_at })); },
    async createTransferNews(data: Omit<TransferNews, 'id' | 'createdAt'>): Promise<TransferNews> { const result = await executeSql(`INSERT INTO transfer_news (title, content, status) VALUES ($1, $2, $3) RETURNING *`, [data.title, data.content, data.status || 'draft']); const r = result[0]; return { id: r.id, title: r.title, content: r.content, status: r.status, createdAt: r.created_at }; },
    async updateTransferNews(id: string, data: Partial<Omit<TransferNews, 'id' | 'createdAt'>>): Promise<void> { const fields: string[] = []; const values: any[] = []; let idx = 1; if (data.title !== undefined) { fields.push(`title = $${idx++}`); values.push(data.title); } if (data.content !== undefined) { fields.push(`content = $${idx++}`); values.push(data.content); } if (data.status !== undefined) { fields.push(`status = $${idx++}`); values.push(data.status); } if (fields.length === 0) return; values.push(id); await executeSql(`UPDATE transfer_news SET ${fields.join(', ')} WHERE id = $${idx}`, values); },
    async deleteTransferNews(id: string): Promise<void> { await executeSql(`DELETE FROM transfer_news WHERE id = $1`, [id]); }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    const { query, method } = req;
    const p = query.path;
    const pathArray = Array.isArray(p) ? p : (p ? [p] : []);
    const path = '/' + pathArray.join('/');

    try {
        if (path.startsWith('/articles')) {
            if (method === 'GET') {
                if (query.category) return res.json(await db.getArticlesByCategory(query.category as string));
                if (query.q) return res.json(await db.searchArticles(query.q as string));
                if (query.tag) return res.json(await db.getArticlesByTag(query.tag as string));
                if (query.year) {
                    const year = parseInt(query.year as string);
                    const month = query.month ? parseInt(query.month as string) : undefined;
                    return res.json(await db.getArticlesByDate(year, month));
                }
                if (pathArray.length > 1) {
                    const article = await db.getArticleBySlug(pathArray[1]);
                    return article ? res.json(article) : res.status(404).json({ error: 'Not found' });
                }
                return res.json(await db.getArticles());
            }
            if (method === 'POST') return res.json(await db.createArticle(req.body));
            if (method === 'PUT' && pathArray.length > 1) { await db.updateArticle(pathArray[1], req.body); return res.json({ success: true }); }
            if (method === 'DELETE' && pathArray.length > 1) { await db.deleteArticle(pathArray[1]); return res.json({ success: true }); }
        } else if (path.startsWith('/categories')) {
            if (method === 'GET') return res.json(await db.getCategories());
            if (method === 'POST') return res.json(await db.createCategory(req.body.name));
            if (method === 'DELETE' && pathArray.length > 1) { await db.deleteCategory(pathArray[1]); return res.json({ success: true }); }
        } else if (path.startsWith('/authors')) {
            if (method === 'GET') {
                if (pathArray.length === 1) return res.json(await db.getAuthors());
                if (pathArray.length === 2) {
                    const author = await db.getAuthorBySlug(pathArray[1]);
                    return author ? res.json(author) : res.status(404).json({ error: 'Author not found' });
                }
                if (pathArray.length === 3 && pathArray[2] === 'articles') return res.json(await db.getArticlesByAuthor(pathArray[1]));
            }
        } else if (path.startsWith('/comments')) {
            if (method === 'GET') {
                if (query.articleId) return res.json(await db.getComments(query.articleId as string));
                return res.json(await db.getAllComments());
            }
            if (method === 'POST') return res.json(await db.addComment(req.body));
            if (method === 'PUT' && pathArray.length === 3 && pathArray[2] === 'status') { await db.updateCommentStatus(pathArray[1], req.body.status); return res.json({ success: true }); }
            if (method === 'DELETE' && pathArray.length > 1) { await db.deleteComment(pathArray[1]); return res.json({ success: true }); }
        } else if (path.startsWith('/settings')) {
            if (method === 'GET' && pathArray.length > 1) return res.json({ value: await db.getSetting(pathArray[1]) });
            if (method === 'PUT' && pathArray.length > 1) { await db.updateSetting(pathArray[1], req.body.value); return res.json({ success: true }); }
        } else if (path.startsWith('/tags')) {
            if (method === 'GET') return res.json(await db.getTags());
        } else if (path.startsWith('/archive')) {
            if (method === 'GET' && pathArray[1] === 'dates') return res.json(await db.getArchiveDates());
        } else if (path.startsWith('/transfer-news')) {
            if (method === 'GET') {
                if (pathArray[1] === 'published') return res.json(await db.getPublishedTransferNews());
                return res.json(await db.getTransferNews());
            }
            if (method === 'POST') return res.json(await db.createTransferNews(req.body));
            if (method === 'PUT' && pathArray.length > 1) { await db.updateTransferNews(pathArray[1], req.body); return res.json({ success: true }); }
            if (method === 'DELETE' && pathArray.length > 1) { await db.deleteTransferNews(pathArray[1]); return res.json({ success: true }); }
        }
        res.status(404).json({ error: 'Not found' });
    } catch (err) {
        console.error('API Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
