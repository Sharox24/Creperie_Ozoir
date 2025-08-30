import React from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const AdminNews = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "🚧 Fonctionnalité non implémentée",
      description: "La gestion des actualités sera bientôt disponible ici.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Gestion des Actualités - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion des Actualités</h1>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <p className="text-gray-600 mb-4">La gestion complète des actualités (ajout, modification, suppression d'articles) sera bientôt disponible.</p>
          <Button onClick={handleAction}>Écrire un article (bientôt)</Button>
        </div>
      </div>
    </>
  );
};

export default AdminNews;