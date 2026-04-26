import { SupabaseClient } from '@supabase/supabase-js';

/** Anonymous sign-in (non-blocking). Auth state change is handled by onAuthStateChange. */
export function initiateAnonymousSignIn(supabase: SupabaseClient): void {
  supabase.auth.signInAnonymously();
}

/** Email/password sign-up (non-blocking). */
export function initiateEmailSignUp(
  supabase: SupabaseClient,
  email: string,
  password: string
): void {
  supabase.auth.signUp({ email, password });
}

/** Email/password sign-in (non-blocking). */
export function initiateEmailSignIn(
  supabase: SupabaseClient,
  email: string,
  password: string
): void {
  supabase.auth.signInWithPassword({ email, password });
}

/** Sign out (non-blocking). */
export function initiateSignOut(supabase: SupabaseClient): void {
  supabase.auth.signOut();
}