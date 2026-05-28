import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ShieldAlert } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { computePayoutStatus, fmtMoney, fmtPct } from "@/lib/calc";

export const Route = createFileRoute("/payout")({
  head: () => ({ meta: [{ title: "Payout Status — Trading Journal" }] }),
  component: PayoutPage,
});

function PayoutPage() {
  const { state } = useAppStore();
  const p = computePayoutStatus(state.account, state.trades);
  const consistencyPct = p.totalProfit > 0 ? (p.largestProfitDay / p.totalProfit) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-[1300px] flex-col gap-4"
    >
      <div className="glass-card flex items-center justify-between p-6">
        <div>
          <h2 className="display-num neon-text-purple text-2xl">Payout Status</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {state.account.accountName} · {state.account.propFirm}
          </p>
        </div>
        <div
          className={`flex items-center gap-2 rounded-xl border px-5 py-3 ${
            p.eligible
              ? "border-[var(--neon-green)]/40 bg-[oklch(0.78_0.2_160/0.12)] text-[var(--neon-green)]"
              : "border-[var(--neon-red)]/40 bg-[oklch(0.65_0.27_20/0.12)] text-[var(--neon-red)]"
          }`}
        >
          <ShieldAlert className="h-5 w-5" />
          <span className="display-num text-sm tracking-wider">
            {p.eligible ? "ELIGIBLE FOR PAYOUT" : "NOT ELIGIBLE FOR PAYOUT"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="section-label neon-text-cyan mb-4">Consistency Rule (50%)</h3>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Largest Profit Day</span>
            <span className="display-num neon-text-pink text-2xl">{fmtMoney(p.largestProfitDay)}</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Current 50% Limit</span>
            <span className="display-num neon-text-cyan text-xl">{fmtMoney(p.consistencyLimit)}</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[oklch(0.2_0.05_280)]">
            <div
              className={`h-full rounded-full ${
                p.consistencyPassed
                  ? "bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-cyan)]"
                  : "bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-red)]"
              }`}
              style={{ width: `${Math.min(100, consistencyPct)}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {fmtPct(consistencyPct)} of total profit is on biggest day (limit 50%)
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Stat label="Required Total Profit" value={fmtMoney(p.requiredProfitForConsistency)} />
            <Stat label="Extra Profit Needed" value={fmtMoney(p.extraProfitForConsistency)} accent />
          </div>
          <StatusBadge passed={p.consistencyPassed} />
        </div>

        <div className="glass-card p-6">
          <h3 className="section-label neon-text-cyan mb-4">Minimum Payout Balance</h3>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Required Balance</span>
            <span className="display-num neon-text-purple text-2xl">{fmtMoney(p.minPayoutBalance)}</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Current Balance</span>
            <span className="display-num neon-text-cyan text-xl">{fmtMoney(p.currentBalance)}</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[oklch(0.2_0.05_280)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)]"
              style={{ width: `${Math.min(100, (p.currentBalance / p.minPayoutBalance) * 100)}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {fmtPct((p.currentBalance / p.minPayoutBalance) * 100)} of minimum payout balance
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Stat label="Remaining to Goal" value={fmtMoney(p.balanceRemaining)} accent />
            <Stat label="Total Profit" value={fmtMoney(p.totalProfit, true)} />
          </div>
          <StatusBadge passed={p.balancePassed} />
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="section-label neon-text-cyan mb-4">All Payout Rules</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {p.rules.map((r) => (
            <div
              key={r.label}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                r.passed
                  ? "border-[var(--neon-green)]/30 bg-[oklch(0.78_0.2_160/0.06)]"
                  : "border-[var(--neon-red)]/30 bg-[oklch(0.65_0.27_20/0.06)]"
              }`}
            >
              {r.passed ? (
                <CheckCircle2 className="h-5 w-5 text-[var(--neon-green)]" />
              ) : (
                <XCircle className="h-5 w-5 text-[var(--neon-red)]" />
              )}
              <span className="text-sm">{r.label}</span>
              <span
                className={`ml-auto text-xs font-semibold ${
                  r.passed ? "text-[var(--neon-green)]" : "text-[var(--neon-red)]"
                }`}
              >
                {r.passed ? "PASSED" : "FAILED"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border/40 bg-background/30 p-3">
      <div className="section-label text-muted-foreground">{label}</div>
      <div className={`display-num mt-1 text-lg ${accent ? "neon-text-pink" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}

function StatusBadge({ passed }: { passed: boolean }) {
  return (
    <div
      className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        passed
          ? "bg-[oklch(0.78_0.2_160/0.15)] text-[var(--neon-green)]"
          : "bg-[oklch(0.65_0.27_20/0.15)] text-[var(--neon-red)]"
      }`}
    >
      {passed ? "PASSED" : "FAILED"}
    </div>
  );
}
