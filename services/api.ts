import { Article, ArticleFormData, Author, Category, Comment } from '../types';
const LS_KEYS = {
  AUTH: 'gg_auth'
};

export const api = {
  // GET /api/articles
  getArticles: async (): Promise<Article[]> => {
    const res = await fetch('/api/articles');
    if (!res.ok) return [];
    return res.json();
  },

  // GET /api/articles/:slug
  getArticleBySlug: async (slug: string): Promise<Article | undefined> => {
    const res = await fetch(`/api/articles/${slug}`);
    if (!res.ok) return undefined;
    return res.json();
  },

  // GET /api/articles?category=:id
  getArticlesByCategory: async (categoryId: string): Promise<Article[]> => {
    const res = await fetch(`/api/articles?category=${categoryId}`);
    if (!res.ok) return [];
    return res.json();
  },

  // GET /api/search?q=:query
  searchArticles: async (query: string): Promise<Article[]> => {
    if (!query) return [];
    const res = await fetch(`/api/articles?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    return res.json();
  },

  // GET /api/categories
  getCategories: async (): Promise<Category[]> => {
    const res = await fetch('/api/categories');
    if (!res.ok) return [];
    return res.json();
  },

  // --- AUTHORS ---
  // GET /api/authors/:slug
  getAuthor: async (slug: string): Promise<Author> => {
    const res = await fetch(`/api/authors/${slug}`);
    if (!res.ok) throw new Error('Author not found');
    return res.json();
  },

  // GET /api/authors/:slug/articles
  getAuthorArticles: async (slug: string): Promise<Article[]> => {
    const res = await fetch(`/api/authors/${slug}/articles`);
    if (!res.ok) return [];
    return res.json();
  },

  // GET /api/authors
  getAllAuthors: async (): Promise<Author[]> => {
    const res = await fetch('/api/authors');
    if (!res.ok) return [];
    return res.json();
  },

  // --- TAGS (New) ---
  getTags: async (): Promise<string[]> => {
    const res = await fetch('/api/tags');
    if (!res.ok) return [];
    return res.json();
  },

  getArticlesByTag: async (tag: string): Promise<Article[]> => {
    const res = await fetch(`/api/articles?tag=${encodeURIComponent(tag)}`);
    if (!res.ok) return [];
    return res.json();
  },

  // --- ARCHIVE (New) ---
  getArchiveDates: async (): Promise<{ year: number, month: number, count: number }[]> => {
    const res = await fetch('/api/archive/dates');
    if (!res.ok) return [];
    return res.json();
  },

  getArticlesByDate: async (year: number, month?: number): Promise<Article[]> => {
    let url = `/api/articles?year=${year}`;
    if (month) url += `&month=${month}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return res.json();
  },

  // POST /api/categories (Admin)
  createCategory: async (name: string): Promise<Category> => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    return res.json();
  },

  // DELETE /api/categories/:id (Admin)
  deleteCategory: async (id: string): Promise<void> => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
  },

  // POST /api/articles (Admin)
  createArticle: async (data: ArticleFormData): Promise<Article> => {
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // PUT /api/articles/:id (Admin)
  updateArticle: async (id: string, data: Partial<ArticleFormData>): Promise<Article> => {
    const res = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return { ...data, id } as Article;
  },

  // DELETE /api/articles/:id (Admin)
  deleteArticle: async (id: string): Promise<void> => {
    await fetch(`/api/articles/${id}`, { method: 'DELETE' });
  },

  // --- COMMENTS ---
  getComments: async (articleId: string): Promise<Comment[]> => {
    const res = await fetch(`/api/comments?articleId=${articleId}`);
    if (!res.ok) return [];
    return res.json();
  },

  // For Admin Dashboard
  getAllComments: async (): Promise<Comment[]> => {
    const res = await fetch('/api/comments');
    if (!res.ok) return [];
    return res.json();
  },

  addComment: async (commentData: Omit<Comment, 'id' | 'createdAt' | 'status'>): Promise<Comment> => {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    });
    return res.json();
  },

  updateCommentStatus: async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
    await fetch(`/api/comments/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  },

  deleteComment: async (id: string): Promise<void> => {
    await fetch(`/api/comments/${id}`, { method: 'DELETE' });
  },

  // --- SETTINGS ---
  getSetting: async (key: string): Promise<string> => {
    const res = await fetch(`/api/settings/${key}`);
    const data = await res.json();
    return data.value || '';
  },

  updateSetting: async (key: string, value: string): Promise<void> => {
    await fetch(`/api/settings/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
  },

  // --- AUTH ---
  login: async (user: string, pass: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (user === 'GGN' && pass === 'NEWS1967') {
      localStorage.setItem(LS_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  },

  checkAuth: (): boolean => {
    return localStorage.getItem(LS_KEYS.AUTH) === 'true';
  },

  logout: () => {
    localStorage.removeItem(LS_KEYS.AUTH);
  }
};