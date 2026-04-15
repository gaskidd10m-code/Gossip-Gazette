'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Article, SportsNews } from '../types';
import { api } from '../services/api';
import { ArticleCard } from '../components/ArticleCard';

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
      </div>
      <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x">
        {articles.map(article => {
          const posMatch = article.coverImage?.match(/#pos=([0-9.]+)%_([0-9.]+)%/);
          const posX = posMatch ? posMatch[1] : '50';
          const posY = posMatch ? posMatch[2] : '50';
          const cleanImageUrl = article.coverImage?.split('#')[0] || article.coverImage;
          
          return (
            <div key={article.id} className="min-w-[280px] md:min-w-[350px] snap-center group">
              <div className="relative h-56 w-full mb-4 overflow-hidden rounded-sm border border-gray-800">
                <img 
                  src={cleanImageUrl} 
                  className="absolute inset-0 w-full h-full object-cover bg-gray-900 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  loading="lazy" 
                  alt={article.title} 
                  style={{ objectPosition: `${posX}% ${posY}%` }}
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow">Top Story</div>
              </div>
              <h4 className="font-bold text-lg leading-tight mb-2">{article.title}</h4>
              <p className="text-xs text-gray-500 mb-3">{new Date(article.publishedAt).toLocaleDateString()}</p>
              <Link href={`/article/${article.slug}`} className="text-xs text-white font-bold uppercase hover:text-red-400 transition-colors">Read More →</Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Sidebar = ({ news }: { news: SportsNews[] }) => (
  <aside className="space-y-12">
    <div className="bg-[#0a0a0a] text-white p-8 md:p-10 border-l-4 border-red-700 shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 opacity-[0.03] scale-150 transform rotate-12 transition-transform duration-1000 group-hover:rotate-45">
          <span className="text-[200px] font-black">SPORTS</span>
      </div>
      
      <div className="flex items-center justify-between mb-10 border-b border-gray-800 pb-6">
        <h4 className="font-black uppercase text-sm tracking-[0.4em] text-red-600 flex items-center gap-3">
          <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
          Sports Today
        </h4>
        <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase italic">Breaking Updates</span>
      </div>

      <div className="space-y-10 relative z-10">
        {news.slice(0, 10).map((item, idx) => (
          <div key={item.id} className="relative pl-12 group/item border-b border-gray-900 last:border-0 pb-10 last:pb-0">
            <span className="absolute left-0 top-0 text-7xl font-sans font-black text-white/5 group-hover/item:text-red-700/20 transition-all duration-500 leading-none select-none">
              {idx + 1}
            </span>
            <div className="relative">
              <h5 className="font-serif font-black text-lg md:text-xl leading-snug text-white mb-4 group-hover/item:text-red-500 transition-colors duration-300">
                {item.title}
              </h5>
              <div 
                dangerouslySetInnerHTML={{ __html: item.content }} 
                className="text-sm text-gray-400 font-serif leading-relaxed prose prose-invert prose-sm opacity-80 group-hover/item:opacity-100 transition-opacity"
              />
              <div className="flex items-center gap-4 mt-6">
                <span className="h-px bg-red-700 w-8"></span>
                <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                  {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
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

export const HomePage = ({ initialArticles = [] }: { initialArticles?: Article[] }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [flashNews, setFlashNews] = useState<SportsNews[]>([]);
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
        const [allArticles, radar] = await Promise.all([api.getArticles(), api.getSportsNews()]);
        setArticles(allArticles);
        setFlashNews(radar);
      } catch (err) {
        console.error('Failed to load fresh data:', err);
      }
    };
    loadData();
  }, []);

  const isTransfer = (a: Article) => a.categoryName.toLowerCase().includes('transfer') || (a.tags && a.tags.some(t => t.toLowerCase() === 'transfer'));
  
  const mainArticles = articles.filter(a => !isTransfer(a));
  const sportsArticles = mainArticles.filter(a => ['sports', 'sports news'].includes(a.categoryName.toLowerCase()));
  const techArticles = mainArticles.filter(a => a.categoryName === 'Technology');

  if (categoryFilter) return null;

  return (
    <div className="w-full py-2 md:py-6">
      <div className="hidden md:block">
        <BentoGrid articles={mainArticles.slice(0, 4)} />
      </div>

      <MobileNewsFeed articles={mainArticles} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-8">
          <SectionTech articles={techArticles.length ? techArticles : mainArticles.slice(2, 5)} />
          
          <div className="border-t border-gray-100 my-10"></div>

          <div className="space-y-8">
            <div className="flex justify-between items-baseline mb-6 border-b-2 border-black pb-2">
              <h3 className="font-sans font-black text-xl uppercase tracking-widest text-black">Latest Stories</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page 1 of {Math.ceil(articles.length / 10)}</span>
            </div>
            {mainArticles.slice(3, 15).map(article => (
              <ArticleCard key={article.id} article={article} variant="list" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Sidebar news={flashNews} />
          </div>
        </div>
      </div>

      <SectionSports articles={sportsArticles.length ? sportsArticles : articles} />
    </div>
  );
};