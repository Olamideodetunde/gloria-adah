import React from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { SectionHeader } from '../shared/SectionHeader';
import { getInsightRoute } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

const articles = [
  { slug: "sample-article", category: "Corporate Law", date: "Oct 12, 2023", title: "Filing Annual Returns with the CAC: A 2026 Guide", excerpt: "Understanding the timeline, requirements, and penalties associated with Corporate Affairs Commission annual returns for Nigerian businesses.", image: "insight-1.png", featured: true },
  { slug: "trademark-protection", category: "IP", date: "Sep 28, 2023", title: "Trademark Protection for Nigerian Startups", excerpt: "Why securing your brand identity early is crucial for tech startups and how to navigate the Nigerian trademark registry.", image: "insight-2.png", featured: false },
  { slug: "nuprc-compliance", category: "Energy Law", date: "Aug 15, 2023", title: "Navigating NUPRC Compliance for Indigenous Operators", excerpt: "A breakdown of recent regulatory changes affecting local content requirements in the Nigerian oil and gas sector.", image: "insight-3.png", featured: false },
  { slug: "employment-contracts", category: "Compliance", date: "Jul 02, 2023", title: "Essential Clauses for Remote Work Contracts", excerpt: "How to draft employment agreements that protect your company while accommodating hybrid and remote work models.", image: "insight-1.png", featured: false },
  { slug: "tax-clearance", category: "Tax", date: "Jun 18, 2023", title: "Obtaining Your Tax Clearance Certificate (TCC)", excerpt: "Step-by-step guidance on securing your TCC and its importance for participating in public tenders.", image: "insight-2.png", featured: false },
  { slug: "real-estate-diligence", category: "Property", date: "May 05, 2023", title: "Due Diligence in Abuja Real Estate Acquisitions", excerpt: "Common pitfalls and title verification procedures when purchasing land in the Federal Capital Territory.", image: "insight-3.png", featured: false }
];

export function Insights() {
  const featured = articles.find(a => a.featured);
  const regular = articles.filter(a => !a.featured);

  return (
    <>
      <PageShell title="Insights & News" breadcrumbs={[{ label: 'Insights' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            {featured && (
              <motion.a href={getInsightRoute(featured.slug)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group block mb-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center bg-muted/20 border border-border p-6 lg:p-12 hover:border-secondary/50 transition-colors">
                  <div className="aspect-[4/3] lg:aspect-square w-full overflow-hidden">
                    <img src={`/images/${featured.image}`} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-bold tracking-widest text-secondary uppercase">{featured.category}</span>
                      <span className="text-sm text-muted-foreground">{featured.date}</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-serif text-primary mb-6 leading-tight group-hover:text-secondary transition-colors">{featured.title}</h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{featured.excerpt}</p>
                    <span className="text-sm font-bold uppercase tracking-wider text-primary border-b-2 border-secondary pb-1">Read Article</span>
                  </div>
                </div>
              </motion.a>
            )}

            <SectionHeader eyebrow="Latest Articles" title="More Legal Perspectives" />

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regular.map((post, i) => (
                <motion.a key={i} href={getInsightRoute(post.slug)} variants={fadeInUp} className="group block border border-transparent hover:border-border p-4 -m-4 transition-colors">
                  <div className="aspect-[4/3] mb-6 overflow-hidden bg-muted">
                    <img src={`/images/${post.image}`} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold tracking-widest text-secondary uppercase">{post.category}</span>
                    <span className="text-xs text-muted-foreground">• {post.date}</span>
                  </div>
                  <h4 className="text-xl font-serif text-primary leading-snug mb-3 group-hover:text-secondary transition-colors">{post.title}</h4>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
