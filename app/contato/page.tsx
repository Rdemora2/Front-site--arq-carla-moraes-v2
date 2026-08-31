import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { InteriorHero } from "@/components/interior-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { business, contactIntents, contactLinks, faqs, projects } from "@/lib/data/business";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com Carla Moraes sobre projetos paisagísticos, consultoria ou paisagismo corporativo em São Paulo. WhatsApp, telefone, e-mail e redes sociais.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: `Contato | ${business.name}`,
    description: "Converse diretamente com Carla Moraes sobre o espaço que você deseja transformar.",
    url: "/contato",
    images: [{ url: projects[1].images[5]!.src, width: projects[1].images[5]!.width, height: projects[1].images[5]!.height, alt: projects[1].images[5]!.alt }],
  },
};

export default function ContactPage() {
  const heroImage = projects[1].images[5]!;
  const contactFaqs = [faqs[0]!, faqs[2]!, faqs[4]!];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${business.website}/contato/#pagina`,
        url: `${business.website}/contato`,
        name: "Contato",
        description: metadata.description,
        inLanguage: "pt-BR",
        mainEntity: { "@id": `${business.website}/#empresa` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: business.website },
          { "@type": "ListItem", position: 2, name: "Contato", item: `${business.website}/contato` },
        ],
      },
    ],
  };

  return (
    <>
      <SiteHeader tone="dark" />
      <main>
        <InteriorHero
          index="06"
          eyebrow="Contato"
          title={<>Vamos conversar sobre o seu <em className="font-normal text-accent">espaço?</em></>}
          description="O primeiro contato é direto com a Carla. Conte o que você deseja transformar para entender o melhor ponto de partida."
          image={heroImage}
        >
          <Link data-whatsapp-surface href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-forest px-7 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-content-onContrast transition-colors hover:bg-surface-contrast"><WhatsAppIcon className="h-5 w-5" />Abrir WhatsApp <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
        </InteriorHero>

        <section aria-labelledby="ponto-partida" className="section-space bg-surface-warm">
          <div className="page-frame">
            <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow">Escolha um ponto de partida</p>
                <h2 id="ponto-partida" className="mt-5 font-editorial text-section-sm font-medium text-content sm:text-section">Uma conversa mais objetiva desde o início.</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-content-muted lg:col-span-4">Cada opção abre o WhatsApp com uma mensagem inicial adequada à necessidade escolhida.</p>
            </div>

            <div data-whatsapp-surface className="mt-12 divide-y divide-stroke border-y border-stroke lg:mt-16">
              {contactIntents.map((intent, index) => (
                <Link key={intent.number} href={intent.href} target="_blank" rel="noopener noreferrer" className={`group grid min-h-32 gap-4 py-7 transition-[background-color,padding] duration-500 hover:bg-surface sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-6 ${index === 1 ? "lg:ml-[6vw]" : index === 2 ? "lg:ml-[12vw]" : ""}`}>
                  <span className="text-[0.6rem] font-semibold tracking-[0.18em] text-accent">{intent.number}</span>
                  <span><span className="block font-editorial text-3xl font-medium text-content sm:text-4xl">{intent.title}</span><span className="mt-2 block text-xs uppercase tracking-[0.14em] text-content-muted">{intent.context}</span></span>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stroke-strong text-content transition-[transform,background-color,color] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-forest group-hover:text-content-onContrast"><ArrowUpRightIcon className="h-5 w-5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="canais-titulo" className="section-space bg-surface-contrast text-content-onContrast">
          <div className="page-frame grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-7">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-accent-soft">Canais diretos</p>
              <h2 id="canais-titulo" className="mt-5 font-editorial text-section-sm font-medium sm:text-section">Sem formulários, sem intermediários.</h2>
              <p className="mt-7 max-w-xl text-sm leading-7 text-content-onContrast/68 sm:text-base sm:leading-8">Escolha o canal mais confortável. O atendimento é realizado em São Paulo para projetos residenciais e corporativos.</p>
            </div>
            <div className="reveal divide-y divide-stroke-onContrast/15 border-y border-stroke-onContrast/15 lg:col-span-5">
              <Link href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex min-h-20 items-center gap-4 text-content-onContrast/80 transition-colors hover:text-content-onContrast"><WhatsAppIcon className="h-6 w-6 text-accent-soft" /><span><span className="block text-[0.55rem] uppercase tracking-[0.16em] text-sage">WhatsApp</span><span className="mt-1 block text-sm">{business.phoneDisplay}</span></span><ArrowUpRightIcon className="ml-auto h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
              <Link href={contactLinks.telephone} className="group flex min-h-20 items-center gap-4 text-content-onContrast/80 transition-colors hover:text-content-onContrast"><PhoneIcon className="h-6 w-6 text-accent-soft" /><span><span className="block text-[0.55rem] uppercase tracking-[0.16em] text-sage">Telefone</span><span className="mt-1 block text-sm">{business.phoneDisplay}</span></span><ArrowUpRightIcon className="ml-auto h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
              <Link href={contactLinks.email} className="group flex min-h-20 items-center gap-4 text-content-onContrast/80 transition-colors hover:text-content-onContrast"><MailIcon className="h-6 w-6 shrink-0 text-accent-soft" /><span className="min-w-0"><span className="block text-[0.55rem] uppercase tracking-[0.16em] text-sage">E-mail</span><span className="mt-1 block break-all text-sm">{business.email}</span></span><ArrowUpRightIcon className="ml-auto h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
              <div className="flex min-h-20 items-center gap-3">
                <Link href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Carla Moraes" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stroke-onContrast/25 hover:border-stroke-onContrast"><InstagramIcon className="h-5 w-5" /></Link>
                <Link href={business.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Carla Moraes" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stroke-onContrast/25 hover:border-stroke-onContrast"><LinkedInIcon className="h-5 w-5" /></Link>
                <span className="ml-2 text-xs uppercase tracking-[0.14em] text-content-onContrast/60">{business.location}</span>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="contato-faq" className="section-space bg-surface-soft">
          <div className="page-frame grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-4"><p className="eyebrow">Antes de escrever</p><h2 id="contato-faq" className="mt-5 font-editorial text-section-sm font-medium text-content sm:text-section">Três respostas úteis.</h2></div>
            <div className="reveal divide-y divide-stroke border-y border-stroke lg:col-span-8">
              {contactFaqs.map((faq) => (
                <details key={faq.question} className="group"><summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 font-editorial text-xl font-medium text-content marker:hidden sm:min-h-24 sm:text-2xl">{faq.question}<span aria-hidden="true" className="relative h-10 w-10 shrink-0 rounded-full border border-stroke-strong group-open:bg-forest group-open:text-content-onContrast"><span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" /><span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform group-open:rotate-90" /></span></summary><p className="max-w-2xl pb-8 pr-12 text-sm leading-7 text-content-muted">{faq.answer}</p></details>
              ))}
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
