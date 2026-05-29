import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, T as Textarea } from "./router-DJBrMM3J.mjs";
import { b as computeAccount, d as computeEquityCurve, e as computeDailyPnl, g as computeSetupQuality, f as fmtMoney, a as fmtPct } from "./calc-DZy82t1v.mjs";
import { E as EquityCurve, D as DailyPnlChart, S as SetupQualityDonut } from "./Charts-DGkg40Pt.mjs";
import { B as Button } from "./button-CZ_3TZow.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { s as ShieldCheck, t as ChartColumn, k as CircleCheck, u as Circle, v as CircleAlert, w as DollarSign, x as Target, T as TrendingUp, n as TrendingDown, A as Activity, f as Check } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, L as LineChart, b as Line } from "../_libs/recharts.mjs";
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
function AnimatedNumber({
  value,
  format = (n) => n.toLocaleString(),
  className,
  duration = 0.8
}) {
  const [display, setDisplay] = reactExports.useState(value);
  const prev = reactExports.useRef(value);
  reactExports.useEffect(() => {
    const start = prev.current;
    const end = value;
    const startT = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - startT) / (duration * 1e3));
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (end - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      className,
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      children: format(display)
    }
  );
}
const rows = (p) => [
  {
    label: "Current Balance",
    value: p.currentBalance,
    color: "neon-text-cyan",
    Icon: DollarSign,
    iconColor: "text-[var(--neon-cyan)]",
    bg: "bg-[oklch(0.82_0.18_210/0.12)]",
    signed: false
  },
  {
    label: "Profit Target",
    value: p.profitTarget,
    color: "neon-text-pink",
    Icon: Target,
    iconColor: "text-[var(--neon-pink)]",
    bg: "bg-[oklch(0.72_0.27_0/0.12)]",
    signed: false
  },
  {
    label: "To Goal",
    value: p.toGoal,
    color: "neon-text-cyan",
    Icon: TrendingUp,
    iconColor: "text-[var(--neon-cyan)]",
    bg: "bg-[oklch(0.82_0.18_210/0.12)]",
    signed: false
  },
  {
    label: "Daily PnL",
    value: p.dailyPnl,
    color: p.dailyPnl >= 0 ? "neon-text-green" : "neon-text-pink",
    Icon: p.dailyPnl >= 0 ? TrendingUp : TrendingDown,
    iconColor: p.dailyPnl >= 0 ? "text-[var(--neon-green)]" : "text-[var(--neon-red)]",
    bg: p.dailyPnl >= 0 ? "bg-[oklch(0.78_0.2_160/0.12)]" : "bg-[oklch(0.65_0.27_20/0.12)]",
    signed: true
  },
  {
    label: "Yesterday PnL",
    value: p.yesterdayPnl,
    color: p.yesterdayPnl >= 0 ? "neon-text-green" : "neon-text-pink",
    Icon: Activity,
    iconColor: p.yesterdayPnl >= 0 ? "text-[var(--neon-green)]" : "text-[var(--neon-red)]",
    bg: p.yesterdayPnl >= 0 ? "bg-[oklch(0.78_0.2_160/0.12)]" : "bg-[oklch(0.65_0.27_20/0.12)]",
    signed: true
  }
];
function AccountOverview(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card glass-card-hover h-full p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-label neon-text-cyan mb-5", children: "Account Overview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: rows(props).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.06, duration: 0.35 },
        className: "flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border ${r.bg}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(r.Icon, { className: `h-5 w-5 ${r.iconColor}`, strokeWidth: 2.4 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label text-muted-foreground", children: r.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `display-num text-2xl ${r.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedNumber,
              {
                value: r.value,
                format: (n) => fmtMoney(n, r.signed)
              }
            ) })
          ] })
        ]
      },
      r.label
    )) })
  ] });
}
function StatCard({
  label,
  children,
  className = "",
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.45 },
      className: `glass-card glass-card-hover p-5 ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label mb-3 text-center text-muted-foreground", children: label }),
        children
      ]
    }
  );
}
function RingProgress({
  value,
  color,
  trackColor = "#2a2244",
  centerLabel,
  size = 140,
  thickness = 14
}) {
  const data = [
    { v: Math.min(100, Math.max(0, value)) },
    { v: 100 - Math.min(100, Math.max(0, value)) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto", style: { width: size, height: size }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Pie,
      {
        data,
        dataKey: "v",
        innerRadius: size / 2 - thickness,
        outerRadius: size / 2,
        startAngle: 90,
        endAngle: -270,
        stroke: "none",
        isAnimationActive: true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: color }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: trackColor })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center text-center", children: centerLabel })
  ] });
}
function TopMetrics({
  remainingDrawdown,
  drawdownUsedPct,
  nextTradeMaxRisk,
  avgLossesLeft,
  progressToGoal,
  maxDrawdown,
  currentProfit,
  requiredProfit
}) {
  const leftPct = 100 - drawdownUsedPct;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatCard, { label: "Remaining Drawdown", delay: 0.05, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display-num neon-text-orange text-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedNumber, { value: remainingDrawdown, format: (n) => fmtMoney(n) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[oklch(0.78_0.18_50/0.15)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-[var(--neon-orange)]" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-2.5 overflow-hidden rounded-full bg-[oklch(0.2_0.05_280)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { width: 0 },
          animate: { width: `${leftPct}%` },
          transition: { duration: 1.2, ease: "easeOut" },
          className: "h-full rounded-full bg-gradient-to-r from-[var(--neon-orange)] to-[var(--neon-pink)] shadow-[0_0_12px_var(--neon-orange)]"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "neon-text-orange font-semibold", children: fmtPct(leftPct) }),
        " ",
        "LEFT"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatCard, { label: "Drawdown Used", delay: 0.1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RingProgress,
        {
          value: drawdownUsedPct,
          color: "url(#ddUsedGrad)",
          centerLabel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display-num text-2xl neon-text-orange", children: fmtPct(drawdownUsedPct) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Used" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "0", height: "0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ddUsedGrad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.18 50)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.72 0.27 0)" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Next Trade Max Risk", delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display-num neon-text-cyan text-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedNumber, { value: nextTradeMaxRisk, format: (n) => fmtMoney(n) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground", children: [
        "= ",
        fmtMoney(remainingDrawdown),
        " ÷ 7"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatCard, { label: "Avg Losses Left", delay: 0.2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display-num neon-text-purple text-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          AnimatedNumber,
          {
            value: avgLossesLeft,
            format: (n) => n.toFixed(2)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-7 w-7 text-[var(--neon-purple)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-center text-xs text-muted-foreground", children: "(Based on avg loss)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatCard, { label: "Profit Goal Progress", delay: 0.25, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          title: "How much of the required profit from starting balance to payout target has been completed.",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RingProgress,
              {
                value: progressToGoal,
                color: "url(#progGrad)",
                centerLabel: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display-num text-2xl neon-text-cyan", children: fmtPct(progressToGoal) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-center text-xs text-muted-foreground", children: [
              fmtMoney(currentProfit),
              " / ",
              fmtMoney(requiredProfit)
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "0", height: "0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "progGrad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.68 0.27 295)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.82 0.18 210)" })
      ] }) }) })
    ] })
  ] });
}
function RiskMeter({ value }) {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = -90 + clamped / 100 * 180;
  let label = "LOW";
  let color = "var(--neon-green)";
  if (clamped > 70) {
    label = "HIGH";
    color = "var(--neon-red)";
  } else if (clamped > 40) {
    label = "MODERATE";
    color = "var(--neon-orange)";
  }
  const r = 90;
  const cx = 110;
  const cy = 110;
  const segs = [
    { color: "oklch(0.78 0.2 160)", start: -90, end: -54 },
    { color: "oklch(0.85 0.18 130)", start: -54, end: -18 },
    { color: "oklch(0.78 0.18 50)", start: -18, end: 18 },
    { color: "oklch(0.72 0.22 30)", start: 18, end: 54 },
    { color: "oklch(0.65 0.27 20)", start: 54, end: 90 }
  ];
  const polar = (deg, radius) => {
    const rad = deg * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };
  const arcPath = (start, end, radius, width) => {
    const s1 = polar(start, radius);
    const e1 = polar(end, radius);
    const s2 = polar(end, radius - width);
    const e2 = polar(start, radius - width);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${radius} ${radius} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${radius - width} ${radius - width} 0 ${large} 0 ${e2.x} ${e2.y} Z`;
  };
  const needle = polar(angle, r - 12);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card glass-card-hover p-6 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-pink mb-2", children: "Risk Meter" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 220 130", className: "w-full max-w-[280px]", children: [
        segs.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: arcPath(s.start, s.end, r, 22), fill: s.color, opacity: 0.95 }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.line,
          {
            x1: cx,
            y1: cy,
            x2: needle.x,
            y2: needle.y,
            stroke: "white",
            strokeWidth: 3,
            strokeLinecap: "round",
            initial: { x2: cx, y2: cy },
            animate: { x2: needle.x, y2: needle.y },
            transition: { type: "spring", stiffness: 80, damping: 14 },
            style: { filter: "drop-shadow(0 0 6px white)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: 6, fill: "white" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "display-num mt-1 text-2xl",
          style: { color, textShadow: `0 0 18px ${color}` },
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Manage risk. Stay disciplined." })
    ] })
  ] });
}
function todayKey() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function SaveBadge({ status }) {
  const map = {
    saved: { text: "Saved", cls: "text-[var(--neon-green)]" },
    dirty: { text: "Unsaved changes", cls: "text-[var(--neon-orange)]" },
    saving: { text: "Saving…", cls: "text-muted-foreground" }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${map[status].cls}`, children: [
    status === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
    map[status].text
  ] });
}
function DailyChecklist({ date = todayKey() }) {
  const { hydrated, getChecklistForDate, setChecklistForDate, toggleChecklistForDate } = useAppStore();
  const items = hydrated ? getChecklistForDate(date) : [];
  const [status, setStatus] = reactExports.useState("saved");
  const dirtyRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!dirtyRef.current) return;
    setStatus("saving");
    const t = setTimeout(() => setStatus("saved"), 350);
    return () => clearTimeout(t);
  }, [items]);
  const handleToggle = (id) => {
    dirtyRef.current = true;
    setStatus("dirty");
    toggleChecklistForDate(date, id);
  };
  const handleSave = () => {
    setStatus("saving");
    setChecklistForDate(date, items);
    setTimeout(() => setStatus("saved"), 250);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card glass-card-hover p-6 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan", children: "Daily Checklist" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBadge, { status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: items.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.li,
      {
        initial: { opacity: 0, x: -6 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.04 },
        onClick: () => handleToggle(c.id),
        className: "flex cursor-pointer items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/5",
        children: [
          c.checked ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-[var(--neon-cyan)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm ${c.checked ? "text-foreground" : "text-muted-foreground"}`, children: c.label })
        ]
      },
      c.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: handleSave,
        className: "mt-4 w-full border-[var(--neon-cyan)]/30 text-xs hover:bg-[var(--neon-cyan)]/10",
        children: "Save Checklist"
      }
    )
  ] });
}
function RedFlags() {
  const { state, toggleRedFlag } = useAppStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card glass-card-hover p-6 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-pink mb-4", children: "Red Flags" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: state.redFlags.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.li,
      {
        initial: { opacity: 0, x: -6 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.04 },
        className: "flex items-center justify-between gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleAlert,
              {
                className: `h-5 w-5 ${c.flagged ? "text-[var(--neon-red)]" : "text-[var(--neon-orange)]"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: c.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => toggleRedFlag(c.id),
              className: `h-5 w-5 rounded-md border transition-all ${c.flagged ? "border-[var(--neon-red)] bg-[var(--neon-red)] shadow-[0_0_12px_var(--neon-red)]" : "border-border bg-transparent"}`,
              "aria-label": "toggle"
            }
          )
        ]
      },
      c.id
    )) })
  ] });
}
function TodaysNotes({ date = todayKey() }) {
  const { hydrated, getNotesForDate, setNotesForDate } = useAppStore();
  const [value, setValue] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("saved");
  reactExports.useEffect(() => {
    if (hydrated) setValue(getNotesForDate(date));
  }, [hydrated, date]);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    if (value === getNotesForDate(date)) return;
    setStatus("dirty");
    const t = setTimeout(() => {
      setNotesForDate(date, value);
      setStatus("saving");
      setTimeout(() => setStatus("saved"), 250);
    }, 600);
    return () => clearTimeout(t);
  }, [value]);
  const handleSave = () => {
    setNotesForDate(date, value);
    setStatus("saving");
    setTimeout(() => setStatus("saved"), 250);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card glass-card-hover p-6 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-pink", children: "Today's Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBadge, { status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        value,
        onChange: (e) => setValue(e.target.value),
        placeholder: "Write any notes about today's mindset, market conditions, setups, mistakes, or lessons.",
        className: "h-[140px] resize-none border-border/50 bg-background/40 text-sm placeholder:text-muted-foreground/70"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: handleSave,
        className: "mt-3 w-full border-[var(--neon-pink)]/30 text-xs hover:bg-[var(--neon-pink)]/10",
        children: "Save Notes"
      }
    )
  ] });
}
function spark(values) {
  return values.map((v, i) => ({ x: i, y: v }));
}
function Tile({
  label,
  value,
  color,
  spark: data,
  stroke
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      whileHover: { y: -3 },
      transition: { duration: 0.2 },
      className: "flex items-center justify-between gap-4 px-5 py-4 border-r border-border/40 last:border-r-0 min-w-[160px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `display-num text-xl ${color}`, children: value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LineChart, { data, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "y",
            stroke,
            strokeWidth: 2,
            dot: false,
            isAnimationActive: true
          }
        ) }) }) })
      ]
    }
  );
}
function PerformanceSummary(p) {
  const last = p.trades.slice(0, 14).reverse();
  let bal = 0;
  const pnlSeries = spark(last.map((t) => bal += t.pnl));
  const winSeries = spark(
    last.map((_, i) => {
      const slice = last.slice(0, i + 1);
      const w = slice.filter((t) => t.pnl > 0).length;
      return w / slice.length * 100;
    })
  );
  const generic = spark(last.map((t) => t.pnl));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/50 bg-gradient-to-r from-[oklch(0.6_0.27_295/0.18)] to-transparent px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "section-label neon-text-purple", children: [
      "Performance Summary ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground normal-case", children: "(This Week)" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tile,
        {
          label: "Total PnL",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedNumber, { value: p.totalPnl, format: (n) => fmtMoney(n, true) }),
          color: p.totalPnl >= 0 ? "neon-text-green" : "neon-text-pink",
          spark: pnlSeries,
          stroke: p.totalPnl >= 0 ? "oklch(0.78 0.2 160)" : "oklch(0.65 0.27 20)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tile,
        {
          label: "Total Trades",
          value: p.totalTrades,
          color: "neon-text-cyan",
          spark: generic,
          stroke: "oklch(0.82 0.18 210)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tile,
        {
          label: "Win Rate",
          value: fmtPct(p.winRate),
          color: "neon-text-cyan",
          spark: winSeries,
          stroke: "oklch(0.82 0.18 210)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tile,
        {
          label: "Avg Win",
          value: fmtMoney(p.avgWin),
          color: "neon-text-orange",
          spark: generic,
          stroke: "oklch(0.78 0.18 50)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tile,
        {
          label: "Avg Loss",
          value: fmtMoney(-Math.abs(p.avgLoss)),
          color: "neon-text-pink",
          spark: generic,
          stroke: "oklch(0.65 0.27 20)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tile,
        {
          label: "R:R Ratio",
          value: p.rrRatio.toFixed(2),
          color: "neon-text-purple",
          spark: generic,
          stroke: "oklch(0.68 0.27 295)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tile,
        {
          label: "A+ Setup %",
          value: fmtPct(p.aPlusPct, 0),
          color: "neon-text-cyan",
          spark: generic,
          stroke: "oklch(0.82 0.18 210)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tile,
        {
          label: "Rule Following",
          value: fmtPct(86, 0),
          color: "neon-text-pink",
          spark: generic,
          stroke: "oklch(0.72 0.27 0)"
        }
      )
    ] })
  ] });
}
function Dashboard() {
  const {
    state
  } = useAppStore();
  const m = reactExports.useMemo(() => computeAccount(state.account, state.trades), [state.account, state.trades]);
  const equity = reactExports.useMemo(() => computeEquityCurve(state.account, state.trades), [state.account, state.trades]);
  const dailyPnl = reactExports.useMemo(() => computeDailyPnl(state.trades), [state.trades]);
  const setupQ = reactExports.useMemo(() => computeSetupQuality(state.trades), [state.trades]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1600px] flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 xl:grid-cols-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountOverview, { currentBalance: m.currentBalance, profitTarget: state.account.startingBalance + state.account.profitTarget, toGoal: m.toGoal, dailyPnl: m.dailyPnl, yesterdayPnl: m.yesterdayPnl }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 xl:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TopMetrics, { remainingDrawdown: m.remainingDrawdown, drawdownUsedPct: m.drawdownUsedPct, nextTradeMaxRisk: m.nextTradeMaxRisk, avgLossesLeft: m.avgLossesLeft, progressToGoal: m.progressToGoal, maxDrawdown: state.account.maxDrawdown, currentProfit: m.currentBalance - state.account.startingBalance, requiredProfit: state.account.profitTarget }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EquityCurve, { data: equity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DailyPnlChart, { data: dailyPnl }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SetupQualityDonut, { data: setupQ })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiskMeter, { value: m.drawdownUsedPct }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DailyChecklist, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RedFlags, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TodaysNotes, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceSummary, { totalPnl: m.totalPnl, totalTrades: m.totalTrades, winRate: m.winRate, avgWin: m.avgWin, avgLoss: m.avgLoss, rrRatio: m.rrRatio, aPlusPct: m.aPlusPct, trades: state.trades })
  ] });
}
export {
  Dashboard as component
};
