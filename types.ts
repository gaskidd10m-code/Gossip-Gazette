// --- DATABASE SCHEMA DESIGN ---

// Users Collection
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'subscriber';
  avatarUrl?: string;
}

// Authors Collection (for E-E-A-T)
export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  photoUrl?: string;
  email?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  expertise?: string[];
}

// Categories Collection
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Articles Collection
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown
  coverImage: string;
  authorId: string;
  authorName: string; // Denormalized for simpler display
  authorSlug?: string; // Reference to Author profile
  categoryId: string;
  categoryName: string; // Denormalized
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt: string; // ISO Date
  views: number;
  source?: string; // Copyright/Original Source
}

// Comments Collection
export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  parentId?: string; // For threaded replies
  status: 'pending' | 'approved' | 'rejected';
}

// --- APP STATE TYPES ---

export type ArticleFormData = Omit<Article, 'id' | 'views' | 'authorId' | 'authorName'>;