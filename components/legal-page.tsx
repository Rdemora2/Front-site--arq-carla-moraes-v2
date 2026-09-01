import type { ReactNode } from "react";
import { SkipLink } from "@/components/skip-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";

interface LegalPageProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly updatedAt: string;
  readonly children: ReactNode;
}

export function LegalPage({ eyebrow, title, description, updatedAt, children }: LegalPageProps) {
  return (
    <>
      <SkipLink />
      <SiteHeader tone="dark" />
      <main id="conteudo">
        <header data-site-hero className="relative overflow-hidden border-b border-stroke bg-surface pb-16 pt-[calc(9rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-[calc(11rem+env(safe-area-inset-top))] lg:pb-24">
          <p aria-hidden="true" className="absolute -bottom-10 right-0 hidden font-editorial text-[15rem] leading-none text-content/[0.035] lg:block">LGPD</p>
          <div className="page-frame relative z-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-accent-text">{eyebrow}</p>
              <h1 className="text-balance mt-5 font-editorial text-display-sm font-medium text-content lg:text-display">{title}</h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-sm leading-7 text-content-muted sm:text-base sm:leading-8">{description}</p>
              <p className="mt-5 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-content-subtle">Atualizada em {updatedAt}</p>
            </div>
          </div>
        </header>

        <section className="section-space bg-surface-warm">
          <article className="page-frame legal-copy max-w-4xl">
            {children}
          </article>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
