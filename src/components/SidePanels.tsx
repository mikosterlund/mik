import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { CheckCircle2, AlertCircle, Circle, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

type SaveStatus = "saved" | "dirty" | "saving";

function SaveBadge({ status }: { status: SaveStatus }) {
  const map = {
    saved: { text: "Saved", cls: "text-[var(--neon-green)]" },
    dirty: { text: "Unsaved changes", cls: "text-[var(--neon-orange)]" },
    saving: { text: "Saving…", cls: "text-muted-foreground" },
  } as const;
  return (
    <span className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${map[status].cls}`}>
      {status === "saved" && <Check className="h-3 w-3" />}
      {map[status].text}
    </span>
  );
}

export function DailyChecklist({ date = todayKey() }: { date?: string }) {
  const { hydrated, getChecklistForDate, setChecklistForDate, toggleChecklistForDate } = useAppStore();
  const items = hydrated ? getChecklistForDate(date) : [];
  const [status, setStatus] = useState<SaveStatus>("saved");
  const dirtyRef = useRef(false);

  // autosave: status flicks to saved shortly after change (already persisted by store)
  useEffect(() => {
    if (!dirtyRef.current) return;
    setStatus("saving");
    const t = setTimeout(() => setStatus("saved"), 350);
    return () => clearTimeout(t);
  }, [items]);

  const handleToggle = (id: string) => {
    dirtyRef.current = true;
    setStatus("dirty");
    toggleChecklistForDate(date, id);
  };

  const handleSave = () => {
    setStatus("saving");
    setChecklistForDate(date, items);
    setTimeout(() => setStatus("saved"), 250);
  };

  return (
    <div className="glass-card glass-card-hover p-6 h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="section-label neon-text-cyan">Daily Checklist</h3>
        <SaveBadge status={status} />
      </div>
      <ul className="space-y-3">
        {items.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => handleToggle(c.id)}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/5"
          >
            {c.checked ? (
              <CheckCircle2 className="h-5 w-5 text-[var(--neon-cyan)]" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
            <span className={`text-sm ${c.checked ? "text-foreground" : "text-muted-foreground"}`}>
              {c.label}
            </span>
          </motion.li>
        ))}
      </ul>
      <Button
        size="sm"
        variant="outline"
        onClick={handleSave}
        className="mt-4 w-full border-[var(--neon-cyan)]/30 text-xs hover:bg-[var(--neon-cyan)]/10"
      >
        Save Checklist
      </Button>
    </div>
  );
}

export function RedFlags() {
  const { state, toggleRedFlag } = useAppStore();
  return (
    <div className="glass-card glass-card-hover p-6 h-full">
      <h3 className="section-label neon-text-pink mb-4">Red Flags</h3>
      <ul className="space-y-3">
        {state.redFlags.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <AlertCircle
                className={`h-5 w-5 ${c.flagged ? "text-[var(--neon-red)]" : "text-[var(--neon-orange)]"}`}
              />
              <span className="text-sm text-foreground">{c.label}</span>
            </div>
            <button
              onClick={() => toggleRedFlag(c.id)}
              className={`h-5 w-5 rounded-md border transition-all ${
                c.flagged
                  ? "border-[var(--neon-red)] bg-[var(--neon-red)] shadow-[0_0_12px_var(--neon-red)]"
                  : "border-border bg-transparent"
              }`}
              aria-label="toggle"
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function TodaysNotes({ date = todayKey() }: { date?: string }) {
  const { hydrated, getNotesForDate, setNotesForDate } = useAppStore();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<SaveStatus>("saved");

  useEffect(() => {
    if (hydrated) setValue(getNotesForDate(date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, date]);

  // autosave with debounce
  useEffect(() => {
    if (!hydrated) return;
    if (value === getNotesForDate(date)) return;
    setStatus("dirty");
    const t = setTimeout(() => {
      setNotesForDate(date, value);
      setStatus("saving");
      setTimeout(() => setStatus("saved"), 250);
    }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSave = () => {
    setNotesForDate(date, value);
    setStatus("saving");
    setTimeout(() => setStatus("saved"), 250);
  };

  return (
    <div className="glass-card glass-card-hover p-6 h-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="section-label neon-text-pink">Today's Notes</h3>
        <SaveBadge status={status} />
      </div>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write any notes about today's mindset, market conditions, setups, mistakes, or lessons."
        className="h-[140px] resize-none border-border/50 bg-background/40 text-sm placeholder:text-muted-foreground/70"
      />
      <Button
        size="sm"
        variant="outline"
        onClick={handleSave}
        className="mt-3 w-full border-[var(--neon-pink)]/30 text-xs hover:bg-[var(--neon-pink)]/10"
      >
        Save Notes
      </Button>
    </div>
  );
}
