import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { resetAccess } from "@/components/AccessGate";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Trading Journal" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { state, setAccount, setChecklist, setRedFlags, clearTrades, reset, loadApexData, setUserSettings } =
    useAppStore();
  const a = state.account;
  const apexActive = !!state.apexImported;
  const rain = state.userSettings.rainAmbience ?? "subtle";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-[1100px] flex-col gap-4"
    >
      <div className="glass-card p-6">
        <h2 className="display-num neon-text-purple text-xl">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit everything that drives your dashboard. Calculations update instantly.
        </p>
      </div>

      <div className="glass-card flex flex-wrap items-center gap-4 p-6">
        <div className="flex-1 min-w-[260px]">
          <h3 className="section-label neon-text-cyan">Use Apex Imported Data</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Loads the imported PA-APEX-528639-06 session history. Dashboard, charts,
            payout page, weekly review, trade log, and statistics will use this data.
          </p>
          <div
            className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              apexActive
                ? "bg-[oklch(0.78_0.2_160/0.15)] text-[var(--neon-green)]"
                : "bg-[oklch(0.55_0.04_280/0.2)] text-muted-foreground"
            }`}
          >
            {apexActive ? "ACTIVE" : "INACTIVE"}
          </div>
        </div>
        <Button
          onClick={() => {
            loadApexData();
            toast.success("Apex data imported — all metrics updated");
          }}
          className="bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white"
        >
          {apexActive ? "Reload Apex Data" : "Load Apex Imported Data"}
        </Button>
      </div>

      <div className="glass-card p-6">
        <h3 className="section-label neon-text-cyan mb-4">Account</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FieldInput label="Account Name" value={a.accountName} onChange={(v) => setAccount({ accountName: v })} />
          <FieldInput label="Prop Firm" value={a.propFirm} onChange={(v) => setAccount({ propFirm: v })} />
          <FieldNum label="Starting Balance" value={a.startingBalance} onChange={(v) => setAccount({ startingBalance: v })} />
          <FieldNum label="Profit Target" value={a.profitTarget} onChange={(v) => setAccount({ profitTarget: v })} />
          <FieldNum label="Max Drawdown" value={a.maxDrawdown} onChange={(v) => setAccount({ maxDrawdown: v })} />
          <FieldNum label="Remaining Drawdown ($)" value={a.remainingDrawdown} onChange={(v) => setAccount({ remainingDrawdown: v })} />
          <FieldNum label="Risk Divisor (Next Trade)" value={a.riskDivisor} onChange={(v) => setAccount({ riskDivisor: v || 1 })} />
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="section-label neon-text-cyan mb-4">Daily Checklist Items</h3>
        <div className="space-y-2">
          {state.checklist.map((c, i) => (
            <Input
              key={c.id}
              value={c.label}
              onChange={(e) => {
                const next = [...state.checklist];
                next[i] = { ...c, label: e.target.value };
                setChecklist(next);
              }}
              className="border-border/50 bg-background/40"
            />
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="section-label neon-text-pink mb-4">Red Flag Items</h3>
        <div className="space-y-2">
          {state.redFlags.map((c, i) => (
            <Input
              key={c.id}
              value={c.label}
              onChange={(e) => {
                const next = [...state.redFlags];
                next[i] = { ...c, label: e.target.value };
                setRedFlags(next);
              }}
              className="border-border/50 bg-background/40"
            />
          ))}
        </div>
      </div>

      <div className="glass-card flex flex-wrap gap-3 p-6">
        <Button
          variant="outline"
          onClick={() => {
            clearTrades();
            toast.success("Demo trades cleared");
          }}
        >
          Clear All Trades
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            reset();
            toast.success("Reset to defaults");
          }}
        >
          Reset to Defaults
        </Button>
      </div>

      <div className="glass-card flex flex-wrap items-center gap-4 p-6">
        <div className="flex-1 min-w-[260px]">
          <h3 className="section-label neon-text-cyan">Rain Ambience</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Faint cinematic rain over the dashboard — late-night penthouse mood.
            Pauses automatically when the tab is hidden.
          </p>
        </div>
        <div className="flex gap-2">
          {(["off", "subtle", "medium"] as const).map((opt) => (
            <Button
              key={opt}
              variant={rain === opt ? "default" : "outline"}
              onClick={() => setUserSettings({ rainAmbience: opt })}
              className={
                rain === opt
                  ? "bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white capitalize"
                  : "capitalize"
              }
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>

      <div className="glass-card flex flex-wrap items-center gap-4 p-6">
        <div className="flex-1 min-w-[260px]">
          <h3 className="section-label neon-text-cyan">Access Code (Session-Based)</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Access is required every time a new browser tab or session is opened.
            Refreshing the current tab keeps you unlocked; closing it resets access.
            Use this button to force the code prompt again in this tab.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            resetAccess();
            toast.success("Access reset — reload to re-enter code");
          }}
        >
          Reset Access
        </Button>
      </div>
    </motion.div>
  );
}

function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="section-label text-muted-foreground">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="border-border/50 bg-background/40" />
    </div>
  );
}
function FieldNum({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="section-label text-muted-foreground">{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="border-border/50 bg-background/40"
      />
    </div>
  );
}
