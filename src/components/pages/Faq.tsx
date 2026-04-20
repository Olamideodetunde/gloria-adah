import React from 'react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { SectionHeader } from '../shared/SectionHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    category: "Consultations & Fees",
    questions: [
      { q: "Do you charge for initial consultations?", a: "Yes. Our standard Initial Consultation (30 mins) is ₦15,000, and an in-depth Strategy Session (60 mins) is ₦35,000. However, we offer a free Retainer Discovery call for businesses looking to engage us on a monthly retainer basis." },
      { q: "How do you structure your legal fees?", a: "Depending on the matter, we charge flat fees for specific transactions (e.g., company registration, contract drafting), hourly rates for ongoing advisory, or monthly retainer fees for businesses requiring continuous legal support." },
      { q: "Do you offer virtual consultations?", a: "Absolutely. We conduct consultations via Google Meet, Zoom, or WhatsApp video, making our services accessible to clients nationwide and internationally." },
      { q: "What payment methods do you accept?", a: "We accept bank transfers, card payments via our secure online portal, and USSD payments." }
    ]
  },
  {
    category: "Corporate Services",
    questions: [
      { q: "How long does it take to register a Limited Liability Company in Nigeria?", a: "Typically, upon providing all required documentation and successful name reservation, CAC incorporation takes between 3 to 7 working days." },
      { q: "I missed my annual returns filing. Can you help?", a: "Yes. We can calculate your outstanding penalty fees, prepare the required documents, and file all outstanding returns to restore your company to 'Active' status." },
      { q: "Do you assist foreign investors with setting up in Nigeria?", a: "Yes. We provide end-to-end support for foreign direct investment, including business permits, NIPC registration, expatriate quotas, and local incorporation." },
      { q: "What is included in your monthly legal retainer?", a: "Retainers are customized but generally include unlimited brief advisory calls, review of routine contracts, compliance monitoring, and discounted rates on major transactions or litigation." }
    ]
  },
  {
    category: "Compliance & Dispute Resolution",
    questions: [
      { q: "Do you handle NUPRC and NMDPRA registrations for the oil sector?", a: "Yes, we guide indigenous and foreign service companies through the rigorous registration and licensing processes required to operate in Nigeria's energy sector." },
      { q: "Are you NDPR compliant in how you handle client data?", a: "Strictly. We adhere to the Nigeria Data Protection Regulation (NDPR) and maintain attorney-client privilege. Your sensitive business information is secure." },
      { q: "Do you go to court, or only handle paperwork?", a: "We are fully licensed to practice in all Nigerian courts. We handle civil and commercial litigation, though we actively encourage and facilitate Alternative Dispute Resolution (ADR) where it serves the client's best interest." },
      { q: "Which jurisdictions do you cover?", a: "Our primary offices are in Abuja and Lagos, but we represent clients and handle regulatory matters across all states in Nigeria." }
    ]
  }
];

export function Faq() {
  return (
    <>
      <PageShell title="Frequently Asked Questions" breadcrumbs={[{ label: 'FAQ' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <SectionHeader align="center" eyebrow="Clear Answers" title="Common Inquiries" description="Find answers to questions about our processes, timelines, and services." />
            <div className="space-y-16 mt-16">
              {faqs.map((group, idx) => (
                <div key={idx}>
                  <h3 className="text-2xl font-serif text-primary mb-6 pb-2 border-b border-border">{group.category}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {group.questions.map((item, i) => (
                      <AccordionItem key={i} value={`item-${idx}-${i}`} className="border-border">
                        <AccordionTrigger className="text-left font-medium text-foreground hover:text-secondary text-lg">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
            <div className="mt-20 p-8 bg-muted text-center border border-border">
              <h4 className="text-xl font-serif text-primary mb-4">Still have questions?</h4>
              <p className="text-muted-foreground mb-6">We're here to help clarify any legal requirements for your business.</p>
              <a href="#/contact" className="inline-block px-8 py-3 bg-primary text-white font-medium hover:bg-primary/90 transition-colors">Contact Us</a>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
