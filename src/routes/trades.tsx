import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { fmtMoney } from "@/lib/calc";
import { Plus, Trash2, Search, Download, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { Trade, SetupGrade } from "@/lib/types";

export const Route = createFileRoute("/trades")({
  head: () => ({
    meta: [{ title: "Trade Log — Trading Journal" }],
  }),
  component: TradesPage,
});

export type TradeForm = Omit<Trade, "id" | "rMultiple">;

export const emptyTrade = (): TradeForm => ({
  date: new Date().toISOString().slice(0, 16),
  instrument: "NQ",
  direction: "long",
  entry: 0,
  stopLoss: 0,
  takeProfit: 0,
  exit: 0,
  risk: 0,
  reward: 0,
  pnl: 0,
  fills: 1,
  setupType: "Breakout",
  setupGrade: "A+",
  session: "NY AM",
  mistakes: "",
  emotions: "",
  notes: "",
  image15m: undefined,
  image1m: undefined,
});

export const tradeToForm = (t: Trade): TradeForm => ({
  date: t.date.slice(0, 16),
  instrument: t.instrument,
  direction: t.direction,
  entry: t.entry,
  stopLoss: t.stopLoss,
  takeProfit: t.takeProfit,
  exit: t.exit,
  risk: t.risk,
  reward: t.reward,
  pnl: t.pnl,
  fills: t.fills ?? 1,
  setupType: t.setupType,
  setupGrade: t.setupGrade,
  session: t.session,
  mistakes: t.mistakes,
  emotions: t.emotions,
  notes: t.notes,
  image15m: t.image15m,
  image1m: t.image1m,
});

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function TradesPage() {
  const { state, addTrade, updateTrade, deleteTrade } = useAppStore();
  const [q, setQ] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [form, setForm] = useState<TradeForm>(emptyTrade());
  const [preview, setPreview] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.toLowerCase().trim();
    const sorted = [...state.trades].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    if (!term) return sorted;
    return sorted.filter(
      (t) =>
        t.instrument.toLowerCase().includes(term) ||
        t.setupType.toLowerCase().includes(term) ||
        t.session.toLowerCase().includes(term) ||
        t.notes.toLowerCase().includes(term),
    );
  }, [state.trades, q]);

  const exportCsv = () => {
    const headers = [
      "date","instrument","direction","entry","stopLoss","takeProfit","exit",
      "risk","reward","rMultiple","pnl","fills","setupType","setupGrade",
      "session","mistakes","emotions","notes",
    ];
    const rows = state.trades.map((t) =>
      headers.map((h) => JSON.stringify((t as any)[h] ?? "")).join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trades.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported trades.csv");
  };

  const openAdd = () => {
    setForm(emptyTrade());
    setAddOpen(true);
  };

  const openEdit = (t: Trade) => {
    setForm(tradeToForm(t));
    setEditId(t.id);
  };

  const submitAdd = () => {
    if (!form.instrument) {
      toast.error("Instrument required");
      return;
    }
    addTrade({ ...form, date: new Date(form.date).toISOString() });
    setAddOpen(false);
    setForm(emptyTrade());
    toast.success("Trade added");
  };

  const submitEdit = () => {
    if (!editId) return;
    updateTrade(editId, { ...form, date: new Date(form.date).toISOString() });
    setEditId(null);
    toast.success("Trade updated");
  };

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card flex flex-wrap items-center gap-3 p-4"
      >
        <h2 className="display-num neon-text-purple text-xl">Trade Log</h2>
        <div className="relative ml-auto w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search trades..."
            className="border-border/50 bg-background/40 pl-9"
          />
        </div>
        <Button variant="outline" onClick={exportCsv} className="gap-2">
          <Download className="h-4 w-4" /> CSV
        </Button>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openAdd}
              className="gap-2 bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white shadow-[0_0_24px_-6px_var(--neon-purple)]"
            >
              <Plus className="h-4 w-4" /> Add Trade
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Trade</DialogTitle>
            </DialogHeader>
            <TradeFormFields form={form} setForm={setForm} />
            <Button
              onClick={submitAdd}
              className="bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white"
            >
              Save Trade
            </Button>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[oklch(0.18_0.05_285/0.6)] text-left">
              <tr className="section-label text-muted-foreground">
                {["Date","Instr","Dir","Entry","Exit","Risk","PnL","R","Fills","Setup","Grade","Session","Charts","Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-border/30 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-semibold">{t.instrument}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                        t.direction === "long"
                          ? "bg-[oklch(0.78_0.2_160/0.15)] text-[var(--neon-green)]"
                          : "bg-[oklch(0.65_0.27_20/0.15)] text-[var(--neon-red)]"
                      }`}
                    >
                      {t.direction.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">{t.entry.toFixed(2)}</td>
                  <td className="px-4 py-3">{t.exit.toFixed(2)}</td>
                  <td className="px-4 py-3">{fmtMoney(t.risk)}</td>
                  <td className={`px-4 py-3 font-semibold ${t.pnl >= 0 ? "neon-text-green" : "neon-text-pink"}`}>
                    {fmtMoney(t.pnl, true)}
                  </td>
                  <td className="px-4 py-3">{t.rMultiple.toFixed(2)}R</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.fills ?? 1}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.setupType}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                        t.setupGrade === "A+"
                          ? "bg-[oklch(0.68_0.27_295/0.18)] text-[var(--neon-purple)]"
                          : t.setupGrade === "B"
                            ? "bg-[oklch(0.72_0.27_0/0.18)] text-[var(--neon-pink)]"
                            : "bg-[oklch(0.78_0.18_50/0.18)] text-[var(--neon-orange)]"
                      }`}
                    >
                      {t.setupGrade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.session}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Thumb src={t.image15m} label="15m" onClick={() => t.image15m && setPreview(t.image15m)} />
                      <Thumb src={t.image1m} label="1m" onClick={() => t.image1m && setPreview(t.image1m)} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="grid h-8 w-8 place-items-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-[var(--neon-purple)] hover:text-[var(--neon-purple)]"
                        aria-label="Edit trade"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(t.id)}
                        className="grid h-8 w-8 place-items-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-[var(--neon-red)] hover:text-[var(--neon-red)]"
                        aria-label="Delete trade"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={14} className="px-4 py-10 text-center text-muted-foreground">
                    No trades yet — add your first trade above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      <Dialog open={!!editId} onOpenChange={(o) => !o && setEditId(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Trade</DialogTitle>
          </DialogHeader>
          <TradeFormFields form={form} setForm={setForm} />
          <Button
            onClick={submitEdit}
            className="bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white"
          >
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>

      {/* Image preview */}
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-4xl border-border/40 bg-background/95 p-2">
          {preview && (
            <img src={preview} alt="Chart preview" className="h-auto w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this trade?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the trade and recalculates every metric, chart, and payout
              status. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmDelete) {
                  deleteTrade(confirmDelete);
                  toast.success("Trade deleted");
                }
                setConfirmDelete(null);
              }}
              className="bg-[var(--neon-red)] text-white hover:bg-[var(--neon-red)]/80"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function TradeFormFields({
  form,
  setForm,
}: {
  form: TradeForm;
  setForm: (f: TradeForm) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label="Date">
        <Input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </Field>
      <Field label="Instrument">
        <Input
          value={form.instrument}
          onChange={(e) => setForm({ ...form, instrument: e.target.value })}
        />
      </Field>
      <Field label="Direction">
        <Select
          value={form.direction}
          onValueChange={(v: any) => setForm({ ...form, direction: v })}
        >
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="long">Long</SelectItem>
            <SelectItem value="short">Short</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Session">
        <Input value={form.session} onChange={(e) => setForm({ ...form, session: e.target.value })} />
      </Field>
      <Field label="Entry">
        <Input type="number" value={form.entry} onChange={(e) => setForm({ ...form, entry: +e.target.value })} />
      </Field>
      <Field label="Stop Loss">
        <Input type="number" value={form.stopLoss} onChange={(e) => setForm({ ...form, stopLoss: +e.target.value })} />
      </Field>
      <Field label="Take Profit">
        <Input type="number" value={form.takeProfit} onChange={(e) => setForm({ ...form, takeProfit: +e.target.value })} />
      </Field>
      <Field label="Exit">
        <Input type="number" value={form.exit} onChange={(e) => setForm({ ...form, exit: +e.target.value })} />
      </Field>
      <Field label="Risk ($)">
        <Input type="number" value={form.risk} onChange={(e) => setForm({ ...form, risk: +e.target.value })} />
      </Field>
      <Field label="Reward ($)">
        <Input type="number" value={form.reward} onChange={(e) => setForm({ ...form, reward: +e.target.value })} />
      </Field>
      <Field label="PnL ($)">
        <Input type="number" step="0.01" value={form.pnl} onChange={(e) => setForm({ ...form, pnl: +e.target.value })} />
      </Field>
      <Field label="Fills / Trades">
        <Input type="number" value={form.fills ?? 1} onChange={(e) => setForm({ ...form, fills: +e.target.value })} />
      </Field>
      <Field label="Setup Type">
        <Input value={form.setupType} onChange={(e) => setForm({ ...form, setupType: e.target.value })} />
      </Field>
      <Field label="Setup Grade">
        <Select
          value={form.setupGrade}
          onValueChange={(v: SetupGrade) => setForm({ ...form, setupGrade: v })}
        >
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="C">C</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Emotions">
        <Input value={form.emotions} onChange={(e) => setForm({ ...form, emotions: e.target.value })} />
      </Field>
      <Field label="Mistakes" className="col-span-2">
        <Input value={form.mistakes} onChange={(e) => setForm({ ...form, mistakes: e.target.value })} />
      </Field>
      <Field label="Notes" className="col-span-2">
        <Textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </Field>
      <Field label="15m Timeframe Screenshot">
        <ImageField
          value={form.image15m}
          onChange={(v) => setForm({ ...form, image15m: v })}
        />
      </Field>
      <Field label="1m Timeframe Screenshot">
        <ImageField
          value={form.image1m}
          onChange={(v) => setForm({ ...form, image1m: v })}
        />
      </Field>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Label className="section-label text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ImageField({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}) {
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await fileToDataUrl(f);
    onChange(url);
  };
  return (
    <div className="flex items-center gap-3">
      {value ? (
        <div className="relative">
          <img src={value} alt="" className="h-16 w-24 rounded-md border border-border object-cover" />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[var(--neon-red)] text-[10px] text-white"
            aria-label="Remove"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="grid h-16 w-24 place-items-center rounded-md border border-dashed border-border bg-background/40 text-[10px] text-muted-foreground">
          No image
        </div>
      )}
      <Input type="file" accept="image/*" onChange={onFile} className="border-border/50 bg-background/40 text-xs" />
    </div>
  );
}

function Thumb({
  src,
  label,
  onClick,
}: {
  src: string | undefined;
  label: string;
  onClick: () => void;
}) {
  if (!src) {
    return (
      <div className="grid h-9 w-12 place-items-center rounded-md border border-dashed border-border/50 text-[9px] uppercase text-muted-foreground/60">
        {label}
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      className="group relative h-9 w-12 overflow-hidden rounded-md border border-border/60 transition hover:border-[var(--neon-purple)] hover:shadow-[0_0_12px_-2px_var(--neon-purple)]"
      aria-label={`Open ${label} chart`}
    >
      <img src={src} alt={label} className="h-full w-full object-cover" />
      <span className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 text-center text-[8px] uppercase tracking-wider text-white">
        {label}
      </span>
    </button>
  );
}
