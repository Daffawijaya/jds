-- Keep publication visibility separate from application availability.
-- A closed role remains visible on the public Career page, but cannot be applied to.
alter table public.career_roles
  add column is_open boolean not null default true;

comment on column public.career_roles.is_open is
  'Whether applications for this published career role are currently open.';
