import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '#shared/components/ui/button';
import { useToast } from '#shared/components/ui/use-toast';
import { supabase, hasSupabase } from '#shared/lib/supabaseClient';

const formatDate = (s) => {
  try {
    const d = new Date(s);
    return d.toLocaleString('fr-FR');
  } catch { return String(s || ''); }
};

function downloadCSV(filename, rows) {
  const header = ['ts','event','page','ip','anon_id','fp','user_agent','metadata'];
  const csv = [header.join(',')].concat(rows.map(r => (
    [r.ts, r.event, r.page || '', r.ip || '', r.anon_id || '', r.fp || '', (r.user_agent || '').replaceAll(',', ';'), JSON.stringify(r.metadata || {})].map(v => `"${String(v).replaceAll('"','""')}"`).join(',')
  ))).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const AdminLogs = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [type, setType] = useState('all'); // all | page_view | other
  const [limit, setLimit] = useState(500);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (hasSupabase) {
          let query = supabase.from('analytics_event').select('*').order('ts', { ascending: false }).limit(limit);
          const { data, error } = await query;
          if (error) throw error;
          setEvents(data || []);
        } else {
          const local = JSON.parse(localStorage.getItem('creperie-analytics') || '[]');
          setEvents(local.sort((a,b) => new Date(b.ts) - new Date(a.ts)).slice(0, limit));
        }
      } catch (err) {
        toast({ title: 'Erreur', description: err.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [limit]);

  const filtered = useMemo(() => {
    return (events || []).filter(ev => {
      if (type === 'page_view' && ev.event !== 'page_view') return false;
      if (type === 'other' && ev.event === 'page_view') return false;
      if (dateFrom && new Date(ev.ts) < new Date(dateFrom)) return false;
      if (dateTo && new Date(ev.ts) > new Date(dateTo + 'T23:59:59')) return false;
      if (!q) return true;
      const hay = `${ev.event} ${ev.page || ''} ${ev.ip || ''} ${ev.anon_id || ''} ${ev.fp || ''} ${ev.user_agent || ''} ${JSON.stringify(ev.metadata || {})}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [events, q, type, dateFrom, dateTo]);

  const pageViews = filtered.filter(e => e.event === 'page_view');
  const others = filtered.filter(e => e.event !== 'page_view');

  const [countMode, setCountMode] = useState('unique'); // 'unique' | 'events'

  const { countryStats, regionStatsFR, totalVisitors } = useMemo(() => {
    // Build visitor map (unique) and aggregates
    const byVisitor = new Map();
    const uniqKey = (ev) => {
      const fp = ev.fp || '';
      const ua = ev.user_agent || '';
      const anon = ev.anon_id || '';
      const ip = ev.ip || '';
      return fp || (anon ? `${anon}|${ua}` : (ip ? `${ip}|${ua}` : ua));
    };
    const countryAgg = new Map();
    const regionAggFR = new Map();

    if (countMode === 'unique') {
      for (const ev of filtered) {
        const key = uniqKey(ev);
        if (!byVisitor.has(key)) byVisitor.set(key, ev);
      }
      byVisitor.forEach((ev) => {
        const country = ev.country || 'Inconnu';
        countryAgg.set(country, (countryAgg.get(country) || 0) + 1);
        if (country === 'France') {
          const region = ev.region || 'Inconnue';
          regionAggFR.set(region, (regionAggFR.get(region) || 0) + 1);
        }
      });
    } else {
      // Count events
      for (const ev of filtered) {
        const country = ev.country || 'Inconnu';
        countryAgg.set(country, (countryAgg.get(country) || 0) + 1);
        if (country === 'France') {
          const region = ev.region || 'Inconnue';
          regionAggFR.set(region, (regionAggFR.get(region) || 0) + 1);
        }
      }
    }

    // Convert to arrays, sort desc
    const toArr = (m) => Array.from(m.entries()).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count);
    return {
      countryStats: toArr(countryAgg),
      regionStatsFR: toArr(regionAggFR),
      totalVisitors: countMode === 'unique' ? byVisitor.size : filtered.length,
    };
  }, [filtered, countMode]);

  return (
    <>
      <Helmet>
        <title>Logs - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-playfair font-bold text-anthracite">Logs</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => downloadCSV('analytics.csv', filtered)}>Exporter CSV</Button>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[220px]">
            <label className="block text-sm text-gray-600 mb-1">Recherche</label>
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="event, page, ip, id…" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Type</label>
            <select value={type} onChange={(e)=>setType(e.target.value)} className="border rounded-md px-3 py-2">
              <option value="all">Tous</option>
              <option value="page_view">Pages vues</option>
              <option value="other">Autres événements</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Depuis</label>
            <input type="date" value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)} className="border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Jusqu'au</label>
            <input type="date" value={dateTo} onChange={(e)=>setDateTo(e.target.value)} className="border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Limite</label>
            <select value={limit} onChange={(e)=>setLimit(Number(e.target.value))} className="border rounded-md px-3 py-2">
              {[100,200,500,1000,2000].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Comptage</label>
            <select value={countMode} onChange={(e)=>setCountMode(e.target.value)} className="border rounded-md px-3 py-2">
              <option value="unique">Visiteurs uniques</option>
              <option value="events">Événements</option>
            </select>
          </div>
        </div>

        {/* Répartition par pays */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-anthracite">Répartition par pays</h2>
            <span className="text-sm text-gray-500">Total {countMode === 'unique' ? 'visiteurs' : 'événements'}: {totalVisitors}</span>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Pays</th>
                  <th className="px-4 py-2 w-32 text-right">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {countryStats.map(row => (
                  <tr key={row.name} className="border-b">
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2 text-right font-semibold">{row.count}</td>
                  </tr>
                ))}
                {countryStats.length === 0 && (
                  <tr><td className="px-4 py-3 text-gray-500" colSpan={2}>Aucune donnée.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Répartition par régions (France) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-anthracite">Régions de France</h2>
            <span className="text-sm text-gray-500">France uniquement</span>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Région</th>
                  <th className="px-4 py-2 w-32 text-right">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {regionStatsFR.map(row => (
                  <tr key={row.name} className="border-b">
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2 text-right font-semibold">{row.count}</td>
                  </tr>
                ))}
                {regionStatsFR.length === 0 && (
                  <tr><td className="px-4 py-3 text-gray-500" colSpan={2}>Aucune donnée.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section Pages vues */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-anthracite">Pages vues</h2>
            <span className="text-sm text-gray-500">{pageViews.length} événements</span>
          </div>
          <div className="bg-white rounded-xl shadow divide-y">
            {loading && <div className="p-4 text-gray-500">Chargement…</div>}
            {!loading && pageViews.length === 0 && <div className="p-4 text-gray-500">Aucun événement.</div>}
            {pageViews.map((ev) => (
              <LogRow key={ev.id || ev.ts+ev.anon_id} ev={ev} />
            ))}
          </div>
        </section>

        {/* Section Autres événements */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-anthracite">Autres événements</h2>
            <span className="text-sm text-gray-500">{others.length} événements</span>
          </div>
          <div className="bg-white rounded-xl shadow divide-y">
            {!loading && others.length === 0 && <div className="p-4 text-gray-500">Aucun événement.</div>}
            {others.map((ev) => (
              <LogRow key={(ev.id || ev.ts+ev.anon_id)+'-o'} ev={ev} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

function Pill({ children, color = 'bg-gray-100 text-gray-700' }) {
  return <span className={`px-2 py-0.5 rounded-full text-xs ${color}`}>{children}</span>;
}

function LogRow({ ev }) {
  const meta = ev.metadata || {};
  const short = (s, n=12) => (s ? String(s).slice(0,n) + (String(s).length>n?'…':'') : '');
  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Pill color={ev.event === 'page_view' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}>{ev.event}</Pill>
        {ev.page && <Pill>{ev.page}</Pill>}
        {ev.ip && <Pill color="bg-purple-100 text-purple-800">IP {ev.ip}</Pill>}
        {ev.fp && <Pill color="bg-rose-100 text-rose-800">FP {short(ev.fp, 10)}</Pill>}
        {ev.anon_id && <Pill color="bg-green-100 text-green-800">Anon {short(ev.anon_id, 8)}</Pill>}
        <span className="ml-auto text-sm text-gray-500">{formatDate(ev.ts)}</span>
      </div>
      {ev.user_agent && (
        <div className="text-xs text-gray-500 mb-2 break-words">UA: {ev.user_agent}</div>
      )}
      {meta && Object.keys(meta).length > 0 && (
        <pre className="bg-gray-50 rounded-md p-2 text-xs text-gray-700 overflow-auto">{JSON.stringify(meta, null, 2)}</pre>
      )}
    </div>
  );
}

export default AdminLogs;
