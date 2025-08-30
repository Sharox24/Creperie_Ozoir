import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, X, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('creperie-reviews') || '[]');
    setReviews(savedReviews);
  }, []);

  const updateReviewStatus = (id, approved) => {
    const updatedReviews = reviews.map(rev => 
      rev.id === id ? { ...rev, approved } : rev
    );
    setReviews(updatedReviews);
    localStorage.setItem('creperie-reviews', JSON.stringify(updatedReviews));
    toast({
      title: "Avis mis à jour",
      description: `L'avis a été ${approved ? 'approuvé' : 'rejeté'}.`,
    });
  };

  const deleteReview = (id) => {
    const updatedReviews = reviews.filter(rev => rev.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem('creperie-reviews', JSON.stringify(updatedReviews));
    toast({
      title: "Avis supprimé",
      variant: "destructive",
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const pendingReviews = reviews.filter(r => !r.approved);
  const approvedReviews = reviews.filter(r => r.approved);

  return (
    <>
      <Helmet>
        <title>Gestion des Avis - Admin</title>
      </Helmet>
      <div className="space-y-8">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion des Avis</h1>
        
        <div>
          <h2 className="text-2xl font-bold text-anthracite mb-4">Avis en attente ({pendingReviews.length})</h2>
          <div className="space-y-4">
            {pendingReviews.length > 0 ? pendingReviews.map(review => (
              <motion.div key={review.id} className="bg-white p-4 rounded-lg shadow" layout>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <p className="font-semibold mr-4">{review.name}</p>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-600 text-sm">"{review.message}"</p>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0 ml-4">
                    <Button size="icon" variant="ghost" className="text-green-500" onClick={() => updateReviewStatus(review.id, true)}>
                      <Check size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-500" onClick={() => deleteReview(review.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )) : <p className="text-gray-500">Aucun avis en attente.</p>}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-anthracite mb-4">Avis approuvés ({approvedReviews.length})</h2>
          <div className="space-y-4">
            {approvedReviews.length > 0 ? approvedReviews.map(review => (
              <motion.div key={review.id} className="bg-white p-4 rounded-lg shadow-sm opacity-70" layout>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <p className="font-semibold mr-4">{review.name}</p>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-600 text-sm">"{review.message}"</p>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0 ml-4">
                    <Button size="icon" variant="ghost" className="text-yellow-500" onClick={() => updateReviewStatus(review.id, false)}>
                      <X size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-500" onClick={() => deleteReview(review.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )) : <p className="text-gray-500">Aucun avis approuvé.</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReviews;