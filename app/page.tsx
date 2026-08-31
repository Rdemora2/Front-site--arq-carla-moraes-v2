import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ArrowUpRightIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { contactLinks, institutionalCopy, trustSignals } from "@/lib/data/business";

export default function HomePage() {
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
                <ButtonLink href={contactLinks.whatsapp} target="_blank" rel="noreferrer" variant="light" className="w-full min-[390px]:w-auto">
                  Iniciar um projeto
                </ButtonLink>
                <ButtonLink href="/projetos" variant="outline" className="w-full border-canvas/45 text-canvas hover:border-canvas hover:bg-canvas hover:text-forest-deep min-[390px]:w-auto">
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

        <section id="sobre" className="section-space page-frame">
          <p className="eyebrow">Em construção</p>
          <h2 className="mt-5 max-w-3xl font-editorial text-section-sm font-medium text-forest-deep sm:text-section">
            Paisagismo que une técnica, natureza e permanência.
          </h2>
        </section>
      </main>
    </>
  );
}
