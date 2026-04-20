import React from 'react';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { PageShell } from '../_shared/PageShell';
import { CTABand } from '../_shared/CTABand';
import { routes } from '../_shared/routes';
import { Button } from '@/components/ui/button';

export function InsightsSingle({ slug }: { slug: string }) {
  // Using generic content for the sample
  return (
    <>
      <PageShell 
        title="Filing Annual Returns with the CAC: A 2026 Guide" 
        breadcrumbs={[{ label: 'Insights', href: routes.insights }, { label: 'Corporate Law' }]}
      >
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            
            <div className="flex items-center justify-between mb-12 border-b border-border pb-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-bold text-secondary uppercase tracking-widest">Corporate Law</span>
                <span>•</span>
                <span>Oct 12, 2023</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Share2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-[#0077b5]"><Linkedin className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="aspect-[21/9] w-full bg-muted mb-12">
              <img 
                src="/__mockup/images/insight-1.png" 
                alt="Article hero" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary prose-p:text-muted-foreground prose-li:text-muted-foreground">
              <p className="lead text-xl text-primary font-medium">
                Every business registered in Nigeria under the Corporate Affairs Commission (CAC) has a statutory obligation to file annual returns. Failure to do so can result in severe penalties, including the delisting of the company from the companies register.
              </p>

              <h2>What are Annual Returns?</h2>
              <p>
                An annual return is not a financial statement or a tax return. Rather, it is a mandatory yearly filing that confirms to the CAC that your business is still active and operational. It updates the Commission on any changes to the company's structure, directors, or registered address over the past year.
              </p>

              <h2>When is the Deadline?</h2>
              <p>
                The timeline for filing depends on the type of business entity:
              </p>
              <ul>
                <li><strong>Business Names (Enterprises):</strong> Must be filed not later than the 30th of June every year.</li>
                <li><strong>Limited Liability Companies (LTD):</strong> Must be filed within 42 days after the Annual General Meeting (AGM) for the year. Note that a newly incorporated company is exempt from filing for the year of its incorporation.</li>
                <li><strong>Incorporated Trustees (NGOs):</strong> Must be filed between the 30th of June and the 31st of December every year.</li>
              </ul>

              <blockquote className="border-l-4 border-secondary pl-6 italic my-8 text-xl text-primary/80">
                "Ignoring annual returns is the most common compliance mistake made by Nigerian SMEs, often discovered only when applying for a major contract or bank loan."
              </blockquote>

              <h2>Consequences of Default</h2>
              <p>
                If a company fails to file its annual returns, it is classified as "Inactive" on the CAC portal. This status alerts the public, banks, and potential investors that the company is non-compliant. Furthermore, the CAC imposes daily default penalties. If the default persists for consecutive years, the CAC has the power to strike the company's name off the register entirely.
              </p>

              <h2>How We Can Help</h2>
              <p>
                At Gloria Ondah & Associates, we manage the entire compliance calendar for our clients. We prepare the necessary documents, liaise with auditors for audited accounts (where required for LTDs), and ensure prompt filing on the CAC portal to maintain your active status.
              </p>
            </div>

            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="/__mockup/images/gloria.png" alt="Gloria Ondah" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-primary">Gloria Ondah</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">Principal Partner</div>
                </div>
              </div>
              <a href={routes.insights}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Insights
                </Button>
              </a>
            </div>

          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
