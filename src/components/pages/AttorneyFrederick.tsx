import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { Button } from '@/components/ui/button';
import { routes } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

export function AttorneyFrederick() {
  return (
    <>
      <PageShell title="Our Attorney" breadcrumbs={[{ label: 'Frederick Adino' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full bg-muted">
                  <img src="/images/frederick.jpg" alt="Frederick Adino" className="w-full h-auto block" />
                </motion.div>
                <div className="bg-muted p-8 border border-border">
                  <h3 className="font-serif text-primary text-xl mb-6">Contact Info</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <a href="tel:+2347054588490" className="flex items-center gap-3 hover:text-secondary"><Phone className="h-4 w-4 text-secondary" />07054588490</a>
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
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">Frederick Adino</h2>
                    <p className="text-secondary font-medium tracking-widest uppercase text-sm">Senior Partner</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                    {['LL.B', 'BL', 'NBA Member', 'CAC Accredited'].map(cred => (
                      <span key={cred} className="px-3 py-1 bg-muted border border-border text-xs font-bold text-primary flex items-center gap-2">
                        <Award className="h-3 w-3 text-secondary" />{cred}
                      </span>
                    ))}
                  </motion.div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12">
                    <motion.p variants={fadeInUp}>Frederick Adino is a seasoned legal practitioner and Senior Partner at Gloria Ondah & Associates, with extensive expertise in corporate law, corporate governance, regulatory compliance, taxation, and commercial litigation. He holds a Bachelor of Laws (LL.B.) degree from Kogi State University and was subsequently called to the Nigerian Bar, earning his Barrister-at-Law (B.L.) qualification. He is also a member of the Nigerian Bar Association.</motion.p>
                    <motion.p variants={fadeInUp}>Frederick is accredited with the Corporate Affairs Commission and has built a strong reputation advising businesses, startups, and corporate organizations on company incorporation, post-incorporation compliance, corporate restructuring, governance frameworks, regulatory filings, and business advisory services. He is also highly experienced in tax advisory and compliance matters, assisting clients with navigating complex regulatory and fiscal obligations while ensuring operational compliance with applicable laws and regulations.</motion.p>
                    <motion.p variants={fadeInUp}>His litigation practice is strategically centered around corporate and commercial disputes, regulatory matters, taxation issues, employment disputes, debt recovery, and governance-related conflicts. He has represented and advised clients in matters involving business transactions, contractual disputes, property-related issues, and corporate risk management, delivering practical and commercially focused legal solutions.</motion.p>
                    <motion.p variants={fadeInUp}>Over the years, Frederick has collaborated with several reputable law firms, serving in key capacities including Head of Corporate Practice, where he handled high-level corporate transactions, compliance advisory, commercial negotiations, and dispute resolution matters. Known for his analytical approach, professionalism, and business-oriented legal strategy, Frederick Adino remains committed to helping clients achieve sustainable growth, regulatory compliance, and effective legal protection in an evolving business environment.</motion.p>
                  </div>

                  <motion.div variants={fadeInUp} className="mb-12">
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Areas of Expertise</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                      {["Corporate Law & Incorporation", "Corporate Governance & Restructuring", "Regulatory Compliance & CAC Filings", "Tax Advisory & Compliance", "Commercial Litigation & Debt Recovery", "Employment Disputes"].map(item => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Notable Engagements</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>• Served as Head of Corporate Practice handling high-level corporate transactions and commercial negotiations.</li>
                      <li>• Advised numerous startups, SMEs, and corporate entities on company incorporation and post-incorporation compliance.</li>
                      <li>• Guided businesses through complex tax advisory, regulatory filings, and fiscal compliance.</li>
                      <li>• Successfully represented clients in corporate and commercial disputes, employment matters, and debt recovery conflicts.</li>
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
