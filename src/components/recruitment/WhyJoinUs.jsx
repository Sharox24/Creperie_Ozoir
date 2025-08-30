import React from 'react';
import { motion } from 'framer-motion';
import { Users, ChefHat, Coffee } from 'lucide-react';

const advantages = [
  {
    icon: Users,
    title: 'Équipe Soudée',
    description: 'Rejoignez une équipe passionnée et bienveillante dans une ambiance familiale.'
  },
  {
    icon: ChefHat,
    title: 'Formation Continue',
    description: 'Développez vos compétences avec nos formations aux techniques bretonnes authentiques.'
  },
  {
    icon: Coffee,
    title: 'Avantages Sociaux',
    description: 'Bénéficiez de nombreux avantages : tickets restaurant, primes, évolution de carrière.'
  }
];

const WhyJoinUs = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-playfair font-bold text-anthracite mb-4">
            Pourquoi nous rejoindre ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les avantages de travailler dans notre crêperie familiale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover-lift"
            >
              <div className="w-16 h-16 bg-crepe-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-crepe">
                <advantage.icon size={32} className="text-anthracite" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-anthracite mb-4">
                {advantage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;