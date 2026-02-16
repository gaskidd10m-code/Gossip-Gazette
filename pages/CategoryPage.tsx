import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Article, Category } from '../types';
import { api } from '../services/api';
import { ArticleCard } from '../components/ArticleCard';

export const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [articles, setArticles] = useState<Article[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const allCategories = await api.getCategories();
                const foundCategory = allCategories.find(c => c.slug === slug);

                if (foundCategory) {
                    setCategory(foundCategory);
                    const categoryArticles = await api.getArticlesByCategory(foundCategory.id);
                    setArticles(categoryArticles);
                } else {
                    setCategory(null);
                }
            } catch (error) {
                console.error('Failed to load category data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    const handleToggleArticle = (articleId: string) => {
        setExpandedArticleId(prev => prev === articleId ? null : articleId);
    };

    if (loading) {
        return <div className="container mx-auto py-20 text-center font-serif">Loading...</div>;
    }

    if (!category) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-black mb-4">Category Not Found</h2>
                <Link to="/" className="text-red-700 underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>{category.name} News - Gossip Gazette</title>
                <meta name="description" content={`Latest news and updates from the ${category.name} section.`} />
                <link rel="canonical" href={`https://gossipgazette.online/category/${category.slug}`} />
            </Helmet>

            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl font-black uppercase tracking-tight">{category.name}</h2>
                <div className="h-1 bg-black flex-grow"></div>
            </div>

            {articles.length > 0 ? (
                <div className="space-y-12">
                    {articles.map(a => (
                        <ArticleCard
                            key={a.id}
                            article={a}
                            isExpanded={expandedArticleId === a.id}
                            onToggle={() => handleToggleArticle(a.id)}
                            variant="list"
                        />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-gray-500 italic">
                    No articles found in this category.
                </div>
            )}
        </div>
    );
};
