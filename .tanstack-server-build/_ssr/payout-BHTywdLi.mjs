import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore } from "./router-DJBrMM3J.mjs";
import { c as computePayoutStatus, f as fmtMoney, a as fmtPct } from "./calc-DZy82t1v.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { q as ShieldAlert, k as CircleCheck, r as CircleX } from "../_libs/lucide-react.mjs";
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
function PayoutPage() {
  const {
    state
  } = useAppStore();
  const p = computePayoutStatus(state.account, state.trades);
  const consistencyPct = p.totalProfit > 0 ? p.largestProfitDay / p.totalProfit * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "mx-auto flex max-w-[1300px] flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card flex items-center justify-between p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display-num neon-text-purple text-2xl", children: "Payout Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          state.account.accountName,
          " · ",
          state.account.propFirm
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 rounded-xl border px-5 py-3 ${p.eligible ? "border-[var(--neon-green)]/40 bg-[oklch(0.78_0.2_160/0.12)] text-[var(--neon-green)]" : "border-[var(--neon-red)]/40 bg-[oklch(0.65_0.27_20/0.12)] text-[var(--neon-red)]"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display-num text-sm tracking-wider", children: p.eligible ? "ELIGIBLE FOR PAYOUT" : "NOT ELIGIBLE FOR PAYOUT" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan mb-4", children: "Consistency Rule (50%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Largest Profit Day" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display-num neon-text-pink text-2xl", children: fmtMoney(p.largestProfitDay) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Current 50% Limit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display-num neon-text-cyan text-xl", children: fmtMoney(p.consistencyLimit) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-2.5 overflow-hidden rounded-full bg-[oklch(0.2_0.05_280)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${p.consistencyPassed ? "bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-cyan)]" : "bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-red)]"}`, style: {
          width: `${Math.min(100, consistencyPct)}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
          fmtPct(consistencyPct),
          " of total profit is on biggest day (limit 50%)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Required Total Profit", value: fmtMoney(p.requiredProfitForConsistency) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Extra Profit Needed", value: fmtMoney(p.extraProfitForConsistency), accent: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { passed: p.consistencyPassed })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan mb-4", children: "Minimum Payout Balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Required Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display-num neon-text-purple text-2xl", children: fmtMoney(p.minPayoutBalance) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Current Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display-num neon-text-cyan text-xl", children: fmtMoney(p.currentBalance) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-2.5 overflow-hidden rounded-full bg-[oklch(0.2_0.05_280)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)]", style: {
          width: `${Math.min(100, p.currentBalance / p.minPayoutBalance * 100)}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
          fmtPct(p.currentBalance / p.minPayoutBalance * 100),
          " of minimum payout balance"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Remaining to Goal", value: fmtMoney(p.balanceRemaining), accent: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total Profit", value: fmtMoney(p.totalProfit, true) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { passed: p.balancePassed })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "section-label neon-text-cyan mb-4", children: "All Payout Rules" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-2", children: p.rules.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 rounded-lg border px-4 py-3 ${r.passed ? "border-[var(--neon-green)]/30 bg-[oklch(0.78_0.2_160/0.06)]" : "border-[var(--neon-red)]/30 bg-[oklch(0.65_0.27_20/0.06)]"}`, children: [
        r.passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-[var(--neon-green)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5 text-[var(--neon-red)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: r.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-auto text-xs font-semibold ${r.passed ? "text-[var(--neon-green)]" : "text-[var(--neon-red)]"}`, children: r.passed ? "PASSED" : "FAILED" })
      ] }, r.label)) })
    ] })
  ] });
}
function Stat({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 bg-background/30 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `display-num mt-1 text-lg ${accent ? "neon-text-pink" : "text-foreground"}`, children: value })
  ] });
}
function StatusBadge({
  passed
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${passed ? "bg-[oklch(0.78_0.2_160/0.15)] text-[var(--neon-green)]" : "bg-[oklch(0.65_0.27_20/0.15)] text-[var(--neon-red)]"}`, children: passed ? "PASSED" : "FAILED" });
}
export {
  PayoutPage as component
};
