import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon } from "@/components/icons";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import {
  business,
  contactLinks,
  getCategoryLabel,
  getProjectBySlug,
  projects,
} from "@/lib/data/business";

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.fullDescription,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} | ${business.name}`,
      description: project.description,
      url: `/projetos/${project.slug}`,
      images: [
        {
          url: project.cover.src,
          width: project.cover.width,
          height: project.cover.height,
          alt: project.cover.alt,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length]!;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${business.website}/projetos/${project.slug}/#projeto`,
        name: project.title,
        description: project.fullDescription,
        dateCreated: project.year,
        locationCreated: project.location,
        inLanguage: "pt-BR",
        mainEntityOfPage: `${business.website}/projetos/${project.slug}`,
        creator: { "@type": "Organization", name: business.name, url: business.website },
        image: project.images.map((image) => `${business.website}${image.src}`),
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
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${business.website}/projetos/${project.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <a href="#conteudo" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-canvas px-5 py-3 text-sm font-semibold text-forest-deep transition-transform focus:translate-y-0">Ir para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo">
        <section className="relative isolate flex h-[84svh] min-h-[42rem] max-h-[58rem] items-end overflow-hidden bg-forest-deep pb-12 pt-32 text-canvas sm:pb-16">
          {/* WHY: cada detalhe possui uma única capa prioritária; as demais fotos são carregadas apenas ao se aproximarem do viewport. */}
          <Image src={project.cover.src} alt={project.cover.alt} fill priority fetchPriority="high" sizes="100vw" style={{ objectPosition: project.cover.position }} className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,35,25,0.62)_0%,rgba(18,35,25,0.12)_40%,rgba(18,35,25,0.86)_100%)]" />
          <div className="page-frame relative">
            <Link href="/projetos" className="inline-flex min-h-11 items-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-canvas/72 transition-colors hover:text-canvas">← Todos os projetos</Link>
            <div className="mt-5 flex flex-col gap-7 border-t border-canvas/25 pt-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">{getCategoryLabel(project.category)} · {project.location}</p>
                <h1 className="text-balance mt-4 max-w-5xl font-editorial text-display-sm font-medium text-canvas lg:text-display">{project.title}</h1>
              </div>
              <p className="shrink-0 font-editorial text-3xl text-canvas/72">{project.year}</p>
            </div>
          </div>
        </section>

        <section className="section-space bg-canvas">
          <div className="page-frame">
            <div className="reveal grid gap-9 border-b border-line pb-14 lg:grid-cols-12 lg:pb-20">
              <p className="eyebrow lg:col-span-3">Sobre o projeto</p>
              <div className="lg:col-span-8 lg:col-start-5">
                <h2 className="text-balance font-editorial text-3xl font-medium leading-tight text-forest-deep sm:text-5xl">{project.description}</h2>
                <p className="mt-7 max-w-2xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">{project.fullDescription}</p>
              </div>
            </div>

            <div className="mt-14 sm:mt-20">
              <ProjectGallery images={project.images} projectTitle={project.title} />
            </div>
          </div>
        </section>

        <section className="bg-canvas-soft py-16 sm:py-20">
          <div className="page-frame reveal grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Próximo projeto</p>
              <Link href={`/projetos/${nextProject.slug}`} className="group mt-4 inline-flex items-center gap-4 font-editorial text-3xl font-medium leading-tight text-forest-deep sm:text-5xl">
                {nextProject.title}
                <ArrowUpRightIcon className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="lg:text-right">
              <p className="text-sm leading-7 text-ink-muted">Quer conversar sobre um espaço?</p>
              <Link href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-forest-deep underline decoration-gold underline-offset-8">Iniciar um projeto pelo WhatsApp</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
