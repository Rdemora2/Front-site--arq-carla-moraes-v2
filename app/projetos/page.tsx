import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { business, contactLinks, projects } from "@/lib/data/business";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Projetos de paisagismo",
  description:
    "Conheça projetos residenciais e corporativos de Carla Moraes, com jardins clássicos, tropicais e paisagismo para hotelaria.",
  path: "/projetos",
  socialDescription:
    "Projetos residenciais e corporativos que conectam arquitetura, natureza e a identidade de cada espaço.",
  socialCard: "projetos",
});

export default function ProjectsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${business.website}/projetos/#pagina`,
        url: `${business.website}/projetos`,
        name: "Projetos de paisagismo",
        description:
          "Seleção de projetos paisagísticos residenciais e corporativos de Carla Moraes.",
        inLanguage: "pt-BR",
        mainEntity: { "@id": `${business.website}/projetos/#lista` },
      },
      {
        "@type": "ItemList",
        "@id": `${business.website}/projetos/#lista`,
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: `${business.website}/projetos/${project.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: business.website },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projetos",
            item: `${business.website}/projetos`,
          },
        ],
      },
    ],
  };

  return (
    <PageShell structuredData={structuredData}>
        <section data-site-hero className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-surface-contrast pb-16 pt-32 text-content-onContrast sm:min-h-[39rem] sm:pb-20 lg:min-h-[42rem]">
          <Image src={projects[0].cover.src} alt={projects[0].cover.alt} fill priority fetchPriority="high" sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,35,25,0.94)_0%,rgba(18,35,25,0.72)_55%,rgba(18,35,25,0.25)_100%)]" />
          <div className="page-frame relative">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sage-pale">Portfólio · Paisagismo</p>
            <h1 className="text-balance mt-6 max-w-5xl font-editorial text-display-sm font-medium text-content-onContrast lg:text-display">Projetos que transformam a forma de <em className="font-normal text-accent-soft">viver o espaço.</em></h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-content-onContrast/75 sm:text-base sm:leading-8">Uma seleção de jardins residenciais e espaços corporativos criados com leitura técnica, sensibilidade e atenção ao tempo da natureza.</p>
          </div>
        </section>

        <section aria-labelledby="titulo-acervo" className="section-space bg-surface">
          <div className="page-frame">
            <div className="reveal grid gap-8 border-b border-stroke pb-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow">Residencial · Corporativo</p>
                <h2 id="titulo-acervo" className="mt-5 font-editorial text-section-sm font-medium text-content sm:text-section">Paisagens com identidade própria.</h2>
              </div>
              <div className="flex gap-8 lg:col-span-4 lg:justify-end lg:pb-2">
                <p className="text-xs uppercase tracking-[0.15em] text-content-muted"><span className="font-editorial text-2xl text-content">02</span><br />residenciais</p>
                <p className="text-xs uppercase tracking-[0.15em] text-content-muted"><span className="font-editorial text-2xl text-content">02</span><br />corporativos</p>
              </div>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-24">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  className={`reveal lg:col-span-6 ${index % 2 === 1 ? "lg:mt-28" : ""}`}
                  imageClassName={index % 2 === 0 ? "aspect-[5/4]" : "aspect-[4/5]"}
                  imageSizes="(min-width: 1024px) 48vw, (min-width: 768px) 50vw, 100vw"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-soft py-16 sm:py-20">
          <div className="page-frame reveal flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Tem um espaço em mente?</p>
              <h2 className="mt-3 font-editorial text-3xl font-medium text-content sm:text-4xl">Conte para a Carla o que você deseja transformar.</h2>
            </div>
            <Link href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-forest px-7 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-content-onContrast transition-colors hover:bg-surface-contrast">
              Conversar sobre um projeto
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
    </PageShell>
  );
}
