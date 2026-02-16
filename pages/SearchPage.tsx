import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Article } from '../types';
import { api } from '../services/api';
import { ArticleCard } from '../components/ArticleCard';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setLoading(true);
      const data = await api.searchArticles(query);
      setResults(data);
      setLoading(false);
    };
    doSearch();
  }, [query]);

  const handleToggleArticle = (articleId: string) => {
    setExpandedArticleId(prev => prev === articleId ? null : articleId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-black font-serif mb-6 border-b-4 border-black pb-2">
        Search Results for: <span className="text-red-700">"{query}"</span>
      </h2>

      {loading ? (
        <div className="text-center py-20 font-serif text-gray-500">Searching archives...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded">
          <p className="text-xl font-serif text-gray-600 mb-2">No articles found.</p>
          <p className="text-sm text-gray-400">Try searching for "Tech", "Politics", or "Climate".</p>
        </div>
      ) : (
        <div className="space-y-8">
          {results.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              isExpanded={expandedArticleId === article.id}
              onToggle={() => handleToggleArticle(article.id)}
              variant="list"
              searchQuery={query}
            />
          ))}
        </div>
      )}
    </div>
  );
};