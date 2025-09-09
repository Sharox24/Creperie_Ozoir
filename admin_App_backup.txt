import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '#shared/components/ui/toaster';
import { LanguageProvider } from '#shared/contexts/LanguageContext';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminReservations from '@/pages/AdminReservations';
import AdminMenu from '@/pages/AdminMenu';
import AdminNews from '@/pages/AdminNews';
import AdminReviews from '@/pages/AdminReviews';
import AdminContacts from '@/pages/AdminContacts';
import AdminLogin from '@/pages/AdminLogin';
import AdminLogs from '@/pages/AdminLogs';

export default function AdminApp() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Conserve les routes /admin existantes pour compatibilité */}
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
          {/* Optionnel: si vous servez l'admin à la racine, décommentez et ajustez */}
          {/**
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/*"
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
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AdminLayout>
            }
          />
          */}
        </Routes>
      </Router>
      <Toaster />
    </LanguageProvider>
  );
}
