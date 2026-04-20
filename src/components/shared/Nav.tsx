import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routes, getPracticeRoute } from './routes';
import { practiceAreas } from './practiceAreas';

export function Nav({ currentRoute }: { currentRoute: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-serif text-xl font-bold tracking-widest">
              G·O·A
            </div>
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-lg leading-tight text-primary">Gloria Ondah</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">& Associates</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            <a href={routes.about} className={`text-sm font-medium hover:text-secondary transition-colors ${currentRoute === routes.about ? 'text-secondary' : 'text-foreground'}`}>About</a>

            <div className="relative group">
              <a href={routes.practiceAreas} className={`flex items-center gap-1 text-sm font-medium hover:text-secondary transition-colors ${currentRoute.startsWith('#/practice') ? 'text-secondary' : 'text-foreground'}`}>
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

            <a href={routes.insights} className={`text-sm font-medium hover:text-secondary transition-colors ${currentRoute.startsWith('#/insight') ? 'text-secondary' : 'text-foreground'}`}>Insights</a>
            <a href={routes.contact} className={`text-sm font-medium hover:text-secondary transition-colors ${currentRoute === routes.contact ? 'text-secondary' : 'text-foreground'}`}>Contact</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="https://wa.me/2347054588490" target="_blank" rel="noreferrer">
              <Button variant="outline" size="icon" className="rounded-full border-primary/20 text-primary hover:bg-primary/5">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </a>
            <a href={routes.booking}>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-none px-8">
                Book Consultation
              </Button>
            </a>
          </div>

          <button className="lg:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
