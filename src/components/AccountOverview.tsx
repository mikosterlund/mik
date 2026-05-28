import { motion } from "framer-motion";
import {
  DollarSign,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { fmtMoney } from "@/lib/calc";

interface Props {
  currentBalance: number;
  profitTarget: number;
  toGoal: number;
  dailyPnl: number;
  yesterdayPnl: number;
}

const rows = (p: Props) => [
  {
    label: "Current Balance",
    value: p.currentBalance,
    color: "neon-text-cyan",
    Icon: DollarSign,
    iconColor: "text-[var(--neon-cyan)]",
    bg: "bg-[oklch(0.82_0.18_210/0.12)]",
    signed: false,
  },
  {
    label: "Profit Target",
    value: p.profitTarget,
    color: "neon-text-pink",
    Icon: Target,
    iconColor: "text-[var(--neon-pink)]",
    bg: "bg-[oklch(0.72_0.27_0/0.12)]",
    signed: false,
  },
  {
    label: "To Goal",
    value: p.toGoal,
    color: "neon-text-cyan",
    Icon: TrendingUp,
    iconColor: "text-[var(--neon-cyan)]",
    bg: "bg-[oklch(0.82_0.18_210/0.12)]",
    signed: false,
  },
  {
    label: "Daily PnL",
    value: p.dailyPnl,
    color: p.dailyPnl >= 0 ? "neon-text-green" : "neon-text-pink",
    Icon: p.dailyPnl >= 0 ? TrendingUp : TrendingDown,
    iconColor: p.dailyPnl >= 0 ? "text-[var(--neon-green)]" : "text-[var(--neon-red)]",
    bg: p.dailyPnl >= 0 ? "bg-[oklch(0.78_0.2_160/0.12)]" : "bg-[oklch(0.65_0.27_20/0.12)]",
    signed: true,
  },
  {
    label: "Yesterday PnL",
    value: p.yesterdayPnl,
    color: p.yesterdayPnl >= 0 ? "neon-text-green" : "neon-text-pink",
    Icon: Activity,
    iconColor: p.yesterdayPnl >= 0 ? "text-[var(--neon-green)]" : "text-[var(--neon-red)]",
    bg: p.yesterdayPnl >= 0 ? "bg-[oklch(0.78_0.2_160/0.12)]" : "bg-[oklch(0.65_0.27_20/0.12)]",
    signed: true,
  },
];

export function AccountOverview(props: Props) {
  return (
    <div className="glass-card glass-card-hover h-full p-6">
      <h2 className="section-label neon-text-cyan mb-5">Account Overview</h2>
      <div className="flex flex-col gap-4">
        {rows(props).map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="flex items-center gap-4"
          >
            <div
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border ${r.bg}`}
            >
              <r.Icon className={`h-5 w-5 ${r.iconColor}`} strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <div className="section-label text-muted-foreground">{r.label}</div>
              <div className={`display-num text-2xl ${r.color}`}>
                <AnimatedNumber
                  value={r.value}
                  format={(n) => fmtMoney(n, r.signed)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
