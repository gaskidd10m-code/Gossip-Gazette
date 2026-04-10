'use client';

import React, { useEffect, useState } from 'react';
import { Article, Comment } from '../../../types';
import { api } from '../../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  article: Article;
  showShareOnly?: boolean;
  showCommentsOnly?: boolean;
}

interface CommentItemProps {
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

const CommentItem: React.FC<CommentItemProps> = ({
  comment, replies, allComments, onReply, replyingTo, submitReply,
  replyContent, setReplyContent, replyName, setReplyName, submitting
}) => (
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
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => onReply('')} className="text-xs font-bold text-gray-500">Cancel</button>
            <button type="submit" disabled={submitting} className="bg-black text-white text-xs font-bold px-3 py-1 rounded">
              {submitting ? '...' : 'Reply'}
            </button>
          </div>
        </form>
      )}
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

export default function ArticleClientParts({ article, showShareOnly, showCommentsOnly }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showPendingMsg, setShowPendingMsg] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyName, setReplyName] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const isAdmin = typeof window !== 'undefined' ? api.checkAuth() : false;

  useEffect(() => {
    api.getComments(article.id).then(coms => {
      setComments(coms.filter(c => c.status === 'approved'));
    });
  }, [article.id]);

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const handleCommentSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    const name = parentId ? replyName : userName;
    const content = parentId ? replyContent : newComment;
    if (!content.trim() || !name.trim()) return;

    setSubmittingComment(true);
    await api.addComment({
      articleId: article.id,
      userId: 'guest-' + Math.floor(Math.random() * 1000),
      userName: name,
      content,
      parentId,
    });

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

  const rootComments = comments.filter(c => !c.parentId);

  // ── Share Sidebar ─────────────────────────────────────────────────────────
  if (showShareOnly) {
    return (
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
        <span className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Share Article</span>
        <div className="flex gap-2 md:gap-3">
          <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-colors font-serif font-bold text-sm" title="Share on Facebook">f</button>
          <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors font-serif font-bold text-sm" title="Share on Twitter">t</button>
          <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors font-serif font-bold text-sm" title="Share on LinkedIn">in</button>
        </div>
        {/* Admin Quick Edit removed */}
      </div>
    );
  }

  // ── Comments Section ──────────────────────────────────────────────────────
  if (showCommentsOnly) {
    return (
      <div className="mt-16 pt-8 border-t border-gray-200 max-w-2xl mx-auto">
        <h3 className="font-bold text-xl mb-6">Comments ({comments.length})</h3>

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
            />
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
              onReply={(id) => { setReplyingTo(id); setReplyName(''); setReplyContent(''); }}
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
    );
  }

  return null;
}
