import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";

export const ACCESS_KEY = "tj_access_unlocked";
const ACCESS_CODE = "2151";

export function isAccessUnlocked(): boolean {
  try {
    return sessionStorage.getItem(ACCESS_KEY) === "1";
  } catch {
    return false;
  }
}
export function resetAccess() {
  try {
    sessionStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(ACCESS_KEY);
  } catch {}
}
export function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, []);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (unlocking) return;
    if (code.trim() === ACCESS_CODE) {
      setError(false);
      setUnlocking(true);
      try {
        sessionStorage.setItem(ACCESS_KEY, "1");
      } catch {}
      onUnlock();
    } else {
      setError(true);
      setCode("");
      setTimeout(() => setError(false), 1800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent), radial-gradient(1px 1px at 65% 20%, white, transparent)",
          backgroundSize: "600px 600px",
        }}
      />

      <motion.form
        onSubmit={submit}
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl shadow-[0_0_60px_-20px_oklch(0.6_0.27_295/0.6)]"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 30px -10px oklch(0.6 0.27 295 / 0.5)",
              "0 0 55px -5px oklch(0.6 0.27 295 / 0.9)",
              "0 0 30px -10px oklch(0.6 0.27 295 / 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)]"
        >
          <Lock className="h-6 w-6 text-white" strokeWidth={2.4} />
        </motion.div>

        <h2
          className="mt-6 text-xl font-light tracking-[0.18em] text-white uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Enter Access Code
        </h2>
        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/40">
          Restricted Terminal
        </p>

        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={unlocking}
          placeholder="••••"
          className={`mt-8 w-full rounded-lg border bg-black/40 px-4 py-3 text-center text-2xl tracking-[0.6em] text-white outline-none transition-all
            ${error ? "border-[var(--neon-red,oklch(0.65_0.27_20))] shadow-[0_0_20px_-4px_oklch(0.65_0.27_20)]" : "border-white/10 focus:border-[oklch(0.78_0.2_295)] focus:shadow-[0_0_22px_-4px_oklch(0.78_0.2_295)]"}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-xs uppercase tracking-[0.22em] text-[oklch(0.7_0.25_20)]"
            >
              Invalid access code
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={unlocking || code.length === 0}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)] px-5 py-3 text-sm font-medium uppercase tracking-[0.22em] text-white shadow-[0_0_28px_-8px_oklch(0.6_0.27_295)] transition disabled:opacity-50"
        >
          {unlocking ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Unlocking
            </>
          ) : (
            <>Unlock</>
          )}
        </button>

        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/30">
          Authorized traders only
        </p>
      </motion.form>
    </motion.div>
  );
}
