-- SHINY HOME COLLECTION v160 / OBS stream layouts
-- Supabase SQL Editor で1回実行してください。
-- v158でテーブル作成済みでも、このSQLをそのまま再実行できます。

create table if not exists public.shiny_home_obs_state (
  user_id text primary key,
  national_owned integer,
  national_total integer,
  national_remaining integer,
  bw2_owned integer,
  bw2_total integer,
  bw2_remaining integer,
  obs_enabled boolean not null default false,
  layout_mode text not null default 'dual',
  switch_pokemon_id text,
  ds_pokemon_id text,
  updated_at timestamptz not null default now()
);

alter table public.shiny_home_obs_state add column if not exists obs_enabled boolean not null default false;
alter table public.shiny_home_obs_state add column if not exists layout_mode text not null default 'dual';
alter table public.shiny_home_obs_state add column if not exists switch_pokemon_id text;
alter table public.shiny_home_obs_state add column if not exists ds_pokemon_id text;

alter table public.shiny_home_obs_state enable row level security;

drop policy if exists "obs state read" on public.shiny_home_obs_state;
drop policy if exists "obs state insert" on public.shiny_home_obs_state;
drop policy if exists "obs state update" on public.shiny_home_obs_state;

create policy "obs state read"
on public.shiny_home_obs_state for select to anon
using (user_id = 'pokemon-shiny-home');

create policy "obs state insert"
on public.shiny_home_obs_state for insert to anon
with check (user_id = 'pokemon-shiny-home');

create policy "obs state update"
on public.shiny_home_obs_state for update to anon
using (user_id = 'pokemon-shiny-home')
with check (user_id = 'pokemon-shiny-home');
