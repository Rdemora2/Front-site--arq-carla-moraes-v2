import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ImageResponse } from "next/og.js";
import React from "react";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(root, "public/images/social/v1");
const manifestPath = join(root, "lib/generated/social-cards.json");
const definitionsPath = join(root, "lib/data/social-cards.json");

const [definitions, editorialFont, sansFont, markSource] = await Promise.all([
  readFile(definitionsPath, "utf8").then(JSON.parse),
  readFile(join(root, "assets/fonts/social/stix-general.otf")),
  readFile(join(root, "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf")),
  readFile(join(root, "public/brand/mark.webp")),
]);

const mark = await sharp(markSource).png().toBuffer();
const markDataUrl = `data:image/png;base64,${mark.toString("base64")}`;
const h = React.createElement;

function validateDefinitions(cards) {
  const keys = new Set();

  for (const card of cards) {
    if (!card.key || !card.source || !card.alt || keys.has(card.key)) {
      throw new Error(`Definição de social card inválida ou duplicada: ${card.key ?? "sem chave"}`);
    }
    keys.add(card.key);
  }
}

function createCardElement(card, photoDataUrl) {
  const titleSize = card.title.length > 33 ? 54 : card.title.length > 25 ? 60 : 68;

  return h(
    "div",
    {
      style: {
        alignItems: "stretch",
        background: "#122319",
        color: "#F7F4EE",
        display: "flex",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      },
    },
    h("div", {
      style: {
        border: "1px solid rgba(201,185,144,.18)",
        borderRadius: "999px",
        height: 720,
        left: 330,
        position: "absolute",
        top: -260,
        width: 720,
      },
    }),
    h(
      "div",
      {
        style: {
          border: "1px solid rgba(201,185,144,.72)",
          borderRadius: "250px 18px 250px 18px",
          bottom: 38,
          display: "flex",
          height: 554,
          overflow: "hidden",
          position: "absolute",
          right: 38,
          width: 690,
        },
      },
      h("img", {
        alt: "",
        height: 554,
        src: photoDataUrl,
        style: {
          height: "100%",
          objectFit: "cover",
          objectPosition: card.imagePosition,
          width: "100%",
        },
        width: 690,
      }),
      h("div", {
        style: {
          background: "linear-gradient(90deg, rgba(18,35,25,.92) 0%, rgba(18,35,25,.28) 38%, rgba(18,35,25,0) 68%)",
          display: "flex",
          inset: 0,
          position: "absolute",
        },
      }),
      h("div", {
        style: {
          background: "linear-gradient(0deg, rgba(18,35,25,.42) 0%, rgba(18,35,25,0) 42%)",
          display: "flex",
          inset: 0,
          position: "absolute",
        },
      }),
    ),
    h("div", {
      style: {
        background: "linear-gradient(90deg, #122319 0%, #122319 38%, rgba(18,35,25,.96) 46%, rgba(18,35,25,0) 68%)",
        display: "flex",
        inset: 0,
        position: "absolute",
      },
    }),
    h(
      "div",
      {
        style: {
          alignItems: "center",
          display: "flex",
          left: 62,
          position: "absolute",
          top: 48,
        },
      },
      h("img", { alt: "", height: 50, src: markDataUrl, style: { height: 50, width: 22 }, width: 22 }),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", marginLeft: 17 } },
        h("span", { style: { fontFamily: "STIX General", fontSize: 24, fontWeight: 400, letterSpacing: -0.4, lineHeight: 1 } }, "Carla Moraes"),
        h("span", { style: { color: "#C9B990", fontFamily: "Noto Sans", fontSize: 9, fontWeight: 600, letterSpacing: 2.5, marginTop: 7, textTransform: "uppercase" } }, "Arquitetura Floral"),
      ),
    ),
    h(
      "div",
      {
        style: {
          alignItems: "center",
          border: "1px solid rgba(247,244,238,.5)",
          borderRadius: 999,
          color: "#F7F4EE",
          display: "flex",
          fontFamily: "Noto Sans",
          fontSize: 13,
          fontWeight: 600,
          height: 48,
          justifyContent: "center",
          letterSpacing: 1.5,
          position: "absolute",
          right: 66,
          top: 65,
          width: 48,
        },
      },
      card.number,
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          left: 62,
          position: "absolute",
          top: 194,
          width: 540,
        },
      },
      h(
        "div",
        { style: { alignItems: "center", color: "#C9B990", display: "flex", fontFamily: "Noto Sans", fontSize: 12, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase" } },
        h("span", { style: { background: "#A08A58", display: "flex", height: 1, marginRight: 16, width: 38 } }),
        card.eyebrow,
      ),
      h("div", { style: { color: "#E7DDBF", display: "flex", fontFamily: "STIX General", fontSize: titleSize, fontWeight: 400, letterSpacing: -2.2, lineHeight: 0.92, marginTop: 28, maxWidth: 530 } }, card.title),
      h("div", { style: { color: "rgba(247,244,238,.88)", display: "flex", fontFamily: "Noto Sans", fontSize: 17, fontWeight: 400, lineHeight: 1.45, marginTop: 25, maxWidth: 430 } }, card.summary),
    ),
    h(
      "div",
      {
        style: {
          alignItems: "center",
          bottom: 44,
          display: "flex",
          fontFamily: "Noto Sans",
          fontSize: 10,
          fontWeight: 600,
          left: 62,
          letterSpacing: 2.2,
          position: "absolute",
          textTransform: "uppercase",
        },
      },
      h("span", { style: { background: "#A08A58", display: "flex", height: 2, marginRight: 15, width: 44 } }),
      card.detail,
    ),
  );
}

async function renderCard(card) {
  const source = await readFile(join(root, card.source));
  const normalizedPhoto = await sharp(source).rotate().jpeg({ quality: 90, chromaSubsampling: "4:4:4" }).toBuffer();
  const photoDataUrl = `data:image/jpeg;base64,${normalizedPhoto.toString("base64")}`;

  const response = new ImageResponse(createCardElement(card, photoDataUrl), {
    width: 1200,
    height: 630,
    fonts: [
      { name: "STIX General", data: editorialFont, weight: 400, style: "normal" },
      { name: "Noto Sans", data: sansFont, weight: 400, style: "normal" },
      { name: "Noto Sans", data: sansFont, weight: 600, style: "normal" },
    ],
  });

  const png = Buffer.from(await response.arrayBuffer());
  return sharp(png)
    .flatten({ background: "#122319" })
    .toColourspace("srgb")
    .jpeg({ quality: 84, progressive: true, chromaSubsampling: "4:2:0", mozjpeg: true })
    .toBuffer();
}

validateDefinitions(definitions);
await mkdir(outputDirectory, { recursive: true });

const cards = {};
for (const card of definitions) {
  const image = await renderCard(card);
  const hash = createHash("sha256").update(image).digest("hex").slice(0, 12);
  const filename = `${card.key}.${hash}.jpg`;
  const target = join(outputDirectory, filename);

  await writeFile(target, image);
  cards[card.key] = {
    url: `/images/social/v1/${filename}`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: card.alt,
  };
}

const manifest = `${JSON.stringify({ version: "v1", cards }, null, 2)}\n`;
await writeFile(manifestPath, manifest);

console.log(`Generated ${definitions.length} social cards in public/images/social/v1.`);
