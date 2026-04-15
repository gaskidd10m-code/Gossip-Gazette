import { Suspense } from 'react';
import { HomePage } from '../views/HomePage';
import { db } from '../lib/db';
import { Article } from '../types';
async function getInitialArticles(): Promise<Article[]> {
  try {
    const rows = await db.query(
      `SELECT 
        id, title, slug, excerpt, content, cover_image AS "coverImage",
        author_id AS "authorId", author_name AS "authorName", author_slug AS "authorSlug",
        category_id AS "categoryId", category_name AS "categoryName",
        tags, status, published_at AS "publishedAt", views, source
       FROM articles
       WHERE status = 'published'
       ORDER BY published_at DESC`
    );
    return rows.map(r => ({
      ...r,
      publishedAt: r.publishedAt instanceof Date ? r.publishedAt.toISOString() : r.publishedAt
    })) as Article[];
  } catch (error) {
    console.error('Error fetching articles for home page:', error);
    return [];
  }
}

export default async function Page() {
  const initialArticles = await getInitialArticles();
  
  return (
    <Suspense fallback={<div className="container mx-auto py-20 text-center font-serif text-gray-500">Loading home...</div>}>
      <HomePage initialArticles={initialArticles} />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';
