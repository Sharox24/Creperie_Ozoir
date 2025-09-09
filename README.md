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
**Crêperie Ozoir — Monorepo Client/Admin**

Application web scindée en deux interfaces distinctes:
- Client (site public vitrine)
- Admin (back‑office de gestion)

Les deux partagent un noyau commun (UI, contextes, utilitaires) pour maximiser la cohérence et limiter la duplication.

**Stack Technique**
- React 18 + Vite 7: développement rapide et build optimisé
- React Router: navigation SPA
- Tailwind CSS + tailwind-merge + animations: styles utilitaires et transitions
- Radix UI + class-variance-authority: primitives d’UI accessibles et stylables
- Lucide React: icônes
- React Helmet: métadonnées SEO par page
- date-fns + react-day-picker: gestion des dates (réservations)
- Supabase JS (facultatif): persistance et auth; fallback localStorage si non configuré

**Architecture**
- `client/`: application publique (root Vite, port 5173)
- `admin/`: application d’administration (root Vite, port 5174)
- `shared/`: code partagé par les deux apps
- `public/`: assets statiques communs (favicon, logo, .htaccess)
- `supabase/`: `schema.sql`, schéma de base de données (optionnel selon déploiement)

**Dossiers Clés**
- `client/src`: pages, composants spécifiques client
- `admin/src`: pages, layout admin
- `shared/components/ui`: primitives UI (bouton, toast, etc.)
- `shared/contexts/LanguageContext.jsx`: i18n simple FR/EN (localStorage `creperie-language`)
- `shared/lib/supabaseClient.js`: client Supabase (garde-fou `hasSupabase`)
- `shared/lib/metrics.js`: analytics léger (respect du consentement)
- `shared/styles/index.css`: base CSS et thèmes

**Alias & Résolution**
- Client: `@` → `client/src`
- Admin: `@` → `admin/src`
- Partagé: `#shared` → `shared`

**Prérequis**
- Node.js 18+ recommandé (voir `.nvmrc`)
- npm 9+ (ou pnpm/yarn si vous adaptez les scripts)

**Installation**
- `npm install`

Si vous utilisez la commande tout‑en‑un pour le dev, elle s’appuie sur:
- `concurrently`: lance plusieurs processus
- `wait-on`: attend l’ouverture des ports
- `open-cli`: ouvre les navigateurs automatiquement

Ces paquets sont ajoutés en devDependencies; un simple `npm install` suffit.

**Variables d’Environnement**
Fichier de référence: `.env.example` → copiez vers `.env` à la racine.
- `VITE_SUPABASE_URL`: URL de votre projet Supabase
- `VITE_SUPABASE_ANON_KEY`: clé anon publique

Si non renseignées, l’app fonctionne en mode local (localStorage) pour plusieurs écrans (réservations, avis, contacts, analytics).

**Commandes NPM**
- `dev:all`: lance client et admin, ouvre deux onglets
  - Client: `http://localhost:5173/`
  - Admin: `http://localhost:5174/`
- `dev:client`: lance uniquement le site public
- `dev:admin`: lance uniquement l’admin
- `build:client`: build production du client → `dist/client`
- `build:admin`: build production de l’admin → `dist/admin`
- `build`: enchaîne client puis admin
- `preview:client`: prévisualisation du client buildé (port 5173)
- `preview:admin`: prévisualisation de l’admin buildé (port 5174)
- `clean`: supprime le dossier `dist/`

Vous pouvez aussi mapper `npm start` à `dev:all` si souhaité.

**Démarrage Rapide**
- `cp .env.example .env` puis renseigner les variables (optionnel)
- `npm install`
- `npm run dev:all`
  - Deux serveurs Vite se lancent et ouvrent les pages d’accueil

**Build & Déploiement**
- `npm run build` génère:
  - `dist/client`: site public (SPA)
  - `dist/admin`: back‑office (SPA)
- Hébergement recommandé: statique (Netlify, Vercel, S3/CloudFront, Nginx/Apache)
- Important (SPA): configurez un fallback `index.html` pour toutes les routes (rewrite) côté serveur/proxy pour le client et l’admin séparément.

Exemples de mapping:
- Domaine principal → `dist/client`
- Sous‑domaine admin (ex: `admin.votredomaine.fr`) → `dist/admin`

**Analytics & Consentement**
- Clé de consentement: `creperie-cookie-consent` (localStorage)
- Sans consentement, aucun événement n’est enregistré
- Réseaux appelés (si consentement): IP (ipify), géo (ipwho.is → ipapi.co fallback)

**Accessibilité & UX**
- Radix UI: primitives accessibles par défaut
- Animations (framer‑motion): transitions subtiles
- Thème clair/sombre: via `ThemeToggle` (préférence persistée)

**Internationalisation**
- Contexte: `shared/contexts/LanguageContext.jsx`
- Clés disponibles: navigation, contenus clés, métadonnées
- Persistance: localStorage `creperie-language`

**Structure Minimale**
- `client/index.html`
- `client/src/main.jsx`
- `client/src/App.jsx`
- `admin/index.html`
- `admin/src/main.jsx`
- `admin/src/App.jsx`
- `shared/components/ui/*`
- `shared/contexts/LanguageContext.jsx`
- `shared/lib/*`
- `shared/styles/index.css`
- `vite.client.config.js` / `vite.admin.config.js` / `vite.config.js`
- `tailwind.config.js`
- `package.json`

**Problèmes Courants**
- `concurrently` introuvable: exécutez `npm install`
- Ports occupés: modifiez `port` dans `vite.*.config.js` ou libérez 5173/5174
- Page blanche en prod sur un rafraîchissement d’URL interne (SPA): ajoutez un rewrite fallback `/* → /index.html` pour chaque app
- Accents mal affichés: l’encodage a été corrigé dans le dépôt; si vous importez des contenus externes, assurez‑vous qu’ils soient en UTF‑8

**Conventions & Qualité**
- Code style: cohérent avec le projet (JS/JSX, pas de headers licences)
- Tailwind: classes utilitaires, variantes via `cva`
- Tests: non fournis par défaut; vous pouvez en ajouter au besoin

**Questions / Améliorations**
- Rediriger automatiquement `npm start` → `dev:all` ?
- Ajouter des routes admin sans préfixe pour un sous‑domaine dédié ?
- Étoffer la config SEO (OpenGraph, images) page par page ?

