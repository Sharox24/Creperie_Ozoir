import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '#shared/contexts/LanguageContext';
import { supabase, hasSupabase } from '#shared/lib/supabaseClient';

const Footer = () => {
  const { t } = useLanguage();

  const [hours, setHours] = useState(null);
  useEffect(() => {
    const load = async () => {
      if (hasSupabase) {
        const { data } = await supabase.from('opening_hours').select('*');
        if (data && data.length) setHours(data);
      }
    };
    load();
  }, []);

  const defaultHours = [
    { day: t('tuesday'), hours: '12h00 - 14h30 / 19h00 - 22h00' },
    { day: t('wednesday'), hours: '12h00 - 14h30 / 19h00 - 22h00' },
    { day: t('thursday'), hours: '12h00 - 14h30 / 19h00 - 22h00' },
    { day: t('friday'), hours: '12h00 - 14h30 / 19h00 - 22h30' },
    { day: t('saturday'), hours: '12h00 - 14h30 / 19h00 - 22h30' },
    { day: t('sunday'), hours: '12h00 - 15h00' },
    { day: t('monday'), hours: t('closed') },
  ];

  return (
    <footer className="bg-anthracite text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" onError={(e)=>{e.currentTarget.src='/logo.svg';}} alt="Crêperie Ozoir" className="h-10 w-auto" />
              <span className="text-xl font-playfair tracking-wide">Crêperie Ozoir</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              L'art de la crêpe bretonne à Ozoir-la-Ferrière. Des produits frais et locaux pour des saveurs authentiques.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-crepe-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-crepe-yellow transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-crepe-yellow">Contact</span>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-crepe-yellow mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Avenue de la République<br />
                  77330 Ozoir-la-Ferrière
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-crepe-yellow flex-shrink-0" />
                <span className="text-gray-300 text-sm">01 64 40 12 34</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-crepe-yellow flex-shrink-0" />
                <span className="text-gray-300 text-sm">contact@creperieozoir.fr</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock size={18} className="text-crepe-yellow" />
              <span className="text-lg font-semibold text-crepe-yellow">{t('openingHours')}</span>
            </div>
            <div className="space-y-2">
              {(hours && hours.length ? hours.map(h => ({
                day: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][h.weekday] || '',
                hours: h.ranges || t('closed')
              })) : defaultHours).map((schedule, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-300">{schedule.day}</span>
                  <span className="text-gray-300">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-crepe-yellow">Liens rapides</span>
            <div className="space-y-2">
              <Link to="/carte" className="block text-gray-300 hover:text-crepe-yellow transition-colors text-sm">
                {t('menu')}
              </Link>
              <Link to="/reservation" className="block text-gray-300 hover:text-crepe-yellow transition-colors text-sm">
                {t('reservation')}
              </Link>
              <Link to="/actualites" className="block text-gray-300 hover:text-crepe-yellow transition-colors text-sm">
                {t('news')}
              </Link>
              <Link to="/livre-or" className="block text-gray-300 hover:text-crepe-yellow transition-colors text-sm">
                {t('guestBook')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Crêperie Ozoir. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/mentions-legales" className="text-gray-400 hover:text-crepe-yellow transition-colors text-sm">
              {t('legalNotices')}
            </Link>
            <Link to="/politique-confidentialite" className="text-gray-400 hover:text-crepe-yellow transition-colors text-sm">
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
