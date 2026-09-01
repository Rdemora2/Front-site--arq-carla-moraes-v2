import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { FaqAccordion } from "@/components/faq-accordion";
import { InstitutionalCta } from "@/components/institutional-cta";
import { InteriorHero } from "@/components/interior-hero";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { business, faqs, processSteps, projects, services } from "@/lib/data/business";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Serviços de paisagismo",
  description:
    "Projeto paisagístico, consultoria especializada e acompanhamento de obra para residências, empresas, jardins, varandas e terraços.",
  path: "/servicos",
  socialDescription:
    "Conheça a atuação de Carla Moraes em projeto paisagístico, consultoria e acompanhamento da implantação.",
  socialCard: "servicos",
});

export default function ServicesPage() {
  const heroImage = projects[1].images[4]!;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${business.website}/servicos/#pagina`,
        url: `${business.website}/servicos`,
        name: "Serviços de paisagismo",
        description: metadata.description,
        inLanguage: "pt-BR",
        mainEntity: services.map((service, index) => ({ "@id": `${business.website}/servicos/#servico-${index + 1}` })),
      },
      ...services.map((service, index) => ({
        "@type": "Service",
        "@id": `${business.website}/servicos/#servico-${index + 1}`,
        name: service.title,
        description: service.description,
        provider: { "@id": `${business.website}/#empresa` },
        areaServed: { "@type": "City", name: "São Paulo" },
      })),
      {
        "@type": "FAQPage",
        "@id": `${business.website}/servicos/#duvidas`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: business.website },
          { "@type": "ListItem", position: 2, name: "Serviços", item: `${business.website}/servicos` },
        ],
      },
    ],
  };

  return (
    <>
      <SkipLink />
      <SiteHeader tone="dark" />
      <main id="conteudo">
        <InteriorHero
          index="03"
          eyebrow="Serviços"
          title={<>Do conceito ao jardim, com <em className="font-normal text-accent">clareza técnica.</em></>}
          description="Soluções de paisagismo para diferentes escalas, sempre orientadas pelo espaço, pela arquitetura e pela rotina de quem vai vivê-lo."
          image={heroImage}
        />

        <section aria-labelledby="atuacao-titulo" className="section-space bg-surface-contrast text-content-onContrast">
          <div className="page-frame">
            <div className="reveal grid gap-8 border-b border-stroke-onContrast/15 pb-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-accent-soft">Áreas de atuação</p>
                <h2 id="atuacao-titulo" className="text-balance mt-5 font-editorial text-section-sm font-medium sm:text-section">O cuidado necessário em cada etapa do paisagismo.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-content-onContrast/68 sm:text-base sm:leading-8 lg:col-span-4">O escopo é definido conforme as necessidades do espaço e o nível de acompanhamento desejado.</p>
            </div>

            <div className="divide-y divide-stroke-onContrast/15">
              {services.map((service, index) => (
                <article key={service.number} id={`servico-${index + 1}`} className={`reveal grid gap-7 py-12 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:py-20 ${index === 1 ? "lg:ml-[6vw]" : index === 2 ? "lg:ml-[12vw]" : ""}`}>
                  <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-accent-soft lg:col-span-1">{service.number}</p>
                  <div className="lg:col-span-5">
                    <h3 className="font-editorial text-4xl font-medium leading-none sm:text-5xl lg:text-6xl">{service.title}</h3>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-content-onContrast/70 sm:text-base sm:leading-8">{service.description}</p>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-sage">O que pode fazer parte</p>
                    <ul className="mt-5 divide-y divide-stroke-onContrast/12 border-y border-stroke-onContrast/12">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex min-h-12 items-center gap-3 text-sm text-content-onContrast/78"><span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-soft" />{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="processo-resumo" className="section-space bg-highlight">
          <div className="page-frame">
            <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-content">Da escuta à implantação</p>
                <h2 id="processo-resumo" className="mt-5 font-editorial text-section-sm font-medium text-content sm:text-section">Um método próximo, dividido em decisões claras.</h2>
              </div>
              <Link href="/processo" className="group inline-flex min-h-12 items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-content underline decoration-accent/70 underline-offset-8 lg:col-span-4 lg:col-start-9 lg:justify-self-end">Conhecer o processo <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
            <ol className="mt-12 grid border-y border-stroke sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <li key={step.number} className={`reveal py-8 sm:px-6 lg:py-10 ${index > 0 ? "border-t border-stroke sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-t lg:border-t-0" : ""}`}>
                  <span className="text-[0.6rem] font-semibold tracking-[0.18em] text-content">{step.number}</span>
                  <h3 className="mt-6 font-editorial text-2xl font-medium text-content sm:text-3xl">{step.title}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="faq-servicos" className="section-space bg-surface-soft">
          <div className="page-frame grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-4">
              <p className="eyebrow">Perguntas frequentes</p>
              <h2 id="faq-servicos" className="mt-5 font-editorial text-section-sm font-medium text-content sm:text-section">Respostas diretas antes de começar.</h2>
            </div>
            <div className="reveal divide-y divide-stroke border-y border-stroke lg:col-span-8">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </section>

        <InstitutionalCta title="Qual é o melhor caminho para o seu espaço?" description="Uma primeira conversa ajuda a entender se a necessidade é um projeto completo, uma consultoria ou o acompanhamento da implantação." />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <JsonLd data={structuredData} />
    </>
  );
}
