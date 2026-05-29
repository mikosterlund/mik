// Postbuild: generate a static SPA shell for Netlify. This intentionally does
// not boot or depend on an SSR server runtime; it only uses the built client
// assets and writes dist/client/index.html directly.
import { writeFileSync, existsSync, mkdirSync, readFileSync, readdirSync, cpSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const distDir = join(root, "..", "dist");
const clientDir = join(root, "..", "dist", "client");
const assetsDir = join(clientDir, "assets");
const rootAssetsDir = join(distDir, "assets");
const rootAudioDir = join(distDir, "audio");

mkdirSync(clientDir, { recursive: true });

if (!existsSync(assetsDir) && existsSync(rootAssetsDir)) {
  cpSync(rootAssetsDir, assetsDir, { recursive: true });
}
if (!existsSync(join(clientDir, "audio")) && existsSync(rootAudioDir)) {
  cpSync(rootAudioDir, join(clientDir, "audio"), { recursive: true });
}
if (!existsSync(join(clientDir, "_redirects")) && existsSync(join(distDir, "_redirects"))) {
  cpSync(join(distDir, "_redirects"), join(clientDir, "_redirects"));
}

if (!existsSync(assetsDir)) {
  console.error("[spa-index] client assets missing:", assetsDir);
  process.exit(1);
}

const assetFiles = readdirSync(assetsDir).sort();
const entry = assetFiles.find((file) => {
  if (!file.startsWith("index-") || !file.endsWith(".js")) return false;
  const code = readFileSync(join(assetsDir, file), "utf8");
  return code.includes("hydrateRoot(document");
});
const stylesheet = assetFiles.find((file) => file.startsWith("styles-") && file.endsWith(".css"));

if (!entry) {
  console.error("[spa-index] client entry asset missing in", assetsDir);
  process.exit(1);
}

const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const manifest = {
  routes: {
    __root__: { preloads: [`/assets/${entry}`], assets: [] },
    "/": { preloads: [], assets: [] },
  },
};
const matches = [
  { i: "__root__\u0000", u: Date.now(), s: "success", ssr: false },
  { i: "\u0000\u0000", u: Date.now(), s: "success", ssr: false },
];

const html = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Trading Journal — Premium Performance Analytics</title>
    <meta name="description" content="Premium futures trading journal and performance analytics." />
    ${stylesheet ? `<link rel="stylesheet" href="/assets/${stylesheet}" />` : ""}
    <link rel="modulepreload" href="/assets/${entry}" />
  </head>
  <body>
    <div class="min-h-screen bg-[#05050b]"></div>
    <script class="$tsr" id="$tsr-stream-barrier">
      (self.$R=self.$R||{})["tsr"]=[];
      self.$_TSR={h(){this.hydrated=!0,this.c()},e(){this.streamEnded=!0,this.c()},c(){this.hydrated&&this.streamEnded&&(delete self.$_TSR,delete self.$R.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[]};
      $_TSR.router={manifest:${escapeJson(manifest)},matches:${escapeJson(matches)},lastMatchId:"\u0000\u0000"};
      $_TSR.e();
    </script>
    <script type="module" async>import("/assets/${entry}")</script>
  </body>
</html>
`;

writeFileSync(join(clientDir, "index.html"), html);
writeFileSync(join(clientDir, "200.html"), html);
writeFileSync(join(clientDir, "404.html"), html);

const redirects = join(clientDir, "_redirects");
const rule = "/*    /index.html   200\n";
const existing = existsSync(redirects) ? readFileSync(redirects, "utf8") : "";
if (!existing.includes("/index.html")) {
  writeFileSync(redirects, existing + rule);
}

console.log(`[spa-index] wrote dist/client/index.html using /assets/${entry}`);
