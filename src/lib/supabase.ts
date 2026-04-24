import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client.
 *
 * Uses the service role key — NEVER import this file from client components.
 * Row-Level Security is bypassed by this key, so keep it strictly server-side
 * (API routes, server actions, server components).
 */

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) {
    return null;
  }
  if (!cached) {
    cached = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}
