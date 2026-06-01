import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { Button } from '@/components/ui/button';
import { routes } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

export function AttorneyAdedayo() {
  return (
    <>
      <PageShell title="Our Attorney" breadcrumbs={[{ label: 'Dr. Adedayo Okunlola' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full bg-muted">
                  <img src="/images/adedayo.jpg" alt="Dr. Adedayo Stephen Okunlola" className="w-full h-auto block" />
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
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">Dr. Adedayo Stephen Okunlola</h2>
                    <p className="text-secondary font-medium tracking-widest uppercase text-sm">Partner</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                    {['MBA', 'LL.B (Hons)', 'BL', 'ACarb', 'AMNIM', 'ACMA', 'ACE', 'FCFIA', 'DF.CFIA'].map(cred => (
                      <span key={cred} className="px-3 py-1 bg-muted border border-border text-xs font-bold text-primary flex items-center gap-2">
                        <Award className="h-3 w-3 text-secondary" />{cred}
                      </span>
                    ))}
                  </motion.div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12">
                    <motion.p variants={fadeInUp}>
                      Dr. Adedayo Stephen Okunlola is a highly accomplished multidisciplinary professional with extensive expertise spanning accounting, taxation, law, arbitration, and corporate administration. He serves as a Partner at Gloria Ondah & Associates. He is a Chartered Accountant, Tax Consultant, Legal Practitioner, and Arbitrator with a distinguished career dedicated to financial integrity, regulatory compliance, and strategic advisory.
                    </motion.p>
                    <motion.p variants={fadeInUp}>
                      He holds a Higher National Diploma (HND) in Accountancy and a Master of Business Administration (MBA), complemented by a Bachelor of Laws (LLB Hons) degree. He was called to the Nigerian Bar as a Barrister and Solicitor of the Supreme Court of Nigeria, further strengthening his capacity to provide integrated financial and legal solutions.
                    </motion.p>
                    <motion.p variants={fadeInUp}>
                      Dr. Okunlola is widely recognized for his professional affiliations and contributions to key institutions. He is an Associate Member of the Chartered Institute of Arbitrators (Nigeria and the United Kingdom), the Nigerian Institute of Management (AMNIM), the Chartered Institute of Cost and Management Accountants of Nigeria (ACMA), and the Chartered Institute of Economists of Nigeria (ACE). He is also a Fellow of the Chartered Institute of Financial Analysts of Nigeria (FCFIA) and a Doctoral Fellow of the Chartered Institute of Financial Analysts of Ghana (DF.CFIA).
                    </motion.p>
                    <motion.p variants={fadeInUp}>
                      In addition, he is a bona fide member of the Financial Reporting Council of Nigeria (FRC No: FRC/2016/PRO/00000015405), underscoring his commitment to high standards in financial reporting and corporate governance.
                    </motion.p>
                    <motion.p variants={fadeInUp}>
                      Dr. Okunlola has built a reputation as a trusted advisor in tax matters, offering consultancy services to a wide range of organizations across sectors. His deep knowledge of tax laws, regulatory frameworks, and financial systems positions him as a sought-after expert in compliance, tax planning, and dispute resolution.
                    </motion.p>
                    <motion.p variants={fadeInUp}>
                      He is also a respected thought leader and guest speaker at numerous professional conferences, seminars, and workshops, where he shares insights on taxation, financial management, and regulatory best practices.
                    </motion.p>
                    <motion.p variants={fadeInUp}>
                      With a rare blend of financial acumen, legal expertise, and strategic leadership, Dr. Okunlola continues to make significant contributions to the advancement of professional practice and corporate excellence both in Nigeria and internationally.
                    </motion.p>
                  </div>

                  <motion.div variants={fadeInUp} className="mb-12">
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Areas of Expertise</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                      {["Corporate Law & Administration", "Tax Advisory & Compliance", "Commercial Arbitration & Dispute Resolution", "Financial Management", "Corporate Governance & Regulatory Compliance", "Strategic Business Advisory"].map(item => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Professional Affiliations</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>• Financial Reporting Council of Nigeria (FRC No: FRC/2016/PRO/00000015405)</li>
                      <li>• Associate Member, Chartered Institute of Arbitrators (Nigeria & UK)</li>
                      <li>• Associate Member, Nigerian Institute of Management (AMNIM)</li>
                      <li>• Associate Member, Chartered Institute of Cost and Management Accountants of Nigeria (ACMA)</li>
                      <li>• Associate Member, Chartered Institute of Economists of Nigeria (ACE)</li>
                      <li>• Fellow, Chartered Institute of Financial Analysts of Nigeria (FCFIA)</li>
                      <li>• Doctoral Fellow, Chartered Institute of Financial Analysts of Ghana (DF.CFIA)</li>
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
