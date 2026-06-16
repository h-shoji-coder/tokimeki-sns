-- ============================================================
-- Migration: ときめき婚活SNS 初期スキーマ
-- Purpose: users / posts / post_likes / user_likes / matches / diagnosis_results
-- ============================================================

-- ============================================================
-- 1. users テーブル
-- ============================================================
create type public.gender_type as enum ('male', 'female', 'other');
create type public.love_type as enum (
  'romantic', 'logical', 'free', 'caring',
  'passionate', 'calm', 'playful', 'serious'
);

create table public.users (
  id               uuid        primary key default gen_random_uuid(),
  clerk_user_id    text        unique not null,
  email            text        not null,
  full_name        text,
  avatar_url       text,
  bio              text,
  age              smallint    check (age between 18 and 99),
  gender           public.gender_type,
  location         text,
  job              text,
  hobbies          text[]      not null default '{}',
  love_type        public.love_type,
  liked_count      integer     not null default 0,
  matched_count    integer     not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.users is 'ときめきユーザー情報';

alter table public.users enable row level security;

-- 誰でも公開プロフィールを閲覧可能
create policy "users_select_public" on public.users
  for select to authenticated
  using (true);

-- 自分のデータのみ挿入
create policy "users_insert_own" on public.users
  for insert to authenticated
  with check (clerk_user_id = (auth.jwt() ->> 'sub'));

-- 自分のデータのみ更新
create policy "users_update_own" on public.users
  for update to authenticated
  using (clerk_user_id = (auth.jwt() ->> 'sub'))
  with check (clerk_user_id = (auth.jwt() ->> 'sub'));

create index idx_users_clerk_user_id on public.users (clerk_user_id);
create index idx_users_love_type on public.users (love_type);

-- updated_at 自動更新
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_updated_at
  before update on public.users
  for each row execute function public.update_updated_at();

-- ============================================================
-- 2. posts テーブル
-- ============================================================
create table public.posts (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references public.users (id) on delete cascade,
  content       text        not null check (char_length(content) between 1 and 500),
  image_urls    text[]      not null default '{}',
  hashtags      text[]      not null default '{}',
  like_count    integer     not null default 0,
  comment_count integer     not null default 0,
  created_at    timestamptz not null default now()
);

comment on table public.posts is 'タイムライン投稿';

alter table public.posts enable row level security;

-- 全員が投稿を閲覧可能
create policy "posts_select_all" on public.posts
  for select to authenticated
  using (true);

-- 自分の投稿のみ作成
create policy "posts_insert_own" on public.posts
  for insert to authenticated
  with check (
    user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

-- 自分の投稿のみ削除
create policy "posts_delete_own" on public.posts
  for delete to authenticated
  using (
    user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

create index idx_posts_user_id on public.posts (user_id);
create index idx_posts_created_at on public.posts (created_at desc);

-- ============================================================
-- 3. post_likes テーブル
-- ============================================================
create table public.post_likes (
  id         uuid        primary key default gen_random_uuid(),
  post_id    uuid        not null references public.posts (id) on delete cascade,
  user_id    uuid        not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

comment on table public.post_likes is '投稿へのいいね';

alter table public.post_likes enable row level security;

create policy "post_likes_select_all" on public.post_likes
  for select to authenticated
  using (true);

create policy "post_likes_insert_own" on public.post_likes
  for insert to authenticated
  with check (
    user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

create policy "post_likes_delete_own" on public.post_likes
  for delete to authenticated
  using (
    user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

create index idx_post_likes_post_id on public.post_likes (post_id);
create index idx_post_likes_user_id on public.post_likes (user_id);

-- ============================================================
-- 4. user_likes テーブル（スワイプいいね）
-- ============================================================
create table public.user_likes (
  id           uuid        primary key default gen_random_uuid(),
  from_user_id uuid        not null references public.users (id) on delete cascade,
  to_user_id   uuid        not null references public.users (id) on delete cascade,
  created_at   timestamptz not null default now(),
  unique (from_user_id, to_user_id),
  check (from_user_id <> to_user_id)
);

comment on table public.user_likes is 'スワイプ型いいね';

alter table public.user_likes enable row level security;

create policy "user_likes_select_own" on public.user_likes
  for select to authenticated
  using (
    from_user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    ) or
    to_user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

create policy "user_likes_insert_own" on public.user_likes
  for insert to authenticated
  with check (
    from_user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

create index idx_user_likes_from on public.user_likes (from_user_id);
create index idx_user_likes_to   on public.user_likes (to_user_id);

-- ============================================================
-- 5. matches テーブル
-- ============================================================
create table public.matches (
  id         uuid        primary key default gen_random_uuid(),
  user_a_id  uuid        not null references public.users (id) on delete cascade,
  user_b_id  uuid        not null references public.users (id) on delete cascade,
  matched_at timestamptz not null default now(),
  unique (user_a_id, user_b_id)
);

comment on table public.matches is 'マッチング成立記録';

alter table public.matches enable row level security;

create policy "matches_select_own" on public.matches
  for select to authenticated
  using (
    user_a_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    ) or
    user_b_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

create index idx_matches_user_a on public.matches (user_a_id);
create index idx_matches_user_b on public.matches (user_b_id);

-- ============================================================
-- 6. diagnosis_results テーブル
-- ============================================================
create table public.diagnosis_results (
  id         uuid             primary key default gen_random_uuid(),
  user_id    uuid             not null references public.users (id) on delete cascade,
  love_type  public.love_type not null,
  created_at timestamptz      not null default now()
);

comment on table public.diagnosis_results is '恋愛タイプ診断結果';

alter table public.diagnosis_results enable row level security;

create policy "diagnosis_select_own" on public.diagnosis_results
  for select to authenticated
  using (
    user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

create policy "diagnosis_insert_own" on public.diagnosis_results
  for insert to authenticated
  with check (
    user_id = (
      select id from public.users where clerk_user_id = (auth.jwt() ->> 'sub')
    )
  );

create index idx_diagnosis_user_id on public.diagnosis_results (user_id);
