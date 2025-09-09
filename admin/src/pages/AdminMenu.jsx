import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '#shared/components/ui/use-toast';
import { Button } from '#shared/components/ui/button';
import { supabase, hasSupabase } from '#shared/lib/supabaseClient';

const AdminMenu = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [newCat, setNewCat] = useState({ name: '', slug: '' });
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', categorie_id: '', lang: 'fr' });

  const load = async () => {
    if (hasSupabase) {
      const [{ data: cats }, { data: its }] = await Promise.all([
        supabase.from('categorie').select('*').order('name'),
        supabase.from('menu').select('*').order('created_at', { ascending: false }),
      ]);
      setCategories(cats || []);
      setItems(its || []);
    } else {
      setCategories([
        { id: 'crepes', name: 'Crêpes Sucrées', slug: 'crepes' },
        { id: 'galettes', name: 'Galettes Salées', slug: 'galettes' },
      ]);
      setItems([]);
    }
  };

  useEffect(() => { load(); }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name || !newCat.slug) return;
    if (hasSupabase) {
      const { data, error } = await supabase.from('categorie').insert(newCat).select().single();
      if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      setCategories(prev => [...prev, data]);
    } else {
      setCategories(prev => [...prev, { ...newCat, id: Date.now().toString() }]);
    }
    setNewCat({ name: '', slug: '' });
    toast({ title: 'Catégorie ajoutée' });
  };

  const deleteCategory = async (id) => {
    if (hasSupabase) {
      const { error } = await supabase.from('categorie').delete().eq('id', id);
      if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    }
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addItem = async (e) => {
    e.preventDefault();
    const toInsert = { ...newItem, price: Number(newItem.price) };
    if (!toInsert.name || !toInsert.categorie_id || !toInsert.price) return;
    if (hasSupabase) {
      const { data, error } = await supabase.from('menu').insert(toInsert).select().single();
      if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      setItems(prev => [data, ...prev]);
    } else {
      setItems(prev => [{ id: Date.now(), ...toInsert }, ...prev]);
    }
    setNewItem({ name: '', description: '', price: '', categorie_id: '', lang: 'fr' });
    toast({ title: 'Plat ajouté' });
  };

  const deleteItem = async (id) => {
    if (hasSupabase) {
      const { error } = await supabase.from('menu').delete().eq('id', id);
      if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    }
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const onItemFieldBlur = async (id, field, value) => {
    if (hasSupabase) {
      const patch = { [field]: field === 'price' ? Number(value) : value };
      const { error } = await supabase.from('menu').update(patch).eq('id', id);
      if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    }
    setItems(prev => prev.map(i => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <>
      <Helmet>
        <title>Gestion du Menu - Admin</title>
      </Helmet>
      <div className="space-y-10">
        <h1 className="text-4xl font-playfair font-bold text-anthracite">Gestion du Menu</h1>

        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Catégories</h2>
          <form onSubmit={addCategory} className="flex flex-wrap gap-3 mb-6">
            <input value={newCat.name} onChange={(e) => setNewCat({ ...newCat, name: e.target.value })} placeholder="Nom" className="border rounded-md px-3 py-2" />
            <input value={newCat.slug} onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })} placeholder="Slug" className="border rounded-md px-3 py-2" />
            <Button type="submit">Ajouter</Button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(c => (
              <div key={c.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.slug}</div>
                </div>
                <Button variant="ghost" className="text-red-600" onClick={() => deleteCategory(c.id)}>Supprimer</Button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Plats</h2>
          <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
            <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Nom" className="border rounded-md px-3 py-2" />
            <input value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Description" className="border rounded-md px-3 py-2" />
            <input value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} placeholder="Prix" className="border rounded-md px-3 py-2" />
            <select value={newItem.categorie_id} onChange={(e) => setNewItem({ ...newItem, categorie_id: e.target.value })} className="border rounded-md px-3 py-2">
              <option value="">Catégorie</option>
              {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
            <select value={newItem.lang} onChange={(e) => setNewItem({ ...newItem, lang: e.target.value })} className="border rounded-md px-3 py-2">
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
            <div className="md:col-span-5">
              <Button type="submit">Ajouter le plat</Button>
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Nom</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Prix</th>
                  <th className="px-4 py-2">Catégorie</th>
                  <th className="px-4 py-2">Lang</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id} className="border-b">
                    <td className="px-4 py-2">
                      <input defaultValue={i.name} className="border rounded-md px-2 py-1 w-full" onBlur={(e) => onItemFieldBlur(i.id, 'name', e.target.value)} />
                    </td>
                    <td className="px-4 py-2">
                      <input defaultValue={i.description || ''} className="border rounded-md px-2 py-1 w-full" onBlur={(e) => onItemFieldBlur(i.id, 'description', e.target.value)} />
                    </td>
                    <td className="px-4 py-2 w-32">
                      <input type="number" step="0.01" defaultValue={i.price} className="border rounded-md px-2 py-1 w-full" onBlur={(e) => onItemFieldBlur(i.id, 'price', e.target.value)} />
                    </td>
                    <td className="px-4 py-2">
                      <select defaultValue={i.categorie_id || ''} className="border rounded-md px-2 py-1" onChange={(e) => onItemFieldBlur(i.id, 'categorie_id', e.target.value)}>
                        <option value="">—</option>
                        {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <select defaultValue={i.lang || 'fr'} className="border rounded-md px-2 py-1" onChange={(e) => onItemFieldBlur(i.id, 'lang', e.target.value)}>
                        <option value="fr">FR</option>
                        <option value="en">EN</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button variant="ghost" className="text-red-600" onClick={() => deleteItem(i.id)}>Supprimer</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!items.length && <p className="text-center py-8 text-gray-500">Aucun plat pour le moment.</p>}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminMenu;
