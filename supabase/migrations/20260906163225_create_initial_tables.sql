-- Initial schema for JDS website
-- Contact form submissions
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Career applications
create table public.career_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  position text not null,
  resume_url text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.career_applications enable row level security;
