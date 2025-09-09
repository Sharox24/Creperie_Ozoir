import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Users, Star, MessageSquare, Utensils } from 'lucide-react';
import { supabase, hasSupabase } from '#shared/lib/supabaseClient';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const StatCard = ({ icon, title, value, color }) => {
  const Icon = icon;
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}>
        <Icon size={32} className="text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-anthracite">{value}</p>
      </div>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ reservations: 0, reviews: 0, contacts: 0, visitors: 0 });
  const [topPages, setTopPages] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (hasSupabase) {
        const [r1, r2, r3, r4] = await Promise.all([
          supabase.from('reservation').select('id', { count: 'exact', head: true }),
          supabase.from('avis').select('id, published'),
          supabase.from('contact').select('id', { count: 'exact', head: true }),
          supabase.from('analytics_event').select('*').order('ts', { ascending: false }).limit(1000),
        ]);
        const reservations = r1.count || 0;
        const reviews = (r2.data || []).filter(x => !x.published).length;
        const contacts = r3.count || 0;
        const visitors = computeUniqueVisitors(r4.data || []);
        setStats({ reservations, reviews, contacts, visitors });
        const pages = {};
        (r4.data || []).forEach(e => { if (e.page) pages[e.page] = (pages[e.page] || 0) + 1; });
        setTopPages(Object.entries(pages).map(([name, views]) => ({ name, views })).sort((a,b) => b.views - a.views).slice(0,5));
      } else {
        const reservations = JSON.parse(localStorage.getItem('creperie-reservations') || '[]').length;
        const reviews = JSON.parse(localStorage.getItem('creperie-reviews') || '[]').filter(r => !r.approved).length;
        const contacts = JSON.parse(localStorage.getItem('creperie-contacts') || '[]').length;
        const analytics = JSON.parse(localStorage.getItem('creperie-analytics') || '[]');
        const visitors = computeUniqueVisitors(analytics);
        const pages = {};
        analytics.forEach(e => { if (e.page) pages[e.page] = (pages[e.page] || 0) + 1; });
        setStats({ reservations, reviews, contacts, visitors });
        setTopPages(Object.entries(pages).map(([name, views]) => ({ name, views })));
      }
    };
    load();
  }, []);

  function computeUniqueVisitors(events) {
    const list = (events || []).filter(e => e.event === 'page_view');
    const keys = new Set();
    for (const e of list) {
      const fp = e.fp || '';
      const ua = e.user_agent || '';
      const anon = e.anon_id || '';
      const ip = e.ip || '';
      const key = fp || (anon ? `${anon}|${ua}` : (ip ? `${ip}|${ua}` : ua));
      keys.add(key);
    }
    return keys.size;
  }

  const reservationsData = [
    { name: 'Lun', reservations: 4 },
    { name: 'Mar', reservations: 3 },
    { name: 'Mer', reservations: 5 },
    { name: 'Jeu', reservations: 7 },
    { name: 'Ven', reservations: 12 },
    { name: 'Sam', reservations: 15 },
    { name: 'Dim', reservations: 8 },
  ];

  const pageViewsData = [
    { name: 'Accueil', views: 4000 },
    { name: 'Menu', views: 3000 },
    { name: 'Réservation', views: 2000 },
    { name: 'Contact', views: 2780 },
    { name: 'Livre d\'or', views: 1890 },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin Crêperie Ozoir</title>
      </Helmet>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-playfair font-bold text-anthracite">Tableau de Bord</h1>
          <p className="text-gray-600 mt-2">Bienvenue sur le panel d'administration de la Crêperie Ozoir.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Calendar} title="Réservations" value={stats.reservations} color="bg-blue-500" />
          <StatCard icon={Star} title="Avis en attente" value={stats.reviews} color="bg-yellow-500" />
          <StatCard icon={MessageSquare} title="Messages" value={stats.contacts} color="bg-green-500" />
          <StatCard icon={Users} title="Visiteurs uniques (échantillon)" value={stats.visitors} color="bg-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-anthracite mb-4">Réservations de la semaine</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reservationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reservations" fill="#E7D26C" name="Réservations" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-anthracite mb-4">Vues des pages</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={topPages.length ? topPages : pageViewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#595757" name="Vues" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
