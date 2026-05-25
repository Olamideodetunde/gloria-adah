import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';

export function TrustSignals() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-[#800020] via-[#6f1d1b] to-[#5b1918] text-white relative overflow-hidden">
      {/* Subtle ambient lighting for a modern premium feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* Subtle classical border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 text-xs font-bold tracking-widest text-secondary uppercase mb-6">
          <ShieldCheck className="h-3.5 w-3.5" /> Trusted Legal Partner
        </div>
        <h3 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight mb-4">
          Gloria Ondah & Associates
        </h3>
        <div className="text-sm sm:text-base font-serif text-secondary font-medium border-y border-secondary/20 py-2 inline-block px-6 mb-8 uppercase tracking-widest">
          Founded in 2015 | Officially Registered in 2020
        </div>
        <p className="text-white/85 leading-relaxed text-lg sm:text-xl max-w-3xl mx-auto mb-10 font-light">
          A trusted name in Nigerian legal practice, delivering excellence and integrity in every case. We provide practical, commercially sound, and result-oriented legal solutions tailored to the business and regulatory needs of startups, corporations, and multinational clients.
        </p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-white/90">
          <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-secondary" /> 100% Regulatory Compliance</span>
          <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-secondary" /> Active Legal Representation</span>
        </div>
      </div>
    </section>
  );
}
