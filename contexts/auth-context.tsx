'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { authApi, type User } from '@/lib/api/auth';
import type { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  role: 'candidate' | 'company' | 'admin';
  auth_provider: string;
  has_password: boolean;
  profile_complete: boolean;
  profile: Record<string, unknown> | null;
  created_at: string;
}

interface AuthContextType {
  user: SupabaseUser | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasPassword: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  hasPassword: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      if (abortSignal?.aborted) return;
      const data = await authApi.me();
      if (!abortSignal?.aborted) {
        setProfile(data as unknown as UserProfile);
      }
    } catch (error) {
      // Only log if not aborted
      if (!abortSignal?.aborted) {
        console.warn('Failed to fetch profile:', error);
        setProfile(null);
      }
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }: { data: { session: Session | null } }) => {
      if (abortController.signal.aborted) return;
      
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        fetchProfile(abortController.signal).finally(() => {
          if (!abortController.signal.aborted) {
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(false);
      }
    }).catch(() => {
      // Ignore errors if aborted
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, newSession: Session | null) => {
      if (abortController.signal.aborted) return;
      
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await fetchProfile(abortController.signal);
      } else {
        setProfile(null);
      }

      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    });

    return () => {
      abortController.abort();
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isAuthenticated: !!user,
        hasPassword: profile?.has_password ?? true,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
