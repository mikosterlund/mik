import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Textarea, u as useAppStore, g as emptyTrade, L as Label, t as tradeToForm, f as cn } from "./router-DJBrMM3J.mjs";
import { f as fmtMoney } from "./calc-DZy82t1v.mjs";
import { B as Button, b as buttonVariants } from "./button-CZ_3TZow.mjs";
import { D as Dialog, d as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DQklp8fb.mjs";
import { R as Root2, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { S as Search, D as Download, p as Plus, P as Pencil, o as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function TradesPage() {
  const {
    state,
    addTrade,
    updateTrade,
    deleteTrade
  } = useAppStore();
  const [q, setQ] = reactExports.useState("");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editId, setEditId] = reactExports.useState(null);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyTrade());
  const [preview, setPreview] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    const term = q.toLowerCase().trim();
    const sorted = [...state.trades].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (!term) return sorted;
    return sorted.filter((t) => t.instrument.toLowerCase().includes(term) || t.setupType.toLowerCase().includes(term) || t.session.toLowerCase().includes(term) || t.notes.toLowerCase().includes(term));
  }, [state.trades, q]);
  const exportCsv = () => {
    const headers = ["date", "instrument", "direction", "entry", "stopLoss", "takeProfit", "exit", "risk", "reward", "rMultiple", "pnl", "fills", "setupType", "setupGrade", "session", "mistakes", "emotions", "notes"];
    const rows = state.trades.map((t) => headers.map((h) => JSON.stringify(t[h] ?? "")).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], {
      type: "text/csv"
    });
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
  const openEdit = (t) => {
    setForm(tradeToForm(t));
    setEditId(t.id);
  };
  const submitAdd = () => {
    if (!form.instrument) {
      toast.error("Instrument required");
      return;
    }
    addTrade({
      ...form,
      date: new Date(form.date).toISOString()
    });
    setAddOpen(false);
    setForm(emptyTrade());
    toast.success("Trade added");
  };
  const submitEdit = () => {
    if (!editId) return;
    updateTrade(editId, {
      ...form,
      date: new Date(form.date).toISOString()
    });
    setEditId(null);
    toast.success("Trade updated");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1600px] flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "glass-card flex flex-wrap items-center gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display-num neon-text-purple text-xl", children: "Trade Log" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative ml-auto w-full max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search trades...", className: "border-border/50 bg-background/40 pl-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportCsv, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " CSV"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: addOpen, onOpenChange: setAddOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, className: "gap-2 bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white shadow-[0_0_24px_-6px_var(--neon-purple)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add Trade"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-2xl overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Trade" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TradeFormFields, { form, setForm }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submitAdd, className: "bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white", children: "Save Trade" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[oklch(0.18_0.05_285/0.6)] text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "section-label text-muted-foreground", children: ["Date", "Instr", "Dir", "Entry", "Exit", "Risk", "PnL", "R", "Fills", "Setup", "Grade", "Session", "Charts", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 whitespace-nowrap", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/30 transition-colors hover:bg-white/[0.02]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap text-muted-foreground", children: new Date(t.date).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: t.instrument }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-2 py-0.5 text-xs font-semibold ${t.direction === "long" ? "bg-[oklch(0.78_0.2_160/0.15)] text-[var(--neon-green)]" : "bg-[oklch(0.65_0.27_20/0.15)] text-[var(--neon-red)]"}`, children: t.direction.toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: t.entry.toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: t.exit.toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: fmtMoney(t.risk) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `px-4 py-3 font-semibold ${t.pnl >= 0 ? "neon-text-green" : "neon-text-pink"}`, children: fmtMoney(t.pnl, true) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            t.rMultiple.toFixed(2),
            "R"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: t.fills ?? 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: t.setupType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-2 py-0.5 text-xs font-semibold ${t.setupGrade === "A+" ? "bg-[oklch(0.68_0.27_295/0.18)] text-[var(--neon-purple)]" : t.setupGrade === "B" ? "bg-[oklch(0.72_0.27_0/0.18)] text-[var(--neon-pink)]" : "bg-[oklch(0.78_0.18_50/0.18)] text-[var(--neon-orange)]"}`, children: t.setupGrade }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: t.session }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { src: t.image15m, label: "15m", onClick: () => t.image15m && setPreview(t.image15m) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { src: t.image1m, label: "1m", onClick: () => t.image1m && setPreview(t.image1m) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(t), className: "grid h-8 w-8 place-items-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-[var(--neon-purple)] hover:text-[var(--neon-purple)]", "aria-label": "Edit trade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmDelete(t.id), className: "grid h-8 w-8 place-items-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-[var(--neon-red)] hover:text-[var(--neon-red)]", "aria-label": "Delete trade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, t.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 14, className: "px-4 py-10 text-center text-muted-foreground", children: "No trades yet — add your first trade above." }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editId, onOpenChange: (o) => !o && setEditId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-2xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Trade" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TradeFormFields, { form, setForm }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submitEdit, className: "bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white", children: "Save Changes" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!preview, onOpenChange: (o) => !o && setPreview(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-4xl border-border/40 bg-background/95 p-2", children: preview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "Chart preview", className: "h-auto w-full rounded-lg" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!confirmDelete, onOpenChange: (o) => !o && setConfirmDelete(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this trade?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This permanently removes the trade and recalculates every metric, chart, and payout status. This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => {
          if (confirmDelete) {
            deleteTrade(confirmDelete);
            toast.success("Trade deleted");
          }
          setConfirmDelete(null);
        }, className: "bg-[var(--neon-red)] text-white hover:bg-[var(--neon-red)]/80", children: "Delete" })
      ] })
    ] }) })
  ] });
}
function TradeFormFields({
  form,
  setForm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value: form.date, onChange: (e) => setForm({
      ...form,
      date: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instrument", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.instrument, onChange: (e) => setForm({
      ...form,
      instrument: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Direction", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.direction, onValueChange: (v) => setForm({
      ...form,
      direction: v
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "long", children: "Long" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "short", children: "Short" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Session", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.session, onChange: (e) => setForm({
      ...form,
      session: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Entry", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.entry, onChange: (e) => setForm({
      ...form,
      entry: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Stop Loss", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.stopLoss, onChange: (e) => setForm({
      ...form,
      stopLoss: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Take Profit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.takeProfit, onChange: (e) => setForm({
      ...form,
      takeProfit: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Exit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.exit, onChange: (e) => setForm({
      ...form,
      exit: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Risk ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.risk, onChange: (e) => setForm({
      ...form,
      risk: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Reward ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.reward, onChange: (e) => setForm({
      ...form,
      reward: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PnL ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.pnl, onChange: (e) => setForm({
      ...form,
      pnl: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fills / Trades", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.fills ?? 1, onChange: (e) => setForm({
      ...form,
      fills: +e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Setup Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.setupType, onChange: (e) => setForm({
      ...form,
      setupType: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Setup Grade", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.setupGrade, onValueChange: (v) => setForm({
      ...form,
      setupGrade: v
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "A+", children: "A+" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "B", children: "B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "C", children: "C" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Emotions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.emotions, onChange: (e) => setForm({
      ...form,
      emotions: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mistakes", className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.mistakes, onChange: (e) => setForm({
      ...form,
      mistakes: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes", className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.notes, onChange: (e) => setForm({
      ...form,
      notes: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "15m Timeframe Screenshot", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageField, { value: form.image15m, onChange: (v) => setForm({
      ...form,
      image15m: v
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "1m Timeframe Screenshot", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageField, { value: form.image1m, onChange: (v) => setForm({
      ...form,
      image1m: v
    }) }) })
  ] });
}
function Field({
  label,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col gap-1.5 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: label }),
    children
  ] });
}
function ImageField({
  value,
  onChange
}) {
  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await fileToDataUrl(f);
    onChange(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "", className: "h-16 w-24 rounded-md border border-border object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onChange(void 0), className: "absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[var(--neon-red)] text-[10px] text-white", "aria-label": "Remove", children: "×" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-24 place-items-center rounded-md border border-dashed border-border bg-background/40 text-[10px] text-muted-foreground", children: "No image" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/*", onChange: onFile, className: "border-border/50 bg-background/40 text-xs" })
  ] });
}
function Thumb({
  src,
  label,
  onClick
}) {
  if (!src) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-12 place-items-center rounded-md border border-dashed border-border/50 text-[9px] uppercase text-muted-foreground/60", children: label });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: "group relative h-9 w-12 overflow-hidden rounded-md border border-border/60 transition hover:border-[var(--neon-purple)] hover:shadow-[0_0_12px_-2px_var(--neon-purple)]", "aria-label": `Open ${label} chart`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: label, className: "h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 right-0 bg-black/60 px-1 text-center text-[8px] uppercase tracking-wider text-white", children: label })
  ] });
}
export {
  TradeFormFields,
  TradesPage as component
};
