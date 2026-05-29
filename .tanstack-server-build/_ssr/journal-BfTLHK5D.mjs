import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, I as Input, L as Label, T as Textarea, f as cn } from "./router-DJBrMM3J.mjs";
import { R as Root, T as Track, a as Range, b as Thumb } from "../_libs/radix-ui__react-slider.mjs";
import { B as Button } from "./button-CZ_3TZow.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { i as ChevronLeft, j as ChevronRight, f as Check } from "../_libs/lucide-react.mjs";
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
const Slider = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = Root.displayName;
function shiftDate(iso, days) {
  const d = /* @__PURE__ */ new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function JournalPage() {
  const {
    state,
    setJournal,
    hydrated
  } = useAppStore();
  const [date, setDate] = reactExports.useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
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
    tags: ""
  };
  const [draft, setDraft] = reactExports.useState(existing ?? blank);
  const [status, setStatus] = reactExports.useState("saved");
  reactExports.useEffect(() => {
    if (!hydrated) return;
    setDraft(state.journals[date] ?? {
      ...blank,
      date
    });
    setStatus("saved");
  }, [date, hydrated]);
  const update = (patch) => {
    setDraft((d) => ({
      ...d,
      ...patch
    }));
    setStatus("dirty");
  };
  reactExports.useEffect(() => {
    if (status !== "dirty") return;
    const t = setTimeout(() => {
      setJournal(date, draft);
      setStatus("saving");
      setTimeout(() => setStatus("saved"), 250);
    }, 700);
    return () => clearTimeout(t);
  }, [draft]);
  const save = () => {
    setJournal(date, draft);
    setStatus("saving");
    setTimeout(() => {
      setStatus("saved");
      toast.success("Journal saved");
    }, 200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "mx-auto grid max-w-[1600px] grid-cols-1 gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display-num neon-text-purple text-xl", children: "Daily Journal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: (/* @__PURE__ */ new Date(date + "T12:00:00")).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => setDate(shiftDate(date, -1)), "aria-label": "Previous day", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "w-[160px] border-border/50 bg-background/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => setDate(shiftDate(date, 1)), "aria-label": "Next day", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumericSlider, { label: "Mood", color: "var(--neon-purple)", value: draft.mood ?? 7, onChange: (v) => update({
          mood: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumericSlider, { label: "Emotional Control", color: "var(--neon-purple)", value: draft.emotion, onChange: (v) => update({
          emotion: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumericSlider, { label: "Discipline Score", color: "var(--neon-cyan)", value: draft.discipline, onChange: (v) => update({
          discipline: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumericSlider, { label: "Confidence Score", color: "var(--neon-pink)", value: draft.confidence, onChange: (v) => update({
          confidence: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: "Sleep (hours)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: draft.sleepHours, onChange: (e) => update({
              sleepHours: +e.target.value
            }), className: "mt-2 border-border/50 bg-background/40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: "Session Grade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.sessionGrade ?? "", onChange: (e) => update({
              sessionGrade: e.target.value
            }), placeholder: "A / B / C", className: "mt-2 border-border/50 bg-background/40" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan", children: "Market Condition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${status === "saved" ? "text-[var(--neon-green)]" : status === "dirty" ? "text-[var(--neon-orange)]" : "text-muted-foreground"}`, children: [
          status === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
          status === "saved" ? "Saved" : status === "dirty" ? "Unsaved changes" : "Saving…"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.marketCondition, onChange: (e) => update({
        marketCondition: e.target.value
      }), placeholder: "Trending? Ranging? Volatile? Key levels in play?", className: "h-24 border-border/50 bg-background/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-pink mb-2 mt-6", children: "Session Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.sessionNotes, onChange: (e) => update({
        sessionNotes: e.target.value
      }), placeholder: "What went well? What was off?", className: "h-28 border-border/50 bg-background/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-purple mb-2 mt-6", children: "Reflections" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.reflections ?? "", onChange: (e) => update({
        reflections: e.target.value
      }), placeholder: "Lessons learned, identity shifts, gratitude.", className: "h-28 border-border/50 bg-background/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: "Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.tags ?? "", onChange: (e) => update({
          tags: e.target.value
        }), placeholder: "patience, A+ setup, FOMC", className: "mt-2 border-border/50 bg-background/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, className: "mt-6 w-full bg-gradient-to-r from-[var(--neon-purple)] to-[oklch(0.55_0.25_220)] text-white shadow-[0_0_24px_-6px_var(--neon-purple)]", children: "Save Journal" })
    ] })
  ] });
}
function NumericSlider({
  label,
  value,
  onChange,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "section-label text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "display-num text-lg", style: {
        color,
        textShadow: `0 0 12px ${color}`
      }, children: [
        value,
        "/10"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { value: [value], min: 1, max: 10, step: 1, onValueChange: (v) => onChange(v[0]), className: "mt-3" })
  ] });
}
export {
  JournalPage as component
};
