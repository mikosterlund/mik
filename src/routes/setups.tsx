import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fmtMoney } from "@/lib/calc";

export const Route = createFileRoute("/setups")({
  head: () => ({ meta: [{ title: "Setup Review — Trading Journal" }] }),
  component: SetupsPage,
});

function SetupsPage() {
  const { state } = useAppStore();
  const [filter, setFilter] = useState<"All" | "A+" | "B" | "C">("All");

  const setups = useMemo(() => {
    const map: Record<string, { count: number; pnl: number; grade: string }> = {};
    state.trades.forEach((t) => {
      const key = t.setupType || "Untagged";
      if (!map[key]) map[key] = { count: 0, pnl: 0, grade: t.setupGrade };
      map[key].count++;
      map[key].pnl += t.pnl;
    });
    let arr = Object.entries(map).map(([name, v]) => ({ name, ...v }));
    if (filter !== "All") arr = arr.filter((s) => s.grade === filter);
    return arr.sort((a, b) => b.pnl - a.pnl);
  }, [state.trades, filter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-[1600px] flex-col gap-4"
    >
      <div className="glass-card flex flex-wrap items-center gap-3 p-6">
        <h2 className="display-num neon-text-purple text-xl">Setup Review</h2>
        <div className="ml-auto flex gap-2">
          {(["All", "A+", "B", "C"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className="tab-pill"
              data-active={filter === g}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {setups.map((s) => (
          <motion.div
            key={s.name}
            whileHover={{ y: -3 }}
            className="glass-card glass-card-hover p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="display-num text-lg">{s.name}</h3>
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                  s.grade === "A+"
                    ? "bg-[oklch(0.68_0.27_295/0.18)] text-[var(--neon-purple)]"
                    : s.grade === "B"
                      ? "bg-[oklch(0.72_0.27_0/0.18)] text-[var(--neon-pink)]"
                      : "bg-[oklch(0.78_0.18_50/0.18)] text-[var(--neon-orange)]"
                }`}
              >
                {s.grade}
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="section-label text-muted-foreground">Trades</div>
                <div className="display-num text-2xl">{s.count}</div>
              </div>
              <div className="text-right">
                <div className="section-label text-muted-foreground">Net PnL</div>
                <div className={`display-num text-2xl ${s.pnl >= 0 ? "neon-text-green" : "neon-text-pink"}`}>
                  {fmtMoney(s.pnl, true)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {setups.length === 0 && (
          <div className="glass-card col-span-full p-10 text-center text-muted-foreground">
            No setups match this filter.
          </div>
        )}
      </div>
    </motion.div>
  );
}
