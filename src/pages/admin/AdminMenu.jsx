import React from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const AdminMenu = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "🚧 Fonctionnalité non implémentée",
      description: "La gestion du menu sera bientôt disponible ici.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Gestion du Menu - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion du Menu</h1>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <p className="text-gray-600 mb-4">La gestion complète du menu (ajout, modification, suppression de plats et catégories) sera bientôt disponible.</p>
          <Button onClick={handleAction}>Ajouter un plat (bientôt)</Button>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;