'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Article } from '../types';

interface ArticleCardProps {
    article: Article;
    variant?: 'hero' | 'card' | 'list' | 'mobile';
    searchQuery?: string;
}

// Helper for highlighting text
const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight || !highlight.trim()) {
        return <>{text}</>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="bg-yellow-200 text-black">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'list', searchQuery = '' }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // Removed expansion effect logic as we now navigate to separate pages

    const isShortNews = article.categoryName.toLowerCase().includes('transfer') || (article.tags && article.tags.some(t => t.toLowerCase() === 'transfer'));

    // Parse focal position from hash (e.g. #pos=50%_50%)
    const posMatch = article.coverImage?.match(/#pos=([0-9.]+)%_([0-9.]+)%/);
    const posX = posMatch ? posMatch[1] : '50';
    const posY = posMatch ? posMatch[2] : '50';
    const cleanImageUrl = article.coverImage?.split('#')[0] || article.coverImage;

    const renderContent = () => {
        if (isShortNews) {
            return <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose prose-sm max-w-none text-gray-800" />;
        }
        return <Highlight text={article.excerpt} highlight={searchQuery} />;
    };

    const renderTitle = () => {
        return <Highlight text={article.title} highlight={searchQuery} />;
    };

    // Hero variant (large featured article)
    if (variant === 'hero') {
        return (
            <div ref={contentRef} className="group relative">
                <div className="overflow-hidden mb-4 rounded-sm shadow-sm h-56 md:h-[400px]">
                    <img 
                        src={cleanImageUrl} 
                        alt={article.title} 
                        className={`w-full h-full object-cover bg-gray-100 transition-transform duration-700 ${!isShortNews && 'group-hover:scale-105'}`} 
                        loading="lazy"
                        style={{ objectPosition: `${posX}% ${posY}%` }}
                    />
                </div>
                <div className="flex items-center gap-3 text-red-700 text-xs font-bold uppercase tracking-widest mb-4">
                    <Link href={`/category/${article.categoryName.toLowerCase()}`} className="bg-red-50 px-3 py-1.5 rounded hover:bg-red-100 transition-colors">
                        {article.categoryName}
                    </Link>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <Link href={`/article/${article.slug}`}>
                    <h2 className="font-serif text-2xl md:text-4xl font-black leading-tight mb-4 hover:text-red-800 transition-colors">
                        {renderTitle()}
                    </h2>
                </Link>
                <div className={`font-serif leading-relaxed text-base md:text-lg mb-4 transition-all duration-500`}>
                    {renderContent()}
                </div>
                {!isShortNews && (
                    <Link
                        href={`/article/${article.slug}`}
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all duration-300 rounded-sm shadow-md hover:shadow-lg"
                    >
                        Read More →
                    </Link>
                )}
            </div>
        );
    }

    // Card variant (grid items)
    if (variant === 'card') {
        return (
            <div ref={contentRef} className="group block h-full flex flex-col">
                    <img 
                        src={cleanImageUrl} 
                        className={`w-full h-full object-cover transition-transform duration-500 bg-gray-100 ${!isShortNews && 'group-hover:scale-105'}`} 
                        loading="lazy" 
                        alt={article.title} 
                        style={{ objectPosition: `${posX}% ${posY}%` }}
                    />
                <span className="text-xs font-bold text-red-700 uppercase mb-2 block">{article.categoryName}</span>
                <Link href={`/article/${article.slug}`}>
                    <h4 className="font-serif font-bold text-xl mb-3 leading-tight flex-grow hover:text-red-800 transition-colors">
                        {renderTitle()}
                    </h4>
                </Link>
                <div className={`text-sm mb-4 leading-relaxed transition-all duration-500`}>
                    {renderContent()}
                </div>
                {!isShortNews && (
                    <Link
                        href={`/article/${article.slug}`}
                        className="text-xs text-black font-bold uppercase hover:text-red-700 transition-colors text-left mt-auto inline-block"
                    >
                        Read More →
                    </Link>
                )}
            </div>
        );
    }

    // Mobile variant
    if (variant === 'mobile') {
        return (
            <div ref={contentRef} className="flex gap-4 py-5 border-b border-gray-100 last:border-0 group flex-col">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-red-700 text-[10px] font-bold uppercase tracking-wide">{article.categoryName}</span>
                            <span className="text-gray-400 text-[10px]">•</span>
                            <span className="text-gray-400 text-[10px]">{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <Link href={`/article/${article.slug}`}>
                            <h3 className="font-serif font-bold text-lg leading-tight hover:text-red-800 transition-colors">
                                {renderTitle()}
                            </h3>
                        </Link>
                    </div>
                    <Link href={`/article/${article.slug}`} className="w-24 h-24 flex-shrink-0">
                        <img 
                            src={cleanImageUrl} 
                            className="w-full h-full object-cover rounded-sm bg-gray-100" 
                            loading="lazy" 
                            alt={article.title} 
                            style={{ objectPosition: `${posX}% ${posY}%` }}
                        />
                    </Link>
                </div>
                {/* Removed in-place content injection */}
                {!isShortNews && (
                    <Link
                        href={`/article/${article.slug}`}
                        className="text-xs text-red-700 font-bold uppercase text-left hover:underline transition-all"
                    >
                        Read More →
                    </Link>
                )}
                {isShortNews && (
                    <div className="mt-4 text-sm leading-relaxed text-gray-800">
                        {renderContent()}
                    </div>
                )}
            </div>
        );
    }

    // List variant (default)
    return (
        <div ref={contentRef} className="flex flex-col md:flex-row gap-6 items-start group border-b border-gray-100 pb-8 mb-8 last:border-0 last:pb-0 last:mb-0 w-full">
            <Link href={`/article/${article.slug}`} className="w-full md:w-64 h-44 flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                <img 
                    src={cleanImageUrl} 
                    className={`w-full h-full object-cover bg-gray-100 transition-transform duration-500 ${!isShortNews && 'group-hover:scale-105'}`} 
                    loading="lazy" 
                    alt={article.title} 
                    style={{ objectPosition: `${posX}% ${posY}%` }}
                />
            </Link>
            <div className="flex-1 w-full">
                <span className="text-red-700 text-[10px] font-bold uppercase mb-2 block tracking-widest">{article.categoryName}</span>
                <Link href={`/article/${article.slug}`}>
                    <h4 className="font-serif font-bold text-xl mb-2 leading-tight hover:text-red-800 transition-colors">
                        {renderTitle()}
                    </h4>
                </Link>
                <div className={`text-xs leading-relaxed mb-3 transition-all duration-500`}>
                    {renderContent()}
                </div>
                {!isShortNews && <p className="text-xs text-gray-400 font-bold mb-4">By {article.authorName} • {new Date(article.publishedAt).toLocaleDateString()}</p>}
                {!isShortNews && (
                    <Link
                        href={`/article/${article.slug}`}
                        className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all duration-300 rounded-sm shadow-md hover:shadow-lg"
                    >
                        Read More →
                    </Link>
                )}
            </div>
        </div>
    );
};
