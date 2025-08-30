import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';

const jobOffersData = [
  {
    id: 1,
    title: 'Cuisinier(ère) Crêpier',
    type: 'CDI',
    location: 'Ozoir-la-Ferrière',
    salary: '1800-2200€',
    description: 'Nous recherchons un(e) cuisinier(ère) passionné(e) pour rejoindre notre équipe. Expérience en crêperie appréciée.',
    requirements: [
      'Expérience en restauration (2 ans minimum)',
      'Connaissance des techniques de cuisson des crêpes et galettes',
      'Sens du travail en équipe',
      'Disponibilité en soirée et week-end'
    ],
    benefits: [
      'Formation aux techniques bretonnes',
      'Équipe dynamique et bienveillante',
      'Évolution possible',
      'Tickets restaurant'
    ]
  },
  {
    id: 2,
    title: 'Serveur(se)',
    type: 'CDD/CDI',
    location: 'Ozoir-la-Ferrière',
    salary: '1600-1900€',
    description: 'Rejoignez notre équipe de service pour accueillir nos clients dans une ambiance chaleureuse et conviviale.',
    requirements: [
      'Expérience en service (1 an minimum)',
      'Excellent relationnel client',
      'Dynamisme et sourire',
      'Disponibilité flexible'
    ],
    benefits: [
      'Pourboires',
      'Formation produits',
      'Ambiance de travail agréable',
      'Évolution possible'
    ]
  },
  {
    id: 3,
    title: 'Commis de cuisine',
    type: 'Apprentissage/CDD',
    location: 'Ozoir-la-Ferrière',
    salary: '1400-1600€',
    description: 'Poste idéal pour débuter dans la restauration et apprendre les techniques de la crêperie bretonne.',
    requirements: [
      'Motivation et envie d\'apprendre',
      'Aucune expérience requise',
      'Disponibilité en soirée',
      'Esprit d\'équipe'
    ],
    benefits: [
      'Formation complète',
      'Encadrement personnalisé',
      'Possibilité d\'évolution rapide',
      'Découverte de la cuisine bretonne'
    ]
  }
];

const JobOffers = () => {
  const [jobOffers, setJobOffers] = useState(jobOffersData);

  const handleApplyClick = (jobTitle) => {
    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
    // This part would need a way to communicate state up to the parent,
    // for now we just scroll. A more robust solution would use a context or state lifting.
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-playfair font-bold text-anthracite mb-4">
            Nos Offres d'Emploi
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez les postes disponibles et trouvez celui qui vous correspond
          </p>
        </motion.div>

        <div className="space-y-8">
          {jobOffers.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg hover-lift"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-2xl font-playfair font-bold text-anthracite">
                      {job.title}
                    </h3>
                    <span className="bg-crepe-yellow text-anthracite px-3 py-1 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Euro size={16} className="mr-2" />
                      {job.salary}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-anthracite mb-3">Profil recherché :</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start">
                            <span className="w-2 h-2 bg-crepe-yellow rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-anthracite mb-3">Nous offrons :</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start">
                            <span className="w-2 h-2 bg-crepe-yellow rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <Button 
                    className="w-full bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold py-3 mb-4"
                    onClick={() => handleApplyClick(job.title)}
                  >
                    Postuler
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Candidature en ligne
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobOffers;