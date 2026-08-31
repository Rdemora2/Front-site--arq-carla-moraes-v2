import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { MotionObserver } from "@/components/motion-observer";
import { OrganicGrowth } from "@/components/organic-growth";
import { ConsentManager } from "@/components/privacy/consent-manager";
import { business } from "@/lib/data/business";

const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-editorial",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const themeInitializationScript = `
  (() => {
    try {
      const saved = localStorage.getItem("cm-theme");
      const theme = saved === "light" || saved === "dark"
        ? saved
        : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(business.website),
    title: {
      default: `${business.name} | Paisagismo em São Paulo`,
      template: `%s | ${business.name}`,
    },
    description: business.description,
    applicationName: business.name,
    category: "Paisagismo",
    authors: [{ name: business.legalShortName, url: business.website }],
    creator: business.legalShortName,
    publisher: business.name,
    keywords: [
      "paisagismo em São Paulo",
      "projeto paisagístico",
      "paisagismo residencial",
      "paisagismo corporativo",
      "jardins",
      "consultoria paisagística",
      "Carla Moraes",
    ],
    manifest: "/manifest.webmanifest",
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "geo.region": "BR-SP",
      "geo.placename": "São Paulo",
    },
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: "/",
      siteName: business.name,
      title: `${business.name} | Paisagismo em São Paulo`,
      description: business.description,
      images: [
        {
          url: "/images/og-cover.jpg",
          width: 1024,
          height: 786,
          alt: "Jardim tropical projetado por Carla Moraes",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} | Paisagismo em São Paulo`,
      description: business.description,
      images: ["/images/og-cover.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F4EE" },
    { media: "(prefers-color-scheme: dark)", color: "#111713" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${editorial.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* WHY: aplica a preferência antes da pintura inicial, evitando flash de tema e CLS. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body>
        <MotionObserver />
        <OrganicGrowth />
        {children}
        <ConsentManager />
      </body>
    </html>
  );
}
