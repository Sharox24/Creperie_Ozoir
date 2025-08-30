import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, MessageSquare, User, Calendar, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const GuestBook = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem('creperie-reviews') || '[]');
    
    // Add some default reviews if none exist
    if (savedReviews.length === 0) {
      const defaultReviews = [
        {
          id: 1,
          name: 'Marie Dubois',
          rating: 5,
          message: 'Excellente crêperie ! Les galettes sont authentiques et délicieuses. L\'accueil est chaleureux et l\'ambiance très conviviale. Je recommande vivement !',
          date: '2024-10-10',
          approved: true
        },
        {
          id: 2,
          name: 'Pierre Martin',
          rating: 5,
          message: 'Un vrai régal ! Les crêpes sucrées sont un délice et les produits sont de qualité. Le service est impeccable. Nous reviendrons c\'est sûr !',
          date: '2024-10-08',
          approved: true
        },
        {
          id: 3,
          name: 'Sophie Leroy',
          rating: 4,
          message: 'Très bonne expérience dans cette crêperie. Les galettes complètes sont savoureuses et l\'ambiance bretonne est au rendez-vous. Petit bémol sur l\'attente mais ça vaut le coup !',
          date: '2024-10-05',
          approved: true
        },
        {
          id: 4,
          name: 'Jean Dupont',
          rating: 5,
          message: 'Parfait pour un repas en famille ! Les enfants ont adoré les crêpes au Nutella et nous avons apprécié les galettes traditionnelles. Service attentionné.',
          date: '2024-10-02',
          approved: true
        },
        {
          id: 5,
          name: 'Isabelle Moreau',
          rating: 5,
          message: 'Une découverte fantastique ! Les produits sont frais, les recettes authentiques et l\'équipe est adorable. L\'ambiance nous transporte directement en Bretagne.',
          date: '2024-09-28',
          approved: true
        }
      ];
      localStorage.setItem('creperie-reviews', JSON.stringify(defaultReviews));
      setReviews(defaultReviews);
    } else {
      setReviews(savedReviews.filter(review => review.approved));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const allReviews = JSON.parse(localStorage.getItem('creperie-reviews') || '[]');
    const newReview = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      approved: false // Needs approval
    };
    allReviews.push(newReview);
    localStorage.setItem('creperie-reviews', JSON.stringify(allReviews));

    toast({
      title: "Avis envoyé !",
      description: "Merci pour votre avis ! Il sera publié après validation.",
      duration: 5000,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      rating: 5,
      message: ''
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <Helmet>
        <title>Livre d'or - Crêperie Ozoir | Avis et Témoignages Clients</title>
        <meta name="description" content="Découvrez les avis et témoignages de nos clients sur la Crêperie Ozoir. Partagez votre expérience et laissez votre avis sur notre livre d'or." />
      </Helmet>

      <div className="min-h-screen bg-gradient-warm">
        {/* Header */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-pacifico text-anthracite mb-6">
                Livre d'Or
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Découvrez les témoignages de nos clients et partagez votre expérience 
                à la Crêperie Ozoir
              </p>
            </motion.div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-crepe-yellow mb-2">
                    {reviews.length}
                  </div>
                  <p className="text-gray-600">Avis clients</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-crepe-yellow mr-2">
                      {averageRating}
                    </span>
                    <div className="flex">
                      {renderStars(Math.round(averageRating))}
                    </div>
                  </div>
                  <p className="text-gray-600">Note moyenne</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-crepe-yellow mb-2">
                    98%
                  </div>
                  <p className="text-gray-600">Clients satisfaits</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Review Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-playfair font-bold text-anthracite mb-4">
                  Partagez votre expérience
                </h2>
                <p className="text-gray-600">
                  Votre avis nous aide à nous améliorer et guide les futurs clients
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-anthracite mb-2">
                      <User className="inline mr-2" size={16} />
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-anthracite mb-2">
                      Email (optionnel)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-anthracite mb-2">
                    <Star className="inline mr-2" size={16} />
                    Note *
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={star <= formData.rating 
                            ? 'text-yellow-400 fill-current hover:text-yellow-500' 
                            : 'text-gray-300 hover:text-gray-400'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-anthracite mb-2">
                    <MessageSquare className="inline mr-2" size={16} />
                    Votre avis *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors resize-none"
                    placeholder="Partagez votre expérience à la Crêperie Ozoir..."
                  />
                </div>

                <div className="text-center">
                  <Button 
                    type="submit"
                    className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-8 py-3 text-lg shadow-crepe hover-lift"
                  >
                    <Send className="mr-2" size={20} />
                    Publier mon avis
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Reviews List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-playfair font-bold text-anthracite mb-4">
                Ce que disent nos clients
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez les témoignages authentiques de nos visiteurs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover-lift"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-crepe-yellow rounded-full flex items-center justify-center">
                        <User size={20} className="text-anthracite" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-anthracite">{review.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {formatDate(review.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    "{review.message}"
                  </p>
                </motion.div>
              ))}
            </div>

            {reviews.length === 0 && (
              <div className="text-center py-16">
                <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">
                  Soyez le premier à laisser un avis !
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-anthracite text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-6">
                Venez vivre votre propre expérience !
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Réservez votre table et découvrez pourquoi nos clients nous recommandent
              </p>
              <Button className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-8 py-3 text-lg">
                Réserver une table
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GuestBook;