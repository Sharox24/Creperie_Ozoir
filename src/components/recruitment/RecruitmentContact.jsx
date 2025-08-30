import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const RecruitmentContact = () => {
  return (
    <section className="py-16 bg-anthracite text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-playfair font-bold mb-6">
            Des questions sur nos offres ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            N'hésitez pas à nous contacter pour plus d'informations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-8 py-3 text-lg">
              Nous appeler
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-anthracite font-semibold px-8 py-3 text-lg">
              Nous écrire
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruitmentContact;