'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Article } from '../types';
import { api } from '../services/api';
import { ArticleCard } from '../components/ArticleCard';

// --- Sub-components for Layouts ---

const BentoGrid = ({ articles }: { articles: Article[] }) => {
  if (articles.length < 3) return null;
  const [main, sub1, sub2] = articles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-6 mb-10 border-b border-gray-100 pb-10">
      {/* Main Feature */}
      <div className="md:col-span-8">
        <ArticleCard
          article={main}
          variant="hero"
        />
      </div>

      {/* Sub Features Column */}
      <div className="md:col-span-4 flex flex-col gap-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
        <ArticleCard
          article={sub1}
          variant="card"
        />
        <div className="w-full h-px bg-gray-100"></div>
        <ArticleCard
          article={sub2}
          variant="card"
        />
      </div>
    </div>
  );
};

const SectionTech = ({ articles }: { articles: Article[] }) => (
  <section className="mb-16">
    <div className="flex items-end justify-between border-b border-black mb-6 pb-2">
      <h3 className="font-sans font-black text-xl uppercase tracking-widest">Technology</h3>
    </div>
    <div className="space-y-8">
      {articles.slice(0, 3).map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          variant="list"
        />
      ))}
    </div>
  </section>
);

const SportsNewsTicker = ({ sportsNews }: { sportsNews: import('../types').SportsNews[] }) => (
  <div className="bg-red-50 border-y border-red-100 p-3 mb-10 overflow-hidden relative group">
    <div className="flex items-center gap-4">
      <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase rounded-sm shrink-0">Live Sports</span>
      <div className="overflow-hidden relative flex-1 h-5">
        <div className="animate-ticker-slow whitespace-nowrap inline-block font-sans font-bold text-xs text-gray-800">
          {sportsNews.length > 0 ? sportsNews.map(item => (
            <span key={item.id} className="mx-6">
              <span className="text-red-600 mr-2">●</span> {item.title}
            </span>
          )) : 'Waiting for live updates...'}
        </div>
      </div>
      <Link href="/sports" className="text-[10px] font-black uppercase text-red-600 hover:underline shrink-0">View Hub →</Link>
    </div>
  </div>
);

const SectionSports = ({ articles }: { articles: Article[] }) => (
  <section className="mb-16 bg-brand-black text-white -mx-4 md:-mx-6 px-4 md:px-6 py-12 rounded-sm shadow-inner">
    <div className="container mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
        <h3 className="font-sans font-black text-2xl uppercase tracking-widest text-white">Sports Center</h3>
        <span className="text-red-600 font-bold text-xs animate-pulse">● LIVE UPDATES</span>
      </div>
      <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x">
        {articles.map(article => (
          <div key={article.id} className="min-w-[280px] md:min-w-[350px] snap-center group">
            <div className="relative h-56 w-full mb-4 overflow-hidden rounded-sm border border-gray-800">
              <img src={article.coverImage} className="absolute inset-0 w-full h-full object-contain bg-gray-900 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" alt={article.title} />
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow">Top Story</div>
            </div>
            <h4 className="font-bold text-lg leading-tight mb-2">{article.title}</h4>
            <p className="text-xs text-gray-500 mb-3">{new Date(article.publishedAt).toLocaleDateString()}</p>
            <Link
              href={`/article/${article.slug}`}
              className="text-xs text-white font-bold uppercase hover:text-red-400 transition-colors"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Sidebar = ({ sportsNews }: { sportsNews: import('../types').SportsNews[] }) => (
  <aside className="space-y-8 sticky top-32">
    <div className="bg-black text-white p-6 border-t-4 border-red-600 shadow-xl rounded-sm">
      <h4 className="font-bold uppercase text-[10px] tracking-widest mb-6 text-red-600 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
        Latest Sports Hub
      </h4>
      <div className="space-y-6">
        {sportsNews.slice(0, 5).map((item, idx) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex gap-4">
              <span className="text-gray-700 font-serif font-black text-2xl group-hover:text-red-600 transition-colors">{idx + 1}</span>
              <div className="flex-1">
                <Link href="/sports">
                  <h5 className="font-serif font-bold text-sm leading-tight group-hover:underline decoration-red-600 underline-offset-4 decoration-2">{item.title}</h5>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">{item.category}</span>
                    <span className="text-gray-800 text-[10px]">•</span>
                    <span className="text-[10px] font-bold text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/sports" className="block text-center mt-8 text-[10px] font-black uppercase tracking-widest border border-gray-800 py-3 hover:bg-white hover:text-black transition-all">
        View All Sports News →
      </Link>
    </div>

    <div className="border border-gray-200 p-8 text-center bg-gray-50 shadow-sm">
      <h4 className="font-bold font-serif text-xl mb-2">Ghana News Roundup</h4>
      <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest font-bold">Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <div className="space-y-4 text-left">
          {sportsNews.filter(n => n.category === 'Sports Today').slice(0, 2).map(item => (
              <div key={item.id} className="border-l-2 border-black pl-4 py-1">
                  <p className="text-xs font-bold leading-snug">{item.title}</p>
              </div>
          ))}
      </div>
    </div>
  </aside>
);

// --- Mobile-Specific Components ---

const MobileNewsFeed = ({ articles }: { articles: Article[] }) => {
  if (articles.length === 0) return null;
  const [main, ...rest] = articles.slice(0, 6); // Top 6 stories

  return (
    <div className="md:hidden space-y-8 mb-12">
      {/* Mobile Hero */}
      <div className="border-b border-gray-200 pb-6">
        <ArticleCard
          article={main}
          variant="hero"
        />
      </div>

      {/* Breaking News / Top Stories List */}
      <div>
        <h3 className="font-sans font-black text-lg uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          Top Headlines
        </h3>
        <div className="flex flex-col">
          {rest.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="mobile"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const HomePage = ({ initialArticles = [] }: { initialArticles?: Article[] }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [sportsNews, setSportsNews] = useState<import('../types').SportsNews[]>([]);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get('cat');

  // Redirect legacy query params to new routes
  useEffect(() => {
    if (categoryFilter) {
      api.getCategories().then(cats => {
        const found = cats.find(c => c.id === categoryFilter);
        if (found) {
          window.location.replace(`/category/${found.slug}`);
        }
      });
    }
  }, [categoryFilter]);

  // Parallel fetching for dashboard
  useEffect(() => {
    const loadData = async () => {
      try {
        const [allArticles, allSportsNews] = await Promise.all([
          api.getArticles(),
          api.getSportsNews()
        ]);
        if (allArticles.length > 0) setArticles(allArticles);
        if (allSportsNews.length > 0) setSportsNews(allSportsNews.filter(n => n.status === 'published').slice(0, 10));
      } catch (err) {
        console.error('Failed to load fresh articles:', err);
      }
    };
    loadData();
  }, []);

  const sportsArticles = articles.filter(a => a.categoryName === 'Sports');
  const techArticles = articles.filter(a => a.categoryName === 'Technology');

  if (categoryFilter) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <SportsNewsTicker sportsNews={sportsNews} />

      {/* Desktop Hero */}
      <div className="hidden md:block">
        <BentoGrid articles={articles.slice(0, 4)} />
      </div>

      {/* Mobile News Feed (Replaces Hero on Mobile) */}
      <MobileNewsFeed articles={articles} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* Main Content Column */}
        <div className="lg:col-span-8">
          <SectionTech articles={techArticles.length ? techArticles : articles.slice(2, 5)} />

          <div className="border-t border-gray-100 my-8"></div>

          {/* List View for Politics/General */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline mb-4 border-b border-black pb-2">
              <h3 className="font-sans font-black text-lg uppercase tracking-widest text-black">Latest Stories</h3>
            </div>
            {articles.slice(3, 15).map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="list"
              />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <Sidebar sportsNews={sportsNews} />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Section */}
      <div className="mt-12">
        <SectionSports articles={sportsArticles.length ? sportsArticles : articles} />
      </div>
    </div>
  );
};