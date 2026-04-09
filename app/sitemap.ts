export const dynamic = 'force-dynamic';
import { MetadataRoute } from 'next';
import { db } from '../lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gossipgazette.online';

  let articleUrls: MetadataRoute.Sitemap = [];

  try {
    const articles = await db.query(
      `SELECT slug, published_at AS "publishedAt" 
       FROM articles 
       WHERE status = 'published' 
       ORDER BY published_at DESC 
       LIMIT 1000`
    );

    articleUrls = articles.map((article: any) => ({
      url: `${siteUrl}/article/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'never' as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.error('Error generating sitemap:', err);
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'always', priority: 1.0 },
    { url: `${siteUrl}/sports`, lastModified: new Date(), changeFrequency: 'always', priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/authors`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteUrl}/archive`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: `${siteUrl}/tags`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.5 },
  ];

  return [...staticPages, ...articleUrls];
}
