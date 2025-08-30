import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Utensils, Newspaper, Star, MessageSquare, Briefcase, LogOut } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/reservations', icon: Calendar, label: 'Réservations' },
    { href: '/admin/menu', icon: Utensils, label: 'Menu' },
    { href: '/admin/news', icon: Newspaper, label: 'Actualités' },
    { href: '/admin/reviews', icon: Star, label: 'Avis' },
    { href: '/admin/contacts', icon: MessageSquare, label: 'Messages' },
    { href: '/admin/recruitment', icon: Briefcase, label: 'Candidatures' },
  ];

  const isActive = (href) => location.pathname === href;

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
        <div className="px-4 py-4 border-t border-gray-700">
          <Link to="/" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <LogOut className="mr-3" size={20} />
            Retour au site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;