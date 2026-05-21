import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { Button } from '@/components/ui/button';
import { routes } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

export function AttorneyEunice() {
  return (
    <>
      <PageShell title="Our Attorney" breadcrumbs={[{ label: 'Eunice Egwuche' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full bg-muted">
                  <img src="/images/eunice.jpg" alt="Eunice Egwuche" className="w-full h-auto block" />
                </motion.div>
                <div className="bg-muted p-8 border border-border">
                  <h3 className="font-serif text-primary text-xl mb-6">Contact Info</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <a href="tel:+2349029633193" className="flex items-center gap-3 hover:text-secondary"><Phone className="h-4 w-4 text-secondary" />09029633193</a>
                    <a href="mailto:info@gloriaondahlaw.com" className="flex items-center gap-3 hover:text-secondary break-all"><Mail className="h-4 w-4 text-secondary shrink-0" />info@gloriaondahlaw.com</a>
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
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">Eunice Egwuche</h2>
                    <p className="text-secondary font-medium tracking-widest uppercase text-sm">Senior Associate</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                    {['LL.B', 'BL', 'MedArb Certified', 'CAC Accredited'].map(cred => (
                      <span key={cred} className="px-3 py-1 bg-muted border border-border text-xs font-bold text-primary flex items-center gap-2">
                        <Award className="h-3 w-3 text-secondary" />{cred}
                      </span>
                    ))}
                  </motion.div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12">
                    <motion.p variants={fadeInUp}>Eunice Egwuche is a seasoned legal practitioner with over a decade of experience in legal practice, litigation, and dispute resolution within the Nigerian legal system. She has successfully represented clients in both civil and criminal court proceedings, demonstrating strong advocacy skills and a deep understanding of corporate and commercial legal practice.</motion.p>
                    <motion.p variants={fadeInUp}>She currently serves as a Senior Associate at Gloria Ondah & Associates, where she provides strategic legal advisory services to corporate and individual clients. She is adept at drafting and reviewing complex legal documents, conducting extensive legal research, and managing legal matters effectively under pressure.</motion.p>
                    <motion.p variants={fadeInUp}>Known for her professionalism, attention to detail, and client-focused approach, Eunice is committed to delivering commercially practical legal solutions while upholding the highest standards of ethics and excellence in legal service.</motion.p>
                    <motion.p variants={fadeInUp}>Eunice holds a Bachelor of Laws (LL.B.) degree and a B.L. qualification. She is also Mediation and Arbitration (MedArb) certified and accredited with the Corporate Affairs Commission (CAC), with expertise spanning corporate law, litigation, regulatory compliance, and dispute resolution.</motion.p>
                  </div>

                  <motion.div variants={fadeInUp} className="mb-12">
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Areas of Expertise</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                      {["Corporate & Commercial Law", "Civil & Criminal Litigation", "Mediation & Dispute Resolution", "Regulatory Compliance & CAC Filings", "Legal Research & Strategy", "Contract Drafting & Review"].map(item => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Notable Engagements</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>• Successfully represented clients in high-stakes civil and criminal proceedings across Nigerian courts.</li>
                      <li>• Advised corporate and individual clients on complex regulatory compliance and business entry frameworks.</li>
                      <li>• Drafted and reviewed comprehensive commercial agreements, joint venture contracts, and corporate structures.</li>
                      <li>• Mediated complex disputes using certified MedArb strategies, securing favorable out-of-court settlements.</li>
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
