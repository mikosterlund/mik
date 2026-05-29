import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore } from "./router-DJBrMM3J.mjs";
import { f as fmtMoney } from "./calc-DZy82t1v.mjs";
import "../_libs/sonner.mjs";
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
function SetupsPage() {
  const {
    state
  } = useAppStore();
  const [filter, setFilter] = reactExports.useState("All");
  const setups = reactExports.useMemo(() => {
    const map = {};
    state.trades.forEach((t) => {
      const key = t.setupType || "Untagged";
      if (!map[key]) map[key] = {
        count: 0,
        pnl: 0,
        grade: t.setupGrade
      };
      map[key].count++;
      map[key].pnl += t.pnl;
    });
    let arr = Object.entries(map).map(([name, v]) => ({
      name,
      ...v
    }));
    if (filter !== "All") arr = arr.filter((s) => s.grade === filter);
    return arr.sort((a, b) => b.pnl - a.pnl);
  }, [state.trades, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "mx-auto flex max-w-[1600px] flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card flex flex-wrap items-center gap-3 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display-num neon-text-purple text-xl", children: "Setup Review" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex gap-2", children: ["All", "A+", "B", "C"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(g), className: "tab-pill", "data-active": filter === g, children: g }, g)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
      setups.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
        y: -3
      }, className: "glass-card glass-card-hover p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display-num text-lg", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-2 py-0.5 text-xs font-semibold ${s.grade === "A+" ? "bg-[oklch(0.68_0.27_295/0.18)] text-[var(--neon-purple)]" : s.grade === "B" ? "bg-[oklch(0.72_0.27_0/0.18)] text-[var(--neon-pink)]" : "bg-[oklch(0.78_0.18_50/0.18)] text-[var(--neon-orange)]"}`, children: s.grade })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label text-muted-foreground", children: "Trades" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display-num text-2xl", children: s.count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label text-muted-foreground", children: "Net PnL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `display-num text-2xl ${s.pnl >= 0 ? "neon-text-green" : "neon-text-pink"}`, children: fmtMoney(s.pnl, true) })
          ] })
        ] })
      ] }, s.name)),
      setups.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card col-span-full p-10 text-center text-muted-foreground", children: "No setups match this filter." })
    ] })
  ] });
}
export {
  SetupsPage as component
};
