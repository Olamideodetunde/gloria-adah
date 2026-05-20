import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '../shared/motion';
import { routes, getPracticeRoute, practiceIcons } from '../shared/routes';
import { practiceAreas } from '../shared/practiceAreas';
import { CTABand } from '../shared/CTABand';
import { TrustSignals } from '../shared/TrustSignals';
import { HowItWorks } from '../shared/HowItWorks';
import { PricingTable } from '../shared/PricingTable';

export function Home() {
  return (
    <>
      {/* Hero Section - Wine Gradient Background with Image Overlay */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Wine gradient background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #800020 0%, #6f1d1b 42%, #5b1918 100%)'
          }}
        />
        
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, rgba(128,0,32,0.72), rgba(111,29,27,0.54)),
                url('/images/hero.png')
              `,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {/* Additional gradient overlay for depth */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(circle at 18% 22%, rgba(255,255,255,0.08), transparent 22%),
                radial-gradient(circle at 78% 38%, rgba(215,162,75,0.08), transparent 20%),
                linear-gradient(180deg, rgba(7,22,38,0.14), rgba(7,22,38,0.42))
              `
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 py-32 sm:py-40 lg:py-48 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Overline with decorative element */}
              <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #d7a24b, rgba(255,255,255,0.1))' }} />
                <span className="text-[#f2ddb2] text-[11px] sm:text-[13px] font-bold tracking-[0.24em] uppercase">
                  COMMITTED TO EXCELLENCE
                </span>
              </motion.div>

              {/* Main Headline - Responsive sizing */}
              <motion.h1 
                variants={fadeInUp} 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.7rem] leading-[0.98] mb-6 sm:mb-7 font-serif font-bold text-white max-w-[11ch]"
                style={{ letterSpacing: '-0.03em', textWrap: 'balance' }}
              >
                Securing Your Business{' '}
                <span className="text-[#ffe7ad] italic">Interests.</span>
              </motion.h1>

              {/* Sub-headline with responsive sizing */}
              <motion.p 
                variants={fadeInUp} 
                className="text-base sm:text-lg lg:text-[1.12rem] text-white/86 mb-8 sm:mb-10 leading-[1.75] max-w-[620px]"
              >
                Providing comprehensive legal services that drive growth, compliance and business success for startups, SMEs, and foreign investors across Nigeria.
              </motion.p>

              {/* CTA Buttons - Mobile optimized */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center">
                <a href={routes.booking} className="w-full sm:w-auto">
                  <button
                    className="w-full sm:w-auto h-14 sm:h-[60px] px-6 sm:px-8 rounded-full font-extrabold text-[#17202d] transition-transform hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #ffbf4d, #eb9f24)',
                      boxShadow: '0 16px 30px rgba(235,159,36,0.22)'
                    }}
                  >
                    Book Consultation
                    <ArrowRight className="inline-block ml-2 h-[18px] w-[18px]" />
                  </button>
                </a>
                <a href="https://wa.me/2347054588490" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                  <button
                    className="w-full sm:w-auto h-14 sm:h-[60px] px-6 sm:px-8 rounded-full font-extrabold text-white border border-white/22 transition-transform hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(14px)'
                    }}
                  >
                    <FaWhatsapp className="inline-block mr-2 h-[18px] w-[18px]" />
                    Request Legal Support
                  </button>
                </a>
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-4 flex items-center gap-2 text-[#f2ddb2]/80 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Typically responds within 1 hour during business hours.</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute left-6 bottom-6 flex items-center gap-3 text-white/62 text-sm tracking-[0.08em] uppercase">
          <div 
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: '#f0b247',
              boxShadow: '0 0 0 0 rgba(240,178,71,0.55)',
              animation: 'pulse 1.8s infinite'
            }}
          />
          <span className="hidden sm:inline">Scroll to explore</span>
        </div>
      </section>

      {/* Trust Signals Section */}
      <TrustSignals />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pricing Table Section */}
      <PricingTable />

      <section className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-3 sm:mb-4">AREAS OF EXPERTISE</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary">Comprehensive Legal Services</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-1">
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
                  className="bg-white p-8 sm:p-10 border border-border hover:border-secondary transition-colors group block"
                >
                  <Icon className="h-8 sm:h-10 w-8 sm:w-10 text-secondary mb-5 sm:mb-6 group-hover:scale-105 transition-transform" />
                  <h4 className="text-base sm:text-lg font-serif font-bold text-primary mb-2 sm:mb-3 leading-snug">{area.title}</h4>
                  <p className="text-sm text-muted-foreground mb-5 sm:mb-6 line-clamp-2 leading-relaxed">{area.short}</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary inline-flex items-center transition-colors">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </motion.a>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <a href={routes.booking} className="inline-block">
              <button
                className="h-14 px-8 rounded-full font-bold text-[#17202d] transition-transform hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #ffbf4d, #eb9f24)',
                  boxShadow: '0 16px 30px rgba(235,159,36,0.22)'
                }}
              >
                Schedule a Call
                <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Partners & Clients
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16 max-w-5xl mx-auto items-center justify-items-center">
            {/* NNPC */}
            <div className="flex items-center justify-center h-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 200 60" className="max-h-12 w-auto object-contain">
                <g transform="translate(10, 5)">
                  <path d="M 0,25 L 15,5 L 35,5 L 20,25 Z" fill="#2E7D32" />
                  <path d="M 20,25 L 35,5 L 45,18 L 30,38 Z" fill="#FBC02D" />
                  <path d="M 10,38 L 30,38 L 20,50 L 0,50 Z" fill="#C62828" />
                  <path d="M 30,38 L 45,18 L 50,30 L 35,50 Z" fill="#2E7D32" fillOpacity="0.8" />
                </g>
                <text x="70" y="38" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="28" fill="#1C2D37" letterSpacing="1">NNPC</text>
              </svg>
            </div>

            {/* SLB */}
            <div className="flex items-center justify-center h-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 160 50" className="max-h-12 w-auto object-contain">
                <g transform="translate(5, 5)">
                  <path d="M 0,25 C 20,10 40,35 60,35 L 60,15 C 40,15 20,0 0,15 Z" fill="#0033A0" />
                  <text x="65" y="32" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="36" fill="#0033A0" letterSpacing="-2">slb</text>
                </g>
              </svg>
            </div>

            {/* Shell */}
            <div className="flex items-center justify-center h-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 50 50" className="max-h-12 w-auto object-contain">
                <path d="M 25,2 C 12,2 5,10 5,20 C 5,28 10,33 13,38 L 8,46 L 16,46 L 18,43 C 20,44 22,45 25,45 C 28,45 30,44 32,43 L 34,46 L 42,46 L 37,38 C 40,33 45,28 45,20 C 45,10 38,2 25,2 Z" fill="#FFD500" stroke="#E21B23" strokeWidth="3" />
                <path d="M 25,7 C 22,7 18,9 15,13 L 20,38 C 22,39 23,40 25,40 C 27,40 28,39 30,38 L 35,13 C 32,9 28,7 25,7 Z" fill="#E21B23" />
                <path d="M 12,18 C 12,18 14,30 20,34" stroke="#E21B23" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 38,18 C 38,18 36,30 30,34" stroke="#E21B23" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Reservoir Group */}
            <div className="flex items-center justify-center h-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 220 50" className="max-h-10 w-auto object-contain">
                <g transform="translate(5, 5)">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="#0056B3" strokeWidth="3" />
                  <path d="M 20,9 C 20,9 13,18 13,21 C 13,25 16,28 20,28 C 24,28 27,25 27,21 C 27,18 20,9 20,9 Z" fill="#FBC02D" stroke="#0056B3" strokeWidth="2" />
                  <text x="48" y="24" fontFamily="'Outfit', sans-serif" fontWeight="bold" fontSize="13" fill="#0056B3" letterSpacing="1.2">RESERVOIR GROUP</text>
                </g>
              </svg>
            </div>

            {/* Renaissance */}
            <div className="flex items-center justify-center h-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 220 50" className="max-h-10 w-auto object-contain">
                <g transform="translate(5, 5)">
                  <path d="M 5,25 C 10,12 25,12 35,18 C 25,18 18,22 15,30 Z" fill="#E67E22" />
                  <path d="M 15,30 C 22,25 35,28 40,32 C 30,35 18,35 10,28 Z" fill="#27AE60" />
                  <text x="48" y="22" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="16" fill="#27AE60" letterSpacing="0.8">RENAISSANCE</text>
                  <text x="48" y="32" fontFamily="'Outfit', sans-serif" fontSize="6.5" fill="#7F8C8D" letterSpacing="0.3">AFRICA ENERGY COMPANY LIMITED</text>
                </g>
              </svg>
            </div>

            {/* Baker Hughes */}
            <div className="flex items-center justify-center h-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 200 50" className="max-h-12 w-auto object-contain">
                <g transform="translate(5, 5)">
                  <path d="M 5,8 L 22,20 L 5,32 L 12,32 L 29,20 L 12,8 Z" fill="#00A86B" />
                  <path d="M 18,8 L 35,20 L 18,32 L 25,32 L 42,20 L 25,8 Z" fill="#00A86B" fillOpacity="0.7" />
                  <text x="50" y="22" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="20" fill="#004B23">Baker</text>
                  <text x="50" y="38" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="18" fill="#004B23">Hughes</text>
                </g>
              </svg>
            </div>

            {/* Seplat Energy */}
            <div className="flex items-center justify-center h-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 160 50" className="max-h-12 w-auto object-contain">
                <g transform="translate(5, 5)">
                  <text x="5" y="30" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="30" fill="#C62828">Seplat</text>
                  <text x="90" y="30" fontFamily="'Outfit', sans-serif" fontWeight="300" fontSize="28" fill="#2E7D32">nergy</text>
                  <path d="M 10,38 C 45,38 75,34 140,32" stroke="#2E7D32" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                </g>
              </svg>
            </div>

            {/* ExxonMobil */}
            <div className="flex items-center justify-center h-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 180 50" className="max-h-12 w-auto object-contain">
                <g transform="translate(5, 5)">
                  <text x="0" y="32" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="30" fill="#E21B23" letterSpacing="-1.5">ExxonMobil</text>
                </g>
              </svg>
            </div>
          </div>
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
    <div className="p-8 sm:p-10 border border-border bg-white relative h-full">
      <div className="text-5xl sm:text-6xl text-secondary/15 font-serif absolute top-4 sm:top-6 left-4 sm:left-6">"</div>
      <p className="relative z-10 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">"{testimonial.text}"</p>
      <div className="border-t border-secondary pt-3 sm:pt-4">
        <div className="font-bold text-sm sm:text-base text-primary">{testimonial.author}</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">{testimonial.role}</div>
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
    <section className="py-16 sm:py-20 lg:py-24 bg-muted">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-3 sm:mb-4">CLIENT TESTIMONIALS</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary">Trusted by Industry Leaders</h3>
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
