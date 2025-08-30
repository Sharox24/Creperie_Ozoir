import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trash2, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('creperie-contacts') || '[]');
    setContacts(savedContacts);
  }, []);

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(c => c.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('creperie-contacts', JSON.stringify(updatedContacts));
    toast({
      title: "Message supprimé",
      variant: "destructive",
    });
  };

  const archiveContact = (id) => {
    toast({
      title: "🚧 Fonctionnalité non implémentée",
      description: "L'archivage des messages sera bientôt disponible.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Gestion des Messages - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion des Messages</h1>
        
        <div className="space-y-4">
          {contacts.length > 0 ? contacts.map(contact => (
            <motion.div key={contact.id} className="bg-white p-4 rounded-lg shadow" layout>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{contact.name} <span className="text-sm text-gray-500 font-normal">&lt;{contact.email}&gt;</span></p>
                  <p className="text-sm font-bold text-anthracite mt-1">Sujet: {contact.subject}</p>
                  <p className="text-gray-600 text-sm mt-2">{contact.message}</p>
                  <p className="text-xs text-gray-400 mt-2">Reçu le: {new Date(contact.date).toLocaleString('fr-FR')}</p>
                </div>
                <div className="flex space-x-2 flex-shrink-0 ml-4">
                  <Button size="icon" variant="ghost" className="text-gray-500" onClick={() => archiveContact(contact.id)}>
                    <Archive size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500" onClick={() => deleteContact(contact.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )) : <p className="text-center py-8 text-gray-500">Aucun message pour le moment.</p>}
        </div>
      </div>
    </>
  );
};

export default AdminContacts;