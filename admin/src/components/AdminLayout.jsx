import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Utensils, Newspaper, Star, MessageSquare, FileText } from 'lucide-react';
import { supabase, hasSupabase } from '#shared/lib/supabaseClient';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [allowed, setAllowed] = useState(!hasSupabase);

  useEffect(() => {
    if (!hasSupabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/admin/login';
      else setAllowed(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) window.location.href = '/admin/login';
    });
    return () => { sub?.subscription?.unsubscribe?.(); };
  }, []);

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/reservations', icon: Calendar, label: 'Réservations' },
    { href: '/admin/menu', icon: Utensils, label: 'Menu' },
    { href: '/admin/news', icon: Newspaper, label: 'Actualités' },
    { href: '/admin/reviews', icon: Star, label: 'Avis' },
    { href: '/admin/contacts', icon: MessageSquare, label: 'Messages' },
    { href: '/admin/logs', icon: FileText, label: 'Logs' },
  ];

  const isActive = (href) => location.pathname === href;

  if (!allowed) return null;
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-anthracite text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-2xl font-pacifico border-b border-gray-700">
          <Link to="/admin">Crêperie Admin</Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-crepe-yellow text-anthracite font-semibold'
                  : 'hover:bg-gray-700'
              }`}
            >
              <item.icon className="mr-3" size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Lien vers le site public retiré pour séparation stricte */}
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
