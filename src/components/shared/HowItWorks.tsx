import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { routes } from './routes';

export function HowItWorks() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const steps = [
    {
      title: 'Book a Consultation',
      description: 'Schedule your free initial consultation online or via WhatsApp'
    },
    {
      title: 'Initial Assessment',
      description: 'We understand your legal needs and determine how we can help'
    },
    {
      title: 'Engagement & Quotation',
      description: 'Receive a clear proposal with scope of work and transparent pricing'
    },
    {
      title: 'Legal Work Begins',
      description: 'Our team starts working on your case with full dedication'
    },
    {
      title: 'Ongoing Support & Updates',
      description: 'Regular updates and continuous support throughout the process'
    }
  ];

  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-[#FCFAF6] border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-xs font-bold tracking-[0.24em] text-secondary uppercase mb-4">
            OUR STRUCTURED PROCESS
          </h2>
          <h3 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-5">
            How It Works
          </h3>
          <div className="w-16 h-[2px] bg-secondary mx-auto mb-6" />
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A simple, transparent process designed to give you peace of mind from start to finish.
          </p>
        </div>

        <div className="bg-white border border-border/50 shadow-sm">
          {steps.map((step, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-border/50 last:border-b-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-muted/30 transition-colors"
                >
                  <span className="text-xl font-serif font-bold text-primary">
                    <span className="text-secondary/70 mr-4 font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                    {step.title}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-secondary flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-8 pt-0 animate-in slide-in-from-top-2 fade-in duration-200">
                    <p className="text-muted-foreground text-lg leading-relaxed pl-10">
                      {step.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 sm:mt-20 text-center">
          <a href={routes.booking} className="inline-block group">
            <button className="h-14 px-8 rounded-full font-bold text-[#17202d] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #ffbf4d, #eb9f24)',
                      boxShadow: '0 16px 30px rgba(235,159,36,0.18)'
                    }}>
              Schedule a Call
              <svg className="inline-block ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
