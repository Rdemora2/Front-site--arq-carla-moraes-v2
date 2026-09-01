import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const manifestPath = join(root, "lib/generated/sitemap-lastmod.json");

const sharedDependencies = [
  "app/layout.tsx",
  "app/globals.css",
  "components/site-header.tsx",
  "components/site-footer.tsx",
  "components/whatsapp-fab.tsx",
  "components/organic-growth.tsx",
  "lib/data/business.ts",
  "lib/seo.ts",
  "tailwind.config.ts",
];

const routes = [
  {
    path: "/",
    dependencies: ["app/page.tsx", "components/project-card.tsx", "public/images/home"],
  },
  {
    path: "/projetos",
    dependencies: ["app/projetos/page.tsx", "components/project-card.tsx", "public/images/projects"],
  },
  {
    path: "/sobre",
    dependencies: ["app/sobre/page.tsx", "components/interior-hero.tsx"],
  },
  {
    path: "/servicos",
    dependencies: ["app/servicos/page.tsx", "components/interior-hero.tsx"],
  },
  {
    path: "/processo",
    dependencies: ["app/processo/page.tsx", "components/interior-hero.tsx"],
  },
  {
    path: "/contato",
    dependencies: ["app/contato/page.tsx", "components/interior-hero.tsx"],
  },
  {
    path: "/projetos/jardim-frances-classico",
    dependencies: ["app/projetos/[slug]/page.tsx", "components/project-gallery.tsx", "public/images/projects/jardim-frances"],
  },
  {
    path: "/projetos/jardim-tropical-moderno",
    dependencies: ["app/projetos/[slug]/page.tsx", "components/project-gallery.tsx", "public/images/projects/jardim-tropical"],
  },
  {
    path: "/projetos/hotel-nos-jardins",
    dependencies: ["app/projetos/[slug]/page.tsx", "components/project-gallery.tsx", "public/images/projects/hotel-jardins"],
  },
  {
    path: "/projetos/sicoob-metalcred",
    dependencies: ["app/projetos/[slug]/page.tsx", "components/project-gallery.tsx", "public/images/projects/sicoob-metalcred"],
  },
];

async function readFallbackManifest() {
  try {
    const source = await readFile(manifestPath, "utf8");
    return JSON.parse(source);
  } catch {
    return {};
  }
}

function findLatestCommitDate(dependencies) {
  try {
    const value = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...sharedDependencies, ...dependencies],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();

    return value && !Number.isNaN(Date.parse(value)) ? value : undefined;
  } catch {
    return undefined;
  }
}

function isIsoDate(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

const fallback = await readFallbackManifest();
const nextManifest = {};

for (const route of routes) {
  // WHY: datas editoriais vêm do histórico do conteúdo real, nunca do relógio
  // do build. Em clones rasos ou sem Git, preservamos o último valor versionado.
  const fallbackDate = isIsoDate(fallback[route.path]) ? fallback[route.path] : undefined;
  const lastModified = findLatestCommitDate(route.dependencies) ?? fallbackDate;
  if (lastModified) nextManifest[route.path] = lastModified;
}

const output = `${JSON.stringify(nextManifest, null, 2)}\n`;
const previous = await readFile(manifestPath, "utf8").catch(() => "");

if (output !== previous) await writeFile(manifestPath, output);

console.log(`Resolved trustworthy last-modified dates for ${Object.keys(nextManifest).length} sitemap routes.`);
