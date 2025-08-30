import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    menu: 'Carte',
    about: 'À propos',
    contact: 'Contact',
    reservation: 'Réservation',
    news: 'Actualités',
    guestBook: 'Livre d\'or',
    recruitment: 'Recrutement',
    
    // Common
    welcome: 'Bienvenue',
    readMore: 'Lire la suite',
    submit: 'Envoyer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    close: 'Fermer',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    
    // Home page
    heroTitle: 'Crêperie Ozoir',
    heroSubtitle: 'L\'art de la crêpe bretonne à Ozoir-la-Ferrière',
    heroDescription: 'Découvrez nos crêpes et galettes artisanales préparées avec passion selon la tradition bretonne.',
    bookTable: 'Réserver une table',
    viewMenu: 'Voir la carte',
    
    // Opening hours
    openingHours: 'Horaires d\'ouverture',
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
    closed: 'Fermé',
    
    // Menu categories
    crepes: 'Crêpes',
    galettes: 'Galettes',
    drinks: 'Boissons',
    desserts: 'Desserts',
    
    // Contact
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Email',
    contactForm: 'Formulaire de contact',
    name: 'Nom',
    message: 'Message',
    subject: 'Sujet',
    
    // Reservation
    reservationForm: 'Formulaire de réservation',
    date: 'Date',
    time: 'Heure',
    guests: 'Nombre de personnes',
    specialRequests: 'Demandes spéciales',
    
    // Footer
    followUs: 'Suivez-nous',
    legalNotices: 'Mentions légales',
    privacyPolicy: 'Politique de confidentialité',
    
    // Notifications
    featureNotImplemented: '🚧 Cette fonctionnalité n\'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀'
  },
  en: {
    // Navigation
    home: 'Home',
    menu: 'Menu',
    about: 'About',
    contact: 'Contact',
    reservation: 'Reservation',
    news: 'News',
    guestBook: 'Guest Book',
    recruitment: 'Recruitment',
    
    // Common
    welcome: 'Welcome',
    readMore: 'Read more',
    submit: 'Submit',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Home page
    heroTitle: 'Crêperie Ozoir',
    heroSubtitle: 'The art of Breton crêpes in Ozoir-la-Ferrière',
    heroDescription: 'Discover our artisanal crêpes and galettes prepared with passion according to Breton tradition.',
    bookTable: 'Book a table',
    viewMenu: 'View menu',
    
    // Opening hours
    openingHours: 'Opening Hours',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    closed: 'Closed',
    
    // Menu categories
    crepes: 'Crêpes',
    galettes: 'Galettes',
    drinks: 'Drinks',
    desserts: 'Desserts',
    
    // Contact
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    contactForm: 'Contact Form',
    name: 'Name',
    message: 'Message',
    subject: 'Subject',
    
    // Reservation
    reservationForm: 'Reservation Form',
    date: 'Date',
    time: 'Time',
    guests: 'Number of guests',
    specialRequests: 'Special requests',
    
    // Footer
    followUs: 'Follow us',
    legalNotices: 'Legal notices',
    privacyPolicy: 'Privacy policy',
    
    // Notifications
    featureNotImplemented: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('creperie-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('creperie-language', lang);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};