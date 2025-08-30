-- Supabase schema for Crêperie Ozoir

-- Categories
create table if not exists public.categorie (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamp with time zone default now()
);

-- Menu items
create table if not exists public.menu (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(8,2) not null,
  image text,
  categorie_id uuid references public.categorie(id) on delete set null,
  lang text default 'fr' check (lang in ('fr','en')),
  created_at timestamp with time zone default now()
);

-- News / actualités
create table if not exists public.actualite (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  image text,
  date date default now(),
  lang text default 'fr' check (lang in ('fr','en')),
  created_at timestamp with time zone default now()
);

-- Contacts
create table if not exists public.contact (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'nouveau',
  created_at timestamp with time zone default now()
);

-- Reviews / avis
create table if not exists public.avis (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  rating int check (rating between 1 and 5) not null,
  message text not null,
  date date default now(),
  published boolean default false,
  created_at timestamp with time zone default now()
);

-- Reservations
create table if not exists public.reservation (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  date date not null,
  time text not null,
  guests int not null check (guests > 0),
  status text default 'en_attente' check (status in ('en_attente','confirmee','annulee')),
  notes text,
  created_at timestamp with time zone default now()
);

-- Reservation settings (optional)
create table if not exists public.reservation_settings (
  id int primary key default 1,
  max_per_slot int default 30,
  slot_interval_minutes int default 30
);

-- Job offers
create table if not exists public.job_offer (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  published boolean default true,
  created_at timestamp with time zone default now()
);

-- Applications / candidatures
create table if not exists public.candidature (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  cv_url text,
  created_at timestamp with time zone default now()
);

-- Basic RLS policies (enable and allow anon read, insert limited)
alter table public.menu enable row level security;
alter table public.categorie enable row level security;
alter table public.actualite enable row level security;
alter table public.contact enable row level security;
alter table public.avis enable row level security;
alter table public.reservation enable row level security;
alter table public.job_offer enable row level security;
alter table public.candidature enable row level security;
alter table public.reservation_settings enable row level security;

-- Public read for content
create policy if not exists "Public read menu" on public.menu for select using (true);
create policy if not exists "Public read categorie" on public.categorie for select using (true);
create policy if not exists "Public read actualite" on public.actualite for select using (true);
create policy if not exists "Public read job_offer" on public.job_offer for select using (true);
create policy if not exists "Public read avis" on public.avis for select using (published = true);
create policy if not exists "Public read reservation_settings" on public.reservation_settings for select using (true);

-- Public inserts for forms
create policy if not exists "Public insert contact" on public.contact for insert with check (true);
create policy if not exists "Public insert reservation" on public.reservation for insert with check (true);
create policy if not exists "Public insert avis" on public.avis for insert with check (true);
create policy if not exists "Public insert candidature" on public.candidature for insert with check (true);

-- You should restrict updates/deletes to service role (server) or authenticated admin in production.

