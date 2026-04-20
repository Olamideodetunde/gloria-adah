import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Briefcase, CheckCircle2 } from 'lucide-react';
import { PageShell } from '../_shared/PageShell';
import { CTABand } from '../_shared/CTABand';
import { fadeInUp, staggerContainer } from '../_shared/motion';

export function About() {
  return (
    <>
      <PageShell title="About Us" breadcrumbs={[{ label: 'About' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeInUp} className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Firm Story</motion.h2>
                <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-primary mb-6 leading-tight">
                  Founded in 2017, registered in 2020.
                </motion.h3>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <motion.p variants={fadeInUp}>
                    Gloria Ondah & Associates was established with a clear mandate: to provide premium, business-focused legal solutions that drive success for individuals, startups, SMEs, and foreign investors operating in Nigeria.
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    We understand that the Nigerian business and regulatory environment can be complex. That is why we act as more than just legal advisors—we serve as strategic partners. From ensuring seamless corporate registration and drafting bulletproof contracts to navigating regulatory compliance and resolving disputes, our practice covers the full spectrum of your commercial needs.
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    Our commitment to excellence has earned us the trust of numerous organizations across sectors, including energy, real estate, and technology.
                  </motion.p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[600px] w-full"
              >
                <div className="absolute inset-0 bg-secondary/10 -translate-x-4 -translate-y-4"></div>
                <img 
                  src="/__mockup/images/gloria.png" 
                  alt="Law Firm Office" 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-[110%]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="bg-background p-10 border border-border">
                <h3 className="text-2xl font-serif text-primary mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">To provide exceptional, tailored legal solutions that empower our clients to navigate complexities, mitigate risks, and achieve their strategic goals.</p>
              </div>
              <div className="bg-background p-10 border border-border">
                <h3 className="text-2xl font-serif text-primary mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">To be the foremost legal partner in Nigeria, recognized globally for integrity, excellence, and an unwavering commitment to client success.</p>
              </div>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif text-primary mb-4">Core Values</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { title: "Professionalism", desc: "Highest standards in every engagement" },
                { title: "Transparency", desc: "Clear communication and honest billing" },
                { title: "Efficiency", desc: "Timely delivery without compromising quality" },
                { title: "Integrity", desc: "Ethical practice above all else" },
                { title: "Responsiveness", desc: "Accessible and attentive to client needs" }
              ].map((value, i) => (
                <div key={i} className="text-center p-6 bg-background border border-border">
                  <h4 className="font-bold text-primary mb-2">{value.title}</h4>
                  <p className="text-xs text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-primary">Our Approach</h2>
            </div>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border -translate-y-1/2 hidden md:block"></div>
              <div className="grid md:grid-cols-5 gap-8">
                {[
                  { step: "01", title: "Consultation", desc: "Understanding your unique needs." },
                  { step: "02", title: "Strategy", desc: "Developing a tailored legal roadmap." },
                  { step: "03", title: "Documentation", desc: "Drafting and reviewing requirements." },
                  { step: "04", title: "Execution", desc: "Filing, representation, or negotiation." },
                  { step: "05", title: "Support", desc: "Continuous advisory and compliance." }
                ].map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center bg-background py-4">
                    <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary flex items-center justify-center text-primary font-serif font-bold mb-4">
                      {step.step}
                    </div>
                    <h4 className="text-primary font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
