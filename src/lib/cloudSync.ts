import { supabase } from "@/integrations/supabase/client";
import type { AppState } from "./types";

/**
 * Cloud persistence helpers. One row per user in public.user_app_state,
 * column `state` is a JSONB blob holding the full AppState.
 */
export async function fetchCloudState(userId: string): Promise<AppState | null> {
  try {
    const { data, error } = await supabase
      .from("user_app_state")
      .select("state")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) {
      console.error("[cloudSync] fetch failed", error.message);
      return null;
    }
    if (!data) return null;
    return (data.state as unknown as AppState) ?? null;
  } catch (e) {
    console.error("[cloudSync] fetch exception", e);
    return null;
  }
}

export async function pushCloudState(userId: string, state: AppState): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("user_app_state")
      .upsert(
        {
          user_id: userId,
          state: state as never,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
    if (error) {
      console.error("[cloudSync] push failed", error.message);
      return false;
    }
    if (import.meta.env.DEV) console.log("[cloudSync] state pushed to cloud");
    return true;
  } catch (e) {
    console.error("[cloudSync] push exception", e);
    return false;
  }
}
