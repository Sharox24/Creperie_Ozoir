import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
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
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminReservations from '@/pages/admin/AdminReservations';
import AdminMenu from '@/pages/admin/AdminMenu';
import AdminNews from '@/pages/admin/AdminNews';
import AdminReviews from '@/pages/admin/AdminReviews';
import AdminContacts from '@/pages/admin/AdminContacts';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLogs from '@/pages/admin/AdminLogs';
import CookieConsent from '@/components/CookieConsent';
import { trackPageView } from '@/lib/metrics';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <RouteChangeTracker />
        <Routes>
          {/* Public site */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col">
                <Helmet>
                  <title>Crêperie Ozoir - Crêpes Artisanales à Ozoir-la-Ferrière</title>
                  <meta name="description" content="Découvrez la Crêperie Ozoir, restaurant artisanal de crêpes, galettes et desserts à Ozoir-la-Ferrière. Réservation en ligne disponible." />
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
            }
          />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/reservations" element={<AdminReservations />} />
                  <Route path="/menu" element={<AdminMenu />} />
                  <Route path="/news" element={<AdminNews />} />
                  <Route path="/reviews" element={<AdminReviews />} />
                  <Route path="/contacts" element={<AdminContacts />} />
                  <Route path="/logs" element={<AdminLogs />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
      <Toaster />
      <CookieConsent />
    </LanguageProvider>
  );
}

function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);
  return null;
}

export default App;

