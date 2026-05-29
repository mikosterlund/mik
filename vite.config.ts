import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Lovable preview / production runs on Cloudflare Workers (default preset).
// Only switch to the Node preset when explicitly building for Netlify
// static deployment so we can prerender index.html from the SSR bundle.
const isNetlifyBuild = process.env.NETLIFY_BUILD === "1";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  ...(isNetlifyBuild
    ? {
        nitro: {
          preset: "node",
          output: {
            dir: "dist",
            publicDir: "dist/client",
            serverDir: "dist/server",
          },
        },
      }
    : {}),
});
