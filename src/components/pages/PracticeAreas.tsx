import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { practiceAreas } from '../shared/practiceAreas';
import { getPracticeRoute, practiceIcons } from '../shared/routes';
import { staggerContainer, fadeInUp } from '../shared/motion';

export function PracticeAreas() {
  return (
    <>
      <PageShell title="Practice Areas" breadcrumbs={[{ label: 'Practice Areas' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8"
            >
              {practiceAreas.map((area) => {
                const Icon = practiceIcons[area.slug as keyof typeof practiceIcons] || Briefcase;
                return (
                  <motion.div key={area.slug} variants={fadeInUp}>
                    <a href={getPracticeRoute(area.slug)} className="block h-full p-10 bg-muted/20 border border-border hover:border-secondary/50 transition-colors group">
                      <Icon className="h-10 w-10 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-2xl font-serif text-primary mb-4">{area.title}</h3>
                      <p className="text-muted-foreground mb-8 leading-relaxed">{area.full_body}</p>
                      <div className="flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:text-secondary transition-colors">
                        View Service Details <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
