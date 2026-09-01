import type { NextConfig } from "next";

const isVercelProduction = process.env.VERCEL_ENV === "production";
const isSelfHostedProduction =
  process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === "production";
const shouldSendHsts = isVercelProduction || isSelfHostedProduction;
const shouldSendCsp = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms",
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "frame-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");

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
          ...(shouldSendCsp
            ? [
                {
                  // WHY: o App Router estático injeta bootstrap/hidratação inline;
                  // a política mantém somente essa exceção, bloqueia handlers e
                  // limita scripts externos aos provedores opcionais consentidos.
                  key: "Content-Security-Policy",
                  value: contentSecurityPolicy,
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
        ],
      },
    ];
  },
};

export default nextConfig;
