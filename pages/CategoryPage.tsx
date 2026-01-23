import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Article, Category } from '../types';
import { api } from '../services/api';

export const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [articles, setArticles] = useState<Article[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                    {articles.map(a => (
                        <Link key={a.id} to={`/article/${a.slug}`} className="block group h-full">
                            <div className="overflow-hidden mb-4 rounded-sm shadow-sm">
                                <img src={a.coverImage} alt={a.title} className="w-full h-56 object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                            </div>
                            <span className="text-xs font-bold text-red-700 uppercase mb-2 block">{a.categoryName}</span>
                            <h3 className="font-serif font-bold text-2xl group-hover:underline leading-tight mb-3">{a.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{a.excerpt}</p>
                        </Link>
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
