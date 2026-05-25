import React from 'react';
import { routes } from './routes';

export function PricingTable() {

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-muted">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-xs font-bold tracking-widest text-secondary uppercase mb-4">
          TRANSPARENT PRICING
        </h2>
        <h3 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-6">
          Consultation & Pricing Structure
        </h3>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Initial consultations under 30 minutes are free. Consultations extending to 30 minutes and above will attract a fee.
        </p>

        <a href={routes.booking} className="inline-block group">
          <button className="h-14 px-10 rounded-full font-bold text-[#17202d] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #ffbf4d, #eb9f24)',
                    boxShadow: '0 16px 30px rgba(235,159,36,0.18)'
                  }}>
            Book a Consultation
            <svg className="inline-block ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </a>
      </div>
    </section>
  );
}

