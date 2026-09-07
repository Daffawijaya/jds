alter table public.career_applications
  add column resume_path text;

comment on column public.career_applications.resume_path is
  'Private CV file path in the career-applications storage bucket.';
