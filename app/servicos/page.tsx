import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { InstitutionalCta } from "@/components/institutional-cta";
import { InteriorHero } from "@/components/interior-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { business, faqs, processSteps, projects, services } from "@/lib/data/business";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Serviços de paisagismo",
  description:
    "Projeto paisagístico, consultoria especializada e acompanhamento de obra para residências, empresas, jardins, varandas e terraços.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: `Serviços de paisagismo | ${business.name}`,
    description:
      "Conheça a atuação de Carla Moraes em projeto paisagístico, consultoria e acompanhamento da implantação.",
    url: "/servicos",
    images: [{ url: projects[1].cover.src, width: projects[1].cover.width, height: projects[1].cover.height, alt: projects[1].cover.alt }],
  },
};

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
      <SiteHeader tone="dark" />
      <main>
        <InteriorHero
          index="03"
          eyebrow="Serviços"
          title={<>Do conceito ao jardim, com <em className="font-normal text-gold">clareza técnica.</em></>}
          description="Soluções de paisagismo para diferentes escalas, sempre orientadas pelo espaço, pela arquitetura e pela rotina de quem vai vivê-lo."
          image={heroImage}
        />

        <section aria-labelledby="atuacao-titulo" className="section-space bg-forest-deep text-canvas">
          <div className="page-frame">
            <div className="reveal grid gap-8 border-b border-canvas/15 pb-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">Áreas de atuação</p>
                <h2 id="atuacao-titulo" className="text-balance mt-5 font-editorial text-section-sm font-medium sm:text-section">O cuidado necessário em cada etapa do paisagismo.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-canvas/68 sm:text-base sm:leading-8 lg:col-span-4">O escopo é definido conforme as necessidades do espaço e o nível de acompanhamento desejado.</p>
            </div>

            <div className="divide-y divide-canvas/15">
              {services.map((service, index) => (
                <article key={service.number} id={`servico-${index + 1}`} className={`reveal grid gap-7 py-12 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:py-20 ${index === 1 ? "lg:ml-[6vw]" : index === 2 ? "lg:ml-[12vw]" : ""}`}>
                  <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-gold-soft lg:col-span-1">{service.number}</p>
                  <div className="lg:col-span-5">
                    <h3 className="font-editorial text-4xl font-medium leading-none sm:text-5xl lg:text-6xl">{service.title}</h3>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-canvas/70 sm:text-base sm:leading-8">{service.description}</p>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-sage">O que pode fazer parte</p>
                    <ul className="mt-5 divide-y divide-canvas/12 border-y border-canvas/12">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex min-h-12 items-center gap-3 text-sm text-canvas/78"><span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-soft" />{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="processo-resumo" className="section-space bg-gold-soft">
          <div className="page-frame">
            <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-forest">Da escuta à implantação</p>
                <h2 id="processo-resumo" className="mt-5 font-editorial text-section-sm font-medium text-forest-deep sm:text-section">Um método próximo, dividido em decisões claras.</h2>
              </div>
              <Link href="/processo" className="group inline-flex min-h-12 items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-forest-deep underline decoration-forest/40 underline-offset-8 lg:col-span-4 lg:col-start-9 lg:justify-self-end">Conhecer o processo <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
            <ol className="mt-12 grid border-y border-forest/20 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <li key={step.number} className={`reveal py-8 sm:px-6 lg:py-10 ${index > 0 ? "border-t border-forest/20 sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-t lg:border-t-0" : ""}`}>
                  <span className="text-[0.6rem] font-semibold tracking-[0.18em] text-forest">{step.number}</span>
                  <h3 className="mt-6 font-editorial text-2xl font-medium text-forest-deep sm:text-3xl">{step.title}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="faq-servicos" className="section-space bg-canvas-soft">
          <div className="page-frame grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-4">
              <p className="eyebrow">Perguntas frequentes</p>
              <h2 id="faq-servicos" className="mt-5 font-editorial text-section-sm font-medium text-forest-deep sm:text-section">Respostas diretas antes de começar.</h2>
            </div>
            <div className="reveal divide-y divide-line border-y border-line lg:col-span-8">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 font-editorial text-xl font-medium leading-tight text-forest-deep marker:hidden sm:min-h-24 sm:text-2xl">
                    {faq.question}
                    <span aria-hidden="true" className="relative h-10 w-10 shrink-0 rounded-full border border-line-strong group-open:bg-forest group-open:text-canvas"><span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" /><span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform group-open:rotate-90" /></span>
                  </summary>
                  <p className="max-w-2xl pb-8 pr-12 text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <InstitutionalCta title="Qual é o melhor caminho para o seu espaço?" description="Uma primeira conversa ajuda a entender se a necessidade é um projeto completo, uma consultoria ou o acompanhamento da implantação." />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
