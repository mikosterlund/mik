import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { fmtMoney, fmtPct } from "@/lib/calc";
import { AnimatedNumber } from "./AnimatedNumber";
import type { Trade } from "@/lib/types";

interface Props {
  totalPnl: number;
  totalTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  rrRatio: number;
  aPlusPct: number;
  trades: Trade[];
}

function spark(values: number[]) {
  return values.map((v, i) => ({ x: i, y: v }));
}

function Tile({
  label,
  value,
  color,
  spark: data,
  stroke,
}: {
  label: string;
  value: React.ReactNode;
  color: string;
  spark: { x: number; y: number }[];
  stroke: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between gap-4 px-5 py-4 border-r border-border/40 last:border-r-0 min-w-[160px]"
    >
      <div>
        <div className="section-label text-muted-foreground">{label}</div>
        <div className={`display-num text-xl ${color}`}>{value}</div>
      </div>
      <div className="h-10 w-20 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="y"
              stroke={stroke}
              strokeWidth={2}
              dot={false}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function PerformanceSummary(p: Props) {
  const last = p.trades.slice(0, 14).reverse();
  let bal = 0;
  const pnlSeries = spark(last.map((t) => (bal += t.pnl)));
  const winSeries = spark(
    last.map((_, i) => {
      const slice = last.slice(0, i + 1);
      const w = slice.filter((t) => t.pnl > 0).length;
      return (w / slice.length) * 100;
    }),
  );
  const generic = spark(last.map((t) => t.pnl));

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-border/50 bg-gradient-to-r from-[oklch(0.6_0.27_295/0.18)] to-transparent px-6 py-3">
        <h3 className="section-label neon-text-purple">
          Performance Summary <span className="text-muted-foreground normal-case">(This Week)</span>
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
        <Tile
          label="Total PnL"
          value={<AnimatedNumber value={p.totalPnl} format={(n) => fmtMoney(n, true)} />}
          color={p.totalPnl >= 0 ? "neon-text-green" : "neon-text-pink"}
          spark={pnlSeries}
          stroke={p.totalPnl >= 0 ? "oklch(0.78 0.2 160)" : "oklch(0.65 0.27 20)"}
        />
        <Tile
          label="Total Trades"
          value={p.totalTrades}
          color="neon-text-cyan"
          spark={generic}
          stroke="oklch(0.82 0.18 210)"
        />
        <Tile
          label="Win Rate"
          value={fmtPct(p.winRate)}
          color="neon-text-cyan"
          spark={winSeries}
          stroke="oklch(0.82 0.18 210)"
        />
        <Tile
          label="Avg Win"
          value={fmtMoney(p.avgWin)}
          color="neon-text-orange"
          spark={generic}
          stroke="oklch(0.78 0.18 50)"
        />
        <Tile
          label="Avg Loss"
          value={fmtMoney(-Math.abs(p.avgLoss))}
          color="neon-text-pink"
          spark={generic}
          stroke="oklch(0.65 0.27 20)"
        />
        <Tile
          label="R:R Ratio"
          value={p.rrRatio.toFixed(2)}
          color="neon-text-purple"
          spark={generic}
          stroke="oklch(0.68 0.27 295)"
        />
        <Tile
          label="A+ Setup %"
          value={fmtPct(p.aPlusPct, 0)}
          color="neon-text-cyan"
          spark={generic}
          stroke="oklch(0.82 0.18 210)"
        />
        <Tile
          label="Rule Following"
          value={fmtPct(86, 0)}
          color="neon-text-pink"
          spark={generic}
          stroke="oklch(0.72 0.27 0)"
        />
      </div>
    </div>
  );
}
