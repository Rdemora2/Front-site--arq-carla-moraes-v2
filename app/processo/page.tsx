import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { InstitutionalCta } from "@/components/institutional-cta";
import { InteriorHero } from "@/components/interior-hero";
import { PageShell } from "@/components/page-shell";
import { business, processSteps, projects } from "@/lib/data/business";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Processo de projeto paisagístico",
  description:
    "Entenda as etapas do trabalho de Carla Moraes: escuta e visita técnica, conceito, projeto executivo e acompanhamento da implantação.",
  path: "/processo",
  socialDescription:
    "Um processo próximo e claro, da leitura inicial do espaço ao acompanhamento da implantação.",
  socialCard: "processo",
});

const decisionFactors = [
  "Arquitetura existente",
  "Luz, solo e clima",
  "Rotina e uso do espaço",
  "Manutenção desejada",
  "Preferências do cliente",
  "Longevidade das espécies",
] as const;

export default function ProcessPage() {
  const heroImage = projects[0].images[3]!;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${business.website}/processo/#pagina`,
        url: `${business.website}/processo`,
        name: "Processo de projeto paisagístico",
        description: metadata.description,
        inLanguage: "pt-BR",
        mainEntity: { "@id": `${business.website}/processo/#etapas` },
      },
      {
        "@type": "ItemList",
        "@id": `${business.website}/processo/#etapas`,
        numberOfItems: processSteps.length,
        itemListElement: processSteps.map((step, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: step.title,
          description: step.description,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: business.website },
          { "@type": "ListItem", position: 2, name: "Processo", item: `${business.website}/processo` },
        ],
      },
    ],
  };

  return (
    <PageShell headerTone="dark" structuredData={structuredData}>
        <InteriorHero
          index="05"
          eyebrow="Processo"
          title={<>Clareza para transformar intenção em <em className="font-normal text-accent">paisagem.</em></>}
          description="O projeto avança em etapas definidas, aproximando desejos, condições reais do espaço e as decisões técnicas necessárias para a implantação."
          image={heroImage}
        >
          <Link href="/servicos" className="group inline-flex min-h-12 items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-content underline decoration-accent underline-offset-8">Ver serviços <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
        </InteriorHero>

        <section aria-labelledby="etapas-titulo" className="section-space bg-surface-warm">
          <div className="page-frame">
            <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow">Quatro etapas</p>
                <h2 id="etapas-titulo" className="mt-5 font-editorial text-section-sm font-medium text-content sm:text-section">Cada decisão no momento certo.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-content-muted sm:text-base sm:leading-8 lg:col-span-4">O escopo e os prazos variam conforme a escala e a complexidade, mas a lógica de trabalho permanece transparente.</p>
            </div>

            <ol className="mt-14 divide-y divide-stroke border-y border-stroke lg:mt-20">
              {processSteps.map((step, index) => (
                <li key={step.number} className={`reveal relative grid gap-6 py-10 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16 ${index % 2 === 1 ? "lg:ml-[10vw]" : ""}`}>
                  <span aria-hidden="true" className="font-editorial text-7xl font-medium leading-none text-accent/45 sm:text-8xl lg:col-span-2">{step.number}</span>
                  <h3 className="font-editorial text-3xl font-medium leading-tight text-content sm:text-5xl lg:col-span-4">{step.title}</h3>
                  <p className="max-w-2xl text-sm leading-7 text-content-muted sm:text-base sm:leading-8 lg:col-span-5">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="decisoes-titulo" className="section-space bg-surface-contrast text-content-onContrast">
          <div className="page-frame grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-6">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-accent-soft">O que orienta o projeto</p>
              <h2 id="decisoes-titulo" className="text-balance mt-5 font-editorial text-section-sm font-medium sm:text-section">A estética nasce de condições concretas.</h2>
              <p className="mt-7 max-w-xl text-sm leading-7 text-content-onContrast/68 sm:text-base sm:leading-8">A seleção de espécies, materiais, volumes e caminhos considera o lugar por inteiro — não apenas a imagem final.</p>
            </div>
            <ul className="reveal divide-y divide-stroke-onContrast/15 border-y border-stroke-onContrast/15 lg:col-span-5 lg:col-start-8">
              {decisionFactors.map((factor, index) => (
                <li key={factor} className="flex min-h-16 items-center justify-between gap-5 text-sm text-content-onContrast/78 sm:min-h-20 sm:text-base"><span>{factor}</span><span className="text-[0.58rem] tracking-[0.16em] text-accent-soft">0{index + 1}</span></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="page-frame reveal grid gap-7 border-l border-accent pl-7 sm:pl-10 lg:grid-cols-12 lg:items-center">
            <h2 className="font-editorial text-3xl font-medium text-content sm:text-5xl lg:col-span-6">Projeto e implantação permanecem alinhados.</h2>
            <p className="max-w-2xl text-sm leading-7 text-content-muted sm:text-base sm:leading-8 lg:col-span-5 lg:col-start-8">Quando contratado, o acompanhamento técnico preserva as decisões aprovadas. A implantação é realizada em integração com parceiros de confiança e especialistas complementares.</p>
          </div>
        </section>

        <InstitutionalCta title="Um bom projeto começa por uma boa leitura do espaço." description="Converse com a Carla sobre o local, a rotina e o que você deseja transformar. A partir disso, o caminho do trabalho fica mais claro." />
    </PageShell>
  );
}
