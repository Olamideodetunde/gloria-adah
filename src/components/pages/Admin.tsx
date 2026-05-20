import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, CalendarCheck, MessageSquare,
  LogOut, Eye, EyeOff, Pencil, Trash2, Plus, Save,
  X, CheckCircle, Clock, BarChart3, Globe, GlobeLock,
  RefreshCw, ChevronDown, ChevronUp, Lock, Upload, ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const TOKEN_KEY = 'goa_admin_token';
const API = '/api';

function useAdminToken() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const save = (t: string) => { localStorage.setItem(TOKEN_KEY, t); setToken(t); };
  const clear = () => { localStorage.removeItem(TOKEN_KEY); setToken(''); };
  return { token, save, clear };
}

function authHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const cardIn = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const slideIn = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } };

interface Post {
  id: number; slug: string; title: string; excerpt: string; content: string;
  category: string; cover_image: string; author: string; is_published: boolean;
  published_at: string; created_at: string; updated_at: string;
}
interface Booking {
  id: number; ref_code: string; service_type: string; service_price: number;
  practice_area: string; appointment_date: string; appointment_time: string;
  client_name: string; client_email: string; client_phone: string;
  client_company: string; description: string; status: string; payment_status: string; created_at: string;
}
interface Contact {
  id: number; ref_code: string; name: string; email: string; phone: string;
  subject: string; message: string; status: string; created_at: string;
}
interface Stats {
  bookings: { total: number; confirmed: number };
  contacts: { total: number; unread: number };
  posts: { total: number; published: number };
}

const CATEGORIES = ['Insights', 'Corporate Law', 'Intellectual Property', 'Energy Law', 'Compliance', 'Tax', 'Property', 'Employment'];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function Admin() {
  const { token, save: saveToken, clear: clearToken } = useAdminToken();
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<'dashboard' | 'posts' | 'bookings' | 'contacts'>('dashboard');

  const [stats, setStats] = useState<Stats | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [savingPost, setSavingPost] = useState(false);
  const [postError, setPostError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const login = async () => {
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      saveToken(data.token);
    } catch (e: any) { setLoginError(e.message || 'Login failed'); }
    finally { setLoginLoading(false); }
  };

  const fetchAll = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [sRes, pRes, bRes, cRes] = await Promise.all([
        fetch(`${API}/admin/stats`, { headers: authHeaders(token) }),
        fetch(`${API}/posts/all`, { headers: authHeaders(token) }),
        fetch(`${API}/admin/bookings`, { headers: authHeaders(token) }),
        fetch(`${API}/admin/contacts`, { headers: authHeaders(token) })
      ]);
      if (sRes.status === 401) { clearToken(); return; }
      const [s, p, b, c] = await Promise.all([sRes.json(), pRes.json(), bRes.json(), cRes.json()]);
      setStats(s);
      setPosts(p.posts || []);
      setBookings(b.bookings || []);
      setContacts(c.contacts || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { if (token) fetchAll(); }, [token, fetchAll]);

  const deletePost = async (id: number) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    await fetch(`${API}/posts/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    setPosts(ps => ps.filter(p => p.id !== id));
  };

  const togglePublish = async (post: Post) => {
    const res = await fetch(`${API}/posts/${post.id}`, {
      method: 'PUT', headers: authHeaders(token),
      body: JSON.stringify({ ...post, is_published: !post.is_published })
    });
    const data = await res.json();
    setPosts(ps => ps.map(p => p.id === post.id ? data.post : p));
  };

  const savePost = async () => {
    if (!editingPost) return;
    setSavingPost(true);
    setPostError('');
    try {
      const isNew = !editingPost.id;
      const url = isNew ? `${API}/posts` : `${API}/posts/${editingPost.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method, headers: authHeaders(token),
        body: JSON.stringify(editingPost)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (isNew) setPosts(ps => [data.post, ...ps]);
      else setPosts(ps => ps.map(p => p.id === data.post.id ? data.post : p));
      setEditorOpen(false);
      setEditingPost(null);
    } catch (e: any) { setPostError(e.message); }
    finally { setSavingPost(false); }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setEditingPost(p => ({ ...p, cover_image: data.url }));
    } catch (e: any) {
      setUploadError(e.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const openNew = () => {
    setEditingPost({ title: '', slug: '', excerpt: '', content: '', category: 'Insights', cover_image: '', author: 'Gloria Ondah', is_published: false });
    setEditorOpen(true);
    setPostError('');
    setUploadError('');
  };

  const openEdit = (post: Post) => {
    setEditingPost({ ...post });
    setEditorOpen(true);
    setPostError('');
    setUploadError('');
  };

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="w-full max-w-sm bg-background border border-border p-10 shadow-xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-serif text-primary">Admin Access</h1>
            <p className="text-sm text-muted-foreground mt-1">Gloria Ondah & Associates</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); login(); }} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="rounded-none h-12"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2">{loginError}</p>
            )}
            <Button
              type="submit"
              disabled={loginLoading || !password}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-12 text-base"
            >
              {loginLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Sign In'}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">
            <a href="/" className="hover:text-primary transition-colors">← Back to website</a>
          </p>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'posts', label: 'Blog Posts', icon: FileText },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'contacts', label: 'Inquiries', icon: MessageSquare }
  ] as const;

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      <div className="bg-background border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-primary text-white flex items-center justify-center text-xs font-serif font-bold">G</div>
                <span className="text-sm font-bold text-primary hidden sm:block">GOA Admin</span>
              </div>
              <nav className="flex gap-1">
                {tabs.map(t => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-sm ${tab === t.id ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-primary'}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden md:inline">{t.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={fetchAll} disabled={loading} className="gap-2 text-muted-foreground">
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline text-xs">Refresh</span>
              </Button>
              <a href="/"><Button variant="ghost" size="sm" className="gap-2 text-muted-foreground text-xs"><Globe className="h-3.5 w-3.5" />View Site</Button></a>
              <Button variant="ghost" size="sm" onClick={clearToken} className="gap-2 text-muted-foreground text-xs">
                <LogOut className="h-3.5 w-3.5" />Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <AnimatePresence mode="wait">

          {tab === 'dashboard' && (
            <motion.div key="dashboard" initial="hidden" animate="visible" exit={{ opacity: 0 }} variants={stagger}>
              <motion.h2 variants={cardIn} className="text-2xl font-serif text-primary mb-8">Dashboard Overview</motion.h2>
              <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { label: 'Total Bookings', value: stats?.bookings.total ?? '—', sub: `${stats?.bookings.confirmed ?? 0} confirmed`, icon: CalendarCheck, color: 'text-primary' },
                  { label: 'Published Posts', value: stats?.posts.published ?? '—', sub: `${stats?.posts.total ?? 0} total`, icon: FileText, color: 'text-secondary' },
                  { label: 'New Inquiries', value: stats?.contacts.unread ?? '—', sub: `${stats?.contacts.total ?? 0} total`, icon: MessageSquare, color: 'text-primary' },
                  { label: 'Total Revenue', value: `₦${bookings.filter(b => b.payment_status === 'paid').reduce((s, b) => s + b.service_price, 0).toLocaleString()}`, sub: 'from paid bookings', icon: BarChart3, color: 'text-secondary' }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div key={i} variants={cardIn} className="bg-background border border-border p-6 hover:border-secondary/30 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <div className="text-3xl font-serif text-primary mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.sub}</div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div variants={cardIn} className="bg-background border border-border p-6">
                  <h3 className="font-serif text-primary text-lg mb-6 flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-secondary" /> Recent Bookings
                  </h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map(b => (
                      <div key={b.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <div className="font-medium text-sm text-primary">{b.client_name}</div>
                          <div className="text-xs text-muted-foreground">{b.service_type} · {b.appointment_date}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 font-medium ${b.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                    {bookings.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No bookings yet.</p>}
                  </div>
                </motion.div>

                <motion.div variants={cardIn} className="bg-background border border-border p-6">
                  <h3 className="font-serif text-primary text-lg mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-secondary" /> Recent Inquiries
                  </h3>
                  <div className="space-y-3">
                    {contacts.slice(0, 5).map(c => (
                      <div key={c.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <div className="font-medium text-sm text-primary">{c.name}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[220px]">{c.subject}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 font-medium ${c.status === 'unread' ? 'bg-blue-50 text-blue-700' : 'bg-muted text-muted-foreground'}`}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                    {contacts.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No inquiries yet.</p>}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {tab === 'posts' && (
            <motion.div key="posts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif text-primary">Blog Posts</h2>
                <Button onClick={openNew} className="bg-primary text-white rounded-none gap-2">
                  <Plus className="h-4 w-4" /> New Post
                </Button>
              </div>

              <AnimatePresence>
                {editorOpen && editingPost && (
                  <motion.div
                    key="editor"
                    variants={slideIn}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: 40 }}
                    className="bg-background border-2 border-primary/20 p-8 mb-8 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-serif text-primary">{editingPost.id ? 'Edit Post' : 'New Post'}</h3>
                      <Button variant="ghost" size="icon" onClick={() => setEditorOpen(false)}><X className="h-4 w-4" /></Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Title *</label>
                        <Input
                          value={editingPost.title || ''}
                          onChange={e => {
                            const title = e.target.value;
                            setEditingPost(p => ({ ...p, title, slug: p?.id ? p.slug : slugify(title) }));
                          }}
                          className="rounded-none h-11"
                          placeholder="Post title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Slug *</label>
                        <Input
                          value={editingPost.slug || ''}
                          onChange={e => setEditingPost(p => ({ ...p, slug: e.target.value }))}
                          className="rounded-none h-11 font-mono text-sm"
                          placeholder="post-url-slug"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Category</label>
                        <select
                          value={editingPost.category || 'Insights'}
                          onChange={e => setEditingPost(p => ({ ...p, category: e.target.value }))}
                          className="w-full h-11 px-3 border border-input bg-background focus:outline-none focus:ring-1 focus:ring-secondary text-sm"
                        >
                          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Author</label>
                        <Input
                          value={editingPost.author || ''}
                          onChange={e => setEditingPost(p => ({ ...p, author: e.target.value }))}
                          className="rounded-none h-11"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="text-sm font-medium text-foreground block mb-2">Cover Image</label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ''; }}
                        />
                        {editingPost.cover_image ? (
                          <div className="relative group border border-border">
                            <img src={editingPost.cover_image} alt="Cover preview" className="w-full h-28 object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-white text-xs bg-primary px-3 py-1.5 flex items-center gap-1"
                              >
                                <Upload className="h-3 w-3" /> Change
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingPost(p => ({ ...p, cover_image: '' }))}
                                className="text-white text-xs bg-red-600 px-3 py-1.5 flex items-center gap-1"
                              >
                                <X className="h-3 w-3" /> Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="w-full h-28 border-2 border-dashed border-border hover:border-secondary transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-secondary disabled:opacity-60"
                          >
                            {uploading ? (
                              <><RefreshCw className="h-5 w-5 animate-spin" /><span className="text-xs">Uploading…</span></>
                            ) : (
                              <><ImageIcon className="h-5 w-5" /><span className="text-xs font-medium">Click to upload image</span><span className="text-[10px]">JPG, PNG, WEBP · max 8 MB</span></>
                            )}
                          </button>
                        )}
                        {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-sm font-medium text-foreground block mb-2">Excerpt</label>
                      <Textarea
                        value={editingPost.excerpt || ''}
                        onChange={e => setEditingPost(p => ({ ...p, excerpt: e.target.value }))}
                        className="rounded-none resize-none h-20"
                        placeholder="Brief summary shown on the blog listing page"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="text-sm font-medium text-foreground block mb-2">
                        Content <span className="text-muted-foreground font-normal text-xs ml-2">Supports Markdown (## Heading, **bold**, - list, {'>'} quote)</span>
                      </label>
                      <Textarea
                        value={editingPost.content || ''}
                        onChange={e => setEditingPost(p => ({ ...p, content: e.target.value }))}
                        className="rounded-none resize-y min-h-[320px] font-mono text-sm"
                        placeholder="Write your article content here using Markdown..."
                      />
                    </div>

                    {postError && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 mb-4">{postError}</p>}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!editingPost.is_published}
                          onChange={e => setEditingPost(p => ({ ...p, is_published: e.target.checked }))}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium text-foreground">Publish immediately</span>
                      </label>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setEditorOpen(false)} className="rounded-none border-border">Cancel</Button>
                        <Button onClick={savePost} disabled={savingPost} className="bg-primary text-white rounded-none gap-2">
                          {savingPost ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          {savingPost ? 'Saving...' : 'Save Post'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-3">
                <AnimatePresence>
                  {posts.map(post => (
                    <motion.div
                      key={post.id}
                      variants={cardIn}
                      exit={{ opacity: 0, scale: 0.95, height: 0 }}
                      className="bg-background border border-border hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-center justify-between p-5 gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          {post.cover_image && (
                            <img src={post.cover_image} alt="" className="w-12 h-12 object-cover shrink-0 bg-muted" />
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h4 className="font-medium text-primary text-sm truncate max-w-[300px]">{post.title}</h4>
                              <span className={`text-xs px-2 py-0.5 font-medium ${post.is_published ? 'bg-green-50 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                                {post.is_published ? 'Published' : 'Draft'}
                              </span>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5">{post.category}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{formatDate(post.created_at)} · {post.author}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            variant="ghost" size="icon"
                            onClick={() => togglePublish(post)}
                            title={post.is_published ? 'Unpublish' : 'Publish'}
                            className={`h-8 w-8 ${post.is_published ? 'text-green-600 hover:text-red-500' : 'text-muted-foreground hover:text-green-600'}`}
                          >
                            {post.is_published ? <Globe className="h-4 w-4" /> : <GlobeLock className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openEdit(post)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setExpandedId(expandedId === post.id ? null : post.id)} className="h-8 w-8 text-muted-foreground">
                            {expandedId === post.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedId === post.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-border"
                          >
                            <div className="p-5 text-sm text-muted-foreground bg-muted/30">
                              <p className="mb-2"><strong>Excerpt:</strong> {post.excerpt || '—'}</p>
                              <p><strong>Slug:</strong> <code className="bg-muted px-1.5 py-0.5 text-xs font-mono">{post.slug}</code></p>
                              {post.is_published && (
                                <a href={`/insights/${post.slug}`} className="inline-flex items-center gap-1 mt-3 text-xs text-secondary font-medium hover:underline">
                                  <Eye className="h-3 w-3" /> Preview on site
                                </a>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {posts.length === 0 && !loading && (
                  <div className="text-center py-16 text-muted-foreground border border-dashed border-border">
                    <FileText className="h-8 w-8 mx-auto mb-3 opacity-30" />
                    <p>No posts yet. Create your first blog post above.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {tab === 'bookings' && (
            <motion.div key="bookings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-serif text-primary mb-8">All Bookings</h2>
              <div className="space-y-3">
                {bookings.map(b => (
                  <motion.div key={b.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-background border border-border">
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-mono text-xs font-bold text-primary">{b.ref_code}</span>
                            <span className={`text-xs px-2 py-0.5 font-medium ${b.status === 'confirmed' ? 'bg-green-50 text-green-700' : b.status === 'awaiting_payment' ? 'bg-yellow-50 text-yellow-700' : 'bg-muted text-muted-foreground'}`}>
                              {b.status}
                            </span>
                            <span className={`text-xs px-2 py-0.5 font-medium ${b.payment_status === 'paid' ? 'bg-green-50 text-green-700' : b.payment_status === 'free' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}`}>
                              {b.payment_status === 'free' ? 'Free' : b.payment_status === 'paid' ? `₦${b.service_price.toLocaleString()} paid` : 'Payment pending'}
                            </span>
                          </div>
                          <h4 className="font-medium text-primary mt-2">{b.client_name}</h4>
                          <p className="text-sm text-muted-foreground">{b.client_email} · {b.client_phone}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-primary">{b.service_type}</div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                            <CalendarCheck className="h-3.5 w-3.5" />
                            {b.appointment_date} at {b.appointment_time}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Booked {formatDate(b.created_at)}</div>
                        </div>
                      </div>
                      {b.description && (
                        <p className="text-sm text-muted-foreground bg-muted/30 px-4 py-2 border-l-2 border-secondary/30 mt-2 line-clamp-2">
                          {b.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
                {bookings.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground border border-dashed border-border">
                    <CalendarCheck className="h-8 w-8 mx-auto mb-3 opacity-30" />
                    <p>No bookings yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {tab === 'contacts' && (
            <motion.div key="contacts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-serif text-primary mb-8">Contact Inquiries</h2>
              <div className="space-y-3">
                {contacts.map(c => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    className={`bg-background border transition-colors ${c.status === 'unread' ? 'border-primary/30' : 'border-border'}`}>
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-mono text-xs font-bold text-primary">{c.ref_code}</span>
                            {c.status === 'unread' && (
                              <span className="text-xs px-2 py-0.5 font-medium bg-blue-50 text-blue-700 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Unread
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium text-primary mt-2">{c.name}</h4>
                          <p className="text-sm text-muted-foreground">{c.email} · {c.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {c.status === 'unread' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs gap-1 rounded-none"
                              onClick={async () => {
                                await fetch(`${API}/admin/contacts/${c.id}/status`, {
                                  method: 'PATCH', headers: authHeaders(token),
                                  body: JSON.stringify({ status: 'read' })
                                });
                                setContacts(cs => cs.map(x => x.id === c.id ? { ...x, status: 'read' } : x));
                              }}
                            >
                              <CheckCircle className="h-3 w-3" /> Mark read
                            </Button>
                          )}
                          <a href={`mailto:${c.email}?subject=Re: ${c.subject}`}>
                            <Button size="sm" className="text-xs rounded-none bg-primary text-white gap-1">Reply</Button>
                          </a>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-2">{c.subject}</p>
                      <p className="text-sm text-muted-foreground bg-muted/30 px-4 py-3 border-l-2 border-secondary/30">
                        {c.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">{formatDate(c.created_at)}</p>
                    </div>
                  </motion.div>
                ))}
                {contacts.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground border border-dashed border-border">
                    <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-30" />
                    <p>No inquiries yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
