import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Article, Category } from '../types';
import { api } from '../services/api';

// --- Expandable Article Component ---
interface ExpandableArticleProps {
  article: Article;
  isExpanded: boolean;
  onToggle: () => void;
  variant?: 'hero' | 'card' | 'list' | 'mobile';
}

const ExpandableArticle: React.FC<ExpandableArticleProps> = ({ article, isExpanded, onToggle, variant = 'list' }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isExpanded]);

  // Hero variant (large featured article)
  if (variant === 'hero') {
    return (
      <div ref={contentRef} className="group cursor-pointer relative">
        <div className="overflow-hidden mb-4 rounded-sm shadow-sm">
          <img src={article.coverImage} alt={article.title} className="w-full h-64 md:h-[500px] object-contain bg-gray-100 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        </div>
        <div className="flex items-center gap-3 text-red-700 text-xs font-bold uppercase tracking-widest mb-3">
          <span className="bg-red-50 px-2 py-1 rounded">{article.categoryName}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-4">
          {article.title}
        </h2>
        <p className="font-serif text-gray-600 leading-relaxed text-lg md:text-xl mb-4">
          {isExpanded ? article.content : article.excerpt}
        </p>
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-colors rounded-sm"
        >
          {isExpanded ? '← Read Less' : 'Read More →'}
        </button>
      </div>
    );
  }

  // Card variant (grid items)
  if (variant === 'card') {
    return (
      <div ref={contentRef} className="group block h-full flex flex-col">
        <div className="overflow-hidden mb-4 rounded-sm">
          <img src={article.coverImage} className="w-full h-48 object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </div>
        <h4 className="font-serif font-bold text-xl mb-3 leading-tight flex-grow">{article.title}</h4>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
          {isExpanded ? article.content : `${article.excerpt.substring(0, 100)}...`}
        </p>
        <button
          onClick={onToggle}
          className="text-xs text-black font-bold uppercase hover:underline text-left"
        >
          {isExpanded ? '↑ Read Less' : 'Read More →'}
        </button>
      </div>
    );
  }

  // Mobile variant
  if (variant === 'mobile') {
    return (
      <div ref={contentRef} className="flex gap-4 py-4 border-b border-gray-100 last:border-0 group flex-col">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-700 text-[10px] font-bold uppercase tracking-wide">{article.categoryName}</span>
              <span className="text-gray-400 text-[10px]">•</span>
              <span className="text-gray-400 text-[10px]">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            <h3 className="font-serif font-bold text-lg leading-tight">
              {article.title}
            </h3>
          </div>
          <div className="w-24 h-24 flex-shrink-0">
            <img src={article.coverImage} className="w-full h-full object-cover rounded-sm bg-gray-100" loading="lazy" />
          </div>
        </div>
        {isExpanded && (
          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-xs text-red-700 font-bold uppercase text-left"
        >
          {isExpanded ? '↑ Read Less' : 'Read More →'}
        </button>
      </div>
    );
  }

  // List variant (default)
  return (
    <div ref={contentRef} className="flex flex-col md:flex-row gap-6 items-start group border-b border-gray-100 pb-8 last:border-0 last:pb-0">
      <div className="w-full md:w-64 h-40 flex-shrink-0 overflow-hidden rounded-sm">
        <img src={article.coverImage} className="w-full h-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="flex-1">
        <span className="text-red-700 text-[10px] font-bold uppercase mb-2 block tracking-widest">{article.categoryName}</span>
        <h4 className="font-serif font-bold text-2xl mb-3 leading-tight">{article.title}</h4>
        <div className="text-sm text-gray-500 leading-relaxed mb-4 whitespace-pre-line">
          {isExpanded ? article.content : article.excerpt}
        </div>
        <p className="text-xs text-gray-400 font-bold mb-3">By {article.authorName} • {new Date(article.publishedAt).toLocaleDateString()}</p>
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors rounded-sm"
        >
          {isExpanded ? '← Read Less' : 'Read More →'}
        </button>
      </div>
    </div>
  );
};

// --- Sub-components for Layouts ---

const BentoGrid = ({ articles, expandedId, onToggle }: { articles: Article[]; expandedId: string | null; onToggle: (id: string) => void }) => {
  if (articles.length < 3) return null;
  const [main, sub1, sub2] = articles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-8 mb-16 border-b border-gray-200 pb-16">
      {/* Main Feature */}
      <div className="md:col-span-8">
        <ExpandableArticle
          article={main}
          isExpanded={expandedId === main.id}
          onToggle={() => onToggle(main.id)}
          variant="hero"
        />
      </div>

      {/* Sub Features Column */}
      <div className="md:col-span-4 flex flex-col gap-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
        <ExpandableArticle
          article={sub1}
          isExpanded={expandedId === sub1.id}
          onToggle={() => onToggle(sub1.id)}
          variant="card"
        />
        <div className="w-full h-px bg-gray-100"></div>
        <ExpandableArticle
          article={sub2}
          isExpanded={expandedId === sub2.id}
          onToggle={() => onToggle(sub2.id)}
          variant="card"
        />
      </div>
    </div>
  );
};

const SectionTech = ({ articles, expandedId, onToggle }: { articles: Article[]; expandedId: string | null; onToggle: (id: string) => void }) => (
  <section className="mb-16">
    <div className="flex items-end justify-between border-b-2 border-black mb-8 pb-2">
      <h3 className="font-sans font-black text-2xl uppercase tracking-widest">Technology</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.slice(0, 3).map(article => (
        <ExpandableArticle
          key={article.id}
          article={article}
          isExpanded={expandedId === article.id}
          onToggle={() => onToggle(article.id)}
          variant="card"
        />
      ))}
    </div>
  </section>
);

const SectionSports = ({ articles, expandedId, onToggle }: { articles: Article[]; expandedId: string | null; onToggle: (id: string) => void }) => (
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
              <img src={article.coverImage} className="absolute inset-0 w-full h-full object-contain bg-gray-900 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" />
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow">Top Story</div>
            </div>
            <h4 className="font-bold text-lg leading-tight mb-2">{article.title}</h4>
            <p className="text-xs text-gray-500 mb-3">{new Date(article.publishedAt).toLocaleDateString()}</p>
            {expandedId === article.id && (
              <p className="text-sm text-gray-300 leading-relaxed mb-3 whitespace-pre-line">{article.content}</p>
            )}
            <button
              onClick={() => onToggle(article.id)}
              className="text-xs text-white font-bold uppercase hover:text-red-400 transition-colors"
            >
              {expandedId === article.id ? '↑ Read Less' : 'Read More →'}
            </button>
          </div>
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
        <li className="pl-2">
          <span className="font-bold hover:text-red-700 transition-colors leading-tight cursor-pointer">
            The 10 richest people in Tech
          </span>
        </li>
        <li className="pl-2">
          <span className="font-bold hover:text-red-700 transition-colors leading-tight cursor-pointer">
            Why everyone is moving to Nebraska
          </span>
        </li>
        <li className="pl-2">
          <span className="font-bold hover:text-red-700 transition-colors leading-tight cursor-pointer">
            New diet trends: Eating air?
          </span>
        </li>
        <li className="pl-2">
          <span className="font-bold hover:text-red-700 transition-colors leading-tight cursor-pointer">
            Election results explained
          </span>
        </li>
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

// --- Mobile-Specific Components ---

const MobileNewsFeed = ({ articles, expandedId, onToggle }: { articles: Article[]; expandedId: string | null; onToggle: (id: string) => void }) => {
  if (articles.length === 0) return null;
  const [main, ...rest] = articles.slice(0, 6); // Top 6 stories

  return (
    <div className="md:hidden space-y-8 mb-12">
      {/* Mobile Hero */}
      <div className="border-b border-gray-200 pb-6">
        <ExpandableArticle
          article={main}
          isExpanded={expandedId === main.id}
          onToggle={() => onToggle(main.id)}
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
            <ExpandableArticle
              key={article.id}
              article={article}
              isExpanded={expandedId === article.id}
              onToggle={() => onToggle(article.id)}
              variant="mobile"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('cat');

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
      const [allArticles] = await Promise.all([
        api.getArticles()
      ]);
      setArticles(allArticles);
    };
    loadData();
  }, []);

  const handleToggleArticle = (articleId: string) => {
    setExpandedArticleId(prev => prev === articleId ? null : articleId);
  };

  const sportsArticles = articles.filter(a => a.categoryName === 'Sports');
  const techArticles = articles.filter(a => a.categoryName === 'Technology');

  // If filtered (should redirect, but render generic just in case)
  if (categoryFilter) return null;

  return (
    <div>
      <Helmet>
        <title>Gossip Gazette - Latest News & Updates</title>
        <meta name="description" content="Your daily dose of the latest gossip, news, and updates from around the world." />
        <link rel="canonical" href="https://gossipgazette.online/" />
      </Helmet>
      {/* Mobile Page Title */}
      <div className="md:hidden mb-6">
        <h1 className="font-serif font-black text-3xl border-b-4 border-black pb-2 inline-block">Home Page</h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Desktop Hero */}
      <div className="hidden md:block">
        <BentoGrid articles={articles.slice(0, 4)} expandedId={expandedArticleId} onToggle={handleToggleArticle} />
      </div>

      {/* Mobile News Feed (Replaces Hero on Mobile) */}
      <MobileNewsFeed articles={articles} expandedId={expandedArticleId} onToggle={handleToggleArticle} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Column */}
        <div className="lg:col-span-8">
          <SectionTech articles={techArticles.length ? techArticles : articles.slice(2, 5)} expandedId={expandedArticleId} onToggle={handleToggleArticle} />

          <div className="border-t border-gray-200 my-12"></div>

          {/* List View for Politics/General */}
          <div className="space-y-10">
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="font-sans font-black text-xl uppercase tracking-widest">Latest Stories</h3>
            </div>
            {articles.slice(3, 15).map(article => (
              <ExpandableArticle
                key={article.id}
                article={article}
                isExpanded={expandedArticleId === article.id}
                onToggle={() => handleToggleArticle(article.id)}
                variant="list"
              />
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
        <SectionSports articles={sportsArticles.length ? sportsArticles : articles} expandedId={expandedArticleId} onToggle={handleToggleArticle} />
      </div>
    </div>
  );
};