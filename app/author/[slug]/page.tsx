import { AuthorPage } from '../../../views/AuthorPage';
import { db } from '../../../lib/db';
import { Article, Author } from '../../../types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

async function getData(slug: string) {
  const authors = await db.query<Author>(
    'SELECT id, name, slug, bio, avatar_url AS "avatarUrl", role, twitter, linkedin FROM authors WHERE slug = $1',
    [slug]
  );
  
  const author = authors[0];
  if (!author) return null;

  const articles = await db.query<Article>(
    `SELECT 
      id, title, slug, excerpt, content, cover_image AS "coverImage",
      author_id AS "authorId", author_name AS "authorName", author_slug AS "authorSlug",
      category_id AS "categoryId", category_name AS "categoryName",
      tags, status, published_at AS "publishedAt", views, source
     FROM articles
     WHERE author_id = $1 AND status = 'published'
     ORDER BY published_at DESC`,
    [author.id]
  );

  return { author, articles };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return { title: 'Author Not Found' };
  return {
    title: `${data.author.name}, Author at Gossip Gazette`,
    description: data.author.bio || `Read articles and news stories from ${data.author.name} on Gossip Gazette.`
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  
  if (!data) notFound();

  return (
    <AuthorPage 
      initialArticles={data.articles} 
      initialAuthor={data.author} 
    />
  );
}
