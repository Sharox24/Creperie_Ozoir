import React from 'react';
import { motion } from 'framer-motion';

const RecruitmentHeader = () => {
  return (
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-pacifico text-anthracite mb-6">
            Recrutement
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Rejoignez notre équipe passionnée et participez à l'aventure de la Crêperie Ozoir ! 
            Nous recherchons des talents motivés pour grandir ensemble.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruitmentHeader;