const safeDiv = (a, b) => b === 0 || !isFinite(b) ? 0 : a / b;
const computeAccount = (account, trades) => {
  const totalPnl = trades.reduce((s, t) => s + (t.pnl || 0), 0);
  const currentBalance = account.startingBalance + totalPnl;
  const profitTargetBalance = account.startingBalance + account.profitTarget;
  const toGoal = Math.max(0, profitTargetBalance - currentBalance);
  const currentProfit = currentBalance - account.startingBalance;
  const requiredProfit = profitTargetBalance - account.startingBalance;
  const progressToGoal = Math.max(
    0,
    Math.min(100, safeDiv(currentProfit, requiredProfit) * 100)
  );
  const today = /* @__PURE__ */ new Date();
  const isSameDay = (d, ref) => d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth() && d.getDate() === ref.getDate();
  const yest = new Date(today);
  yest.setDate(yest.getDate() - 1);
  const dailyPnl = trades.filter((t) => isSameDay(new Date(t.date), today)).reduce((s, t) => s + (t.pnl || 0), 0);
  const yesterdayPnl = trades.filter((t) => isSameDay(new Date(t.date), yest)).reduce((s, t) => s + (t.pnl || 0), 0);
  const remainingDrawdown = Math.max(0, account.remainingDrawdown ?? 0);
  const drawdownUsed = Math.max(0, account.maxDrawdown - remainingDrawdown);
  const cappedDDUsed = Math.min(drawdownUsed, account.maxDrawdown);
  const drawdownUsedPct = safeDiv(cappedDDUsed, account.maxDrawdown) * 100;
  const nextTradeMaxRisk = remainingDrawdown / (account.riskDivisor || 7);
  const losses = trades.filter((t) => (t.pnl || 0) < 0);
  const wins = trades.filter((t) => (t.pnl || 0) > 0);
  const avgLoss = losses.length ? Math.abs(losses.reduce((s, t) => s + t.pnl, 0) / losses.length) : 0;
  const avgWin = wins.length ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
  const avgLossesLeft = avgLoss ? remainingDrawdown / avgLoss : 0;
  const winRate = trades.length ? wins.length / trades.length * 100 : 0;
  const rrRatio = safeDiv(avgWin, avgLoss);
  const expectancy = winRate / 100 * avgWin - (1 - winRate / 100) * avgLoss;
  const totalRisk = trades.reduce((s, t) => s + (t.risk || 0), 0);
  const aPlus = trades.filter((t) => t.setupGrade === "A+").length;
  const aPlusPct = trades.length ? aPlus / trades.length * 100 : 0;
  return {
    totalPnl,
    currentBalance,
    profitTargetBalance,
    toGoal,
    progressToGoal,
    dailyPnl,
    yesterdayPnl,
    remainingDrawdown,
    drawdownUsed: cappedDDUsed,
    drawdownUsedPct,
    nextTradeMaxRisk,
    avgLoss,
    avgWin,
    avgLossesLeft,
    winRate,
    rrRatio,
    expectancy,
    totalRisk,
    aPlusPct,
    totalTrades: trades.length
  };
};
const computeEquityCurve = (account, trades) => {
  const sorted = [...trades].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const byDay = {};
  for (const t of sorted) {
    const key = new Date(t.date).toISOString().slice(0, 10);
    byDay[key] = (byDay[key] || 0) + (t.pnl || 0);
  }
  const keys = Object.keys(byDay).sort();
  let bal = account.startingBalance;
  const points = keys.map((k) => {
    bal += byDay[k];
    return { date: k.slice(5), balance: Math.round(bal) };
  });
  if (points.length === 0)
    return [{ date: "—", balance: account.startingBalance }];
  return [{ date: "start", balance: account.startingBalance }, ...points];
};
const computeDailyPnl = (trades) => {
  const byDay = {};
  for (const t of trades) {
    const key = new Date(t.date).toISOString().slice(0, 10);
    byDay[key] = (byDay[key] || 0) + (t.pnl || 0);
  }
  return Object.keys(byDay).sort().slice(-10).map((k) => ({ date: k.slice(5), pnl: Math.round(byDay[k]) }));
};
const computeSetupQuality = (trades) => {
  const counts = { "A+": 0, B: 0, C: 0 };
  for (const t of trades) {
    if (t.setupGrade && counts[t.setupGrade] !== void 0)
      counts[t.setupGrade]++;
  }
  const total = counts["A+"] + counts.B + counts.C || 1;
  return [
    { name: "A+", value: Math.round(counts["A+"] / total * 100), color: "#7c5cff" },
    { name: "B", value: Math.round(counts.B / total * 100), color: "#ff5ca7" },
    { name: "C", value: Math.round(counts.C / total * 100), color: "#ffa53b" }
  ];
};
const fmtMoney = (n, signed = false) => {
  const sign = signed && n > 0 ? "+" : n < 0 ? "-" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const fmtPct = (n, digits = 2) => `${n.toFixed(digits)}%`;
const computeDailySessions = (trades) => {
  const byDay = {};
  for (const t of trades) {
    const key = new Date(t.date).toISOString().slice(0, 10);
    if (!byDay[key]) byDay[key] = { date: key, pnl: 0, fills: 0, trades: 0 };
    byDay[key].pnl += t.pnl || 0;
    byDay[key].fills += t.fills || 1;
    byDay[key].trades += 1;
  }
  return Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));
};
const computePayoutStatus = (account, trades) => {
  const sessions = computeDailySessions(trades);
  const totalProfit = sessions.reduce((s, x) => s + x.pnl, 0);
  const wins = sessions.filter((s) => s.pnl > 0);
  const largestProfitDay = wins.length ? Math.max(...wins.map((w) => w.pnl)) : 0;
  const consistencyLimit = totalProfit * 0.5;
  const consistencyPassed = totalProfit > 0 && largestProfitDay <= consistencyLimit;
  const requiredProfitForConsistency = largestProfitDay > 0 ? largestProfitDay / 0.5 : 0;
  const extraProfitForConsistency = Math.max(
    0,
    requiredProfitForConsistency - totalProfit
  );
  const currentBalance = account.startingBalance + totalProfit;
  const minPayoutBalance = account.startingBalance + account.profitTarget;
  const balanceRemaining = Math.max(0, minPayoutBalance - currentBalance);
  const balancePassed = currentBalance >= minPayoutBalance;
  const daysWithProfit250 = sessions.filter((s) => s.pnl >= 250).length;
  const rules = [
    { label: "Account Active", passed: true },
    { label: "5 Trading Days", passed: sessions.length >= 5 },
    { label: "5 Days with $250+ Profit", passed: daysWithProfit250 >= 5 },
    { label: "No Pending Payout", passed: true },
    { label: "Consistency Rule (50%)", passed: consistencyPassed },
    { label: "Minimum Payout Balance", passed: balancePassed },
    { label: "Valid Payout Information", passed: false }
  ];
  return {
    eligible: rules.every((r) => r.passed),
    totalProfit,
    largestProfitDay,
    consistencyLimit,
    consistencyPassed,
    requiredProfitForConsistency,
    extraProfitForConsistency,
    currentBalance,
    minPayoutBalance,
    balanceRemaining,
    balancePassed,
    rules
  };
};
export {
  fmtPct as a,
  computeAccount as b,
  computePayoutStatus as c,
  computeEquityCurve as d,
  computeDailyPnl as e,
  fmtMoney as f,
  computeSetupQuality as g
};
