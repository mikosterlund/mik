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
  AudioSettings,
  UserSettings,
} from "./types";
import { APEX_ACCOUNT, buildApexTrades } from "./apexData";
import {
  DEFAULT_AUDIO_SETTINGS,
  DEFAULT_USER_SETTINGS,
  loadData,
  saveData,
  updateDailyJournal,
  updateSettings,
  updateTrades,
  updateWeeklyReviews,
} from "./storage";

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
    audioSettings: DEFAULT_AUDIO_SETTINGS,
    userSettings: DEFAULT_USER_SETTINGS,
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
  audioSettings: DEFAULT_AUDIO_SETTINGS,
  userSettings: DEFAULT_USER_SETTINGS,
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
  setAudioSettings: (settings: Partial<AudioSettings>) => void;
  setUserSettings: (settings: Partial<UserSettings>) => void;
  clearTrades: () => void;
  reset: () => void;
  loadApexData: () => void;
  setApexImported: (v: boolean) => void;
}

const AppStoreCtx = createContext<Ctx | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  // Initialize synchronously from localStorage so we NEVER overwrite saved
  // user data with default/demo data on mount. On the server (SSR/prerender)
  // window is undefined, so we start with emptyState and load on mount.
  const [state, setStateRaw] = useState<AppState>(() => {
    const persisted = loadData(emptyState);
    if (persisted) return persisted;
    if (typeof window === "undefined") return emptyState;
    // First-ever visit on this device: seed demo data AND persist it so we
    // never treat the next load as a fresh install.
    const seeded = buildDefaultState();
    saveData(seeded);
    return seeded;
  });
  const [hydrated, setHydrated] = useState<boolean>(() => typeof window !== "undefined");

  // If we started on the server (no window), do the load on mount.
  useEffect(() => {
    if (hydrated) return;
    const persisted = loadData(emptyState);
    if (persisted) setStateRaw(persisted);
    else {
      const seeded = buildDefaultState();
      saveData(seeded);
      setStateRaw(seeded);
    }
    setHydrated(true);
  }, [hydrated]);

  // setState wrapper: persist SYNCHRONOUSLY on every mutation so data
  // survives even an immediate tab close after the action.
  const setState = (updater: AppState | ((prev: AppState) => AppState)) => {
    setStateRaw((prev) => {
      const next =
        typeof updater === "function"
          ? (updater as (p: AppState) => AppState)(prev)
          : updater;
      saveData(next);
      return next;
    });
  };

  // Belt-and-braces: also persist on visibility/pagehide events.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const flush = () => saveData(state);
    window.addEventListener("pagehide", flush);
    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", flush);
    };
  }, [state]);



  const value: Ctx = useMemo(
    () => ({
      state,
      hydrated,
      setAccount: (a) =>
        setState((s) => updateSettings(s, { account: { ...s.account, ...a } })),
      addTrade: (t) =>
        setState((s) => {
          const trade: Trade = {
            ...t,
            id: crypto.randomUUID(),
            rMultiple: t.risk ? +(t.pnl / t.risk).toFixed(2) : 0,
          };
          return updateTrades(s, [trade, ...s.trades]);
        }),
      updateTrade: (id, patch) =>
        setState((s) =>
          updateTrades(
            s,
            s.trades.map((t) => {
            if (t.id !== id) return t;
            const merged = { ...t, ...patch };
            merged.rMultiple = merged.risk ? +(merged.pnl / merged.risk).toFixed(2) : 0;
            return merged;
            }),
          ),
        ),
      deleteTrade: (id) => setState((s) => updateTrades(s, s.trades.filter((t) => t.id !== id))),
      toggleChecklist: (id) =>
        setState((s) =>
          updateSettings(s, {
            checklist: s.checklist.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)),
          }),
        ),
      setChecklist: (items) => setState((s) => updateSettings(s, { checklist: items })),
      toggleRedFlag: (id) =>
        setState((s) =>
          updateSettings(s, {
            redFlags: s.redFlags.map((c) => (c.id === id ? { ...c, flagged: !c.flagged } : c)),
          }),
        ),
      setRedFlags: (items) => setState((s) => updateSettings(s, { redFlags: items })),
      setNotes: (notes) => setState((s) => updateSettings(s, { notes })),
      setJournal: (date, j) =>
        setState((s) =>
          updateDailyJournal(s, {
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
            notesByDate: s.notesByDate,
            checklistByDate: s.checklistByDate,
          }),
        ),
      getNotesForDate: (date) => state.notesByDate[date] ?? "",
      setNotesForDate: (date, n) =>
        setState((s) =>
          updateDailyJournal(s, {
            journals: s.journals,
            notesByDate: { ...s.notesByDate, [date]: n },
            checklistByDate: s.checklistByDate,
          }),
        ),
      getChecklistForDate: (date) =>
        state.checklistByDate[date] ?? s_template(state.checklist),
      setChecklistForDate: (date, items) =>
        setState((s) =>
          updateDailyJournal(s, {
            journals: s.journals,
            notesByDate: s.notesByDate,
            checklistByDate: { ...s.checklistByDate, [date]: items },
          }),
        ),
      toggleChecklistForDate: (date, id) =>
        setState((s) => {
          const current = s.checklistByDate[date] ?? s_template(s.checklist);
          const next = current.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c));
          return updateDailyJournal(s, {
            journals: s.journals,
            notesByDate: s.notesByDate,
            checklistByDate: { ...s.checklistByDate, [date]: next },
          });
        }),
      getWeeklyReview: (key) => state.weeklyReviews[key],
      setWeeklyReview: (key, r) =>
        setState((s) =>
          updateWeeklyReviews(s, {
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
          }),
        ),
      setAudioSettings: (settings) =>
        setState((s) => updateSettings(s, { audioSettings: { ...s.audioSettings, ...settings } })),
      setUserSettings: (settings) =>
        setState((s) => updateSettings(s, { userSettings: { ...s.userSettings, ...settings } })),
      clearTrades: () => setState((s) => updateTrades({ ...s, apexImported: false }, [])),
      reset: () => setState((s) => updateSettings(s, buildDefaultState())),
      loadApexData: () =>
        setState((s) =>
          updateTrades(
            updateSettings(s, { account: { ...s.account, ...APEX_ACCOUNT }, apexImported: true }),
            buildApexTrades(),
          ),
        ),
      setApexImported: (v) => setState((s) => updateSettings(s, { apexImported: v })),
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
