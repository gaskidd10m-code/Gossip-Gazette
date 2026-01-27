import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Article, Comment } from '../types';
import { api } from '../services/api';

interface CommentProps {
  comment: Comment;
  replies: Comment[];
  allComments: Comment[];
  onReply: (parentId: string) => void;
  replyingTo: string | null;
  submitReply: (e: React.FormEvent, parentId: string) => void;
  replyContent: string;
  setReplyContent: (s: string) => void;
  replyName: string;
  setReplyName: (s: string) => void;
  submitting: boolean;
}

const CommentItem: React.FC<CommentProps> = ({
  comment, replies, allComments, onReply, replyingTo, submitReply,
  replyContent, setReplyContent, replyName, setReplyName, submitting
}) => {
  return (
    <div className="flex gap-4 border-l-2 border-gray-100 pl-4 mb-6 relative">
      <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-gray-500 text-xs">
        {comment.userName.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <p className="font-bold text-sm">{comment.userName}</p>
          <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700 text-sm mb-2">{comment.content}</p>

        <button
          onClick={() => onReply(comment.id)}
          className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wider mb-2"
        >
          Reply
        </button>

        {replyingTo === comment.id && (
          <form onSubmit={(e) => submitReply(e, comment.id)} className="mt-2 mb-4 bg-gray-50 p-4 rounded border border-gray-200">
            <input
              value={replyName}
              onChange={e => setReplyName(e.target.value)}
              className="w-full border p-2 text-xs rounded mb-2"
              placeholder="Your Name"
              required
            />
            <textarea
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              className="w-full border p-2 rounded text-xs h-16 mb-2"
              placeholder="Write a reply..."
              required
            ></textarea>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => onReply('')} className="text-xs font-bold text-gray-500">Cancel</button>
              <button type="submit" disabled={submitting} className="bg-black text-white text-xs font-bold px-3 py-1 rounded">
                {submitting ? '...' : 'Reply'}
              </button>
            </div>
          </form>
        )}

        {/* Nested Replies */}
        {replies.length > 0 && (
          <div className="mt-4">
            {replies.map(reply => (
              <CommentItem
                key={reply.id}
                comment={reply}
                replies={allComments.filter(c => c.parentId === reply.id && c.status === 'approved')}
                allComments={allComments}
                onReply={onReply}
                replyingTo={replyingTo}
                submitReply={submitReply}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                replyName={replyName}
                setReplyName={setReplyName}
                submitting={submitting}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showPendingMsg, setShowPendingMsg] = useState(false);

  // Reply State
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyName, setReplyName] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const isAdmin = api.checkAuth();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      api.getArticleBySlug(slug)
        .then(async (data) => {
          setArticle(data);
          if (data) {
            const coms = await api.getComments(data.id);
            // Only show approved comments
            setComments(coms.filter(c => c.status === 'approved'));
          }
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article?.title || '');
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCommentSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!article) return;

    // Determine content source based on reply or root comment
    const name = parentId ? replyName : userName;
    const content = parentId ? replyContent : newComment;

    if (!content.trim() || !name.trim()) return;

    setSubmittingComment(true);
    await api.addComment({
      articleId: article.id,
      userId: 'guest-' + Math.floor(Math.random() * 1000),
      userName: name,
      content: content,
      parentId: parentId
    });

    // Show pending message instead of adding to list immediately
    setShowPendingMsg(true);
    setTimeout(() => setShowPendingMsg(false), 5000);

    if (parentId) {
      setReplyingTo(null);
      setReplyContent('');
      setReplyName('');
    } else {
      setNewComment('');
      setUserName('');
    }
    setSubmittingComment(false);
  };

  if (loading) return <div className="text-center py-20 font-serif">Loading Story...</div>;
  if (!article) return <div className="text-center py-20 font-serif text-red-600">Article not found.</div>;

  // Root comments are those without a parentId
  const rootComments = comments.filter(c => !c.parentId);

  return (
    <article className="max-w-7xl mx-auto relative">
      <Helmet>
        <title>{article.title} - Gossip Gazette</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://gossipgazette.online/article/${article.slug}`} />

        {/* Structured Data for SEO (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "description": article.excerpt,
            "image": `https://gossipgazette.online${article.coverImage}`,
            "datePublished": article.publishedAt,
            "dateModified": article.publishedAt,
            "author": {
              "@type": "Person",
              "name": article.authorName,
              "url": article.authorSlug ? `https://gossipgazette.online/author/${article.authorSlug}` : undefined
            },
            "publisher": {
              "@type": "Organization",
              "name": "Gossip Gazette",
              "logo": {
                "@type": "ImageObject",
                "url": "https://gossipgazette.online/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://gossipgazette.online/article/${article.slug}`
            }
          })}
        </script>
      </Helmet>
      {/* Admin Quick Edit Button */}
      {isAdmin && (
        <div className="fixed bottom-8 right-8 z-50">
          <Link
            to={`/admin?editId=${article.id}`}
            className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-2xl hover:bg-red-700 transition-colors"
            title="Edit This Article"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </Link>
        </div>
      )}

      {/* Two-Column Layout: Image on Left, Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
        {/* Left Column: Featured Image (Sticky) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <figure className="mb-4 md:mb-0">
              <img src={article.coverImage} alt={article.title} className="w-full h-auto max-h-[400px] md:max-h-[500px] lg:max-h-[700px] object-cover object-top rounded-sm shadow-xl" />
              <figcaption className="text-xs text-gray-400 text-left mt-3 italic">
                <span>Image source: Picsum Photos</span>
                {article.source && (
                  <>
                    <span> • </span>
                    <span className="font-bold text-gray-600 uppercase not-italic">Source: {article.source}</span>
                  </>
                )}
              </figcaption>
            </figure>

            {/* Social Share Sidebar */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
              <span className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Share Article</span>
              <div className="flex gap-2 md:gap-3">
                <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-colors font-serif font-bold text-sm" title="Share on Facebook">f</button>
                <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors font-serif font-bold text-sm" title="Share on Twitter">t</button>
                <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors font-serif font-bold text-sm" title="Share on LinkedIn">in</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Article Content */}
        <div className="lg:col-span-7">
          {/* Header Info */}
          <header className="mb-6 md:mb-8">
            <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
              {article.tags.map(tag => (
                <span key={tag} className="bg-red-50 text-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">{tag}</span>
              ))}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight mb-4 md:mb-6">
              {article.title}
            </h1>

            <p className="font-serif text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-4 md:mb-6">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-200">
              <div>
                <p className="font-bold text-sm font-sans uppercase">
                  By{' '}
                  {article.authorSlug ? (
                    <Link to={`/author/${article.authorSlug}`} className="text-red-700 hover:underline">
                      {article.authorName}
                    </Link>
                  ) : (
                    <span className="text-red-700">{article.authorName}</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })} • 5 min read
                </p>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="font-serif text-base md:text-lg leading-7 md:leading-8 text-gray-800 space-y-4 md:space-y-6 [&>p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:text-5xl md:[&>p:first-of-type::first-letter]:text-7xl [&>p:first-of-type::first-letter]:pr-3 md:[&>p:first-of-type::first-letter]:pr-4 [&>p:first-of-type::first-letter]:font-black [&>p:first-of-type::first-letter]:leading-[0.8] [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Source Attribution */}
          {article.source && (
            <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-500 font-sans">
              <span className="font-bold uppercase tracking-wider">Original Source:</span> {article.source}
            </div>
          )}

          {/* Subscribe CTA */}
          <div className="mt-8 md:mt-12 p-6 md:p-8 bg-gray-50 border-l-4 border-red-700 rounded-sm">
            <h4 className="font-bold mb-2">Subscribe to continue reading</h4>
            <p className="text-sm text-gray-600 mb-4">Support independent journalism. Get unlimited access to Gossip Gazette.</p>
            <button className="bg-black text-white px-6 py-2 text-sm font-bold uppercase hover:bg-gray-800 transition-colors">Subscribe Now</button>
          </div>
        </div>
      </div>

      {/* Functional Comments Section with Threading */}
      <div className="mt-16 pt-8 border-t border-gray-200 max-w-2xl mx-auto">
        <h3 className="font-bold text-xl mb-6">Comments ({comments.length})</h3>

        {/* Main Comment Form */}
        <form onSubmit={(e) => handleCommentSubmit(e)} className="mb-10 bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase mb-1">Name</label>
            <input
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full border p-2 text-sm rounded"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase mb-1">Comment</label>
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-sm h-24"
              placeholder="Join the discussion..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submittingComment}
            className="bg-blue-600 text-white px-4 py-2 text-sm font-bold rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submittingComment ? 'Posting...' : 'Post Comment'}
          </button>

          {showPendingMsg && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 text-sm font-bold border border-green-200 rounded">
              Thank you! Your comment has been submitted for moderation.
            </div>
          )}
        </form>

        <div className="space-y-4">
          {rootComments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={comments.filter(c => c.parentId === comment.id)}
              allComments={comments}
              onReply={(id) => {
                setReplyingTo(id);
                setReplyName('');
                setReplyContent('');
              }}
              replyingTo={replyingTo}
              submitReply={handleCommentSubmit}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              replyName={replyName}
              setReplyName={setReplyName}
              submitting={submittingComment}
            />
          ))}
          {comments.length === 0 && (
            <p className="text-center text-gray-400 text-sm italic">No approved comments yet. Be the first to share your thoughts.</p>
          )}
        </div>
      </div>
    </article>
  );
};