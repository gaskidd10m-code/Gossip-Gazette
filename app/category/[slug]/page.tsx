import { CategoryPage } from '../../../views/CategoryPage';
import { db } from '../../../lib/db';
import { Article, Category } from '../../../types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

async function getData(slug: string) {
  const categories = await db.query<Category>(
    'SELECT id, name, slug FROM categories WHERE slug = $1',
    [slug]
  );
  
  const category = categories[0];
  if (!category) return null;

  let queryStr = `SELECT 
      id, title, slug, excerpt, content, cover_image AS "coverImage",
      author_id AS "authorId", author_name AS "authorName", author_slug AS "authorSlug",
      category_id AS "categoryId", category_name AS "categoryName",
      tags, status, published_at AS "publishedAt", views, source
     FROM articles
     WHERE category_id = $1 AND status = 'published'
     ORDER BY published_at DESC`;
  let params = [category.id];

  if (slug === 'sports-news') {
    const transferCat = await db.query<Category>('SELECT id FROM categories WHERE slug = $1', ['transfer-news']);
    if (transferCat.length > 0) {
      queryStr = `SELECT 
        id, title, slug, excerpt, content, cover_image AS "coverImage",
        author_id AS "authorId", author_name AS "authorName", author_slug AS "authorSlug",
        category_id AS "categoryId", category_name AS "categoryName",
        tags, status, published_at AS "publishedAt", views, source
       FROM articles
       WHERE (category_id = $1 OR category_id = $2) AND status = 'published'
       ORDER BY published_at DESC`;
      params.push(transferCat[0].id);
    }
  }

  const articles = await db.query<Article>(queryStr, params);

  return { category, articles };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return { title: 'Category Not Found' };
  return {
    title: `${data.category.name} - Gossip Gazette`,
    description: `Latest news and updates in ${data.category.name} from Gossip Gazette.`
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  
  if (!data) notFound();

  return (
    <CategoryPage 
      initialArticles={data.articles} 
      initialCategory={data.category} 
    />
  );
}
