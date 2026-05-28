import React from 'react';
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { practiceAreas } from '../shared/practiceAreas';
import { getPracticeRoute, routes } from '../shared/routes';
import { Button } from '@/components/ui/button';

export function PracticeDetail({ slug }: { slug: string }) {
  const area = practiceAreas.find(p => p.slug === slug);

  if (!area) {
    return (
      <PageShell title="Practice Area Not Found" breadcrumbs={[{ label: 'Practice Areas', href: routes.practiceAreas }]}>
        <div className="container mx-auto px-6 py-24 text-center">
          <p className="text-muted-foreground mb-8">The requested practice area could not be found.</p>
          <a href={routes.practiceAreas}><Button>Return to Practice Areas</Button></a>
        </div>
      </PageShell>
    );
  }

  return (
    <>
      <PageShell title={area.title} breadcrumbs={[{ label: 'Practice Areas', href: routes.practiceAreas }, { label: area.title }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-serif text-primary mb-6">What this service covers</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{area.full_body}</p>
                </div>
                <div>
                  <h2 className="text-3xl font-serif text-primary mb-6">Who it is for</h2>
                  <div className="flex flex-wrap gap-3">
                    {area.who_for.map((who, i) => (
                      <span key={i} className="px-4 py-2 bg-muted text-primary text-sm font-medium border border-border rounded-full">{who}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-serif text-primary mb-8">Our Process</h2>
                  <div className="space-y-6">
                    {area.process_steps.map((step, i) => (
                      <div key={i} className="flex gap-6 p-6 border border-border bg-muted/20">
                        <div className="text-3xl font-serif text-secondary/30 font-bold">{step.step}</div>
                        <div>
                          <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
                          <p className="text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-primary text-primary-foreground p-8">
                  <h3 className="text-xl font-serif mb-6">Need Legal Assistance?</h3>
                  <p className="text-primary-foreground/80 mb-8 text-sm">Schedule a consultation to discuss your specific needs with our legal experts.</p>
                  <div className="space-y-4 mb-8">
                    <a href="tel:+2349029633913" className="flex items-center gap-3 text-sm hover:text-secondary transition-colors"><Phone className="h-4 w-4 text-secondary" />09029633913</a>
                    <a href="https://wa.me/2347054588490" className="flex items-center gap-3 text-sm hover:text-secondary transition-colors"><MessageCircle className="h-4 w-4 text-secondary" />07054588490 (Typically responds within an hour)</a>
                    <a href="mailto:info@gloriaadah.com" className="flex items-center gap-3 text-sm hover:text-secondary transition-colors"><Mail className="h-4 w-4 text-secondary" />info@gloriaadah.com</a>
                  </div>
                  <a href={routes.booking} className="block w-full">
                    <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-none h-12">Book Consultation</Button>
                  </a>
                </div>

                <div className="bg-muted p-8 border border-border">
                  <h3 className="text-xl font-serif text-primary mb-6">Related Services</h3>
                  <ul className="space-y-4">
                    {practiceAreas.filter(p => p.slug !== slug).slice(0, 4).map(p => (
                      <li key={p.slug}>
                        <a href={getPracticeRoute(p.slug)} className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors flex items-center justify-between group">
                          {p.title}
                          <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
