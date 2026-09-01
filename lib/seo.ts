import type { Metadata } from "next";
import { business } from "@/lib/data/business";
import { getSocialCard, type SocialCardKey } from "@/lib/data/social-cards";

interface PageMetadataOptions {
  readonly title: string;
  readonly description: string;
  readonly path: `/${string}` | "/";
  readonly socialTitle?: string;
  readonly socialDescription?: string;
  readonly type?: "website" | "article";
  readonly index?: boolean;
  readonly absoluteTitle?: boolean;
  readonly socialCard?: SocialCardKey;
}

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle = `${title} | ${business.name}`,
  socialDescription = description,
  type = "website",
  index = true,
  absoluteTitle = false,
  socialCard = "home",
}: PageMetadataOptions): Metadata {
  const socialImage = getSocialCard(socialCard);
  const robots: Metadata["robots"] = index
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots,
    openGraph: {
      type,
      locale: "pt_BR",
      url: path,
      siteName: business.name,
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
    },
  };
}
