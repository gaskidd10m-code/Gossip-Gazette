import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neonService } from '../services/neon-service';

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
    const path = url?.replace('/api', '') || '/';

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
            const articles = await neonService.getArticlesByCategory(query.category as string);
            return res.json(articles);
        }
        if (query.q) {
            const articles = await neonService.searchArticles(query.q as string);
            return res.json(articles);
        }
        const articles = await neonService.getArticles();
        return res.json(articles);
    }

    // GET /articles/:slug
    const slugMatch = path.match(/^\/articles\/([^\/]+)$/);
    if (method === 'GET' && slugMatch) {
        const article = await neonService.getArticleBySlug(slugMatch[1]);
        if (!article) return res.status(404).json({ error: 'Not found' });
        return res.json(article);
    }

    // POST /articles
    if (method === 'POST' && path === '/articles') {
        const article = await neonService.createArticle(req.body);
        return res.json(article);
    }

    // PUT /articles/:id
    const updateMatch = path.match(/^\/articles\/([^\/]+)$/);
    if (method === 'PUT' && updateMatch) {
        await neonService.updateArticle(updateMatch[1], req.body);
        return res.json({ success: true });
    }

    // DELETE /articles/:id
    const deleteMatch = path.match(/^\/articles\/([^\/]+)$/);
    if (method === 'DELETE' && deleteMatch) {
        await neonService.deleteArticle(deleteMatch[1]);
        return res.json({ success: true });
    }

    res.status(404).json({ error: 'Not found' });
}

// --- CATEGORIES HANDLERS ---
async function handleCategories(req: VercelRequest, res: VercelResponse, path: string) {
    const { method } = req;

    // GET /categories
    if (method === 'GET' && path === '/categories') {
        const categories = await neonService.getCategories();
        return res.json(categories);
    }

    // POST /categories
    if (method === 'POST' && path === '/categories') {
        const category = await neonService.createCategory(req.body.name);
        return res.json(category);
    }

    // DELETE /categories/:id
    const deleteMatch = path.match(/^\/categories\/([^\/]+)$/);
    if (method === 'DELETE' && deleteMatch) {
        await neonService.deleteCategory(deleteMatch[1]);
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
            const comments = await neonService.getComments(query.articleId as string);
            return res.json(comments);
        }
        const comments = await neonService.getAllComments();
        return res.json(comments);
    }

    // POST /comments
    if (method === 'POST' && path === '/comments') {
        const comment = await neonService.addComment(req.body);
        return res.json(comment);
    }

    // PUT /comments/:id/status
    const statusMatch = path.match(/^\/comments\/([^\/]+)\/status$/);
    if (method === 'PUT' && statusMatch) {
        await neonService.updateCommentStatus(statusMatch[1], req.body.status);
        return res.json({ success: true });
    }

    // DELETE /comments/:id
    const deleteMatch = path.match(/^\/comments\/([^\/]+)$/);
    if (method === 'DELETE' && deleteMatch) {
        await neonService.deleteComment(deleteMatch[1]);
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
        const value = await neonService.getSetting(getMatch[1]);
        return res.json({ value });
    }

    // PUT /settings/:key
    const putMatch = path.match(/^\/settings\/([^\/]+)$/);
    if (method === 'PUT' && putMatch) {
        await neonService.updateSetting(putMatch[1], req.body.value);
        return res.json({ success: true });
    }

    res.status(404).json({ error: 'Not found' });
}
