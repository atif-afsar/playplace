-- ============================================================
--  Play Place International School — Supabase schema (Phase 1)
--  Run this in: Supabase Dashboard → SQL Editor → New query
--  Covers what the current admin panel needs: profiles (roles),
--  admissions, and students. More tables come in later phases.
-- ============================================================

-- ---------- PROFILES (roles for auth users) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'parent' check (role in ('admin', 'parent')),
  created_at timestamptz not null default now()
);

-- ---------- ADMISSIONS ----------
create table if not exists public.admissions (
  id uuid primary key default gen_random_uuid(),
  child_name text not null,
  dob date,
  gender text,
  class_applied text,
  parent_name text,
  phone text,
  email text,
  address text,
  photo_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

-- ---------- STUDENTS ----------
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  dob date,
  gender text,
  class text,
  roll_number text,
  parent_id uuid references public.profiles (id) on delete set null,
  admission_id uuid references public.admissions (id) on delete set null,
  photo_url text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

-- Migration for existing databases: link a student back to the admission it
-- came from, so approving an application enrolls the child exactly once.
alter table public.students
  add column if not exists admission_id uuid references public.admissions (id) on delete set null;

create unique index if not exists students_admission_id_key
  on public.students (admission_id)
  where admission_id is not null;

-- ============================================================
--  Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.admissions enable row level security;
alter table public.students enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ----- profiles policies -----
drop policy if exists "profiles: self read" on public.profiles;
create policy "profiles: self read"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles: self update" on public.profiles;
create policy "profiles: self update"
  on public.profiles for update
  using (id = auth.uid());

-- ----- admissions policies -----
-- Anyone (even anonymous) can submit an application.
drop policy if exists "admissions: public insert" on public.admissions;
create policy "admissions: public insert"
  on public.admissions for insert
  with check (true);

-- Only admins can read / update / delete admissions.
drop policy if exists "admissions: admin read" on public.admissions;
create policy "admissions: admin read"
  on public.admissions for select
  using (public.is_admin());

-- Parents can read the applications they submitted (matched by email),
-- so the Parent Portal can show their application status.
drop policy if exists "admissions: parent read own" on public.admissions;
create policy "admissions: parent read own"
  on public.admissions for select
  using (email = auth.jwt() ->> 'email');

drop policy if exists "admissions: admin update" on public.admissions;
create policy "admissions: admin update"
  on public.admissions for update
  using (public.is_admin());

drop policy if exists "admissions: admin delete" on public.admissions;
create policy "admissions: admin delete"
  on public.admissions for delete
  using (public.is_admin());

-- ----- students policies -----
drop policy if exists "students: admin all" on public.students;
create policy "students: admin all"
  on public.students for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "students: parent read own" on public.students;
create policy "students: parent read own"
  on public.students for select
  using (parent_id = auth.uid());

-- ============================================================
--  Auto-create a profile row whenever a new auth user signs up
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- SECURITY: never trust a client-supplied role. Everyone signs up as a
  -- parent; admins are promoted explicitly via SQL (see bottom of this file).
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    'parent'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
--  OPTIONAL: seed some sample admissions to see the UI populated
-- ============================================================
insert into public.admissions (child_name, dob, gender, class_applied, parent_name, phone, email, status)
values
  ('Leo Williams', '2021-03-14', 'Boy', 'Nursery', 'Robert Williams', '+1 (555) 0123', 'robert@example.com', 'pending'),
  ('Jia Chen', '2020-07-22', 'Girl', 'Playgroup', 'Li Mei Chen', '+1 (555) 0456', 'limei@example.com', 'approved'),
  ('Amir Shah', '2019-11-02', 'Boy', 'Kindergarten 1', 'Farah Shah', '+1 (555) 0789', 'farah@example.com', 'rejected'),
  ('Maya Brooks', '2021-01-30', 'Girl', 'Nursery', 'David Brooks', '+1 (555) 0987', 'david@example.com', 'pending')
on conflict do nothing;

-- ============================================================
--  STORAGE: bucket for admission photos (optional)
--  The public application form uploads the child's photo here.
--  Easiest: Dashboard → Storage → New bucket → name "admissions" → Public.
--  Or run the statements below.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('admissions', 'admissions', true)
on conflict (id) do nothing;

drop policy if exists "admissions bucket: public upload" on storage.objects;
create policy "admissions bucket: public upload"
  on storage.objects for insert
  with check (bucket_id = 'admissions');

drop policy if exists "admissions bucket: public read" on storage.objects;
create policy "admissions bucket: public read"
  on storage.objects for select
  using (bucket_id = 'admissions');

-- ============================================================
--  PHASE 5 — Parent Portal data (timetable, results, attendance, fees, notices)
--  Safe to run multiple times.
-- ============================================================

-- ---------- TIMETABLE ----------
create table if not exists public.timetable (
  id uuid primary key default gen_random_uuid(),
  class text not null,
  day text not null,
  time_slot text not null,
  subject text not null,
  teacher text,
  created_at timestamptz not null default now()
);

-- ---------- RESULTS ----------
create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  term text not null default 'Term 1',
  subject text not null,
  marks_obtained numeric not null default 0,
  max_marks numeric not null default 100,
  grade text,
  remarks text,
  created_at timestamptz not null default now()
);

-- ---------- ATTENDANCE ----------
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  date date not null default current_date,
  status text not null default 'present' check (status in ('present', 'absent')),
  created_at timestamptz not null default now(),
  unique (student_id, date)
);

-- ---------- FEES ----------
create table if not exists public.fees (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  title text not null default 'Term Fee',
  amount numeric not null default 0,
  due_date date,
  status text not null default 'due' check (status in ('paid', 'due', 'overdue')),
  paid_on date,
  created_at timestamptz not null default now()
);

-- ---------- NOTICES ----------
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  target_class text not null default 'all',
  created_at timestamptz not null default now()
);

-- ---------- SCHOOL CALENDAR (events) ----------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  end_date date,
  event_type text not null default 'event'
    check (event_type in ('event', 'holiday', 'term_start', 'term_end', 'exam', 'closure')),
  location text,
  target_class text not null default 'all',
  school_year text not null,
  created_at timestamptz not null default now(),
  check (end_date is null or end_date >= event_date)
);

create index if not exists events_event_date_idx on public.events (event_date);
create index if not exists events_school_year_idx on public.events (school_year);

-- ============================================================
--  Helper functions (SECURITY DEFINER so RLS subqueries are simple + safe)
-- ============================================================
create or replace function public.owns_student(sid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.students
    where id = sid and parent_id = auth.uid()
  );
$$;

create or replace function public.parent_classes()
returns setof text
language sql
security definer
set search_path = public
as $$
  select distinct class from public.students
  where parent_id = auth.uid() and class is not null;
$$;

-- ============================================================
--  RLS for the new tables
-- ============================================================
alter table public.timetable enable row level security;
alter table public.results enable row level security;
alter table public.attendance enable row level security;
alter table public.fees enable row level security;
alter table public.notices enable row level security;
alter table public.events enable row level security;

-- ----- timetable: admin full, parent reads own child's class -----
drop policy if exists "timetable: admin all" on public.timetable;
create policy "timetable: admin all"
  on public.timetable for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "timetable: parent read class" on public.timetable;
create policy "timetable: parent read class"
  on public.timetable for select
  using (class in (select public.parent_classes()));

-- ----- results: admin full, parent reads own child -----
drop policy if exists "results: admin all" on public.results;
create policy "results: admin all"
  on public.results for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "results: parent read own" on public.results;
create policy "results: parent read own"
  on public.results for select
  using (public.owns_student(student_id));

-- ----- attendance: admin full, parent reads own child -----
drop policy if exists "attendance: admin all" on public.attendance;
create policy "attendance: admin all"
  on public.attendance for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "attendance: parent read own" on public.attendance;
create policy "attendance: parent read own"
  on public.attendance for select
  using (public.owns_student(student_id));

-- ----- fees: admin full, parent reads own child -----
drop policy if exists "fees: admin all" on public.fees;
create policy "fees: admin all"
  on public.fees for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "fees: parent read own" on public.fees;
create policy "fees: parent read own"
  on public.fees for select
  using (public.owns_student(student_id));

-- ----- notices: admin full, parent reads 'all' or their class -----
drop policy if exists "notices: admin all" on public.notices;
create policy "notices: admin all"
  on public.notices for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "notices: parent read" on public.notices;
create policy "notices: parent read"
  on public.notices for select
  using (target_class = 'all' or target_class in (select public.parent_classes()));

-- ----- events: admin full, public reads school-wide, parents also see class events -----
drop policy if exists "events: admin all" on public.events;
create policy "events: admin all"
  on public.events for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "events: public read" on public.events;
create policy "events: public read"
  on public.events for select
  using (target_class = 'all');

drop policy if exists "events: parent read class" on public.events;
create policy "events: parent read class"
  on public.events for select
  using (target_class in (select public.parent_classes()));

-- ============================================================
--  AFTER RUNNING: make yourself an admin
--  1) Create a user in Authentication → Users (or via the app's Login page)
--  2) Run (replace the email):
--     update public.profiles set role = 'admin' where email = 'you@example.com';
-- ============================================================
