import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { routes, getPracticeRoute } from './routes';
import { practiceAreas } from './practiceAreas';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubStatus('loading');
    try {
      const res = await fetch('/api/contact/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error();
      setSubStatus('done');
    } catch {
      setSubStatus('done');
    }
  }

  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border">
      <div className="container mx-auto px-6">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <a href={routes.home} className="flex items-center gap-3 mb-6">
              <img src="/images/goa-logo.png" alt="GOA" className="h-12 w-auto" />
              <div>
                <div className="font-serif font-bold text-lg leading-tight text-primary">Gloria Ondah & Associates</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Legal Practitioners</div>
              </div>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Providing comprehensive legal services that drive growth, compliance, and business success for startups, SMEs, and foreign investors in Nigeria.
            </p>
            <div className="text-xs text-muted-foreground space-y-1 mb-6">
              <div><span className="font-semibold text-foreground">Founded:</span> 2015</div>
              <div><span className="font-semibold text-foreground">Registered:</span> 2020 (CAC: BN-3068204)</div>
            </div>

            <div className="border-t border-border pt-6">
              <h5 className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Legal Updates & Insights</h5>
              {subStatus === 'done' ? (
                <p className="text-xs text-secondary font-medium">You're subscribed. Thank you!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 h-10 px-3 border border-border bg-muted/30 text-sm focus:outline-none focus:ring-1 focus:ring-secondary min-w-0"
                  />
                  <button
                    type="submit"
                    disabled={subStatus === 'loading'}
                    className="h-10 w-10 bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors shrink-0 disabled:opacity-60"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-muted-foreground mt-2">No spam. Unsubscribe anytime.</p>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-primary text-lg mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {practiceAreas.slice(0, 5).map(pa => (
                <li key={pa.slug}>
                  <a href={getPracticeRoute(pa.slug)} className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                    {pa.title}
                  </a>
                </li>
              ))}
              <li>
                <a href={routes.practiceAreas} className="text-sm font-medium text-primary hover:text-secondary transition-colors">
                  View All Practices &rarr;
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-primary text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href={routes.about} className="text-sm text-muted-foreground hover:text-secondary transition-colors">About Us</a></li>
              <li><a href={routes.attorney} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Our Attorney</a></li>
              <li><a href={routes.caseStudies} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Case Studies</a></li>
              <li><a href={routes.insights} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Insights</a></li>
              <li><a href={routes.faq} className="text-sm text-muted-foreground hover:text-secondary transition-colors">FAQ</a></li>
              <li><a href={routes.booking} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Book Consultation</a></li>
              <li><a href={routes.contact} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-primary text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span>No. 28, 3rd Avenue,<br />Gwarinpa Estate, Abuja</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <a href="tel:+2349029633193" className="hover:text-secondary transition-colors">09029633193</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <a href="mailto:G.ondahlawoffice@gmail.com" className="hover:text-secondary transition-colors break-all">G.ondahlawoffice@gmail.com</a>
              </li>
            </ul>
            <div className="mt-6 text-xs text-muted-foreground">
              <div className="font-medium text-foreground mb-1">Office Hours</div>
              <div>Mon–Fri: 8:00 AM – 6:00 PM</div>
              <div>WhatsApp: 24/7</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span>&copy; {new Date().getFullYear()} Gloria Ondah &amp; Associates. All rights reserved.</span>
            <span className="hidden md:inline text-border">|</span>
            <span>CAC Reg: BN-3068204</span>
          </div>
          <div className="flex gap-6">
            <a href={routes.privacy} className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href={routes.terms} className="hover:text-primary transition-colors">Terms of Use</a>
            <a href={routes.disclaimer} className="hover:text-primary transition-colors">Disclaimer</a>
            <a href={routes.admin} className="hover:text-primary transition-colors">Staff Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
