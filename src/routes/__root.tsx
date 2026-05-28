import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppStoreProvider, useAppStore } from "@/lib/store";
import { TopNav } from "@/components/TopNav";
import { Toaster } from "@/components/ui/sonner";
import { IntroScreen, shouldShowIntro } from "@/components/IntroScreen";
import { AccessGate, isAccessUnlocked } from "@/components/AccessGate";
import { AccessGranted } from "@/components/AccessGranted";
import { AmbientProvider, useAmbient } from "@/components/AmbientAudio";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-card p-10 text-center">
        <h1 className="display-num text-7xl neon-text-purple">404</h1>
        <p className="mt-3 text-muted-foreground">Page not found</p>
        <Link
          to="/"
          className="tab-pill mt-6 inline-block"
          data-active="true"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Trading Journal — Premium Performance Analytics" },
      {
        name: "description",
        content:
          "Premium futures trading journal & performance analytics. Track drawdown, equity curve, setup quality, and risk in real-time.",
      },
      { property: "og:title", content: "Trading Journal — Premium Performance Analytics" },
      { name: "twitter:title", content: "Trading Journal — Premium Performance Analytics" },
      { name: "description", content: "Apex Trade Journal is a production-grade SaaS platform for traders to meticulously log, analyze, and optimize their performance." },
      { property: "og:description", content: "Apex Trade Journal is a production-grade SaaS platform for traders to meticulously log, analyze, and optimize their performance." },
      { name: "twitter:description", content: "Apex Trade Journal is a production-grade SaaS platform for traders to meticulously log, analyze, and optimize their performance." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fc3f1713-cfad-494a-bf98-7b384bf22303/id-preview-af91bc70--aefbc9ba-8e54-41f5-93bd-c1767990e1e7.lovable.app-1779994446530.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fc3f1713-cfad-494a-bf98-7b384bf22303/id-preview-af91bc70--aefbc9ba-8e54-41f5-93bd-c1767990e1e7.lovable.app-1779994446530.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ShellInner() {
  const { state } = useAppStore();
  const [phase, setPhase] = useState<"loading" | "intro" | "gate" | "granted" | "app">("loading");

  useEffect(() => {
    const unlocked = isAccessUnlocked();
    if (shouldShowIntro()) {
      setPhase("intro");
    } else {
      setPhase(unlocked ? "app" : "gate");
    }
  }, []);

  const ambient = useAmbient();
  useEffect(() => {
    if (phase === "app") {
      const t = setTimeout(() => ambient.activate(), 400);
      return () => clearTimeout(t);
    } else {
      ambient.deactivate();
    }
  }, [phase, ambient]);

  const afterIntro = () => {
    setPhase(isAccessUnlocked() ? "app" : "gate");
  };

  return (
    <div className="min-h-screen">
      {phase === "intro" && <IntroScreen onComplete={afterIntro} />}
      {phase === "gate" && <AccessGate onUnlock={() => setPhase("granted")} />}
      {phase === "granted" && <AccessGranted onComplete={() => setPhase("app")} />}
      {phase === "app" && (
        <>
          <TopNav accountName={state.account.accountName} propFirm={state.account.propFirm} />
          <main className="px-4 pb-12 lg:px-8">
            <Outlet />
          </main>
        </>
      )}
      <Toaster />
    </div>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppStoreProvider>
        <AmbientProvider>
          <ShellInner />
        </AmbientProvider>
      </AppStoreProvider>
    </QueryClientProvider>
  );
}


