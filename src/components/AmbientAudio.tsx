import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music2, Music } from "lucide-react";

const SRC_DEFAULT = "/audio/ambient.mp3";
const LS_VOL = "tj_amb_vol";
const LS_MUTED = "tj_amb_muted";
const LS_ENABLED = "tj_amb_enabled";
const LS_SRC = "tj_amb_src";
const LS_VOL_MIGRATION = "tj_amb_vol_migrated_v2";
const DEFAULT_VOL = 0.05;
type Ctx = {
  enabled: boolean;
  muted: boolean;
  volume: number; // 0..1
  src: string;
  setEnabled: (b: boolean) => void;
  setMuted: (b: boolean) => void;
  setVolume: (v: number) => void;
  setSrc: (s: string) => void;
  activate: () => void; // call when dashboard becomes visible
  deactivate: () => void;
};

const AmbientCtx = createContext<Ctx | null>(null);

export function useAmbient() {
  const c = useContext(AmbientCtx);
  if (!c) throw new Error("AmbientProvider missing");
  return c;
}

function readLS<T>(key: string, fallback: T, parse: (s: string) => T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return parse(raw);
  } catch {
    return fallback;
  }
}

export function AmbientProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(true);
  const [muted, setMutedState] = useState(false);
  const [volume, setVolumeState] = useState(0.05);
  const [src, setSrcState] = useState(SRC_DEFAULT);
  const [active, setActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const pendingPlay = useRef(false);

  // hydrate from LS
  useEffect(() => {
    // One-time migration: reset stale 0.18 default to new 0.05 default
    try {
      if (!localStorage.getItem(LS_VOL_MIGRATION)) {
        const raw = localStorage.getItem(LS_VOL);
        if (raw != null) {
          const v = parseFloat(raw);
          if (!isNaN(v) && Math.abs(v - 0.18) < 0.001) {
            localStorage.setItem(LS_VOL, String(DEFAULT_VOL));
          }
        }
        localStorage.setItem(LS_VOL_MIGRATION, "1");
      }
    } catch {}
    setVolumeState(readLS(LS_VOL, DEFAULT_VOL, (s) => Math.min(1, Math.max(0, parseFloat(s)))));
    setMutedState(readLS(LS_MUTED, false, (s) => s === "1"));
    setEnabledState(readLS(LS_ENABLED, true, (s) => s !== "0"));
    setSrcState(readLS(LS_SRC, SRC_DEFAULT, (s) => s || SRC_DEFAULT));
  }, []);

  // construct audio element once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = new Audio();
    a.loop = true;
    a.preload = "auto";
    a.volume = 0;
    a.crossOrigin = "anonymous";
    audioRef.current = a;
    return () => {
      a.pause();
      a.src = "";
      audioRef.current = null;
    };
  }, []);

  // src updates
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.src !== window.location.origin + src && !a.src.endsWith(src)) {
      a.src = src;
      a.load();
    }
  }, [src]);

  const fadeTo = useCallback((target: number, ms = 900) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeRef.current) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
    const start = a.volume;
    const startTs = performance.now();
    fadeRef.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - startTs) / ms);
      const v = start + (target - start) * t;
      try { a.volume = Math.min(1, Math.max(0, v)); } catch {}
      if (t >= 1 && fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 30);
  }, []);

  // effective volume target
  const effective = enabled && !muted && active ? volume : 0;

  // react to changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (effective > 0) {
      if (a.paused) {
        const p = a.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            pendingPlay.current = true;
            const onFirst = () => {
              pendingPlay.current = false;
              a.play().catch(() => {});
              window.removeEventListener("pointerdown", onFirst);
              window.removeEventListener("keydown", onFirst);
            };
            window.addEventListener("pointerdown", onFirst, { once: true });
            window.addEventListener("keydown", onFirst, { once: true });
          });
        }
      }
      fadeTo(effective, 1200);
    } else {
      fadeTo(0, 600);
      // pause after fade
      const id = window.setTimeout(() => {
        if (audioRef.current && audioRef.current.volume <= 0.001) {
          audioRef.current.pause();
        }
      }, 800);
      return () => window.clearTimeout(id);
    }
  }, [effective, fadeTo]);

  // persistence wrappers
  const setVolume = (v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    setVolumeState(clamped);
    try { localStorage.setItem(LS_VOL, String(clamped)); } catch {}
  };
  const setMuted = (b: boolean) => {
    setMutedState(b);
    try { localStorage.setItem(LS_MUTED, b ? "1" : "0"); } catch {}
  };
  const setEnabled = (b: boolean) => {
    setEnabledState(b);
    try { localStorage.setItem(LS_ENABLED, b ? "1" : "0"); } catch {}
  };
  const setSrc = (s: string) => {
    setSrcState(s);
    try { localStorage.setItem(LS_SRC, s); } catch {}
  };

  const activate = () => setActive(true);
  const deactivate = () => setActive(false);

  return (
    <AmbientCtx.Provider
      value={{ enabled, muted, volume, src, setEnabled, setMuted, setVolume, setSrc, activate, deactivate }}
    >
      {children}
    </AmbientCtx.Provider>
  );
}

export function AmbientControls() {
  const { enabled, muted, volume, setEnabled, setMuted, setVolume, setSrc } = useAmbient();
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setSrc(url);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ambient audio"
        className="group flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2 text-sm text-foreground/80 backdrop-blur transition hover:text-foreground hover:border-[oklch(0.6_0.27_295/0.5)]"
      >
        <span className="relative grid h-5 w-5 place-items-center">
          {enabled && !muted ? (
            <Music2 className="h-4 w-4 text-[oklch(0.78_0.18_295)]" />
          ) : (
            <Music className="h-4 w-4 text-muted-foreground" />
          )}
          {enabled && !muted && (
            <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[oklch(0.6_0.27_295/0.25)]" />
          )}
        </span>
        <span className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground sm:inline">
          Ambient
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.03_280/0.92)] p-4 shadow-[0_20px_60px_-15px_oklch(0.4_0.25_295/0.6)] backdrop-blur-xl"
            style={{
              backgroundImage:
                "radial-gradient(120% 80% at 0% 0%, oklch(0.6 0.27 295 / 0.12), transparent 60%), radial-gradient(120% 80% at 100% 100%, oklch(0.55 0.25 220 / 0.12), transparent 60%)",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">Ambient Mode</p>
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative h-5 w-9 rounded-full border transition ${
                  enabled
                    ? "border-[oklch(0.6_0.27_295/0.6)] bg-[oklch(0.6_0.27_295/0.4)]"
                    : "border-white/15 bg-white/5"
                }`}
                aria-label="Toggle ambient"
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    enabled ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <button
                onClick={() => setMuted(!muted)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="ambient-slider w-full"
                  style={{ ["--val" as any]: `${Math.round(volume * 100)}%` }}
                  aria-label="Volume"
                />
                <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/40">
                  <span>0</span>
                  <span>{Math.round(volume * 100)}%</span>
                  <span>100</span>
                </div>
              </div>
            </div>


            <div className="border-t border-white/5 pt-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Replace audio file
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={onPickFile}
              />
              <p className="mt-2 text-[10px] leading-relaxed text-white/40">
                Cinematic loop · Tokyo penthouse ambience · synced with dashboard session.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
