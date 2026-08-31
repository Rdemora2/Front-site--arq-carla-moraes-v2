import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { MotionObserver } from "@/components/motion-observer";
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
  themeColor: "#1C2A20",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${editorial.variable} ${sans.variable}`}>
      <body>
        <MotionObserver />
        {children}
      </body>
    </html>
  );
}
