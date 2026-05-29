import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock as LockIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
// Use supabase.auth.signInWithOAuth directly so Google sign-in works on
// non-Lovable hosts (e.g. Netlify), where the /~oauth/* broker worker is
// not present and would otherwise return a blank SPA page.

type Mode = "signin" | "signup";

export function AuthGate({ onAuthed }: { onAuthed: () => void }) {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  // If a session already exists (e.g., post-OAuth redirect), dismiss.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) onAuthed();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) onAuthed();
    });
    return () => sub.subscription.unsubscribe();
  }, [onAuthed]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created — check your email to verify, then sign in.");
        setMode("signin");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        toast.error(error.message ?? "Google sign-in failed");
        setBusy(false);
      }
      // On success the browser is redirected to Google; nothing else to do.
    } catch (err) {
      toast.error(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-[#05050b] px-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 38%, oklch(0.45 0.22 295 / 0.35), transparent 70%), radial-gradient(45% 35% at 50% 75%, oklch(0.6 0.18 210 / 0.22), transparent 70%)",
        }}
      />

      <motion.form
        onSubmit={submit}
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[0_0_60px_-20px_oklch(0.6_0.27_295/0.6)]"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)]">
          <LockIcon className="h-6 w-6 text-white" strokeWidth={2.4} />
        </div>

        <h2
          className="mt-6 text-center text-xl font-light tracking-[0.18em] text-white uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h2>
        <p className="mt-1 text-center text-xs uppercase tracking-[0.28em] text-white/40">
          Cross-device sync
        </p>

        <button
          type="button"
          onClick={google}
          disabled={busy}
          className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08] disabled:opacity-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden>
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5 17.6 35.5 12.5 30.4 12.5 24S17.6 12.5 24 12.5c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.8 0 19.5-7.8 19.5-19.5 0-1.3-.1-2.3-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.5 2.2-7.1 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39 16.2 43.5 24 43.5z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.1 5C40.9 35.3 43.5 30 43.5 24c0-1.2-.1-2.4-.3-3.5z" />
          </svg>
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <label className="relative block">
          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-white/40" />
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-white/10 bg-black/40 py-3 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[oklch(0.78_0.2_295)]"
          />
        </label>
        <label className="relative mt-3 block">
          <LockIcon className="absolute left-3 top-3.5 h-4 w-4 text-white/40" />
          <input
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-white/10 bg-black/40 py-3 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[oklch(0.78_0.2_295)]"
          />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)] px-5 py-3 text-sm font-medium uppercase tracking-[0.22em] text-white shadow-[0_0_28px_-8px_oklch(0.6_0.27_295)] transition disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? "Sign In" : "Sign Up"}
        </button>

        <p className="mt-5 text-center text-xs text-white/50">
          {mode === "signin" ? "No account yet?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-[oklch(0.78_0.2_295)] underline-offset-2 hover:underline"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </motion.form>
    </motion.div>
  );
}
