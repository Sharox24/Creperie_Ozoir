import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, X, Clock, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedReservations = JSON.parse(localStorage.getItem('creperie-reservations') || '[]').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    setReservations(savedReservations);
  }, []);

  const updateReservationStatus = (id, status) => {
    const updatedReservations = reservations.map(res => 
      res.id === id ? { ...res, status } : res
    );
    setReservations(updatedReservations);
    localStorage.setItem('creperie-reservations', JSON.stringify(updatedReservations));
    toast({
      title: "Statut mis à jour",
      description: `La réservation a été marquée comme ${status}.`,
    });
  };

  const deleteReservation = (id) => {
    const updatedReservations = reservations.filter(res => res.id !== id);
    setReservations(updatedReservations);
    localStorage.setItem('creperie-reservations', JSON.stringify(updatedReservations));
    toast({
      title: "Réservation supprimée",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmée':
        return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Confirmée</span>;
      case 'annulée':
        return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Annulée</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">En attente</span>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestion des Réservations - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion des Réservations</h1>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Client</th>
                  <th scope="col" className="px-6 py-3">Date & Heure</th>
                  <th scope="col" className="px-6 py-3">Couverts</th>
                  <th scope="col" className="px-6 py-3">Statut</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <motion.tr 
                    key={res.id} 
                    className="bg-white border-b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {res.name}<br/>
                      <span className="text-xs text-gray-500">{res.email}</span>
                    </td>
                    <td className="px-6 py-4">{format(new Date(res.date), "PPP", { locale: fr })} à {res.time}</td>
                    <td className="px-6 py-4">{res.guests}</td>
                    <td className="px-6 py-4">{getStatusBadge(res.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost" className="text-green-500 hover:text-green-700" onClick={() => updateReservationStatus(res.id, 'confirmée')}>
                          <Check size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => updateReservationStatus(res.id, 'annulée')}>
                          <X size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-yellow-500 hover:text-yellow-700" onClick={() => updateReservationStatus(res.id, 'en_attente')}>
                          <Clock size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={() => toast({ title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochain message ! 🚀" })}>
                          <Edit size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => deleteReservation(res.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {reservations.length === 0 && (
              <p className="text-center py-8 text-gray-500">Aucune réservation pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReservations;