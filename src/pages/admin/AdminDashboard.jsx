import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Users, Star, MessageSquare, Briefcase, Utensils } from 'lucide-react';
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
  const [stats, setStats] = useState({
    reservations: 0,
    reviews: 0,
    contacts: 0,
    applications: 0,
  });

  useEffect(() => {
    const reservations = JSON.parse(localStorage.getItem('creperie-reservations') || '[]').length;
    const reviews = JSON.parse(localStorage.getItem('creperie-reviews') || '[]').filter(r => !r.approved).length;
    const contacts = JSON.parse(localStorage.getItem('creperie-contacts') || '[]').length;
    const applications = JSON.parse(localStorage.getItem('creperie-applications') || '[]').length;
    setStats({ reservations, reviews, contacts, applications });
  }, []);

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
          <StatCard icon={Calendar} title="Réservations à venir" value={stats.reservations} color="bg-blue-500" />
          <StatCard icon={Star} title="Avis en attente" value={stats.reviews} color="bg-yellow-500" />
          <StatCard icon={MessageSquare} title="Nouveaux messages" value={stats.contacts} color="bg-green-500" />
          <StatCard icon={Briefcase} title="Nouvelles candidatures" value={stats.applications} color="bg-purple-500" />
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
              <LineChart data={pageViewsData}>
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