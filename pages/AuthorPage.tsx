import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../services/api';
import { Author, Article } from '../types';

export const AuthorPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [author, setAuthor] = useState<Author | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthorData = async () => {
            if (!slug) return;

            setLoading(true);
            try {
                const authorData = await api.getAuthor(slug);
                const authorArticles = await api.getAuthorArticles(slug);

                setAuthor(authorData);
                setArticles(authorArticles);
            } catch (error) {
                console.error('Error fetching author:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-gray-500">Loading author profile...</div>
            </div>
        );
    }

    if (!author) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Author Not Found</h1>
                <p className="text-gray-600">The author you're looking for doesn't exist.</p>
                <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <Helmet>
                <title>{author.name} - Author Profile | Gossip Gazette</title>
                <meta name="description" content={author.bio || `Read articles by ${author.name} on Gossip Gazette`} />
                <link rel="canonical" href={`https://gossipgazette.online/author/${author.slug}`} />
            </Helmet>

            {/* Author Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Author Photo */}
                    <div className="flex-shrink-0">
                        <img
                            src={author.photoUrl || '/placeholder-author.jpg'}
                            alt={author.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                        />
                    </div>

                    {/* Author Info */}
                    <div className="flex-grow">
                        <h1 className="text-4xl font-bold mb-2">{author.name}</h1>

                        {/* Expertise Tags */}
                        {author.expertise && author.expertise.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {author.expertise.map((exp, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full"
                                    >
                                        {exp}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Bio */}
                        <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                            {author.bio || 'No bio available.'}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 items-center">
                            {author.email && (
                                <a
                                    href={`mailto:${author.email}`}
                                    className="text-gray-600 hover:text-red-700 transition-colors"
                                    title="Email"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </a>
                            )}
                            {author.twitterUrl && (
                                <a
                                    href={author.twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-red-700 transition-colors text-sm font-semibold"
                                    title="Twitter/X"
                                >
                                    Twitter
                                </a>
                            )}
                            {author.linkedinUrl && (
                                <a
                                    href={author.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-red-700 transition-colors text-sm font-semibold"
                                    title="LinkedIn"
                                >
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Articles Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6">
                    Articles by {author.name} ({articles.length})
                </h2>

                {articles.length === 0 ? (
                    <p className="text-gray-600">No articles published yet.</p>
                ) : (
                    <div className="grid gap-6">
                        {articles.map((article) => (
                            <article
                                key={article.id}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <Link to={`/article/${article.slug}`} className="flex flex-col md:flex-row">
                                    {/* Article Image */}
                                    <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                                        <img
                                            src={article.coverImage}
                                            alt={article.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Article Content */}
                                    <div className="p-6 flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-semibold text-red-700 uppercase tracking-wider">
                                                {article.categoryName}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <time className="text-xs text-gray-500">
                                                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 hover:text-red-700 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
