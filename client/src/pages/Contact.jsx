import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '#shared/contexts/LanguageContext';
import { Button } from '#shared/components/ui/button';
import { useToast } from '#shared/components/ui/use-toast';
import { supabase, hasSupabase } from '#shared/lib/supabaseClient';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (hasSupabase) {
        const { error } = await supabase.from('contact').insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });
        if (error) throw error;
      } else {
        const contacts = JSON.parse(localStorage.getItem('creperie-contacts') || '[]');
        contacts.push({ id: Date.now(), ...formData, date: new Date().toISOString(), status: 'nouveau' });
        localStorage.setItem('creperie-contacts', JSON.stringify(contacts));
      }
      toast({ title: 'Message envoyé !', description: 'Nous vous répondrons dans les plus brefs délais.', duration: 5000 });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast({ title: 'Erreur', description: err.message, variant: 'destructive' });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('address'),
      content: '123 Avenue de la République\n77330 Ozoir-la-Ferrière',
      link: 'https://maps.google.com/?q=Ozoir-la-Ferrière'
    },
    { icon: Phone, title: t('phone'), content: '01 64 40 12 34', link: 'tel:+33164401234' },
    { icon: Mail, title: t('email'), content: 'contact@creperieozoir.fr', link: 'mailto:contact@creperieozoir.fr' }
  ];

  const openingHours = [
    { day: 'Mardi - Jeudi', hours: '12h00-14h30 / 19h00-22h00' },
    { day: 'Vendredi - Samedi', hours: '12h00-14h30 / 19h00-22h30' },
    { day: 'Dimanche', hours: '12h00-15h00' },
    { day: 'Lundi', hours: 'Fermé' }
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Crêperie Ozoir | Nous Contacter et Nous Trouver</title>
        <meta name="description" content="Contactez la Crêperie Ozoir à Ozoir-la-Ferrière. Adresse, téléphone, horaires d'ouverture et formulaire de contact pour toutes vos questions." />
      </Helmet>

      <div className="min-h-screen bg-gradient-warm">
        {/* Header */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-pacifico text-anthracite mb-6">Nous Contacter</h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Une question, une réservation, ou simplement envie de nous dire bonjour ? Nous sommes là pour vous !
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-playfair font-bold text-anthracite mb-8">Nos Coordonnées</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg hover-lift">
                        <div className="w-12 h-12 bg-crepe-yellow rounded-full flex items-center justify-center flex-shrink-0">
                          <info.icon size={24} className="text-anthracite" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-anthracite mb-2">{info.title}</h3>
                          <a href={info.link} className="text-gray-600 hover:text-anthracite transition-colors whitespace-pre-line">
                            {info.content}
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <Clock size={24} className="text-anthracite mr-3" />
                    <h3 className="text-2xl font-playfair font-bold text-anthracite">{t('openingHours')}</h3>
                  </div>
                  <div className="space-y-3">
                    {openingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-anthracite">{schedule.day}</span>
                        <span className={`text-sm ${schedule.hours === 'Fermé' ? 'text-red-500' : 'text-gray-600'}`}>{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-3xl font-playfair font-bold text-anthracite mb-6">{t('contactForm')}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-anthracite mb-2">{t('name')} *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors" placeholder="Votre nom" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-anthracite mb-2">{t('email')} *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors" placeholder="votre@email.com" />
                      </div>
                    </div>

                    <div>
                       <label htmlFor="subject" className="block text-sm font-medium text-anthracite mb-2">{t('subject')} *</label>
                      <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors">
                        <option value="">Choisissez un sujet</option>
                        <option value="reservation">Réservation</option>
                        <option value="information">Demande d'information</option>
                        <option value="evenement">Événement privé</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-anthracite mb-2">{t('message')} *</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors resize-none" placeholder="Votre message..." />
                    </div>

                    <Button type="submit" className="w-full bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold py-3 text-lg shadow-crepe hover-lift">
                      <Send className="mr-2" size={20} />
                      {t('submit')}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold text-anthracite mb-4">Nous Trouver</h2>
              <p className="text-xl text-gray-600">Située au cœur d'Ozoir-la-Ferrière, notre crêperie vous attend</p>
            </motion.div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-96">
              <iframe
                title="Carte - Crêperie Ozoir"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d168357.641!2d2.5!3d48.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sOzoir-la-Ferrière!5e0!3m2!1sfr!2sfr!4v1700000000000"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;

