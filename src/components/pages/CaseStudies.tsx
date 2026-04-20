import React from 'react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { SectionHeader } from '../shared/SectionHeader';
import { Building2, FileText, Landmark, Scale, Shield, MapPin, Briefcase, Droplets, Quote } from 'lucide-react';

const caseStudies = [
  {
    icon: Building2,
    practice: "Corporate & Business Registration",
    title: "Foreign-Owned Tech Subsidiary — Lagos",
    challenge: "An international software company sought to establish a wholly-owned Nigerian subsidiary to serve West African clients, but faced complex foreign-shareholder rules, NIPC registration, and expatriate quota requirements.",
    approach: "We advised on the optimal corporate structure, secured CAC name reservation, prepared bilingual MEMART, and coordinated NIPC business permit filings alongside expatriate quota and CAP applications.",
    outcome: "The subsidiary was incorporated within 14 working days, fully NIPC-registered within 6 weeks, and the client onboarded its first three Nigerian engineers under a compliant expatriate quota."
  },
  {
    icon: FileText,
    practice: "Contract Drafting & Review",
    title: "SaaS Master Services Agreement — Pan-African Rollout",
    challenge: "A Nigerian fintech needed a master services agreement and supporting SLAs to deploy its platform across five African markets while protecting its IP, limiting liability, and accommodating local data-residency rules.",
    approach: "We drafted a modular MSA with country-specific schedules, layered SLAs with measurable uptime commitments, indemnity caps, and IP carve-outs, and negotiated key terms with three anchor enterprise customers.",
    outcome: "The agreement framework was executed with all three anchor clients without material amendments and is now the firm's standard contract template across new markets."
  },
  {
    icon: Landmark,
    practice: "Regulatory Compliance",
    title: "Restoration of Active Status — Multi-Year Filings",
    challenge: "An SME with three years of unfiled CAC annual returns faced 'Inactive' status and was blocked from opening corporate accounts and bidding for government contracts.",
    approach: "We conducted a full compliance audit, reconstructed financial summaries, calculated and remitted accumulated penalties, and filed all outstanding returns alongside NSITF and ITF backlogs in a single coordinated submission.",
    outcome: "Active status was restored within 21 days, the client successfully opened a new corporate account, and was cleared to bid on a federal procurement opportunity in the same quarter."
  },
  {
    icon: Scale,
    practice: "Litigation & Dispute Resolution",
    title: "Commercial Debt Recovery — ₦80M Receivable",
    challenge: "A construction services company was owed over ₦80 million by a defaulting counterparty who had ignored multiple internal recovery attempts spanning 18 months.",
    approach: "We issued a formal letter of demand with a 14-day window, initiated proceedings in the appropriate Federal High Court division, and concurrently pursued mediation through a court-ordered ADR centre.",
    outcome: "The matter resolved at mediation with a structured settlement covering 92% of the principal plus partial costs, recovered over a 4-month payment plan that the client received in full."
  },
  {
    icon: Shield,
    practice: "Intellectual Property",
    title: "Trademark Portfolio — Consumer Goods Brand",
    challenge: "A growing FMCG brand operating across Nigeria had never registered its core mark and was approached by a third party claiming prior use, threatening rebrand costs estimated in the tens of millions.",
    approach: "We conducted a comprehensive clearance search, filed defensive trademark applications across four relevant classes, prepared evidence of first commercial use, and engaged the opposing party in negotiation.",
    outcome: "All four trademarks were granted; the opposing claim was withdrawn after evidence exchange, and the client retained its brand identity without any rebrand expenditure."
  },
  {
    icon: MapPin,
    practice: "Property & Real Estate",
    title: "Title Verification — Multi-Plot Acquisition",
    challenge: "A real estate developer sought to acquire six adjoining plots in a high-growth Abuja corridor but was concerned about overlapping titles, family disputes, and unperfected Governor's Consent on prior assignments.",
    approach: "We conducted searches at the relevant lands registry on each plot, traced the chain of title back to original allocation, identified two encumbrances, negotiated their resolution, and processed perfection of the new transfer.",
    outcome: "The developer acquired clean, perfected title to all six plots within 90 days and was able to commence construction without title-related delays or insurance loadings."
  },
  {
    icon: Droplets,
    practice: "Oil & Gas Legal Advisory",
    title: "NUPRC Service Permit & Local Content Compliance",
    challenge: "An indigenous service company needed to secure NUPRC permits and demonstrate Nigerian Content Development Monitoring Board (NCDMB) compliance to qualify for upstream contracts being awarded by an IOC.",
    approach: "We mapped the regulatory pathway, prepared and filed permit applications, structured local content documentation including Nigerian-equity and personnel evidence, and liaised with the IOC's pre-qualification team.",
    outcome: "All permits and Nigerian Content Plan approvals were issued within the IOC's tender window; the client was pre-qualified and subsequently awarded a 24-month service contract."
  },
  {
    icon: Briefcase,
    practice: "Employment & HR Advisory",
    title: "Workforce Restructuring — 60-Person Operation",
    challenge: "A medium-sized operations company needed to restructure a 60-person workforce, including redundancies, role consolidations, and updated employment terms, while minimising NICN exposure.",
    approach: "We audited existing contracts, redrafted compliant employment templates, prepared a redundancy framework aligned with the Labour Act and CBA terms, calculated statutory and gratuity entitlements, and ran consultation sessions with affected staff.",
    outcome: "The restructure completed within 8 weeks with zero claims filed at the National Industrial Court and full statutory compliance on PAYE, pension, and severance obligations."
  }
];

export function CaseStudies() {
  return (
    <>
      <PageShell title="Case Studies" breadcrumbs={[{ label: 'Case Studies' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeader
              align="center"
              eyebrow="Representative Matters"
              title="Outcomes That Move Businesses Forward"
              description="A selection of anonymised representative matters across our practice areas. Client names and identifying details are withheld in line with our confidentiality obligations."
            />

            <div className="grid md:grid-cols-2 gap-8 mt-16">
              {caseStudies.map((cs, idx) => {
                const Icon = cs.icon;
                return (
                  <article key={idx} className="border border-border bg-muted/20 p-8 flex flex-col">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                      <div className="w-12 h-12 bg-primary text-white flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-secondary font-medium">{cs.practice}</div>
                        <h3 className="font-serif text-xl text-primary leading-tight mt-1">{cs.title}</h3>
                      </div>
                    </div>

                    <div className="space-y-5 text-sm leading-relaxed">
                      <div>
                        <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-2">Challenge</div>
                        <p className="text-foreground/90">{cs.challenge}</p>
                      </div>
                      <div>
                        <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-2">Our Approach</div>
                        <p className="text-foreground/90">{cs.approach}</p>
                      </div>
                      <div className="bg-primary/5 border-l-2 border-secondary p-4">
                        <div className="text-[11px] tracking-[0.2em] uppercase text-secondary font-bold mb-2">Outcome</div>
                        <p className="text-primary font-medium">{cs.outcome}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-20 p-10 bg-primary text-white text-center">
              <Quote className="h-8 w-8 mx-auto mb-6 text-secondary" />
              <p className="font-serif text-2xl md:text-3xl leading-relaxed max-w-3xl mx-auto mb-6">
                "We are committed to maintaining the highest standards of professionalism, integrity, and ethical conduct in all our engagements."
              </p>
              <div className="text-xs tracking-[0.3em] uppercase text-secondary">— Gloria Ondah, Principal Partner</div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Every matter is unique. The summaries above are illustrative and do not guarantee similar outcomes. Past results do not predict future success.
              </p>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
