import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from './components/shared/Nav';
import { Footer } from './components/shared/Footer';
import { WhatsAppFAB } from './components/shared/WhatsAppFAB';
import { pageVariants } from './components/shared/motion';

import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { PracticeAreas } from './components/pages/PracticeAreas';
import { PracticeDetail } from './components/pages/PracticeDetail';
import { Attorney } from './components/pages/Attorney';
import { AttorneyFrederick } from './components/pages/AttorneyFrederick';
import { AttorneyEunice } from './components/pages/AttorneyEunice';
import { AttorneyAyodele } from './components/pages/AttorneyAyodele';
import { Insights } from './components/pages/Insights';
import { InsightsSingle } from './components/pages/InsightsSingle';
import { CaseStudies } from './components/pages/CaseStudies';
import { Faq } from './components/pages/Faq';
import { Contact } from './components/pages/Contact';
import { Booking } from './components/pages/Booking';
import { Privacy } from './components/pages/Privacy';
import { Terms } from './components/pages/Terms';
import { Disclaimer } from './components/pages/Disclaimer';
import { Admin } from './components/pages/Admin';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export default function App() {
  const [route, setRoute] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();
          window.history.pushState(null, '', href);
          setRoute(href);
          window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  useEffect(() => {
    if (!GA_ID || document.getElementById('ga-script')) return;
    const s = document.createElement('script');
    s.id = 'ga-script';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: route,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [route]);

  const renderRoute = () => {
    if (route === '/' || route === '') return <Home />;
    if (route === '/about') return <About />;
    if (route === '/practice-areas') return <PracticeAreas />;
    if (route.startsWith('/practice/')) return <PracticeDetail slug={route.replace('/practice/', '')} />;
    if (route === '/attorneys/gloria-ondah') return <Attorney />;
    if (route === '/attorneys/frederick-adino') return <AttorneyFrederick />;
    if (route === '/attorneys/eunice-egwuche') return <AttorneyEunice />;
    if (route === '/attorneys/ayodele-liman') return <AttorneyAyodele />;
    if (route === '/insights') return <Insights />;
    if (route.startsWith('/insights/')) return <InsightsSingle slug={route.replace('/insights/', '')} />;
    if (route === '/case-studies') return <CaseStudies />;
    if (route === '/faq') return <Faq />;
    if (route === '/contact') return <Contact />;
    if (route === '/booking') return <Booking />;
    if (route === '/privacy') return <Privacy />;
    if (route === '/terms') return <Terms />;
    if (route === '/disclaimer') return <Disclaimer />;
    if (route === '/admin') return <Admin />;
    return <Home />;
  };

  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-white flex flex-col overflow-x-hidden">
      <Nav currentRoute={route} darkHero={route === '/' || route === ''} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
          >
            {renderRoute()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
