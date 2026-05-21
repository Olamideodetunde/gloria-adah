import React from 'react';
import { Calendar, FileSearch, Handshake, Briefcase, HeadphonesIcon } from 'lucide-react';
import { routes } from './routes';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Book a Consultation',
      description: 'Schedule your free initial consultation online or via WhatsApp',
      icon: Calendar
    },
    {
      number: '02',
      title: 'Initial Assessment',
      description: 'We understand your legal needs and determine how we can help',
      icon: FileSearch
    },
    {
      number: '03',
      title: 'Engagement & Quotation',
      description: 'Receive a clear proposal with scope of work and transparent pricing',
      icon: Handshake
    },
    {
      number: '04',
      title: 'Legal Work Begins',
      description: 'Our team starts working on your case with full dedication',
      icon: Briefcase
    },
    {
      number: '05',
      title: 'Ongoing Support & Updates',
      description: 'Regular updates and continuous support throughout the process',
      icon: HeadphonesIcon
    }
  ];

  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-[#FCFAF6] border-y border-border/50 relative overflow-hidden">
      {/* Decorative subtle background shapes */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
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

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 xl:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="bg-white border-t-2 border-secondary hover:border-primary shadow-sm hover:shadow-xl p-8 rounded-none relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Number Watermark in Background */}
                <div className="absolute top-4 right-4 text-7xl font-serif font-bold text-secondary/[0.07] group-hover:text-secondary/[0.12] transition-colors duration-300 pointer-events-none select-none">
                  {step.number}
                </div>

                <div>
                  {/* Icon with beautiful gold container */}
                  <div className="w-12 h-12 rounded-full bg-secondary/5 border border-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Icon className="h-5 w-5 text-secondary group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-serif font-bold text-primary mb-3 leading-snug group-hover:text-secondary transition-colors duration-300">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Progress arrow indicator for desktop (except last item) */}
                {index < 4 && (
                  <div className="hidden lg:block absolute top-[50%] -translate-y-1/2 -right-4 z-20 text-secondary/30 transform group-hover:translate-x-1 transition-transform">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Action Trigger */}
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
