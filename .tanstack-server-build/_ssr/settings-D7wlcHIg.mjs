import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, I as Input, r as resetAccess, L as Label } from "./router-DJBrMM3J.mjs";
import { B as Button } from "./button-CZ_3TZow.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function SettingsPage() {
  const {
    state,
    setAccount,
    setChecklist,
    setRedFlags,
    clearTrades,
    reset,
    loadApexData
  } = useAppStore();
  const a = state.account;
  const apexActive = !!state.apexImported;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "mx-auto flex max-w-[1100px] flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display-num neon-text-purple text-xl", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Edit everything that drives your dashboard. Calculations update instantly." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card flex flex-wrap items-center gap-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[260px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan", children: "Use Apex Imported Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Loads the imported PA-APEX-528639-06 session history. Dashboard, charts, payout page, weekly review, trade log, and statistics will use this data." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${apexActive ? "bg-[oklch(0.78_0.2_160/0.15)] text-[var(--neon-green)]" : "bg-[oklch(0.55_0.04_280/0.2)] text-muted-foreground"}`, children: apexActive ? "ACTIVE" : "INACTIVE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
        loadApexData();
        toast.success("Apex data imported — all metrics updated");
      }, className: "bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white", children: apexActive ? "Reload Apex Data" : "Load Apex Imported Data" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan mb-4", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldInput, { label: "Account Name", value: a.accountName, onChange: (v) => setAccount({
          accountName: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldInput, { label: "Prop Firm", value: a.propFirm, onChange: (v) => setAccount({
          propFirm: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldNum, { label: "Starting Balance", value: a.startingBalance, onChange: (v) => setAccount({
          startingBalance: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldNum, { label: "Profit Target", value: a.profitTarget, onChange: (v) => setAccount({
          profitTarget: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldNum, { label: "Max Drawdown", value: a.maxDrawdown, onChange: (v) => setAccount({
          maxDrawdown: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldNum, { label: "Remaining Drawdown ($)", value: a.remainingDrawdown, onChange: (v) => setAccount({
          remainingDrawdown: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldNum, { label: "Risk Divisor (Next Trade)", value: a.riskDivisor, onChange: (v) => setAccount({
          riskDivisor: v || 1
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan mb-4", children: "Daily Checklist Items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: state.checklist.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.label, onChange: (e) => {
        const next = [...state.checklist];
        next[i] = {
          ...c,
          label: e.target.value
        };
        setChecklist(next);
      }, className: "border-border/50 bg-background/40" }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-pink mb-4", children: "Red Flag Items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: state.redFlags.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.label, onChange: (e) => {
        const next = [...state.redFlags];
        next[i] = {
          ...c,
          label: e.target.value
        };
        setRedFlags(next);
      }, className: "border-border/50 bg-background/40" }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card flex flex-wrap gap-3 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
        clearTrades();
        toast.success("Demo trades cleared");
      }, children: "Clear All Trades" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
        reset();
        toast.success("Reset to defaults");
      }, children: "Reset to Defaults" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card flex flex-wrap items-center gap-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[260px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan", children: "Access Code (Session-Based)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Access is required every time a new browser tab or session is opened. Refreshing the current tab keeps you unlocked; closing it resets access. Use this button to force the code prompt again in this tab." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
        resetAccess();
        toast.success("Access reset — reload to re-enter code");
      }, children: "Reset Access" })
    ] })
  ] });
}
function FieldInput({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value, onChange: (e) => onChange(e.target.value), className: "border-border/50 bg-background/40" })
  ] });
}
function FieldNum({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value, onChange: (e) => onChange(+e.target.value), className: "border-border/50 bg-background/40" })
  ] });
}
export {
  SettingsPage as component
};
