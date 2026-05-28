import { motion } from "framer-motion";
import { ShieldCheck, BarChart3 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { AnimatedNumber } from "./AnimatedNumber";
import { fmtMoney, fmtPct } from "@/lib/calc";

function StatCard({
  label,
  children,
  className = "",
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className={`glass-card glass-card-hover p-5 ${className}`}
    >
      <div className="section-label mb-3 text-center text-muted-foreground">
        {label}
      </div>
      {children}
    </motion.div>
  );
}

function RingProgress({
  value,
  color,
  trackColor = "#2a2244",
  centerLabel,
  size = 140,
  thickness = 14,
}: {
  value: number;
  color: string;
  trackColor?: string;
  centerLabel: React.ReactNode;
  size?: number;
  thickness?: number;
}) {
  const data = [
    { v: Math.min(100, Math.max(0, value)) },
    { v: 100 - Math.min(100, Math.max(0, value)) },
  ];
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="v"
            innerRadius={size / 2 - thickness}
            outerRadius={size / 2}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive
          >
            <Cell fill={color} />
            <Cell fill={trackColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center text-center">
        {centerLabel}
      </div>
    </div>
  );
}

export function TopMetrics({
  remainingDrawdown,
  drawdownUsedPct,
  nextTradeMaxRisk,
  avgLossesLeft,
  progressToGoal,
  maxDrawdown,
  currentProfit,
  requiredProfit,
}: {
  remainingDrawdown: number;
  drawdownUsedPct: number;
  nextTradeMaxRisk: number;
  avgLossesLeft: number;
  progressToGoal: number;
  maxDrawdown: number;
  currentProfit: number;
  requiredProfit: number;
}) {
  const leftPct = 100 - drawdownUsedPct;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard label="Remaining Drawdown" delay={0.05}>
        <div className="flex items-center justify-between gap-3">
          <div className="display-num neon-text-orange text-4xl">
            <AnimatedNumber value={remainingDrawdown} format={(n) => fmtMoney(n)} />
          </div>
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[oklch(0.78_0.18_50/0.15)]">
            <ShieldCheck className="h-5 w-5 text-[var(--neon-orange)]" />
          </div>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[oklch(0.2_0.05_280)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${leftPct}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--neon-orange)] to-[var(--neon-pink)] shadow-[0_0_12px_var(--neon-orange)]"
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          <span className="neon-text-orange font-semibold">
            {fmtPct(leftPct)}
          </span>{" "}
          LEFT
        </div>
      </StatCard>

      <StatCard label="Drawdown Used" delay={0.1}>
        <RingProgress
          value={drawdownUsedPct}
          color="url(#ddUsedGrad)"
          centerLabel={
            <div>
              <div className="display-num text-2xl neon-text-orange">
                {fmtPct(drawdownUsedPct)}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Used
              </div>
            </div>
          }
        />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="ddUsedGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.18 50)" />
              <stop offset="100%" stopColor="oklch(0.72 0.27 0)" />
            </linearGradient>
          </defs>
        </svg>
      </StatCard>

      <StatCard label="Next Trade Max Risk" delay={0.15}>
        <div className="grid place-items-center py-2">
          <div className="display-num neon-text-cyan text-4xl">
            <AnimatedNumber value={nextTradeMaxRisk} format={(n) => fmtMoney(n)} />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            = {fmtMoney(remainingDrawdown)} ÷ 7
          </div>
        </div>
      </StatCard>

      <StatCard label="Avg Losses Left" delay={0.2}>
        <div className="flex items-center justify-between">
          <div className="display-num neon-text-purple text-4xl">
            <AnimatedNumber
              value={avgLossesLeft}
              format={(n) => n.toFixed(2)}
            />
          </div>
          <BarChart3 className="h-7 w-7 text-[var(--neon-purple)]" />
        </div>
        <div className="mt-3 text-center text-xs text-muted-foreground">
          (Based on avg loss)
        </div>
      </StatCard>

      <StatCard label="Profit Goal Progress" delay={0.25}>
        <div
          title="How much of the required profit from starting balance to payout target has been completed."
        >
          <RingProgress
            value={progressToGoal}
            color="url(#progGrad)"
            centerLabel={
              <div className="display-num text-2xl neon-text-cyan">
                {fmtPct(progressToGoal)}
              </div>
            }
          />
          <div className="mt-3 text-center text-xs text-muted-foreground">
            {fmtMoney(currentProfit)} / {fmtMoney(requiredProfit)}
          </div>
        </div>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="progGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.68 0.27 295)" />
              <stop offset="100%" stopColor="oklch(0.82 0.18 210)" />
            </linearGradient>
          </defs>
        </svg>
      </StatCard>
    </div>
  );
}
