import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ChefHat, Clock, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Home = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "Fonctionnalité en développement",
      description: t('featureNotImplemented'),
      duration: 4000,
    });
  };

  const features = [
    {
      icon: ChefHat,
      title: 'Recettes Traditionnelles',
      description: 'Nos crêpes et galettes sont préparées selon les recettes bretonnes authentiques transmises de génération en génération.'
    },
    {
      icon: Star,
      title: 'Produits Locaux',
      description: 'Nous privilégions les producteurs locaux pour vous offrir des ingrédients frais et de qualité supérieure.'
    },
    {
      icon: Calendar,
      title: 'Réservation Facile',
      description: 'Réservez votre table en ligne en quelques clics et profitez d\'une expérience culinaire inoubliable.'
    }
  ];

  const news = [
    {
      id: 1,
      title: 'Nouvelle carte d\'automne',
      excerpt: 'Découvrez nos nouvelles créations aux saveurs automnales avec des produits de saison.',
      date: '15 octobre 2024',
      image: 'Crêpe aux pommes caramélisées et cannelle'
    },
    {
      id: 2,
      title: 'Soirée dégustation',
      excerpt: 'Rejoignez-nous le 25 octobre pour une soirée dégustation de cidres bretons.',
      date: '10 octobre 2024',
      image: 'Verres de cidre breton avec crêpes'
    },
    {
      id: 3,
      title: 'Atelier crêpes enfants',
      excerpt: 'Vos enfants apprennent à faire des crêpes tous les mercredis après-midi.',
      date: '5 octobre 2024',
      image: 'Enfants préparant des crêpes en cuisine'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Crêperie Ozoir - Accueil | Crêpes Artisanales à Ozoir-la-Ferrière</title>
        <meta name="description" content="Bienvenue à la Crêperie Ozoir ! Découvrez nos crêpes et galettes artisanales préparées avec passion selon la tradition bretonne à Ozoir-la-Ferrière." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 crepe-pattern opacity-30"></div>
        <div className="absolute inset-0 gradient-warm opacity-90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-pacifico text-anthracite text-shadow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {t('heroTitle')}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl font-playfair text-gray-700 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('heroSubtitle')}
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('heroDescription')}
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/reservation">
                <Button className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-8 py-3 text-lg shadow-crepe hover-lift">
                  <Calendar className="mr-2" size={20} />
                  {t('bookTable')}
                </Button>
              </Link>
              <Link to="/carte">
                <Button variant="outline" className="border-anthracite text-anthracite hover:bg-anthracite hover:text-white px-8 py-3 text-lg hover-lift">
                  <ChefHat className="mr-2" size={20} />
                  {t('viewMenu')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <div className="relative max-w-2xl mx-auto">
              <img  
                alt="Crêpes bretonnes artisanales dorées avec garniture"
                className="w-full h-auto rounded-2xl shadow-2xl float-animation"
               src="https://images.unsplash.com/photo-1673646961450-8432d46e3a40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-playfair font-bold text-anthracite mb-4">
              Pourquoi choisir Crêperie Ozoir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience culinaire authentique dans un cadre chaleureux et convivial
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl glass-effect hover-lift cursor-pointer"
                onClick={() => handleFeatureClick(feature.title)}
              >
                <div className="w-16 h-16 bg-crepe-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-crepe">
                  <feature.icon size={32} className="text-anthracite" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-anthracite mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="py-20 gradient-crepe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center mb-6">
                  <Clock size={32} className="text-anthracite mr-4" />
                  <h2 className="text-3xl font-playfair font-bold text-anthracite">
                    {t('openingHours')}
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-anthracite">{t('tuesday')} - {t('thursday')}</span>
                    <span className="text-gray-600">12h00-14h30 / 19h00-22h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-anthracite">{t('friday')} - {t('saturday')}</span>
                    <span className="text-gray-600">12h00-14h30 / 19h00-22h30</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-anthracite">{t('sunday')}</span>
                    <span className="text-gray-600">12h00-15h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-anthracite">{t('monday')}</span>
                    <span className="text-red-500 font-medium">{t('closed')}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h3 className="text-3xl font-playfair font-bold text-anthracite mb-6">
                Venez nous rendre visite !
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Située au cœur d'Ozoir-la-Ferrière, notre crêperie vous accueille dans une ambiance chaleureuse et authentique. 
                Que ce soit pour un déjeuner en famille ou un dîner romantique, nous vous promettons une expérience inoubliable.
              </p>
              <Link to="/contact">
                <Button className="bg-anthracite hover:bg-gray-700 text-white px-8 py-3 text-lg hover-lift">
                  Nous trouver
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-playfair font-bold text-anthracite mb-4">
              Nos dernières actualités
            </h2>
            <p className="text-xl text-gray-600">
              Restez informé de nos nouveautés et événements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift cursor-pointer"
                onClick={() => handleFeatureClick('actualité')}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img  
                    alt={article.title}
                    className="w-full h-48 object-cover"
                   src="https://images.unsplash.com/photo-1548778052-311f4bc2b502" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-crepe-yellow font-medium mb-2">
                    {article.date}
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-anthracite mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-anthracite font-medium">
                    {t('readMore')}
                    <ArrowRight className="ml-2" size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/actualites">
              <Button variant="outline" className="border-anthracite text-anthracite hover:bg-anthracite hover:text-white px-8 py-3 text-lg hover-lift">
                Voir toutes les actualités
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;