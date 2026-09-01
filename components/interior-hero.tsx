import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ProjectImage } from "@/lib/data/business";

interface InteriorHeroProps {
  readonly index: string;
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly description: string;
  readonly image: ProjectImage;
  readonly children?: ReactNode;
}

export function InteriorHero({
  index,
  eyebrow,
  title,
  description,
  image,
  children,
}: InteriorHeroProps) {
  return (
    <section data-site-hero className="relative isolate overflow-hidden bg-surface">
      <div aria-hidden="true" className="absolute inset-x-0 top-[7rem] h-px bg-stroke/70" />
      <p aria-hidden="true" className="absolute -bottom-8 -left-5 hidden font-editorial text-[17rem] leading-none text-content/[0.035] lg:block">{index}</p>
      <div className="page-frame relative grid gap-12 pb-16 pt-[calc(9rem+env(safe-area-inset-top))] sm:gap-14 sm:pb-20 sm:pt-[calc(10rem+env(safe-area-inset-top))] lg:min-h-[48rem] lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-24 lg:pt-40">
        <div className="relative z-10 lg:col-span-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-accent-text">
              <li><Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-content">Início</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{eyebrow}</li>
            </ol>
          </nav>
          <p className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
          <h1 className="text-balance mt-5 max-w-5xl font-editorial text-display-sm font-medium text-content lg:text-display">{title}</h1>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-content-muted sm:text-base sm:leading-8">{description}</p>
          {children && <div className="mt-9">{children}</div>}
        </div>

        <div className="relative aspect-[5/4] lg:col-span-4 lg:aspect-auto lg:h-[34rem]">
          <div aria-hidden="true" className="absolute -inset-2 bg-accent/60 [clip-path:polygon(14%_0,100%_0,100%_86%,86%_100%,0_100%,0_14%)]" />
          <div className="relative h-full overflow-hidden bg-sage-pale [clip-path:polygon(14%_0,100%_0,100%_86%,86%_100%,0_100%,0_14%)]">
            {/* WHY: cada página interna prioriza apenas sua capa; todo o restante do acervo continua lazy. */}
            <Image src={image.src} alt={image.alt} fill priority fetchPriority="high" sizes="(min-width: 1024px) 32vw, 100vw" style={{ objectPosition: image.position }} className="object-cover" />
          </div>
          <span className="absolute -bottom-7 right-0 text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-content-muted">Carla Moraes · Paisagismo</span>
        </div>
      </div>
    </section>
  );
}
