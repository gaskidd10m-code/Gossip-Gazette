'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { api } from '../services/api';

interface Author {
    id: string;
    name: string;
    slug: string;
    bio?: string;
    photoUrl?: string;
    expertise?: string[];
}

export const AuthorDirectory: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getAllAuthors().then(fetchedAuthors => {
            setAuthors(fetchedAuthors);
            setLoading(false);
        });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            

            <h1 className="text-4xl font-bold mb-8 font-serif border-b border-black pb-4">Our Writers</h1>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {authors.map(author => (
                        <div key={author.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="bg-gray-100 h-32 relative">
                                {author.photoUrl ? (
                                    <img
                                        src={author.photoUrl}
                                        alt={author.name}
                                        className="h-24 w-24 rounded-full object-cover absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white"
                                    />
                                ) : (
                                    <div className="h-24 w-24 rounded-full bg-gray-300 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white flex items-center justify-center text-2xl font-bold text-gray-500">
                                        {author.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="pt-16 pb-6 px-6 text-center">
                                <Link href={`/author/${author.slug}`} className="text-xl font-bold hover:text-red-700 transition-colors">
                                    {author.name}
                                </Link>
                                {author.expertise && author.expertise.length > 0 && (
                                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                                        {author.expertise.slice(0, 3).map(exp => (
                                            <span key={exp} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {exp}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <p className="mt-4 text-gray-600 text-sm line-clamp-3">
                                    {author.bio}
                                </p>
                                <Link
                                    href={`/author/${author.slug}`}
                                    className="inline-block mt-4 text-red-700 font-bold text-sm uppercase tracking-wide hover:underline"
                                >
                                    View Profile →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};