import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Article } from '../../../types';
import ArticleClientParts from './ArticleClientParts';
import { db } from '../../../lib/db';

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const rows = await db.query(
      `SELECT 
        id, title, slug, excerpt, content, cover_image AS "coverImage",
        author_id AS "authorId", author_name AS "authorName", author_slug AS "authorSlug",
        category_id AS "categoryId", category_name AS "categoryName",
        tags, status, published_at AS "publishedAt", views, source
       FROM articles
       WHERE slug = $1 AND status = 'published'`,
      [slug]
    );
    return rows[0] ?? null;
  } catch (err) {
    console.error('Error fetching article:', err);
    return null;
  }
}

// ── SEO Metadata (runs on server, Google sees it instantly) ──────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return { title: 'Article Not Found' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gossipgazette.online';
  const description = article.excerpt || article.content.replace(/<[^>]+>/g, '').substring(0, 155) + '...';

  return {
    title: article.title,
    description,
    alternates: {
      canonical: `${siteUrl}/article/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      url: `${siteUrl}/article/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.authorName],
      images: [
        {
          url: article.coverImage.startsWith('http')
            ? article.coverImage
            : `${siteUrl}${article.coverImage}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [article.coverImage.startsWith('http') ? article.coverImage : `${siteUrl}${article.coverImage}`],
    },
  };
}

// ── Server Component: Renders article HTML on server, no loading spinners ────
export default async function ArticleSSRPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gossipgazette.online';

  // Google News JSON-LD Schema Markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [
      article.coverImage.startsWith('http')
        ? article.coverImage
        : `${siteUrl}${article.coverImage}`,
    ],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [{
      '@type': 'Person',
      name: article.authorName,
      url: article.authorSlug ? `${siteUrl}/author/${article.authorSlug}` : undefined,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Gossip Gazette',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/article/${article.slug}`,
    },
  };

  return (
    <>
      {/* Inject Google News Schema into HTML head for instant bot indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 
        Server-rendered article shell — Google sees all of this instantly.
        Comments, share buttons, and interactive parts load via client component.
      */}
      <article className="w-full relative px-4 md:px-12">

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">

          {/* Left: Featured Image (sticky on desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <figure className="mb-4 md:mb-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-auto max-h-[400px] md:max-h-[500px] lg:max-h-[700px] object-cover object-top rounded-sm shadow-xl"
                />
                <figcaption className="text-xs text-gray-400 text-left mt-3 italic">
                  <span>Image source: Picsum Photos</span>
                  {article.source && (
                    <>
                      <span> • </span>
                      <span className="font-bold text-gray-600 uppercase not-italic">Source: {article.source}</span>
                    </>
                  )}
                </figcaption>
              </figure>

              {/* Share Buttons (client component) */}
              <ArticleClientParts article={article} showShareOnly />
            </div>
          </div>

          {/* Right: Article Content */}
          <div className="lg:col-span-7">
            <header className="mb-6 md:mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                {(article.tags || []).map((tag: string) => (
                  <span key={tag} className="bg-red-50 text-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Headline — Server-rendered for Google to index */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight mb-4 md:mb-6">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="font-serif text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-4 md:mb-6">
                {article.excerpt}
              </p>

              {/* Byline */}
              <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-200">
                <div>
                  <p className="font-bold text-sm font-sans uppercase">
                    By{' '}
                    {article.authorSlug ? (
                      <a href={`/author/${article.authorSlug}`} className="text-red-700 hover:underline">
                        {article.authorName}
                      </a>
                    ) : (
                      <span className="text-red-700">{article.authorName}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric'
                    })} • 5 min read
                  </p>
                </div>
              </div>
            </header>

            {/* Article Body — Server-rendered HTML content */}
            <div
              className="font-serif text-base md:text-lg leading-7 md:leading-8 text-gray-800 space-y-4 md:space-y-6 article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Source */}
            {article.source && (
              <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-500 font-sans">
                <span className="font-bold uppercase tracking-wider">Original Source:</span> {article.source}
              </div>
            )}

            {/* Subscribe CTA */}
            <div className="mt-8 md:mt-12 p-6 md:p-8 bg-gray-50 border-l-4 border-red-700 rounded-sm">
              <h4 className="font-bold mb-2">Subscribe to continue reading</h4>
              <p className="text-sm text-gray-600 mb-4">Support independent journalism. Get unlimited access to Gossip Gazette.</p>
              <button className="bg-black text-white px-6 py-2 text-sm font-bold uppercase hover:bg-gray-800 transition-colors">Subscribe Now</button>
            </div>
          </div>
        </div>

        {/* Comments Section — Client component (requires browser for form submission) */}
        <ArticleClientParts article={article} showCommentsOnly />
      </article>
    </>
  );
}
