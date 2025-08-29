# Crêperie Ozoir

This repository contains the early skeleton for the Crêperie Ozoir website.

### Reservation prototype
The `frontend` now includes a basic reservation form (`/reservation`) that
sends submissions to a Supabase table. Configure the following environment
variables in `frontend/.env`:

```
SUPABASE_URL=<your project url>
SUPABASE_ANON_KEY=<public anon key>
```

Run `npm run dev` from the `frontend` directory and visit
`http://localhost:3000/reservation` to try it out.

## Structure
- `frontend/` – Next.js application (TypeScript) with placeholder home page.
- `backend/` – Placeholder for Strapi-based API.

Further development will add multilingual support, reservation system, and admin panel.

## Development Status
This is a test update to verify the repository setup.

