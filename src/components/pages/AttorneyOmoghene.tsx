import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { Button } from '@/components/ui/button';
import { routes } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

export function AttorneyOmoghene() {
  return (
    <>
      <PageShell title="Our Attorney" breadcrumbs={[{ label: 'Fredrick Omoghene' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full bg-muted">
                  <img src="/images/fredrick_omoghene.jpg" alt="Fredrick Oluchukwu Omoghene" className="w-full h-auto block" />
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
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">Fredrick Oluchukwu Omoghene, Esq.</h2>
                    <p className="text-secondary font-medium tracking-widest uppercase text-sm">Associate & Tax Expert</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                    {['ACTI', 'LL.B', 'BL', 'Tax Practitioner'].map(cred => (
                      <span key={cred} className="px-3 py-1 bg-muted border border-border text-xs font-bold text-primary flex items-center gap-2">
                        <Award className="h-3 w-3 text-secondary" />{cred}
                      </span>
                    ))}
                  </motion.div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12">
                    <motion.p variants={fadeInUp}>
                      Fredrick Oluchukwu Omoghene is a chartered Tax practitioner and Associate at Gloria Ondah & Associates with practical experience in Tax practice, Banking and Financial litigation, Consumer Protection, and Technology Law.
                    </motion.p>
                    <motion.p variants={fadeInUp}>
                      He was called to the Nigerian Bar in 2018. Since then, he has remained committed to delivering sound legal counsel with professionalism, integrity, and a strong understanding of Nigeria’s legal and regulatory framework.
                    </motion.p>
                    <motion.p variants={fadeInUp}>
                      Fredrick serves as the Principal Head of Chicelectra Legal Practitioners and Chicelectra Digital Solutions. He is an Associate of the Nigerian Chartered Institute of Taxation (ACTI) and is currently undertaking a Masters Degree in Taxation and Policy, cementing his position as a key tax advisory resource for corporate entities and individual clients alike.
                    </motion.p>
                  </div>

                  <motion.div variants={fadeInUp} className="mb-12">
                    <h3 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Areas of Expertise</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                      {["Tax Practice & Policy", "Banking & Financial Litigation", "Consumer Protection Law", "Technology Law & Digital Solutions", "Corporate & Commercial Advisory", "Regulatory Compliance"].map(item => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{item}</li>
                      ))}
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
