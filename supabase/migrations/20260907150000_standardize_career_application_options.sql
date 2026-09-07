alter table public.career_roles
  add column application_status text;

update public.career_roles
set application_status = case when is_open then 'open' else 'closed' end;

alter table public.career_roles
  alter column application_status set default 'open',
  alter column application_status set not null,
  add constraint career_roles_application_status_check
    check (application_status in ('open', 'closed'));

update public.career_roles
set location = case
  when lower(coalesce(location, '')) like '%remote%' then 'remote'
  when lower(coalesce(location, '')) like '%hybrid%' then 'hybrid'
  when lower(coalesce(location, '')) like '%lokasi mitra%'
    or lower(coalesce(location, '')) like '%lapangan%'
    or lower(coalesce(location, '')) like '%kutai%' then 'field'
  when lower(coalesce(location, '')) like '%wfo%'
    or lower(coalesce(location, '')) like '%on-site%'
    or lower(coalesce(location, '')) like '%onsite%' then 'on_site'
  else 'flexible'
end,
engagement = case
  when lower(coalesce(engagement, '')) like '%penuh waktu%'
    or lower(coalesce(engagement, '')) like '%full%time%' then 'full_time'
  when lower(coalesce(engagement, '')) like '%paruh waktu%'
    or lower(coalesce(engagement, '')) like '%part%time%' then 'part_time'
  when lower(coalesce(engagement, '')) like '%kontrak%' then 'contract'
  when lower(coalesce(engagement, '')) like '%freelance%' then 'freelance'
  when lower(coalesce(engagement, '')) like '%magang%'
    or lower(coalesce(engagement, '')) like '%intern%' then 'internship'
  else 'project_based'
end;

alter table public.career_roles
  alter column location set default 'flexible',
  alter column location set not null,
  alter column engagement set default 'project_based',
  alter column engagement set not null,
  add constraint career_roles_location_check
    check (location in ('on_site', 'hybrid', 'remote', 'field', 'flexible')),
  add constraint career_roles_engagement_check
    check (engagement in ('full_time', 'part_time', 'contract', 'project_based', 'freelance', 'internship'));

alter table public.career_roles
  drop column is_open;

alter table public.career_applications
  add column application_source text not null default 'talent_pool',
  add column engagement_scheme text not null default 'talent_pool',
  add column work_arrangement text not null default 'flexible';

update public.career_applications
set
  application_source = case when role_id is null then 'talent_pool' else 'position' end,
  engagement_scheme = case when role_id is null then 'talent_pool' else 'project_based' end;

alter table public.career_applications
  add constraint career_applications_source_check
    check (application_source in ('talent_pool', 'position')),
  add constraint career_applications_engagement_check
    check (engagement_scheme in ('talent_pool', 'full_time', 'part_time', 'contract', 'project_based', 'freelance', 'internship')),
  add constraint career_applications_work_arrangement_check
    check (work_arrangement in ('on_site', 'hybrid', 'remote', 'field', 'flexible')),
  add constraint career_applications_source_engagement_check
    check (
      (application_source = 'talent_pool' and engagement_scheme = 'talent_pool')
      or
      (application_source = 'position' and engagement_scheme <> 'talent_pool')
    );

comment on column public.career_roles.application_status is
  'Public application status. Allowed values: open or closed.';
comment on column public.career_applications.application_source is
  'How the applicant entered the flow: general Talent Pool or a specific position.';
comment on column public.career_applications.engagement_scheme is
  'Applicant-selected engagement scheme; forced to talent_pool for general submissions.';
comment on column public.career_applications.work_arrangement is
  'Applicant work-arrangement preference.';
