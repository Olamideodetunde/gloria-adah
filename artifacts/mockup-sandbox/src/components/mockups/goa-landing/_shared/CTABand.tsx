import React from 'react';
import { Button } from '@/components/ui/button';
import { routes } from './routes';

export function CTABand() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="text-4xl font-serif mb-8">Ready to Get Started? Book Your Consultation Today.</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={routes.booking}>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-none h-14 px-8 text-base">
              Book Consultation
            </Button>
          </a>
          <a href="https://wa.me/2347054588490" target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-none h-14 px-8 text-base">
              Message on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
