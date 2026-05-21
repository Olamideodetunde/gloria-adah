import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Target, Eye, HeartHandshake, Scale, Sparkles, Zap, Users, Brain, ArrowRight } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { routes } from '../shared/routes';
import { fadeInUp, staggerContainer } from '../shared/motion';

export function About() {
  return (
    <>
      <PageShell title="About Us" breadcrumbs={[{ label: 'About' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <motion.h2 variants={fadeInUp} className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Firm Story</motion.h2>
                <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-primary mb-6 leading-tight">
                  Founded in 2015, registered in 2020.
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
                className="relative w-full"
              >
                <div className="absolute inset-0 bg-secondary/10 -translate-x-4 -translate-y-4 pointer-events-none"></div>
                <img src="/images/gloria.png" alt="Gloria Ondah, Principal" className="relative w-full h-auto block grayscale-[20%] sepia-[10%] contrast-[110%]" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="bg-background p-10 border border-border">
                <div className="w-12 h-12 mb-4 bg-secondary/10 text-secondary flex items-center justify-center">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-serif text-primary mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">To provide exceptional, tailored legal solutions that empower our clients to navigate complexities, mitigate risks, and achieve their strategic goals.</p>
              </div>
              <div className="bg-background p-10 border border-border">
                <div className="w-12 h-12 mb-4 bg-secondary/10 text-secondary flex items-center justify-center">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-serif text-primary mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">To be the foremost legal partner in Nigeria, recognized globally for integrity, excellence, and an unwavering commitment to client success.</p>
              </div>
            </div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif text-primary mb-4">Core Values</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { title: "Professionalism", desc: "Highest standards in every engagement", icon: Award },
                { title: "Transparency", desc: "Clear communication and honest billing", icon: Sparkles },
                { title: "Efficiency", desc: "Timely delivery without compromising quality", icon: Zap },
                { title: "Integrity", desc: "Ethical practice above all else", icon: ShieldCheck },
                { title: "Responsiveness", desc: "Accessible and attentive to client needs", icon: Users }
              ].map((value, i) => (
                <div key={i} className="text-center p-6 bg-background border border-border">
                  <div className="w-10 h-10 mx-auto mb-3 bg-secondary/10 text-secondary flex items-center justify-center">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-primary mb-2">{value.title}</h4>
                  <p className="text-xs text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                    <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary flex items-center justify-center text-primary font-serif font-bold mb-4">{step.step}</div>
                    <h4 className="text-primary font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Leadership Section */}
        <section id="attorneys" className="py-24 bg-muted/30 border-t border-border scroll-mt-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">OUR LEADERSHIP</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary">Experienced Legal Team</h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Our legal practitioners combine deep regulatory insights, commercial acumen, and legal excellence to deliver the highest standards of legal representation and business protection.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Partner Card 1: Gloria Ondah */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-background border border-border group hover:border-secondary transition-all flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-muted border-b border-border">
                  <img
                    src="/images/gloria.png"
                    alt="Gloria Ondah"
                    className="w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-[110%] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h4 className="text-2xl font-serif font-bold text-primary">Gloria Ondah, Esq.</h4>
                    <p className="text-secondary text-sm font-semibold tracking-wider uppercase mt-1">Principal Partner</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    Gloria Ondah is the founder and Principal Partner of Gloria Ondah & Associates. With over eight years of experience, she specializes in corporate law, commercial negotiations, and dispute resolution, guiding startups and foreign investors through the complex Nigerian business landscape.
                  </p>
                  <div className="border-t border-border pt-6 mt-auto">
                    <a
                      href={routes.attorney}
                      className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary inline-flex items-center gap-2 transition-colors font-semibold"
                    >
                      View Full Profile <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Partner Card 2: Frederick Adino */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-background border border-border group hover:border-secondary transition-all flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-muted border-b border-border">
                  <img
                    src="/images/frederick.jpg"
                    alt="Frederick Adino"
                    className="w-full h-full object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h4 className="text-2xl font-serif font-bold text-primary">Frederick Adino, Esq.</h4>
                    <p className="text-secondary text-sm font-semibold tracking-wider uppercase mt-1">Senior Partner</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    Frederick Adino is a seasoned legal practitioner and Senior Partner at the firm. He possesses extensive expertise in corporate governance, regulatory compliance, taxation, and commercial litigation, helping businesses achieve sustainable growth and robust legal protection.
                  </p>
                  <div className="border-t border-border pt-6 mt-auto">
                    <a
                      href={routes.attorneyFrederick}
                      className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary inline-flex items-center gap-2 transition-colors font-semibold"
                    >
                      View Full Profile <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Eunice Egwuche */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-background border border-border group hover:border-secondary transition-all flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-muted border-b border-border">
                  <img
                    src="/images/eunice.jpg"
                    alt="Eunice Egwuche"
                    className="w-full h-full object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h4 className="text-2xl font-serif font-bold text-primary">Eunice Egwuche, Esq.</h4>
                    <p className="text-secondary text-sm font-semibold tracking-wider uppercase mt-1">Senior Associate</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    Eunice Egwuche is a seasoned legal practitioner with over a decade of experience. She specializes in corporate law, civil and criminal litigation, regulatory compliance, and dispute resolution, delivering commercially practical legal solutions.
                  </p>
                  <div className="border-t border-border pt-6 mt-auto">
                    <a
                      href={routes.attorneyEunice}
                      className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary inline-flex items-center gap-2 transition-colors font-semibold"
                    >
                      View Full Profile <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
