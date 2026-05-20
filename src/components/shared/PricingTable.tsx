import React, { useState } from 'react';
import { Check } from 'lucide-react';

export function PricingTable() {
  const [revealedTiers, setRevealedTiers] = useState<Record<number, boolean>>({});

  const toggleReveal = (index: number) => {
    setRevealedTiers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const pricingTiers = [
    {
      name: 'Initial Consultation',
      price: 'FREE',
      duration: '15–30 Minutes',
      description: 'For understanding the client’s issue, determining if we can assist, giving brief preliminary guidance, and building trust.',
      features: [
        'Understand legal issue',
        'Determine if we can assist',
        'Brief preliminary guidance',
        'Build trust & alignment'
      ],
      highlight: true
    },
    {
      name: 'Legal Advisory Session',
      price: '₦20,000 – ₦50,000',
      duration: 'Per session',
      description: 'In-depth legal advice, options analysis, and strategic guidance.',
      features: [
        'Detailed case analysis',
        'Strategic options review',
        'Legal advisory & guidance',
        'Actionable next steps'
      ]
    },
    {
      name: 'Contract Review Consultation',
      price: 'From ₦50,000',
      duration: 'Per document',
      description: 'Comprehensive contract analysis, risk assessment, and review.',
      features: [
        'Thorough document review',
        'Identify hidden risks',
        'Clause-by-clause analysis',
        'Amendment recommendations'
      ]
    },
    {
      name: 'Business Compliance Consultation',
      price: 'From ₦75,000',
      duration: 'Per consultation',
      description: 'Regulatory compliance assessment and corporate structuring advisory.',
      features: [
        'CAC & regulatory audit',
        'Compliance risk mitigation',
        'Filing requirements guide',
        'Corporate structure advisory'
      ]
    },
    {
      name: 'Retainership Consultation',
      price: 'Custom Pricing',
      duration: 'Tailored Retainer',
      description: 'Dedicated legal support and priority representation for your business.',
      features: [
        'Priority access & booking',
        'Ongoing corporate advisory',
        'Drafting & negotiations',
        'Dedicated legal counsel'
      ]
    }
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-muted">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold tracking-widest text-secondary uppercase mb-4">
            TRANSPARENT PRICING
          </h2>
          <h3 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            Consultation & Pricing Structure
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Start with a free consultation to understand your needs. No pressure, no obligation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white border-2 p-8 relative ${
                tier.highlight
                  ? 'border-secondary shadow-lg scale-105'
                  : 'border-border hover:border-secondary/50'
              } transition-all duration-300`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 text-xs font-bold uppercase tracking-wider">
                  Start Here
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-xl font-serif font-bold text-primary mb-2">
                  {tier.name}
                </h4>
                <div className="min-h-[48px] flex items-center mb-2">
                  {revealedTiers[index] ? (
                    <div className="text-3xl font-bold text-secondary animate-in fade-in zoom-in-95 duration-200">
                      {tier.price}
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleReveal(index)}
                      className="text-xs font-bold uppercase tracking-wider text-white bg-primary hover:bg-primary/90 px-4 py-2.5 rounded-none transition-all duration-300 cursor-pointer shadow-sm hover:shadow"
                    >
                      Click to View Fee
                    </button>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {tier.duration}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed min-h-[60px]">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg max-w-4xl mx-auto">
          <p className="text-sm text-foreground/80 leading-relaxed text-center">
            <strong className="text-primary font-bold">Important Note:</strong> Detailed legal advisory, document review, legal opinions, strategy sessions, contract drafting/review, compliance advisory, and ongoing consultations are billable.
          </p>
        </div>
      </div>
    </section>
  );
}
