-- 1. Create minimal keep_alive table constrained to a single harmless row
CREATE TABLE IF NOT EXISTS public.keep_alive (
  id smallint PRIMARY KEY DEFAULT 1,
  status text NOT NULL DEFAULT 'alive',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT keep_alive_single_row CHECK (id = 1)
);

COMMENT ON TABLE public.keep_alive IS 'Minimal read-only table for Supabase Free Plan keep-alive pings via GitHub Actions.';

-- 2. Insert the single harmless row (idempotent)
INSERT INTO public.keep_alive (id, status)
VALUES (1, 'alive')
ON CONFLICT (id) DO NOTHING;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.keep_alive ENABLE ROW LEVEL SECURITY;

-- 4. Lock down table privileges: revoke all writes, allow only SELECT for anon
REVOKE ALL ON TABLE public.keep_alive FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.keep_alive TO anon;

-- 5. Create strict anonymous SELECT-only RLS policy
DROP POLICY IF EXISTS "Allow anonymous read-only keep_alive" ON public.keep_alive;

CREATE POLICY "Allow anonymous read-only keep_alive"
  ON public.keep_alive
  FOR SELECT
  TO anon
  USING (true);