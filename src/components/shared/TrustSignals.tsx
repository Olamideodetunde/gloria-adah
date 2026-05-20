import React from 'react';
import { Award, Users, Briefcase, TrendingUp } from 'lucide-react';

export function TrustSignals() {
  const stats = [
    {
      icon: Users,
      value: '200+',
      label: 'Clients Served',
      description: 'Across multiple sectors'
    },
    {
      icon: Briefcase,
      value: '500+',
      label: 'Cases Handled',
      description: 'Successfully resolved'
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Success Rate',
      description: 'Client satisfaction'
    },
    {
      icon: Award,
      value: 'NBA',
      label: 'Certified',
      description: 'Nigerian Bar Association'
    }
  ];

  const affiliations = [
    'Nigerian Bar Association (NBA)',
    'Corporate Affairs Commission (CAC)',
    'International Bar Association (IBA)'
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
          <h3 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Gloria Ondah & Associates
          </h3>
          <p className="text-lg text-white/90 leading-relaxed mb-2">
            Founded in 2015 | Officially Registered in 2020
          </p>
          <p className="text-base text-white/80 leading-relaxed">
            A trusted name in Nigerian legal practice, delivering excellence and integrity in every case.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300"
              >
                <Icon className="h-10 w-10 text-secondary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-white/70">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Professional Affiliations */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 max-w-4xl mx-auto">
          <h4 className="text-xl font-serif font-bold text-center mb-6">
            Professional Affiliations
          </h4>
          <div className="grid sm:grid-cols-3 gap-4">
            {affiliations.map((affiliation, index) => (
              <div
                key={index}
                className="text-center py-3 px-4 bg-white/5 border border-white/10 text-sm font-medium"
              >
                {affiliation}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
