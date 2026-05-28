import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function AccessGranted({ onComplete }: { onComplete: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio("/audio/unlock.mp3");
    a.volume = 0.35;
    a.loop = false;
    audioRef.current = a;
    a.play().catch(() => {});
    const t = setTimeout(() => onComplete(), 4000);
    return () => {
      clearTimeout(t);
      try {
        a.pause();
        a.src = "";
      } catch {}
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[95] grid place-items-center overflow-hidden bg-[#04060c]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 42%, oklch(0.7 0.22 150 / 0.28), transparent 70%), radial-gradient(45% 35% at 50% 70%, oklch(0.55 0.22 280 / 0.18), transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent), radial-gradient(1px 1px at 65% 20%, white, transparent)",
          backgroundSize: "600px 600px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{
            scale: [0.85, 1, 1.04, 1],
            opacity: 1,
            boxShadow: [
              "0 0 0px 0px oklch(0.75 0.2 150 / 0)",
              "0 0 50px 4px oklch(0.75 0.22 150 / 0.45)",
              "0 0 90px 10px oklch(0.78 0.22 150 / 0.65)",
              "0 0 60px 6px oklch(0.75 0.22 150 / 0.5)",
            ],
          }}
          transition={{ duration: 3.6, times: [0, 0.5, 0.75, 1], ease: "easeOut" }}
          className="grid h-32 w-32 place-items-center rounded-full border border-[oklch(0.75_0.22_150/0.4)] bg-[oklch(0.18_0.08_160/0.35)] backdrop-blur"
        >
          <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none">
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="oklch(0.78 0.22 150)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              style={{ filter: "drop-shadow(0 0 6px oklch(0.78 0.22 150 / 0.6))" }}
            />
            <motion.path
              d="M18 33 L28 43 L46 23"
              stroke="oklch(0.85 0.22 150)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
              style={{ filter: "drop-shadow(0 0 10px oklch(0.85 0.25 150 / 0.85))" }}
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-10 text-2xl font-light tracking-[0.32em] text-white uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Access Granted
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.9 }}
          className="mt-3 text-xs uppercase tracking-[0.28em] text-white/50"
        >
          Welcome back, Mik.
        </motion.p>
      </div>
    </motion.div>
  );
}
