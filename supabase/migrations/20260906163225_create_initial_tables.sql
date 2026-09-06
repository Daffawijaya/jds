-- =============================================================
-- JDS Admin Database Schema
-- =============================================================

-- 1. SERVICES
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null default 'development',
  short_desc text,
  full_desc text,
  icon_name text,
  image_url text,
  features jsonb not null default '[]',
  deliverables jsonb not null default '[]',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. PROJECTS
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  category text,
  year text,
  short_desc text,
  full_desc text,
  scope jsonb not null default '[]',
  tags jsonb not null default '[]',
  highlight_badge text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. TESTIMONIALS
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  title text,
  quote text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4. CAREER ROLES
create table public.career_roles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  group_name text not null,
  group_label text,
  education text,
  majors text,
  location text,
  engagement text,
  summary text,
  qualifications jsonb not null default '[]',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 5. FAQS
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 6. COMPANY INFO (single row)
create table public.company_info (
  id uuid primary key default gen_random_uuid(),
  key text unique not null default 'main',
  official_name text,
  short_name text,
  positioning text,
  tagline text,
  overview text,
  address text,
  village text,
  district text,
  regency text,
  province text,
  country text,
  phone text,
  whatsapp text,
  whatsapp_url text,
  email text,
  instagram text,
  instagram_url text,
  updated_at timestamptz not null default now()
);

-- 7. CORE VALUES
create table public.core_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 8. ABOUT CARDS
create table public.about_cards (
  id uuid primary key default gen_random_uuid(),
  label text,
  title text,
  description text,
  image_url text,
  button_label text,
  button_href text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 9. CONTACT SUBMISSIONS
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- 10. CAREER APPLICATIONS
create table public.career_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  position text,
  expertise text,
  resume_url text,
  notes text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- =============================================================
-- ENABLE RLS
-- =============================================================
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.career_roles enable row level security;
alter table public.faqs enable row level security;
alter table public.company_info enable row level security;
alter table public.core_values enable row level security;
alter table public.about_cards enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.career_applications enable row level security;

-- =============================================================
-- RLS POLICIES
-- =============================================================

-- Public can read active content
create policy "Public can read services" on public.services for select using (is_active = true);
create policy "Public can read projects" on public.projects for select using (is_active = true);
create policy "Public can read testimonials" on public.testimonials for select using (is_active = true);
create policy "Public can read career_roles" on public.career_roles for select using (is_active = true);
create policy "Public can read faqs" on public.faqs for select using (is_active = true);
create policy "Public can read company_info" on public.company_info for select using (true);
create policy "Public can read core_values" on public.core_values for select using (is_active = true);
create policy "Public can read about_cards" on public.about_cards for select using (is_active = true);

-- Public can insert submissions
create policy "Public can insert contact" on public.contact_submissions for insert with check (true);
create policy "Public can insert applications" on public.career_applications for insert with check (true);

-- Authenticated users can do everything (admin)
create policy "Admin full access services" on public.services for all using (auth.role() = 'authenticated');
create policy "Admin full access projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Admin full access testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Admin full access career_roles" on public.career_roles for all using (auth.role() = 'authenticated');
create policy "Admin full access faqs" on public.faqs for all using (auth.role() = 'authenticated');
create policy "Admin full access company_info" on public.company_info for all using (auth.role() = 'authenticated');
create policy "Admin full access core_values" on public.core_values for all using (auth.role() = 'authenticated');
create policy "Admin full access about_cards" on public.about_cards for all using (auth.role() = 'authenticated');
create policy "Admin full access contact_submissions" on public.contact_submissions for all using (auth.role() = 'authenticated');
create policy "Admin full access career_applications" on public.career_applications for all using (auth.role() = 'authenticated');

-- =============================================================
-- STORAGE BUCKETS
-- =============================================================
insert into storage.buckets (id, name, public) values ('images', 'images', true);

create policy "Public can view images" on storage.objects
  for select using (bucket_id = 'images');

create policy "Authenticated can upload images" on storage.objects
  for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Authenticated can delete images" on storage.objects
  for delete using (bucket_id = 'images' and auth.role() = 'authenticated');

-- =============================================================
-- SEED DATA: company_info
-- =============================================================
insert into public.company_info (key, official_name, short_name, positioning, tagline, overview, address, village, district, regency, province, country, phone, whatsapp, whatsapp_url, email, instagram, instagram_url)
values (
  'main',
  'Jaya Dinara Sukses',
  'JDS',
  'IT, Digital Solutions, Outsourcing & Professional Services',
  'Mitra Solusi Teknologi, Digitalisasi, & Tenaga Ahli Profesional',
  'Jaya Dinara Sukses (JDS) adalah penyedia solusi IT terintegrasi, digitalisasi sistem, serta penyediaan jasa penyiapan dan pengelolaan tenaga ahli profesional.',
  'Jalan Belimbing, Perum Manunggal Jaya No. 1 D1, Manunggal Jaya, Tenggarong Seberang, Kutai Kartanegara, Kalimantan Timur, Indonesia',
  'Manunggal Jaya',
  'Tenggarong Seberang',
  'Kutai Kartanegara',
  'Kalimantan Timur',
  'Indonesia',
  '081928704503',
  '081928704503',
  'https://wa.me/6281928704503',
  'jayadinarasukses@gmail.com',
  '@jds_corp',
  'https://instagram.com/jds_corp'
);
