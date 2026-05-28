import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { useEffect, useMemo, useState } from "react";
import { fmtMoney, fmtPct } from "@/lib/calc";
import { EquityCurve, DailyPnlChart } from "@/components/Charts";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  CalendarDays,
  LayoutGrid,
  Trophy,
  TrendingDown,
  Flame,
  CheckCircle2,
  CircleDashed,
  Pencil,
  ImageOff,
  Trash2,
  Eye,
} from "lucide-react";

import { toast } from "sonner";
import type { Trade, WeeklyReview } from "@/lib/types";
import { TradeFormFields, tradeToForm, type TradeForm } from "./trades";

export const Route = createFileRoute("/weekly")({
  head: () => ({ meta: [{ title: "Weekly Review — Trading Journal" }] }),
  component: WeeklyPage,
});

/* ---------------- ISO week helpers ---------------- */
function getIsoWeek(d: Date): { year: number; week: number } {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { year: date.getUTCFullYear(), week };
}
function isoWeekKey(d: Date) {
  const { year, week } = getIsoWeek(d);
  return `${year}-W${String(week).padStart(2, "0")}`;
}
function isoWeekKeyOf(year: number, week: number) {
  return `${year}-W${String(week).padStart(2, "0")}`;
}
// First Monday-anchored date of given ISO week
function dateFromIsoWeek(year: number, week: number): Date {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dow = simple.getUTCDay();
  const monday = new Date(simple);
  if (dow <= 4) monday.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  else monday.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  return monday;
}
function weekRange(anchor: Date) {
  const d = new Date(anchor);
  const day = d.getDay() || 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - (day - 1));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { monday, sunday };
}
function fmtRange(monday: Date, sunday: Date) {
  const opt: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${monday.toLocaleDateString("en-US", opt)} – ${sunday.toLocaleDateString("en-US", { ...opt, year: "numeric" })}`;
}
function fmtRangeShort(monday: Date, sunday: Date) {
  const opt: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${monday.toLocaleDateString("en-US", opt)} – ${sunday.toLocaleDateString("en-US", opt)}`;
}
function weeksInIsoYear(year: number): number {
  // ISO weeks: a year has 53 weeks if Jan 1 is Thursday, or it is a leap year and Jan 1 is Wednesday.
  const jan1 = new Date(Date.UTC(year, 0, 1)).getUTCDay();
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  return jan1 === 4 || (isLeap && jan1 === 3) ? 53 : 52;
}

/* ---------------- shared stats ---------------- */
function computeWeekStats(trades: Trade[]) {
  const totalPnl = trades.reduce((s, t) => s + (t.pnl || 0), 0);
  const wins = trades.filter((t) => t.pnl > 0);
  const losses = trades.filter((t) => t.pnl < 0);
  const winRate = trades.length ? (wins.length / trades.length) * 100 : 0;
  const avgWin = wins.length ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
  const avgLoss = losses.length
    ? Math.abs(losses.reduce((s, t) => s + t.pnl, 0) / losses.length)
    : 0;
  const rr = avgLoss ? avgWin / avgLoss : 0;
  // best/worst day
  const byDay: Record<string, number> = {};
  trades.forEach((t) => {
    const k = new Date(t.date).toISOString().slice(0, 10);
    byDay[k] = (byDay[k] || 0) + t.pnl;
  });
  const dayVals = Object.values(byDay);
  const bestDay = dayVals.length ? Math.max(...dayVals) : 0;
  const worstDay = dayVals.length ? Math.min(...dayVals) : 0;
  return { totalPnl, winRate, rr, count: trades.length, avgWin, avgLoss, bestDay, worstDay };
}
function reviewHasContent(r: WeeklyReview | undefined): boolean {
  if (!r) return false;
  return Boolean(
    (r.wins || "").trim() ||
      (r.mistakes || "").trim() ||
      (r.improvements || "").trim() ||
      (r.notes || "").trim(),
  );
}

/* ============================================================== */

function WeeklyPage() {
  const [mode, setMode] = useState<"current" | "year">("current");
  const [anchor, setAnchor] = useState<Date>(() => new Date());

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-[1600px] flex-col gap-4"
    >
      {/* Mode tabs */}
      <div className="glass-card flex flex-wrap items-center gap-3 p-4">
        <div className="flex items-center gap-1 rounded-lg border border-border/40 bg-background/40 p-1">
          <button
            onClick={() => setMode("current")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all ${
              mode === "current"
                ? "bg-gradient-to-r from-[var(--neon-purple)]/30 to-[var(--neon-cyan)]/20 text-foreground shadow-[0_0_18px_-6px_var(--neon-purple)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            Current Week
          </button>
          <button
            onClick={() => setMode("year")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all ${
              mode === "year"
                ? "bg-gradient-to-r from-[var(--neon-purple)]/30 to-[var(--neon-cyan)]/20 text-foreground shadow-[0_0_18px_-6px_var(--neon-purple)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Year Overview
          </button>
        </div>
        <div className="ml-auto text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {mode === "current" ? "Weekly review · single week" : "Annual review archive"}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === "current" ? (
          <motion.div
            key="current"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <CurrentWeekView anchor={anchor} setAnchor={setAnchor} />
          </motion.div>
        ) : (
          <motion.div
            key="year"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <YearOverview
              onOpenWeek={(d) => {
                setAnchor(d);
                setMode("current");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================== */
/* CURRENT WEEK */

function CurrentWeekView({
  anchor,
  setAnchor,
}: {
  anchor: Date;
  setAnchor: (d: Date) => void;
}) {
  const { state, getWeeklyReview, setWeeklyReview, hydrated } = useAppStore();
  const { monday, sunday } = useMemo(() => weekRange(anchor), [anchor]);
  const weekKey = useMemo(() => isoWeekKey(anchor), [anchor]);

  const weekTrades = useMemo(
    () =>
      state.trades.filter((t) => {
        const td = new Date(t.date).getTime();
        return td >= monday.getTime() && td <= sunday.getTime();
      }),
    [state.trades, monday, sunday],
  );

  const stats = useMemo(() => computeWeekStats(weekTrades), [weekTrades]);

  const equity = useMemo(() => {
    let bal = state.account.startingBalance;
    const byDay: Record<string, number> = {};
    weekTrades.forEach((t) => {
      const k = new Date(t.date).toISOString().slice(0, 10);
      byDay[k] = (byDay[k] || 0) + t.pnl;
    });
    return Object.keys(byDay)
      .sort()
      .map((k) => {
        bal += byDay[k];
        return { date: k.slice(5), balance: Math.round(bal) };
      });
  }, [weekTrades, state.account.startingBalance]);

  const dailyPnl = useMemo(() => {
    const byDay: Record<string, number> = {};
    weekTrades.forEach((t) => {
      const k = new Date(t.date).toISOString().slice(0, 10);
      byDay[k] = (byDay[k] || 0) + t.pnl;
    });
    return Object.keys(byDay)
      .sort()
      .map((k) => ({ date: k.slice(5), pnl: Math.round(byDay[k]) }));
  }, [weekTrades]);

  const existing = getWeeklyReview(weekKey);
  const blank = { wins: "", mistakes: "", improvements: "", notes: "" };
  const [draft, setDraft] = useState(existing ?? blank);
  const [status, setStatus] = useState<"saved" | "dirty" | "saving">("saved");
  const [created, setCreated] = useState(!!existing);

  useEffect(() => {
    if (!hydrated) return;
    const e = getWeeklyReview(weekKey);
    setDraft(e ?? blank);
    setCreated(!!e);
    setStatus("saved");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekKey, hydrated]);

  useEffect(() => {
    if (status !== "dirty") return;
    const t = setTimeout(() => {
      setWeeklyReview(weekKey, draft);
      setStatus("saving");
      setTimeout(() => setStatus("saved"), 200);
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const update = (patch: Partial<typeof blank>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setStatus("dirty");
  };

  const saveNow = () => {
    setWeeklyReview(weekKey, draft);
    setCreated(true);
    setStatus("saved");
    toast.success(`Saved review for ${weekKey}`);
  };

  const shiftWeek = (delta: number) => {
    const next = new Date(anchor);
    next.setDate(next.getDate() + delta * 7);
    setAnchor(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-card flex flex-wrap items-center gap-4 p-6">
        <div>
          <h2 className="display-num neon-text-purple text-xl">Weekly Review</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {weekKey} · {fmtRange(monday, sunday)}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => shiftWeek(-1)} aria-label="Previous week">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setAnchor(new Date())} className="text-xs">
            This week
          </Button>
          <Button variant="outline" size="icon" onClick={() => shiftWeek(1)} aria-label="Next week">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Weekly PnL", value: fmtMoney(stats.totalPnl, true), color: stats.totalPnl >= 0 ? "neon-text-green" : "neon-text-pink" },
          { label: "Win Rate", value: fmtPct(stats.winRate), color: "neon-text-cyan" },
          { label: "R:R Ratio", value: stats.rr.toFixed(2), color: "neon-text-orange" },
          { label: "Trades", value: stats.count.toString(), color: "neon-text-purple" },
        ].map((c) => (
          <div key={c.label} className="glass-card glass-card-hover p-5">
            <div className="section-label text-muted-foreground">{c.label}</div>
            <div className={`display-num mt-2 text-2xl ${c.color}`}>{c.value}</div>
          </div>
        ))}
      </div>

      {weekTrades.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <p className="text-muted-foreground">No trades recorded for this week.</p>
          {!created && (
            <Button
              onClick={saveNow}
              className="mt-4 bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white"
            >
              Create review for this week
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <EquityCurve data={equity.length ? equity : [{ date: "—", balance: state.account.startingBalance }]} />
          <DailyPnlChart data={dailyPnl} />
        </div>
      )}

      <div className="glass-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-label neon-text-cyan">Review Notes</h3>
          <span
            className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${
              status === "saved"
                ? "text-[var(--neon-green)]"
                : status === "dirty"
                  ? "text-[var(--neon-orange)]"
                  : "text-muted-foreground"
            }`}
          >
            {status === "saved" && <Check className="h-3 w-3" />}
            {status === "saved" ? "Saved" : status === "dirty" ? "Unsaved changes" : "Saving…"}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label className="section-label text-muted-foreground">Wins</Label>
            <Textarea value={draft.wins} onChange={(e) => update({ wins: e.target.value })} className="mt-2 h-28 border-border/50 bg-background/40" placeholder="What worked this week?" />
          </div>
          <div>
            <Label className="section-label text-muted-foreground">Mistakes</Label>
            <Textarea value={draft.mistakes} onChange={(e) => update({ mistakes: e.target.value })} className="mt-2 h-28 border-border/50 bg-background/40" placeholder="What broke down?" />
          </div>
          <div>
            <Label className="section-label text-muted-foreground">Improvements</Label>
            <Textarea value={draft.improvements} onChange={(e) => update({ improvements: e.target.value })} className="mt-2 h-28 border-border/50 bg-background/40" placeholder="What will you do differently?" />
          </div>
          <div>
            <Label className="section-label text-muted-foreground">General Notes</Label>
            <Textarea value={draft.notes} onChange={(e) => update({ notes: e.target.value })} className="mt-2 h-28 border-border/50 bg-background/40" placeholder="Anything else worth remembering." />
          </div>
        </div>
        <Button onClick={saveNow} className="mt-6 bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white shadow-[0_0_24px_-6px_var(--neon-purple)]">
          Save Weekly Review
        </Button>
      </div>

      <WeeklyTradesSection trades={weekTrades} stats={stats} monday={monday} />

    </div>
  );
}

/* ============================================================== */
/* THIS WEEK'S TRADES */

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function localDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function WeeklyTradesSection({
  trades,
  stats,
  monday,
}: {
  trades: Trade[];
  stats: ReturnType<typeof computeWeekStats>;
  monday: Date;
}) {
  const { updateTrade, deleteTrade } = useAppStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<TradeForm | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [openDayKey, setOpenDayKey] = useState<string | null>(null);

  // Group trades by local date key
  const tradesByDay = useMemo(() => {
    const map: Record<string, Trade[]> = {};
    trades.forEach((t) => {
      const k = localDateKey(new Date(t.date));
      (map[k] ||= []).push(t);
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    );
    return map;
  }, [trades]);

  // 7-day boxes
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      d.setHours(0, 0, 0, 0);
      const key = localDateKey(d);
      const list = tradesByDay[key] || [];
      const pnl = list.reduce((s, t) => s + (t.pnl || 0), 0);
      const fills = list.reduce((s, t) => s + (t.fills ?? 1), 0);
      return { date: d, key, name: DAY_NAMES[i], trades: list, pnl, fills };
    });
  }, [monday, tradesByDay]);

  // Weekly aggregates from day buckets (matches Mon–Sun)
  const totals = useMemo(() => {
    const tradedDays = days.filter((d) => d.trades.length > 0);
    const wins = tradedDays.filter((d) => d.pnl > 0).length;
    const losses = tradedDays.filter((d) => d.pnl < 0).length;
    const totalFills = days.reduce((s, d) => s + d.fills, 0);
    const totalPnl = days.reduce((s, d) => s + d.pnl, 0);
    const best = tradedDays.length ? Math.max(...tradedDays.map((d) => d.pnl)) : 0;
    const worst = tradedDays.length ? Math.min(...tradedDays.map((d) => d.pnl)) : 0;
    return { wins, losses, totalFills, totalPnl, best, worst };
  }, [days]);

  const bestTrade = useMemo(
    () => trades.reduce<Trade | null>((acc, t) => (!acc || t.pnl > acc.pnl ? t : acc), null),
    [trades],
  );
  const worstTrade = useMemo(
    () => trades.reduce<Trade | null>((acc, t) => (!acc || t.pnl < acc.pnl ? t : acc), null),
    [trades],
  );

  const openEdit = (t: Trade) => {
    setForm(tradeToForm(t));
    setEditId(t.id);
  };
  const saveEdit = () => {
    if (!editId || !form) return;
    updateTrade(editId, { ...form, date: new Date(form.date).toISOString() });
    setEditId(null);
    setForm(null);
    toast.success("Trade updated");
  };
  const removeTrade = (id: string) => {
    deleteTrade(id);
    toast.success("Trade deleted");
  };

  const openDay = openDayKey ? days.find((d) => d.key === openDayKey) ?? null : null;

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="section-label neon-text-cyan">This Week’s Trades</h3>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {totals.totalFills} fills · {trades.length} {trades.length === 1 ? "session" : "sessions"}
        </span>
      </div>

      {/* mini weekly stats */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
        <MiniStat label="Weekly PnL" value={fmtMoney(totals.totalPnl, true)} accent={totals.totalPnl >= 0 ? "green" : "pink"} />
        <MiniStat label="Fills" value={String(totals.totalFills)} accent="purple" />
        <MiniStat label="Winning Days" value={String(totals.wins)} accent="green" />
        <MiniStat label="Losing Days" value={String(totals.losses)} accent="pink" />
        <MiniStat label="Best Day" value={totals.best ? fmtMoney(totals.best, true) : "—"} accent="green" />
        <MiniStat label="Worst Day" value={totals.worst ? fmtMoney(totals.worst, true) : "—"} accent="pink" />
        <MiniStat label="Win Rate" value={fmtPct(stats.winRate)} accent="cyan" />
      </div>

      {/* 7-day grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {days.map((d, i) => {
          const has = d.trades.length > 0;
          const profit = d.pnl > 0;
          const loss = d.pnl < 0;
          const accent = !has
            ? "border-border/30 bg-background/30 opacity-70"
            : profit
              ? "border-[var(--neon-green)]/40 shadow-[0_0_22px_-12px_var(--neon-green)] bg-background/40"
              : loss
                ? "border-[var(--neon-pink)]/40 shadow-[0_0_22px_-12px_var(--neon-pink)] bg-background/40"
                : "border-border/40 bg-background/40";
          const pnlClass = profit ? "neon-text-green" : loss ? "neon-text-pink" : "text-muted-foreground";
          return (
            <motion.button
              key={d.key}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: i * 0.03 }}
              whileHover={{ y: -2 }}
              onClick={() => has && setOpenDayKey(d.key)}
              className={`relative overflow-hidden rounded-xl border p-3 text-left transition-all ${accent} ${has ? "cursor-pointer hover:bg-background/60" : "cursor-default"}`}
            >
              <div className="flex items-baseline justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/80">{d.name.slice(0, 3)}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {d.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>
              </div>
              <div className={`mt-2 display-num text-base ${pnlClass}`}>
                {has ? fmtMoney(d.pnl, true) : "—"}
              </div>
              {has ? (
                <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{d.trades.length} {d.trades.length === 1 ? "trade" : "trades"}</span>
                  <span>{d.fills} fills</span>
                </div>
              ) : (
                <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">No trades</div>
              )}
              {has && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[var(--neon-cyan)]/80">
                  <Eye className="h-3 w-3" /> View
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* footer best/worst trades */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border/40 bg-background/40 p-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Best Trade</div>
          <div className="mt-1 text-sm font-semibold neon-text-green">
            {bestTrade ? `${bestTrade.instrument} · ${fmtMoney(bestTrade.pnl, true)}` : "—"}
          </div>
        </div>
        <div className="rounded-lg border border-border/40 bg-background/40 p-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Worst Trade</div>
          <div className="mt-1 text-sm font-semibold neon-text-pink">
            {worstTrade ? `${worstTrade.instrument} · ${fmtMoney(worstTrade.pnl, true)}` : "—"}
          </div>
        </div>
      </div>

      {/* Day detail dialog */}
      <Dialog open={!!openDayKey} onOpenChange={(o) => !o && setOpenDayKey(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {openDay
                ? `${openDay.name}, ${openDay.date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}`
                : ""}
            </DialogTitle>
          </DialogHeader>
          {openDay && (
            <>
              <div className="grid grid-cols-3 gap-3">
                <MiniStat label="Daily PnL" value={fmtMoney(openDay.pnl, true)} accent={openDay.pnl >= 0 ? "green" : "pink"} />
                <MiniStat label="Trades" value={String(openDay.trades.length)} accent="purple" />
                <MiniStat label="Fills" value={String(openDay.fills)} accent="cyan" />
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {openDay.trades.map((t) => {
                  const win = t.pnl >= 0;
                  return (
                    <div
                      key={t.id}
                      className={`rounded-xl border bg-background/40 p-4 ${
                        win
                          ? "border-[oklch(0.78_0.2_160/0.35)]"
                          : "border-[oklch(0.7_0.25_10/0.35)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold">{t.instrument}</span>
                            {t.direction && (
                              <span
                                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                                  t.direction === "long"
                                    ? "bg-[oklch(0.78_0.2_160/0.18)] text-[var(--neon-green)]"
                                    : "bg-[oklch(0.65_0.27_20/0.18)] text-[var(--neon-red)]"
                                }`}
                              >
                                {t.direction}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            {new Date(t.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                            {t.session ? ` · ${t.session}` : ""}
                            {t.setupType ? ` · ${t.setupType}` : ""}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(t)}
                            className="grid h-8 w-8 place-items-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-[var(--neon-purple)] hover:text-[var(--neon-purple)]"
                            aria-label="Edit trade"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => removeTrade(t.id)}
                            className="grid h-8 w-8 place-items-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-[var(--neon-red)] hover:text-[var(--neon-red)]"
                            aria-label="Delete trade"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <Cell label="PnL" value={fmtMoney(t.pnl, true)} className={win ? "neon-text-green" : "neon-text-pink"} />
                        <Cell label="R" value={`${(t.rMultiple ?? 0).toFixed(2)}R`} />
                        <Cell label="Fills" value={String(t.fills ?? 1)} />
                      </div>
                      {(t.mistakes || t.notes) && (
                        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                          {t.mistakes && (
                            <div><span className="text-foreground/60">Mistakes:</span> {t.mistakes}</div>
                          )}
                          {t.notes && (
                            <div><span className="text-foreground/60">Notes:</span> {t.notes}</div>
                          )}
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-2">
                        <WeeklyThumb src={t.image15m} label="15m" onClick={(s) => setPreview(s)} />
                        <WeeklyThumb src={t.image1m} label="1m" onClick={(s) => setPreview(s)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit modal */}
      <Dialog open={!!editId} onOpenChange={(o) => { if (!o) { setEditId(null); setForm(null); } }}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Trade</DialogTitle>
          </DialogHeader>
          {form && <TradeFormFields form={form} setForm={setForm} />}
          <Button
            onClick={saveEdit}
            className="bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white"
          >
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>

      {/* Image preview */}
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-4xl border-border/40 bg-background/95 p-2">
          {preview && <img src={preview} alt="Chart preview" className="h-auto w-full rounded-lg" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}


function MiniStat({ label, value, accent }: { label: string; value: string; accent: "green" | "pink" | "cyan" | "purple" }) {
  const cls =
    accent === "green" ? "neon-text-green"
    : accent === "pink" ? "neon-text-pink"
    : accent === "cyan" ? "neon-text-cyan"
    : "neon-text-purple";
  return (
    <div className="rounded-lg border border-border/40 bg-background/40 p-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className={`mt-1 text-sm font-semibold ${cls}`}>{value}</div>
    </div>
  );
}

function Cell({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-sm font-semibold ${className}`}>{value}</div>
    </div>
  );
}

function WeeklyThumb({ src, label, onClick }: { src?: string; label: string; onClick: (s: string) => void }) {
  if (!src) {
    return (
      <div className="flex h-16 flex-1 items-center justify-center gap-1.5 rounded-md border border-dashed border-border/50 text-[10px] uppercase text-muted-foreground/60">
        <ImageOff className="h-3 w-3" /> {label}
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onClick(src)}
      className="group relative h-16 flex-1 overflow-hidden rounded-md border border-border/60 transition hover:border-[var(--neon-purple)] hover:shadow-[0_0_14px_-2px_var(--neon-purple)]"
      aria-label={`Open ${label} chart`}
    >
      <img src={src} alt={label} className="h-full w-full object-cover" />
      <span className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 text-center text-[9px] uppercase tracking-wider text-white">
        {label}
      </span>
    </button>
  );
}


/* ============================================================== */
/* YEAR OVERVIEW */

function YearOverview({ onOpenWeek }: { onOpenWeek: (d: Date) => void }) {
  const { state, getWeeklyReview } = useAppStore();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentWeekKey = isoWeekKey(today);

  const [year, setYear] = useState<number>(currentYear);
  const totalWeeks = useMemo(() => weeksInIsoYear(year), [year]);

  const weeks = useMemo(() => {
    return Array.from({ length: totalWeeks }, (_, i) => {
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
        isFuture: localMonday.getTime() > today.getTime(),
      };
    });
  }, [year, totalWeeks, state.trades, getWeeklyReview, currentWeekKey, today]);

  const overview = useMemo(() => {
    const past = weeks.filter((w) => !w.isFuture);
    const reviewed = past.filter((w) => w.completed).length;
    const missing = past.length - reviewed;
    const profitable = past.filter((w) => w.stats.totalPnl > 0).length;
    const losing = past.filter((w) => w.stats.totalPnl < 0).length;
    const tradedWeeks = past.filter((w) => w.trades.length > 0);
    const best = tradedWeeks.reduce(
      (acc, w) => (w.stats.totalPnl > (acc?.stats.totalPnl ?? -Infinity) ? w : acc),
      undefined as (typeof tradedWeeks)[number] | undefined,
    );
    const worst = tradedWeeks.reduce(
      (acc, w) => (w.stats.totalPnl < (acc?.stats.totalPnl ?? Infinity) ? w : acc),
      undefined as (typeof tradedWeeks)[number] | undefined,
    );
    // streak: count back from current/most recent past week of consecutive completed reviews
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
      pastCount: past.length,
    };
  }, [weeks]);

  const progressPct = totalWeeks ? (overview.reviewed / totalWeeks) * 100 : 0;

  const yearOptions = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];

  const statCards = [
    {
      label: "Weeks Reviewed",
      value: `${overview.reviewed} / ${totalWeeks}`,
      color: "neon-text-cyan",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      label: "Missing Reviews",
      value: overview.missing.toString(),
      color: "neon-text-orange",
      icon: <CircleDashed className="h-4 w-4" />,
    },
    {
      label: "Profitable Weeks",
      value: overview.profitable.toString(),
      color: "neon-text-green",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      label: "Losing Weeks",
      value: overview.losing.toString(),
      color: "neon-text-pink",
      icon: <TrendingDown className="h-4 w-4" />,
    },
    {
      label: "Best Week",
      value: overview.best ? fmtMoney(overview.best.stats.totalPnl, true) : "—",
      sub: overview.best ? `W${overview.best.week}` : undefined,
      color: "neon-text-green",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      label: "Worst Week",
      value: overview.worst ? fmtMoney(overview.worst.stats.totalPnl, true) : "—",
      sub: overview.worst ? `W${overview.worst.week}` : undefined,
      color: "neon-text-pink",
      icon: <TrendingDown className="h-4 w-4" />,
    },
    {
      label: "Review Streak",
      value: `${overview.streak}w`,
      color: "neon-text-purple",
      icon: <Flame className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Header + year selector */}
      <div className="glass-card flex flex-wrap items-center gap-4 p-6">
        <div>
          <h2 className="display-num neon-text-purple text-xl">Year Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Trading archive · ISO weeks {year}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear((y) => y - 1)}
            aria-label="Previous year"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger className="w-[120px] border-border/40 bg-background/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear((y) => y + 1)}
            aria-label="Next year"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        {statCards.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card glass-card-hover p-4"
          >
            <div className="flex items-center justify-between">
              <div className="section-label text-muted-foreground">{c.label}</div>
              <span className={c.color}>{c.icon}</span>
            </div>
            <div className={`display-num mt-2 text-xl ${c.color}`}>{c.value}</div>
            {c.sub && (
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {c.sub}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Yearly progress bar */}
      <div className="glass-card p-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="section-label text-muted-foreground">Yearly Review Completion</div>
          <div className="text-xs text-muted-foreground">
            {overview.reviewed} / {totalWeeks} weeks ({progressPct.toFixed(0)}%)
          </div>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-background/60 border border-border/40">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-green)] shadow-[0_0_18px_-2px_var(--neon-cyan)]"
          />
        </div>
      </div>

      {/* Week grid */}
      <div className="glass-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-label neon-text-cyan">Weekly Archive</h3>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <LegendDot className="bg-[var(--neon-green)]" label="Profit" />
            <LegendDot className="bg-[var(--neon-pink)]" label="Loss" />
            <LegendDot className="bg-[var(--neon-purple)]" label="Current" />
            <LegendDot className="bg-muted" label="Empty" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
          {weeks.map((w, i) => (
            <WeekCard
              key={w.key}
              index={i}
              week={w}
              onClick={() => onOpenWeek(w.monday)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-2 w-2 rounded-full ${className}`} />
      {label}
    </span>
  );
}

type WeekCardData = {
  week: number;
  key: string;
  monday: Date;
  sunday: Date;
  trades: Trade[];
  stats: ReturnType<typeof computeWeekStats>;
  review: WeeklyReview | undefined;
  completed: boolean;
  isCurrent: boolean;
  isFuture: boolean;
};

function WeekCard({
  week,
  index,
  onClick,
}: {
  week: WeekCardData;
  index: number;
  onClick: () => void;
}) {
  const { stats, completed, isCurrent, isFuture, trades } = week;
  const profit = stats.totalPnl > 0;
  const loss = stats.totalPnl < 0;

  const borderClass = isCurrent
    ? "border-[var(--neon-purple)]/70 shadow-[0_0_22px_-6px_var(--neon-purple)]"
    : completed
      ? "border-[var(--neon-cyan)]/40 shadow-[0_0_18px_-10px_var(--neon-cyan)]"
      : "border-border/40";

  const accentBar = profit
    ? "from-[var(--neon-green)]/80 to-[var(--neon-cyan)]/40"
    : loss
      ? "from-[var(--neon-pink)]/80 to-[var(--neon-orange)]/40"
      : "from-border/40 to-border/10";

  const previewText =
    week.review &&
    (week.review.wins || week.review.mistakes || week.review.improvements || week.review.notes)
      ?.toString()
      .trim()
      .slice(0, 60);

  const statusLabel = isFuture
    ? "Upcoming"
    : completed
      ? "Completed"
      : trades.length
        ? "Review missing"
        : "Empty";

  const statusColor = isFuture
    ? "text-muted-foreground"
    : completed
      ? "text-[var(--neon-green)]"
      : trades.length
        ? "text-[var(--neon-orange)]"
        : "text-muted-foreground";

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.008, 0.25) }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-xl border bg-gradient-to-b from-background/70 to-background/30 p-3 text-left transition-all hover:bg-background/60 ${borderClass} ${
        !completed && !trades.length && !isCurrent ? "opacity-60 hover:opacity-100" : ""
      }`}
    >
      {/* accent top bar */}
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accentBar}`} />
      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)]/0 to-[var(--neon-cyan)]/0 opacity-0 transition-opacity duration-300 group-hover:from-[var(--neon-purple)]/10 group-hover:to-[var(--neon-cyan)]/5 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between">
        <div className="display-num text-sm text-foreground">W{String(week.week).padStart(2, "0")}</div>
        {completed ? (
          <Check className="h-3.5 w-3.5 text-[var(--neon-green)]" />
        ) : (
          <CircleDashed className="h-3.5 w-3.5 text-muted-foreground/60" />
        )}
      </div>
      <div className="relative mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {fmtRangeShort(week.monday, week.sunday)}
      </div>

      <div className="relative mt-2 flex items-baseline justify-between">
        <div
          className={`display-num text-base ${
            profit ? "neon-text-green" : loss ? "neon-text-pink" : "text-muted-foreground"
          }`}
        >
          {trades.length ? fmtMoney(stats.totalPnl, true) : "—"}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {trades.length ? `${trades.length}t` : "0t"}
        </div>
      </div>

      <div className="relative mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>WR {trades.length ? `${stats.winRate.toFixed(0)}%` : "—"}</span>
        <span className={`uppercase tracking-[0.14em] ${statusColor}`}>{statusLabel}</span>
      </div>

      {previewText && (
        <div className="relative mt-2 line-clamp-2 text-[10px] leading-snug text-muted-foreground/80">
          “{previewText}{previewText.length >= 60 ? "…" : ""}”
        </div>
      )}

      {isCurrent && (
        <div className="relative mt-2 inline-flex rounded-full border border-[var(--neon-purple)]/60 bg-[var(--neon-purple)]/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--neon-purple)]">
          Current Week
        </div>
      )}

      {/* hover CTA */}
      <div className="relative mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--neon-cyan)] opacity-0 transition-opacity group-hover:opacity-100">
        Open Review →
      </div>
    </motion.button>
  );
}
