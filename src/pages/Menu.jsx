import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChefHat, Clock, Star, Heart, Utensils } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('crepes');
  const [favorites, setFavorites] = useState([]);
  const { toast } = useToast();

  const categories = [
    { id: 'crepes', name: 'Crêpes Sucrées', icon: Heart },
    { id: 'galettes', name: 'Galettes Salées', icon: ChefHat },
    { id: 'boissons', name: 'Boissons', icon: Utensils },
    { id: 'desserts', name: 'Desserts', icon: Star }
  ];

  const menuItems = {
    crepes: [
      {
        id: 1,
        name: 'Crêpe au Sucre',
        description: 'La classique crêpe bretonne saupoudrée de sucre fin',
        price: '4.50',
        image: 'Crêpe dorée saupoudrée de sucre blanc sur assiette blanche',
        allergens: ['Gluten', 'Œufs', 'Lait'],
        prepTime: '5 min'
      },
      {
        id: 2,
        name: 'Crêpe Nutella',
        description: 'Généreusement garnie de pâte à tartiner Nutella',
        price: '6.00',
        image: 'Crêpe pliée avec Nutella coulant, noisettes concassées',
        allergens: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],
        prepTime: '5 min'
      },
      {
        id: 3,
        name: 'Crêpe aux Fruits Rouges',
        description: 'Mélange de fraises, framboises et myrtilles fraîches',
        price: '7.50',
        image: 'Crêpe garnie de fruits rouges frais et coulis',
        allergens: ['Gluten', 'Œufs', 'Lait'],
        prepTime: '7 min'
      },
      {
        id: 4,
        name: 'Crêpe Caramel Beurre Salé',
        description: 'Spécialité bretonne au caramel au beurre salé maison',
        price: '6.50',
        image: 'Crêpe nappée de caramel doré au beurre salé',
        allergens: ['Gluten', 'Œufs', 'Lait'],
        prepTime: '6 min'
      }
    ],
    galettes: [
      {
        id: 5,
        name: 'Galette Complète',
        description: 'Jambon, œuf, fromage râpé - le grand classique',
        price: '9.50',
        image: 'Galette de sarrasin avec jambon, œuf au plat et fromage',
        allergens: ['Œufs', 'Lait'],
        prepTime: '8 min'
      },
      {
        id: 6,
        name: 'Galette Saumon Fumé',
        description: 'Saumon fumé, crème fraîche, aneth et citron',
        price: '12.00',
        image: 'Galette garnie de saumon fumé et crème à l\'aneth',
        allergens: ['Œufs', 'Lait', 'Poisson'],
        prepTime: '10 min'
      },
      {
        id: 7,
        name: 'Galette Végétarienne',
        description: 'Épinards, chèvre, tomates cerises et pignons',
        price: '10.50',
        image: 'Galette colorée aux légumes et fromage de chèvre',
        allergens: ['Œufs', 'Lait', 'Fruits à coque'],
        prepTime: '9 min'
      },
      {
        id: 8,
        name: 'Galette Andouille',
        description: 'Andouille de Guémené, pommes et oignons caramélisés',
        price: '11.00',
        image: 'Galette traditionnelle à l\'andouille et pommes',
        allergens: ['Œufs', 'Lait'],
        prepTime: '12 min'
      }
    ],
    boissons: [
      {
        id: 9,
        name: 'Cidre Breton Doux',
        description: 'Cidre artisanal de Bretagne, 2.5% vol.',
        price: '4.50',
        image: 'Verre de cidre doré avec mousse légère',
        allergens: [],
        prepTime: '1 min'
      },
      {
        id: 10,
        name: 'Café Gourmand',
        description: 'Expresso accompagné de 3 mini desserts',
        price: '6.50',
        image: 'Tasse d\'expresso avec mini cannelés et macarons',
        allergens: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],
        prepTime: '5 min'
      },
      {
        id: 11,
        name: 'Chocolat Chaud Maison',
        description: 'Chocolat noir 70% avec chantilly et copeaux',
        price: '5.00',
        image: 'Mug de chocolat chaud avec chantilly et chocolat râpé',
        allergens: ['Lait'],
        prepTime: '4 min'
      }
    ],
    desserts: [
      {
        id: 12,
        name: 'Far Breton aux Pruneaux',
        description: 'Dessert traditionnel breton aux pruneaux d\'Agen',
        price: '5.50',
        image: 'Part de far breton doré avec pruneaux',
        allergens: ['Gluten', 'Œufs', 'Lait'],
        prepTime: '3 min'
      },
      {
        id: 13,
        name: 'Kouign-Amann',
        description: 'Pâtisserie bretonne feuilletée au beurre salé',
        price: '4.00',
        image: 'Kouign-amann doré et caramélisé sur assiette',
        allergens: ['Gluten', 'Lait'],
        prepTime: '2 min'
      }
    ]
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    
    toast({
      title: favorites.includes(itemId) ? "Retiré des favoris" : "Ajouté aux favoris",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Notre Carte - Crêperie Ozoir</title>
        <meta name="description" content="Découvrez notre carte de crêpes sucrées, galettes salées et boissons artisanales. Spécialités bretonnes authentiques à Ozoir-la-Ferrière." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
                Notre Carte
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Découvrez nos spécialités bretonnes authentiques, préparées avec passion et des ingrédients de qualité
              </p>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </section>

        {/* Category Navigation */}
        <section className="py-8 bg-white shadow-lg sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-yellow-400 text-gray-800 shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={20} />
                    {category.name}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {menuItems[selectedCategory]?.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                  layout
                >
                  <div className="relative">
                    <img  
                      className="w-full h-48 object-cover"
                      alt={item.name}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                        favorites.includes(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart size={20} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                    </button>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full">
                      <Clock size={16} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-800">{item.prepTime}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 font-serif">
                        {item.name}
                      </h3>
                      <span className="text-2xl font-bold text-yellow-600">
                        {item.price}€
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {item.allergens.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Allergènes :</p>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((allergen) => (
                            <span
                              key={allergen}
                              className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <motion.button
                      className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 font-semibold py-3 rounded-xl hover:from-yellow-500 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toast({
                        title: "Commande ajoutée !",
                        description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
                      })}
                    >
                      Commander
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-serif">
                Envie de déguster nos spécialités ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Réservez votre table dès maintenant et savourez l'authenticité bretonne
              </p>
              <motion.button
                className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 font-bold py-4 px-8 rounded-xl text-lg hover:from-yellow-500 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast({
                  title: "Redirection vers les réservations",
                  description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
                })}
              >
                Réserver une table
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Menu;