import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '../shared/motion';
import { routes, getPracticeRoute, practiceIcons } from '../shared/routes';
import { practiceAreas } from '../shared/practiceAreas';
import { CTABand } from '../shared/CTABand';

export function Home() {
  return (
    <>
      {/* Hero Section - Ultra Premium */}
      <section className="relative min-h-screen flex items-center bg-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #002366 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-6 py-40 lg:py-48 relative z-10">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            {/* Left Column - Premium Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-6 max-w-2xl"
            >
              {/* Overline with decorative element */}
              <motion.div variants={fadeInUp} className="mb-8 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-secondary" />
                <span className="text-secondary text-[11px] font-bold tracking-[0.25em] uppercase">
                  COMMITTED TO EXCELLENCE
                </span>
              </motion.div>

              {/* Main Headline - Larger, Bolder */}
              <motion.h1 
                variants={fadeInUp} 
                className="text-6xl sm:text-7xl lg:text-8xl leading-[0.95] mb-10 font-serif font-bold text-primary"
                style={{ letterSpacing: '-0.03em' }}
              >
                Securing Your
                <span className="block mt-2">Business</span>
                <span className="block mt-2 text-secondary italic">Interests.</span>
              </motion.h1>

              {/* Sub-headline with more breathing room */}
              <motion.p 
                variants={fadeInUp} 
                className="text-xl text-muted-foreground mb-14 leading-relaxed max-w-xl font-light"
              >
                Providing comprehensive legal services that drive growth, compliance and business success for startups, SMEs, and foreign investors across Nigeria.
              </motion.p>

              {/* CTA Buttons - More prominent */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 items-center mb-20">
                <a href={routes.booking}>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white h-16 px-12 text-base font-semibold shadow-sm hover:shadow-md transition-all"
                    style={{ borderRadius: '0px' }}
                  >
                    Book a Consultation
                  </Button>
                </a>
                <a href="https://wa.me/2347054588490" target="_blank" rel="noreferrer">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-16 px-10 text-base border-secondary border-[1.5px] text-secondary hover:bg-secondary hover:text-white group transition-all"
                    style={{ borderRadius: '0px' }}
                  >
                    <FaWhatsapp className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </motion.div>

              {/* Stats Bar - More refined */}
              <motion.div 
                variants={fadeInUp} 
                className="flex items-center gap-10 pt-10 border-t border-border/50"
              >
                <div>
                  <div className="text-4xl font-serif font-bold text-primary mb-1">10+</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-[0.15em]">Years Experience</div>
                </div>
                <div className="w-[1px] h-14 bg-border/50" />
                <div>
                  <div className="text-4xl font-serif font-bold text-primary mb-1">200+</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-[0.15em]">Satisfied Clients</div>
                </div>
                <div className="w-[1px] h-14 bg-border/50" />
                <div>
                  <div className="text-4xl font-serif font-bold text-primary mb-1">95%</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-[0.15em]">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Sophisticated Image Treatment */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="lg:col-span-6 relative hidden lg:block"
            >
              {/* Main image container */}
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-secondary/20" />
                
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src="/images/hero.png"
                    alt="Professional Legal Excellence"
                    className="w-full h-full object-cover"
                    style={{ 
                      filter: 'brightness(1.05) contrast(1.08) saturate(0.95)',
                    }}
                  />
                  {/* Gradient overlay for sophistication */}
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      background: 'linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
                    }}
                  />
                </div>
                
                {/* Floating accent card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -bottom-8 -left-8 bg-white border border-border p-8 shadow-lg max-w-xs"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-primary text-lg mb-1">Trusted Partner</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Serving clients across Nigeria & internationally with excellence.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative vertical line */}
              <div 
                className="absolute top-0 -right-12 w-[2px] h-40 bg-gradient-to-b from-secondary to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </section>


      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4">AREAS OF EXPERTISE</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary">Comprehensive Legal Services</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
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
                  className="bg-white p-10 border border-border hover:border-secondary transition-colors group block"
                >
                  <Icon className="h-10 w-10 text-secondary mb-6 group-hover:scale-105 transition-transform" />
                  <h4 className="text-lg font-serif font-bold text-primary mb-3 leading-snug">{area.title}</h4>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{area.short}</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary inline-flex items-center transition-colors">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

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

      <TestimonialsSection />



      <CTABand />
    </>
  );
}

const testimonials = [
  { text: "Gloria Ondah & Associates handled our complex regulatory filings with absolute precision. Their attention to detail saved us months of potential delays.", author: "Adaeze Okeke", role: "MD, Magma Oil and Gas" },
  { text: "Finding a legal partner who understands the energy sector's nuances is rare. GOA has been instrumental in our NUPRC compliance and contract negotiations.", author: "Tunde Bakare", role: "Founder, Stelog Energy" },
  { text: "From due diligence to final acquisition, their real estate advisory is top-tier. They don't just point out risks; they provide viable business solutions.", author: "Chiamaka Eze", role: "Director, Pacific Luxury Homes" },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[number] }) {
  return (
    <div className="p-10 border border-border bg-white relative h-full">
      <div className="text-6xl text-secondary/15 font-serif absolute top-6 left-6">"</div>
      <p className="relative z-10 text-muted-foreground leading-relaxed mb-8">"{testimonial.text}"</p>
      <div className="border-t border-secondary pt-4">
        <div className="font-bold text-primary">{testimonial.author}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{testimonial.role}</div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const go = (delta: number) => {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4">CLIENT TESTIMONIALS</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary">Trusted by Industry Leaders</h3>
        </div>
        
        <div className="hidden md:grid md:grid-cols-3 gap-1">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        <div className="md:hidden">
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <TestimonialCard testimonial={testimonials[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 flex items-center justify-center border border-border bg-white text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 transition-all ${i === index ? 'w-8 bg-secondary' : 'w-4 bg-border'}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="w-10 h-10 flex items-center justify-center border border-border bg-white text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
