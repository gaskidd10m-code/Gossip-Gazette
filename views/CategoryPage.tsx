'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Article, Category } from '../types';
import { api } from '../services/api';
import { ArticleCard } from '../components/ArticleCard';

export const CategoryPage = ({ initialArticles = [], initialCategory = null }: { initialArticles?: Article[]; initialCategory?: Category | null }) => {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug;
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [category, setCategory] = useState<Category | null>(initialCategory);
    const [loading, setLoading] = useState(initialArticles.length === 0 && !initialCategory);

    useEffect(() => {
        // If we already have data from server, skip first load
        if (initialArticles.length > 0 && initialCategory?.slug === slug) {
            setLoading(false);
            return;
        }

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
    }, [slug, initialArticles, initialCategory]);

    if (loading) {
        return <div className="container mx-auto py-20 text-center font-serif">Loading...</div>;
    }

    if (!category) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-black mb-4">Category Not Found</h2>
                <Link href="/" className="text-red-700 underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="w-full px-4 md:px-12">
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

