import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
    article: Article;
    isExpanded: boolean;
    onToggle: () => void;
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

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, isExpanded, onToggle, variant = 'list', searchQuery = '' }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isExpanded && contentRef.current) {
            // Optional: scroll to view if needed, but maybe annoying if it jumps too much.
            // contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [isExpanded]);

    const renderContent = () => {
        if (isExpanded) {
            // Fix for "code showing": render HTML content safely
            return (
                <div
                    className="[&_p]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            );
        }
        // Excerpt is usually plain text, but we apply highlighting if needed
        return <Highlight text={article.excerpt} highlight={searchQuery} />;
    };

    const renderTitle = () => {
        return <Highlight text={article.title} highlight={searchQuery} />;
    }

    // Hero variant (large featured article)
    if (variant === 'hero') {
        return (
            <div ref={contentRef} className="group relative">
                <div className="overflow-hidden mb-6 rounded-sm shadow-md">
                    <img src={article.coverImage} alt={article.title} className="w-full h-64 md:h-[500px] object-contain bg-gray-100 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="flex items-center gap-3 text-red-700 text-xs font-bold uppercase tracking-widest mb-4">
                    <Link to={`/category/${article.categoryName.toLowerCase()}`} className="bg-red-50 px-3 py-1.5 rounded hover:bg-red-100 transition-colors">
                        {article.categoryName}
                    </Link>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <Link to={`/article/${article.slug}`}>
                    <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-6 hover:text-red-800 transition-colors">
                        {renderTitle()}
                    </h2>
                </Link>
                <div className={`font-serif text-gray-700 leading-relaxed text-lg md:text-xl mb-6 transition-all duration-500`}>
                    {renderContent()}
                </div>
                <button
                    onClick={(e) => { e.preventDefault(); onToggle(); }}
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all duration-300 rounded-sm shadow-md hover:shadow-lg"
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
                <Link to={`/article/${article.slug}`} className="overflow-hidden mb-4 rounded-sm shadow-sm">
                    <img src={article.coverImage} className="w-full h-48 object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" alt={article.title} />
                </Link>
                <span className="text-xs font-bold text-red-700 uppercase mb-2 block">{article.categoryName}</span>
                <Link to={`/article/${article.slug}`}>
                    <h4 className="font-serif font-bold text-xl mb-3 leading-tight flex-grow hover:text-red-800 transition-colors">
                        {renderTitle()}
                    </h4>
                </Link>
                <div className={`text-sm text-gray-600 mb-4 leading-relaxed transition-all duration-500`}>
                    {renderContent()}
                </div>
                <button
                    onClick={(e) => { e.preventDefault(); onToggle(); }}
                    className="text-xs text-black font-bold uppercase hover:text-red-700 transition-colors text-left mt-auto inline-block"
                >
                    {isExpanded ? '↑ Read Less' : 'Read More →'}
                </button>
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
                        <Link to={`/article/${article.slug}`}>
                            <h3 className="font-serif font-bold text-lg leading-tight hover:text-red-800 transition-colors">
                                {renderTitle()}
                            </h3>
                        </Link>
                    </div>
                    <Link to={`/article/${article.slug}`} className="w-24 h-24 flex-shrink-0">
                        <img src={article.coverImage} className="w-full h-full object-cover rounded-sm bg-gray-100" loading="lazy" alt={article.title} />
                    </Link>
                </div>
                {isExpanded && (
                    <div
                        className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mt-2"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                )}
                <button
                    onClick={(e) => { e.preventDefault(); onToggle(); }}
                    className="text-xs text-red-700 font-bold uppercase text-left hover:underline transition-all"
                >
                    {isExpanded ? '↑ Read Less' : 'Read More →'}
                </button>
            </div>
        );
    }

    // List variant (default)
    return (
        <div ref={contentRef} className="flex flex-col md:flex-row gap-6 items-start group border-b border-gray-100 pb-8 mb-8 last:border-0 last:pb-0 last:mb-0">
            <Link to={`/article/${article.slug}`} className="w-full md:w-64 h-40 flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                <img src={article.coverImage} className="w-full h-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" alt={article.title} />
            </Link>
            <div className="flex-1">
                <span className="text-red-700 text-[10px] font-bold uppercase mb-2 block tracking-widest">{article.categoryName}</span>
                <Link to={`/article/${article.slug}`}>
                    <h4 className="font-serif font-bold text-2xl mb-4 leading-tight hover:text-red-800 transition-colors">
                        {renderTitle()}
                    </h4>
                </Link>
                <div className={`text-sm text-gray-700 leading-relaxed mb-4 transition-all duration-500`}>
                    {renderContent()}
                </div>
                <p className="text-xs text-gray-400 font-bold mb-4">By {article.authorName} • {new Date(article.publishedAt).toLocaleDateString()}</p>
                <button
                    onClick={(e) => { e.preventDefault(); onToggle(); }}
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all duration-300 rounded-sm shadow-md hover:shadow-lg"
                >
                    {isExpanded ? '← Read Less' : 'Read More →'}
                </button>
            </div>
        </div>
    );
};
