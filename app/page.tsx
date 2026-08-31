import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
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
        itemOffered: { "@type": "Service", name: service.title },
      })),
    },
  };

  return (
    <>
      <a href="#conteudo" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-canvas px-5 py-3 text-sm font-semibold text-forest-deep transition-transform focus:translate-y-0">
        Ir para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <section className="relative isolate min-h-[780px] overflow-hidden bg-forest-deep text-canvas sm:min-h-[860px] lg:min-h-[760px]">
          <Image
            src="/images/projects/jardim-tropical/tropical-2.avif"
            alt="Jardim tropical com bromélias, pedras e espelho d’água"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[58%_center] lg:object-center"
          />
          {/* WHY: a camada preserva legibilidade sem pedir uma segunda imagem no mobile, mantendo o LCP concentrado no asset prioritário. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,28,19,0.72)_0%,rgba(16,28,19,0.28)_35%,rgba(16,28,19,0.76)_100%)] lg:bg-[linear-gradient(90deg,rgba(16,28,19,0.88)_0%,rgba(16,28,19,0.68)_43%,rgba(16,28,19,0.12)_78%)]" />
          <div className="page-frame relative flex min-h-[780px] flex-col justify-end pb-12 pt-32 sm:min-h-[860px] sm:pb-16 lg:min-h-[760px] lg:justify-center lg:pb-14 lg:pt-32">
            <div className="max-w-[58rem] lg:max-w-[54rem]">
              <p className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-sage-pale sm:mb-7 sm:text-xs">
                {institutionalCopy.heroEyebrow}
              </p>
              <h1 className="text-balance font-editorial text-display-sm font-medium text-canvas sm:max-w-[50rem] lg:text-display">
                Transformamos espaços em <em className="font-normal text-gold-soft">experiências naturais.</em>
              </h1>
              <p className="mt-6 max-w-xl text-[0.94rem] leading-7 text-canvas/78 sm:mt-8 sm:text-base sm:leading-8">
                {institutionalCopy.heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 min-[390px]:flex-row sm:mt-10 sm:gap-4">
                <ButtonLink href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" variant="light" className="w-full min-[390px]:w-auto">
                  Iniciar um projeto
                </ButtonLink>
                <ButtonLink href="/projetos" variant="outlineInverse" className="w-full min-[390px]:w-auto">
                  Conhecer projetos
                </ButtonLink>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 border-t border-canvas/25 pt-6 sm:mt-16 sm:max-w-2xl sm:pt-8 lg:absolute lg:bottom-12 lg:right-12 lg:mt-0 lg:w-[31rem] lg:max-w-none xl:right-16">
              {trustSignals.map((signal, index) => (
                <div key={signal.label} className={`min-w-0 ${index > 0 ? "border-l border-canvas/20 pl-4 sm:pl-6" : "pr-3"}`}>
                  <p className="font-editorial text-2xl font-medium text-canvas sm:text-3xl">{signal.value}</p>
                  <p className="mt-1 text-[0.52rem] font-semibold uppercase leading-4 tracking-[0.14em] text-canvas/65 sm:text-[0.6rem]">
                    {signal.label}
                  </p>
                </div>
              ))}
            </div>

            <Link href="#sobre" className="absolute bottom-4 right-5 hidden min-h-11 items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-canvas/65 sm:flex lg:bottom-12 lg:left-12 lg:right-auto xl:left-16">
              Descobrir o escritório
              <ArrowUpRightIcon className="h-4 w-4 rotate-[135deg]" />
            </Link>
          </div>
        </section>

        <section id="projetos-em-destaque" aria-labelledby="titulo-projetos" className="section-space bg-canvas">
          <div className="page-frame">
            <div className="reveal flex flex-col gap-7 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">Portfólio selecionado</p>
                <h2 id="titulo-projetos" className="mt-5 max-w-3xl font-editorial text-section-sm font-medium text-forest-deep sm:text-section">
                  {institutionalCopy.portfolioTitle}
                </h2>
              </div>
              <div className="max-w-md lg:pb-2">
                <p className="text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">{institutionalCopy.portfolioDescription}</p>
                <Link href="/projetos" className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-forest-deep underline decoration-gold decoration-1 underline-offset-8 transition-colors hover:text-moss">
                  Ver todos os projetos
                  <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-24">
              <ProjectCard project={projects[0]} className="reveal lg:col-span-7" imageClassName="aspect-[5/4]" imageSizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw" />
              <ProjectCard project={projects[1]} className="reveal lg:col-span-5 lg:mt-28" imageClassName="aspect-[4/5]" imageSizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" />
              <ProjectCard project={projects[2]} className="reveal lg:col-span-5" imageClassName="aspect-[4/5]" imageSizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" />
              <ProjectCard project={projects[3]} className="reveal lg:col-span-7 lg:mt-28" imageClassName="aspect-[5/4]" imageSizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw" />
            </div>
          </div>
        </section>

        <section id="sobre" aria-labelledby="titulo-sobre" className="section-space overflow-hidden bg-canvas-warm">
          <div className="page-frame grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="reveal relative lg:col-span-6 lg:pr-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-organic bg-sage-pale shadow-soft sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image src="/images/projects/jardim-frances/frances-3.avif" alt="Espelho d’água e jardim residencial projetado por Carla Moraes" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-8 right-0 hidden aspect-[3/4] w-[34%] overflow-hidden border-[0.45rem] border-canvas-warm bg-sage-pale shadow-lift sm:block lg:-right-2">
                <Image src="/images/projects/jardim-tropical/tropical-5.avif" alt="Detalhe de bromélias e orquídeas em jardim tropical" fill sizes="(min-width: 1024px) 15vw, 30vw" className="object-cover" />
              </div>
            </div>

            <div className="reveal lg:col-span-6 lg:pl-8 xl:pl-14">
              <p className="eyebrow">{institutionalCopy.aboutEyebrow}</p>
              <h2 id="titulo-sobre" className="mt-5 max-w-xl font-editorial text-section-sm font-medium text-forest-deep sm:text-section">
                {institutionalCopy.aboutTitle}
              </h2>
              <div className="mt-8 max-w-lg space-y-5 text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
                {institutionalCopy.aboutParagraphs.slice(0, 2).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-9 flex items-center gap-5 border-t border-line pt-7">
                <span className="font-editorial text-5xl font-medium leading-none text-gold sm:text-6xl">1996</span>
                <p className="max-w-[12rem] text-xs font-semibold uppercase leading-5 tracking-[0.15em] text-moss">
                  O início de uma trajetória dedicada ao paisagismo
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" aria-labelledby="titulo-servicos" className="section-space bg-forest-deep text-canvas">
          <div className="page-frame">
            <div className="reveal grid gap-8 border-b border-canvas/15 pb-12 lg:grid-cols-12">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sage lg:col-span-3">Serviços</p>
              <h2 id="titulo-servicos" className="max-w-4xl font-editorial text-section-sm font-medium text-canvas sm:text-section lg:col-span-9">
                Do primeiro olhar ao jardim construído com intenção.
              </h2>
            </div>

            <div className="divide-y divide-canvas/15">
              {services.map((service) => (
                <article key={service.number} className="reveal grid gap-6 py-10 sm:py-12 lg:grid-cols-12 lg:gap-10">
                  <p className="text-xs font-semibold tracking-[0.18em] text-gold-soft lg:col-span-1">{service.number}</p>
                  <h3 className="font-editorial text-3xl font-medium leading-none text-canvas sm:text-4xl lg:col-span-4">{service.title}</h3>
                  <p className="max-w-xl text-sm leading-7 text-canvas/68 sm:text-base sm:leading-8 lg:col-span-4">{service.description}</p>
                  <ul className="space-y-3 lg:col-span-3">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex gap-3 text-xs leading-5 text-canvas/72 sm:text-sm">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-soft" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="titulo-experiencia" className="relative isolate overflow-hidden bg-forest text-canvas">
          <Image src="/images/projects/hotel-jardins/jardins-03.jpg" alt="Paisagismo externo desenvolvido para hotel nos Jardins, em São Paulo" fill sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,35,25,0.94)_0%,rgba(18,35,25,0.80)_52%,rgba(18,35,25,0.28)_100%)]" />
          <div className="page-frame relative py-24 sm:py-32 lg:py-40">
            <div className="reveal max-w-3xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-soft">Experiência que inspira confiança</p>
              <h2 id="titulo-experiencia" className="text-balance mt-6 font-editorial text-section-sm font-medium text-canvas sm:text-section">
                Visão autoral com precisão para projetos de diferentes escalas.
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-canvas/78 sm:text-lg sm:leading-9">{institutionalCopy.marketStatement}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="rounded-full border border-canvas/30 px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-canvas">Residencial</span>
                <span className="rounded-full border border-canvas/30 px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-canvas">Corporativo</span>
                <span className="rounded-full border border-canvas/30 px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-canvas">Hotelaria</span>
              </div>
            </div>
          </div>
        </section>

        <section id="processo" aria-labelledby="titulo-processo" className="section-space bg-canvas">
          <div className="page-frame">
            <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Como trabalhamos</p>
                <h2 id="titulo-processo" className="mt-5 font-editorial text-section-sm font-medium text-forest-deep sm:text-section">Um processo claro, próximo e cuidadoso.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-ink-muted sm:text-base sm:leading-8 lg:col-span-4 lg:col-start-9">Cada etapa transforma intenção em decisão técnica, mantendo o cliente próximo das escolhas que dão identidade ao jardim.</p>
            </div>
            <ol className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <li key={step.number} className={`reveal relative border-b border-line py-8 sm:px-7 sm:py-10 lg:border-b-0 lg:px-8 ${index % 2 === 0 ? "sm:border-r" : ""} ${index > 0 ? "lg:border-l" : ""}`}>
                  <span className="text-xs font-semibold tracking-[0.18em] text-moss">{step.number}</span>
                  <h3 className="mt-8 font-editorial text-2xl font-medium leading-tight text-forest-deep sm:text-3xl">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="titulo-faq" className="section-space bg-canvas-soft">
          <div className="page-frame grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-4">
              <p className="eyebrow">Dúvidas frequentes</p>
              <h2 id="titulo-faq" className="mt-5 font-editorial text-section-sm font-medium text-forest-deep sm:text-section">Antes de começarmos.</h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">As respostas essenciais sobre projeto, prazos, implantação e escolhas do jardim.</p>
            </div>
            <div className="reveal divide-y divide-line border-y border-line lg:col-span-8">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-editorial text-xl font-medium leading-tight text-forest-deep marker:hidden sm:min-h-24 sm:text-2xl">
                    {faq.question}
                    <span aria-hidden="true" className="relative h-11 w-11 shrink-0 rounded-full border border-line-strong transition-colors group-open:bg-forest group-open:text-canvas">
                      <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform group-open:rotate-90" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 pr-14 text-sm leading-7 text-ink-muted sm:pb-9 sm:text-base sm:leading-8">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" aria-labelledby="titulo-contato" className="section-space bg-gold-soft">
          <div className="page-frame">
            <div className="reveal rounded-organic bg-canvas px-6 py-14 shadow-soft sm:px-10 sm:py-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-20">
              <div className="lg:col-span-8">
                <p className="eyebrow">Seu espaço pode começar aqui</p>
                <h2 id="titulo-contato" className="text-balance mt-5 max-w-4xl font-editorial text-section-sm font-medium text-forest-deep sm:text-section">Vamos criar um jardim que faça sentido para a sua vida?</h2>
                <p className="mt-6 max-w-xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">Conte para a Carla sobre o espaço, o momento e o que você deseja transformar. A primeira conversa acontece diretamente pelo WhatsApp.</p>
                <ButtonLink href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-9 w-full min-[390px]:w-auto">Conversar sobre um projeto</ButtonLink>
              </div>
              <div className="mt-12 border-t border-line pt-8 lg:col-span-4 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <p className="text-[0.61rem] font-semibold uppercase tracking-[0.19em] text-moss">Contato</p>
                <div className="mt-5 space-y-2">
                  <Link href={contactLinks.telephone} className="flex min-h-12 items-center gap-3 text-sm text-forest-deep transition-colors hover:text-moss"><PhoneIcon className="h-5 w-5 text-gold" />{business.phoneDisplay}</Link>
                  <Link href={contactLinks.email} className="flex min-h-12 items-center gap-3 break-all text-sm text-forest-deep transition-colors hover:text-moss"><MailIcon className="h-5 w-5 shrink-0 text-gold" />{business.email}</Link>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.15em] text-ink-muted">Atendimento em {business.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
