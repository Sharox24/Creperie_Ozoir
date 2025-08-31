import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, X, Clock, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { supabase, hasSupabase } from '@/lib/supabaseClient';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);
  const [newRes, setNewRes] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '', status: 'confirmee' });

  useEffect(() => {
    const load = async () => {
      if (hasSupabase) {
        const { data, error } = await supabase
          .from('reservation')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setReservations(data);
      } else {
        const saved = JSON.parse(localStorage.getItem('creperie-reservations') || '[]')
          .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReservations(saved);
      }
    };
    load();
  }, []);

  const timeSlots = ['12:00','12:30','13:00','13:30','14:00','19:00','19:30','20:00','20:30','21:00','21:30'];

  const createReservation = async (e) => {
    e.preventDefault();
    if (!newRes.name || !newRes.email || !newRes.phone || !newRes.date || !newRes.time || !newRes.guests) {
      toast({ title: 'Champs manquants', description: 'Merci de remplir tous les champs obligatoires.', variant: 'destructive' });
      return;
    }
    try {
      setCreating(true);
      const payload = {
        name: newRes.name,
        email: newRes.email,
        phone: newRes.phone,
        date: newRes.date, // yyyy-MM-dd
        time: newRes.time,
        guests: Number(newRes.guests),
        notes: newRes.notes || '',
        status: newRes.status || 'confirmee',
      };

      if (hasSupabase) {
        // Optionnel: vérifier capacité
        const { data: settings } = await supabase.from('reservation_settings').select('*').limit(1).maybeSingle();
        if (settings) {
          const { data: existing } = await supabase.from('reservation').select('id, guests').eq('date', payload.date).eq('time', payload.time);
          const used = (existing || []).reduce((sum, r) => sum + (r.guests || 0), 0);
          if (used + payload.guests > (settings.max_per_slot || 30)) {
            toast({ title: 'Créneau complet', description: 'Choisissez un autre horaire ou réduisez le nombre de couverts.', variant: 'destructive' });
            return;
          }
        }
        const { data, error } = await supabase.from('reservation').insert(payload).select().single();
        if (error) throw error;
        setReservations(prev => [data, ...prev]);
      } else {
        const local = JSON.parse(localStorage.getItem('creperie-reservations') || '[]');
        const withId = { id: Date.now(), ...payload, createdAt: new Date().toISOString() };
        local.unshift(withId);
        localStorage.setItem('creperie-reservations', JSON.stringify(local));
        setReservations(local);
      }
      setNewRes({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '', status: 'confirmee' });
      toast({ title: 'Réservation ajoutée' });
    } catch (err) {
      toast({ title: 'Erreur', description: err.message, variant: 'destructive' });
    } finally {
      setCreating(false);
    }
  };

  const updateReservationStatus = async (id, statusLabel) => {
    // Normalize to DB values
    const map = { 'confirmée': 'confirmee', 'annulée': 'annulee', 'en_attente': 'en_attente' };
    const status = map[statusLabel] || statusLabel;
    if (hasSupabase) {
      const { error } = await supabase.from('reservation').update({ status }).eq('id', id);
      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
        return;
      }
      setReservations(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
    } else {
      const updatedReservations = reservations.map(res => res.id === id ? { ...res, status } : res);
      setReservations(updatedReservations);
      localStorage.setItem('creperie-reservations', JSON.stringify(updatedReservations));
    }
    toast({ title: 'Statut mis à jour' });
  };

  const deleteReservation = async (id) => {
    if (hasSupabase) {
      const { error } = await supabase.from('reservation').delete().eq('id', id);
      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
        return;
      }
      setReservations(prev => prev.filter(r => r.id !== id));
    } else {
      const updated = reservations.filter(res => res.id !== id);
      setReservations(updated);
      localStorage.setItem('creperie-reservations', JSON.stringify(updated));
    }
    toast({ title: 'Réservation supprimée', variant: 'destructive' });
  };

  const getStatusBadge = (status) => {
    const val = status;
    if (val === 'confirmee' || val === 'confirmée')
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Confirmée</span>;
    if (val === 'annulee' || val === 'annulée')
      return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Annulée</span>;
    return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">En attente</span>;
  };

  const updateAdminNote = async (id, admin_note) => {
    if (hasSupabase) {
      const { error } = await supabase.from('reservation').update({ admin_note }).eq('id', id);
      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
        return;
      }
      setReservations(prev => prev.map(r => (r.id === id ? { ...r, admin_note } : r)));
    } else {
      const updated = reservations.map(r => (r.id === id ? { ...r, admin_note } : r));
      setReservations(updated);
      localStorage.setItem('creperie-reservations', JSON.stringify(updated));
    }
    toast({ title: 'Note enregistrée' });
  };

  return (
    <>
      <Helmet>
        <title>Gestion des Réservations - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion des Réservations</h1>
        
        {/* Nouvelle réservation */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-anthracite mb-4">Nouvelle réservation</h2>
          <form onSubmit={createReservation} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input value={newRes.name} onChange={(e)=>setNewRes({...newRes, name:e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Client" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={newRes.email} onChange={(e)=>setNewRes({...newRes, email:e.target.value})} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
              <input value={newRes.phone} onChange={(e)=>setNewRes({...newRes, phone:e.target.value})} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" value={newRes.date} onChange={(e)=>setNewRes({...newRes, date:e.target.value})} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure *</label>
              <select value={newRes.time} onChange={(e)=>setNewRes({...newRes, time:e.target.value})} className="w-full border rounded-md px-3 py-2" required>
                <option value="">—</option>
                {timeSlots.map(h => (<option key={h} value={h}>{h}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Couverts *</label>
              <select value={newRes.guests} onChange={(e)=>setNewRes({...newRes, guests:e.target.value})} className="w-full border rounded-md px-3 py-2">
                {Array.from({length:12},(_,i)=>i+1).map(n => (<option key={n} value={n}>{n}</option>))}
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input value={newRes.notes} onChange={(e)=>setNewRes({...newRes, notes:e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Allergies, poussette, occasion…" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select value={newRes.status} onChange={(e)=>setNewRes({...newRes, status:e.target.value})} className="w-full border rounded-md px-3 py-2">
                <option value="confirmee">Confirmée</option>
                <option value="en_attente">En attente</option>
                <option value="annulee">Annulée</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={creating} className="w-full bg-crepe-yellow text-anthracite font-semibold">
                {creating ? 'Ajout…' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Client</th>
                  <th scope="col" className="px-6 py-3">Date & Heure</th>
                  <th scope="col" className="px-6 py-3">Couverts</th>
                  <th scope="col" className="px-6 py-3">Statut</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <motion.tr 
                    key={res.id} 
                    className="bg-white border-b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {res.name}<br/>
                      <span className="text-xs text-gray-500">{res.email}</span>
                    </td>
                    <td className="px-6 py-4">{format(new Date(res.date), "PPP", { locale: fr })} à {res.time}</td>
                    <td className="px-6 py-4">{res.guests}</td>
                    <td className="px-6 py-4">{getStatusBadge(res.status)}</td>
                    <td className="px-6 py-4 w-[320px]">
                      <textarea
                        className="w-full border rounded-md px-2 py-1 text-sm"
                        placeholder="Note interne (ex: allergie, VIP, préférences)"
                        defaultValue={res.admin_note || ''}
                        onBlur={(e) => updateAdminNote(res.id, e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost" className="text-green-500 hover:text-green-700" onClick={() => updateReservationStatus(res.id, 'confirmée')}>
                          <Check size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => updateReservationStatus(res.id, 'annulée')}>
                          <X size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-yellow-500 hover:text-yellow-700" onClick={() => updateReservationStatus(res.id, 'en_attente')}>
                          <Clock size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={() => toast({ title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochain message ! 🚀" })}>
                          <Edit size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => deleteReservation(res.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {reservations.length === 0 && (
              <p className="text-center py-8 text-gray-500">Aucune réservation pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReservations;
