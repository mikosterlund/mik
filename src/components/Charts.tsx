import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";

const axisStyle = {
  stroke: "oklch(0.55 0.04 280)",
  fontSize: 11,
  fontFamily: "Space Grotesk",
};

export function EquityCurve({ data }: { data: { date: string; balance: number }[] }) {
  const last = data[data.length - 1]?.balance ?? 0;
  const first = data[0]?.balance ?? 0;
  const delta = last - first;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card glass-card-hover relative overflow-hidden p-6 h-full"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.6 0.27 295 / 0.18), transparent)" }}
      />
      <div className="mb-4 flex items-center justify-between">
        <h3 className="section-label neon-text-purple">Equity Curve</h3>
        <div className="flex items-baseline gap-2">
          <span className="display-num text-base text-foreground">
            ${last.toLocaleString()}
          </span>
          <span
            className={`text-xs font-medium ${delta >= 0 ? "neon-text-green" : "neon-text-pink"}`}
          >
            {delta >= 0 ? "+" : ""}
            {delta.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 12, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="eqLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.82 0.18 210)" />
                <stop offset="100%" stopColor="oklch(0.68 0.27 295)" />
              </linearGradient>
              <linearGradient id="eqFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.68 0.27 295)" stopOpacity={0.55} />
                <stop offset="60%" stopColor="oklch(0.68 0.27 295)" stopOpacity={0.12} />
                <stop offset="100%" stopColor="oklch(0.68 0.27 295)" stopOpacity={0} />
              </linearGradient>
              <filter id="eqGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="oklch(0.6 0.05 285 / 0.08)"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="date"
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              minTickGap={24}
            />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${Math.round(v / 1000)}K`}
              domain={["dataMin - 200", "dataMax + 200"]}
              width={48}
            />
            <Tooltip
              cursor={{ stroke: "oklch(0.78 0.2 295 / 0.4)", strokeWidth: 1 }}
              contentStyle={{
                background: "oklch(0.13 0.04 285 / 0.92)",
                border: "1px solid oklch(0.5 0.15 290 / 0.35)",
                borderRadius: 14,
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px -8px oklch(0.5 0.25 295 / 0.4)",
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
              }}
              labelStyle={{ color: "oklch(0.82 0.18 210)", marginBottom: 4 }}
              itemStyle={{ color: "white" }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, "Balance"]}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="url(#eqLine)"
              strokeWidth={2.5}
              fill="url(#eqFill)"
              filter="url(#eqGlow)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "oklch(0.82 0.18 210)",
                stroke: "white",
                strokeWidth: 1.5,
              }}
              isAnimationActive
              animationDuration={1600}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}


export function DailyPnlChart({ data }: { data: { date: string; pnl: number }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card glass-card-hover p-6 h-full"
    >
      <h3 className="section-label neon-text-purple mb-4">Daily PnL</h3>
      <div className="h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.05 285 / 0.4)" />
            <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.15 0.05 285)",
                border: "1px solid oklch(0.5 0.15 290 / 0.4)",
                borderRadius: 12,
              }}
              cursor={{ fill: "oklch(0.5 0.15 290 / 0.08)" }}
            />
            <Bar dataKey="pnl" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1000}>
              {data.map((d, i) => (
                <Cell
                  key={i}
                  fill={d.pnl >= 0 ? "oklch(0.78 0.2 160)" : "oklch(0.65 0.27 20)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function SetupQualityDonut({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const aPlus = data.find((d) => d.name === "A+")?.value ?? 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass-card glass-card-hover p-6 h-full"
    >
      <h3 className="section-label neon-text-purple mb-4">
        Setup Quality <span className="text-muted-foreground normal-case">(This Week)</span>
      </h3>
      <div className="flex items-center gap-4">
        <div className="relative h-[170px] w-[170px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={total ? data : [{ value: 1 }]}
                dataKey="value"
                innerRadius={55}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {(total ? data : [{ color: "#2a2244" }]).map((d, i) => (
                  <Cell key={i} fill={(d as any).color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="display-num text-2xl neon-text-cyan">{aPlus}%</div>
              <div className="text-[10px] tracking-widest text-muted-foreground">
                A+ SETUPS
              </div>
            </div>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          {data.map((d) => (
            <li key={d.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }}
              />
              <span className="text-foreground">{d.name}</span>
              <span className="text-muted-foreground">({d.value}%)</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
