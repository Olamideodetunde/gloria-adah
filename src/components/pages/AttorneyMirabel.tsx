import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { Button } from '@/components/ui/button';
import { routes } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

export function AttorneyMirabel() {
  return (
    <>
      <PageShell title="Our Attorney" breadcrumbs={[{ label: 'Mirabel Ngremeh' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full bg-muted">
                  <img src="/images/mirabel.jpg" alt="Mirabel Ngremeh" className="w-full h-auto block" />
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
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">Mirabel Ngremeh</h2>
                    <p className="text-secondary font-medium tracking-widest uppercase text-sm">Senior Associate</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                    {['NBA Member', 'IBA Member', 'CAC Accredited'].map(cred => (
                      <span key={cred} className="px-3 py-1 bg-muted border border-border text-xs font-bold text-primary flex items-center gap-2">
                        <Award className="h-3 w-3 text-secondary" />{cred}
                      </span>
                    ))}
                  </motion.div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12">
                    <motion.p variants={fadeInUp}>Mirabel Ngremeh is a results-driven Legal, Sales, and Business Development Professional with over 12 years of experience in the Nigerian Oil & Gas industry. She has extensive expertise in oil and gas transactions, contract drafting and review, commercial negotiations, regulatory compliance, corporate advisory, tendering and RFQ processes, client relationship management, and strategic partnerships within the upstream sector.</motion.p>
                    <motion.p variants={fadeInUp}>She is a Senior Associate at Gloria Ondah & Associates, where she supports corporate and commercial transactions, regulatory advisory, contract management, and strategic business engagements for clients within and outside the energy sector.</motion.p>
                    <motion.p variants={fadeInUp}>Mirabel is also highly experienced in supporting market entry strategies for foreign companies seeking to operate in Nigeria. In addition to her corporate experience, she is the Co-Founder of Help the Aged Initiative Nigeria, a nonprofit organization focused on elderly care advocacy, social inclusion, and community support initiatives.</motion.p>
                    <motion.p variants={fadeInUp}>Recognized for her professionalism, strategic thinking, and dedication to excellence, Mirabel remains committed to delivering commercially sound, strategic, and legally compliant solutions tailored to each client's specific business and regulatory goals.</motion.p>
                  </div>

                  <motion.div variants={fadeInUp} className="mb-12">
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Areas of Expertise</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                      {[
                        "Oil & Gas Legal Advisory",
                        "Contract Drafting & Negotiation",
                        "Regulatory Compliance & Corporate Advisory",
                        "Business Development & Commercial Strategy",
                        "Tendering, RFQ & Bid Coordination",
                        "Client & Stakeholder Management",
                        "Strategic Partnerships & Market Entry Support",
                        "NGO Development & Community Engagement"
                      ].map(item => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Notable Engagements</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>• Over 12 years of extensive experience in the upstream sector of the Nigerian Oil & Gas industry.</li>
                      <li>• Acted as Co-Founder of Help the Aged Initiative Nigeria, establishing a robust nonprofit focused on elderly care advocacy.</li>
                      <li>• Guided foreign companies through successful market entry strategies, commercial frameworks, and regulatory advisory.</li>
                      <li>• Managed complex tendering, RFQ coordination, and strategic commercial and legal contract negotiations.</li>
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
