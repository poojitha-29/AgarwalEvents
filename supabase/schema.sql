-- Agarwal Events & Wedding Planners — Supabase Schema
-- Run this in your Supabase project's SQL Editor

-- All event/service content
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null,
  description text,
  is_wedding boolean default false,
  is_featured boolean default false,
  cover_image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Pricing packages: name is Basic / Premium / Luxury
create table packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  price_display text,
  features text[],
  is_popular boolean default false,
  created_at timestamptz default now()
);

-- Portfolio photos
create table gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  category text,
  caption text,
  is_featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Client reviews
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  event_type text,
  review_text text not null,
  rating int check (rating between 1 and 5),
  couple_image_url text,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- Inquiries from contact + book now forms
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  event_type text,
  event_date date,
  guest_count text,
  budget_range text,
  venue_preference text,
  special_requests text,
  message text,
  source text default 'contact',
  status text default 'new',
  created_at timestamptz default now()
);

-- FAQs
create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
alter table services enable row level security;
alter table packages enable row level security;
alter table gallery enable row level security;
alter table testimonials enable row level security;
alter table inquiries enable row level security;
alter table faqs enable row level security;

-- Public read
create policy "public read" on services for select using (true);
create policy "public read" on packages for select using (true);
create policy "public read" on gallery for select using (true);
create policy "public read" on testimonials for select using (true);
create policy "public read" on faqs for select using (true);

-- Public insert on inquiries only
create policy "public insert" on inquiries for insert with check (true);

-- Authenticated full access
create policy "auth all" on services for all using (auth.role() = 'authenticated');
create policy "auth all" on packages for all using (auth.role() = 'authenticated');
create policy "auth all" on gallery for all using (auth.role() = 'authenticated');
create policy "auth all" on testimonials for all using (auth.role() = 'authenticated');
create policy "auth all" on inquiries for all using (auth.role() = 'authenticated');
create policy "auth all" on faqs for all using (auth.role() = 'authenticated');

-- Blog posts
create table blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  category text,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table blogs enable row level security;
create policy "public read" on blogs for select using (true);
create policy "auth all" on blogs for all using (auth.role() = 'authenticated');
