import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Article, ArticleFormData, Category, Comment } from '../types';
import Quill from 'quill';

// Simple Modal Component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded-sm shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('editId');

  const [activeTab, setActiveTab] = useState<'articles' | 'categories' | 'comments' | 'settings'>('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Article Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<ArticleFormData & { id?: string }>({
    title: '', slug: '', excerpt: '', content: '', coverImage: '', categoryName: '', categoryId: '', tags: [], status: 'draft', publishedAt: new Date().toISOString(), source: ''
  });

  // Category Editor State
  const [newCategoryName, setNewCategoryName] = useState('');

  // Settings State
  const [tickerText, setTickerText] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Image Upload State
  const [useImageUpload, setUseImageUpload] = useState(false);

  // Quill Refs
  const quillRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<Quill | null>(null);

  useEffect(() => {
    // Auth Check
    if (!api.checkAuth()) {
      navigate('/login');
      return;
    }
    loadData();
  }, [navigate]);

  // Handle Deep Link for Editing
  useEffect(() => {
    if (editId && articles.length > 0) {
      const articleToEdit = articles.find(a => a.id === editId);
      if (articleToEdit) {
        handleEdit(articleToEdit);
        // Clean URL without reload using router
        navigate('/admin', { replace: true });
      }
    }
  }, [editId, articles, navigate]);

  // Init Quill when modal opens
  useEffect(() => {
    if (isEditing && quillRef.current && !editorInstanceRef.current) {
      editorInstanceRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        placeholder: 'Write your story here...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });

      // Handle Content Change
      editorInstanceRef.current.on('text-change', () => {
        if (editorInstanceRef.current) {
          const html = editorInstanceRef.current.root.innerHTML;
          setCurrentArticle(prev => ({ ...prev, content: html }));
        }
      });
    }

    // Load initial content if editing
    if (isEditing && editorInstanceRef.current && currentArticle.content) {
      // Check if empty or significantly different
      if (editorInstanceRef.current.root.innerHTML !== currentArticle.content) {
        editorInstanceRef.current.root.innerHTML = currentArticle.content;
      }
    }

    // Cleanup when modal closes
    if (!isEditing && editorInstanceRef.current) {
      editorInstanceRef.current = null;
    }

  }, [isEditing]);

  const loadData = async () => {
    const [arts, cats, comms, ticker] = await Promise.all([api.getArticles(), api.getCategories(), api.getAllComments(), api.getSetting('ticker_text')]);
    setArticles(arts);
    setCategories(cats);
    setComments(comms);
    setTickerText(ticker);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    await api.updateSetting('ticker_text', tickerText);
    setIsSavingSettings(false);
    alert('Settings saved!');
  };

  const handleLogout = () => {
    api.logout();
    navigate('/');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await api.deleteArticle(id);
      loadData();
    }
  };

  const handleEdit = (article: Article) => {
    setCurrentArticle(article);
    setUseImageUpload(false);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentArticle({
      title: '', slug: '', excerpt: '', content: '', coverImage: 'https://picsum.photos/800/600',
      categoryName: categories[0]?.name || '', categoryId: categories[0]?.id || '',
      tags: [], status: 'draft', publishedAt: new Date().toISOString(), source: ''
    });
    setUseImageUpload(false);
    setIsEditing(true);
  };

  const isShortNews = currentArticle.tags.includes('type:short');

  const toggleShortNews = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCurrentArticle(prev => {
      const newTags = prev.tags.filter(t => t !== 'type:short');
      if (checked) {
        newTags.push('type:short');
      }
      return { ...prev, tags: newTags };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentArticle.id) {
      await api.updateArticle(currentArticle.id, currentArticle);
    } else {
      await api.createArticle(currentArticle);
    }
    setIsEditing(false);
    loadData();
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setCurrentArticle(prev => ({
        ...prev,
        title: value,
        // Only auto-generate slug for new articles to avoid breaking links on existing ones
        slug: !prev.id ? generateSlug(value) : prev.slug
      }));
    } else if (name === 'categoryId') {
      const cat = categories.find(c => c.id === value);
      setCurrentArticle(prev => ({ ...prev, categoryId: value, categoryName: cat?.name || '' }));
    } else if (name === 'tags') {
      // Simple comma separated handling
      setCurrentArticle(prev => ({ ...prev, tags: value.split(',').map(t => t.trim()) }));
    } else {
      setCurrentArticle(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCurrentArticle(prev => ({ ...prev, coverImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Category Management Handlers
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      await api.createCategory(newCategoryName);
      setNewCategoryName('');
      loadData();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure? This does not delete articles in the category.")) {
      await api.deleteCategory(id);
      loadData();
    }
  };

  // Comment Handlers
  const handleApproveComment = async (id: string) => {
    await api.updateCommentStatus(id, 'approved');
    loadData();
  };

  const handleRejectComment = async (id: string) => {
    await api.updateCommentStatus(id, 'rejected');
    loadData();
  };

  const handleDeleteComment = async (id: string) => {
    if (window.confirm("Delete this comment permanently?")) {
      await api.deleteComment(id);
      loadData();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Editorial Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage content, users, and settings.</p>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={handleLogout} className="text-gray-500 font-bold text-sm hover:text-red-600 transition-colors">
            Sign Out
          </button>
          <button onClick={handleCreate} className="bg-black text-white px-6 py-3 font-bold text-sm uppercase hover:bg-red-700 transition-colors shadow-lg">
            + Create Article
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mb-8 border-b border-gray-100">
        <button
          onClick={() => setActiveTab('articles')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'articles' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-black'}`}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'categories' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-black'}`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'comments' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-black'}`}
        >
          Comments ({Array.isArray(comments) ? comments.filter(c => c.status === 'pending').length : 0})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'settings' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-black'}`}
        >
          Settings
        </button>
      </div>

      {/* Settings Tab Content */}
      {
        activeTab === 'settings' && (
          <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-8 max-w-2xl">
            <h3 className="text-xl font-bold mb-6">Site Configuration</h3>
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase mb-2 text-gray-500">Breaking News Ticker</label>
                <textarea
                  required
                  value={tickerText}
                  onChange={e => setTickerText(e.target.value)}
                  className="w-full border border-gray-300 p-3 text-sm rounded-sm outline-none focus:border-black min-h-[100px]"
                  placeholder="Enter breaking news items separated by •"
                />
                <p className="text-xs text-gray-400 mt-2">This text appears in the red scrolling bar at the top of the site.</p>
              </div>
              <button
                type="submit"
                disabled={isSavingSettings}
                className="bg-black text-white px-8 py-3 font-bold uppercase text-xs hover:bg-red-700 transition-colors shadow-lg disabled:opacity-50"
              >
                {isSavingSettings ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </div>
        )
      }

      {
        activeTab === 'articles' && (() => {
          // Filter articles based on selected category
          const filteredArticles = selectedCategory === 'all'
            ? articles
            : articles.filter(a => a.categoryId === selectedCategory);

          return (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                  <span className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Articles</span>
                  <span className="text-4xl font-serif font-bold">{filteredArticles.length}</span>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                  <span className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Views</span>
                  <span className="text-4xl font-serif font-bold">{filteredArticles.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()}</span>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                  <span className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Published</span>
                  <span className="text-4xl font-serif font-bold text-green-600">{filteredArticles.filter(a => a.status === 'published').length}</span>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                  <span className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Drafts</span>
                  <span className="text-4xl font-serif font-bold text-yellow-600">{filteredArticles.filter(a => a.status === 'draft').length}</span>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6 flex items-center gap-4">
                <label className="text-sm font-bold uppercase text-gray-500">Filter by Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-sm text-sm font-medium bg-white focus:border-black outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {selectedCategory !== 'all' && (
                  <span className="text-xs text-gray-500">
                    Showing {filteredArticles.length} of {articles.length} articles
                  </span>
                )}
              </div>

              {/* Articles Table */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs tracking-wider border-b border-gray-200">
                      <tr>
                        <th className="p-5">Article Info</th>
                        <th className="p-5">Category</th>
                        <th className="p-5">Author</th>
                        <th className="p-5">Status</th>
                        <th className="p-5">Views</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredArticles.map(article => (
                        <tr key={article.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="p-5">
                            <p className="font-bold text-gray-900 text-base">{article.title}</p>
                            <p className="text-gray-400 text-xs mt-1 truncate max-w-xs">{article.slug}</p>
                          </td>
                          <td className="p-5"><span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">{article.categoryName}</span></td>
                          <td className="p-5 text-gray-500 font-medium">{article.authorName}</td>
                          <td className="p-5">
                            <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${article.status === 'published' ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'}`}>
                              {article.status}
                            </span>
                          </td>
                          <td className="p-5 font-mono text-gray-500">{(article.views || 0).toLocaleString()}</td>
                          <td className="p-5 text-right">
                            <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(article)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold text-xs uppercase tracking-wide border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="text-red-600 hover:text-red-800 font-bold text-xs uppercase tracking-wide px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredArticles.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-400">
                            No articles found{selectedCategory !== 'all' ? ' in this category' : ''}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          );
        })()
      }

      {
        activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-8">
              <h3 className="text-xl font-bold mb-6">Create Category</h3>
              <form onSubmit={handleAddCategory} className="flex gap-4">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  className="flex-grow border border-gray-300 p-3 rounded-sm outline-none focus:border-black"
                  placeholder="Category Name"
                  required
                />
                <button type="submit" className="bg-black text-white px-6 font-bold uppercase text-sm rounded-sm hover:bg-gray-800">Add</button>
              </form>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Slug</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categories.map(cat => (
                    <tr key={cat.id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold">{cat.name}</td>
                      <td className="p-4 text-gray-500 font-mono text-xs">{cat.slug}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="text-red-600 hover:text-red-800 font-bold text-xs uppercase"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }

      {
        activeTab === 'comments' && (
          <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs tracking-wider border-b border-gray-200">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Comment</th>
                  <th className="p-4">Article</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Array.isArray(comments) && comments.map(comment => {
                  const article = articles.find(a => a.id === comment.articleId);
                  return (
                    <tr key={comment.id} className="hover:bg-gray-50">
                      <td className="p-4 align-top">
                        <div className="font-bold">{comment.userName}</div>
                        <div className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4 max-w-md">
                        <p className="text-gray-700">{comment.content}</p>
                        {comment.parentId && <span className="text-[10px] text-blue-500 uppercase font-bold mt-1 block">In Reply</span>}
                      </td>
                      <td className="p-4 align-top text-xs text-gray-500">
                        {article?.title || 'Unknown Article'}
                      </td>
                      <td className="p-4 align-top">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${comment.status === 'approved' ? 'bg-green-100 text-green-700' :
                          comment.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {comment.status}
                        </span>
                      </td>
                      <td className="p-4 text-right align-top">
                        <div className="flex flex-col gap-2 items-end">
                          {comment.status === 'pending' && (
                            <>
                              <button onClick={() => handleApproveComment(comment.id)} className="text-green-600 font-bold text-xs uppercase hover:underline">Approve</button>
                              <button onClick={() => handleRejectComment(comment.id)} className="text-red-600 font-bold text-xs uppercase hover:underline">Reject</button>
                            </>
                          )}
                          {comment.status === 'rejected' && (
                            <button onClick={() => handleApproveComment(comment.id)} className="text-green-600 font-bold text-xs uppercase hover:underline">Approve</button>
                          )}
                          <button onClick={() => handleDeleteComment(comment.id)} className="text-gray-400 font-bold text-[10px] uppercase hover:text-black mt-2">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {comments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">No comments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      }

      {/* Editor Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-black uppercase font-serif">{currentArticle.id ? 'Edit Article' : 'New Article'}</h2>
          {currentArticle.id && <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">ID: {currentArticle.id}</span>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Title</label>
                <input name="title" required value={currentArticle.title} onChange={handleChange} className="w-full border border-gray-300 p-3 text-lg font-serif font-bold rounded-sm focus:border-black outline-none" placeholder="Enter headline..." />
              </div>

              {/* Rich Text Editor Container */}
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Body Content</label>
                <div className="bg-white border border-gray-300 rounded-sm">
                  <div ref={quillRef} className="h-96"></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Use the toolbar to format your text. Images can be linked.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Excerpt (Summary)</label>
                <textarea name="excerpt" rows={3} required value={currentArticle.excerpt} onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:border-black outline-none" placeholder="Brief summary for list views..."></textarea>
              </div>
            </div>

            <div className="md:col-span-4 space-y-4 bg-gray-50 p-6 rounded-sm border border-gray-100 h-fit">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Publishing Status</label>
                <select name="status" value={currentArticle.status} onChange={handleChange} className="w-full border border-gray-300 p-2 text-sm rounded-sm bg-white">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="bg-white p-3 border border-gray-200 rounded-sm mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isShortNews}
                    onChange={toggleShortNews}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <div>
                    <span className="block text-sm font-bold">Short News</span>
                    <span className="text-[10px] text-gray-400">Mark as bite-sized content (ideal for Sports)</span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Category</label>
                <select name="categoryId" value={currentArticle.categoryId} onChange={handleChange} className="w-full border border-gray-300 p-2 text-sm rounded-sm bg-white">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Tags (Comma Separated)</label>
                <input name="tags" value={currentArticle.tags.join(', ')} onChange={handleChange} className="w-full border border-gray-300 p-2 text-sm rounded-sm bg-white" placeholder="News, Politics, Local..." />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Slug</label>
                <div className="flex gap-2">
                  <input name="slug" required value={currentArticle.slug} onChange={handleChange} className="w-full border border-gray-300 p-2 text-sm rounded-sm text-gray-600 bg-gray-100" />
                  <button type="button" onClick={() => setCurrentArticle(prev => ({ ...prev, slug: generateSlug(prev.title) }))} className="bg-gray-200 text-xs font-bold px-3 rounded hover:bg-gray-300 border border-gray-300">Generate</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Source / Copyright</label>
                <input name="source" value={currentArticle.source || ''} onChange={handleChange} className="w-full border border-gray-300 p-2 text-sm rounded-sm bg-white placeholder-gray-300" placeholder="e.g. AP News, Reuters, Courtesy of..." />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase text-gray-500">Cover Image</label>
                  <button type="button" onClick={() => setUseImageUpload(!useImageUpload)} className="text-[10px] text-blue-600 font-bold hover:underline">
                    {useImageUpload ? 'Use URL' : 'Upload File'}
                  </button>
                </div>

                {useImageUpload ? (
                  <input type="file" accept="image/*" onChange={handleImageFileChange} className="w-full text-xs text-gray-500" />
                ) : (
                  <input name="coverImage" value={currentArticle.coverImage} onChange={handleChange} className="w-full border border-gray-300 p-2 text-sm rounded-sm bg-white" placeholder="https://..." />
                )}

                {currentArticle.coverImage && (
                  <div className="mt-2 relative h-32 w-full overflow-hidden rounded-sm border border-gray-200">
                    <img src={currentArticle.coverImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 font-bold uppercase text-xs text-gray-500 hover:text-black transition-colors">Cancel</button>
            <button type="submit" className="bg-black text-white px-8 py-3 font-bold uppercase text-xs hover:bg-red-700 transition-colors shadow-lg">
              {currentArticle.id ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </form>
      </Modal>
    </div >
  );
};