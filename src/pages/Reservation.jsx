import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, MessageSquare, Check, User, Mail, Phone, PartyPopper } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';

const ReservationConfirmation = ({ reservation, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-8 shadow-2xl text-center"
    >
      <PartyPopper className="w-16 h-16 text-crepe-yellow mx-auto mb-6" />
      <h2 className="text-3xl font-playfair font-bold text-anthracite mb-4">
        Votre demande a bien été reçue !
      </h2>
      <p className="text-gray-600 mb-8">
        Nous avons bien enregistré votre demande de réservation. Vous recevrez une confirmation par email dès que nous l'aurons validée.
      </p>
      <div className="text-left bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
        <h3 className="text-xl font-semibold text-anthracite border-b pb-2 mb-4">Récapitulatif de votre réservation</h3>
        <p><User className="inline mr-2 h-4 w-4" /><strong>Nom :</strong> {reservation.name}</p>
        <p><CalendarIcon className="inline mr-2 h-4 w-4" /><strong>Date :</strong> {format(new Date(reservation.date), "PPP", { locale: fr })}</p>
        <p><Clock className="inline mr-2 h-4 w-4" /><strong>Heure :</strong> {reservation.time}</p>
        <p><Users className="inline mr-2 h-4 w-4" /><strong>Couverts :</strong> {reservation.guests}</p>
        {reservation.specialRequests && <p><MessageSquare className="inline mr-2 h-4 w-4" /><strong>Demandes :</strong> {reservation.specialRequests}</p>}
      </div>
      <Button 
        onClick={onBack}
        className="mt-8 bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-8 py-3 text-lg"
      >
        Faire une autre réservation
      </Button>
    </motion.div>
  );
};


const Reservation = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) {
      toast({
        title: "Date manquante",
        description: "Veuillez sélectionner une date pour votre réservation.",
        variant: "destructive",
      });
      return;
    }

    const reservations = JSON.parse(localStorage.getItem('creperie-reservations') || '[]');
    const newReservation = {
      id: Date.now(),
      ...formData,
      date: date.toISOString(),
      status: 'en_attente',
      createdAt: new Date().toISOString()
    };
    reservations.push(newReservation);
    localStorage.setItem('creperie-reservations', JSON.stringify(reservations));

    setReservationConfirmed(newReservation);

    toast({
      title: "Demande de réservation envoyée !",
      description: "Nous vous confirmerons votre réservation par email dans les plus brefs délais.",
      duration: 5000,
    });
  };

  const handleBackToForm = () => {
    setReservationConfirmed(null);
    setFormData({
      name: '', email: '', phone: '', time: '', guests: '2', specialRequests: ''
    });
    setDate(null);
  };

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const guestOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      <Helmet>
        <title>Réservation - Crêperie Ozoir | Réserver une Table en Ligne</title>
        <meta name="description" content="Réservez votre table à la Crêperie Ozoir en ligne. Choisissez votre date, heure et nombre de personnes pour une expérience culinaire authentique." />
      </Helmet>

      <div className="min-h-screen bg-gradient-warm">
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-pacifico text-anthracite mb-6">
                Réservation
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Réservez votre table en quelques clics et savourez nos spécialités bretonnes 
                dans une ambiance chaleureuse
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {reservationConfirmed ? (
              <ReservationConfirmation reservation={reservationConfirmed} onBack={handleBackToForm} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-2xl"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-playfair font-bold text-anthracite mb-4">
                    {t('reservationForm')}
                  </h2>
                  <p className="text-gray-600">
                    Remplissez le formulaire ci-dessous pour réserver votre table
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-anthracite mb-2"><User className="inline mr-2 h-4 w-4" />Nom complet *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors" placeholder="Votre nom complet" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-anthracite mb-2"><Mail className="inline mr-2 h-4 w-4" />Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors" placeholder="votre@email.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-anthracite mb-2"><Phone className="inline mr-2 h-4 w-4" />Téléphone *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors" placeholder="01 23 45 67 89" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-anthracite mb-2"><CalendarIcon className="inline mr-2" size={16} />{t('date')} *</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal h-auto py-3 px-4", !date && "text-muted-foreground")}>
                            {date ? format(date, "PPP", { locale: fr }) : <span>Choisissez une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus fromDate={new Date()} locale={fr} />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-anthracite mb-2"><Clock className="inline mr-2" size={16} />{t('time')} *</label>
                      <select id="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors h-auto">
                        <option value="">Choisir l'heure</option>
                        {timeSlots.map(time => (<option key={time} value={time}>{time}</option>))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-anthracite mb-2"><Users className="inline mr-2" size={16} />{t('guests')} *</label>
                      <select id="guests" name="guests" value={formData.guests} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors h-auto">
                        {guestOptions.map(num => (<option key={num} value={num}>{num} personne{num > 1 ? 's' : ''}</option>))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-anthracite mb-2"><MessageSquare className="inline mr-2" size={16} />{t('specialRequests')}</label>
                    <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crepe-yellow focus:border-transparent transition-colors resize-none" placeholder="Allergies, régimes spéciaux, occasion spéciale..."/>
                  </div>

                  <div className="text-center">
                    <Button type="submit" className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite font-semibold px-12 py-4 text-lg shadow-crepe hover-lift">
                      <Check className="mr-2" size={20} />Confirmer la réservation
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Reservation;