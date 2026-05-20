import React from 'react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { routes } from './routes';

export function CTABand() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Ready to Secure Your Business Interests?
        </h2>
        <p className="text-lg text-white/90 mb-8 leading-relaxed">
          Start with a free consultation. No commitment required.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-6">
          <a href={routes.booking} className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-full h-14 px-8 text-base font-bold">
              Book Consultation
            </Button>
          </a>
          <a href="https://wa.me/2347054588490" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary rounded-full h-14 px-8 text-base font-bold transition-all duration-300">
              <FaWhatsapp className="inline-block mr-2 h-5 w-5" />
              Request Legal Support
            </Button>
          </a>
        </div>
        <p className="text-sm text-[#ffe7ad] font-medium flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Typically responds within 1 hour during business hours.
        </p>
      </div>
    </section>
  );
}
