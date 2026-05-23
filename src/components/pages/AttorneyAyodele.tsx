import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { Button } from '@/components/ui/button';
import { routes } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

export function AttorneyAyodele() {
  return (
    <>
      <PageShell title="Our Attorney" breadcrumbs={[{ label: 'Ayodele Liman' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full bg-muted">
                  <img src="/images/ayodele.jpg" alt="Ayodele Liman" className="w-full h-auto block" />
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
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">Ayodele Liman</h2>
                    <p className="text-secondary font-medium tracking-widest uppercase text-sm">Senior Associate & IP Specialist</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                    {['LL.B', 'BL', 'MedArb Certified', 'CAC Accredited'].map(cred => (
                      <span key={cred} className="px-3 py-1 bg-muted border border-border text-xs font-bold text-primary flex items-center gap-2">
                        <Award className="h-3 w-3 text-secondary" />{cred}
                      </span>
                    ))}
                  </motion.div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12">
                    <motion.p variants={fadeInUp}>Ayodele Liman is a seasoned legal practitioner and Intellectual Property Specialist with over a decade of experience in legal practice, property law, and dispute resolution within the Nigerian legal system. She currently serves as a Senior Associate at Gloria Ondah & Associates, where she provides strategic legal solutions to individuals, businesses, and organizations across real estate, property management, and intellectual property matters.</motion.p>
                    <motion.p variants={fadeInUp}>Her expertise spans Property & Realty services, including property document and title review, lease drafting and negotiation, land title perfection, administrative processing, and structured property management. She also specializes in Intellectual Property law, offering trademark searches and clearance, trademark registration, renewals, and comprehensive brand protection services.</motion.p>
                    <motion.p variants={fadeInUp}>Known for her professionalism, attention to detail, and client-focused approach, Ayodele is committed to helping clients navigate complex legal processes with clarity and confidence while delivering commercially practical legal solutions.</motion.p>
                    <motion.p variants={fadeInUp}>Ayodele holds a Bachelor of Laws (LL.B.) degree and a B.L. qualification. She is also Mediation and Arbitration (MedArb) certified and accredited with the Corporate Affairs Commission (CAC), with expertise spanning property law, intellectual property law, litigation, regulatory compliance, and dispute resolution.</motion.p>
                  </div>

                  <motion.div variants={fadeInUp} className="mb-12">
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Areas of Expertise</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                      {["Property & Realty Services", "Intellectual Property Law", "Trademark & Brand Protection", "Land Title Perfection & CAC Filings", "Mediation & Dispute Resolution", "Contract Drafting & Negotiation"].map(item => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Notable Engagements</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>• Advised numerous corporate and individual clients on complex real estate transactions and property management.</li>
                      <li>• Successfully registered, renewed, and protected key intellectual property assets and trademarks for prominent businesses.</li>
                      <li>• Guided clients through comprehensive property due diligence, title reviews, and lease negotiations.</li>
                      <li>• Resolved commercial and property disputes through certified mediation and dispute resolution mechanisms.</li>
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
