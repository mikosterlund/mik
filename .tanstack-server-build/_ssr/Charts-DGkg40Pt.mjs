import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { R as ResponsiveContainer, A as AreaChart, c as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, d as Area, B as BarChart, e as Bar, C as Cell, P as PieChart, a as Pie } from "../_libs/recharts.mjs";
const axisStyle = {
  stroke: "oklch(0.55 0.04 280)",
  fontSize: 11,
  fontFamily: "Space Grotesk"
};
function EquityCurve({ data }) {
  const last = data[data.length - 1]?.balance ?? 0;
  const first = data[0]?.balance ?? 0;
  const delta = last - first;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "glass-card glass-card-hover relative overflow-hidden p-6 h-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full",
            style: { background: "radial-gradient(closest-side, oklch(0.6 0.27 295 / 0.18), transparent)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-purple", children: "Equity Curve" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "display-num text-base text-foreground", children: [
              "$",
              last.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs font-medium ${delta >= 0 ? "neon-text-green" : "neon-text-pink"}`,
                children: [
                  delta >= 0 ? "+" : "",
                  delta.toLocaleString()
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[230px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data, margin: { top: 5, right: 12, left: -10, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "eqLine", x1: "0", y1: "0", x2: "1", y2: "0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.82 0.18 210)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.68 0.27 295)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "eqFill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.68 0.27 295)", stopOpacity: 0.55 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "60%", stopColor: "oklch(0.68 0.27 295)", stopOpacity: 0.12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.68 0.27 295)", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "eqGlow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "3", result: "blur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              vertical: false,
              stroke: "oklch(0.6 0.05 285 / 0.08)",
              strokeDasharray: "0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "date",
              tick: axisStyle,
              axisLine: false,
              tickLine: false,
              tickMargin: 8,
              minTickGap: 24
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: axisStyle,
              axisLine: false,
              tickLine: false,
              tickFormatter: (v) => `$${Math.round(v / 1e3)}K`,
              domain: ["dataMin - 200", "dataMax + 200"],
              width: 48
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              cursor: { stroke: "oklch(0.78 0.2 295 / 0.4)", strokeWidth: 1 },
              contentStyle: {
                background: "oklch(0.13 0.04 285 / 0.92)",
                border: "1px solid oklch(0.5 0.15 290 / 0.35)",
                borderRadius: 14,
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px -8px oklch(0.5 0.25 295 / 0.4)",
                fontFamily: "Inter, sans-serif",
                fontSize: 12
              },
              labelStyle: { color: "oklch(0.82 0.18 210)", marginBottom: 4 },
              itemStyle: { color: "white" },
              formatter: (v) => [`$${v.toLocaleString()}`, "Balance"]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "balance",
              stroke: "url(#eqLine)",
              strokeWidth: 2.5,
              fill: "url(#eqFill)",
              filter: "url(#eqGlow)",
              dot: false,
              activeDot: {
                r: 5,
                fill: "oklch(0.82 0.18 210)",
                stroke: "white",
                strokeWidth: 1.5
              },
              isAnimationActive: true,
              animationDuration: 1600,
              animationEasing: "ease-out"
            }
          )
        ] }) }) })
      ]
    }
  );
}
function DailyPnlChart({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.1 },
      className: "glass-card glass-card-hover p-6 h-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-purple mb-4", children: "Daily PnL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[230px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data, margin: { top: 5, right: 10, left: -10, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.3 0.05 285 / 0.4)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: axisStyle, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: axisStyle,
              axisLine: false,
              tickLine: false,
              tickFormatter: (v) => `$${v}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "oklch(0.15 0.05 285)",
                border: "1px solid oklch(0.5 0.15 290 / 0.4)",
                borderRadius: 12
              },
              cursor: { fill: "oklch(0.5 0.15 290 / 0.08)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "pnl", radius: [6, 6, 0, 0], isAnimationActive: true, animationDuration: 1e3, children: data.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cell,
            {
              fill: d.pnl >= 0 ? "oklch(0.78 0.2 160)" : "oklch(0.65 0.27 20)"
            },
            i
          )) })
        ] }) }) })
      ]
    }
  );
}
function SetupQualityDonut({
  data
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const aPlus = data.find((d) => d.name === "A+")?.value ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.15 },
      className: "glass-card glass-card-hover p-6 h-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "section-label neon-text-purple mb-4", children: [
          "Setup Quality ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground normal-case", children: "(This Week)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[170px] w-[170px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pie,
              {
                data: total ? data : [{ value: 1 }],
                dataKey: "value",
                innerRadius: 55,
                outerRadius: 80,
                startAngle: 90,
                endAngle: -270,
                stroke: "none",
                children: (total ? data : [{ color: "#2a2244" }]).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: d.color }, i))
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "display-num text-2xl neon-text-cyan", children: [
                aPlus,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground", children: "A+ SETUPS" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: data.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-2.5 w-2.5 rounded-full",
                style: { background: d.color, boxShadow: `0 0 8px ${d.color}` }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: d.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "(",
              d.value,
              "%)"
            ] })
          ] }, d.name)) })
        ] })
      ]
    }
  );
}
export {
  DailyPnlChart as D,
  EquityCurve as E,
  SetupQualityDonut as S
};
