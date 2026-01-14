import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from '@neondatabase/serverless';

// Version: 2.0.0 - Consolidated serverless function (no external imports)

// Types
interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    authorId: string;
    authorName: string;
    categoryId: string;
    categoryName: string;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
    publishedAt: string;
    views: number;
    source: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Comment {
    id: string;
    articleId: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
    parentId?: string;
    status: 'pending' | 'approved' | 'rejected';
}

// Database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Helper to execute SQL queries
async function executeSql(query: string, params: any[] = []) {
    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw error;
    }
}

// Mappers
const mapArticle = (row: any): Article => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    authorId: row.author_id,
    authorName: row.author_name,
    categoryId: row.category_id,
    categoryName: row.category_name,
    tags: row.tags || [],
    status: row.status as 'draft' | 'published' | 'archived',
    publishedAt: row.published_at,
    views: row.views || 0,
    source: row.source
});

const mapCategory = (row: any): Category => ({
    id: row.id,
    name: row.name,
    slug: row.slug
});

const mapComment = (row: any): Comment => ({
    id: row.id,
    articleId: row.article_id,
    userId: row.user_id,
    userName: row.user_name,
    content: row.content,
    createdAt: row.created_at,
    parentId: row.parent_id,
    status: row.status as 'pending' | 'approved' | 'rejected'
});

// Database service functions
const db = {
    // Articles
    async getArticles(): Promise<Article[]> {
        const result = await executeSql(`SELECT * FROM articles ORDER BY published_at DESC`);
        return result.map(mapArticle);
    },

    async getArticleBySlug(slug: string): Promise<Article | undefined> {
        const result = await executeSql(`SELECT * FROM articles WHERE slug = $1`, [slug]);
        return result.length ? mapArticle(result[0]) : undefined;
    },

    async getArticlesByCategory(categoryId: string): Promise<Article[]> {
        const result = await executeSql(`SELECT * FROM articles WHERE category_id = $1 ORDER BY published_at DESC`, [categoryId]);
        return result.map(mapArticle);
    },

    async searchArticles(query: string): Promise<Article[]> {
        const result = await executeSql(
            `SELECT * FROM articles WHERE title ILIKE $1 OR excerpt ILIKE $1 OR content ILIKE $1`,
            [`%${query}%`]
        );
        return result.map(mapArticle);
    },

    async createArticle(data: Omit<Article, 'id'>): Promise<Article> {
        const result = await executeSql(
            `INSERT INTO articles (
                title, slug, excerpt, content, cover_image, 
                author_id, author_name, category_id, category_name, 
                tags, status, published_at, views, source
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
            [
                data.title, data.slug, data.excerpt, data.content, data.coverImage,
                data.authorId, data.authorName, data.categoryId, data.categoryName,
                data.tags, data.status, data.publishedAt, data.views, data.source
            ]
        );
        return mapArticle(result[0]);
    },

    async updateArticle(id: string, data: Partial<Article>): Promise<void> {
        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        const map: Record<string, string> = {
            title: 'title', slug: 'slug', excerpt: 'excerpt', content: 'content',
            coverImage: 'cover_image', categoryId: 'category_id', categoryName: 'category_name',
            tags: 'tags', status: 'status', publishedAt: 'published_at', views: 'views'
        };

        Object.entries(data).forEach(([key, val]) => {
            const dbKey = map[key];
            if (dbKey) {
                fields.push(`${dbKey} = $${idx++}`);
                values.push(val);
            }
        });

        if (fields.length === 0) return;

        values.push(id);
        await executeSql(`UPDATE articles SET ${fields.join(', ')} WHERE id = $${idx}`, values);
    },

    async deleteArticle(id: string): Promise<void> {
        await executeSql(`DELETE FROM articles WHERE id = $1`, [id]);
    },

    // Categories
    async getCategories(): Promise<Category[]> {
        const result = await executeSql(`SELECT * FROM categories`);
        return result.map(mapCategory);
    },

    async createCategory(name: string): Promise<Category> {
        const slug = name.toLowerCase().replace(/ /g, '-');
        const result = await executeSql(`INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *`, [name, slug]);
        return mapCategory(result[0]);
    },

    async deleteCategory(id: string): Promise<void> {
        await executeSql(`DELETE FROM categories WHERE id = $1`, [id]);
    },

    // Comments
    async getComments(articleId: string): Promise<Comment[]> {
        const result = await executeSql(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [articleId]);
        return result.map(mapComment);
    },

    async getAllComments(): Promise<Comment[]> {
        const result = await executeSql(`SELECT * FROM comments ORDER BY created_at DESC`);
        return result.map(mapComment);
    },

    async addComment(data: Omit<Comment, 'id' | 'createdAt' | 'status'>): Promise<Comment> {
        const result = await executeSql(
            `INSERT INTO comments (article_id, user_id, user_name, content, status) VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
            [data.articleId, data.userId, data.userName, data.content]
        );
        return mapComment(result[0]);
    },

    async updateCommentStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
        await executeSql(`UPDATE comments SET status = $1 WHERE id = $2`, [status, id]);
    },

    async deleteComment(id: string): Promise<void> {
        await executeSql(`DELETE FROM comments WHERE id = $1`, [id]);
    },

    // Settings
    async getSetting(key: string): Promise<string> {
        const result = await executeSql(`SELECT value FROM settings WHERE key = $1`, [key]);
        return result.length ? result[0].value : '';
    },

    async updateSetting(key: string, value: string): Promise<void> {
        await executeSql(
            `INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
            [key, value]
        );
    }
};

// Main handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { url } = req;
    let path = url?.replace('/api', '') || '/';

    // Strip query parameters from path for routing matching
    // e.g. "/articles?category=123" -> "/articles"
    const queryIndex = path.indexOf('?');
    if (queryIndex !== -1) {
        path = path.substring(0, queryIndex);
    }

    try {
        // Route handling
        if (path.startsWith('/articles')) {
            return await handleArticles(req, res, path);
        } else if (path.startsWith('/categories')) {
            return await handleCategories(req, res, path);
        } else if (path.startsWith('/comments')) {
            return await handleComments(req, res, path);
        } else if (path.startsWith('/settings')) {
            return await handleSettings(req, res, path);
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch (err) {
        console.error('API Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// --- ARTICLES HANDLERS ---
async function handleArticles(req: VercelRequest, res: VercelResponse, path: string) {
    const { method, query } = req;

    // GET /articles or /articles?category=X or /articles?q=X
    if (method === 'GET' && path === '/articles') {
        if (query.category) {
            const articles = await db.getArticlesByCategory(query.category as string);
            return res.json(articles);
        }
        if (query.q) {
            const articles = await db.searchArticles(query.q as string);
            return res.json(articles);
        }
        const articles = await db.getArticles();
        return res.json(articles);
    }

    // GET /articles/:slug
    const slugMatch = path.match(/^\/articles\/([^\/]+)$/);
    if (method === 'GET' && slugMatch) {
        const article = await db.getArticleBySlug(slugMatch[1]);
        if (!article) return res.status(404).json({ error: 'Not found' });
        return res.json(article);
    }

    // POST /articles
    if (method === 'POST' && path === '/articles') {
        const article = await db.createArticle(req.body);
        return res.json(article);
    }

    // PUT /articles/:id
    const updateMatch = path.match(/^\/articles\/([^\/]+)$/);
    if (method === 'PUT' && updateMatch) {
        await db.updateArticle(updateMatch[1], req.body);
        return res.json({ success: true });
    }

    // DELETE /articles/:id
    const deleteMatch = path.match(/^\/articles\/([^\/]+)$/);
    if (method === 'DELETE' && deleteMatch) {
        await db.deleteArticle(deleteMatch[1]);
        return res.json({ success: true });
    }

    res.status(404).json({ error: 'Not found' });
}

// --- CATEGORIES HANDLERS ---
async function handleCategories(req: VercelRequest, res: VercelResponse, path: string) {
    const { method } = req;

    // GET /categories
    if (method === 'GET' && path === '/categories') {
        const categories = await db.getCategories();
        return res.json(categories);
    }

    // POST /categories
    if (method === 'POST' && path === '/categories') {
        const category = await db.createCategory(req.body.name);
        return res.json(category);
    }

    // DELETE /categories/:id
    const deleteMatch = path.match(/^\/categories\/([^\/]+)$/);
    if (method === 'DELETE' && deleteMatch) {
        await db.deleteCategory(deleteMatch[1]);
        return res.json({ success: true });
    }

    res.status(404).json({ error: 'Not found' });
}

// --- COMMENTS HANDLERS ---
async function handleComments(req: VercelRequest, res: VercelResponse, path: string) {
    const { method, query } = req;

    // GET /comments or /comments?articleId=X
    if (method === 'GET' && path === '/comments') {
        if (query.articleId) {
            const comments = await db.getComments(query.articleId as string);
            return res.json(comments);
        }
        const comments = await db.getAllComments();
        return res.json(comments);
    }

    // POST /comments
    if (method === 'POST' && path === '/comments') {
        const comment = await db.addComment(req.body);
        return res.json(comment);
    }

    // PUT /comments/:id/status
    const statusMatch = path.match(/^\/comments\/([^\/]+)\/status$/);
    if (method === 'PUT' && statusMatch) {
        await db.updateCommentStatus(statusMatch[1], req.body.status);
        return res.json({ success: true });
    }

    // DELETE /comments/:id
    const deleteMatch = path.match(/^\/comments\/([^\/]+)$/);
    if (method === 'DELETE' && deleteMatch) {
        await db.deleteComment(deleteMatch[1]);
        return res.json({ success: true });
    }

    res.status(404).json({ error: 'Not found' });
}

// --- SETTINGS HANDLERS ---
async function handleSettings(req: VercelRequest, res: VercelResponse, path: string) {
    const { method } = req;

    // GET /settings/:key
    const getMatch = path.match(/^\/settings\/([^\/]+)$/);
    if (method === 'GET' && getMatch) {
        const value = await db.getSetting(getMatch[1]);
        return res.json({ value });
    }

    // PUT /settings/:key
    const putMatch = path.match(/^\/settings\/([^\/]+)$/);
    if (method === 'PUT' && putMatch) {
        await db.updateSetting(putMatch[1], req.body.value);
        return res.json({ success: true });
    }

    res.status(404).json({ error: 'Not found' });
}
