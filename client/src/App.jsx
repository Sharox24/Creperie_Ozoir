import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '#shared/components/ui/toaster';
import { LanguageProvider } from '#shared/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Reservation from '@/pages/Reservation';
import News from '@/pages/News';
import GuestBook from '@/pages/GuestBook';
import Legal from '@/pages/Legal';
import Privacy from '@/pages/Privacy';
import CookieConsent from '@/components/CookieConsent';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '#shared/lib/metrics';

function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);
  return null;
}

export default function ClientApp() {
  return (
    <LanguageProvider>
      <Router>
        <RouteChangeTracker />
        <div className="min-h-screen flex flex-col">
          <Helmet>
            <title>Crêperie Ozoir - Crêpes Artisanales à Ozoir-la-Ferrière</title>
            <meta
              name="description"
              content="Découvrez la Crêperie Ozoir, restaurant artisanal de crêpes, galettes et desserts à Ozoir-la-Ferrière. Réservation en ligne disponible."
            />
            <meta property="og:type" content="website" />
            <link rel="canonical" href="https://creperieozoir.fr" />
          </Helmet>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carte" element={<Menu />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/actualites" element={<News />} />
              <Route path="/livre-or" element={<GuestBook />} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/politique-confidentialite" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <Toaster />
      <CookieConsent />
    </LanguageProvider>
  );
}
