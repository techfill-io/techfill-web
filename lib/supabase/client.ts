import { createBrowserClient } from '@supabase/ssr';

let _supabase: ReturnType<typeof createBrowserClient> | null = null;

// Lazily create the browser client to avoid crashing during
// Next.js static page generation when env vars are not available.
export function getSupabaseBrowserClient() {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
    }

    _supabase = createBrowserClient(supabaseUrl, supabaseKey);
  }

  return _supabase;
}
