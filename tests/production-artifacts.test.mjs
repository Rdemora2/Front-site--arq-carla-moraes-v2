import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
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

async function reservePort() {
  const probe = createServer();
  await new Promise((resolve, reject) => {
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", resolve);
  });
  const address = probe.address();
  assert.ok(address && typeof address === "object");
  await new Promise((resolve, reject) => probe.close((error) => (error ? reject(error) : resolve())));
  return address.port;
}

async function waitForServer(url, childProcess, diagnostics) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (childProcess.exitCode !== null) {
      throw new Error(`next start encerrou antes de responder:\n${diagnostics()}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {
      // O socket ainda não foi aberto; a próxima tentativa ocorre em 100 ms.
    }
    await delay(100);
  }
  throw new Error(`next start não respondeu em 15 s:\n${diagnostics()}`);
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

test("servidor de produção aplica os headers de segurança", async (context) => {
  const port = await reservePort();
  const nextBinary = join(root, "node_modules/next/dist/bin/next");
  const server = spawn(process.execPath, [nextBinary, "start", "-H", "127.0.0.1", "-p", String(port)], {
    cwd: root,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  const recordOutput = (chunk) => { output = `${output}${chunk.toString()}`.slice(-2_000); };
  server.stdout.on("data", recordOutput);
  server.stderr.on("data", recordOutput);
  context.after(async () => {
    if (server.exitCode !== null) return;
    const exited = once(server, "exit");
    server.kill("SIGTERM");
    await Promise.race([exited, delay(2_000)]);
    if (server.exitCode === null) server.kill("SIGKILL");
  });

  const response = await waitForServer(`http://127.0.0.1:${port}/`, server, () => output);
  const csp = response.headers.get("content-security-policy") ?? "";

  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /script-src-attr 'none'/);
  assert.match(csp, /object-src 'none'/);
  assert.doesNotMatch(csp, /unsafe-eval/);
});
