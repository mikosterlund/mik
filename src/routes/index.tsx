import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import {
  computeAccount,
  computeDailyPnl,
  computeEquityCurve,
  computeSetupQuality,
} from "@/lib/calc";
import { AccountOverview } from "@/components/AccountOverview";
import { TopMetrics } from "@/components/TopMetrics";
import {
  EquityCurve,
  DailyPnlChart,
  SetupQualityDonut,
} from "@/components/Charts";
import { RiskMeter } from "@/components/RiskMeter";
import {
  DailyChecklist,
  RedFlags,
  TodaysNotes,
} from "@/components/SidePanels";
import { PerformanceSummary } from "@/components/PerformanceSummary";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Trading Journal" },
      {
        name: "description",
        content:
          "Real-time dashboard with drawdown, equity curve, daily PnL, setup quality, and risk meter.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { state } = useAppStore();
  const m = useMemo(
    () => computeAccount(state.account, state.trades),
    [state.account, state.trades],
  );
  const equity = useMemo(
    () => computeEquityCurve(state.account, state.trades),
    [state.account, state.trades],
  );
  const dailyPnl = useMemo(() => computeDailyPnl(state.trades), [state.trades]);
  const setupQ = useMemo(() => computeSetupQuality(state.trades), [state.trades]);

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-6">
        <div className="xl:col-span-1">
          <AccountOverview
            currentBalance={m.currentBalance}
            profitTarget={state.account.startingBalance + state.account.profitTarget}
            toGoal={m.toGoal}
            dailyPnl={m.dailyPnl}
            yesterdayPnl={m.yesterdayPnl}
          />
        </div>
        <div className="flex flex-col gap-4 xl:col-span-5">
          <TopMetrics
            remainingDrawdown={m.remainingDrawdown}
            drawdownUsedPct={m.drawdownUsedPct}
            nextTradeMaxRisk={m.nextTradeMaxRisk}
            avgLossesLeft={m.avgLossesLeft}
            progressToGoal={m.progressToGoal}
            maxDrawdown={state.account.maxDrawdown}
            currentProfit={m.currentBalance - state.account.startingBalance}
            requiredProfit={state.account.profitTarget}
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <EquityCurve data={equity} />
            <DailyPnlChart data={dailyPnl} />
            <SetupQualityDonut data={setupQ} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <RiskMeter value={m.drawdownUsedPct} />
        <DailyChecklist />
        <RedFlags />
        <TodaysNotes />
      </div>

      <PerformanceSummary
        totalPnl={m.totalPnl}
        totalTrades={m.totalTrades}
        winRate={m.winRate}
        avgWin={m.avgWin}
        avgLoss={m.avgLoss}
        rrRatio={m.rrRatio}
        aPlusPct={m.aPlusPct}
        trades={state.trades}
      />
    </div>
  );
}
