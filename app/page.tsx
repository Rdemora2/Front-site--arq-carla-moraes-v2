import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { FaqAccordion } from "@/components/faq-accordion";
import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import {
  business,
  contactLinks,
  faqs,
  institutionalCopy,
  processSteps,
  projects,
  services,
  trustSignals,
} from "@/lib/data/business";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: `${business.name} | Paisagismo em São Paulo`,
  description: business.description,
  path: "/",
  socialTitle: `${business.name} | Paisagismo em São Paulo`,
  absoluteTitle: true,
  socialCard: "home",
});

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${business.website}/#empresa`,
        name: business.name,
        alternateName: business.legacyName,
        url: business.website,
        image: `${business.website}/images/og-cover.jpg`,
        description: business.description,
        foundingDate: String(business.foundedIn),
        telephone: `+${business.phoneE164}`,
        email: business.email,
        areaServed: { "@type": "City", name: "São Paulo" },
        sameAs: [business.instagram, business.linkedin],
        knowsAbout: [
          "Paisagismo residencial",
          "Paisagismo corporativo",
          "Jardins",
          "Projeto paisagístico",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de paisagismo",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${business.website}/#website`,
        url: business.website,
        name: business.name,
        inLanguage: "pt-BR",
        publisher: { "@id": `${business.website}/#empresa` },
      },
    ],
  };

  return (
    <>
      <SkipLink />
      <SiteHeader tone="dark" />

      <main id="conteudo">
        <section data-site-hero className="relative isolate overflow-hidden bg-surface">
          <div aria-hidden="true" className="absolute inset-x-0 top-[7rem] h-px bg-stroke/70" />
          <div aria-hidden="true" className="absolute bottom-0 left-[58%] top-0 hidden w-px bg-stroke/70 lg:block" />
          <div className="page-frame relative pb-16 pt-[calc(8.5rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-[calc(10rem+env(safe-area-inset-top))] lg:min-h-[58rem] lg:pb-16 lg:pt-40">
            <div className="relative z-20 lg:w-[66%]">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-accent" />
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-accent-text sm:text-xs">{institutionalCopy.heroEyebrow}</p>
              </div>
              <h1 aria-label={institutionalCopy.heroTitle.full} className="mt-7 font-editorial text-[clamp(3.15rem,15.5vw,5rem)] font-medium leading-[0.92] tracking-[-0.052em] text-content lg:text-[clamp(5.5rem,7.5vw,7.25rem)] lg:leading-[0.88]">
                <span aria-hidden="true" className="block">{institutionalCopy.heroTitle.lines[0]}</span>
                <span aria-hidden="true" className="ml-[7vw] block lg:ml-[5vw]">{institutionalCopy.heroTitle.lines[1]}</span>
                <span aria-hidden="true" className="block font-normal text-accent">{institutionalCopy.heroTitle.lines[2]}</span>
                <em aria-hidden="true" className="ml-[16vw] block font-normal lg:ml-[11vw]">{institutionalCopy.heroTitle.lines[3]}</em>
              </h1>
            </div>

            <div className="mt-9 grid grid-cols-[1fr_8.5rem] items-end gap-5 sm:grid-cols-[1fr_11rem] lg:mt-10 lg:block">
              <p className="max-w-[13rem] text-sm leading-7 text-content-muted sm:max-w-sm sm:text-base sm:leading-8 lg:max-w-md">
                {institutionalCopy.heroDescription}
              </p>

              <div className="relative aspect-[2/3] w-full lg:absolute lg:right-0 lg:top-32 lg:h-[42rem] lg:w-[35%]">
                <div aria-hidden="true" className="absolute -inset-2 bg-accent/65 [clip-path:polygon(14%_0,100%_0,100%_86%,86%_100%,0_100%,0_14%)] sm:-inset-3" />
                <div className="relative h-full overflow-hidden bg-sage-pale [clip-path:polygon(14%_0,100%_0,100%_86%,86%_100%,0_100%,0_14%)]">
                  {/* WHY: o recorte vertical usa o enquadramento nativo da foto, reduz bytes no mobile e evita a perda de nitidez causada por um cover horizontal ampliado. */}
                  <Image src="/images/projects/jardim-tropical/tropical-3.jpg" alt="Composição vertical de bromélias e pedras naturais em jardim tropical" fill priority fetchPriority="high" sizes="(min-width: 1024px) 35vw, 11rem" className="object-cover" />
                </div>
                <div className="absolute -left-4 -top-4 z-10 w-[5.7rem] bg-surface-contrast px-3 py-3.5 text-content-onContrast shadow-lift [clip-path:polygon(0_0,100%_0,100%_calc(100%-0.7rem),calc(100%-0.7rem)_100%,0_100%)] sm:-left-7 sm:-top-7 sm:w-28 sm:px-4 sm:py-5 lg:-left-12 lg:top-14 lg:w-36 lg:px-5 lg:py-6">
                  <span className="block font-editorial text-[1.8rem] font-medium leading-[0.75] tracking-[-0.04em] sm:text-4xl lg:text-5xl">350<span className="text-base sm:text-xl lg:text-2xl">+</span></span>
                  <span className="mt-2 block text-[0.43rem] font-semibold uppercase leading-[1.45] tracking-[0.13em] text-sage-pale sm:text-[0.5rem]">projetos realizados</span>
                  <span className="mt-2 block border-t border-stroke-onContrast/20 pt-2 text-[0.42rem] font-semibold uppercase tracking-[0.13em] text-accent-soft sm:text-[0.48rem]">desde 1996</span>
                </div>
                <p className="absolute -bottom-7 right-0 text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-content-muted lg:-bottom-8">Jardim Tropical · 2023</p>
              </div>
            </div>

            <div className="relative z-20 mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6 lg:mt-9">
              <ButtonLink data-whatsapp-surface href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                Conversar com a Carla
              </ButtonLink>
              <Link href="/projetos" className="inline-flex min-h-12 items-center gap-2 px-1 text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-content transition-colors hover:text-accent-text">
                Ver projetos <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative z-20 mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-stroke pt-5 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-accent-text sm:max-w-md lg:mt-10">
              <span>Desde 1996</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
              <span>350+ projetos</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
              <span>São Paulo</span>
            </div>

            <div className="absolute bottom-12 right-[29%] z-10 hidden h-44 w-64 border-[0.55rem] border-surface bg-sage-pale shadow-lift lg:block">
              <Image src="/images/projects/jardim-frances/frances-3.jpg" alt="Espelho d’água em jardim residencial clássico" fill sizes="18rem" className="object-cover" />
            </div>
            <p aria-hidden="true" className="absolute bottom-11 left-12 hidden font-editorial text-[10rem] leading-none tracking-[-0.06em] text-sage-pale/55 xl:block">01</p>
          </div>
        </section>

        <section aria-labelledby="titulo-autoridade" className="relative isolate overflow-hidden bg-surface-contrast text-content-onContrast">
          <p aria-hidden="true" className="absolute -right-4 top-0 hidden font-editorial text-[15rem] leading-none text-content-onContrast/[0.035] lg:block">02</p>
          <div className="page-frame relative z-10 py-16 sm:py-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="reveal lg:col-span-7 lg:pr-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent-soft sm:text-xs">Trajetória comprovada</p>
                <h2 id="titulo-autoridade" className="text-balance mt-5 max-w-3xl font-editorial text-[clamp(3rem,12vw,4.8rem)] font-medium leading-[0.9] tracking-[-0.04em] sm:text-section">Referência no mercado desde 1996.</h2>
                <p className="mt-7 max-w-xl text-sm leading-7 text-content-onContrast/72 sm:text-base sm:leading-8">{institutionalCopy.marketStatement}</p>
                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <ButtonLink data-whatsapp-surface href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" variant="light">Conversar sobre um projeto</ButtonLink>
                  <Link href="/sobre" className="inline-flex min-h-12 items-center gap-2 px-1 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-content-onContrast transition-colors hover:text-accent-soft">
                    Conhecer a trajetória <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <dl className="reveal grid grid-cols-2 border-l border-t border-stroke-onContrast/20 lg:col-span-5">
                {trustSignals.map((signal) => (
                  <div key={signal.value} className="min-h-36 border-b border-r border-stroke-onContrast/20 p-4 sm:min-h-44 sm:p-6">
                    <dt className="font-editorial text-[1.85rem] font-medium leading-none tracking-[-0.035em] text-accent-soft sm:text-4xl">{signal.value}</dt>
                    <dd className="mt-3 text-[0.55rem] font-semibold uppercase leading-4 tracking-[0.15em] text-content-onContrast">{signal.label}</dd>
                    <dd className="mt-3 text-[0.68rem] leading-5 text-content-onContrast/58 sm:text-xs">{signal.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="reveal mt-12 border-t border-stroke-onContrast/20 pt-6 lg:mt-14">
              <p className="text-[0.56rem] font-semibold uppercase tracking-[0.17em] text-sage">Quatro recortes de uma trajetória consistente</p>
              <nav aria-label="Projetos que comprovam a trajetória" className="mt-3 grid grid-cols-2 lg:grid-cols-4">
                {projects.map((project) => (
                  <Link key={project.slug} href={`/projetos/${project.slug}`} className="group flex min-h-16 items-center justify-between gap-2 border-b border-r border-stroke-onContrast/15 px-2 py-3 text-[0.68rem] text-content-onContrast/70 transition-colors even:border-r-0 hover:text-content-onContrast sm:px-4 sm:text-xs lg:min-h-14 lg:border-b-0 lg:border-r lg:px-5 lg:even:border-r lg:first:pl-0 lg:last:border-r-0">
                    <span className="line-clamp-1">{project.title}</span>
                    <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-accent-soft transition-transform duration-500 ease-organic group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section id="projetos-em-destaque" aria-labelledby="titulo-projetos" className="section-space relative isolate overflow-hidden bg-surface-warm">
          <p aria-hidden="true" className="absolute -left-8 top-10 hidden font-editorial text-[16rem] leading-none text-accent/[0.08] lg:block">03</p>
          <div className="page-frame relative z-10">
            <div className="reveal grid gap-7 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow">Projetos selecionados</p>
                <h2 id="titulo-projetos" className="mt-5 max-w-4xl font-editorial text-section-sm font-medium text-content sm:text-section">{institutionalCopy.portfolioTitle}</h2>
              </div>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-sm leading-7 text-content-muted">{institutionalCopy.portfolioDescription}</p>
                <Link href="/projetos" className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-content underline decoration-accent underline-offset-8">
                  Explorar o portfólio completo <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 items-start gap-x-4 gap-y-14 sm:gap-x-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-20">
              <ProjectCard project={projects[0]} className="reveal col-span-2 lg:col-span-8" imageClassName="aspect-[16/10]" imageSizes="(min-width: 1024px) 66vw, 100vw" />
              <ProjectCard compact project={projects[1]} className="reveal col-span-1 lg:col-span-4 lg:mt-28" imageClassName="aspect-[4/5] lg:aspect-[3/5]" imageSizes="(min-width: 1024px) 32vw, 50vw" />
              <ProjectCard compact project={projects[2]} className="reveal col-span-1 lg:col-span-7 lg:col-start-6" imageClassName="aspect-[4/5] lg:aspect-[16/9]" imageSizes="(min-width: 1024px) 58vw, 50vw" />
            </div>
          </div>
        </section>

        <section id="sobre" aria-labelledby="titulo-sobre" className="relative isolate overflow-hidden bg-highlight">
          <p aria-hidden="true" className="absolute -left-8 bottom-0 hidden font-editorial text-[16rem] leading-none text-content/[0.06] lg:block">04</p>
          <div className="page-frame relative z-10 grid lg:grid-cols-12">
            <div className="reveal py-20 sm:py-24 lg:col-span-7 lg:py-32 lg:pr-16">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-content">{institutionalCopy.aboutEyebrow}</p>
              <h2 id="titulo-sobre" className="text-balance mt-5 font-editorial text-section-sm font-medium text-content sm:text-section">{institutionalCopy.aboutTitle}</h2>
              <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-content/80 sm:text-base sm:leading-8">
                {institutionalCopy.aboutParagraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <Link href="/sobre" className="mt-7 inline-flex min-h-11 items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-content underline decoration-accent/70 underline-offset-8">Conhecer a trajetória <ArrowUpRightIcon className="h-4 w-4" /></Link>

              <div className="mt-10 grid grid-cols-[auto_1fr] items-end gap-5 border-t border-stroke pt-8">
                <p className="font-editorial text-[5.5rem] font-medium leading-[0.7] tracking-[-0.06em] text-content sm:text-[7rem]">350<span className="text-4xl sm:text-5xl">+</span></p>
                <p className="max-w-[14rem] text-xs font-semibold uppercase leading-5 tracking-[0.15em] text-content">Projetos realizados desde o início da trajetória, em 1996</p>
              </div>
            </div>

            <div className="relative -mx-5 min-h-[34rem] sm:-mx-8 lg:col-span-5 lg:-mr-12 lg:ml-0 lg:min-h-full xl:-mr-16">
              <div className="absolute inset-0 overflow-hidden [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%,0_12%)]">
                <Image src="/images/projects/hotel-jardins/jardins-05.jpg" alt="Detalhe vertical do paisagismo desenvolvido para hotel nos Jardins" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute inset-x-5 bottom-5 bg-surface-contrast p-6 text-content-onContrast shadow-lift [clip-path:polygon(0_0,100%_0,100%_84%,92%_100%,0_100%)] sm:inset-x-8 sm:bottom-8 sm:p-8 lg:left-[-3rem] lg:right-8">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.19em] text-accent-soft">Referência no mercado</p>
                <p className="mt-3 font-editorial text-2xl font-medium leading-tight sm:text-3xl">Atuação com grandes bandeiras nacionais e internacionais de hotelaria.</p>
                <div className="mt-5 inline-flex rounded-full border border-stroke-onContrast/30 px-4 py-2 text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-content-onContrast">Compromisso com cada entrega</div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" aria-labelledby="titulo-servicos" className="section-space relative isolate overflow-hidden bg-surface-contrast text-content-onContrast">
          <p aria-hidden="true" className="absolute -right-8 top-8 hidden font-editorial text-[16rem] leading-none text-content-onContrast/[0.035] lg:block">05</p>
          <div className="page-frame relative z-10">
            <div className="reveal grid gap-8 border-b border-stroke-onContrast/15 pb-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sage">Como a Carla pode ajudar</p>
                <h2 id="titulo-servicos" className="text-balance mt-5 font-editorial text-section-sm font-medium text-content-onContrast sm:text-section">Uma condução técnica, sem perder a delicadeza do natural.</h2>
              </div>
              <ButtonLink href="/servicos" variant="outlineInverse" className="lg:col-span-4 lg:justify-self-end">Conhecer os serviços</ButtonLink>
            </div>

            <div className="divide-y divide-stroke-onContrast/15 border-b border-stroke-onContrast/15">
              {services.map((service) => (
                <article key={service.number} className="reveal group -mx-4 grid gap-5 px-4 py-9 transition-colors duration-500 ease-organic hover:bg-content-onContrast/[0.035] sm:py-11 lg:-mx-6 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-6">
                  <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-accent-soft lg:col-span-1">{service.number}</p>
                  <h3 className="font-editorial text-3xl font-medium leading-none text-content-onContrast sm:text-4xl lg:col-span-4 lg:text-5xl">{service.title}</h3>
                  <p className="max-w-2xl text-sm leading-7 text-content-onContrast/68 sm:text-base sm:leading-8 lg:col-span-5">{service.description}</p>
                  <ul className="space-y-2 lg:col-span-2">
                    {service.deliverables.slice(0, 2).map((deliverable) => (
                      <li key={deliverable} className="flex gap-2 text-[0.66rem] uppercase leading-5 tracking-[0.11em] text-sage-pale/75">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />{deliverable}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div id="processo" className="reveal pt-10 sm:pt-12">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-sage">Um processo claro</p>
              <ol className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {processSteps.map((step, index) => (
                  <li key={step.number} className="flex items-center gap-3 text-sm text-content-onContrast/78">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stroke-onContrast/25 text-[0.55rem] font-semibold text-accent-soft">{step.number}</span>
                    <span>{step.title}</span>
                    {index < processSteps.length - 1 && <span aria-hidden="true" className="ml-auto hidden text-content-onContrast/25 lg:inline">→</span>}
                  </li>
                ))}
              </ol>
              <Link href="/processo" className="mt-7 inline-flex min-h-11 items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-content-onContrast underline decoration-accent-soft/70 underline-offset-8">Ver o processo completo <ArrowUpRightIcon className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        <section id="contato" aria-labelledby="titulo-contato" className="section-space relative isolate overflow-hidden bg-surface-soft">
          <p aria-hidden="true" className="absolute -bottom-10 -right-6 hidden font-editorial text-[16rem] leading-none text-content/[0.035] lg:block">06</p>
          <div className="page-frame relative z-10 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="reveal lg:col-span-6">
              <p className="eyebrow">Antes da primeira conversa</p>
              <h2 className="mt-5 font-editorial text-4xl font-medium text-content sm:text-5xl">Dúvidas que ajudam a começar.</h2>
              <div className="mt-8 divide-y divide-stroke border-y border-stroke">
                <FaqAccordion items={faqs.slice(0, 3)} variant="compact" />
              </div>
            </div>

            <div className="reveal lg:col-span-6 lg:pt-20">
              <div className="relative bg-forest px-6 py-12 text-content-onContrast shadow-lift [clip-path:polygon(0_0,100%_0,100%_90%,90%_100%,0_100%)] sm:px-10 sm:py-14 lg:px-12 lg:py-16">
                <span aria-hidden="true" className="absolute right-0 top-0 h-4 w-20 bg-accent-soft" />
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-accent-soft">Seu projeto começa aqui</p>
                <h2 id="titulo-contato" className="text-balance mt-5 font-editorial text-4xl font-medium leading-[0.98] sm:text-6xl">Vamos transformar o seu espaço?</h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-content-onContrast/72 sm:text-base sm:leading-8">Conte para a Carla sobre o espaço e o que você deseja viver nele. O primeiro contato é direto, próximo e sem formulários.</p>
                <ButtonLink data-whatsapp-surface href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" variant="light" className="mt-8 w-full sm:w-auto">Conversar pelo WhatsApp</ButtonLink>

                <div className="mt-9 border-t border-stroke-onContrast/20 pt-7">
                  <Link href={contactLinks.telephone} className="flex min-h-12 items-center gap-3 text-sm text-content-onContrast/78 transition-colors hover:text-content-onContrast"><PhoneIcon className="h-5 w-5 text-accent-soft" />{business.phoneDisplay}</Link>
                  <Link href={contactLinks.email} className="flex min-h-12 items-center gap-3 break-all text-sm text-content-onContrast/78 transition-colors hover:text-content-onContrast"><MailIcon className="h-5 w-5 shrink-0 text-accent-soft" />{business.email}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFab />
      <JsonLd data={structuredData} />
    </>
  );
}
