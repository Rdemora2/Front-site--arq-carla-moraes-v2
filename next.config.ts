import type { NextConfig } from "next";

const isVercelProduction = process.env.VERCEL_ENV === "production";
const isSelfHostedProduction =
  process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === "production";
const shouldSendHsts = isVercelProduction || isSelfHostedProduction;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31_536_000,
  },
  async headers() {
    return [
      {
        // WHY: cada alteração produz um novo hash no nome do arquivo, então
        // caches longos não servem uma capa social antiga após uma publicação.
        source: "/images/social/v1/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          ...(shouldSendHsts
            ? [
                {
                  // WHY: previews da Vercel não recebem HSTS. Em produção, preload
                  // e includeSubDomains ainda exigem auditoria de todos os domínios.
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000",
                },
              ]
            : []),
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // CSP requer nonce/hash por resposta para o bootstrap de tema inline e
          // para os scripts de analytics após consentimento. Uma política estática
          // com unsafe-inline reduziria a proteção; implementar junto desse fluxo.
        ],
      },
    ];
  },
};

export default nextConfig;
