import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const readJson = async (path) => JSON.parse(await readFile(join(root, path), "utf8"));

async function getBuiltOrigin() {
  const home = await readFile(join(root, routeArtifacts.home), "utf8");
  const canonical = home.match(/rel="canonical"[^>]+href="([^"]+)"/);
  assert.ok(canonical?.[1], "a home precisa declarar uma URL canônica absoluta");
  return new URL(canonical[1]).origin;
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : [path];
    }),
  );
  return nested.flat();
}

const routeArtifacts = {
  home: ".next/server/app/index.html",
  sobre: ".next/server/app/sobre.html",
  servicos: ".next/server/app/servicos.html",
  projetos: ".next/server/app/projetos.html",
  processo: ".next/server/app/processo.html",
  contato: ".next/server/app/contato.html",
  privacidade: ".next/server/app/privacidade.html",
  cookies: ".next/server/app/cookies.html",
  "projeto-jardim-frances-classico": ".next/server/app/projetos/jardim-frances-classico.html",
  "projeto-jardim-tropical-moderno": ".next/server/app/projetos/jardim-tropical-moderno.html",
  "projeto-hotel-nos-jardins": ".next/server/app/projetos/hotel-nos-jardins.html",
  "projeto-sicoob-metalcred": ".next/server/app/projetos/sicoob-metalcred.html",
};

test("social cards são específicos, versionados e leves", async () => {
  const definitions = await readJson("lib/data/social-cards.json");
  const manifest = await readJson("lib/generated/social-cards.json");
  const siteOrigin = await getBuiltOrigin();

  assert.equal(definitions.length, 12);
  assert.deepEqual(Object.keys(manifest.cards).sort(), definitions.map(({ key }) => key).sort());

  for (const definition of definitions) {
    const card = manifest.cards[definition.key];
    assert.match(card.url, new RegExp(`/${definition.key}\\.[a-f0-9]{12}\\.jpg$`));
    assert.equal(card.alt, definition.alt);

    const assetPath = join(root, "public", card.url);
    const [metadata, file] = await Promise.all([sharp(assetPath).metadata(), stat(assetPath)]);
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 630);
    assert.equal(metadata.format, "jpeg");
    assert.ok(file.size < 160_000, `${definition.key} excede 160 KB`);

    const html = await readFile(join(root, routeArtifacts[definition.key]), "utf8");
    const absoluteUrl = `${siteOrigin}${card.url}`;
    assert.ok(html.includes(`property="og:image" content="${absoluteUrl}"`));
    assert.ok(html.includes(`name="twitter:image" content="${absoluteUrl}"`));
    assert.ok(html.includes(`property="og:image:alt" content="${card.alt}"`));
    assert.ok(html.includes(`name="twitter:image:alt" content="${card.alt}"`));
  }
});

test("rotas de descoberta são estáticas e coerentes", async () => {
  const [llms, sitemap, robots, siteOrigin] = await Promise.all([
    readFile(join(root, ".next/server/app/llms.txt.body"), "utf8"),
    readFile(join(root, ".next/server/app/sitemap.xml.body"), "utf8"),
    readFile(join(root, ".next/server/app/robots.txt.body"), "utf8"),
    getBuiltOrigin(),
  ]);

  assert.match(llms, /^# Carla Moraes Arquitetura Floral/m);
  assert.match(llms, /trabalho permanece dedicado ao paisagismo, não à decoração de eventos/);
  assert.doesNotMatch(llms, /Família Rodrigues|120 mil m²|4,9\/127/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 10);
  assert.equal((sitemap.match(/<lastmod>/g) ?? []).length, 10);
  assert.ok(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
});

test("fontes do portfólio deixam a transformação responsiva para next/image", async () => {
  const files = await listFiles(join(root, "public/images/projects"));
  const avifSources = files.filter((file) => file.endsWith(".avif"));
  assert.deepEqual(avifSources, []);
});
