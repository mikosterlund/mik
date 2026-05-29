import { Link, useLocation } from "@tanstack/react-router";
import { TrendingUp, Calendar, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AmbientControls } from "@/components/AmbientAudio";
import { useAppStore } from "@/lib/store";

const tabs = [
  { to: "/", label: "Dashboard" },
  { to: "/journal", label: "Daily Journal" },
  { to: "/trades", label: "Trade Log" },
  { to: "/weekly", label: "Weekly Review" },
  { to: "/setups", label: "Setup Review" },
  { to: "/payout", label: "Payout" },
  { to: "/settings", label: "Settings" },
];

export function TopNav({ accountName, propFirm }: { accountName: string; propFirm: string }) {
  const { pathname } = useLocation();
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);
  return (

    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap items-center gap-4 px-4 py-4 lg:px-8 lg:py-6"
    >
      <div className="flex items-center gap-3">
        <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.6_0.27_295)] to-[oklch(0.55_0.25_220)] shadow-[0_0_30px_-5px_oklch(0.6_0.27_295/0.7)]">
          <TrendingUp className="h-6 w-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="display-num text-xl tracking-wide text-foreground sm:text-2xl">
            {accountName.toUpperCase()}
          </h1>
          <p className="section-label text-muted-foreground">{propFirm}</p>
        </div>
      </div>

      <nav className="order-3 flex flex-1 flex-wrap items-center justify-center gap-2 lg:order-2">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <Link key={t.to} to={t.to} className="tab-pill" data-active={active}>
              {t.label}
            </Link>
          );
        })}
      </nav>

      <div className="order-2 ml-auto flex items-center gap-2 lg:order-3">
        <AmbientControls />
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2 text-sm text-foreground backdrop-blur">
          <span className="font-medium">{today}</span>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
        <SignOutButton />
      </div>
    </motion.header>
  );
}

function SignOutButton() {
  const { signOut, userId } = useAppStore();
  if (!userId) return null;
  return (
    <button
      onClick={() => signOut()}
      title="Sign out"
      className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/50 text-muted-foreground transition hover:text-foreground"
    >
      <LogOut className="h-4 w-4" />
    </button>
  );
}
