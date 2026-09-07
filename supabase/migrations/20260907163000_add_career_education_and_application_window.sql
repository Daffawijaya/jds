alter table public.career_roles
  add column education_levels text[] not null default '{}',
  add column application_open_date date,
  add column application_close_date date;

update public.career_roles
set education_levels = array_remove(array[
  case when education ~* '(SMA|SMK|Sederajat)' then 'SMA/SMK/Sederajat' end,
  case when education ~* '(^|[^A-Za-z0-9])D1([^A-Za-z0-9]|$)' then 'D1' end,
  case when education ~* '(^|[^A-Za-z0-9])D2([^A-Za-z0-9]|$)' then 'D2' end,
  case when education ~* '(^|[^A-Za-z0-9])D3([^A-Za-z0-9]|$)' then 'D3' end,
  case when education ~* '(^|[^A-Za-z0-9])D4([^A-Za-z0-9]|$)' then 'D4' end,
  case when education ~* '(^|[^A-Za-z0-9])S1([^A-Za-z0-9]|$)' then 'S1' end,
  case when education ~* '(^|[^A-Za-z0-9])S2([^A-Za-z0-9]|$)' then 'S2' end,
  case when education ~* '(^|[^A-Za-z0-9])S3([^A-Za-z0-9]|$)' then 'S3' end
], null);

update public.career_roles
set
  application_open_date = current_date,
  application_close_date = current_date + 30
where application_status = 'open';

alter table public.career_roles
  add constraint career_roles_education_levels_check
    check (education_levels <@ array['SMA/SMK/Sederajat', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']::text[]),
  add constraint career_roles_application_window_check
    check (
      application_status = 'closed'
      or (
        application_open_date is not null
        and application_close_date is not null
        and application_open_date <= application_close_date
      )
    );

alter table public.career_roles
  drop column education;

comment on column public.career_roles.education_levels is
  'Accepted education levels selected from the controlled admin checklist.';
comment on column public.career_roles.application_open_date is
  'Inclusive first date of the public application window in WITA.';
comment on column public.career_roles.application_close_date is
  'Inclusive last date of the public application window in WITA.';
