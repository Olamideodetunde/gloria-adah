import React from 'react';
import { Award, ShieldCheck, CheckCircle } from 'lucide-react';

export function TrustSignals() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/98 to-primary/95 text-white relative overflow-hidden">
      {/* Subtle ambient lighting for a modern premium feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* Subtle classical border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Brand Text & Core Message */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 text-xs font-bold tracking-widest text-secondary uppercase">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted Legal Partner
            </div>
            <h3 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Gloria Ondah & Associates
            </h3>
            <div className="text-lg font-serif text-secondary/90 font-medium border-l-2 border-secondary/50 pl-4 py-1 inline-block lg:block text-left">
              Founded in 2015 | Officially Registered in 2020
            </div>
            <p className="text-white/80 leading-relaxed text-lg max-w-2xl mx-auto lg:mx-0">
              A trusted name in Nigerian legal practice, delivering excellence and integrity in every case. We provide practical, commercially sound, and result-oriented legal solutions tailored to the business and regulatory needs of startups, corporations, and multinational clients.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-sm text-white/90">
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-secondary" /> 100% Regulatory Compliance</span>
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-secondary" /> Active Legal Representation</span>
            </div>
          </div>

          {/* Right Column: Exquisite Gold Seal Certification Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md group">
              {/* Card Outer Glow & Shadow */}
              <div className="absolute inset-0 bg-secondary/10 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 rounded-none pointer-events-none" />
              
              {/* The Certification Document/Seal Layout */}
              <div className="relative bg-primary/40 backdrop-blur-md border-2 border-secondary/30 p-10 text-center hover:border-secondary/60 hover:bg-primary/50 transition-all duration-500 shadow-2xl">
                
                {/* Vintage Corner Brackets/Flourishes */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-secondary/40" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-secondary/40" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-secondary/40" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-secondary/40" />

                {/* Centered Crest/Award Icon Container */}
                <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
                  {/* Decorative rotating gold ring */}
                  <div className="absolute inset-0 border-2 border-dashed border-secondary/40 rounded-full animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-2 border border-secondary/20 rounded-full" />
                  
                  {/* Inner gold seal badge with the official NBA Logo */}
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-secondary/30 group-hover:scale-105 transition-transform duration-300 overflow-hidden p-2">
                    <img 
                      src="/images/nba-logo.jpg" 
                      alt="Nigerian Bar Association (NBA)" 
                      className="w-full h-full object-contain filter group-hover:brightness-105 transition-all" 
                    />
                  </div>
                </div>

                <span className="text-[11px] tracking-[0.3em] uppercase text-secondary font-extrabold block mb-2">
                  Official Status
                </span>
                <h4 className="text-3xl font-serif font-bold text-white mb-2 tracking-wide">
                  NBA Certified
                </h4>
                <div className="w-16 h-px bg-secondary/40 mx-auto my-4" />
                <p className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto">
                  Duly certified by the <strong className="text-secondary font-semibold">Nigerian Bar Association</strong>. Enrolled as a Barrister and Solicitor of the Supreme Court of Nigeria.
                </p>
                
                {/* Seal footer stamp */}
                <div className="text-[10px] text-white/50 uppercase tracking-widest mt-6 font-bold">
                  Accredited Legal Practitioner
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
