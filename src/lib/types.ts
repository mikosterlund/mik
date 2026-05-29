export type SetupGrade = "A+" | "B" | "C";
export type Direction = "long" | "short";

export interface Trade {
  id: string;
  date: string; // ISO
  instrument: string;
  direction: Direction;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  exit: number;
  risk: number;
  reward: number;
  rMultiple: number;
  pnl: number;
  fills?: number;
  setupType: string;
  setupGrade: SetupGrade;
  session: string;
  mistakes: string;
  emotions: string;
  notes: string;
  image15m?: string; // data URL
  image1m?: string;  // data URL
}
export interface Account {
  accountName: string;
  propFirm: string;
  startingBalance: number;
  profitTarget: number;
  maxDrawdown: number;
  riskDivisor: number;
  remainingDrawdown: number; // manually editable; drives risk calcs
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface RedFlagItem {
  id: string;
  label: string;
  flagged: boolean;
}

export interface JournalEntry {
  date: string;
  emotion: number;
  discipline: number;
  confidence: number;
  sleepHours: number;
  marketCondition: string;
  sessionNotes: string;
  mood?: number;
  sessionGrade?: string;
  reflections?: string;
  tags?: string;
}

export interface WeeklyReview {
  weekKey: string; // e.g. "2026-W22"
  wins: string;
  mistakes: string;
  improvements: string;
  notes: string;
  updatedAt: string;
}

export interface AudioSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  src: string;
}

export interface UserSettings {
  introSound?: "on" | "muted";
}

export interface AppState {
  account: Account;
  trades: Trade[];
  // legacy single fields kept for back-compat
  checklist: ChecklistItem[];
  redFlags: RedFlagItem[];
  notes: string;
  journals: Record<string, JournalEntry>;
  // new: per-date stores
  notesByDate: Record<string, string>;
  checklistByDate: Record<string, ChecklistItem[]>;
  weeklyReviews: Record<string, WeeklyReview>;
  audioSettings: AudioSettings;
  userSettings: UserSettings;
  apexImported?: boolean;
}
