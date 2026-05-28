import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  Calculator, 
  Layers, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';
import { routes } from '../shared/routes';
import { Button } from '@/components/ui/button';

type EntityType = 'business_name' | 'limited_liability' | 'ngo_association' | 'holding_company';
type ShareCapitalOption = 1000000 | 5000000 | 10000000 | 20000000;

export function ServicesPackages() {
  const [activeTab, setActiveTab] = useState<'packages' | 'calculator' | 'bespoke'>('packages');

  // Calculator states
  const [entityType, setEntityType] = useState<EntityType>('limited_liability');
  const [shareCapital, setShareCapital] = useState<ShareCapitalOption>(1000000);
  const [directorsCount, setDirectorsCount] = useState<number>(2);
  const [hasForeignParticipation, setHasForeignParticipation] = useState<boolean>(false);
  const [isExpedited, setIsExpedited] = useState<boolean>(false);
  const [addOns, setAddOns] = useState<string[]>([]);

  // Bespoke form states
  const [bespokeSubmitted, setBespokeSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'Contract Drafting & Review',
    details: '',
    urgency: 'Standard'
  });

  // Calculate fees dynamically
  const calculateEstimatedFee = () => {
    let base = 80000;
    if (entityType === 'business_name') base = 30000;
    else if (entityType === 'ngo_association') base = 150000;
    else if (entityType === 'holding_company') base = 350000;

    let capitalInc = 0;
    if (entityType === 'limited_liability' || entityType === 'holding_company') {
      if (shareCapital === 5000000) capitalInc = 60000;
      else if (shareCapital === 10000000) capitalInc = 120000;
      else if (shareCapital === 20000000) capitalInc = 250000;
    }

    const additionalDirectors = Math.max(0, directorsCount - 2);
    const directorsFee = additionalDirectors * 15000;

    const foreignFee = hasForeignParticipation ? 150000 : 0;
    const expeditedFee = isExpedited ? 50000 : 0;

    let addOnTotal = 0;
    if (addOns.includes('tin')) addOnTotal += 25000;
    if (addOns.includes('trademark')) addOnTotal += 95000;
    if (addOns.includes('scuml')) addOnTotal += 40000;

    return base + capitalInc + directorsFee + foreignFee + expeditedFee + addOnTotal;
  };

  const formattedFee = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(calculateEstimatedFee());

  const handleAddOnToggle = (id: string) => {
    setAddOns(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBespokeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setBespokeSubmitted(true);
    setTimeout(() => {
      setBespokeSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: 'Contract Drafting & Review',
        details: '',
        urgency: 'Standard'
      });
    }, 5000);
  };

  return (
    <>
      <PageShell title="Services & Packages" breadcrumbs={[{ label: 'Services & Packages' }]}>
        
        {/* Intro Hero banner */}
        <section className="py-20 bg-background border-b border-border">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Structured Legal Offerings</h2>
            <h3 className="text-4xl sm:text-5xl font-serif text-primary mb-6 leading-tight max-w-4xl mx-auto">
              Transparent, Professional Frameworks for Corporate Growth
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Whether you are an early-stage startup, a growing SME, or an international investor expanding into Nigeria, we offer clear, standardized service tiers and interactive tools to ensure seamless compliance and corporate onboarding.
            </p>

            {/* Premium Tab Toggles */}
            <div className="flex justify-center mt-12">
              <div className="inline-flex p-1 bg-muted border border-border rounded-none shadow-sm">
                {[
                  { id: 'packages', label: 'Standardized Packages', icon: Layers },
                  { id: 'calculator', label: 'Interactive Fee Calculator', icon: Calculator },
                  { id: 'bespoke', label: 'Bespoke Corporate Services', icon: FileText }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all ${
                        isActive 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'text-muted-foreground hover:text-primary hover:bg-background'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Tab Contents */}
        <section className="py-20 bg-muted/20 min-h-[500px]">
          <div className="container mx-auto px-6 max-w-7xl">
            <AnimatePresence mode="wait">
              {activeTab === 'packages' && (
                <motion.div
                  key="packages"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <h3 className="text-3xl font-serif text-primary mb-4">SME & Startup Registration Bundles</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Sleek legal packages tailored for modern founders and businesses looking to incorporate correctly, establish strict corporate governance, and kickstart operations with zero legal surprises.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                    
                    {/* Starter Package Card */}
                    <div className="bg-background border border-border flex flex-col justify-between hover:border-secondary/40 hover:shadow-lg transition-all duration-300 p-8">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary bg-secondary/10 px-2.5 py-1">Standard Setup</span>
                            <h4 className="text-2xl font-serif font-bold text-primary mt-3">Starter Package</h4>
                          </div>
                        </div>
                        <div className="mb-6">
                          <span className="text-sm font-medium text-muted-foreground">Starting from</span>
                          <div className="text-4xl font-serif font-bold text-primary mt-1">₦95,000</div>
                          <span className="text-[10px] text-muted-foreground leading-none mt-1 block">*Excludes statutory government filing fees</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                          Perfect for early-stage business setups requiring standard Limited Liability Company (LLC) or Business Name registration.
                        </p>
                        
                        <div className="border-t border-border pt-6">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">What's Included:</h5>
                          <ul className="space-y-3.5">
                            {[
                              'CAC Corporate Name Reservation',
                              'Standard Company Registration (1M Shares)',
                              'Official CAC Status Report & Incorporation Documents',
                              'Digital Certified True Copies (CTC) delivery',
                              'Basic Corporate Bank Account Support Letter'
                            ].map((inc, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-tight">
                                <CheckCircle2 className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-8 mt-8 border-t border-border/60">
                        <a href={`${routes.booking}?service=Starter%20Registration%20Package`} className="block">
                          <Button className="w-full bg-primary/5 border border-primary/20 text-primary hover:bg-primary hover:text-white" style={{ borderRadius: '0px' }}>
                            Order Starter Bundle
                          </Button>
                        </a>
                      </div>
                    </div>

                    {/* Growth Package Card */}
                    <div className="bg-background border-2 border-secondary flex flex-col justify-between shadow-md relative hover:shadow-xl transition-all duration-300 p-8">
                      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-secondary text-primary font-bold text-[10px] tracking-widest uppercase px-4 py-1.5 shadow-sm">
                        Most Popular
                      </div>
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1">Comprehensive Compliance</span>
                            <h4 className="text-2xl font-serif font-bold text-primary mt-3">Growth Package</h4>
                          </div>
                        </div>
                        <div className="mb-6">
                          <span className="text-sm font-medium text-muted-foreground">Starting from</span>
                          <div className="text-4xl font-serif font-bold text-primary mt-1">₦175,000</div>
                          <span className="text-[10px] text-muted-foreground leading-none mt-1 block">*Excludes statutory government filing fees</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                          Tailored for growing SMEs and startups that require full formalization, regulatory tax compliance, and commercial readiness.
                        </p>
                        
                        <div className="border-t border-border pt-6">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Includes everything in Starter, plus:</h5>
                          <ul className="space-y-3.5">
                            {[
                              'Tax Identification Number (TIN) Registration',
                              'Federal Inland Revenue Service (FIRS) Setup Support',
                              'SCUML Anti-Money Laundering Compliance Advisory',
                              'Standard Corporate Share Allocation setup',
                              '3 Months Basic Legal Compliance & Regulatory Support'
                            ].map((inc, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-tight">
                                <CheckCircle2 className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                                <span className="font-medium text-foreground/90">{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-8 mt-8 border-t border-border/60">
                        <a href={`${routes.booking}?service=Growth%20Registration%20Package`} className="block">
                          <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold" style={{ borderRadius: '0px' }}>
                            Order Growth Bundle
                          </Button>
                        </a>
                      </div>
                    </div>

                    {/* Premium Package Card */}
                    <div className="bg-background border border-border flex flex-col justify-between hover:border-secondary/40 hover:shadow-lg transition-all duration-300 p-8">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary bg-secondary/10 px-2.5 py-1">Full Advisory Suite</span>
                            <h4 className="text-2xl font-serif font-bold text-primary mt-3">Premium Package</h4>
                          </div>
                        </div>
                        <div className="mb-6">
                          <span className="text-sm font-medium text-muted-foreground">Starting from</span>
                          <div className="text-4xl font-serif font-bold text-primary mt-1">₦295,000</div>
                          <span className="text-[10px] text-muted-foreground leading-none mt-1 block">*Excludes statutory government filing fees</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                          Ultimate suite for high-potential startups and multinational subsidiaries expanding operations into Nigeria.
                        </p>
                        
                        <div className="border-t border-border pt-6">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Includes everything in Growth, plus:</h5>
                          <ul className="space-y-3.5">
                            {[
                              'Federal Trademark Registration (1 Class Filing)',
                              'Pre-drafted Board Resolution & Share Allotment Templates',
                              'Standard Employment Contract Template',
                              'Non-Disclosure Agreement (NDA) custom draft',
                              'Complimentary 30-Minute Legal Advisory Session with a Partner'
                            ].map((inc, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-tight">
                                <CheckCircle2 className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-8 mt-8 border-t border-border/60">
                        <a href={`${routes.booking}?service=Premium%20Registration%20Package`} className="block">
                          <Button className="w-full bg-primary/5 border border-primary/20 text-primary hover:bg-primary hover:text-white" style={{ borderRadius: '0px' }}>
                            Order Premium Bundle
                          </Button>
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* Informational disclaimer bar */}
                  <div className="max-w-4xl mx-auto bg-background border border-border/80 p-6 flex flex-col sm:flex-row items-center gap-4 mt-12">
                    <AlertCircle className="h-6 w-6 text-secondary shrink-0" />
                    <p className="text-xs text-muted-foreground text-center sm:text-left leading-relaxed">
                      <strong>Important Notice:</strong> Corporate registration placeholder packages reflect professional service fees for handling the end-to-end legal filing process. Actual government levies, filing fees, stamp duties, and external disbursement costs vary depending on the chosen entity type and authorized share capital size, and will be invoiced transparently at official cost rates.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'calculator' && (
                <motion.div
                  key="calculator"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto space-y-12"
                >
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <h3 className="text-3xl font-serif text-primary mb-4 font-bold">Interactive Fee Estimator</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Select your entity requirements below to calculate a transparent real-time estimation of our professional legal services fee.
                    </p>
                  </div>

                  <div className="bg-background border border-border shadow-sm p-8 md:p-10 grid md:grid-cols-12 gap-10">
                    
                    {/* Calculator Form */}
                    <div className="md:col-span-7 space-y-8">
                      {/* Step 1: Entity Type */}
                      <div>
                        <label className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3.5 block">
                          1. Entity Type
                        </label>
                        <div className="grid grid-cols-2 gap-3.5">
                          {[
                            { id: 'business_name', label: 'Business Name', desc: 'Sole Proprietorship / Partnership' },
                            { id: 'limited_liability', label: 'Limited Liability', desc: 'Private Company (LTD)' },
                            { id: 'ngo_association', label: 'NGO / Association', desc: 'Non-Profit / Board of Trustees' },
                            { id: 'holding_company', label: 'Holding Company', desc: 'Structured Multi-Corporate' }
                          ].map(opt => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setEntityType(opt.id as any);
                                if (opt.id !== 'limited_liability' && opt.id !== 'holding_company') {
                                  setShareCapital(1000000);
                                }
                              }}
                              className={`text-left p-4 border transition-all flex flex-col justify-between h-28 ${
                                entityType === opt.id 
                                  ? 'border-secondary bg-secondary/5 ring-1 ring-secondary' 
                                  : 'border-border hover:border-secondary/40'
                              }`}
                            >
                              <span className="text-xs font-bold text-primary block leading-tight">{opt.label}</span>
                              <span className="text-[10px] text-muted-foreground leading-tight mt-2 block">{opt.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Share Capital (Only for LTD and Holding) */}
                      {(entityType === 'limited_liability' || entityType === 'holding_company') && (
                        <div>
                          <label className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3.5 block">
                            2. Authorized Share Capital
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { val: 1000000, label: '1 Million' },
                              { val: 5000000, label: '5 Million' },
                              { val: 1000000, label: '10 Million' },
                              { val: 2000000, label: '20 Million+' }
                            ].map((opt, i) => {
                              const value = i === 2 ? 10000000 : i === 3 ? 20000000 : opt.val;
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setShareCapital(value as any)}
                                  className={`py-3 text-xs font-bold text-center border transition-all ${
                                    shareCapital === value 
                                      ? 'border-secondary bg-secondary/5 font-semibold text-primary' 
                                      : 'border-border hover:border-secondary/40 text-muted-foreground'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-2 block leading-snug">
                            Private Private Companies in Nigeria generally require a minimum share capital of 1 Million. Foreign-participated entities require a minimum of 10 Million shares.
                          </span>
                        </div>
                      )}

                      {/* Step 3: Directors Count */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-xs font-extrabold uppercase tracking-widest text-primary">
                            3. Number of Directors
                          </label>
                          <span className="text-xs font-bold text-secondary">{directorsCount} Directors</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={directorsCount}
                          onChange={(e) => setDirectorsCount(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                        />
                        <div className="flex justify-between text-[9px] text-muted-foreground font-semibold uppercase mt-1 px-1">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5+</span>
                        </div>
                      </div>

                      {/* Step 4: Special Status Variables */}
                      <div className="space-y-3 pt-2">
                        <label className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2 block">
                          4. Statutory & Process Variables
                        </label>
                        
                        <label className="flex items-center gap-3 p-3 bg-muted/20 border border-border/80 hover:border-secondary/30 transition-colors cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={hasForeignParticipation}
                            onChange={(e) => setHasForeignParticipation(e.target.checked)}
                            className="h-4 w-4 rounded-none text-secondary focus:ring-secondary border-border"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-primary">Foreign Director / Foreign Shareholder Participation</span>
                            <span className="text-[10px] text-muted-foreground">Includes necessary NIPC registrations and specialized vetting advisory.</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 bg-muted/20 border border-border/80 hover:border-secondary/30 transition-colors cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isExpedited}
                            onChange={(e) => setIsExpedited(e.target.checked)}
                            className="h-4 w-4 rounded-none text-secondary focus:ring-secondary border-border"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-primary">Expedited Executive Service</span>
                            <span className="text-[10px] text-muted-foreground">Prioritizes processing and targets completion with designated focal agents.</span>
                          </div>
                        </label>
                      </div>

                      {/* Step 5: Optional Add-ons */}
                      <div className="space-y-3.5">
                        <label className="text-xs font-extrabold uppercase tracking-widest text-primary block">
                          5. Optional Regulatory Add-Ons
                        </label>
                        <div className="space-y-2">
                          {[
                            { id: 'tin', label: 'TIN Corporate Registration Setup', price: '₦25,000', desc: 'Secure corporate Tax Identification Number immediately upon registration.' },
                            { id: 'trademark', label: 'Trademark Protection Filing (1 Class)', price: '₦95,000', desc: 'Protect your brand name or logo logo officially at the IP registry.' },
                            { id: 'scuml', label: 'SCUML Specialized Setup Advisory', price: '₦40,000', desc: 'Prepare and process AML compliance certification for banking compliance.' }
                          ].map(add => (
                            <button
                              key={add.id}
                              type="button"
                              onClick={() => handleAddOnToggle(add.id)}
                              className={`w-full text-left p-3.5 border transition-all flex items-center justify-between gap-4 ${
                                addOns.includes(add.id) 
                                  ? 'border-secondary bg-secondary/5' 
                                  : 'border-border hover:border-secondary/40'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  checked={addOns.includes(add.id)}
                                  readOnly
                                  className="h-3.5 w-3.5 rounded-none text-secondary mt-0.5 pointer-events-none border-border"
                                />
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold text-primary">{add.label}</span>
                                  <span className="text-[10px] text-muted-foreground leading-tight mt-1">{add.desc}</span>
                                </div>
                              </div>
                              <span className="text-xs font-bold text-secondary shrink-0 font-mono">{add.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Result Estimation Panel */}
                    <div className="md:col-span-5 flex flex-col justify-between bg-primary p-8 border border-primary/20 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 h-40 w-40 bg-secondary/5 rounded-full translate-x-20 -translate-y-20 pointer-events-none"></div>
                      
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-secondary">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono">Real-Time Estimation</span>
                        </div>
                        
                        <div>
                          <span className="text-xs text-white/60 block">Estimated Professional Fee</span>
                          <div className="text-4xl sm:text-5xl font-serif font-bold text-white mt-2 font-serif">{formattedFee}</div>
                          <span className="text-[10px] text-white/50 block mt-2 leading-relaxed">
                            *Statutory government processing charges, registration tariffs, stamp duties, and direct regulatory filing costs are calculated separately upon official application submission.
                          </span>
                        </div>

                        <div className="border-t border-white/10 pt-6 space-y-4">
                          <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-secondary">Selected Features</h5>
                          <ul className="space-y-2.5 text-xs text-white/80">
                            <li className="flex justify-between">
                              <span className="capitalize">{entityType.replace('_', ' ')} Setup</span>
                              <span className="font-bold">Included</span>
                            </li>
                            {(entityType === 'limited_liability' || entityType === 'holding_company') && (
                              <li className="flex justify-between">
                                <span>{shareCapital >= 10000000 ? `${shareCapital / 1000000}M` : `${shareCapital / 1000000}M`} Share Capital</span>
                                <span className="font-bold">Included</span>
                              </li>
                            )}
                            <li className="flex justify-between">
                              <span>{directorsCount} Director{directorsCount > 1 ? 's' : ''} Setup</span>
                              <span className="font-bold">{directorsCount > 2 ? `+₦${(directorsCount - 2) * 15}k` : 'Included'}</span>
                            </li>
                            {hasForeignParticipation && (
                              <li className="flex justify-between text-secondary font-bold">
                                <span>Foreign Participation</span>
                                <span>+₦150,000</span>
                              </li>
                            )}
                            {isExpedited && (
                              <li className="flex justify-between text-secondary font-bold">
                                <span>Expedited Service</span>
                                <span>+₦50,000</span>
                              </li>
                            )}
                            {addOns.map(add => {
                              const label = add === 'tin' ? 'TIN Filing' : add === 'trademark' ? 'Trademark' : 'SCUML Setup';
                              const val = add === 'tin' ? '₦25k' : add === 'trademark' ? '₦95k' : '₦40k';
                              return (
                                <li key={add} className="flex justify-between text-white/70">
                                  <span>+ Optional {label}</span>
                                  <span className="font-bold font-mono">{val}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/10 mt-8">
                        <a href={`${routes.booking}?service=Custom%20Fee%20Calculator&estimatedFee=${formattedFee}`} className="block">
                          <Button 
                            className="w-full text-[#17202d] font-bold text-sm h-14" 
                            style={{ 
                              background: 'linear-gradient(135deg, #ffbf4d, #eb9f24)',
                              borderRadius: '0px'
                            }}
                          >
                            Book & Proceed to Onboard
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </a>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}

              {activeTab === 'bespoke' && (
                <motion.div
                  key="bespoke"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12 max-w-6xl mx-auto"
                >
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <h3 className="text-3xl font-serif text-primary mb-4 font-bold">Bespoke Legal Services & Request for Quote</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      For specialized, high-stakes, or complex transactional legal mandates, we provide tailored billing and scope structures modeled around your business parameters.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left List of Bespoke Services */}
                    <div className="lg:col-span-5 space-y-6">
                      {[
                        { title: 'Commercial Contract Drafting & Audit', desc: 'Bespoke corporate drafting, bulletproof service agreements, vendor retainers, shareholder pacts, and strict intellectual property clauses.' },
                        { title: 'Mergers, Acquisitions & Restructuring', desc: 'Due diligence audits, regulatory approvals, structural corporate filings, equity transactions, and transactional support.' },
                        { title: 'Energy & Infrastructure Advisory', desc: 'Legal advisory in oil and gas licensing, environmental compliance audits, joint ventures, and power sector mandates.' },
                        { title: 'Corporate Retainership Services', desc: 'All-inclusive monthly and annual retainers tailored for tech startups and corporate offices requiring consistent outsourced legal support.' }
                      ].map((item, i) => (
                        <div key={i} className="bg-background border border-border p-6 hover:border-secondary/40 transition-all duration-300">
                          <h4 className="text-base font-serif font-bold text-primary mb-2 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Right RFQ Contact Form */}
                    <div className="lg:col-span-7 bg-background border border-border p-8 md:p-10 relative">
                      <AnimatePresence>
                        {bespokeSubmitted ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center py-20"
                          >
                            <div className="h-16 w-16 bg-secondary/15 rounded-full flex items-center justify-center mb-6">
                              <CheckCircle2 className="h-10 w-10 text-secondary" />
                            </div>
                            <h4 className="text-2xl font-serif font-bold text-primary mb-3">Proposal Request Received</h4>
                            <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-6">
                              Thank you. Your request has been logged successfully. A partner from our corporate advisory team will review your requirements and respond within 24 business hours.
                            </p>
                            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest animate-pulse">
                              Returning to Form shortly...
                            </div>
                          </motion.div>
                        ) : (
                          <motion.form onSubmit={handleBespokeSubmit} className="space-y-6">
                            <h4 className="text-xl font-serif font-bold text-primary pb-3 border-b border-border mb-6">
                              Request Custom Engagement Proposal
                            </h4>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Full Name</label>
                                <input
                                  type="text"
                                  required
                                  value={formData.name}
                                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                  placeholder="e.g., Gbenga Tayo"
                                  className="w-full h-11 border border-border bg-muted/20 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-background"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Corporate Email</label>
                                <input
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                  placeholder="e.g., contact@pacificluxury.com"
                                  className="w-full h-11 border border-border bg-muted/20 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-background"
                                />
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Phone Number</label>
                                <input
                                  type="tel"
                                  required
                                  value={formData.phone}
                                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                  placeholder="e.g., 09029633913"
                                  className="w-full h-11 border border-border bg-muted/20 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-background"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Company Name</label>
                                <input
                                  type="text"
                                  value={formData.company}
                                  onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                  placeholder="e.g., Pacific Luxury Homes"
                                  className="w-full h-11 border border-border bg-muted/20 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-background"
                                />
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Service Category</label>
                                <select
                                  value={formData.serviceType}
                                  onChange={e => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                                  className="w-full h-11 border border-border bg-muted/20 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-background"
                                >
                                  <option>Contract Drafting & Review</option>
                                  <option>Corporate Restructuring</option>
                                  <option>Energy & License Advisory</option>
                                  <option>Outsourced General Counsel (Retainer)</option>
                                  <option>Bespoke Joint Venture Support</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Required Urgency</label>
                                <select
                                  value={formData.urgency}
                                  onChange={e => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                                  className="w-full h-11 border border-border bg-muted/20 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-background"
                                >
                                  <option>Standard (3-5 days)</option>
                                  <option>Urgent (48 Hours)</option>
                                  <option>High-Priority Mandate</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Corporate Mandate Details</label>
                              <textarea
                                rows={4}
                                required
                                value={formData.details}
                                onChange={e => setFormData(prev => ({ ...prev, details: e.target.value }))}
                                placeholder="Describe the scope of work, timelines, authorized share capital specs or regulatory requirements..."
                                className="w-full border border-border bg-muted/20 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-background"
                              />
                            </div>

                            <div className="pt-2">
                              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12" style={{ borderRadius: '0px' }}>
                                Submit Proposal Request
                              </Button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </PageShell>
      <CTABand />
    </>
  );
}
