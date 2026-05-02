import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { Button } from '@/components/ui/button';
import { routes } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

export function Attorney() {
  return (
    <>
      <PageShell title="Our Attorney" breadcrumbs={[{ label: 'Gloria Ondah' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full bg-muted">
                  <img src="/images/gloria.png" alt="Gloria Ondah" className="w-full h-auto block" />
                </motion.div>
                <div className="bg-muted p-8 border border-border">
                  <h3 className="font-serif text-primary text-xl mb-6">Contact Info</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <a href="tel:+2349029633193" className="flex items-center gap-3 hover:text-secondary"><Phone className="h-4 w-4 text-secondary" />09029633193</a>
                    <a href="mailto:G.ondahlawoffice@gmail.com" className="flex items-center gap-3 hover:text-secondary break-all"><Mail className="h-4 w-4 text-secondary shrink-0" />G.ondahlawoffice@gmail.com</a>
                    <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" /><span>Abuja, Nigeria</span></div>
                  </div>
                  <a href={routes.booking} className="block mt-8">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-none">Schedule a Meeting</Button>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-8">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp} className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">Gloria Ondah</h2>
                    <p className="text-secondary font-medium tracking-widest uppercase text-sm">Principal Partner</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                    {['LL.M', 'LL.B', 'BL', 'ACIArb (UK)', 'CMC', 'NBA Member'].map(cred => (
                      <span key={cred} className="px-3 py-1 bg-muted border border-border text-xs font-bold text-primary flex items-center gap-2">
                        <Award className="h-3 w-3 text-secondary" />{cred}
                      </span>
                    ))}
                  </motion.div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12">
                    <motion.p variants={fadeInUp}>Gloria Ondah is a seasoned legal practitioner with over eight years of experience providing practical and business-focused legal solutions to individuals and organizations. Her practice is built on a foundation of integrity, meticulous attention to detail, and a deep understanding of the Nigerian commercial landscape.</motion.p>
                    <motion.p variants={fadeInUp}>As the Principal Partner of Gloria Ondah & Associates, she oversees all firm engagements, ensuring that clients receive dedicated attention and strategic advice. She has developed strong expertise in corporate and commercial law, guiding startups and foreign investors through the complexities of business entry and regulatory compliance in Nigeria.</motion.p>
                    <motion.p variants={fadeInUp}>Beyond corporate law, Gloria is a skilled negotiator and dispute resolution specialist. As an Associate of the Chartered Institute of Arbitrators (UK) and a Certified Management Consultant, she actively advocates for alternative dispute resolution mechanisms to save clients time and preserve business relationships.</motion.p>
                  </div>

                  <motion.div variants={fadeInUp} className="mb-12">
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Areas of Expertise</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                      {["Corporate Structuring & Registration", "Commercial Contract Drafting", "Regulatory Compliance & Audits", "Dispute Resolution & Arbitration", "Real Estate Transactions", "Energy Sector Advisory"].map(item => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Notable Engagements</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>• Advised a leading indigenous oil & gas operator on NUPRC compliance and license renewals.</li>
                      <li>• Structured the corporate governance framework for a multi-million naira real estate development firm.</li>
                      <li>• Successfully mediated complex employment disputes for technology startups in Lagos.</li>
                      <li>• Handled intellectual property portfolios and brand protection for emerging retail brands.</li>
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
