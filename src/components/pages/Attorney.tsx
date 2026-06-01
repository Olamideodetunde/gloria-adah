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
                  <img src="/images/gloria.jpg" alt="Gloria Ondah" className="w-full h-auto block" />
                </motion.div>
                <div className="bg-muted p-8 border border-border">
                  <h3 className="font-serif text-primary text-xl mb-6">Contact Info</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <a href="tel:+2349029633913" className="flex items-center gap-3 hover:text-secondary"><Phone className="h-4 w-4 text-secondary" />09029633913</a>
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
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">Gloria Ondah</h2>
                    <p className="text-secondary font-medium tracking-widest uppercase text-sm">Managing Partner</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                    {['LL.M', 'LL.B', 'BL', 'French Proficiency', 'HRM Certified', 'Google AI Certified', 'NBA Member', 'CAC Accredited Agent', 'Certified Mediator'].map(cred => (
                      <span key={cred} className="px-3 py-1 bg-muted border border-border text-xs font-bold text-primary flex items-center gap-2">
                        <Award className="h-3 w-3 text-secondary" />{cred}
                      </span>
                    ))}
                  </motion.div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12">
                    <motion.p variants={fadeInUp}>Gloria Ondah is an accomplished legal practitioner and the Managing Partner of Gloria Ondah & Associates, with over a decade of legal practice and professional experience spanning litigation, corporate advisory, dispute resolution, employment law, regulatory compliance, and commercial transactions. She is widely recognized for her expertise in corporate and commercial law, contract management, legal advisory, human resources management, and oil and gas legal practice within the Nigerian legal and business environment. As Managing Partner, Gloria provides strategic legal counsel to individuals, startups, corporate organizations, and multinational clients across diverse sectors.</motion.p>
                    <motion.p variants={fadeInUp}>Her practice is centered on delivering practical, commercially sound, and result-oriented legal solutions tailored to clients’ business and regulatory needs. She has extensive experience in drafting and reviewing commercial agreements, corporate governance advisory, negotiations, labour and employment matters, corporate structuring, risk management, and regulatory compliance.</motion.p>
                    <motion.p variants={fadeInUp}>Gloria has successfully represented clients in both civil and corporate legal matters and has built a reputation for professionalism, excellence, analytical precision, and client-focused legal service delivery. Her multidisciplinary background in both law and human resource management enables her to provide comprehensive advisory services that align legal protection with organizational growth and operational efficiency.</motion.p>
                  </div>

                  <motion.div variants={fadeInUp} className="mb-12">
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Areas of Expertise</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                      {["Corporate & Commercial Law", "Litigation & Dispute Resolution", "Employment & Labour Law", "Regulatory Compliance & CAC Filings", "Oil & Gas Legal Practice", "Human Resources Advisory"].map(item => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Notable Engagements</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>• Acted as Managing Partner overseeing high-stakes corporate transactions, strategic legal advisory, and litigation portfolios.</li>
                      <li>• Advised startups, established corporations, and multinational entities on complex company incorporation and regulatory frameworks.</li>
                      <li>• Guided businesses through complex labour and employment disputes, structuring human resource frameworks for operational compliance.</li>
                      <li>• Successfully mediated complex civil and commercial conflicts, protecting client business interests and avoiding litigation.</li>
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
