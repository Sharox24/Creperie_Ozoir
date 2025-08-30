import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Chaque crêpe est préparée avec amour et selon les traditions bretonnes authentiques.'
    },
    {
      icon: Users,
      title: 'Convivialité',
      description: 'Un accueil chaleureux dans une ambiance familiale pour partager de bons moments.'
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Des produits frais et locaux sélectionnés avec soin pour vous offrir le meilleur.'
    },
    {
      icon: Clock,
      title: 'Tradition',
      description: 'Des recettes transmises de génération en génération pour préserver l\'authenticité.'
    }
  ];

  const team = [
    {
      name: 'Marie Dupont',
      role: 'Fondatrice & Chef',
      description: 'Originaire de Bretagne, Marie a créé la crêperie en 2015 avec la volonté de partager sa passion pour la cuisine bretonne.',
      image: 'Portrait de Marie Dupont, chef cuisinière souriante en tenue de cuisine'
    },
    {
      name: 'Pierre Martin',
      role: 'Sous-chef',
      description: 'Pierre apporte son expertise culinaire et sa créativité pour renouveler constamment notre carte.',
      image: 'Portrait de Pierre Martin, sous-chef en cuisine préparant des crêpes'
    },
    {
      name: 'Sophie Leroy',
      role: 'Responsable de salle',
      description: 'Sophie veille à ce que chaque client vive une expérience mémorable dans notre établissement.',
      image: 'Portrait de Sophie Leroy, responsable de salle souriante'
    }
  ];

  return (
    <>
      <Helmet>
        <title>À propos - Crêperie Ozoir | Notre Histoire et Notre Équipe</title>
        <meta name="description" content="Découvrez l'histoire de la Crêperie Ozoir, notre passion pour la cuisine bretonne authentique et l'équipe qui vous accueille à Ozoir-la-Ferrière." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 gradient-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-pacifico text-anthracite mb-6">
                  Notre Histoire
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Depuis 2015, la Crêperie Ozoir perpétue la tradition bretonne au cœur d'Ozoir-la-Ferrière. 
                  Notre passion pour l'authenticité et la qualité nous guide chaque jour dans la préparation 
                  de nos spécialités.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Nous croyons que chaque repas doit être un moment de partage et de plaisir. 
                  C'est pourquoi nous mettons tout notre savoir-faire au service de votre satisfaction, 
                  dans une ambiance chaleureuse et conviviale.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img  
                  alt="Intérieur chaleureux de la Crêperie Ozoir avec décoration bretonne"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                 src="https://images.unsplash.com/photo-1635446835748-c8b5b5920a90" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                Nos Valeurs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ce qui nous anime au quotidien et guide notre approche culinaire
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl glass-effect hover-lift"
                >
                  <div className="w-16 h-16 bg-crepe-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-crepe">
                    <value.icon size={32} className="text-anthracite" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-anthracite mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 gradient-crepe">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img  
                  alt="Préparation traditionnelle de crêpes bretonnes"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                 src="https://images.unsplash.com/photo-1598971580316-245e706fd6e2" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
              >
                <h2 className="text-3xl font-playfair font-bold text-anthracite mb-6">
                  L'Art de la Crêpe Bretonne
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Tout a commencé par un voyage en Bretagne où Marie, notre fondatrice, 
                    est tombée amoureuse de l'art culinaire breton. Elle a appris les secrets 
                    de la pâte parfaite auprès de maîtres crêpiers.
                  </p>
                  <p className="leading-relaxed">
                    De retour en Île-de-France, elle a décidé de partager cette passion 
                    en ouvrant la Crêperie Ozoir. Chaque recette est le fruit d'un savoir-faire 
                    traditionnel adapté aux goûts d'aujourd'hui.
                  </p>
                  <p className="leading-relaxed">
                    Nous travaillons exclusivement avec des producteurs locaux pour vous 
                    garantir des produits frais et de qualité, dans le respect de nos valeurs 
                    environnementales et sociales.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                Notre Équipe
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Rencontrez les personnes passionnées qui donnent vie à votre expérience culinaire
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center bg-gray-50 rounded-2xl p-8 hover-lift"
                >
                  <div className="mb-6">
                    <img  
                      alt={`Portrait de ${member.name}`}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                     src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-anthracite mb-2">
                    {member.name}
                  </h3>
                  <p className="text-crepe-yellow font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
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
                Venez découvrir notre univers
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Nous avons hâte de vous accueillir et de partager notre passion pour la cuisine bretonne
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-8 py-3 text-lg rounded-lg transition-colors">
                  Réserver une table
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-anthracite font-semibold px-8 py-3 text-lg rounded-lg transition-colors">
                  Nous contacter
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;