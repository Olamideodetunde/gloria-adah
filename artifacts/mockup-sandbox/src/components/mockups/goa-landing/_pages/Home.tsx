import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Shield, Briefcase, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '../_shared/motion';
import { routes, getPracticeRoute, practiceIcons } from '../_shared/routes';
import { practiceAreas } from '../_shared/practiceAreas';
import { CTABand } from '../_shared/CTABand';

export function Home() {
  return (
    <>
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
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl leading-[1.1] mb-6 text-primary font-serif">
              Securing Your Business Interests in Nigeria.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Providing comprehensive legal services that drive growth, compliance and business success for startups, SMEs, and foreign investors.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center mb-12">
              <a href={routes.booking}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none h-14 px-8 text-base">
                  Book a Consultation
                </Button>
              </a>
              <a href="https://wa.me/2347054588490" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-base border-primary/20 text-primary hover:bg-primary/5 group">
                  <MessageCircle className="mr-2 h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                  Chat on WhatsApp
                </Button>
              </a>
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

      {/* Practice Areas */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Areas of Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-primary">Comprehensive Legal Services</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreas.map((area, i) => {
              const Icon = practiceIcons[area.slug as keyof typeof practiceIcons] || Briefcase;
              return (
                <motion.a 
                  key={area.slug}
                  href={getPracticeRoute(area.slug)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background p-8 border border-border hover:border-secondary/50 transition-colors group block"
                >
                  <Icon className="h-8 w-8 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg font-serif text-primary mb-3 leading-snug">{area.title}</h4>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{area.short}</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary inline-flex items-center transition-colors">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 bg-background overflow-hidden border-y border-border">
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
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Gloria Ondah & Associates handled our complex regulatory filings with absolute precision. Their attention to detail saved us months of potential delays.", author: "Adaeze Okeke", role: "MD, Magma Oil and Gas" },
              { text: "Finding a legal partner who understands the energy sector's nuances is rare. GOA has been instrumental in our NUPRC compliance and contract negotiations.", author: "Tunde Bakare", role: "Founder, Stelog Energy" },
              { text: "From due diligence to final acquisition, their real estate advisory is top-tier. They don't just point out risks; they provide viable business solutions.", author: "Chiamaka Eze", role: "Director, Pacific Luxury Homes" }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 border border-border bg-background relative">
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

      <CTABand />
    </>
  );
}
