alter table public.career_applications
  add column role_id uuid references public.career_roles(id) on delete set null,
  add column domicile text,
  add column education_level text,
  add column institution text,
  add column major text,
  add column graduation_year integer,
  add column experience_years numeric(4,1),
  add column latest_company text,
  add column latest_position text,
  add column skills text,
  add column linkedin_url text,
  add column portfolio_url text,
  add column availability text,
  add column expected_salary text,
  add column photo_path text,
  add column diploma_path text,
  add column transcript_path text,
  add column consent_at timestamptz;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'career-applications',
  'career-applications',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

comment on column public.career_applications.role_id is 'Selected career role; null for general Talent Pool applications.';
comment on column public.career_applications.photo_path is 'Private storage path in the career-applications bucket.';
comment on column public.career_applications.resume_url is 'Legacy external CV URL field.';
