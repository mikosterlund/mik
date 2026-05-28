import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AppState,
  Account,
  Trade,
  ChecklistItem,
  RedFlagItem,
  JournalEntry,
  WeeklyReview,
} from "./types";
import { APEX_ACCOUNT, buildApexTrades } from "./apexData";

const STORAGE_KEY = "tj_state_v5";

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(10 + Math.floor(Math.random() * 6), 0, 0, 0);
  return d.toISOString();
};

const seedRows: Array<[string, "long" | "short", number, "A+" | "B" | "C"]> = [
  ["NQ", "long", 250, "A+"],
  ["ES", "long", -180, "B"],
  ["NQ", "long", 420, "A+"],
  ["ES", "short", -220, "C"],
  ["NQ", "long", 380, "A+"],
  ["GC", "long", -150, "B"],
  ["NQ", "short", 510, "A+"],
  ["ES", "long", 290, "B"],
  ["NQ", "long", -310, "C"],
  ["NQ", "long", 880, "A+"],
  ["ES", "short", -284, "B"],
  ["NQ", "long", 198, "A+"],
  ["ES", "long", 305, "A+"],
  ["NQ", "short", -507, "B"],
];

const defaultChecklistItems: ChecklistItem[] = [
  { id: "1", label: "Slept 7+ hours", checked: false },
  { id: "2", label: "No revenge trading mindset", checked: false },
  { id: "3", label: "Reviewed plan", checked: false },
  { id: "4", label: "Marked key levels", checked: false },
  { id: "5", label: "Risk per trade ≤ allowed risk", checked: false },
  { id: "6", label: "I will follow my rules", checked: false },
];

const defaultRedFlags: RedFlagItem[] = [
  { id: "1", label: "Emotional trading", flagged: false },
  { id: "2", label: "Revenge trading", flagged: false },
  { id: "3", label: "Overtrading", flagged: false },
  { id: "4", label: "Increasing risk after loss", flagged: false },
  { id: "5", label: "Chasing the market", flagged: false },
];

function buildSeedTrades(): Trade[] {
  return seedRows.map(([instrument, direction, pnl, grade], i) => {
    const risk = 200 + Math.floor(Math.random() * 150);
    return {
      id: crypto.randomUUID(),
      date: daysAgo(13 - i),
      instrument,
      direction,
      entry: 18000 + Math.random() * 200,
      stopLoss: 17950 + Math.random() * 100,
      takeProfit: 18200 + Math.random() * 200,
      exit: 18000 + Math.random() * 200,
      risk,
      reward: risk * 1.5,
      rMultiple: +(pnl / risk).toFixed(2),
      pnl,
      setupType: "Breakout",
      setupGrade: grade,
      session: ["London", "NY AM", "NY PM"][i % 3],
      mistakes: "",
      emotions: "Focused",
      notes: "",
    };
  });
}

function buildDefaultState(): AppState {
  return {
    account: { ...APEX_ACCOUNT },
    trades: buildApexTrades(),
    checklist: defaultChecklistItems,
    redFlags: defaultRedFlags,
    notes: "",
    journals: {},
    notesByDate: {},
    checklistByDate: {},
    weeklyReviews: {},
    apexImported: true,
  };
}

const emptyState: AppState = {
  account: { ...APEX_ACCOUNT },
  trades: [],
  checklist: defaultChecklistItems,
  redFlags: defaultRedFlags,
  notes: "",
  journals: {},
  notesByDate: {},
  checklistByDate: {},
  weeklyReviews: {},
  apexImported: false,
};

interface Ctx {
  state: AppState;
  hydrated: boolean;
  setAccount: (a: Partial<Account>) => void;
  addTrade: (t: Omit<Trade, "id" | "rMultiple">) => void;
  updateTrade: (id: string, t: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;
  toggleChecklist: (id: string) => void;
  setChecklist: (items: ChecklistItem[]) => void;
  toggleRedFlag: (id: string) => void;
  setRedFlags: (items: RedFlagItem[]) => void;
  setNotes: (n: string) => void;
  setJournal: (date: string, j: Partial<JournalEntry>) => void;
  // new per-date helpers
  getNotesForDate: (date: string) => string;
  setNotesForDate: (date: string, n: string) => void;
  getChecklistForDate: (date: string) => ChecklistItem[];
  setChecklistForDate: (date: string, items: ChecklistItem[]) => void;
  toggleChecklistForDate: (date: string, id: string) => void;
  // weekly
  getWeeklyReview: (key: string) => WeeklyReview | undefined;
  setWeeklyReview: (key: string, r: Partial<WeeklyReview>) => void;
  clearTrades: () => void;
  reset: () => void;
  loadApexData: () => void;
  setApexImported: (v: boolean) => void;
}

const AppStoreCtx = createContext<Ctx | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...emptyState, ...parsed });
      } else {
        setState(buildDefaultState());
      }
    } catch {
      setState(buildDefaultState());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const value: Ctx = useMemo(
    () => ({
      state,
      hydrated,
      setAccount: (a) => setState((s) => ({ ...s, account: { ...s.account, ...a } })),
      addTrade: (t) =>
        setState((s) => {
          const trade: Trade = {
            ...t,
            id: crypto.randomUUID(),
            rMultiple: t.risk ? +(t.pnl / t.risk).toFixed(2) : 0,
          };
          return { ...s, trades: [trade, ...s.trades] };
        }),
      updateTrade: (id, patch) =>
        setState((s) => ({
          ...s,
          trades: s.trades.map((t) => {
            if (t.id !== id) return t;
            const merged = { ...t, ...patch };
            merged.rMultiple = merged.risk ? +(merged.pnl / merged.risk).toFixed(2) : 0;
            return merged;
          }),
        })),
      deleteTrade: (id) => setState((s) => ({ ...s, trades: s.trades.filter((t) => t.id !== id) })),
      toggleChecklist: (id) =>
        setState((s) => ({
          ...s,
          checklist: s.checklist.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)),
        })),
      setChecklist: (items) => setState((s) => ({ ...s, checklist: items })),
      toggleRedFlag: (id) =>
        setState((s) => ({
          ...s,
          redFlags: s.redFlags.map((c) => (c.id === id ? { ...c, flagged: !c.flagged } : c)),
        })),
      setRedFlags: (items) => setState((s) => ({ ...s, redFlags: items })),
      setNotes: (notes) => setState((s) => ({ ...s, notes })),
      setJournal: (date, j) =>
        setState((s) => ({
          ...s,
          journals: {
            ...s.journals,
            [date]: {
              date,
              emotion: s.journals[date]?.emotion ?? 7,
              discipline: s.journals[date]?.discipline ?? 7,
              confidence: s.journals[date]?.confidence ?? 7,
              sleepHours: s.journals[date]?.sleepHours ?? 7,
              marketCondition: s.journals[date]?.marketCondition ?? "",
              sessionNotes: s.journals[date]?.sessionNotes ?? "",
              ...j,
            },
          },
        })),
      getNotesForDate: (date) => state.notesByDate[date] ?? "",
      setNotesForDate: (date, n) =>
        setState((s) => ({ ...s, notesByDate: { ...s.notesByDate, [date]: n } })),
      getChecklistForDate: (date) =>
        state.checklistByDate[date] ?? s_template(state.checklist),
      setChecklistForDate: (date, items) =>
        setState((s) => ({ ...s, checklistByDate: { ...s.checklistByDate, [date]: items } })),
      toggleChecklistForDate: (date, id) =>
        setState((s) => {
          const current = s.checklistByDate[date] ?? s_template(s.checklist);
          const next = current.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c));
          return { ...s, checklistByDate: { ...s.checklistByDate, [date]: next } };
        }),
      getWeeklyReview: (key) => state.weeklyReviews[key],
      setWeeklyReview: (key, r) =>
        setState((s) => ({
          ...s,
          weeklyReviews: {
            ...s.weeklyReviews,
            [key]: {
              weekKey: key,
              wins: s.weeklyReviews[key]?.wins ?? "",
              mistakes: s.weeklyReviews[key]?.mistakes ?? "",
              improvements: s.weeklyReviews[key]?.improvements ?? "",
              notes: s.weeklyReviews[key]?.notes ?? "",
              updatedAt: new Date().toISOString(),
              ...r,
            },
          },
        })),
      clearTrades: () => setState((s) => ({ ...s, trades: [], apexImported: false })),
      reset: () => setState(buildDefaultState()),
      loadApexData: () =>
        setState((s) => ({
          ...s,
          account: { ...s.account, ...APEX_ACCOUNT },
          trades: buildApexTrades(),
          apexImported: true,
        })),
      setApexImported: (v) => setState((s) => ({ ...s, apexImported: v })),
    }),
    [state, hydrated],
  );

  return <AppStoreCtx.Provider value={value}>{children}</AppStoreCtx.Provider>;
}

// produce a fresh unchecked template from the master checklist labels
function s_template(master: ChecklistItem[]): ChecklistItem[] {
  return master.map((c) => ({ ...c, checked: false }));
}

export const useAppStore = () => {
  const ctx = useContext(AppStoreCtx);
  if (!ctx) throw new Error("useAppStore must be inside AppStoreProvider");
  return ctx;
};
