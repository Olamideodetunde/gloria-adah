import React from 'react';
import { Award } from 'lucide-react';

export function TrustSignals() {
  const stats = [
    {
      icon: Award,
      value: 'NBA',
      label: 'Certified',
      description: 'Nigerian Bar Association'
    }
  ];

  const affiliations = [
    {
      name: 'Nigerian Bar Association (NBA)',
      logo: '/images/nba-logo.svg',
    },
    {
      name: 'Corporate Affairs Commission (CAC)',
      logo: '/images/cac.webp',
    },
    {
      name: 'International Bar Association (IBA)',
      logo: '/images/iba logo.png',
    }
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold tracking-widest text-secondary uppercase mb-4">
            TRUSTED LEGAL PARTNER
          </h2>
          <h3 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-white">
            Gloria Ondah & Associates
          </h3>
          <p className="text-lg text-white/90 leading-relaxed mb-2">
            Founded in 2015 | Officially Registered in 2020
          </p>
          <p className="text-base text-white/80 leading-relaxed">
            A trusted name in Nigerian legal practice, delivering excellence and integrity in every case.
          </p>
        </div>

        {/* Statistics Grid - Single Prominent Centered Badge */}
        <div className="flex justify-center mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center hover:bg-white/15 transition-all duration-300 max-w-sm w-full shadow-xl"
              >
                <Icon className="h-12 w-12 text-secondary mx-auto mb-4" />
                <div className="text-5xl font-extrabold mb-2 tracking-tight text-white">{stat.value}</div>
                <div className="text-lg font-bold mb-1 uppercase tracking-wider text-secondary">{stat.label}</div>
                <div className="text-sm text-white/80">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Professional Affiliations with Logos */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-10 max-w-4xl mx-auto">
          <h4 className="text-2xl font-serif font-bold text-center mb-8">
            Professional Affiliations
          </h4>
          <div className="grid sm:grid-cols-3 gap-6">
            {affiliations.map((aff, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white border border-white/10 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group"
              >
                <div className="h-16 w-full flex items-center justify-center mb-4">
                  <img
                    src={aff.logo}
                    alt={aff.name}
                    className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
                  />
                </div>
                <div className="text-center text-xs font-bold text-primary uppercase tracking-wider mt-2 line-clamp-2">
                  {aff.name.split(' (')[0]}
                </div>
                <div className="text-center text-[10px] text-secondary font-extrabold uppercase mt-0.5">
                  {aff.name.includes('(') ? aff.name.split(' (')[1].replace(')', '') : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
