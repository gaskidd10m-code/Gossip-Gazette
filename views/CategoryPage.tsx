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

    const isSportsPage = category.name.toLowerCase().includes('sport');
    const isTransfer = (a: Article) => 
        a.categoryName.toLowerCase().includes('transfer') || 
        (a.tags && a.tags.some(t => t.toLowerCase() === 'transfer'));
    
    const transferArticles = articles.filter(a => isTransfer(a));
    const regularArticles = articles.filter(a => !isTransfer(a));

    return (
        <div className="w-full px-4 md:px-12">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl font-black uppercase tracking-tight">{category.name}</h2>
                <div className="h-1 bg-black flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className={`${isSportsPage && transferArticles.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
                    {isSportsPage && regularArticles.length > 0 && transferArticles.length > 0 && (
                        <div className="flex items-center gap-4 mb-8 border-b pb-4">
                            <h3 className="text-xl font-black uppercase tracking-widest text-gray-400">Latest Sports Reports</h3>
                            <div className="h-px bg-gray-100 flex-grow"></div>
                        </div>
                    )}
                    
                    <div className="space-y-12 pb-20">
                        {regularArticles.length > 0 ? (
                            regularArticles.map(a => (
                                <ArticleCard
                                    key={a.id}
                                    article={a}
                                    variant="list"
                                />
                            ))
                        ) : (
                            !isSportsPage && (
                                <div className="py-12 text-center text-gray-500 italic">
                                    No articles found in this category.
                                </div>
                            )
                        )}
                    </div>
                </div>

                {isSportsPage && transferArticles.length > 0 && (
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28">
                            <div className="bg-red-50/50 p-6 rounded-sm border border-red-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-4 border-b border-red-200 pb-4">
                                    <span className="text-2xl animate-pulse">⚡</span>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-red-700">Transfer News</h3>
                                </div>
                                <div className="space-y-6">
                                    {transferArticles.map(a => {
                                        const cleanImageUrl = a.coverImage?.split('#')[0] || a.coverImage;
                                        return (
                                            <Link href={`/article/${a.slug}`} key={a.id} className="block group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                <div className="flex gap-4 items-start">
                                                    {cleanImageUrl && (
                                                        <div className="w-16 h-16 shrink-0 bg-gray-100 overflow-hidden rounded-sm">
                                                            <img src={cleanImageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-serif font-bold text-sm leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{a.title}</h4>
                                                        <span className="text-[9px] uppercase font-black tracking-widest text-gray-400 mt-2 block">Breaking Update</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <Link href="#" className="block text-center mt-8 text-[9px] font-black uppercase tracking-[0.2em] bg-red-700 text-white py-3 hover:bg-black transition-all">
                                    Access Hub
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

