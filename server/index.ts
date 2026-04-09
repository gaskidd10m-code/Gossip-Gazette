import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { neonService } from '../services/neon-service';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ── ARTICLES ──────────────────────────────────────────────────
app.get('/api/articles', async (req, res) => {
    try {
        if (req.query.category) {
            return res.json(await neonService.getArticlesByCategory(req.query.category as string));
        }
        if (req.query.q) {
            return res.json(await neonService.searchArticles(req.query.q as string));
        }
        if (req.query.tag) {
            return res.json(await neonService.getArticlesByTag(req.query.tag as string));
        }
        if (req.query.year) {
            const year = parseInt(req.query.year as string);
            const month = req.query.month ? parseInt(req.query.month as string) : undefined;
            return res.json(await neonService.getArticlesByDate(year, month));
        }
        res.json(await neonService.getArticles());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

app.get('/api/articles/:slug', async (req, res) => {
    try {
        const article = await neonService.getArticleBySlug(req.params.slug);
        if (!article) return res.status(404).json({ error: 'Not found' });
        res.json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch article' });
    }
});

app.post('/api/articles', async (req, res) => {
    try {
        res.json(await neonService.createArticle(req.body));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create article' });
    }
});

app.put('/api/articles/:id', async (req, res) => {
    try {
        await neonService.updateArticle(req.params.id, req.body);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update article' });
    }
});

app.delete('/api/articles/:id', async (req, res) => {
    try {
        await neonService.deleteArticle(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete article' });
    }
});

// ── CATEGORIES ────────────────────────────────────────────────
app.get('/api/categories', async (_req, res) => {
    try {
        res.json(await neonService.getCategories());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const category = await neonService.createCategory(req.body.name);
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

app.delete('/api/categories/:id', async (req, res) => {
    try {
        await neonService.deleteCategory(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

// ── COMMENTS ─────────────────────────────────────────────────
app.get('/api/comments', async (req, res) => {
    try {
        if (req.query.articleId) {
            return res.json(await neonService.getComments(req.query.articleId as string));
        }
        res.json(await neonService.getAllComments());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

app.post('/api/comments', async (req, res) => {
    try {
        res.json(await neonService.addComment(req.body));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

app.put('/api/comments/:id/status', async (req, res) => {
    try {
        await neonService.updateCommentStatus(req.params.id, req.body.status);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update comment status' });
    }
});

app.delete('/api/comments/:id', async (req, res) => {
    try {
        await neonService.deleteComment(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

// ── SETTINGS ──────────────────────────────────────────────────
app.get('/api/settings/:key', async (req, res) => {
    try {
        const value = await neonService.getSetting(req.params.key);
        res.json({ value });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch setting' });
    }
});

app.put('/api/settings/:key', async (req, res) => {
    try {
        await neonService.updateSetting(req.params.key, req.body.value);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update setting' });
    }
});

// ── AUTHORS ───────────────────────────────────────────────────
app.get('/api/authors', async (_req, res) => {
    try {
        res.json(await neonService.getAuthors());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch authors' });
    }
});

app.get('/api/authors/:slug/articles', async (req, res) => {
    try {
        res.json(await neonService.getArticlesByAuthor(req.params.slug));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch author articles' });
    }
});

app.get('/api/authors/:slug', async (req, res) => {
    try {
        const author = await neonService.getAuthorBySlug(req.params.slug);
        if (!author) return res.status(404).json({ error: 'Author not found' });
        res.json(author);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch author' });
    }
});

// ── TAGS ──────────────────────────────────────────────────────
app.get('/api/tags', async (_req, res) => {
    try {
        res.json(await neonService.getTags());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
});

// ── ARCHIVE ───────────────────────────────────────────────────
app.get('/api/archive/dates', async (_req, res) => {
    try {
        res.json(await neonService.getArchiveDates());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch archive dates' });
    }
});

// ── SPORTS NEWS ───────────────────────────────────────────────
app.get('/api/sports-news', async (_req, res) => {
    try {
        res.json(await neonService.getSportsNews());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch sports news' });
    }
});

app.get('/api/sports-news/published', async (_req, res) => {
    try {
        res.json(await neonService.getPublishedSportsNews());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch published sports news' });
    }
});

app.post('/api/sports-news', async (req, res) => {
    try {
        res.json(await neonService.createSportsNews(req.body));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create sports news' });
    }
});

app.put('/api/sports-news/:id', async (req, res) => {
    try {
        await neonService.updateSportsNews(req.params.id, req.body);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update sports news' });
    }
});

app.delete('/api/sports-news/:id', async (req, res) => {
    try {
        await neonService.deleteSportsNews(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete sports news' });
    }
});

// ── START ─────────────────────────────────────────────────────
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ API Server running on http://localhost:${PORT}`);
});
