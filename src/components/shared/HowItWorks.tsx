import React from 'react';
import { Calendar, FileSearch, Handshake, Briefcase, HeadphonesIcon } from 'lucide-react';
import { routes } from './routes';

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Book a Consultation',
      description: 'Schedule your free initial consultation online or via WhatsApp',
      icon: Calendar
    },
    {
      number: 2,
      title: 'Initial Assessment',
      description: 'We understand your legal needs and determine how we can help',
      icon: FileSearch
    },
    {
      number: 3,
      title: 'Engagement & Quotation',
      description: 'Receive a clear proposal with scope of work and transparent pricing',
      icon: Handshake
    },
    {
      number: 4,
      title: 'Legal Work Begins',
      description: 'Our team starts working on your case with full dedication',
      icon: Briefcase
    },
    {
      number: 5,
      title: 'Ongoing Support & Updates',
      description: 'Regular updates and continuous support throughout the process',
      icon: HeadphonesIcon
    }
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold tracking-widest text-secondary uppercase mb-4">
            OUR PROCESS
          </h2>
          <h3 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            How It Works
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            A simple, transparent process designed to give you peace of mind from start to finish.
          </p>
        </div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-border" 
               style={{ width: 'calc(100% - 120px)', left: '60px' }} 
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-secondary/10 border-4 border-white shadow-lg flex items-center justify-center mb-4 group hover:bg-secondary transition-colors duration-300">
                    <div className="absolute inset-0 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Icon className="h-10 w-10 text-secondary group-hover:text-white relative z-10 transition-colors duration-300" />
                  </div>

                  {/* Step number badge */}
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold z-20">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-serif font-bold text-primary mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href={routes.booking} className="inline-block">
            <button className="h-14 px-8 rounded-full font-bold text-white bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Schedule a Call
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
