import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Building2, FileText, Scale, Landmark, Shield, 
  MapPin, Briefcase, Droplets, Menu, X, ArrowRight,
  Phone, Mail, CheckCircle2, ChevronRight, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const WHATSAPP_NUMBER = "07054588490";
const PHONE_NUMBER = "09029633193";
const EMAIL = "G.ondahlawoffice@gmail.com";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-white">
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-serif text-xl font-bold tracking-widest">
              G·O·A
            </div>
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-lg leading-tight text-primary">Gloria Ondah</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground uppercase">& Associates</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-secondary transition-colors">About</a>
            <a href="#practice-areas" className="text-sm font-medium hover:text-secondary transition-colors">Practice Areas</a>
            <a href="#insights" className="text-sm font-medium hover:text-secondary transition-colors">Insights</a>
            <a href="#contact" className="text-sm font-medium hover:text-secondary transition-colors">Contact</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full border-primary/20 text-primary hover:bg-primary/5">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-none px-8">
              Book Consultation
            </Button>
          </div>

          <button className="lg:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 lg:hidden">
          <nav className="flex flex-col gap-6 text-2xl font-serif">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#practice-areas" onClick={() => setMobileMenuOpen(false)}>Practice Areas</a>
            <a href="#insights" onClick={() => setMobileMenuOpen(false)}>Insights</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 bg-muted border border-border text-xs font-medium tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Your Trusted Partner for Legal Solutions
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl leading-[1.1] mb-6 text-primary">
              Securing Your Business Interests in Nigeria.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Providing comprehensive legal services that drive growth, compliance and business success for startups, SMEs, and foreign investors.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none h-14 px-8 text-base">
                Book a Consultation
              </Button>
              <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-base border-primary/20 text-primary hover:bg-primary/5 group">
                <MessageCircle className="mr-2 h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                Chat on WhatsApp
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 text-sm font-medium text-foreground/80 border-t border-border pt-8">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-background flex items-center justify-center text-secondary text-xs font-bold">8+</div>
              </div>
              <p>Years of Legal Excellence <span className="mx-2 text-secondary">•</span> Serving Clients Across Nigeria & Internationally</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[700px] w-full"
          >
            <div className="absolute inset-0 bg-secondary/10 translate-x-4 translate-y-4"></div>
            <img 
              src="/__mockup/images/hero.png" 
              alt="Legal desk with gavel" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-[110%]"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-border bg-muted py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50 text-center">
            <div className="px-4">
              <div className="text-4xl font-serif text-primary mb-2">8+</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Years Experience</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-serif text-primary mb-2">200+</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Clients Served</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-serif text-primary mb-2">95%</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Success Rate</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-serif text-primary mb-2">24/7</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12"
          >
            <motion.div variants={fadeInUp} className="group">
              <div className="w-12 h-12 bg-muted flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-serif text-primary mb-4">Comprehensive Legal Support</h3>
              <p className="text-muted-foreground leading-relaxed">A wide range of expertise covering advisory, compliance, documentation, and representation across diverse sectors.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="group">
              <div className="w-12 h-12 bg-muted flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                <Briefcase className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-serif text-primary mb-4">Practical, Business-Focused</h3>
              <p className="text-muted-foreground leading-relaxed">We deliver solutions aligned with real-life business and personal needs, not just theoretical legal advice.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="group">
              <div className="w-12 h-12 bg-muted flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-serif text-primary mb-4">Reliable & Responsive</h3>
              <p className="text-muted-foreground leading-relaxed">Timely, professional, and detail-oriented service delivery. We value your time and business continuity.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About / Principal Partner */}
      <section id="about" className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative">
              <img 
                src="/__mockup/images/gloria.png" 
                alt="Gloria Ondah" 
                className="w-full h-full object-cover object-top filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="w-12 h-[2px] bg-secondary mb-4"></div>
              <h2 className="text-3xl font-serif mb-2">Gloria Ondah</h2>
              <p className="text-primary-foreground/80 font-medium">LL.M, LL.B, BL, ACIArb (UK), CMC — Principal Partner</p>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-serif mb-8 leading-tight">
              Dedicated attention, responsiveness, and consistent service delivery.
            </motion.h2>
            
            <div className="space-y-6 text-primary-foreground/80 leading-relaxed font-light">
              <motion.p variants={fadeInUp}>
                Gloria Ondah is a seasoned legal practitioner with over eight years of experience providing practical and business-focused legal solutions to individuals and organizations.
              </motion.p>
              <motion.p variants={fadeInUp}>
                She has developed strong expertise in corporate and commercial law, contract drafting and review, regulatory compliance, and employment law advisory. Her experience extends to property transactions, dispute resolution, and oil and gas legal advisory.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Clients work directly with the Principal, ensuring dedicated attention, responsiveness, and consistent service delivery across all engagements.
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="mt-12 grid grid-cols-2 gap-8 border-t border-primary-foreground/10 pt-8">
              <div>
                <h4 className="text-secondary font-bold tracking-widest text-xs uppercase mb-3">Our Mission</h4>
                <p className="text-sm text-primary-foreground/70">To provide exceptional, tailored legal solutions that empower our clients to navigate complexities and achieve their goals.</p>
              </div>
              <div>
                <h4 className="text-secondary font-bold tracking-widest text-xs uppercase mb-3">Our Vision</h4>
                <p className="text-sm text-primary-foreground/70">To be the foremost legal partner in Nigeria, recognized for integrity, excellence, and unwavering commitment to client success.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice-areas" className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Areas of Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-primary">Comprehensive Legal Services</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Corporate & Business Registration", desc: "CAC, NGO, and post-incorporation matters." },
              { icon: FileText, title: "Contract Drafting & Review", desc: "Commercial agreements, NDAs, SLAs, and employment contracts." },
              { icon: Landmark, title: "Regulatory Compliance", desc: "CAC annual returns, NSITF, ITF, PENCOM, PAYE, and tax clearance." },
              { icon: Scale, title: "Litigation & Dispute Resolution", desc: "Civil, commercial, debt recovery, and employment disputes." },
              { icon: Shield, title: "Intellectual Property", desc: "Trademark search, registration, renewal, and brand protection." },
              { icon: MapPin, title: "Property & Real Estate", desc: "Due diligence, title verification, leases, and acquisitions." },
              { icon: Briefcase, title: "Employment & HR Advisory", desc: "Employment contracts, handbooks, and workplace policies." },
              { icon: Droplets, title: "Oil & Gas Legal Advisory", desc: "NUPRC, NMDPRA, NipeX registration, and local content." },
            ].map((area, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 border border-border hover:border-secondary/50 transition-colors group"
              >
                <area.icon className="h-8 w-8 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-serif text-primary mb-3 leading-snug">{area.title}</h4>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{area.desc}</p>
                <a href="#" className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary inline-flex items-center transition-colors">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-background border-y border-border">
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
                { step: "05", title: "Ongoing Support", desc: "Continuous advisory and compliance." }
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

      {/* Trusted By */}
      <section className="py-16 bg-muted/50 overflow-hidden">
        <div className="container mx-auto px-6 mb-8 text-center">
          <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase">Trusted by forward-thinking organizations</h3>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll whitespace-nowrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {["Canada Institute of Knowledge Development", "Magma Oil and Gas", "Stelog Energy Group", "Nokkies Automobile", "NIRSAL Microfinance Bank", "Mirak Global", "Zain Global UK", "Pacific Luxury Homes"].map((name, i) => (
              <li key={i} className="text-xl md:text-2xl font-serif font-bold text-foreground/40">{name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Gloria Ondah & Associates handled our complex regulatory filings with absolute precision. Their attention to detail saved us months of potential delays.", author: "Adaeze Okeke", role: "MD, Magma Oil and Gas" },
              { text: "Finding a legal partner who understands the energy sector's nuances is rare. GOA has been instrumental in our NUPRC compliance and contract negotiations.", author: "Tunde Bakare", role: "Founder, Stelog Energy" },
              { text: "From due diligence to final acquisition, their real estate advisory is top-tier. They don't just point out risks; they provide viable business solutions.", author: "Chiamaka Eze", role: "Director, Pacific Luxury Homes" }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 border border-border bg-muted/20 relative">
                <div className="text-6xl text-secondary/20 font-serif absolute top-4 left-4">"</div>
                <p className="relative z-10 text-muted-foreground leading-relaxed mb-8 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-primary">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="py-24 bg-muted border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Knowledge Center</h2>
              <h3 className="text-4xl font-serif text-primary">Latest Insights</h3>
            </div>
            <Button variant="link" className="hidden md:flex text-primary hover:text-secondary">
              View all articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: "insight-1.png", tag: "Corporate", title: "Filing Annual Returns with the CAC: A 2026 Guide" },
              { img: "insight-2.png", tag: "Intellectual Property", title: "Trademark Protection for Nigerian Startups" },
              { img: "insight-3.png", tag: "Energy Law", title: "Navigating NUPRC Compliance for Indigenous Operators" }
            ].map((post, i) => (
              <a href="#" key={i} className="group block">
                <div className="aspect-square mb-6 overflow-hidden bg-background">
                  <img src={`/__mockup/images/${post.img}`} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">{post.tag}</div>
                <h4 className="text-xl font-serif text-primary leading-snug group-hover:text-secondary transition-colors">{post.title}</h4>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-serif mb-8">Ready to Get Started? Book Your Free Consultation Today.</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-none h-14 px-8 text-base">
              Book Now
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-none h-14 px-8 text-base">
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-background pt-24 pb-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h3 className="text-3xl font-serif text-primary mb-8">Contact Us</h3>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="font-bold text-primary mb-4 flex items-center"><MapPin className="h-4 w-4 mr-2 text-secondary" /> Abuja Office</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">No. 28, 3rd Avenue,<br/>Gwarinpa Estate, Abuja</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-4 flex items-center"><MapPin className="h-4 w-4 mr-2 text-secondary" /> Lagos Office</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">Address coming soon</p>
                </div>
              </div>

              <div className="space-y-4 mb-12">
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 mr-4 text-secondary" /> {PHONE_NUMBER}
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-5 w-5 mr-4 text-secondary" /> {WHATSAPP_NUMBER}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 mr-4 text-secondary" /> {EMAIL}
                </a>
              </div>

              <div className="p-6 bg-muted border border-border">
                <h4 className="font-bold text-primary mb-2">Business Hours</h4>
                <p className="text-sm text-muted-foreground">Office: Monday - Friday, 8:00 AM - 6:00 PM</p>
                <p className="text-sm text-muted-foreground">Consultation: 24/7 Available</p>
              </div>
            </div>

            <div>
              <div className="bg-muted/30 p-8 border border-border">
                <h3 className="text-2xl font-serif text-primary mb-6">Send a Message</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</label>
                      <Input className="rounded-none border-border bg-background h-12" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</label>
                      <Input className="rounded-none border-border bg-background h-12" placeholder="+234..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                    <Input type="email" className="rounded-none border-border bg-background h-12" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Service Required</label>
                    <Input className="rounded-none border-border bg-background h-12" placeholder="e.g. Corporate Registration" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                    <Textarea className="rounded-none border-border bg-background min-h-[120px]" placeholder="How can we help you?" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-14">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-64 bg-muted border border-border mb-16 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 bg-background px-6 py-3 border border-border shadow-sm flex items-center gap-2">
              <MapPin className="text-secondary h-4 w-4" />
              <span className="font-medium text-sm">Gwarinpa Estate, Abuja</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-6">
            <div className="flex gap-4">
              <span className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground border border-border">NBA Member</span>
              <span className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground border border-border">CAC Registered</span>
              <span className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground border border-border">NDPR Compliant</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2026 Gloria Ondah & Associates — BN-3068204
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Add Marquee animation to tailwind via style tag or config - handling here with style */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 25s linear infinite;
        }
      `}} />
    </div>
  );
}
