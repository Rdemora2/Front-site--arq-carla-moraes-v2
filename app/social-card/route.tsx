import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  const cover = await readFile(join(process.cwd(), "public/images/og-cover.jpg"));

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#122319",
          color: "#F7F4EE",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        {/* WHY: a capa social usa fotografia real do acervo e composição estável,
            evitando AVIF e recortes imprevisíveis nos crawlers sociais. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="630"
          src={`data:image/jpeg;base64,${cover.toString("base64")}`}
          style={{ height: "100%", objectFit: "cover", position: "absolute", right: 0, width: "66%" }}
          width="792"
        />
        <div
          style={{
            background: "linear-gradient(90deg, #122319 0%, #122319 34%, rgba(18,35,25,.9) 51%, rgba(18,35,25,.2) 100%)",
            display: "flex",
            inset: 0,
            position: "absolute",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 70px", position: "relative", width: "100%" }}>
          <div style={{ alignItems: "center", display: "flex", fontSize: 16, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
            <span style={{ background: "#C5A769", display: "flex", height: 2, marginRight: 20, width: 54 }} />
            Paisagismo autoral · São Paulo
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#D7C69E", display: "flex", fontSize: 68, fontWeight: 400, letterSpacing: -3, lineHeight: 1 }}>Carla Moraes</div>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 600, letterSpacing: 6, marginTop: 18, textTransform: "uppercase" }}>Arquitetura Floral</div>
            <div style={{ background: "#C5A769", display: "flex", height: 2, marginTop: 28, opacity: 0.8, width: 260 }} />
            <div style={{ display: "flex", flexDirection: "column", fontSize: 17, letterSpacing: 0.5, lineHeight: 1.45, marginTop: 18 }}>
              <span>Projetos paisagísticos personalizados</span>
              <span>desde 1996.</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    },
  );
}
