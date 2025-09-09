# Crêperie Ozoir — Client & Admin

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-111111?style=flat&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Optionnel-3FCF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![JavaScript](https://img.shields.io/badge/JS-ES2022-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://tc39.es/)
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
![Version](https://img.shields.io/badge/version-0.0.0-blue)

Application scindée en deux interfaces autonomes:
- Client: site public vitrine (routing, SEO, réservations…)
- Admin: back‑office (dashboard, menu, avis, actus, contacts…)

Les deux partagent un noyau commun (UI, contextes, utilitaires) pour maximiser la cohérence et limiter la duplication.

## Table des matières
- [Aperçu](#aperçu)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement](#lancement)
- [Scripts disponibles](#scripts-disponibles)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Variables d’environnement](#variables-denvironnement)
- [Build & Déploiement](#build--déploiement)
- [Troubleshooting](#troubleshooting)
- [Contribution](#contribution)
- [Contact](#contact)

## Aperçu
- Stack: React 18, Vite 7, TailwindCSS, Radix UI, React Router, Helmet, Supabase (optionnel)
- Séparation stricte: `client/` et `admin/` sont deux apps Vite indépendantes
- Partage: `shared/` contient UI, contexts, libs, styles communs

## Prérequis
- Node.js 18+ recommandé (fichier `.nvmrc` fourni)
- npm 9+ (ou pnpm/yarn si vous adaptez les scripts)

## Installation
```bash
npm install
```

## Lancement
- Tout lancer en une commande (ouvre 2 onglets):
```bash
npm run dev:all
# Client → http://localhost:5173/
# Admin  → http://localhost:5174/
```
- Ou séparément:
```bash
npm run dev:client   # http://localhost:5173/
npm run dev:admin    # http://localhost:5174/
```

## Scripts disponibles
- Développement
  - `dev:all`: client + admin en parallèle (ouvre les navigateurs)
  - `dev:client`: démarre uniquement le client
  - `dev:admin`: démarre uniquement l’admin
- Build
  - `build:client`: génère `dist/client`
  - `build:admin`: génère `dist/admin`
  - `build`: enchaîne client puis admin
- Preview
  - `preview:client` (port 5173)
  - `preview:admin` (port 5174)
- Utilitaires
  - `clean`: supprime `dist/`

## Fonctionnalités
- Client
  - Pages: Accueil, Carte, À propos, Contact, Réservation, Actualités, Livre d’or, Mentions légales, Confidentialité
  - SEO par page (React Helmet)
  - UI moderne (Tailwind + Radix + animations)
  - i18n FR/EN (LanguageContext)
- Admin
  - Auth Supabase (si configuré) et garde de session
  - Modules: Dashboard (stats), Réservations, Menu, Actualités, Avis, Messages, Logs
  - Édition avec feedback via toasts
- Partagé
  - Primitives UI (button, select, popover, calendar, toast, toaster)
  - Analytics léger avec consentement (localStorage) et fallback local

## Architecture
```
client/                # App publique (root Vite)
  index.html
  src/
    App.jsx
    main.jsx
    components/
    pages/

admin/                 # App d’administration (root Vite)
  index.html
  src/
    App.jsx
    main.jsx
    components/
    pages/

shared/                # Code commun
  components/ui/*
  contexts/LanguageContext.jsx
  lib/{supabaseClient,metrics,utils,deviceSignature,email}.js
  styles/index.css

public/                # Assets (favicon, logo, .htaccess)
supabase/schema.sql    # Schéma BDD (optionnel)
```

Alias de résolution:
- Client: `@` → `client/src`
- Admin: `@` → `admin/src`
- Partagé: `#shared` → `shared`

## Variables d’environnement
Copier `.env.example` → `.env` à la racine, puis définir si besoin:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Sans ces variables, l’app passe en mode local (localStorage) pour certaines features (réservations, avis, contacts, analytics).

## Build & Déploiement
```bash
npm run build   # génère dist/client et dist/admin
```
- Hébergez les deux dossiers produits (ex: domaine principal → `dist/client`, sous‑domaine admin → `dist/admin`).
- SPA: configurez un fallback `/* → /index.html` pour chaque app sur votre CDN/proxy (Netlify, Vercel, Nginx, Apache…)

## Troubleshooting
- `concurrently` introuvable → `npm install`
- Ports 5173/5174 occupés → ajuster `port` dans `vite.client.config.js` / `vite.admin.config.js`
- Page blanche en prod lors d’un refresh d’URL interne → activer le fallback SPA vers `index.html`
- Accents cassés → vérifier l’encodage UTF‑8 de vos contenus externes

## Contribution
1. Forkez le dépôt
2. Créez une branche (`feat/...` ou `fix/...`)
3. Ouvrez une PR claire et atomique

## Contact
- Email: contact@creperieozoir.fr (exemple)
- Site: https://creperieozoir.fr

---

### Raccourcis
[Accueil](#crêperie-ozoir--client--admin) | [Lancement](#lancement) | [Scripts](#scripts-disponibles) | [Déploiement](#build--déploiement)

