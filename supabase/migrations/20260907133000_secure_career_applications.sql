drop policy if exists "Public can insert applications" on public.career_applications;

create table if not exists public.career_application_rate_limits (
  key text primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 0
);

alter table public.career_application_rate_limits enable row level security;

create or replace function public.check_career_application_rate_limit(
  p_key text,
  p_limit integer default 6,
  p_window_seconds integer default 600
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_attempts integer;
begin
  insert into public.career_application_rate_limits as rate_limit (key, window_started_at, attempts)
  values (p_key, now(), 1)
  on conflict (key) do update
  set
    window_started_at = case
      when rate_limit.window_started_at <= now() - make_interval(secs => p_window_seconds) then now()
      else rate_limit.window_started_at
    end,
    attempts = case
      when rate_limit.window_started_at <= now() - make_interval(secs => p_window_seconds) then 1
      else rate_limit.attempts + 1
    end
  returning attempts into current_attempts;

  return current_attempts <= greatest(p_limit, 1);
end;
$$;

revoke all on function public.check_career_application_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.check_career_application_rate_limit(text, integer, integer) to service_role;

comment on table public.career_application_rate_limits is
  'Hashed request fingerprints used to rate-limit the public career application endpoint.';
