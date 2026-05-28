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
                <img src="/images/gloria.jpg" alt="Gloria Ondah, Managing Partner" className="relative w-full h-auto block grayscale-[20%] sepia-[10%] contrast-[110%]" />
                
                {/* Information rendered elegantly below the picture, not as an overlay on her chest */}
                <div className="mt-6 text-left">
                  <h4 className="text-2xl font-serif font-bold text-primary leading-tight">Gloria Ondah, Esq.</h4>
                  <p className="text-secondary text-sm font-semibold uppercase tracking-widest mt-2 mb-3">Managing Partner</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['LL.M', 'LL.B', 'BL', 'Certified Mediator'].map((qual, idx) => (
                      <span key={idx} className="text-[10px] font-bold px-2.5 py-1 bg-muted border border-border text-primary rounded-none tracking-wide">
                        {qual}
                      </span>
                    ))}
                  </div>
                </div>
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
            <div className="max-w-4xl mx-auto">
              <ul className="space-y-4">
                {[
                  { title: "Professionalism", desc: "Highest standards in every engagement" },
                  { title: "Transparency", desc: "Clear communication and honest billing" },
                  { title: "Efficiency", desc: "Timely delivery without compromising quality" },
                  { title: "Integrity", desc: "Ethical practice above all else" },
                  { title: "Responsiveness", desc: "Accessible and attentive to client needs" }
                ].map((value, i) => (
                  <li key={i} className="bg-background border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 hover:border-secondary/50 transition-colors">
                    <span className="font-serif font-bold text-primary text-xl min-w-[160px]">{value.title}</span>
                    <span className="text-muted-foreground text-base leading-relaxed">{value.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-primary">Our Approach</h2>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-5 gap-y-4 md:gap-8 lg:gap-12">
                {[
                  { step: "01", title: "Consultation", desc: "Understanding your unique needs." },
                  { step: "02", title: "Strategy", desc: "Developing a tailored legal roadmap." },
                  { step: "03", title: "Documentation", desc: "Drafting and reviewing requirements." },
                  { step: "04", title: "Execution", desc: "Filing, representation, or negotiation." },
                  { step: "05", title: "Support", desc: "Continuous advisory and compliance." }
                ].map((step, i) => (
                  <div key={i} className="relative flex flex-col items-center md:items-start text-center md:text-left pt-2 pb-2 md:py-4">
                    {/* Step Number */}
                    <span className="text-xs font-bold tracking-wider text-secondary uppercase mb-3">
                      Step {step.step}
                    </span>
                    <h4 className="text-xl font-serif font-bold text-primary mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                    
                    {/* Pointer arrow to the next step */}
                    {i < 4 && (
                      <>
                        {/* Desktop Arrow */}
                        <div className="hidden md:block absolute -right-6 top-10 translate-x-1/2 text-secondary/40 z-20">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                        {/* Mobile Arrow */}
                        <div className="block md:hidden mt-3 text-secondary/40">
                          <svg className="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Credentials & Affiliations Section */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Credentials & Trust</h2>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-primary">Accreditations and Memberships</h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Gloria Ondah & Associates and its legal practitioners are fully accredited and hold active memberships with premier local and international regulatory and professional bodies.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Nigerian Bar Association',
                  acronym: 'NBA',
                  logo: '/images/nba-logo.jpg',
                  desc: 'The official regulatory and professional body for legal practitioners in Nigeria. All our attorneys are certified members in good standing.'
                },
                {
                  name: 'Corporate Affairs Commission',
                  acronym: 'CAC',
                  logo: '/images/cac.jpg',
                  desc: 'The regulatory body governing company incorporation and corporate affairs in Nigeria. We are fully accredited agents in good standing.'
                },
                {
                  name: 'International Bar Association',
                  acronym: 'IBA',
                  logo: '/images/iba.png',
                  desc: 'The global forum for the legal profession, connecting practitioners worldwide to promote justice, human rights, and the rule of law.'
                }
              ].map((aff, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-muted/10 border border-border/80 p-8 flex flex-col items-center text-center group hover:border-secondary/40 hover:bg-background hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-20 w-full flex items-center justify-center mb-6 bg-white p-4 border border-border/40 shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                      src={aff.logo}
                      alt={aff.name}
                      className="max-h-full max-w-full object-contain filter transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-xs font-extrabold text-secondary uppercase tracking-widest mb-2">
                    {aff.acronym}
                  </span>
                  <h4 className="text-lg font-serif font-bold text-primary mb-3">
                    {aff.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {aff.desc}
                  </p>
                </motion.div>
              ))}
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-background border border-border group hover:border-secondary transition-all flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-muted border-b border-border">
                  <img
                    src="/images/gloria.jpg"
                    alt="Gloria Ondah"
                    className="w-full h-full object-cover object-top grayscale-[20%] sepia-[10%] contrast-[110%] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h4 className="text-2xl font-serif font-bold text-primary">Gloria Ondah, Esq.</h4>
                    <p className="text-secondary text-sm font-semibold tracking-wider uppercase mt-1 mb-3">Managing Partner</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-muted border border-border text-primary rounded-sm">LL.M</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-muted border border-border text-primary rounded-sm">LL.B</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-muted border border-border text-primary rounded-sm">BL</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-muted border border-border text-primary rounded-sm">Certified Mediator</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    Gloria Ondah is an accomplished legal practitioner and the Managing Partner of Gloria Ondah & Associates, with over a decade of legal practice and professional experience spanning litigation, corporate advisory, dispute resolution, employment law, regulatory compliance, and commercial transactions. She provides strategic legal counsel to individuals, startups, corporate organizations, and multinational clients across diverse sectors.
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
                <div className="relative overflow-hidden aspect-[3/4] bg-muted border-b border-border">
                  <img
                    src="/images/frederick.jpg"
                    alt="Frederick Adino"
                    className="w-full h-full object-cover object-top grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
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
                <div className="relative overflow-hidden aspect-[3/4] bg-muted border-b border-border">
                  <img
                    src="/images/eunice.jpg"
                    alt="Eunice Egwuche"
                    className="w-full h-full object-cover object-top grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
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

              {/* Card 4: Ayodele Liman */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-background border border-border group hover:border-secondary transition-all flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-muted border-b border-border">
                  <img
                    src="/images/ayodele.jpg"
                    alt="Ayodele Liman"
                    className="w-full h-full object-cover object-top grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h4 className="text-2xl font-serif font-bold text-primary">Ayodele Liman, Esq.</h4>
                    <p className="text-secondary text-sm font-semibold tracking-wider uppercase mt-1">Senior Associate</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    Ayodele Liman is a seasoned legal practitioner and Intellectual Property Specialist. She specializes in property and real estate, intellectual property law, and structured property management.
                  </p>
                  <div className="border-t border-border pt-6 mt-auto">
                    <a
                      href={routes.attorneyAyodele}
                      className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary inline-flex items-center gap-2 transition-colors font-semibold"
                    >
                      View Full Profile <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Card 5: Mirabel Ngremeh */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-background border border-border group hover:border-secondary transition-all flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-muted border-b border-border">
                  <img
                    src="/images/mirabel.jpg"
                    alt="Mirabel Ngremeh"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h4 className="text-2xl font-serif font-bold text-primary">Mirabel Ngremeh, Esq.</h4>
                    <p className="text-secondary text-sm font-semibold tracking-wider uppercase mt-1 mb-3">Senior Associate</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-muted border border-border text-primary rounded-sm">LL.B</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-muted border border-border text-primary rounded-sm">BL</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    Mirabel Ngremeh is a results-driven Legal, Sales, and Business Development Professional with over 12 years of experience in the upstream sector of the Nigerian Oil & Gas industry.
                  </p>
                  <div className="border-t border-border pt-6 mt-auto">
                    <a
                      href={routes.attorneyMirabel}
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
