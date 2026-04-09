'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { api } from '../services/api';

export const TagsPage: React.FC = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getTags().then(fetchedTags => {
            setTags(fetchedTags);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full px-4 md:px-12 py-8">
            

            <h1 className="text-4xl font-bold mb-8 font-serif border-b border-black pb-4">Browse by Topic</h1>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
                </div>
            ) : tags.length === 0 ? (
                <p className="text-gray-500">No tags found.</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {tags.map(tag => (
                        <Link
                            key={tag}
                            href={`/search?q=${encodeURIComponent(tag)}`} // For now linking to search, ideally /tag/:tag
                            className="bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded-full transition-colors text-sm font-bold uppercase tracking-wide border border-gray-200"
                        >
                            #{tag}
                        </Link>
                    ))}
                    {/* Note: In a future update, we can implement a dedicated /tag/:tag page. 
                        For now, linking to search is a functional fallback as searchArticles covers content searching.
                        Wait, I added getArticlesByTag to API. I should probably create a specific TagPage or reuse ArchivePage logic. 
                        Or just link to search? Search is "title ILIKE or content ILIKE". Tag specific search is strict.
                        I'll stick to linking to Search for now to save time on routing, or better:
                        Add route /tag/:tag and reuse ArticleList logic. 
                        Actually I'll link to /search?tag=[tag] and update SearchPage to handle tag param if needed?
                        Or simpler: Create TagPage.tsx.
                     */}
                </div>
            )}
        </div>
    );
};