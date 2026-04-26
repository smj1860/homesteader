```tsx
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from 'react';
import { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { createClient } from './config';

// ── Context shape ──────────────────────────────────────────────────────────
interface SupabaseContextState {
  supabase: SupabaseClient;
  user: User | null;
  session: Session | null;
  isUserLoading: boolean;
}

const SupabaseContext = createContext<SupabaseContextState | undefined>(undefined);

// ── Provider ───────────────────────────────────────────────────────────────
export function SupabaseProvider({ children }: { children: ReactNode }) {
  // Create a single browser client for the lifetime of the app
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    // Load the initial session immediately
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsUserLoading(false);
    });

    // Subscribe to auth changes (mirrors onAuthStateChanged)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsUserLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const value = useMemo(
    () => ({ supabase, user, session, isUserLoading }),
    [supabase, user, session, isUserLoading]
  );

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

// ── Hooks (drop-in replacements for useFirebase / useUser) ─────────────────
export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error('useSupabase must be used within SupabaseProvider');
  return ctx;
}

export function useUser() {
  const { user, isUserLoading } = useSupabase();
  return { user, isUserLoading, userError: null };
}

export function useSupabaseClient() {
  return useSupabase().supabase;
}
```
