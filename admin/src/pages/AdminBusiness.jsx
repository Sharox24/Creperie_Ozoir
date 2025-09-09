import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '#shared/components/ui/button';
import { useToast } from '#shared/components/ui/use-toast';
import { supabase, hasSupabase } from '#shared/lib/supabaseClient';

function parseJSON(text) {
  try { return JSON.parse(text); } catch { return null; }
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const cells = [];
    let cur = '', inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { cells.push(cur); cur=''; continue; }
      cur += ch;
    }
    cells.push(cur);
    const obj = {};
    headers.forEach((h, idx) => obj[h] = (cells[idx] || '').trim());
    return obj;
  });
}

export default function AdminBusiness() {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  async function importHours(file) {
    const text = await file.text();
    const json = parseJSON(text);
    let mapped = [];
    if (json) {
      // Accept either { weekday_text: ["Monday: 09:00–18:00", ...] } or
      // Google Business regularHours { periods: [{openDay, openTime, closeDay, closeTime}, ...] }
      const weekdayText = json.weekday_text || json?.opening_hours?.weekday_text;
      if (Array.isArray(weekdayText)) {
        mapped = weekdayText.map((line, idx) => ({
          weekday: idx, // Monday=0..Sunday=6
          ranges: String(line.split(':').slice(1).join(':')).trim() || 'Closed',
        }));
      } else if (Array.isArray(json?.regularHours?.periods)) {
        // Build per-day text
        const byDay = new Map();
        json.regularHours.periods.forEach(p => {
          const d = Number(p.openDay ?? p.open?.day ?? 0);
          const open = (p.openTime ?? p.open?.hour + ':' + (p.open?.minute||'00')).replace(/^(\d{1})(\d{2})$/, '$1:$2');
          const close = (p.closeTime ?? p.close?.hour + ':' + (p.close?.minute||'00')).replace(/^(\d{1})(\d{2})$/, '$1:$2');
          const cur = byDay.get(d) || [];
          cur.push(`${open}-${close}`);
          byDay.set(d, cur);
        });
        mapped = Array.from({ length: 7 }, (_, d) => ({
          weekday: d,
          ranges: (byDay.get(d) || []).join(' / ') || 'Closed',
        }));
      }
    }
    if (!mapped.length) {
      toast({ title: 'Format non reconnu', variant: 'destructive' });
      return;
    }
    setBusy(true);
    try {
      if (hasSupabase) {
        await supabase.from('opening_hours').delete().neq('weekday', -1);
        const { error } = await supabase.from('opening_hours').insert(mapped);
        if (error) throw error;
      } else {
        localStorage.setItem('creperie-opening-hours', JSON.stringify(mapped));
      }
      toast({ title: 'Horaires importés' });
    } catch (e) {
      toast({ title: 'Erreur', description: e.message, variant: 'destructive' });
    } finally { setBusy(false); }
  }

  async function importReviews(file) {
    const text = await file.text();
    const json = parseJSON(text);
    let rows = [];
    if (Array.isArray(json)) {
      // Expect array of {author_name|author, rating, text|message, time|date}
      rows = json.map(r => ({
        author: r.author_name || r.author || 'Anonyme',
        rating: Number(r.rating) || 5,
        message: r.text || r.message || '',
        date: r.time ? new Date(r.time * 1000).toISOString().slice(0,10) : (r.date || new Date().toISOString().slice(0,10)),
        published: true,
      }));
    } else {
      // Try CSV
      const arr = parseCSV(text);
      rows = arr.map(r => ({
        author: r.author || r.author_name || 'Anonyme',
        rating: Number(r.rating) || 5,
        message: r.message || r.text || '',
        date: r.date || new Date().toISOString().slice(0,10),
        published: true,
      }));
    }
    if (!rows.length) {
      toast({ title: 'Format non reconnu', variant: 'destructive' });
      return;
    }
    setBusy(true);
    try {
      if (hasSupabase) {
        for (const row of rows) {
          await supabase.from('avis').insert(row).catch(() => {});
        }
      } else {
        const cur = JSON.parse(localStorage.getItem('creperie-reviews') || '[]');
        const merged = [...cur, ...rows];
        localStorage.setItem('creperie-reviews', JSON.stringify(merged));
      }
      toast({ title: `Avis importés (${rows.length})` });
    } catch (e) {
      toast({ title: 'Erreur', description: e.message, variant: 'destructive' });
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Établissement - Import Google</title>
      </Helmet>
      <h1 className="text-3xl font-playfair font-bold text-anthracite">Établissement (Import manuel)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Importer les horaires</h2>
          <p className="text-sm text-gray-600 mb-4">
            Depuis Google : exportez les données Business Profile (Takeout) ou copiez le JSON d’horaires
            (weekday_text, regularHours). Déposez un fichier JSON ici.
          </p>
          <input type="file" accept=".json" onChange={(e)=> e.target.files?.[0] && importHours(e.target.files[0])} disabled={busy} />
        </section>

        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Importer les avis</h2>
          <p className="text-sm text-gray-600 mb-4">
            Déposez un JSON (array d’avis) ou CSV avec colonnes: author,rating,message,date.
          </p>
          <input type="file" accept=".json,.csv" onChange={(e)=> e.target.files?.[0] && importReviews(e.target.files[0])} disabled={busy} />
        </section>
      </div>

      <div className="text-sm text-gray-500">
        <p>Astuce: ce système n’appelle aucune API. Les données sont stockées dans Supabase (si configuré) ou dans votre navigateur (mode démo).</p>
      </div>
    </div>
  );
}

