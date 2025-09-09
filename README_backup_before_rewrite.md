Crêperie Ozoir — Frontend (Vite React) + Supabase

Overview
- Frontend: Vite + React + TailwindCSS
- i18n: simple LanguageContext (FR/EN)
- Backend: Supabase (database + auth + storage)
- Admin: /admin (login via Supabase auth)

Getting Started
1) Install deps
   npm install

2) Configure env
   Copy .env.example to .env and set:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

3) Apply DB schema (in your Supabase project)
   - Open supabase SQL editor and run: supabase/schema.sql

4) Buckets
   - The page Recrutement uses storage bucket: candidatures (auto-created on first upload)

5) Run locally
   npm run dev

Admin
- /admin/login for login (email/password via Supabase)
- /admin: dashboard, reservations, menu, news, reviews, contacts, candidatures

Notes
- Emails are not sent by the frontend. Implement via a secure API or Supabase Edge Functions.
- You can later migrate to Next.js + next-i18next if required; current app already supports FR/EN translations for UI and content via DB lang fields.
## Démarrer les deux interfaces

- Lancer client + admin en une commande: `npm run dev:all`
  - Ouvre automatiquement deux onglets: 
    - Client: `http://localhost:5173/` (accueil)
    - Admin: `http://localhost:5174/admin/` (dashboard)
- Lancer séparément:
  - Client seul: `npm run dev:client` → ouvre `http://localhost:5173/`
  - Admin seul: `npm run dev:admin` → ouvre `http://localhost:5174/admin/`

Builds:
- Client: `npm run build:client` → `dist/client`
- Admin: `npm run build:admin` → `dist/admin`
- Les deux: `npm run build`

Nettoyage:
- `npm run clean` supprime `dist/`

