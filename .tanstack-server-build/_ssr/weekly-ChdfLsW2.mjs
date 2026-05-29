import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, L as Label, T as Textarea, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as TradeFormFields, t as tradeToForm } from "./router-DJBrMM3J.mjs";
import { f as fmtMoney, a as fmtPct } from "./calc-DZy82t1v.mjs";
import { E as EquityCurve, D as DailyPnlChart } from "./Charts-DGkg40Pt.mjs";
import { B as Button } from "./button-CZ_3TZow.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DQklp8fb.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { g as CalendarDays, h as LayoutGrid, i as ChevronLeft, j as ChevronRight, f as Check, k as CircleCheck, l as CircleDashed, m as Trophy, n as TrendingDown, F as Flame, E as Eye, P as Pencil, o as Trash2, I as ImageOff } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-select.mjs";
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
import "../_libs/recharts.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function getIsoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 864e5 + 1) / 7);
  return {
    year: date.getUTCFullYear(),
    week
  };
}
function isoWeekKey(d) {
  const {
    year,
    week
  } = getIsoWeek(d);
  return `${year}-W${String(week).padStart(2, "0")}`;
}
function isoWeekKeyOf(year, week) {
  return `${year}-W${String(week).padStart(2, "0")}`;
}
function dateFromIsoWeek(year, week) {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dow = simple.getUTCDay();
  const monday = new Date(simple);
  if (dow <= 4) monday.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  else monday.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  return monday;
}
function weekRange(anchor) {
  const d = new Date(anchor);
  const day = d.getDay() || 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - (day - 1));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return {
    monday,
    sunday
  };
}
function fmtRange(monday, sunday) {
  const opt = {
    month: "short",
    day: "numeric"
  };
  return `${monday.toLocaleDateString("en-US", opt)} – ${sunday.toLocaleDateString("en-US", {
    ...opt,
    year: "numeric"
  })}`;
}
function fmtRangeShort(monday, sunday) {
  const opt = {
    month: "short",
    day: "numeric"
  };
  return `${monday.toLocaleDateString("en-US", opt)} – ${sunday.toLocaleDateString("en-US", opt)}`;
}
function weeksInIsoYear(year) {
  const jan1 = new Date(Date.UTC(year, 0, 1)).getUTCDay();
  const isLeap = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  return jan1 === 4 || isLeap && jan1 === 3 ? 53 : 52;
}
function computeWeekStats(trades) {
  const totalPnl = trades.reduce((s, t) => s + (t.pnl || 0), 0);
  const wins = trades.filter((t) => t.pnl > 0);
  const losses = trades.filter((t) => t.pnl < 0);
  const winRate = trades.length ? wins.length / trades.length * 100 : 0;
  const avgWin = wins.length ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
  const avgLoss = losses.length ? Math.abs(losses.reduce((s, t) => s + t.pnl, 0) / losses.length) : 0;
  const rr = avgLoss ? avgWin / avgLoss : 0;
  const byDay = {};
  trades.forEach((t) => {
    const k = new Date(t.date).toISOString().slice(0, 10);
    byDay[k] = (byDay[k] || 0) + t.pnl;
  });
  const dayVals = Object.values(byDay);
  const bestDay = dayVals.length ? Math.max(...dayVals) : 0;
  const worstDay = dayVals.length ? Math.min(...dayVals) : 0;
  return {
    totalPnl,
    winRate,
    rr,
    count: trades.length,
    avgWin,
    avgLoss,
    bestDay,
    worstDay
  };
}
function reviewHasContent(r) {
  if (!r) return false;
  return Boolean((r.wins || "").trim() || (r.mistakes || "").trim() || (r.improvements || "").trim() || (r.notes || "").trim());
}
function WeeklyPage() {
  const [mode, setMode] = reactExports.useState("current");
  const [anchor, setAnchor] = reactExports.useState(() => /* @__PURE__ */ new Date());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "mx-auto flex max-w-[1600px] flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card flex flex-wrap items-center gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-lg border border-border/40 bg-background/40 p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("current"), className: `flex items-center gap-2 rounded-md px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all ${mode === "current" ? "bg-gradient-to-r from-[var(--neon-purple)]/30 to-[var(--neon-cyan)]/20 text-foreground shadow-[0_0_18px_-6px_var(--neon-purple)]" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
          "Current Week"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("year"), className: `flex items-center gap-2 rounded-md px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all ${mode === "year" ? "bg-gradient-to-r from-[var(--neon-purple)]/30 to-[var(--neon-cyan)]/20 text-foreground shadow-[0_0_18px_-6px_var(--neon-purple)]" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
          "Year Overview"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto text-xs uppercase tracking-[0.18em] text-muted-foreground", children: mode === "current" ? "Weekly review · single week" : "Annual review archive" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: mode === "current" ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      y: -6
    }, transition: {
      duration: 0.25
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrentWeekView, { anchor, setAnchor }) }, "current") : /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      y: -6
    }, transition: {
      duration: 0.25
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(YearOverview, { onOpenWeek: (d) => {
      setAnchor(d);
      setMode("current");
    } }) }, "year") })
  ] });
}
function CurrentWeekView({
  anchor,
  setAnchor
}) {
  const {
    state,
    getWeeklyReview,
    setWeeklyReview,
    hydrated
  } = useAppStore();
  const {
    monday,
    sunday
  } = reactExports.useMemo(() => weekRange(anchor), [anchor]);
  const weekKey = reactExports.useMemo(() => isoWeekKey(anchor), [anchor]);
  const weekTrades = reactExports.useMemo(() => state.trades.filter((t) => {
    const td = new Date(t.date).getTime();
    return td >= monday.getTime() && td <= sunday.getTime();
  }), [state.trades, monday, sunday]);
  const stats = reactExports.useMemo(() => computeWeekStats(weekTrades), [weekTrades]);
  const equity = reactExports.useMemo(() => {
    let bal = state.account.startingBalance;
    const byDay = {};
    weekTrades.forEach((t) => {
      const k = new Date(t.date).toISOString().slice(0, 10);
      byDay[k] = (byDay[k] || 0) + t.pnl;
    });
    return Object.keys(byDay).sort().map((k) => {
      bal += byDay[k];
      return {
        date: k.slice(5),
        balance: Math.round(bal)
      };
    });
  }, [weekTrades, state.account.startingBalance]);
  const dailyPnl = reactExports.useMemo(() => {
    const byDay = {};
    weekTrades.forEach((t) => {
      const k = new Date(t.date).toISOString().slice(0, 10);
      byDay[k] = (byDay[k] || 0) + t.pnl;
    });
    return Object.keys(byDay).sort().map((k) => ({
      date: k.slice(5),
      pnl: Math.round(byDay[k])
    }));
  }, [weekTrades]);
  const existing = getWeeklyReview(weekKey);
  const blank = {
    wins: "",
    mistakes: "",
    improvements: "",
    notes: ""
  };
  const [draft, setDraft] = reactExports.useState(existing ?? blank);
  const [status, setStatus] = reactExports.useState("saved");
  const [created, setCreated] = reactExports.useState(!!existing);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    const e = getWeeklyReview(weekKey);
    setDraft(e ?? blank);
    setCreated(!!e);
    setStatus("saved");
  }, [weekKey, hydrated]);
  reactExports.useEffect(() => {
    if (status !== "dirty") return;
    const t = setTimeout(() => {
      setWeeklyReview(weekKey, draft);
      setStatus("saving");
      setTimeout(() => setStatus("saved"), 200);
    }, 700);
    return () => clearTimeout(t);
  }, [draft]);
  const update = (patch) => {
    setDraft((d) => ({
      ...d,
      ...patch
    }));
    setStatus("dirty");
  };
  const saveNow = () => {
    setWeeklyReview(weekKey, draft);
    setCreated(true);
    setStatus("saved");
    toast.success(`Saved review for ${weekKey}`);
  };
  const shiftWeek = (delta) => {
    const next = new Date(anchor);
    next.setDate(next.getDate() + delta * 7);
    setAnchor(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card flex flex-wrap items-center gap-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display-num neon-text-purple text-xl", children: "Weekly Review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          weekKey,
          " · ",
          fmtRange(monday, sunday)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => shiftWeek(-1), "aria-label": "Previous week", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setAnchor(/* @__PURE__ */ new Date()), className: "text-xs", children: "This week" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => shiftWeek(1), "aria-label": "Next week", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-4", children: [{
      label: "Weekly PnL",
      value: fmtMoney(stats.totalPnl, true),
      color: stats.totalPnl >= 0 ? "neon-text-green" : "neon-text-pink"
    }, {
      label: "Win Rate",
      value: fmtPct(stats.winRate),
      color: "neon-text-cyan"
    }, {
      label: "R:R Ratio",
      value: stats.rr.toFixed(2),
      color: "neon-text-orange"
    }, {
      label: "Trades",
      value: stats.count.toString(),
      color: "neon-text-purple"
    }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card glass-card-hover p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label text-muted-foreground", children: c.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `display-num mt-2 text-2xl ${c.color}`, children: c.value })
    ] }, c.label)) }),
    weekTrades.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No trades recorded for this week." }),
      !created && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveNow, className: "mt-4 bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white", children: "Create review for this week" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EquityCurve, { data: equity.length ? equity : [{
        date: "—",
        balance: state.account.startingBalance
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DailyPnlChart, { data: dailyPnl })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan", children: "Review Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${status === "saved" ? "text-[var(--neon-green)]" : status === "dirty" ? "text-[var(--neon-orange)]" : "text-muted-foreground"}`, children: [
          status === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
          status === "saved" ? "Saved" : status === "dirty" ? "Unsaved changes" : "Saving…"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: "Wins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.wins, onChange: (e) => update({
            wins: e.target.value
          }), className: "mt-2 h-28 border-border/50 bg-background/40", placeholder: "What worked this week?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: "Mistakes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.mistakes, onChange: (e) => update({
            mistakes: e.target.value
          }), className: "mt-2 h-28 border-border/50 bg-background/40", placeholder: "What broke down?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: "Improvements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.improvements, onChange: (e) => update({
            improvements: e.target.value
          }), className: "mt-2 h-28 border-border/50 bg-background/40", placeholder: "What will you do differently?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: "General Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.notes, onChange: (e) => update({
            notes: e.target.value
          }), className: "mt-2 h-28 border-border/50 bg-background/40", placeholder: "Anything else worth remembering." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveNow, className: "mt-6 bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white shadow-[0_0_24px_-6px_var(--neon-purple)]", children: "Save Weekly Review" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyTradesSection, { trades: weekTrades, stats, monday })
  ] });
}
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function localDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function WeeklyTradesSection({
  trades,
  stats,
  monday
}) {
  const {
    updateTrade,
    deleteTrade
  } = useAppStore();
  const [editId, setEditId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [openDayKey, setOpenDayKey] = reactExports.useState(null);
  const tradesByDay = reactExports.useMemo(() => {
    const map = {};
    trades.forEach((t) => {
      const k = localDateKey(new Date(t.date));
      (map[k] ||= []).push(t);
    });
    Object.values(map).forEach((arr) => arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    return map;
  }, [trades]);
  const days = reactExports.useMemo(() => {
    return Array.from({
      length: 7
    }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      d.setHours(0, 0, 0, 0);
      const key = localDateKey(d);
      const list = tradesByDay[key] || [];
      const pnl = list.reduce((s, t) => s + (t.pnl || 0), 0);
      const fills = list.reduce((s, t) => s + (t.fills ?? 1), 0);
      return {
        date: d,
        key,
        name: DAY_NAMES[i],
        trades: list,
        pnl,
        fills
      };
    });
  }, [monday, tradesByDay]);
  const totals = reactExports.useMemo(() => {
    const tradedDays = days.filter((d) => d.trades.length > 0);
    const wins = tradedDays.filter((d) => d.pnl > 0).length;
    const losses = tradedDays.filter((d) => d.pnl < 0).length;
    const totalFills = days.reduce((s, d) => s + d.fills, 0);
    const totalPnl = days.reduce((s, d) => s + d.pnl, 0);
    const best = tradedDays.length ? Math.max(...tradedDays.map((d) => d.pnl)) : 0;
    const worst = tradedDays.length ? Math.min(...tradedDays.map((d) => d.pnl)) : 0;
    return {
      wins,
      losses,
      totalFills,
      totalPnl,
      best,
      worst
    };
  }, [days]);
  const bestTrade = reactExports.useMemo(() => trades.reduce((acc, t) => !acc || t.pnl > acc.pnl ? t : acc, null), [trades]);
  const worstTrade = reactExports.useMemo(() => trades.reduce((acc, t) => !acc || t.pnl < acc.pnl ? t : acc, null), [trades]);
  const openEdit = (t) => {
    setForm(tradeToForm(t));
    setEditId(t.id);
  };
  const saveEdit = () => {
    if (!editId || !form) return;
    updateTrade(editId, {
      ...form,
      date: new Date(form.date).toISOString()
    });
    setEditId(null);
    setForm(null);
    toast.success("Trade updated");
  };
  const removeTrade = (id) => {
    deleteTrade(id);
    toast.success("Trade deleted");
  };
  const openDay = openDayKey ? days.find((d) => d.key === openDayKey) ?? null : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan", children: "This Week’s Trades" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: [
        totals.totalFills,
        " fills · ",
        trades.length,
        " ",
        trades.length === 1 ? "session" : "sessions"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Weekly PnL", value: fmtMoney(totals.totalPnl, true), accent: totals.totalPnl >= 0 ? "green" : "pink" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Fills", value: String(totals.totalFills), accent: "purple" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Winning Days", value: String(totals.wins), accent: "green" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Losing Days", value: String(totals.losses), accent: "pink" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Best Day", value: totals.best ? fmtMoney(totals.best, true) : "—", accent: "green" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Worst Day", value: totals.worst ? fmtMoney(totals.worst, true) : "—", accent: "pink" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Win Rate", value: fmtPct(stats.winRate), accent: "cyan" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7", children: days.map((d, i) => {
      const has = d.trades.length > 0;
      const profit = d.pnl > 0;
      const loss = d.pnl < 0;
      const accent = !has ? "border-border/30 bg-background/30 opacity-70" : profit ? "border-[var(--neon-green)]/40 shadow-[0_0_22px_-12px_var(--neon-green)] bg-background/40" : loss ? "border-[var(--neon-pink)]/40 shadow-[0_0_22px_-12px_var(--neon-pink)] bg-background/40" : "border-border/40 bg-background/40";
      const pnlClass = profit ? "neon-text-green" : loss ? "neon-text-pink" : "text-muted-foreground";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { type: "button", initial: {
        opacity: 0,
        y: 6
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.22,
        delay: i * 0.03
      }, whileHover: {
        y: -2
      }, onClick: () => has && setOpenDayKey(d.key), className: `relative overflow-hidden rounded-xl border p-3 text-left transition-all ${accent} ${has ? "cursor-pointer hover:bg-background/60" : "cursor-default"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-foreground/80", children: d.name.slice(0, 3) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: d.date.toLocaleDateString(void 0, {
            month: "short",
            day: "numeric"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 display-num text-base ${pnlClass}`, children: has ? fmtMoney(d.pnl, true) : "—" }),
        has ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            d.trades.length,
            " ",
            d.trades.length === 1 ? "trade" : "trades"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            d.fills,
            " fills"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70", children: "No trades" }),
        has && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[var(--neon-cyan)]/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
          " View"
        ] })
      ] }, d.key);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 bg-background/40 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "Best Trade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-semibold neon-text-green", children: bestTrade ? `${bestTrade.instrument} · ${fmtMoney(bestTrade.pnl, true)}` : "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 bg-background/40 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "Worst Trade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-semibold neon-text-pink", children: worstTrade ? `${worstTrade.instrument} · ${fmtMoney(worstTrade.pnl, true)}` : "—" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!openDayKey, onOpenChange: (o) => !o && setOpenDayKey(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-3xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: openDay ? `${openDay.name}, ${openDay.date.toLocaleDateString(void 0, {
        month: "long",
        day: "numeric",
        year: "numeric"
      })}` : "" }) }),
      openDay && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Daily PnL", value: fmtMoney(openDay.pnl, true), accent: openDay.pnl >= 0 ? "green" : "pink" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Trades", value: String(openDay.trades.length), accent: "purple" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Fills", value: String(openDay.fills), accent: "cyan" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-col gap-3", children: openDay.trades.map((t) => {
          const win = t.pnl >= 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border bg-background/40 p-4 ${win ? "border-[oklch(0.78_0.2_160/0.35)]" : "border-[oklch(0.7_0.25_10/0.35)]"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold", children: t.instrument }),
                  t.direction && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${t.direction === "long" ? "bg-[oklch(0.78_0.2_160/0.18)] text-[var(--neon-green)]" : "bg-[oklch(0.65_0.27_20/0.18)] text-[var(--neon-red)]"}`, children: t.direction })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: [
                  new Date(t.date).toLocaleTimeString(void 0, {
                    hour: "2-digit",
                    minute: "2-digit"
                  }),
                  t.session ? ` · ${t.session}` : "",
                  t.setupType ? ` · ${t.setupType}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(t), className: "grid h-8 w-8 place-items-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-[var(--neon-purple)] hover:text-[var(--neon-purple)]", "aria-label": "Edit trade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeTrade(t.id), className: "grid h-8 w-8 place-items-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-[var(--neon-red)] hover:text-[var(--neon-red)]", "aria-label": "Delete trade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { label: "PnL", value: fmtMoney(t.pnl, true), className: win ? "neon-text-green" : "neon-text-pink" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { label: "R", value: `${(t.rMultiple ?? 0).toFixed(2)}R` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { label: "Fills", value: String(t.fills ?? 1) })
            ] }),
            (t.mistakes || t.notes) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5 text-xs text-muted-foreground", children: [
              t.mistakes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Mistakes:" }),
                " ",
                t.mistakes
              ] }),
              t.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Notes:" }),
                " ",
                t.notes
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyThumb, { src: t.image15m, label: "15m", onClick: (s) => setPreview(s) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyThumb, { src: t.image1m, label: "1m", onClick: (s) => setPreview(s) })
            ] })
          ] }, t.id);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editId, onOpenChange: (o) => {
      if (!o) {
        setEditId(null);
        setForm(null);
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-2xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Trade" }) }),
      form && /* @__PURE__ */ jsxRuntimeExports.jsx(TradeFormFields, { form, setForm }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveEdit, className: "bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white", children: "Save Changes" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!preview, onOpenChange: (o) => !o && setPreview(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-4xl border-border/40 bg-background/95 p-2", children: preview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "Chart preview", className: "h-auto w-full rounded-lg" }) }) })
  ] });
}
function MiniStat({
  label,
  value,
  accent
}) {
  const cls = accent === "green" ? "neon-text-green" : accent === "pink" ? "neon-text-pink" : accent === "cyan" ? "neon-text-cyan" : "neon-text-purple";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 bg-background/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 text-sm font-semibold ${cls}`, children: value })
  ] });
}
function Cell({
  label,
  value,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-0.5 text-sm font-semibold ${className}`, children: value })
  ] });
}
function WeeklyThumb({
  src,
  label,
  onClick
}) {
  if (!src) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 flex-1 items-center justify-center gap-1.5 rounded-md border border-dashed border-border/50 text-[10px] uppercase text-muted-foreground/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-3 w-3" }),
      " ",
      label
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onClick(src), className: "group relative h-16 flex-1 overflow-hidden rounded-md border border-border/60 transition hover:border-[var(--neon-purple)] hover:shadow-[0_0_14px_-2px_var(--neon-purple)]", "aria-label": `Open ${label} chart`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: label, className: "h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 right-0 bg-black/60 px-1 text-center text-[9px] uppercase tracking-wider text-white", children: label })
  ] });
}
function YearOverview({
  onOpenWeek
}) {
  const {
    state,
    getWeeklyReview
  } = useAppStore();
  const today = /* @__PURE__ */ new Date();
  const currentYear = today.getFullYear();
  const currentWeekKey = isoWeekKey(today);
  const [year, setYear] = reactExports.useState(currentYear);
  const totalWeeks = reactExports.useMemo(() => weeksInIsoYear(year), [year]);
  const weeks = reactExports.useMemo(() => {
    return Array.from({
      length: totalWeeks
    }, (_, i) => {
      const w = i + 1;
      const monday = dateFromIsoWeek(year, w);
      const sunday = new Date(monday);
      sunday.setUTCDate(monday.getUTCDate() + 6);
      const localMonday = new Date(monday.getUTCFullYear(), monday.getUTCMonth(), monday.getUTCDate(), 0, 0, 0, 0);
      const localSunday = new Date(sunday.getUTCFullYear(), sunday.getUTCMonth(), sunday.getUTCDate(), 23, 59, 59, 999);
      const key = isoWeekKeyOf(year, w);
      const trades = state.trades.filter((t) => {
        const td = new Date(t.date).getTime();
        return td >= localMonday.getTime() && td <= localSunday.getTime();
      });
      const stats = computeWeekStats(trades);
      const review = getWeeklyReview(key);
      return {
        week: w,
        key,
        monday: localMonday,
        sunday: localSunday,
        trades,
        stats,
        review,
        completed: reviewHasContent(review),
        isCurrent: key === currentWeekKey,
        isFuture: localMonday.getTime() > today.getTime()
      };
    });
  }, [year, totalWeeks, state.trades, getWeeklyReview, currentWeekKey, today]);
  const overview = reactExports.useMemo(() => {
    const past = weeks.filter((w) => !w.isFuture);
    const reviewed = past.filter((w) => w.completed).length;
    const missing = past.length - reviewed;
    const profitable = past.filter((w) => w.stats.totalPnl > 0).length;
    const losing = past.filter((w) => w.stats.totalPnl < 0).length;
    const tradedWeeks = past.filter((w) => w.trades.length > 0);
    const best = tradedWeeks.reduce((acc, w) => w.stats.totalPnl > (acc?.stats.totalPnl ?? -Infinity) ? w : acc, void 0);
    const worst = tradedWeeks.reduce((acc, w) => w.stats.totalPnl < (acc?.stats.totalPnl ?? Infinity) ? w : acc, void 0);
    let streak = 0;
    for (let i = past.length - 1; i >= 0; i--) {
      if (past[i].completed) streak++;
      else break;
    }
    return {
      reviewed,
      missing,
      profitable,
      losing,
      best,
      worst,
      streak,
      pastCount: past.length
    };
  }, [weeks]);
  const progressPct = totalWeeks ? overview.reviewed / totalWeeks * 100 : 0;
  const yearOptions = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];
  const statCards = [{
    label: "Weeks Reviewed",
    value: `${overview.reviewed} / ${totalWeeks}`,
    color: "neon-text-cyan",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" })
  }, {
    label: "Missing Reviews",
    value: overview.missing.toString(),
    color: "neon-text-orange",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDashed, { className: "h-4 w-4" })
  }, {
    label: "Profitable Weeks",
    value: overview.profitable.toString(),
    color: "neon-text-green",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" })
  }, {
    label: "Losing Weeks",
    value: overview.losing.toString(),
    color: "neon-text-pink",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4" })
  }, {
    label: "Best Week",
    value: overview.best ? fmtMoney(overview.best.stats.totalPnl, true) : "—",
    sub: overview.best ? `W${overview.best.week}` : void 0,
    color: "neon-text-green",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" })
  }, {
    label: "Worst Week",
    value: overview.worst ? fmtMoney(overview.worst.stats.totalPnl, true) : "—",
    sub: overview.worst ? `W${overview.worst.week}` : void 0,
    color: "neon-text-pink",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4" })
  }, {
    label: "Review Streak",
    value: `${overview.streak}w`,
    color: "neon-text-purple",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" })
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card flex flex-wrap items-center gap-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display-num neon-text-purple text-xl", children: "Year Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Trading archive · ISO weeks ",
          year
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => setYear((y) => y - 1), "aria-label": "Previous year", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(year), onValueChange: (v) => setYear(Number(v)), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[120px] border-border/40 bg-background/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: yearOptions.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(y), children: y }, y)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => setYear((y) => y + 1), "aria-label": "Next year", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7", children: statCards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "glass-card glass-card-hover p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label text-muted-foreground", children: c.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: c.color, children: c.icon })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `display-num mt-2 text-xl ${c.color}`, children: c.value }),
      c.sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: c.sub })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label text-muted-foreground", children: "Yearly Review Completion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          overview.reviewed,
          " / ",
          totalWeeks,
          " weeks (",
          progressPct.toFixed(0),
          "%)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-2 w-full overflow-hidden rounded-full bg-background/60 border border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        width: 0
      }, animate: {
        width: `${progressPct}%`
      }, transition: {
        duration: 0.9,
        ease: "easeOut"
      }, className: "h-full rounded-full bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-green)] shadow-[0_0_18px_-2px_var(--neon-cyan)]" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan", children: "Weekly Archive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendDot, { className: "bg-[var(--neon-green)]", label: "Profit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendDot, { className: "bg-[var(--neon-pink)]", label: "Loss" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendDot, { className: "bg-[var(--neon-purple)]", label: "Current" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendDot, { className: "bg-muted", label: "Empty" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7", children: weeks.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(WeekCard, { index: i, week: w, onClick: () => onOpenWeek(w.monday) }, w.key)) })
    ] })
  ] });
}
function LegendDot({
  className,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-2 w-2 rounded-full ${className}` }),
    label
  ] });
}
function WeekCard({
  week,
  index,
  onClick
}) {
  const {
    stats,
    completed,
    isCurrent,
    isFuture,
    trades
  } = week;
  const profit = stats.totalPnl > 0;
  const loss = stats.totalPnl < 0;
  const borderClass = isCurrent ? "border-[var(--neon-purple)]/70 shadow-[0_0_22px_-6px_var(--neon-purple)]" : completed ? "border-[var(--neon-cyan)]/40 shadow-[0_0_18px_-10px_var(--neon-cyan)]" : "border-border/40";
  const accentBar = profit ? "from-[var(--neon-green)]/80 to-[var(--neon-cyan)]/40" : loss ? "from-[var(--neon-pink)]/80 to-[var(--neon-orange)]/40" : "from-border/40 to-border/10";
  const previewText = week.review && (week.review.wins || week.review.mistakes || week.review.improvements || week.review.notes)?.toString().trim().slice(0, 60);
  const statusLabel = isFuture ? "Upcoming" : completed ? "Completed" : trades.length ? "Review missing" : "Empty";
  const statusColor = isFuture ? "text-muted-foreground" : completed ? "text-[var(--neon-green)]" : trades.length ? "text-[var(--neon-orange)]" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { onClick, initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.25,
    delay: Math.min(index * 8e-3, 0.25)
  }, whileHover: {
    y: -3
  }, className: `group relative overflow-hidden rounded-xl border bg-gradient-to-b from-background/70 to-background/30 p-3 text-left transition-all hover:bg-background/60 ${borderClass} ${!completed && !trades.length && !isCurrent ? "opacity-60 hover:opacity-100" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accentBar}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)]/0 to-[var(--neon-cyan)]/0 opacity-0 transition-opacity duration-300 group-hover:from-[var(--neon-purple)]/10 group-hover:to-[var(--neon-cyan)]/5 group-hover:opacity-100" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "display-num text-sm text-foreground", children: [
        "W",
        String(week.week).padStart(2, "0")
      ] }),
      completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-[var(--neon-green)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDashed, { className: "h-3.5 w-3.5 text-muted-foreground/60" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground", children: fmtRangeShort(week.monday, week.sunday) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2 flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `display-num text-base ${profit ? "neon-text-green" : loss ? "neon-text-pink" : "text-muted-foreground"}`, children: trades.length ? fmtMoney(stats.totalPnl, true) : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: trades.length ? `${trades.length}t` : "0t" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1 flex items-center justify-between text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "WR ",
        trades.length ? `${stats.winRate.toFixed(0)}%` : "—"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `uppercase tracking-[0.14em] ${statusColor}`, children: statusLabel })
    ] }),
    previewText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2 line-clamp-2 text-[10px] leading-snug text-muted-foreground/80", children: [
      "“",
      previewText,
      previewText.length >= 60 ? "…" : "",
      "”"
    ] }),
    isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-2 inline-flex rounded-full border border-[var(--neon-purple)]/60 bg-[var(--neon-purple)]/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--neon-purple)]", children: "Current Week" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--neon-cyan)] opacity-0 transition-opacity group-hover:opacity-100", children: "Open Review →" })
  ] });
}
export {
  WeeklyPage as component
};
