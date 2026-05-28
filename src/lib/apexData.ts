import type { Trade, Account } from "./types";

export const APEX_ACCOUNT: Account = {
  accountName: "PA-APEX-528639-06",
  propFirm: "Apex Trader Funding",
  startingBalance: 50000,
  profitTarget: 2600, // delta to reach $52,600 minimum payout balance
  maxDrawdown: 2500,
  riskDivisor: 7,
  remainingDrawdown: 1341,
};

export interface ApexSession {
  date: string;        // YYYY-MM-DD
  balance: number;     // end-of-day account balance
  pnl: number;         // closed P&L for that day
  fills: number;       // trade fills count
}

export const APEX_SESSIONS: ApexSession[] = [
  { date: "2026-04-15", balance: 49217.44, pnl: -782.56, fills: 6 },
  { date: "2026-04-16", balance: 49701.82, pnl:  484.38, fills: 3 },
  { date: "2026-04-23", balance: 49474.74, pnl: -227.08, fills: 2 },
  { date: "2026-04-28", balance: 49815.96, pnl:  341.22, fills: 4 },
  { date: "2026-04-29", balance: 49810.34, pnl:   -5.62, fills: 3 },
  { date: "2026-04-30", balance: 50590.18, pnl:  779.84, fills: 4 },
  { date: "2026-05-07", balance: 50073.48, pnl: -516.70, fills: 8 },
  { date: "2026-05-12", balance: 50059.40, pnl:  -14.08, fills: 2 },
  { date: "2026-05-13", balance: 50289.62, pnl:  230.22, fills: 4 },
  { date: "2026-05-19", balance: 50755.54, pnl:  465.92, fills: 2 },
  { date: "2026-05-20", balance: 51148.00, pnl:  392.46, fills: 2 },
  { date: "2026-05-21", balance: 50830.68, pnl: -317.32, fills: 5 },
  { date: "2026-05-22", balance: 51058.10, pnl:  227.42, fills: 3 },
  { date: "2026-05-26", balance: 50463.66, pnl: -594.44, fills: 4 },
  { date: "2026-05-27", balance: 51063.08, pnl:  599.42, fills: 3 },
  { date: "2026-05-28", balance: 50555.88, pnl: -507.20, fills: 2 },
];

// Stable IDs so reimports don't shift identity
export function buildApexTrades(): Trade[] {
  return APEX_SESSIONS.map((s, i) => ({
    id: `apex-${s.date}`,
    date: `${s.date}T15:00:00`,
    instrument: "MNQ",
    direction: s.pnl >= 0 ? "long" : "short",
    entry: 0,
    stopLoss: 0,
    takeProfit: 0,
    exit: 0,
    risk: Math.max(50, Math.round(Math.abs(s.pnl))),
    reward: Math.max(50, Math.round(Math.abs(s.pnl))),
    rMultiple: s.pnl >= 0 ? 1 : -1,
    pnl: s.pnl,
    fills: s.fills,
    setupType: "Apex Session",
    setupGrade: s.pnl >= 0 ? "A+" : "B",
    session: "NY",
    mistakes: "",
    emotions: "",
    notes: `Imported Apex session • ${s.fills} fills • Balance $${s.balance.toFixed(2)}`,
  }));
}
