import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, L as Link, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, O as Outlet, u as useLocation } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { T as Trigger, I as Icon, S as ScrollUpButton, a as ScrollDownButton, P as Portal, C as Content2, V as Viewport, L as Label$1, b as Item, c as ItemIndicator, d as ItemText, e as Separator, R as Root2, f as Value } from "../_libs/radix-ui__react-select.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { V as VolumeX, a as Volume2, T as TrendingUp, L as Lock, b as LoaderCircle, C as Calendar, M as Music2, c as Music, d as ChevronDown, e as ChevronUp, f as Check } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const APEX_ACCOUNT = {
  accountName: "PA-APEX-528639-06",
  propFirm: "Apex Trader Funding",
  startingBalance: 5e4,
  profitTarget: 2600,
  // delta to reach $52,600 minimum payout balance
  maxDrawdown: 2500,
  riskDivisor: 7,
  remainingDrawdown: 1341
};
const APEX_SESSIONS = [
  { date: "2026-04-15", balance: 49217.44, pnl: -782.56, fills: 6 },
  { date: "2026-04-16", balance: 49701.82, pnl: 484.38, fills: 3 },
  { date: "2026-04-23", balance: 49474.74, pnl: -227.08, fills: 2 },
  { date: "2026-04-28", balance: 49815.96, pnl: 341.22, fills: 4 },
  { date: "2026-04-29", balance: 49810.34, pnl: -5.62, fills: 3 },
  { date: "2026-04-30", balance: 50590.18, pnl: 779.84, fills: 4 },
  { date: "2026-05-07", balance: 50073.48, pnl: -516.7, fills: 8 },
  { date: "2026-05-12", balance: 50059.4, pnl: -14.08, fills: 2 },
  { date: "2026-05-13", balance: 50289.62, pnl: 230.22, fills: 4 },
  { date: "2026-05-19", balance: 50755.54, pnl: 465.92, fills: 2 },
  { date: "2026-05-20", balance: 51148, pnl: 392.46, fills: 2 },
  { date: "2026-05-21", balance: 50830.68, pnl: -317.32, fills: 5 },
  { date: "2026-05-22", balance: 51058.1, pnl: 227.42, fills: 3 },
  { date: "2026-05-26", balance: 50463.66, pnl: -594.44, fills: 4 },
  { date: "2026-05-27", balance: 51063.08, pnl: 599.42, fills: 3 },
  { date: "2026-05-28", balance: 50555.88, pnl: -507.2, fills: 2 }
];
function buildApexTrades() {
  return APEX_SESSIONS.map((s, i) => ({
    id: `apex-${s.date}`,
    date: `${s.date}T15:00:00`,
    instrument: "MNQ",
    direction: s.pnl >= 0 ? "long" : "short",
    entry: 0,
    stopLoss: 0,
    takeProfit: 0,
    exit: 0,
    risk: Math.max(50, Math.round(Math.abs(s.pnl))),
    reward: Math.max(50, Math.round(Math.abs(s.pnl))),
    rMultiple: s.pnl >= 0 ? 1 : -1,
    pnl: s.pnl,
    fills: s.fills,
    setupType: "Apex Session",
    setupGrade: s.pnl >= 0 ? "A+" : "B",
    session: "NY",
    mistakes: "",
    emotions: "",
    notes: `Imported Apex session • ${s.fills} fills • Balance $${s.balance.toFixed(2)}`
  }));
}
const STORAGE_KEY = "tj_state_v5";
const defaultChecklistItems = [
  { id: "1", label: "Slept 7+ hours", checked: false },
  { id: "2", label: "No revenge trading mindset", checked: false },
  { id: "3", label: "Reviewed plan", checked: false },
  { id: "4", label: "Marked key levels", checked: false },
  { id: "5", label: "Risk per trade ≤ allowed risk", checked: false },
  { id: "6", label: "I will follow my rules", checked: false }
];
const defaultRedFlags = [
  { id: "1", label: "Emotional trading", flagged: false },
  { id: "2", label: "Revenge trading", flagged: false },
  { id: "3", label: "Overtrading", flagged: false },
  { id: "4", label: "Increasing risk after loss", flagged: false },
  { id: "5", label: "Chasing the market", flagged: false }
];
function buildDefaultState() {
  return {
    account: { ...APEX_ACCOUNT },
    trades: buildApexTrades(),
    checklist: defaultChecklistItems,
    redFlags: defaultRedFlags,
    notes: "",
    journals: {},
    notesByDate: {},
    checklistByDate: {},
    weeklyReviews: {},
    apexImported: true
  };
}
const emptyState = {
  account: { ...APEX_ACCOUNT },
  trades: [],
  checklist: defaultChecklistItems,
  redFlags: defaultRedFlags,
  notes: "",
  journals: {},
  notesByDate: {},
  checklistByDate: {},
  weeklyReviews: {},
  apexImported: false
};
const AppStoreCtx = reactExports.createContext(null);
function AppStoreProvider({ children }) {
  const [state, setState] = reactExports.useState(emptyState);
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...emptyState, ...parsed });
      } else {
        setState(buildDefaultState());
      }
    } catch {
      setState(buildDefaultState());
    }
    setHydrated(true);
  }, []);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
    }
  }, [state, hydrated]);
  const value = reactExports.useMemo(
    () => ({
      state,
      hydrated,
      setAccount: (a) => setState((s) => ({ ...s, account: { ...s.account, ...a } })),
      addTrade: (t) => setState((s) => {
        const trade = {
          ...t,
          id: crypto.randomUUID(),
          rMultiple: t.risk ? +(t.pnl / t.risk).toFixed(2) : 0
        };
        return { ...s, trades: [trade, ...s.trades] };
      }),
      updateTrade: (id, patch) => setState((s) => ({
        ...s,
        trades: s.trades.map((t) => {
          if (t.id !== id) return t;
          const merged = { ...t, ...patch };
          merged.rMultiple = merged.risk ? +(merged.pnl / merged.risk).toFixed(2) : 0;
          return merged;
        })
      })),
      deleteTrade: (id) => setState((s) => ({ ...s, trades: s.trades.filter((t) => t.id !== id) })),
      toggleChecklist: (id) => setState((s) => ({
        ...s,
        checklist: s.checklist.map((c) => c.id === id ? { ...c, checked: !c.checked } : c)
      })),
      setChecklist: (items) => setState((s) => ({ ...s, checklist: items })),
      toggleRedFlag: (id) => setState((s) => ({
        ...s,
        redFlags: s.redFlags.map((c) => c.id === id ? { ...c, flagged: !c.flagged } : c)
      })),
      setRedFlags: (items) => setState((s) => ({ ...s, redFlags: items })),
      setNotes: (notes) => setState((s) => ({ ...s, notes })),
      setJournal: (date, j) => setState((s) => ({
        ...s,
        journals: {
          ...s.journals,
          [date]: {
            date,
            emotion: s.journals[date]?.emotion ?? 7,
            discipline: s.journals[date]?.discipline ?? 7,
            confidence: s.journals[date]?.confidence ?? 7,
            sleepHours: s.journals[date]?.sleepHours ?? 7,
            marketCondition: s.journals[date]?.marketCondition ?? "",
            sessionNotes: s.journals[date]?.sessionNotes ?? "",
            ...j
          }
        }
      })),
      getNotesForDate: (date) => state.notesByDate[date] ?? "",
      setNotesForDate: (date, n) => setState((s) => ({ ...s, notesByDate: { ...s.notesByDate, [date]: n } })),
      getChecklistForDate: (date) => state.checklistByDate[date] ?? s_template(state.checklist),
      setChecklistForDate: (date, items) => setState((s) => ({ ...s, checklistByDate: { ...s.checklistByDate, [date]: items } })),
      toggleChecklistForDate: (date, id) => setState((s) => {
        const current = s.checklistByDate[date] ?? s_template(s.checklist);
        const next = current.map((c) => c.id === id ? { ...c, checked: !c.checked } : c);
        return { ...s, checklistByDate: { ...s.checklistByDate, [date]: next } };
      }),
      getWeeklyReview: (key) => state.weeklyReviews[key],
      setWeeklyReview: (key, r) => setState((s) => ({
        ...s,
        weeklyReviews: {
          ...s.weeklyReviews,
          [key]: {
            weekKey: key,
            wins: s.weeklyReviews[key]?.wins ?? "",
            mistakes: s.weeklyReviews[key]?.mistakes ?? "",
            improvements: s.weeklyReviews[key]?.improvements ?? "",
            notes: s.weeklyReviews[key]?.notes ?? "",
            updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
            ...r
          }
        }
      })),
      clearTrades: () => setState((s) => ({ ...s, trades: [], apexImported: false })),
      reset: () => setState(buildDefaultState()),
      loadApexData: () => setState((s) => ({
        ...s,
        account: { ...s.account, ...APEX_ACCOUNT },
        trades: buildApexTrades(),
        apexImported: true
      })),
      setApexImported: (v) => setState((s) => ({ ...s, apexImported: v }))
    }),
    [state, hydrated]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppStoreCtx.Provider, { value, children });
}
function s_template(master) {
  return master.map((c) => ({ ...c, checked: false }));
}
const useAppStore = () => {
  const ctx = reactExports.useContext(AppStoreCtx);
  if (!ctx) throw new Error("useAppStore must be inside AppStoreProvider");
  return ctx;
};
const SRC_DEFAULT = "/audio/ambient.mp3";
const LS_VOL = "tj_amb_vol";
const LS_MUTED = "tj_amb_muted";
const LS_ENABLED = "tj_amb_enabled";
const LS_SRC = "tj_amb_src";
const LS_VOL_MIGRATION = "tj_amb_vol_migrated_v2";
const DEFAULT_VOL = 0.05;
const AmbientCtx = reactExports.createContext(null);
function useAmbient() {
  const c = reactExports.useContext(AmbientCtx);
  if (!c) throw new Error("AmbientProvider missing");
  return c;
}
function readLS(key, fallback, parse) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return parse(raw);
  } catch {
    return fallback;
  }
}
function AmbientProvider({ children }) {
  const [enabled, setEnabledState] = reactExports.useState(true);
  const [muted, setMutedState] = reactExports.useState(false);
  const [volume, setVolumeState] = reactExports.useState(0.05);
  const [src, setSrcState] = reactExports.useState(SRC_DEFAULT);
  const [active, setActive] = reactExports.useState(false);
  const audioRef = reactExports.useRef(null);
  const fadeRef = reactExports.useRef(null);
  const pendingPlay = reactExports.useRef(false);
  reactExports.useEffect(() => {
    try {
      if (!localStorage.getItem(LS_VOL_MIGRATION)) {
        const raw = localStorage.getItem(LS_VOL);
        if (raw != null) {
          const v = parseFloat(raw);
          if (!isNaN(v) && Math.abs(v - 0.18) < 1e-3) {
            localStorage.setItem(LS_VOL, String(DEFAULT_VOL));
          }
        }
        localStorage.setItem(LS_VOL_MIGRATION, "1");
      }
    } catch {
    }
    setVolumeState(readLS(LS_VOL, DEFAULT_VOL, (s) => Math.min(1, Math.max(0, parseFloat(s)))));
    setMutedState(readLS(LS_MUTED, false, (s) => s === "1"));
    setEnabledState(readLS(LS_ENABLED, true, (s) => s !== "0"));
    setSrcState(readLS(LS_SRC, SRC_DEFAULT, (s) => s || SRC_DEFAULT));
  }, []);
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.src !== window.location.origin + src && !a.src.endsWith(src)) {
      a.src = src;
      a.load();
    }
  }, [src]);
  const fadeTo = reactExports.useCallback((target, ms = 900) => {
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
      try {
        a.volume = Math.min(1, Math.max(0, v));
      } catch {
      }
      if (t >= 1 && fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 30);
  }, []);
  const effective = enabled && !muted && active ? volume : 0;
  reactExports.useEffect(() => {
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
              a.play().catch(() => {
              });
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
      const id = window.setTimeout(() => {
        if (audioRef.current && audioRef.current.volume <= 1e-3) {
          audioRef.current.pause();
        }
      }, 800);
      return () => window.clearTimeout(id);
    }
  }, [effective, fadeTo]);
  const setVolume = (v) => {
    const clamped = Math.min(1, Math.max(0, v));
    setVolumeState(clamped);
    try {
      localStorage.setItem(LS_VOL, String(clamped));
    } catch {
    }
  };
  const setMuted = (b) => {
    setMutedState(b);
    try {
      localStorage.setItem(LS_MUTED, b ? "1" : "0");
    } catch {
    }
  };
  const setEnabled = (b) => {
    setEnabledState(b);
    try {
      localStorage.setItem(LS_ENABLED, b ? "1" : "0");
    } catch {
    }
  };
  const setSrc = (s) => {
    setSrcState(s);
    try {
      localStorage.setItem(LS_SRC, s);
    } catch {
    }
  };
  const activate = () => setActive(true);
  const deactivate = () => setActive(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AmbientCtx.Provider,
    {
      value: { enabled, muted, volume, src, setEnabled, setMuted, setVolume, setSrc, activate, deactivate },
      children
    }
  );
}
function AmbientControls() {
  const { enabled, muted, volume, setEnabled, setMuted, setVolume, setSrc } = useAmbient();
  const [open, setOpen] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setSrc(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        "aria-label": "Ambient audio",
        className: "group flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2 text-sm text-foreground/80 backdrop-blur transition hover:text-foreground hover:border-[oklch(0.6_0.27_295/0.5)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative grid h-5 w-5 place-items-center", children: [
            enabled && !muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-4 w-4 text-[oklch(0.78_0.18_295)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "h-4 w-4 text-muted-foreground" }),
            enabled && !muted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-0 animate-ping rounded-full bg-[oklch(0.6_0.27_295/0.25)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-xs uppercase tracking-[0.18em] text-muted-foreground sm:inline", children: "Ambient" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.98 },
        transition: { duration: 0.18, ease: "easeOut" },
        className: "absolute right-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.03_280/0.92)] p-4 shadow-[0_20px_60px_-15px_oklch(0.4_0.25_295/0.6)] backdrop-blur-xl",
        style: {
          backgroundImage: "radial-gradient(120% 80% at 0% 0%, oklch(0.6 0.27 295 / 0.12), transparent 60%), radial-gradient(120% 80% at 100% 100%, oklch(0.55 0.25 220 / 0.12), transparent 60%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.28em] text-white/50", children: "Ambient Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setEnabled(!enabled),
                className: `relative h-5 w-9 rounded-full border transition ${enabled ? "border-[oklch(0.6_0.27_295/0.6)] bg-[oklch(0.6_0.27_295/0.4)]" : "border-white/15 bg-white/5"}`,
                "aria-label": "Toggle ambient",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4" : "translate-x-0.5"}`
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setMuted(!muted),
                className: "grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10",
                "aria-label": muted ? "Unmute" : "Mute",
                children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.01,
                  value: volume,
                  onChange: (e) => setVolume(parseFloat(e.target.value)),
                  className: "ambient-slider w-full",
                  style: { ["--val"]: `${Math.round(volume * 100)}%` },
                  "aria-label": "Volume"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  Math.round(volume * 100),
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/5 pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => fileRef.current?.click(),
                className: "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/10 hover:text-white",
                children: "Replace audio file"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: "audio/*",
                className: "hidden",
                onChange: onPickFile
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] leading-relaxed text-white/40", children: "Cinematic loop · Tokyo penthouse ambience · synced with dashboard session." })
          ] })
        ]
      }
    ) })
  ] });
}
const tabs = [
  { to: "/", label: "Dashboard" },
  { to: "/journal", label: "Daily Journal" },
  { to: "/trades", label: "Trade Log" },
  { to: "/weekly", label: "Weekly Review" },
  { to: "/setups", label: "Setup Review" },
  { to: "/payout", label: "Payout" },
  { to: "/settings", label: "Settings" }
];
function TopNav({ accountName, propFirm }) {
  const { pathname } = useLocation();
  const [today, setToday] = reactExports.useState("");
  reactExports.useEffect(() => {
    setToday(
      (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    );
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.header,
    {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.4 },
      className: "flex flex-wrap items-center gap-4 px-4 py-4 lg:px-8 lg:py-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)] shadow-[0_0_30px_-5px_oklch(0.6_0.27_295/0.7)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-6 w-6 text-white", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display-num text-xl tracking-wide text-foreground sm:text-2xl", children: accountName.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label text-muted-foreground", children: propFirm })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "order-3 flex flex-1 flex-wrap items-center justify-center gap-2 lg:order-2", children: tabs.map((t) => {
          const active = pathname === t.to;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: t.to, className: "tab-pill", "data-active": active, children: t.label }, t.to);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 ml-auto flex items-center gap-2 lg:order-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AmbientControls, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2 text-sm text-foreground backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: today }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" })
          ] })
        ] })
      ]
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
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
  "Every correctly executed trade strengthens your future identity."
];
const GRATITUDE = [
  "Another day to execute.",
  "Grateful for the opportunity to improve.",
  "Calm execution compounds.",
  "The market owes nothing. Discipline earns everything.",
  "You’re already further than you once dreamed."
];
const SOUND_KEY = "tj_intro_sound";
const SEEN_KEY = "tj_intro_seen";
function todayKey() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function playHum(ctx, muted) {
  if (muted) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = 55;
  g.gain.value = 0;
  o.connect(g).connect(ctx.destination);
  o.start();
  g.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.8);
  g.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
  o.stop(ctx.currentTime + 3.1);
}
function playWhoosh(ctx, muted) {
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
function playClick(ctx, muted) {
  if (muted) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.value = 1800;
  g.gain.value = 1e-3;
  o.connect(g).connect(ctx.destination);
  o.start();
  g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + 0.18);
  o.stop(ctx.currentTime + 0.2);
}
function IntroScreen({ onComplete }) {
  const [quote] = reactExports.useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [gratitude] = reactExports.useState(() => GRATITUDE[Math.floor(Math.random() * GRATITUDE.length)]);
  const [muted, setMuted] = reactExports.useState(false);
  const [visible, setVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    try {
      const s = localStorage.getItem(SOUND_KEY);
      if (s === "muted" || s == null) {
        localStorage.setItem(SOUND_KEY, "on");
        setMuted(false);
      } else {
        setMuted(s === "muted");
      }
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    let ctx = null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    } catch {
    }
    const timers = [];
    const schedule = () => {
      if (!ctx) return;
      playHum(ctx, muted);
      timers.push(window.setTimeout(() => ctx && playWhoosh(ctx, muted), 350));
      timers.push(window.setTimeout(() => ctx && playWhoosh(ctx, muted), 1100));
      timers.push(window.setTimeout(() => ctx && playClick(ctx, muted), 2500));
    };
    if (ctx) {
      if (ctx.state === "suspended") {
        const resume = () => {
          ctx?.resume().then(schedule).catch(() => {
          });
          window.removeEventListener("pointerdown", resume);
          window.removeEventListener("keydown", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
        window.addEventListener("keydown", resume, { once: true });
        ctx.resume().then(schedule).catch(() => {
        });
      } else {
        schedule();
      }
    }
    const t = window.setTimeout(() => finish(), 5e3);
    timers.push(t);
    return () => {
      timers.forEach((id) => clearTimeout(id));
      try {
        sessionStorage.setItem(SEEN_KEY, todayKey());
      } catch {
      }
      if (ctx && ctx.state !== "closed") ctx.close().catch(() => {
      });
    };
  }, []);
  const finish = () => {
    setVisible(false);
    try {
      localStorage.setItem(SEEN_KEY, todayKey());
    } catch {
    }
    setTimeout(onComplete, 600);
  };
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem(SOUND_KEY, next ? "muted" : "on");
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
      className: "fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#05050b]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            "aria-hidden": true,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 1.4 },
            className: "pointer-events-none absolute inset-0",
            style: {
              background: "radial-gradient(60% 50% at 50% 40%, oklch(0.4 0.22 295 / 0.35), transparent 70%), radial-gradient(50% 40% at 50% 70%, oklch(0.55 0.18 210 / 0.22), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 opacity-40",
            animate: { backgroundPosition: ["0% 0%", "100% 100%"] },
            transition: { duration: 12, repeat: Infinity, repeatType: "reverse" },
            style: {
              backgroundImage: "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent), radial-gradient(1px 1px at 65% 20%, white, transparent)",
              backgroundSize: "600px 600px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-5 top-5 z-10 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: toggleMute,
              "aria-label": muted ? "Unmute" : "Mute",
              className: "rounded-full border border-white/10 bg-white/5 p-2 text-white/70 backdrop-blur transition hover:text-white",
              children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: finish,
              className: "rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70 backdrop-blur transition hover:text-white",
              children: "Skip"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.85 },
              animate: {
                opacity: 1,
                scale: 1,
                boxShadow: [
                  "0 0 40px -10px oklch(0.6 0.27 295 / 0.6)",
                  "0 0 70px -5px oklch(0.6 0.27 295 / 0.9)",
                  "0 0 40px -10px oklch(0.6 0.27 295 / 0.6)"
                ]
              },
              transition: {
                opacity: { duration: 0.9, delay: 0.2 },
                scale: { duration: 0.9, delay: 0.2 },
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              },
              className: "grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)]",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-9 w-9 text-white", strokeWidth: 2.4 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.7 },
              className: "mt-8 text-3xl font-light tracking-wide text-white sm:text-4xl",
              style: { fontFamily: "'Space Grotesk', sans-serif" },
              children: [
                "Welcome back, ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: "Mik" }),
                "."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.9, delay: 1.2 },
              className: "mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg",
              style: { fontFamily: "'Inter', sans-serif" },
              children: [
                "“",
                quote,
                "”"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1, delay: 1.8 },
              className: "mt-5 text-xs uppercase tracking-[0.32em] text-white/40",
              children: gratitude
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 h-px w-56 overflow-hidden rounded-full bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { x: "-100%" },
              animate: { x: "100%" },
              transition: { duration: 2.4, ease: "easeInOut", delay: 0.4 },
              className: "h-full w-full bg-gradient-to-r from-transparent via-[oklch(0.78_0.2_295)] to-transparent shadow-[0_0_12px_oklch(0.78_0.2_295)]"
            }
          ) })
        ] })
      ]
    }
  ) });
}
function shouldShowIntro() {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== todayKey();
  } catch {
    return true;
  }
}
const ACCESS_KEY = "tj_access_unlocked";
const ACCESS_CODE = "2151";
function isAccessUnlocked() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(ACCESS_KEY) === "1";
  } catch {
    return false;
  }
}
function resetAccess() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(ACCESS_KEY);
  } catch {
  }
}
function AccessGate({ onUnlock }) {
  const [code, setCode] = reactExports.useState("");
  const [error, setError] = reactExports.useState(false);
  const [unlocking, setUnlocking] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, []);
  const submit = (e) => {
    e?.preventDefault();
    if (unlocking) return;
    if (code.trim() === ACCESS_CODE) {
      setError(false);
      setUnlocking(true);
      try {
        sessionStorage.setItem(ACCESS_KEY, "1");
      } catch {
      }
      onUnlock();
    } else {
      setError(true);
      setCode("");
      setTimeout(() => setError(false), 1800);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
      className: "fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-[#05050b] px-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0",
            style: {
              background: "radial-gradient(55% 45% at 50% 38%, oklch(0.45 0.22 295 / 0.35), transparent 70%), radial-gradient(45% 35% at 50% 75%, oklch(0.6 0.18 210 / 0.22), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 opacity-30",
            animate: { backgroundPosition: ["0% 0%", "100% 100%"] },
            transition: { duration: 14, repeat: Infinity, repeatType: "reverse" },
            style: {
              backgroundImage: "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent), radial-gradient(1px 1px at 65% 20%, white, transparent)",
              backgroundSize: "600px 600px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.form,
          {
            onSubmit: submit,
            initial: { y: 18, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.6, delay: 0.15 },
            className: "relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl shadow-[0_0_60px_-20px_oklch(0.6_0.27_295/0.6)]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: {
                    boxShadow: [
                      "0 0 30px -10px oklch(0.6 0.27 295 / 0.5)",
                      "0 0 55px -5px oklch(0.6 0.27 295 / 0.9)",
                      "0 0 30px -10px oklch(0.6 0.27 295 / 0.5)"
                    ]
                  },
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  className: "mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)]",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-white", strokeWidth: 2.4 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "mt-6 text-xl font-light tracking-[0.18em] text-white uppercase",
                  style: { fontFamily: "'Space Grotesk', sans-serif" },
                  children: "Enter Access Code"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs uppercase tracking-[0.28em] text-white/40", children: "Restricted Terminal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  type: "password",
                  inputMode: "numeric",
                  autoComplete: "off",
                  value: code,
                  onChange: (e) => setCode(e.target.value),
                  disabled: unlocking,
                  placeholder: "••••",
                  className: `mt-8 w-full rounded-lg border bg-black/40 px-4 py-3 text-center text-2xl tracking-[0.6em] text-white outline-none transition-all
            ${error ? "border-[var(--neon-red,oklch(0.65_0.27_20))] shadow-[0_0_20px_-4px_oklch(0.65_0.27_20)]" : "border-white/10 focus:border-[oklch(0.78_0.2_295)] focus:shadow-[0_0_22px_-4px_oklch(0.78_0.2_295)]"}`,
                  style: { fontFamily: "'Space Grotesk', sans-serif" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: -4 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0 },
                  className: "mt-3 text-xs uppercase tracking-[0.22em] text-[oklch(0.7_0.25_20)]",
                  children: "Invalid access code"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: unlocking || code.length === 0,
                  className: "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)] px-5 py-3 text-sm font-medium uppercase tracking-[0.22em] text-white shadow-[0_0_28px_-8px_oklch(0.6_0.27_295)] transition disabled:opacity-50",
                  children: unlocking ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                    " Unlocking"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Unlock" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[10px] uppercase tracking-[0.3em] text-white/30", children: "Authorized traders only" })
            ]
          }
        )
      ]
    }
  );
}
function AccessGranted({ onComplete }) {
  const audioRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const a = new Audio("/audio/unlock.mp3");
    a.volume = 0.35;
    a.loop = false;
    audioRef.current = a;
    a.play().catch(() => {
    });
    const t = setTimeout(() => onComplete(), 4e3);
    return () => {
      clearTimeout(t);
      try {
        a.pause();
        a.src = "";
      } catch {
      }
    };
  }, [onComplete]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
      className: "fixed inset-0 z-[95] grid place-items-center overflow-hidden bg-[#04060c]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0",
            style: {
              background: "radial-gradient(55% 45% at 50% 42%, oklch(0.7 0.22 150 / 0.28), transparent 70%), radial-gradient(45% 35% at 50% 70%, oklch(0.55 0.22 280 / 0.18), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 opacity-25",
            animate: { backgroundPosition: ["0% 0%", "100% 100%"] },
            transition: { duration: 12, repeat: Infinity, repeatType: "reverse" },
            style: {
              backgroundImage: "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent), radial-gradient(1px 1px at 65% 20%, white, transparent)",
              backgroundSize: "600px 600px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.85, opacity: 0 },
              animate: {
                scale: [0.85, 1, 1.04, 1],
                opacity: 1,
                boxShadow: [
                  "0 0 0px 0px oklch(0.75 0.2 150 / 0)",
                  "0 0 50px 4px oklch(0.75 0.22 150 / 0.45)",
                  "0 0 90px 10px oklch(0.78 0.22 150 / 0.65)",
                  "0 0 60px 6px oklch(0.75 0.22 150 / 0.5)"
                ]
              },
              transition: { duration: 3.6, times: [0, 0.5, 0.75, 1], ease: "easeOut" },
              className: "grid h-32 w-32 place-items-center rounded-full border border-[oklch(0.75_0.22_150/0.4)] bg-[oklch(0.18_0.08_160/0.35)] backdrop-blur",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 64 64", className: "h-20 w-20", fill: "none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.circle,
                  {
                    cx: "32",
                    cy: "32",
                    r: "28",
                    stroke: "oklch(0.78 0.22 150)",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    initial: { pathLength: 0, opacity: 0.5 },
                    animate: { pathLength: 1, opacity: 1 },
                    transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] },
                    style: { filter: "drop-shadow(0 0 6px oklch(0.78 0.22 150 / 0.6))" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.path,
                  {
                    d: "M18 33 L28 43 L46 23",
                    stroke: "oklch(0.85 0.22 150)",
                    strokeWidth: "4",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    initial: { pathLength: 0 },
                    animate: { pathLength: 1 },
                    transition: { duration: 1.6, delay: 0.9, ease: [0.65, 0, 0.35, 1] },
                    style: { filter: "drop-shadow(0 0 10px oklch(0.85 0.25 150 / 0.85))" }
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 2.4 },
              className: "mt-10 text-2xl font-light tracking-[0.32em] text-white uppercase",
              style: { fontFamily: "'Space Grotesk', sans-serif" },
              children: "Access Granted"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 2.9 },
              className: "mt-3 text-xs uppercase tracking-[0.28em] text-white/50",
              children: "Welcome back, Mik."
            }
          )
        ] })
      ]
    }
  );
}
const appCss = "/assets/styles-DHIKqh2K.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-10 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display-num text-7xl neon-text-purple", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "tab-pill mt-6 inline-block",
        "data-active": "true",
        children: "Go home"
      }
    )
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Trading Journal — Premium Performance Analytics" },
      {
        name: "description",
        content: "Premium futures trading journal & performance analytics. Track drawdown, equity curve, setup quality, and risk in real-time."
      },
      { property: "og:title", content: "Trading Journal — Premium Performance Analytics" },
      { name: "twitter:title", content: "Trading Journal — Premium Performance Analytics" },
      { name: "description", content: "Apex Trade Journal is a production-grade SaaS platform for traders to meticulously log, analyze, and optimize their performance." },
      { property: "og:description", content: "Apex Trade Journal is a production-grade SaaS platform for traders to meticulously log, analyze, and optimize their performance." },
      { name: "twitter:description", content: "Apex Trade Journal is a production-grade SaaS platform for traders to meticulously log, analyze, and optimize their performance." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fc3f1713-cfad-494a-bf98-7b384bf22303/id-preview-af91bc70--aefbc9ba-8e54-41f5-93bd-c1767990e1e7.lovable.app-1779994446530.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fc3f1713-cfad-494a-bf98-7b384bf22303/id-preview-af91bc70--aefbc9ba-8e54-41f5-93bd-c1767990e1e7.lovable.app-1779994446530.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function ShellInner() {
  const { state } = useAppStore();
  const [mounted, setMounted] = reactExports.useState(false);
  const [phase, setPhase] = reactExports.useState("loading");
  reactExports.useEffect(() => {
    setMounted(true);
    const unlocked = isAccessUnlocked();
    if (shouldShowIntro()) {
      setPhase("intro");
    } else {
      setPhase(unlocked ? "app" : "gate");
    }
  }, []);
  const ambient = useAmbient();
  reactExports.useEffect(() => {
    if (!mounted) return;
    if (phase === "app") {
      const t = setTimeout(() => ambient.activate(), 400);
      return () => clearTimeout(t);
    } else {
      ambient.deactivate();
    }
  }, [phase, ambient, mounted]);
  const afterIntro = () => {
    setPhase(isAccessUnlocked() ? "app" : "gate");
  };
  if (!mounted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#05050b]" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    phase === "intro" && /* @__PURE__ */ jsxRuntimeExports.jsx(IntroScreen, { onComplete: afterIntro }),
    phase === "gate" && /* @__PURE__ */ jsxRuntimeExports.jsx(AccessGate, { onUnlock: () => setPhase("granted") }),
    phase === "granted" && /* @__PURE__ */ jsxRuntimeExports.jsx(AccessGranted, { onComplete: () => setPhase("app") }),
    phase === "app" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, { accountName: state.account.accountName, propFirm: state.account.propFirm }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "px-4 pb-12 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppStoreProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AmbientProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShellInner, {}) }) }) });
}
const $$splitComponentImporter$6 = () => import("./weekly-ChdfLsW2.mjs");
const Route$6 = createFileRoute("/weekly")({
  head: () => ({
    meta: [{
      title: "Weekly Review — Trading Journal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const Select = Root2;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = Trigger.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = Label$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
    ]
  }
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = Separator.displayName;
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const $$splitComponentImporter$5 = () => import("./trades-C4rWoehH.mjs");
const Route$5 = createFileRoute("/trades")({
  head: () => ({
    meta: [{
      title: "Trade Log — Trading Journal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const emptyTrade = () => ({
  date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
  instrument: "NQ",
  direction: "long",
  entry: 0,
  stopLoss: 0,
  takeProfit: 0,
  exit: 0,
  risk: 0,
  reward: 0,
  pnl: 0,
  fills: 1,
  setupType: "Breakout",
  setupGrade: "A+",
  session: "NY AM",
  mistakes: "",
  emotions: "",
  notes: "",
  image15m: void 0,
  image1m: void 0
});
const tradeToForm = (t) => ({
  date: t.date.slice(0, 16),
  instrument: t.instrument,
  direction: t.direction,
  entry: t.entry,
  stopLoss: t.stopLoss,
  takeProfit: t.takeProfit,
  exit: t.exit,
  risk: t.risk,
  reward: t.reward,
  pnl: t.pnl,
  fills: t.fills ?? 1,
  setupType: t.setupType,
  setupGrade: t.setupGrade,
  session: t.session,
  mistakes: t.mistakes,
  emotions: t.emotions,
  notes: t.notes,
  image15m: t.image15m,
  image1m: t.image1m
});
async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function TradeFormFields({
  form,
  setForm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value: form.date, onChange: (e) => setForm({
      ...form,
      date: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instrument", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.instrument, onChange: (e) => setForm({
      ...form,
      instrument: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Direction", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.direction, onValueChange: (v) => setForm({
      ...form,
      direction: v
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "long", children: "Long" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "short", children: "Short" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Session", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.session, onChange: (e) => setForm({
      ...form,
      session: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Entry", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.entry, onChange: (e) => setForm({
      ...form,
      entry: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Stop Loss", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.stopLoss, onChange: (e) => setForm({
      ...form,
      stopLoss: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Take Profit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.takeProfit, onChange: (e) => setForm({
      ...form,
      takeProfit: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Exit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.exit, onChange: (e) => setForm({
      ...form,
      exit: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Risk ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.risk, onChange: (e) => setForm({
      ...form,
      risk: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Reward ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.reward, onChange: (e) => setForm({
      ...form,
      reward: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PnL ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.pnl, onChange: (e) => setForm({
      ...form,
      pnl: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fills / Trades", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.fills ?? 1, onChange: (e) => setForm({
      ...form,
      fills: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Setup Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.setupType, onChange: (e) => setForm({
      ...form,
      setupType: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Setup Grade", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.setupGrade, onValueChange: (v) => setForm({
      ...form,
      setupGrade: v
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "A+", children: "A+" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "B", children: "B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "C", children: "C" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Emotions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.emotions, onChange: (e) => setForm({
      ...form,
      emotions: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mistakes", className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.mistakes, onChange: (e) => setForm({
      ...form,
      mistakes: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes", className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.notes, onChange: (e) => setForm({
      ...form,
      notes: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "15m Timeframe Screenshot", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageField, { value: form.image15m, onChange: (v) => setForm({
      ...form,
      image15m: v
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "1m Timeframe Screenshot", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageField, { value: form.image1m, onChange: (v) => setForm({
      ...form,
      image1m: v
    }) }) })
  ] });
}
function Field({
  label,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col gap-1.5 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: label }),
    children
  ] });
}
function ImageField({
  value,
  onChange
}) {
  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await fileToDataUrl(f);
    onChange(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "", className: "h-16 w-24 rounded-md border border-border object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onChange(void 0), className: "absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[var(--neon-red)] text-[10px] text-white", "aria-label": "Remove", children: "×" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-24 place-items-center rounded-md border border-dashed border-border bg-background/40 text-[10px] text-muted-foreground", children: "No image" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/*", onChange: onFile, className: "border-border/50 bg-background/40 text-xs" })
  ] });
}
const $$splitComponentImporter$4 = () => import("./setups-T4l35s-4.mjs");
const Route$4 = createFileRoute("/setups")({
  head: () => ({
    meta: [{
      title: "Setup Review — Trading Journal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./settings-D7wlcHIg.mjs");
const Route$3 = createFileRoute("/settings")({
  head: () => ({
    meta: [{
      title: "Settings — Trading Journal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./payout-BHTywdLi.mjs");
const Route$2 = createFileRoute("/payout")({
  head: () => ({
    meta: [{
      title: "Payout Status — Trading Journal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./journal-BfTLHK5D.mjs");
const Route$1 = createFileRoute("/journal")({
  head: () => ({
    meta: [{
      title: "Daily Journal — Trading Journal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DIHb9HtO.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Dashboard — Trading Journal"
    }, {
      name: "description",
      content: "Real-time dashboard with drawdown, equity curve, daily PnL, setup quality, and risk meter."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WeeklyRoute = Route$6.update({
  id: "/weekly",
  path: "/weekly",
  getParentRoute: () => Route$7
});
const TradesRoute = Route$5.update({
  id: "/trades",
  path: "/trades",
  getParentRoute: () => Route$7
});
const SetupsRoute = Route$4.update({
  id: "/setups",
  path: "/setups",
  getParentRoute: () => Route$7
});
const SettingsRoute = Route$3.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$7
});
const PayoutRoute = Route$2.update({
  id: "/payout",
  path: "/payout",
  getParentRoute: () => Route$7
});
const JournalRoute = Route$1.update({
  id: "/journal",
  path: "/journal",
  getParentRoute: () => Route$7
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  JournalRoute,
  PayoutRoute,
  SettingsRoute,
  SetupsRoute,
  TradesRoute,
  WeeklyRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Input as I,
  Label as L,
  Select as S,
  Textarea as T,
  SelectTrigger as a,
  SelectValue as b,
  SelectContent as c,
  SelectItem as d,
  TradeFormFields as e,
  cn as f,
  emptyTrade as g,
  router as h,
  resetAccess as r,
  tradeToForm as t,
  useAppStore as u
};
