import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { supabase, hasSupabase } from '@/lib/supabaseClient';

const AdminNews = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: '', date: new Date().toISOString().slice(0,10), lang: 'fr' });

  const load = async () => {
    if (hasSupabase) {
      const { data, error } = await supabase.from('actualite').select('*').order('date', { ascending: false });
      if (!error && data) setPosts(data);
    } else {
      setPosts([]);
    }
  };

  useEffect(() => { load(); }, []);

  const addPost = async (e) => {
    e.preventDefault();
    if (!newPost.title) return;
    if (hasSupabase) {
      const { data, error } = await supabase.from('actualite').insert(newPost).select().single();
      if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      setPosts(prev => [data, ...prev]);
    } else {
      setPosts(prev => [{ id: Date.now(), ...newPost }, ...prev]);
    }
    setNewPost({ title: '', content: '', image: '', date: new Date().toISOString().slice(0,10), lang: 'fr' });
    toast({ title: 'Article ajouté' });
  };

  const updatePostField = async (id, field, value) => {
    if (hasSupabase) {
      const patch = { [field]: value };
      const { error } = await supabase.from('actualite').update(patch).eq('id', id);
      if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    }
    setPosts(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const deletePost = async (id) => {
    if (hasSupabase) {
      const { error } = await supabase.from('actualite').delete().eq('id', id);
      if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    }
    setPosts(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Article supprimé', variant: 'destructive' });
  };

  return (
    <>
      <Helmet>
        <title>Gestion des Actualités - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion des Actualités</h1>

        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Nouvel article</h2>
          <form onSubmit={addPost} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
            <input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} placeholder="Titre" className="border rounded-md px-3 py-2 md:col-span-2" />
            <input value={newPost.image} onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} placeholder="Image (URL)" className="border rounded-md px-3 py-2" />
            <input type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} className="border rounded-md px-3 py-2" />
            <select value={newPost.lang} onChange={(e) => setNewPost({ ...newPost, lang: e.target.value })} className="border rounded-md px-3 py-2">
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
            <textarea value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} placeholder="Contenu" className="border rounded-md px-3 py-2 md:col-span-5" rows={4} />
            <div className="md:col-span-5">
              <Button type="submit">Publier</Button>
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Titre</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Lang</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(p => (
                  <tr key={p.id} className="border-b">
                    <td className="px-4 py-2">
                      <input defaultValue={p.title} className="border rounded-md px-2 py-1 w-full" onBlur={(e) => updatePostField(p.id, 'title', e.target.value)} />
                    </td>
                    <td className="px-4 py-2 w-40">
                      <input type="date" defaultValue={p.date?.slice(0,10)} className="border rounded-md px-2 py-1 w-full" onBlur={(e) => updatePostField(p.id, 'date', e.target.value)} />
                    </td>
                    <td className="px-4 py-2 w-24">
                      <select defaultValue={p.lang || 'fr'} className="border rounded-md px-2 py-1" onChange={(e) => updatePostField(p.id, 'lang', e.target.value)}>
                        <option value="fr">FR</option>
                        <option value="en">EN</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button variant="outline" className="mr-2" onClick={() => toast({ title: 'Contenu', description: p.content?.slice(0, 200) || '—' })}>Voir</Button>
                      <Button variant="ghost" className="text-red-600" onClick={() => deletePost(p.id)}>Supprimer</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!posts.length && <p className="text-center py-8 text-gray-500">Aucun article pour le moment.</p>}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminNews;
