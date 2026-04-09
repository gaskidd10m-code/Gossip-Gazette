import { Pool } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function executeSql(query: string, params: any[] = []) {
  const result = await pool.query(query, params);
  return result.rows;
}

// ── Mappers ────────────────────────────────────────────────────
const mapArticle = (row: any) => ({
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
  source: row.source,
});

const mapCategory = (row: any) => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
});

const mapComment = (row: any) => ({
  id: row.id,
  articleId: row.article_id,
  userId: row.user_id,
  userName: row.user_name,
  content: row.content,
  createdAt: row.created_at,
  parentId: row.parent_id,
  status: row.status as 'pending' | 'approved' | 'rejected',
});

const mapAuthor = (row: any) => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  bio: row.bio,
  photoUrl: row.photo_url,
  email: row.email,
  twitterUrl: row.twitter_url,
  linkedinUrl: row.linkedin_url,
  expertise: row.expertise || [],
});

const mapSportsNews = (row: any) => ({
  id: row.id,
  title: row.title,
  content: row.content,
  category: row.category as 'Transfer News' | 'Sports Today',
  status: row.status as 'draft' | 'published',
  createdAt: row.created_at,
});

// ── Service ────────────────────────────────────────────────────
export const neonService = {
  // Articles
  getArticles: async () => {
    const rows = await executeSql(`SELECT * FROM articles ORDER BY published_at DESC`);
    return rows.map(mapArticle);
  },
  getArticleBySlug: async (slug: string) => {
    const rows = await executeSql(`SELECT * FROM articles WHERE slug = $1`, [slug]);
    return rows.length ? mapArticle(rows[0]) : undefined;
  },
  getArticlesByCategory: async (categoryId: string) => {
    const rows = await executeSql(
      `SELECT * FROM articles WHERE category_id = $1 ORDER BY published_at DESC`,
      [categoryId]
    );
    return rows.map(mapArticle);
  },
  searchArticles: async (query: string) => {
    const rows = await executeSql(
      `SELECT * FROM articles WHERE title ILIKE $1 OR excerpt ILIKE $1 OR content ILIKE $1`,
      [`%${query}%`]
    );
    return rows.map(mapArticle);
  },
  createArticle: async (data: any) => {
    const rows = await executeSql(
      `INSERT INTO articles (title, slug, excerpt, content, cover_image, author_id, author_name, category_id, category_name, tags, status, published_at, views, source)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [
        data.title, data.slug, data.excerpt, data.content, data.coverImage,
        data.authorId, data.authorName, data.categoryId, data.categoryName,
        data.tags, data.status, data.publishedAt, data.views || 0, data.source,
      ]
    );
    return mapArticle(rows[0]);
  },
  updateArticle: async (id: string, data: any) => {
    const fieldMap: Record<string, string> = {
      title: 'title', slug: 'slug', excerpt: 'excerpt', content: 'content',
      coverImage: 'cover_image', categoryId: 'category_id', categoryName: 'category_name',
      tags: 'tags', status: 'status', publishedAt: 'published_at', views: 'views', source: 'source',
    };
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
    Object.entries(data).forEach(([key, val]) => {
      const col = fieldMap[key];
      if (col) { fields.push(`${col} = $${idx++}`); values.push(val); }
    });
    if (!fields.length) return;
    values.push(id);
    await executeSql(`UPDATE articles SET ${fields.join(', ')} WHERE id = $${idx}`, values);
  },
  deleteArticle: async (id: string) => {
    await executeSql(`DELETE FROM articles WHERE id = $1`, [id]);
  },

  // Categories
  getCategories: async () => {
    const rows = await executeSql(`SELECT * FROM categories ORDER BY name ASC`);
    return rows.map(mapCategory);
  },
  createCategory: async (name: string) => {
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const rows = await executeSql(
      `INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *`,
      [name, slug]
    );
    return mapCategory(rows[0]);
  },
  deleteCategory: async (id: string) => {
    await executeSql(`DELETE FROM categories WHERE id = $1`, [id]);
  },

  // Comments
  getComments: async (articleId: string) => {
    const rows = await executeSql(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [articleId]
    );
    return rows.map(mapComment);
  },
  getAllComments: async () => {
    const rows = await executeSql(`SELECT * FROM comments ORDER BY created_at DESC`);
    return rows.map(mapComment);
  },
  addComment: async (data: any) => {
    const rows = await executeSql(
      `INSERT INTO comments (article_id, user_id, user_name, content, parent_id, status) VALUES ($1,$2,$3,$4,$5,'pending') RETURNING *`,
      [data.articleId, data.userId, data.userName, data.content, data.parentId || null]
    );
    return mapComment(rows[0]);
  },
  updateCommentStatus: async (id: string, status: 'approved' | 'rejected') => {
    await executeSql(`UPDATE comments SET status = $1 WHERE id = $2`, [status, id]);
  },
  deleteComment: async (id: string) => {
    await executeSql(`DELETE FROM comments WHERE id = $1`, [id]);
  },

  // Settings
  getSetting: async (key: string) => {
    const rows = await executeSql(`SELECT value FROM settings WHERE key = $1`, [key]);
    return rows.length ? rows[0].value : '';
  },
  updateSetting: async (key: string, value: string) => {
    await executeSql(
      `INSERT INTO settings (key, value) VALUES ($1,$2) ON CONFLICT (key) DO UPDATE SET value = $2`,
      [key, value]
    );
  },

  // Authors
  getAuthors: async () => {
    const rows = await executeSql(`SELECT * FROM authors ORDER BY name ASC`);
    return rows.map(mapAuthor);
  },
  getAuthorBySlug: async (slug: string) => {
    const rows = await executeSql(`SELECT * FROM authors WHERE slug = $1`, [slug]);
    return rows.length ? mapAuthor(rows[0]) : undefined;
  },
  getArticlesByAuthor: async (authorSlug: string) => {
    const rows = await executeSql(
      `SELECT * FROM articles WHERE author_slug = $1 ORDER BY published_at DESC`,
      [authorSlug]
    );
    return rows.map(mapArticle);
  },

  // Tags & Archive
  getTags: async () => {
    const rows = await executeSql(
      `SELECT DISTINCT unnest(tags) as tag FROM articles WHERE status = 'published' ORDER BY tag ASC`
    );
    return rows.map((r: any) => r.tag);
  },
  getArticlesByTag: async (tag: string) => {
    const rows = await executeSql(
      `SELECT * FROM articles WHERE $1 = ANY(tags) ORDER BY published_at DESC`,
      [tag]
    );
    return rows.map(mapArticle);
  },
  getArchiveDates: async () => {
    const rows = await executeSql(`
      SELECT EXTRACT(YEAR FROM published_at) as year,
             EXTRACT(MONTH FROM published_at) as month,
             COUNT(*) as count
      FROM articles WHERE status = 'published'
      GROUP BY year, month ORDER BY year DESC, month DESC
    `);
    return rows.map((r: any) => ({
      year: parseInt(r.year), month: parseInt(r.month), count: parseInt(r.count),
    }));
  },
  getArticlesByDate: async (year: number, month?: number) => {
    let query = `SELECT * FROM articles WHERE EXTRACT(YEAR FROM published_at) = $1`;
    const params: any[] = [year];
    if (month) { query += ` AND EXTRACT(MONTH FROM published_at) = $2`; params.push(month); }
    query += ` ORDER BY published_at DESC`;
    const rows = await executeSql(query, params);
    return rows.map(mapArticle);
  },

  // Sports News
  getSportsNews: async () => {
    const rows = await executeSql(`SELECT * FROM sports_news ORDER BY created_at DESC`);
    return rows.map(mapSportsNews);
  },
  getPublishedSportsNews: async () => {
    const rows = await executeSql(
      `SELECT * FROM sports_news WHERE status = 'published' ORDER BY created_at DESC`
    );
    return rows.map(mapSportsNews);
  },
  createSportsNews: async (data: { title: string; content: string; category?: string; status?: string }) => {
    const rows = await executeSql(
      `INSERT INTO sports_news (title, content, category, status) VALUES ($1,$2,$3,$4) RETURNING *`,
      [data.title, data.content, data.category || 'Sports Today', data.status || 'draft']
    );
    return mapSportsNews(rows[0]);
  },
  updateSportsNews: async (id: string, data: Partial<{ title: string; content: string; category: string; status: string }>) => {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
    if (data.title !== undefined) { fields.push(`title = $${idx++}`); values.push(data.title); }
    if (data.content !== undefined) { fields.push(`content = $${idx++}`); values.push(data.content); }
    if (data.category !== undefined) { fields.push(`category = $${idx++}`); values.push(data.category); }
    if (data.status !== undefined) { fields.push(`status = $${idx++}`); values.push(data.status); }
    if (!fields.length) return;
    values.push(id);
    await executeSql(`UPDATE sports_news SET ${fields.join(', ')} WHERE id = $${idx}`, values);
  },
  deleteSportsNews: async (id: string) => {
    await executeSql(`DELETE FROM sports_news WHERE id = $1`, [id]);
  },
};
