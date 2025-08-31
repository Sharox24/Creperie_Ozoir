import { supabase, hasSupabase } from '@/lib/supabaseClient';
import { getVisitorSignature } from '@/lib/deviceSignature';

const CONSENT_KEY = 'creperie-cookie-consent';
const ANON_ID_KEY = 'creperie-anon-id';
const IP_CACHE_KEY = 'creperie-ip-cache';
const GEO_CACHE_PREFIX = 'creperie-geo:'; // + ip

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY) === 'accepted'; } catch { return false; }
}

function getAnonId() {
  try {
    let id = localStorage.getItem(ANON_ID_KEY);
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
      localStorage.setItem(ANON_ID_KEY, id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

export async function track(event, payload = {}) {
  if (!getConsent()) return;
  const anon = getAnonId();
  const page = typeof window !== 'undefined' ? window.location.pathname : '';
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const ts = new Date().toISOString();

  const ip = await getIPSafe();
  const fp = await getVisitorSignature(ip);

  const { country, region } = await getGeoForIP(ip);
  const record = { event, page, anon_id: anon, user_agent: ua, ip, fp, country, region, metadata: payload || {}, ts };

  if (hasSupabase) {
    try { await supabase.from('analytics_event').insert(record); } catch {}
  } else {
    try {
      const arr = JSON.parse(localStorage.getItem('creperie-analytics') || '[]');
      arr.push(record);
      if (arr.length > 1000) arr.shift();
      localStorage.setItem('creperie-analytics', JSON.stringify(arr));
    } catch {}
  }
}

export function trackPageView() {
  return track('page_view');
}

async function getIPSafe() {
  try {
    // cached value with TTL (2h)
    const now = Date.now();
    const cached = JSON.parse(localStorage.getItem(IP_CACHE_KEY) || 'null');
    if (cached && cached.v && (now - cached.t) < 2 * 60 * 60 * 1000) return cached.v;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);
    // Use a public IP echo service (gracefully fail if blocked)
    const res = await fetch('https://api64.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('ipify');
    const data = await res.json();
    const ip = data?.ip || '';
    localStorage.setItem(IP_CACHE_KEY, JSON.stringify({ v: ip, t: now }));
    return ip;
  } catch {
    return '';
  }
}

async function getGeoForIP(ip) {
  try {
    if (!ip) return { country: '', region: '' };
    const key = GEO_CACHE_PREFIX + ip;
    const now = Date.now();
    const cached = JSON.parse(localStorage.getItem(key) || 'null');
    if (cached && cached.v && (now - cached.t) < 7 * 24 * 60 * 60 * 1000) return cached.v;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    // Primary: ipwho.is
    let geo = { country: '', region: '' };
    try {
      const r1 = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, { signal: controller.signal });
      clearTimeout(timeout);
      if (r1.ok) {
        const d = await r1.json();
        if (d && d.success !== false) geo = { country: d.country || '', region: d.region || d.region_name || '' };
      }
    } catch {}
    // Fallback: ipapi.co
    if (!geo.country) {
      try {
        const r2 = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`);
        if (r2.ok) {
          const d2 = await r2.json();
          if (!d2.error) geo = { country: d2.country_name || '', region: d2.region || '' };
        }
      } catch {}
    }
    try { localStorage.setItem(key, JSON.stringify({ v: geo, t: now })); } catch {}
    return geo;
  } catch {
    return { country: '', region: '' };
  }
}
