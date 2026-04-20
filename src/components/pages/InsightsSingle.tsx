import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Tag, Clock, User, Linkedin } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { routes } from '../shared/routes';
import { Button } from '@/components/ui/button';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string;
  author: string;
  published_at: string;
}

function simpleMarkdown(md: string): string {
  return md
    .split('\n')
    .map(line => {
      if (line.startsWith('## ')) return `<h2 class="text-2xl font-serif text-primary mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3 class="text-xl font-serif text-primary mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith('> ')) return `<blockquote class="border-l-4 border-secondary pl-6 italic my-8 text-xl text-primary/80 leading-relaxed">${line.slice(2)}</blockquote>`;
      if (line.startsWith('- ')) return `<li class="ml-6 mb-2 text-muted-foreground">${renderInline(line.slice(2))}</li>`;
      if (line.trim() === '') return '<div class="my-4"></div>';
      return `<p class="text-muted-foreground leading-relaxed mb-4">${renderInline(line)}</p>`;
    })
    .join('\n')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul class="list-disc my-4">${m}</ul>`);
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-muted px-1.5 py-0.5 text-sm font-mono">$1</code>');
}

export function InsightsSingle({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then(d => { if (d) setPost(d.post); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  if (loading) {
    return (
      <PageShell title="Loading..." breadcrumbs={[{ label: 'Insights', href: routes.insights }]}>
        <div className="container mx-auto px-6 py-24 max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="aspect-[21/9] bg-muted rounded" />
            {[1,2,3,4].map(i => <div key={i} className="h-4 bg-muted rounded" />)}
          </div>
        </div>
      </PageShell>
    );
  }

  if (notFound || !post) {
    return (
      <PageShell title="Article Not Found" breadcrumbs={[{ label: 'Insights', href: routes.insights }]}>
        <div className="container mx-auto px-6 py-24 text-center max-w-xl">
          <p className="text-muted-foreground mb-8">This article could not be found or may have been removed.</p>
          <a href={routes.insights}><Button>Back to Insights</Button></a>
        </div>
      </PageShell>
    );
  }

  const shareUrl = window.location.href;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      <PageShell title={post.title} breadcrumbs={[{ label: 'Insights', href: routes.insights }, { label: post.category }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 font-bold text-secondary uppercase tracking-widest text-xs">
                    <Tag className="h-3 w-3" />{post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(post.published_at)}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <User className="h-3.5 w-3.5" />{post.author}
                  </span>
                </div>
                <div className="flex gap-2">
                  <a href={linkedinUrl} target="_blank" rel="noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-[#0077b5]">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </a>
                  <Button
                    variant="ghost" size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => navigator.share?.({ title: post.title, url: shareUrl })}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="aspect-[21/9] w-full bg-muted mb-12 overflow-hidden">
                <img
                  src={post.cover_image || '/images/insight-1.png'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {post.excerpt && (
                <p className="text-xl text-primary/80 font-medium leading-relaxed mb-10 pb-10 border-b border-border">
                  {post.excerpt}
                </p>
              )}

              <div
                className="min-h-[400px]"
                dangerouslySetInnerHTML={{ __html: simpleMarkdown(post.content) }}
              />

              <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border-2 border-border">
                    <img src="/images/gloria.png" alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-primary">{post.author}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">Principal Partner, GOA</div>
                  </div>
                </div>
                <a href={routes.insights}>
                  <Button variant="outline" className="gap-2 rounded-none border-border">
                    <ArrowLeft className="h-4 w-4" /> Back to Insights
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
