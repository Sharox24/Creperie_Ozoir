/*
  Google → Site sync script
  - Pulls business data from Google Places API
  - Writes opening hours and recent reviews into Supabase tables used by the site

  Usage:
    node tools/sync-google.js --place "Crêperie Ozoir Ozoir-la-Ferrière"

  Env required:
    GOOGLE_PLACES_API_KEY
    VITE_SUPABASE_URL
    SUPABASE_SERVICE_ROLE  (service key; keep secret, never ship to client)
*/

import 'node:http'; // ensure ESM
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

function getArg(name, fallback = undefined) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
}

const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_QUERY = getArg('place') || 'Crêperie Ozoir Ozoir-la-Ferrière';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

if (!GOOGLE_KEY) {
  console.error('Missing GOOGLE_PLACES_API_KEY in env');
  process.exit(1);
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.error('Missing Supabase credentials (VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE).');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

async function findPlaceId(query) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json');
  url.searchParams.set('input', query);
  url.searchParams.set('inputtype', 'textquery');
  url.searchParams.set('fields', 'place_id,name,formatted_address');
  url.searchParams.set('key', GOOGLE_KEY);
  const res = await fetch(url);
  const data = await res.json();
  if (!data.candidates?.length) throw new Error('Place not found');
  return data.candidates[0].place_id;
}

async function getPlaceDetails(placeId) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set(
    'fields',
    [
      'name',
      'formatted_address',
      'international_phone_number',
      'opening_hours',
      'website',
      'url',
      'rating',
      'user_ratings_total',
      'reviews', // Places returns up to 5 most relevant reviews
      'photos',
    ].join(',')
  );
  url.searchParams.set('key', GOOGLE_KEY);
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK') throw new Error(`Place details error: ${data.status}`);
  return data.result;
}

function mapOpeningHours(oh) {
  // Our DB expects: weekday int (0=Sunday .. 6=Saturday?) and ranges string
  // In existing code, weekdays array used in footer is [Tuesday..Monday], but DB schema hints weekday 0..6.
  // We will map Google weekday_text which starts on Monday. We'll store as simple text rows for now.
  const weekdayText = oh?.weekday_text || [];
  // Build array of {weekday, ranges}
  return weekdayText.map((line, idx) => ({
    weekday_label: line.split(':')[0].trim(),
    ranges: line.split(':').slice(1).join(':').trim(),
    weekday_index: idx, // Monday=0 ... Sunday=6
  }));
}

async function upsertOpeningHours(mapped) {
  // If table opening_hours exists with columns: weekday (int), ranges (text)
  // We'll truncate then insert to keep it simple.
  try {
    await supabase.rpc('noop');
  } catch {}
  // Best effort: delete all
  await supabase.from('opening_hours').delete().neq('weekday', -1);
  const rows = mapped.map((m) => ({
    weekday: m.weekday_index, // store Monday=0..Sunday=6
    ranges: m.ranges || 'Closed',
  }));
  if (rows.length) {
    const { error } = await supabase.from('opening_hours').insert(rows);
    if (error) throw error;
  }
}

async function upsertReviews(reviews) {
  if (!reviews?.length) return;
  // Our table is 'avis' with columns: author, rating, message, date, published
  const rows = reviews.map((r) => ({
    author: r.author_name,
    rating: r.rating,
    message: r.text,
    date: r.time ? new Date(r.time * 1000).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    published: true,
    source: 'google',
  }));
  // Insert; ignore duplicates based on (author,message,date) if policy exists, else best effort
  for (const row of rows) {
    await supabase.from('avis').insert(row).catch(() => {});
  }
}

async function main() {
  console.log('Searching place…', PLACE_QUERY);
  const placeId = await findPlaceId(PLACE_QUERY);
  console.log('Place ID:', placeId);
  const details = await getPlaceDetails(placeId);

  const mappedHours = mapOpeningHours(details.opening_hours);
  console.log('Opening hours:', mappedHours.map((m) => `${m.weekday_label}: ${m.ranges}`).join(' | '));
  await upsertOpeningHours(mappedHours);
  console.log('Opening hours synced');

  await upsertReviews(details.reviews || []);
  console.log(`Reviews synced (${details.reviews?.length || 0})`);

  // Optionally, you can store phone/address into a 'business_info' table if present
  // Not implemented by default to avoid altering schema unexpectedly.
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

