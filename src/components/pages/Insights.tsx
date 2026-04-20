import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Rss, Tag, Clock } from 'lucide-react';
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
}

const CATEGORIES = ['All', 'Corporate Law', 'Intellectual Property', 'Energy Law', 'Compliance', 'Tax', 'Property'];

export function Insights() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(d => setPosts(d.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
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
              className="flex flex-wrap items-center gap-3 mb-16 pb-8 border-b border-border"
            >
              <Rss className="h-4 w-4 text-secondary" />
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 border ${activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary bg-background'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

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
                <p className="text-lg">No articles in this category yet.</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

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
                          />
                        </div>
                        <div className="p-10 lg:p-14 flex flex-col justify-center bg-background">
                          <div className="flex items-center gap-3 mb-6">
                            <span className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-secondary uppercase">
                              <Tag className="h-3 w-3" />{featured.category}
                            </span>
                            <span className="text-muted-foreground text-xs">•</span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(featured.published_at)}
                            </span>
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
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                            />
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold tracking-widest text-secondary uppercase">{post.category}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(post.published_at)}</span>
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
