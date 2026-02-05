import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const role = requestUrl.searchParams.get('role') as 'candidate' | 'company' | null;
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Ignore - can't set cookies in server component
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      // Sync the Google user with our backend to create/update profile
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const syncResponse = await fetch(`${apiUrl}/api/v1/auth/google/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.session.access_token}`,
          },
          body: JSON.stringify({ role: role || 'candidate' }),
        });

        const syncResult = await syncResponse.json();

        if (!syncResponse.ok) {
          // Handle specific errors like company domain validation
          if (syncResult.error?.includes('company Google Workspace')) {
            return NextResponse.redirect(
              new URL('/signup/company?error=domain_required', requestUrl.origin)
            );
          }
          // Other sync errors - log but continue to dashboard
          console.error('Profile sync error:', syncResult.error);
        } else if (syncResult.data?.is_new_user && !syncResult.data?.profile_complete) {
          // New user with incomplete profile - redirect to onboarding
          return NextResponse.redirect(new URL('/onboarding', requestUrl.origin));
        }
      } catch (syncError) {
        // Log error but don't block login - profile can be synced later
        console.error('Failed to sync Google profile:', syncError);
      }

      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));
}
