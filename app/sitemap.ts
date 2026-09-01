import type { MetadataRoute } from "next";
import { business, projects } from "@/lib/data/business";
import sitemapLastModified from "@/lib/generated/sitemap-lastmod.json";

function getLastModified(path: string): Date | undefined {
  const value = (sitemapLastModified as Readonly<Record<string, string>>)[path];
  return value && !Number.isNaN(Date.parse(value)) ? new Date(value) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: business.website,
      lastModified: getLastModified("/"),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${business.website}/images/og-cover.jpg`],
    },
    {
      url: `${business.website}/projetos`,
      lastModified: getLastModified("/projetos"),
      changeFrequency: "monthly",
      priority: 0.9,
      images: projects.map((project) => `${business.website}${project.cover.src}`),
    },
    {
      url: `${business.website}/sobre`,
      lastModified: getLastModified("/sobre"),
      changeFrequency: "yearly",
      priority: 0.85,
      images: [`${business.website}${projects[0].cover.src}`],
    },
    {
      url: `${business.website}/servicos`,
      lastModified: getLastModified("/servicos"),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${business.website}${projects[1].cover.src}`],
    },
    {
      url: `${business.website}/processo`,
      lastModified: getLastModified("/processo"),
      changeFrequency: "yearly",
      priority: 0.8,
      images: [`${business.website}${projects[0].images[3]!.src}`],
    },
    {
      url: `${business.website}/contato`,
      lastModified: getLastModified("/contato"),
      changeFrequency: "yearly",
      priority: 0.85,
      images: [`${business.website}${projects[1].images[5]!.src}`],
    },
    ...projects.map((project) => ({
      url: `${business.website}/projetos/${project.slug}`,
      lastModified: getLastModified(`/projetos/${project.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: project.images.map((image) => `${business.website}${image.src}`),
    })),
  ];
}
