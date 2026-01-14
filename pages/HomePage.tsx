import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Article, Category } from '../types';
import { api } from '../services/api';

// --- Sub-components for Layouts ---

const BentoGrid = ({ articles }: { articles: Article[] }) => {
  if (articles.length < 3) return null;
  const [main, sub1, sub2] = articles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-8 mb-16 border-b border-gray-200 pb-16">
      {/* Main Feature */}
      <div className="md:col-span-8 group cursor-pointer relative">
        <Link to={`/article/${main.slug}`} className="block h-full">
          <div className="overflow-hidden mb-4 rounded-sm shadow-sm">
            <img src={main.coverImage} alt={main.title} className="w-full h-64 md:h-[500px] object-contain bg-gray-100 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          </div>
          <div className="flex items-center gap-3 text-red-700 text-xs font-bold uppercase tracking-widest mb-3">
            <span className="bg-red-50 px-2 py-1 rounded">{main.categoryName}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{new Date(main.publishedAt).toLocaleDateString()}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-4 group-hover:text-gray-700 transition-colors">
            {main.title}
          </h2>
          <p className="font-serif text-gray-600 leading-relaxed text-lg md:text-xl line-clamp-3 max-w-3xl">
            {main.excerpt}
          </p>
        </Link>
      </div>

      {/* Sub Features Column */}
      <div className="md:col-span-4 flex flex-col gap-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
        <Link to={`/article/${sub1.slug}`} className="flex-1 group flex flex-col">
          <div className="overflow-hidden mb-3 rounded-sm">
            <img src={sub1.coverImage} alt={sub1.title} className="w-full h-48 object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          </div>
          <span className="text-red-700 text-[10px] font-bold uppercase tracking-widest mb-2">{sub1.categoryName}</span>
          <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-red-700 transition-colors mb-2">{sub1.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{sub1.excerpt}</p>
        </Link>
        <div className="w-full h-px bg-gray-100"></div>
        <Link to={`/article/${sub2.slug}`} className="flex-1 group flex flex-col">
          <div className="overflow-hidden mb-3 rounded-sm">
            <img src={sub2.coverImage} alt={sub2.title} className="w-full h-48 object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          </div>
          <span className="text-red-700 text-[10px] font-bold uppercase tracking-widest mb-2">{sub2.categoryName}</span>
          <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-red-700 transition-colors mb-2">{sub2.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{sub2.excerpt}</p>
        </Link>
      </div>
    </div>
  );
};

const SectionTech = ({ articles }: { articles: Article[] }) => (
  <section className="mb-16">
    <div className="flex items-end justify-between border-b-2 border-black mb-8 pb-2">
      <h3 className="font-sans font-black text-2xl uppercase tracking-widest">Technology</h3>
      <Link to="#" className="text-xs font-bold text-gray-500 hover:text-black transition-colors mb-1">See All Technology &rarr;</Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.slice(0, 3).map(article => (
        <Link key={article.id} to={`/article/${article.slug}`} className="group block h-full flex flex-col">
          <div className="overflow-hidden mb-4 rounded-sm">
            <img src={article.coverImage} className="w-full h-48 object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          </div>
          <h4 className="font-serif font-bold text-xl mb-3 group-hover:text-blue-700 leading-tight flex-grow">{article.title}</h4>
          <p className="text-sm text-gray-500 mb-3 leading-relaxed">{article.excerpt.substring(0, 100)}...</p>
          <span className="text-xs text-black font-bold uppercase group-hover:underline">Read Article</span>
        </Link>
      ))}
    </div>
  </section>
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
          <Link key={article.id} to={`/article/${article.slug}`} className="min-w-[280px] md:min-w-[350px] snap-center group">
            <div className="relative h-56 w-full mb-4 overflow-hidden rounded-sm border border-gray-800">
              <img src={article.coverImage} className="absolute inset-0 w-full h-full object-contain bg-gray-900 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" />
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow">Top Story</div>
            </div>
            <h4 className="font-bold text-lg leading-tight group-hover:text-gray-300 transition-colors">{article.title}</h4>
            <p className="text-xs text-gray-500 mt-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Sidebar = () => (
  <aside className="space-y-10 sticky top-32">
    <div className="bg-gray-50 p-6 border-t-4 border-black shadow-sm">
      <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-400">Trending Now</h4>
      <ol className="list-decimal list-inside space-y-4 font-serif text-lg">
        <li className="font-bold cursor-pointer hover:text-red-700 transition-colors leading-tight pl-2">The 10 richest people in Tech</li>
        <li className="font-bold cursor-pointer hover:text-red-700 transition-colors leading-tight pl-2">Why everyone is moving to Nebraska</li>
        <li className="font-bold cursor-pointer hover:text-red-700 transition-colors leading-tight pl-2">New diet trends: Eating air?</li>
        <li className="font-bold cursor-pointer hover:text-red-700 transition-colors leading-tight pl-2">Election results explained</li>
      </ol>
    </div>

    <div className="border border-gray-200 p-8 text-center bg-white shadow-sm">
      <h4 className="font-bold font-serif text-2xl mb-2">The Daily Brief</h4>
      <p className="text-sm text-gray-500 mb-6">Essential news, expertly curated. Sign up for our morning newsletter.</p>
      <input className="w-full border border-gray-300 bg-gray-50 p-3 text-sm mb-3 outline-none focus:border-black transition-colors" placeholder="Your email address" />
      <button className="w-full bg-black text-white font-bold text-xs py-3 uppercase tracking-widest hover:bg-red-700 transition-colors">Subscribe</button>
    </div>
  </aside>
);

export const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('cat');

  useEffect(() => {
    // Parallel fetching for demo
    const loadData = async () => {
      const [allArticles, allCats] = await Promise.all([
        categoryFilter ? api.getArticlesByCategory(categoryFilter) : api.getArticles(),
        api.getCategories()
      ]);
      setArticles(allArticles);
      setCategories(allCats);
    };
    loadData();
  }, [categoryFilter]);

  const sportsArticles = articles.filter(a => a.categoryName === 'Sports');
  const techArticles = articles.filter(a => a.categoryName === 'Tech');

  // If filtered, show simple grid
  if (categoryFilter) {
    return (
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-4xl font-black uppercase tracking-tight">{categories.find(c => c.id === categoryFilter)?.name || 'News'}</h2>
          <div className="h-1 bg-black flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map(a => (
            <Link key={a.id} to={`/article/${a.slug}`} className="block group h-full">
              <div className="overflow-hidden mb-4 rounded-sm shadow-sm">
                <img src={a.coverImage} className="w-full h-56 object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <span className="text-xs font-bold text-red-700 uppercase mb-2 block">{a.categoryName}</span>
              <h3 className="font-serif font-bold text-2xl group-hover:underline leading-tight mb-3">{a.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile Page Title */}
      <h1 className="md:hidden font-serif font-black text-3xl mb-6 border-b-2 border-black pb-2">Home Page</h1>

      {/* Hero */}
      <BentoGrid articles={articles.slice(0, 4)} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Column */}
        <div className="lg:col-span-8">
          <SectionTech articles={techArticles.length ? techArticles : articles.slice(2, 5)} />

          <div className="border-t border-gray-200 my-12"></div>

          {/* List View for Politics/General */}
          <div className="space-y-10">
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="font-sans font-black text-xl uppercase tracking-widest">Latest Stories</h3>
              <Link to="#" className="text-xs font-bold text-red-700">View Archive</Link>
            </div>
            {articles.slice(3, 8).map(article => (
              <Link key={article.id} to={`/article/${article.slug}`} className="flex flex-col md:flex-row gap-6 items-start group border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="w-full md:w-64 h-40 flex-shrink-0 overflow-hidden rounded-sm">
                  <img src={article.coverImage} className="w-full h-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div>
                  <span className="text-red-700 text-[10px] font-bold uppercase mb-2 block tracking-widest">{article.categoryName}</span>
                  <h4 className="font-serif font-bold text-2xl mb-3 group-hover:text-red-700 transition-colors leading-tight">{article.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2">{article.excerpt}</p>
                  <p className="text-xs text-gray-400 font-bold">By {article.authorName} • {new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>

      {/* Horizontal Scroll Section */}
      <div className="mt-20">
        <SectionSports articles={sportsArticles.length ? sportsArticles : articles} />
      </div>
    </div>
  );
};