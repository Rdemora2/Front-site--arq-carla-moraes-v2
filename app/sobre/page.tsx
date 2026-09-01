import type { Metadata } from "next";
import Image from "next/image";
import { InstitutionalCta } from "@/components/institutional-cta";
import { InteriorHero } from "@/components/interior-hero";
import { PageShell } from "@/components/page-shell";
import { business, institutionalCopy, projects } from "@/lib/data/business";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre Carla Moraes",
  description:
    "Conheça a trajetória de Carla Moraes no paisagismo desde 1996, sua forma de criar jardins personalizados e a experiência em mais de 350 projetos.",
  path: "/sobre",
  socialDescription:
    "Uma trajetória dedicada a conectar pessoas e natureza através de projetos paisagísticos personalizados.",
  socialCard: "sobre",
});

const principles = [
  {
    number: "01",
    title: "Escuta próxima",
    description: "Cada projeto começa pela rotina, pelas preferências e pela forma como o cliente deseja viver o espaço.",
  },
  {
    number: "02",
    title: "Conhecimento técnico",
    description: "Luz, solo, clima, arquitetura e manutenção orientam escolhas que precisam funcionar no presente e no tempo.",
  },
  {
    number: "03",
    title: "Cuidado ambiental",
    description: "Espécies adaptadas ao local favorecem longevidade, equilíbrio e uma relação mais responsável com a natureza.",
  },
] as const;

export default function AboutPage() {
  const heroImage = projects[0].images[2]!;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${business.website}/sobre/#pagina`,
        url: `${business.website}/sobre`,
        name: "Sobre Carla Moraes",
        description: metadata.description,
        inLanguage: "pt-BR",
        mainEntity: { "@id": `${business.website}/sobre/#carla` },
      },
      {
        "@type": "Person",
        "@id": `${business.website}/sobre/#carla`,
        name: business.legalShortName,
        jobTitle: "Paisagista",
        worksFor: { "@id": `${business.website}/#empresa` },
        sameAs: [business.instagram, business.linkedin],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: business.website },
          { "@type": "ListItem", position: 2, name: "Sobre", item: `${business.website}/sobre` },
        ],
      },
    ],
  };

  return (
    <PageShell headerTone="dark" structuredData={structuredData}>
        <InteriorHero
          index="02"
          eyebrow="Sobre"
          title={<>Uma trajetória guiada pela <em className="font-normal text-accent">natureza.</em></>}
          description="Desde 1996, Carla Moraes desenvolve projetos paisagísticos personalizados para aproximar pessoas, arquitetura e natureza."
          image={heroImage}
        />

        <section aria-labelledby="historia-titulo" className="section-space bg-surface-warm">
          <div className="page-frame grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-4">
              <p className="eyebrow">A história</p>
              <p aria-hidden="true" className="mt-7 font-editorial text-[7rem] font-medium leading-none tracking-[-0.06em] text-accent sm:text-[9rem]">1996</p>
            </div>
            <div className="reveal lg:col-span-7 lg:col-start-6">
              <h2 id="historia-titulo" className="text-balance font-editorial text-section-sm font-medium text-content sm:text-section">Um jardim precisa pertencer ao lugar — e a quem vai vivê-lo.</h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-content-muted">
                {institutionalCopy.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="mt-8 border-l border-accent pl-6 text-sm leading-7 text-content">A condução segue próxima da primeira conversa ao detalhamento, com acompanhamento da implantação quando contratado e integração a parceiros especializados.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="principios-titulo" className="section-space overflow-hidden bg-surface">
          <div className="page-frame">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="reveal lg:col-span-7">
                <p className="eyebrow">Forma de olhar</p>
                <h2 id="principios-titulo" className="mt-5 font-editorial text-section-sm font-medium text-content sm:text-section">Delicadeza na composição. Precisão em cada escolha.</h2>
              </div>
              <div className="reveal relative aspect-[16/10] lg:col-span-4 lg:col-start-9">
                <Image src={projects[1].images[4]!.src} alt={projects[1].images[4]!.alt} fill sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover [clip-path:polygon(12%_0,100%_0,100%_86%,86%_100%,0_100%,0_12%)]" />
              </div>
            </div>
            <div className="mt-14 divide-y divide-stroke border-y border-stroke lg:mt-20">
              {principles.map((principle, index) => (
                <article key={principle.number} className={`reveal grid gap-4 py-8 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-8 ${index === 1 ? "lg:ml-[7vw]" : index === 2 ? "lg:ml-[14vw]" : ""}`}>
                  <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-accent-text lg:col-span-1">{principle.number}</p>
                  <h3 className="font-editorial text-3xl font-medium text-content sm:text-4xl lg:col-span-4">{principle.title}</h3>
                  <p className="max-w-xl text-sm leading-7 text-content-muted sm:text-base sm:leading-8 lg:col-span-6">{principle.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="autoridade-titulo" className="bg-surface-contrast py-20 text-content-onContrast sm:py-24 lg:py-28">
          <div className="page-frame reveal grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-accent-soft">Experiência comprovada</p>
              <h2 id="autoridade-titulo" className="text-balance mt-5 font-editorial text-section-sm font-medium sm:text-section">Mais de 350 projetos e uma atuação que alcança a hotelaria nacional e internacional.</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:col-start-9">
              <div className="border-l border-stroke-onContrast/20 pl-5"><p className="font-editorial text-5xl text-accent-soft">350+</p><p className="mt-2 text-[0.56rem] uppercase tracking-[0.16em] text-content-onContrast/65">Projetos realizados</p></div>
              <div className="border-l border-stroke-onContrast/20 pl-5"><p className="font-editorial text-4xl text-accent-soft">Compromisso</p><p className="mt-2 text-[0.56rem] uppercase tracking-[0.16em] text-content-onContrast/65">com cada entrega</p></div>
            </div>
          </div>
        </section>

        <InstitutionalCta title="Seu espaço também pode contar uma história com a natureza." description="Compartilhe com a Carla o que você deseja transformar e entenda qual é o melhor ponto de partida para o projeto." />
    </PageShell>
  );
}
