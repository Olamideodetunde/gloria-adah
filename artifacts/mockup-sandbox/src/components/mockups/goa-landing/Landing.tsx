import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from './_shared/Nav';
import { Footer } from './_shared/Footer';
import { WhatsAppFAB } from './_shared/WhatsAppFAB';
import { pageVariants } from './_shared/motion';

import { Home } from './_pages/Home';
import { About } from './_pages/About';
import { PracticeAreas } from './_pages/PracticeAreas';
import { PracticeDetail } from './_pages/PracticeDetail';
import { Attorney } from './_pages/Attorney';
import { Insights } from './_pages/Insights';
import { InsightsSingle } from './_pages/InsightsSingle';
import { Faq } from './_pages/Faq';
import { Contact } from './_pages/Contact';
import { Booking } from './_pages/Booking';
import { Privacy } from './_pages/Privacy';
import { Terms } from './_pages/Terms';
import { Disclaimer } from './_pages/Disclaimer';

export function Landing() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderRoute = () => {
    if (route === '#/' || route === '') return <Home />;
    if (route === '#/about') return <About />;
    if (route === '#/practice-areas') return <PracticeAreas />;
    if (route.startsWith('#/practice/')) return <PracticeDetail slug={route.replace('#/practice/', '')} />;
    if (route === '#/attorneys/gloria-ondah') return <Attorney />;
    if (route === '#/insights') return <Insights />;
    if (route.startsWith('#/insights/')) return <InsightsSingle slug={route.replace('#/insights/', '')} />;
    if (route === '#/faq') return <Faq />;
    if (route === '#/contact') return <Contact />;
    if (route === '#/booking') return <Booking />;
    if (route === '#/privacy') return <Privacy />;
    if (route === '#/terms') return <Terms />;
    if (route === '#/disclaimer') return <Disclaimer />;
    return <Home />; // fallback
  };

  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-white flex flex-col">
      <Nav currentRoute={route} />
      
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
