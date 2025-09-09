import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '#shared/contexts/LanguageContext';
import { useToast } from '#shared/components/ui/use-toast';
import { supabase, hasSupabase } from '#shared/lib/supabaseClient';

const News = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [remoteArticles, setRemoteArticles] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!hasSupabase) return;
      const { data } = await supabase.from('actualite').select('id, title, content, image, date, lang');
      if (data && data.length) {
        const filtered = data.filter(a => a.lang === language || !a.lang);
        const mapped = (filtered.length ? filtered : data).map(a => ({ id: a.id, title: a.title, excerpt: a.content?.slice(0, 160) || '', content: a.content || '', date: a.date, category: 'news', image: a.image || '', featured: false }));
        setRemoteArticles(mapped);
      }
    };
    load();
  }, [language]);

  const handleArticleClick = (article) => {
    toast({
      title: "Article complet",
      description: t('featureNotImplemented'),
      duration: 4000,
    });
  };

  const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'menu', name: 'Nouveautés Menu' },
    { id: 'events', name: 'Événements' },
    { id: 'news', name: 'Actualités' }
  ];

  const articles = remoteArticles || [
    {
      id: 1,
      title: 'Nouvelle carte d\'automne 2024',
      excerpt: 'Découvrez nos nouvelles créations aux saveurs automnales avec des produits de saison sélectionnés avec soin.',
      content: 'Cette saison, nous vous proposons des créations inédites mettant à l\'honneur les saveurs automnales...',
      date: '2024-10-15',
      category: 'menu',
      image: 'Crêpe aux pommes caramélisées et cannelle avec décoration automnale',
      featured: true
    },
    {
      id: 2,
      title: 'Soirée dégustation cidres bretons',
      excerpt: 'Rejoignez-nous le 25 octobre pour une soirée dégustation de cidres bretons accompagnés de nos meilleures galettes.',
      content: 'Une soirée exceptionnelle vous attend avec une sélection de cidres bretons...',
      date: '2024-10-10',
      category: 'events',
      image: 'Verres de cidre breton avec galettes sur table en bois',
      featured: false
    },
    {
      id: 3,
      title: 'Ateliers crêpes pour enfants',
      excerpt: 'Tous les mercredis après-midi, vos enfants apprennent à faire des crêpes comme de vrais petits chefs !',
      content: 'Nos ateliers crêpes pour enfants rencontrent un franc succès...',
      date: '2024-10-05',
      category: 'events',
      image: 'Enfants souriants préparant des crêpes en cuisine avec tabliers',
      featured: false
    },
    {
      id: 4,
      title: 'Partenariat avec les producteurs locaux',
      excerpt: 'Nous renforçons notre engagement en faveur du local avec de nouveaux partenariats avec des producteurs de la région.',
      content: 'Notre engagement pour la qualité et le local se renforce...',
      date: '2024-09-28',
      category: 'news',
      image: 'Producteurs locaux avec leurs produits frais sur un marché',
      featured: false
    },
    {
      id: 5,
      title: 'Menu spécial Halloween',
      excerpt: 'Du 25 au 31 octobre, découvrez notre menu spécial Halloween avec des créations effrayamment délicieuses !',
      content: 'Pour Halloween, nous avons concocté des créations spéciales...',
      date: '2024-09-20',
      category: 'menu',
      image: 'Crêpes décorées pour Halloween avec citrouilles et décorations',
      featured: false
    },
    {
      id: 6,
      title: 'Rénovation de la terrasse',
      excerpt: 'Notre terrasse fait peau neuve ! Découvrez notre nouvel espace extérieur pour profiter des beaux jours.',
      content: 'Après plusieurs semaines de travaux, notre terrasse est enfin prête...',
      date: '2024-09-15',
      category: 'news',
      image: 'Nouvelle terrasse aménagée avec tables et parasols',
      featured: false
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <>
      <Helmet>
        <title>Actualités - Crêperie Ozoir | Nouveautés et Événements</title>
        <meta name="description" content="Suivez les actualités de la Crêperie Ozoir : nouveautés du menu, événements spéciaux, ateliers et toutes nos dernières nouvelles." />
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
                Actualités
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Restez informé de nos nouveautés, événements spéciaux et de toute l'actualité 
                de la Crêperie Ozoir
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-crepe-yellow text-anthracite shadow-crepe'
                      : 'bg-white text-gray-600 hover:text-anthracite hover:bg-yellow-50 shadow-md'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {selectedCategory === 'all' && featuredArticle && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden hover-lift cursor-pointer"
                onClick={() => handleArticleClick(featuredArticle)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
                    <img  
                      alt={featuredArticle.title}
                      className="w-full h-64 lg:h-full object-cover"
                     src="https://images.unsplash.com/photo-1548778052-311f4bc2b502" />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-crepe-yellow text-anthracite px-3 py-1 rounded-full text-sm font-medium">
                        À la une
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(featuredArticle.date)}
                      </span>
                    </div>
                    <h2 className="text-3xl font-playfair font-bold text-anthracite mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center text-anthracite font-medium">
                      {t('readMore')}
                      <ArrowRight className="ml-2" size={20} />
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img  
                      alt={article.title}
                      className="w-full h-48 object-cover"
                     src="https://images.unsplash.com/photo-1633362967859-fde6c856274d" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        <Tag className="inline mr-1" size={12} />
                        {getCategoryName(article.category)}
                      </span>
                      <span className="text-gray-400 text-sm flex items-center">
                        <Calendar className="mr-1" size={14} />
                        {formatDate(article.date)}
                      </span>
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
            </motion.div>

            {filteredArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <p className="text-xl text-gray-600">
                  Aucun article trouvé dans cette catégorie.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-anthracite text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-6">
                Restez informé de nos actualités
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Inscrivez-vous à notre newsletter pour ne rien manquer de nos nouveautés et événements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-crepe-yellow"
                  onClick={() => toast({
                    title: "Newsletter",
                    description: t('featureNotImplemented'),
                    duration: 4000,
                  })}
                />
                <button 
                  className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-6 py-3 rounded-lg transition-colors"
                  onClick={() => toast({
                    title: "Newsletter",
                    description: t('featureNotImplemented'),
                    duration: 4000,
                  })}
                >
                  S'inscrire
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default News;
