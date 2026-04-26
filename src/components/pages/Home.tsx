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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
        {/* Background texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />

        {/* Hero image — floats right, fades into background */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute right-0 top-0 h-full w-full lg:w-[58%] pointer-events-none"
        >
          <img
            src="/images/hero.png"
            alt="Legal desk with gavel"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'grayscale(15%) sepia(20%) contrast(105%) brightness(0.65)' }}
          />
          {/* Mobile: strong overlay so text is fully readable */}
          <div className="absolute inset-0 lg:hidden" style={{ background: 'hsl(var(--primary) / 0.82)' }} />
          {/* Desktop: left fade into dark bg */}
          <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) 10%, transparent 55%)' }} />
          {/* Bottom fade */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(var(--primary)) 0%, transparent 35%)' }} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 pt-36 pb-24 lg:pt-48 lg:pb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl leading-[1.12] mb-8 font-serif">
              <span className="text-white">Securing Your Business </span><span className="text-secondary italic">Interests</span><span className="text-white"> in </span><span className="text-secondary italic">Nigeria.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-white/70 mb-12 leading-relaxed max-w-xl">
              Providing comprehensive legal services that drive growth, compliance and business success for startups, SMEs, and foreign investors.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center mb-14">
              <a href={routes.booking}>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-none h-14 px-10 text-base font-semibold shadow-lg shadow-secondary/20">
                  Book a Consultation
                </Button>
              </a>
              <a href="https://wa.me/2347054588490" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-base border-white/30 text-white hover:bg-white/10 group">
                  <FaWhatsapp className="mr-2 h-5 w-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                  Chat on WhatsApp
                </Button>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-6 border-t border-white/20 pt-8">
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-secondary">8+</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Years</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-secondary">200+</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Clients</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-secondary">95%</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Success Rate</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/20" />
              <div className="hidden sm:block text-sm text-white/50 leading-relaxed">
                Serving clients across<br />Nigeria & internationally
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


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
    <div className="p-8 border border-border bg-background relative h-full">
      <div className="text-6xl text-secondary/20 font-serif absolute top-4 left-4">"</div>
      <p className="relative z-10 text-muted-foreground leading-relaxed mb-8 italic">"{testimonial.text}"</p>
      <div>
        <div className="font-bold text-primary">{testimonial.author}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{testimonial.role}</div>
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
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="hidden md:grid md:grid-cols-3 gap-8">
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
              className="w-10 h-10 flex items-center justify-center border border-border bg-background text-primary hover:bg-primary hover:text-white transition-colors"
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
              className="w-10 h-10 flex items-center justify-center border border-border bg-background text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
