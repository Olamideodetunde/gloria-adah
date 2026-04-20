import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Rss, Tag, Clock, Search, X } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { getInsightRoute } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  author: string;
  published_at: string;
  content?: string;
}

const CATEGORIES = ['All', 'Corporate Law', 'Intellectual Property', 'Energy Law', 'Compliance', 'Tax', 'Property', 'Employment'];

function readingTime(content?: string): number {
  if (!content) return 3;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function Insights() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(d => setPosts(d.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch = !q || p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const [featured, ...regular] = filtered;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <>
      <PageShell title="Insights & News" breadcrumbs={[{ label: 'Insights' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-11 pr-10 py-3 h-12 border border-input bg-background focus:outline-none focus:ring-1 focus:ring-secondary text-sm"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap pb-8 border-b border-border">
                <Rss className="h-4 w-4 text-secondary shrink-0" />
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 border whitespace-nowrap ${activeCategory === cat
                      ? 'bg-primary text-white border-primary'
                      : 'border-border text-muted-foreground hover:border-primary hover:text-primary bg-background'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {search && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mb-8">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<strong className="text-foreground">{search}</strong>"
              </motion.p>
            )}

            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/3] bg-muted mb-4" />
                    <div className="h-4 bg-muted rounded mb-2 w-24" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 text-muted-foreground"
              >
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">{search ? 'No articles match your search.' : 'No articles in this category yet.'}</p>
                {search && <button onClick={() => setSearch('')} className="mt-4 text-secondary underline text-sm">Clear search</button>}
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={`${activeCategory}-${search}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

                  {featured && (
                    <motion.a
                      href={getInsightRoute(featured.slug)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="group block mb-20"
                    >
                      <div className="grid lg:grid-cols-2 gap-0 border border-border hover:border-secondary/50 transition-colors overflow-hidden">
                        <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-muted">
                          <img
                            src={featured.cover_image || '/images/insight-1.png'}
                            alt={featured.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-10 lg:p-14 flex flex-col justify-center bg-background">
                          <div className="flex items-center gap-3 mb-6 flex-wrap">
                            <span className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-secondary uppercase">
                              <Tag className="h-3 w-3" />{featured.category}
                            </span>
                            <span className="text-muted-foreground text-xs">•</span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(featured.published_at)}
                            </span>
                            <span className="text-xs text-muted-foreground">{readingTime(featured.content)} min read</span>
                          </div>
                          <h2 className="text-3xl lg:text-4xl font-serif text-primary mb-5 leading-tight group-hover:text-secondary transition-colors duration-300">
                            {featured.title}
                          </h2>
                          <p className="text-muted-foreground text-base mb-8 leading-relaxed line-clamp-3">
                            {featured.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary group-hover:text-secondary transition-colors">
                            Read Article <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  )}

                  {regular.length > 0 && (
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {regular.map((post) => (
                        <motion.a
                          key={post.id}
                          href={getInsightRoute(post.slug)}
                          variants={fadeInUp}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.3 }}
                          className="group block"
                        >
                          <div className="overflow-hidden bg-muted aspect-[4/3] mb-5">
                            <img
                              src={post.cover_image || '/images/insight-1.png'}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className="text-xs font-bold tracking-widest text-secondary uppercase">{post.category}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(post.published_at)}</span>
                            <span className="text-xs text-muted-foreground">{readingTime(post.content)} min read</span>
                          </div>
                          <h4 className="text-xl font-serif text-primary leading-snug mb-3 group-hover:text-secondary transition-colors duration-200">
                            {post.title}
                          </h4>
                          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary/60 group-hover:text-secondary transition-colors">
                            Read more <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
