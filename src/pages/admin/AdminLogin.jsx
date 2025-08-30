import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase, hasSupabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!hasSupabase) {
        setError('Supabase non configuré. Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.');
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      window.location.href = '/admin';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Connexion Admin - Crêperie Ozoir</title>
      </Helmet>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-anthracite text-center">Administration</h1>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Mot de passe</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full border rounded-lg px-3 py-2" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button disabled={loading} className="w-full bg-anthracite hover:bg-gray-700 text-white">
          {loading ? 'Connexion…' : 'Se connecter'}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;

