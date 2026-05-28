import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Volume2, VolumeX } from "lucide-react";

const QUOTES = [
  "Your edge works whether you feel confident or not.",
  "Profitable traders trust process more than emotion.",
  "A single red day changes nothing about a profitable system.",
  "Your job is execution. The outcome belongs to probability.",
  "Calm traders survive long enough to compound.",
  "You already proved the strategy works. Now let patience work.",
  "The market rewards discipline long before it rewards ego.",
  "Stress comes from trying to control outcomes instead of actions.",
  "Winning traders think in probabilities, not moments.",
  "Every correctly executed trade strengthens your future identity.",
];

const GRATITUDE = [
  "Another day to execute.",
  "Grateful for the opportunity to improve.",
  "Calm execution compounds.",
  "The market owes nothing. Discipline earns everything.",
  "You’re already further than you once dreamed.",
];

const SOUND_KEY = "tj_intro_sound";
const SEEN_KEY = "tj_intro_seen";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// Subtle WebAudio cues — no external assets.
function playHum(ctx: AudioContext, muted: boolean) {
  if (muted) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = 55;
  g.gain.value = 0;
  o.connect(g).connect(ctx.destination);
  o.start();
  g.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.8);
  g.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.0);
  o.stop(ctx.currentTime + 3.1);
}

function playWhoosh(ctx: AudioContext, muted: boolean) {
  if (muted) return;
  const bufferSize = ctx.sampleRate * 0.6;
  const noise = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 800;
  filter.Q.value = 0.7;
  const g = ctx.createGain();
  g.gain.value = 0.05;
  src.connect(filter).connect(g).connect(ctx.destination);
  src.start();
}

function playClick(ctx: AudioContext, muted: boolean) {
  if (muted) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.value = 1800;
  g.gain.value = 0.001;
  o.connect(g).connect(ctx.destination);
  o.start();
  g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
  o.stop(ctx.currentTime + 0.2);
}

export function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [gratitude] = useState(() => GRATITUDE[Math.floor(Math.random() * GRATITUDE.length)]);
  const [muted, setMuted] = useState<boolean>(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Force unmuted default — reset any legacy stored muted value
    try {
      const s = localStorage.getItem(SOUND_KEY);
      if (s === "muted" || s == null) {
        localStorage.setItem(SOUND_KEY, "on");
        setMuted(false);
      } else {
        setMuted(s === "muted");
      }
    } catch {}
  }, []);

  useEffect(() => {
    let ctx: AudioContext | null = null;
    try {
      const AC = (window.AudioContext || (window as any).webkitAudioContext);
      if (AC) ctx = new AC();
    } catch {}
    const timers: number[] = [];
    const schedule = () => {
      if (!ctx) return;
      playHum(ctx, muted);
      timers.push(window.setTimeout(() => ctx && playWhoosh(ctx, muted), 350));
      timers.push(window.setTimeout(() => ctx && playWhoosh(ctx, muted), 1100));
      timers.push(window.setTimeout(() => ctx && playClick(ctx, muted), 2500));
    };
    if (ctx) {
      if (ctx.state === "suspended") {
        // Autoplay blocked — resume on first interaction, then play unmuted
        const resume = () => {
          ctx?.resume().then(schedule).catch(() => {});
          window.removeEventListener("pointerdown", resume);
          window.removeEventListener("keydown", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
        window.addEventListener("keydown", resume, { once: true });
        // Also try immediately in case state flips
        ctx.resume().then(schedule).catch(() => {});
      } else {
        schedule();
      }
    }
    const t = window.setTimeout(() => finish(), 5000);
    timers.push(t);
    return () => {
      timers.forEach((id) => clearTimeout(id));
      try { sessionStorage.setItem(SEEN_KEY, todayKey()); } catch {}
      if (ctx && ctx.state !== "closed") ctx.close().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    setVisible(false);
    try { localStorage.setItem(SEEN_KEY, todayKey()); } catch {}
    setTimeout(onComplete, 600);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try { localStorage.setItem(SOUND_KEY, next ? "muted" : "on"); } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#05050b]"
        >
          {/* ambient gradients */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, oklch(0.4 0.22 295 / 0.35), transparent 70%), radial-gradient(50% 40% at 50% 70%, oklch(0.55 0.18 210 / 0.22), transparent 70%)",
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent), radial-gradient(1px 1px at 65% 20%, white, transparent)",
              backgroundSize: "600px 600px",
            }}
          />

          {/* skip + mute */}
          <div className="absolute right-5 top-5 z-10 flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 backdrop-blur transition hover:text-white"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={finish}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70 backdrop-blur transition hover:text-white"
            >
              Skip
            </button>
          </div>

          <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                boxShadow: [
                  "0 0 40px -10px oklch(0.6 0.27 295 / 0.6)",
                  "0 0 70px -5px oklch(0.6 0.27 295 / 0.9)",
                  "0 0 40px -10px oklch(0.6 0.27 295 / 0.6)",
                ],
              }}
              transition={{
                opacity: { duration: 0.9, delay: 0.2 },
                scale: { duration: 0.9, delay: 0.2 },
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)]"
            >
              <TrendingUp className="h-9 w-9 text-white" strokeWidth={2.4} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 text-3xl font-light tracking-wide text-white sm:text-4xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Welcome back, <span className="font-semibold text-white">Mik</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2 }}
              className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              “{quote}”
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.8 }}
              className="mt-5 text-xs uppercase tracking-[0.32em] text-white/40"
            >
              {gratitude}
            </motion.p>

            <div className="mt-10 h-px w-56 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }}
                className="h-full w-full bg-gradient-to-r from-transparent via-[oklch(0.78_0.2_295)] to-transparent shadow-[0_0_12px_oklch(0.78_0.2_295)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function shouldShowIntro(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== todayKey();
  } catch {
    return true;
  }
}


