import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routes, getPracticeRoute } from './routes';
import { practiceAreas } from './practiceAreas';

export function Nav({ currentRoute, darkHero = false }: { currentRoute: string; darkHero?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const useDark = darkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href={routes.home} className="flex items-center gap-3">
            <img src="/images/goa-logo.png" alt="GOA" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <div className={`font-serif font-bold text-lg leading-tight transition-colors ${useDark ? 'text-white' : 'text-primary'}`}>Gloria Ondah</div>
              <div className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${useDark ? 'text-white/60' : 'text-muted-foreground'}`}>& Associates</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: routes.about, label: 'About', active: currentRoute === routes.about },
              { href: routes.caseStudies, label: 'Case Studies', active: currentRoute === routes.caseStudies },
              { href: routes.insights, label: 'Insights', active: currentRoute.startsWith('#/insight') },
              { href: routes.contact, label: 'Contact', active: currentRoute === routes.contact },
            ].map(link => (
              <a key={link.href} href={link.href}
                className={`text-sm font-medium hover:text-secondary transition-colors ${link.active ? 'text-secondary' : useDark ? 'text-white/80' : 'text-foreground'}`}>
                {link.label}
              </a>
            ))}

            <div className="relative group">
              <a href={routes.practiceAreas} className={`flex items-center gap-1 text-sm font-medium hover:text-secondary transition-colors ${currentRoute.startsWith('#/practice') ? 'text-secondary' : useDark ? 'text-white/80' : 'text-foreground'}`}>
                Practice Areas <ChevronDown className="h-3 w-3" />
              </a>
              <div className="absolute top-full left-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <div className="bg-background border border-border shadow-lg p-4 w-64 flex flex-col gap-2">
                  {practiceAreas.map(pa => (
                    <a key={pa.slug} href={getPracticeRoute(pa.slug)} className="text-sm p-2 hover:bg-muted hover:text-secondary transition-colors">
                      {pa.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="https://wa.me/2347054588490" target="_blank" rel="noreferrer">
              <Button variant="outline" size="icon" className={`rounded-full transition-colors ${useDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-primary/20 text-primary hover:bg-primary/5'}`}>
                <MessageCircle className="h-4 w-4" />
              </Button>
            </a>
            <a href={routes.booking}>
              <Button className={`rounded-none px-8 transition-colors ${useDark ? 'bg-secondary hover:bg-secondary/90 text-white' : 'bg-primary hover:bg-primary/90 text-white'}`}>
                Book Consultation
              </Button>
            </a>
          </div>

          <button className={`lg:hidden transition-colors ${useDark ? 'text-white' : 'text-primary'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 lg:hidden overflow-y-auto">
          <nav className="flex flex-col gap-6 text-2xl font-serif">
            <a href={routes.home} onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href={routes.about} onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href={routes.practiceAreas} onClick={() => setMobileMenuOpen(false)}>Practice Areas</a>
            <div className="pl-4 flex flex-col gap-4 text-lg font-sans">
              {practiceAreas.map(pa => (
                <a key={pa.slug} href={getPracticeRoute(pa.slug)} onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground">{pa.title}</a>
              ))}
            </div>
            <a href={routes.caseStudies} onClick={() => setMobileMenuOpen(false)}>Case Studies</a>
            <a href={routes.insights} onClick={() => setMobileMenuOpen(false)}>Insights</a>
            <a href={routes.faq} onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href={routes.contact} onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href={routes.booking} onClick={() => setMobileMenuOpen(false)} className="text-secondary">Book Consultation</a>
          </nav>
        </div>
      )}
    </>
  );
}
