import type { AppState, AudioSettings, UserSettings } from "./types";

export const STORAGE_KEY = "trading_journal_app_state_v1";

const LEGACY_KEYS = [
  "trading_journal_state_v1",
  "tj_state_v5",
  "trading_journal_trades_v1",
  "trading_journal_daily_journal_v1",
  "trading_journal_weekly_reviews_v1",
];

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  enabled: true,
  muted: false,
  volume: 0.05,
  src: "/audio/ambient.mp3",
};

export const DEFAULT_USER_SETTINGS: UserSettings = {
  introSound: "on",
};

function isDevelopment() {
  return import.meta.env.DEV;
}

function safeLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function normalizeAppState(state: Partial<AppState>, fallback?: AppState): AppState {
  return {
    account: state.account ?? fallback!.account,
    trades: Array.isArray(state.trades) ? state.trades : [],
    checklist: Array.isArray(state.checklist) ? state.checklist : (fallback?.checklist ?? []),
    redFlags: Array.isArray(state.redFlags) ? state.redFlags : (fallback?.redFlags ?? []),
    notes: state.notes ?? fallback?.notes ?? "",
    journals: state.journals ?? fallback?.journals ?? {},
    notesByDate: state.notesByDate ?? fallback?.notesByDate ?? {},
    checklistByDate: state.checklistByDate ?? fallback?.checklistByDate ?? {},
    weeklyReviews: state.weeklyReviews ?? fallback?.weeklyReviews ?? {},
    audioSettings: { ...DEFAULT_AUDIO_SETTINGS, ...(fallback?.audioSettings ?? {}), ...(state.audioSettings ?? {}) },
    userSettings: { ...DEFAULT_USER_SETTINGS, ...(fallback?.userSettings ?? {}), ...(state.userSettings ?? {}) },
    apexImported: state.apexImported ?? false,
  };
}

export function loadData(fallback?: AppState): AppState | null {
  const ls = safeLocalStorage();
  if (!ls) return null;

  try {
    let raw = ls.getItem(STORAGE_KEY);

    if (!raw) {
      for (const key of LEGACY_KEYS) {
        const legacy = ls.getItem(key);
        if (legacy) {
          raw = legacy;
          break;
        }
      }
    }

    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<AppState>;
    const state = normalizeAppState(parsed, fallback);
    ls.setItem(STORAGE_KEY, JSON.stringify(state));

    if (isDevelopment()) console.log("Loaded saved trading journal state");
    return state;
  } catch {
    return null;
  }
}

export function saveData(state: AppState): boolean {
  const ls = safeLocalStorage();
  if (!ls) return false;

  try {
    ls.setItem(STORAGE_KEY, JSON.stringify(normalizeAppState(state)));
    if (isDevelopment()) console.log("Saved trading journal state");
    return true;
  } catch {
    return false;
  }
}

export function updateTrades(state: AppState, trades: AppState["trades"]): AppState {
  const next = normalizeAppState({ ...state, trades });
  saveData(next);
  return next;
}

export function updateSettings(state: AppState, settings: Partial<AppState>): AppState {
  const next = normalizeAppState({ ...state, ...settings });
  saveData(next);
  return next;
}

export function updateDailyJournal(
  state: AppState,
  daily: Pick<AppState, "journals" | "notesByDate" | "checklistByDate">,
): AppState {
  const next = normalizeAppState({ ...state, ...daily });
  saveData(next);
  return next;
}

export function updateWeeklyReviews(
  state: AppState,
  weeklyReviews: AppState["weeklyReviews"],
): AppState {
  const next = normalizeAppState({ ...state, weeklyReviews });
  saveData(next);
  return next;
}