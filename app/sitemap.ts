import type { MetadataRoute } from "next";
import { business, projects } from "@/lib/data/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-31T00:00:00-03:00");

  return [
    {
      url: business.website,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${business.website}/images/og-cover.jpg`],
    },
    {
      url: `${business.website}/projetos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: projects.map((project) => `${business.website}${project.cover.src}`),
    },
    {
      url: `${business.website}/sobre`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.85,
      images: [`${business.website}${projects[0].cover.src}`],
    },
    {
      url: `${business.website}/servicos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${business.website}${projects[1].cover.src}`],
    },
    {
      url: `${business.website}/processo`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
      images: [`${business.website}${projects[0].images[3]!.src}`],
    },
    {
      url: `${business.website}/contato`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.85,
      images: [`${business.website}${projects[1].images[5]!.src}`],
    },
    ...projects.map((project) => ({
      url: `${business.website}/projetos/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: project.images.map((image) => `${business.website}${image.src}`),
    })),
  ];
}
