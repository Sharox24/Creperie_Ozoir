import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    availability: '',
    motivation: '',
    cv: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      cv: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const applications = JSON.parse(localStorage.getItem('creperie-applications') || '[]');
    const newApplication = {
      id: Date.now(),
      ...formData,
      cv: formData.cv ? formData.cv.name : null,
      date: new Date().toISOString(),
      status: 'nouveau'
    };
    applications.push(newApplication);
    localStorage.setItem('creperie-applications', JSON.stringify(applications));

    toast({
      title: "Candidature envoyée !",
      description: "Nous examinerons votre candidature et vous recontacterons rapidement.",
      duration: 5000,
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      availability: '',
      motivation: '',
      cv: null
    });
  };

  return (
    <section id="application-form" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-playfair font-bold text-anthracite mb-4">
              Formulaire de Candidature
            </h2>
            <p className="text-gray-600">
              Remplissez le formulaire ci-dessous pour postuler à l'un de nos postes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-anthracite mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors"
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-anthracite mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-anthracite mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors"
                  placeholder="01 23 45 67 89"
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-anthracite mb-2">
                  Poste souhaité *
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors"
                >
                  <option value="">Choisir un poste</option>
                  <option value="Cuisinier(ère) Crêpier">Cuisinier(ère) Crêpier</option>
                  <option value="Serveur(se)">Serveur(se)</option>
                  <option value="Commis de cuisine">Commis de cuisine</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-anthracite mb-2">
                Expérience professionnelle *
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors resize-none"
                placeholder="Décrivez votre expérience professionnelle..."
              />
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-anthracite mb-2">
                Disponibilités *
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors"
                placeholder="Ex: Temps plein, temps partiel, soirées, week-ends..."
              />
            </div>

            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-anthracite mb-2">
                Lettre de motivation *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors resize-none"
                placeholder="Expliquez-nous pourquoi vous souhaitez rejoindre notre équipe..."
              />
            </div>

            <div>
              <label htmlFor="cv" className="block text-sm font-medium text-anthracite mb-2">
                <Upload className="inline mr-2" size={16} />
                CV (PDF, DOC, DOCX) *
              </label>
              <input
                type="file"
                id="cv"
                name="cv"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-crepe-yellow file:text-anthracite hover:file:bg-yellow-400"
              />
            </div>

            <div className="text-center">
              <Button 
                type="submit"
                className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-12 py-4 text-lg shadow-crepe hover-lift"
              >
                <Send className="mr-2" size={20} />
                Envoyer ma candidature
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationForm;