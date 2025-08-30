import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Recruitment from '@/pages/Recruitment';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminReservations from '@/pages/admin/AdminReservations';
import AdminMenu from '@/pages/admin/AdminMenu';
import AdminNews from '@/pages/admin/AdminNews';
import AdminReviews from '@/pages/admin/AdminReviews';
import AdminContacts from '@/pages/admin/AdminContacts';
import AdminRecruitment from '@/pages/admin/AdminRecruitment';

const SiteLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Crêperie Ozoir - Crêpes Artisanales à Ozoir-la-Ferrière</title>
      <meta name="description" content="Découvrez la Crêperie Ozoir, restaurant artisanal de crêpes, galettes et desserts à Ozoir-la-Ferrière. Réservation en ligne disponible." />
      <meta name="keywords" content="crêperie, galettes, crêpes, Ozoir-la-Ferrière, restaurant, artisanal, réservation" />
      <meta property="og:title" content="Crêperie Ozoir - Crêpes Artisanales" />
      <meta property="og:description" content="Restaurant artisanal de crêpes et galettes à Ozoir-la-Ferrière" />
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
        <Route path="/recrutement" element={<Recruitment />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/reservations" element={<AdminReservations />} />
          <Route path="/menu" element={<AdminMenu />} />
          <Route path="/news" element={<AdminNews />} />
          <Route path="/reviews" element={<AdminReviews />} />
          <Route path="/contacts" element={<AdminContacts />} />
          <Route path="/recruitment" element={<AdminRecruitment />} />
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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
          <Route path="/recrutement" element={<Recruitment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout><AdminRoutes/></AdminLayout>} />
          <Route path="/*" element={<SiteRoutes />} />
        </Routes>
      </Router>
      <Toaster />
    </LanguageProvider>
  );
}

const SiteRoutes = () => (
  <div className="min-h-screen flex flex-col">
     <Helmet>
      <title>Crêperie Ozoir - Crêpes Artisanales à Ozoir-la-Ferrière</title>
      <meta name="description" content="Découvrez la Crêperie Ozoir, restaurant artisanal de crêpes, galettes et desserts à Ozoir-la-Ferrière. Réservation en ligne disponible." />
    </Helmet>
    <Header/>
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carte" element={<Menu />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/actualites" element={<News />} />
        <Route path="/livre-or" element={<GuestBook />} />
        <Route path="/recrutement" element={<Recruitment />} />
      </Routes>
    </main>
    <Footer/>
  </div>
);

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />} />
    <Route path="/reservations" element={<AdminReservations />} />
    <Route path="/menu" element={<AdminMenu />} />
    <Route path="/news" element={<AdminNews />} />
    <Route path="/reviews" element={<AdminReviews />} />
    <Route path="/contacts" element={<AdminContacts />} />
    <Route path="/recruitment" element={<AdminRecruitment />} />
  </Routes>
);

export default App;