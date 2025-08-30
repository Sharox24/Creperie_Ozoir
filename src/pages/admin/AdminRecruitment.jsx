import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trash2, Download, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminRecruitment = () => {
  const [applications, setApplications] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedApplications = JSON.parse(localStorage.getItem('creperie-applications') || '[]');
    setApplications(savedApplications);
  }, []);

  const updateApplicationStatus = (id, status) => {
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('creperie-applications', JSON.stringify(updatedApplications));
    toast({
      title: "Statut de la candidature mis à jour",
    });
  };

  const deleteApplication = (id) => {
    const updatedApplications = applications.filter(app => app.id !== id);
    setApplications(updatedApplications);
    localStorage.setItem('creperie-applications', JSON.stringify(updatedApplications));
    toast({
      title: "Candidature supprimée",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'acceptée':
        return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Acceptée</span>;
      case 'rejetée':
        return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Rejetée</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Nouveau</span>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestion des Candidatures - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion des Candidatures</h1>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Candidat</th>
                  <th scope="col" className="px-6 py-3">Poste</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Statut</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <motion.tr key={app.id} className="bg-white border-b" layout>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {app.name}<br/>
                      <span className="text-xs text-gray-500">{app.email}</span>
                    </td>
                    <td className="px-6 py-4">{app.position}</td>
                    <td className="px-6 py-4">{new Date(app.date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost" className="text-blue-500" onClick={() => toast({ title: "Fonctionnalité non implémentée" })}>
                          <Download size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-green-500" onClick={() => updateApplicationStatus(app.id, 'acceptée')}>
                          <Check size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500" onClick={() => updateApplicationStatus(app.id, 'rejetée')}>
                          <X size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-700" onClick={() => deleteApplication(app.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {applications.length === 0 && (
              <p className="text-center py-8 text-gray-500">Aucune candidature pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRecruitment;