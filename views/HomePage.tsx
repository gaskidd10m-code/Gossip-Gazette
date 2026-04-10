'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Article } from '../types';
import { api } from '../services/api';
import { ArticleCard } from '../components/ArticleCard';

// --- Layout Components ---

const BentoGrid = ({ articles }: { articles: Article[] }) => {
  if (articles.length < 3) return null;
  const [main, sub1, sub2] = articles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-8 mb-12 border-b border-gray-100 pb-12">
      <div className="md:col-span-8">
        <ArticleCard article={main} variant="hero" />
      </div>
      <div className="md:col-span-4 flex flex-col gap-6 md:pl-8 border-gray-100 md:border-l">
        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Featured Stories</div>
        <ArticleCard article={sub1} variant="card" />
        <div className="w-full h-px bg-gray-50 my-2"></div>
        <ArticleCard article={sub2} variant="card" />
      </div>
    </div>
  );
};

const SectionTech = ({ articles }: { articles: Article[] }) => (
  <section className="mb-12">
    <div className="flex items-end justify-between border-b border-black mb-6 pb-2">
      <h3 className="font-sans font-black text-xl uppercase tracking-widest">Technology</h3>
      <Link href="/category/technology" className="text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">More Tech →</Link>
    </div>
    <div className="space-y-8">
      {articles.slice(0, 3).map(article => (
        <ArticleCard key={article.id} article={article} variant="list" />
      ))}
    </div>
  </section>
);

const SectionSports = ({ articles }: { articles: Article[] }) => (
  <section className="mt-12 mb-16 bg-[#111] text-white -mx-4 md:-mx-6 px-4 md:px-6 py-12 rounded-sm shadow-2xl">
    <div className="w-full">
      <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
        <h3 className="font-sans font-black text-2xl uppercase tracking-widest text-white">Sports Center</h3>
        <Link href="/category/sports-news" className="text-red-600 font-bold text-xs hover:underline decoration-2 underline-offset-4">ACCESS HUB →</Link>
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
            <Link href={`/article/${article.slug}`} className="text-xs text-white font-bold uppercase hover:text-red-400 transition-colors">Read More →</Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Sidebar = ({ transferNews }: { transferNews: Article[] }) => (
  <aside className="space-y-10">
    <div className="bg-black text-white p-8 border-t-8 border-red-700 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 transform rotate-12 opacity-10 scale-150 pointer-events-none">
          <span className="text-8xl">⚽</span>
      </div>
      <h4 className="font-bold uppercase text-xs tracking-[0.3em] mb-8 text-red-600 flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
        Direct Hub
      </h4>
      <div className="space-y-8 relative z-10">
        {transferNews.slice(0, 4).map((item, idx) => (
          <div key={item.id} className="group/item">
            <Link href={`/category/${item.categoryId}`} className="flex items-start gap-4">
              <span className="text-gray-800 font-serif font-black text-3xl group-hover/item:text-red-700 transition-colors leading-none">{idx + 1}</span>
              <div className="flex-1">
                  <h5 className="font-serif font-bold text-sm leading-tight group-hover/item:text-red-500 transition-colors line-clamp-2">{item.title}</h5>
                  <div className="flex items-center gap-2 mt-3 overflow-hidden">
                    <span className="bg-red-700 text-white text-[9px] font-black px-1.5 py-0.5 uppercase tracking-tighter shrink-0">{item.categoryName}</span>
                    <span className="text-gray-700 text-[9px] font-bold uppercase tracking-widest">{new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/category/transfer-news" className="block text-center mt-10 text-[10px] font-black uppercase tracking-[0.3em] bg-red-700 py-4 hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 duration-300">
        Access Sports Hub
      </Link>
    </div>

    <div className="bg-gray-50 p-8 border border-gray-100 rounded-sm">
        <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">Join the discussion</h4>
        <p className="text-sm font-serif italic mb-6 leading-relaxed text-gray-600 leading-relaxed">"Gossip is what no one claims to like, but everybody enjoys." — Joseph Conrad</p>
        <div className="flex gap-4">
            <Link href="/contact" className="flex-1 text-center py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">Contact</Link>
            <Link href="/about" className="flex-1 text-center py-3 border border-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">About Us</Link>
        </div>
    </div>
  </aside>
);

const MobileNewsFeed = ({ articles }: { articles: Article[] }) => {
  if (articles.length === 0) return null;
  const [main, ...rest] = articles.slice(0, 6);

  return (
    <div className="md:hidden space-y-8 mb-12">
      <div className="border-b border-gray-200 pb-6">
        <ArticleCard article={main} variant="hero" />
      </div>
      <div>
        <h3 className="font-sans font-black text-lg uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          Top Headlines
        </h3>
        <div className="flex flex-col">
          {rest.map(article => (
            <ArticleCard key={article.id} article={article} variant="mobile" />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Page Component ---

export const HomePage = ({ initialArticles = [] }: { initialArticles?: Article[] }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [transferNews, setTransferNews] = useState<Article[]>([]);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get('cat');

  useEffect(() => {
    if (categoryFilter) {
      api.getCategories().then(cats => {
        const found = cats.find(c => c.id === categoryFilter);
        if (found) window.location.replace(`/category/${found.slug}`);
      });
    }
  }, [categoryFilter]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allArticles = await api.getArticles();
        if (allArticles.length > 0) {
            setArticles(allArticles);
            setTransferNews(allArticles.filter(a => a.categoryName.toLowerCase() === 'transfer news' && a.status === 'published').slice(0, 10));
        }
      } catch (err) {
        console.error('Failed to load fresh data:', err);
      }
    };
    loadData();
  }, []);

  const sportsArticles = articles.filter(a => ['sports', 'sports news'].includes(a.categoryName.toLowerCase()));
  const techArticles = articles.filter(a => a.categoryName === 'Technology');

  if (categoryFilter) return null;

  return (
    <div className="w-full py-2 md:py-6">
      <div className="hidden md:block">
        <BentoGrid articles={articles.slice(0, 4)} />
      </div>

      <MobileNewsFeed articles={articles} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-8">
          <SectionTech articles={techArticles.length ? techArticles : articles.slice(2, 5)} />
          
          <div className="border-t border-gray-100 my-10"></div>

          <div className="space-y-8">
            <div className="flex justify-between items-baseline mb-6 border-b-2 border-black pb-2">
              <h3 className="font-sans font-black text-xl uppercase tracking-widest text-black">Latest Stories</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page 1 of {Math.ceil(articles.length / 10)}</span>
            </div>
            {articles.slice(3, 15).map(article => (
              <ArticleCard key={article.id} article={article} variant="list" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Sidebar transferNews={transferNews} />
          </div>
        </div>
      </div>

      <SectionSports articles={sportsArticles.length ? sportsArticles : articles} />
    </div>
  );
};