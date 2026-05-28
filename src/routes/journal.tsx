import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [{ title: "Daily Journal — Trading Journal" }] }),
  component: JournalPage,
});

function shiftDate(iso: string, days: number) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function JournalPage() {
  const { state, setJournal, hydrated } = useAppStore();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const existing = state.journals[date];
  const blank = {
    date,
    emotion: 7,
    discipline: 7,
    confidence: 7,
    sleepHours: 7,
    marketCondition: "",
    sessionNotes: "",
    mood: 7,
    sessionGrade: "B",
    reflections: "",
    tags: "",
  };
  const [draft, setDraft] = useState(existing ?? blank);
  const [status, setStatus] = useState<"saved" | "dirty" | "saving">("saved");

  useEffect(() => {
    if (!hydrated) return;
    setDraft(state.journals[date] ?? { ...blank, date });
    setStatus("saved");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, hydrated]);

  const update = (patch: Partial<typeof draft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setStatus("dirty");
  };

  // autosave debounced
  useEffect(() => {
    if (status !== "dirty") return;
    const t = setTimeout(() => {
      setJournal(date, draft);
      setStatus("saving");
      setTimeout(() => setStatus("saved"), 250);
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const save = () => {
    setJournal(date, draft);
    setStatus("saving");
    setTimeout(() => {
      setStatus("saved");
      toast.success("Journal saved");
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 lg:grid-cols-2"
    >
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="display-num neon-text-purple text-xl">Daily Journal</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDate(shiftDate(date, -1))}
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-[160px] border-border/50 bg-background/40"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDate(shiftDate(date, 1))}
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <NumericSlider label="Mood" color="var(--neon-purple)" value={draft.mood ?? 7} onChange={(v) => update({ mood: v })} />
          <NumericSlider label="Emotional Control" color="var(--neon-purple)" value={draft.emotion} onChange={(v) => update({ emotion: v })} />
          <NumericSlider label="Discipline Score" color="var(--neon-cyan)" value={draft.discipline} onChange={(v) => update({ discipline: v })} />
          <NumericSlider label="Confidence Score" color="var(--neon-pink)" value={draft.confidence} onChange={(v) => update({ confidence: v })} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="section-label text-muted-foreground">Sleep (hours)</Label>
              <Input
                type="number"
                value={draft.sleepHours}
                onChange={(e) => update({ sleepHours: +e.target.value })}
                className="mt-2 border-border/50 bg-background/40"
              />
            </div>
            <div>
              <Label className="section-label text-muted-foreground">Session Grade</Label>
              <Input
                value={draft.sessionGrade ?? ""}
                onChange={(e) => update({ sessionGrade: e.target.value })}
                placeholder="A / B / C"
                className="mt-2 border-border/50 bg-background/40"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="section-label neon-text-cyan">Market Condition</h3>
          <span
            className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${
              status === "saved" ? "text-[var(--neon-green)]" : status === "dirty" ? "text-[var(--neon-orange)]" : "text-muted-foreground"
            }`}
          >
            {status === "saved" && <Check className="h-3 w-3" />}
            {status === "saved" ? "Saved" : status === "dirty" ? "Unsaved changes" : "Saving…"}
          </span>
        </div>
        <Textarea
          value={draft.marketCondition}
          onChange={(e) => update({ marketCondition: e.target.value })}
          placeholder="Trending? Ranging? Volatile? Key levels in play?"
          className="h-24 border-border/50 bg-background/40"
        />
        <h3 className="section-label neon-text-pink mb-2 mt-6">Session Notes</h3>
        <Textarea
          value={draft.sessionNotes}
          onChange={(e) => update({ sessionNotes: e.target.value })}
          placeholder="What went well? What was off?"
          className="h-28 border-border/50 bg-background/40"
        />
        <h3 className="section-label neon-text-purple mb-2 mt-6">Reflections</h3>
        <Textarea
          value={draft.reflections ?? ""}
          onChange={(e) => update({ reflections: e.target.value })}
          placeholder="Lessons learned, identity shifts, gratitude."
          className="h-28 border-border/50 bg-background/40"
        />
        <div className="mt-6">
          <Label className="section-label text-muted-foreground">Tags</Label>
          <Input
            value={draft.tags ?? ""}
            onChange={(e) => update({ tags: e.target.value })}
            placeholder="patience, A+ setup, FOMC"
            className="mt-2 border-border/50 bg-background/40"
          />
        </div>
        <Button
          onClick={save}
          className="mt-6 w-full bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white shadow-[0_0_24px_-6px_var(--neon-purple)]"
        >
          Save Journal
        </Button>
      </div>
    </motion.div>
  );
}

function NumericSlider({
  label,
  value,
  onChange,
  color,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="section-label text-muted-foreground">{label}</Label>
        <span className="display-num text-lg" style={{ color, textShadow: `0 0 12px ${color}` }}>
          {value}/10
        </span>
      </div>
      <Slider value={[value]} min={1} max={10} step={1} onValueChange={(v) => onChange(v[0])} className="mt-3" />
    </div>
  );
}
