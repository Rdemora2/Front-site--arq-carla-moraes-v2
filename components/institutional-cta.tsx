import { ButtonLink } from "@/components/button-link";
import { contactLinks } from "@/lib/data/business";

interface InstitutionalCtaProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description: string;
}

export function InstitutionalCta({
  eyebrow = "Comece uma conversa",
  title,
  description,
}: InstitutionalCtaProps) {
  return (
    <section className="bg-gold-soft py-16 sm:py-20 lg:py-24">
      <div className="page-frame">
        <div className="reveal relative overflow-hidden bg-forest px-6 py-14 text-canvas shadow-lift [clip-path:polygon(0_0,100%_0,100%_88%,92%_100%,0_100%)] sm:px-10 sm:py-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-12 lg:px-16 lg:py-20">
          <span aria-hidden="true" className="absolute right-0 top-0 h-4 w-24 bg-gold-soft" />
          <div className="lg:col-span-8">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">{eyebrow}</p>
            <h2 className="text-balance mt-5 max-w-4xl font-editorial text-section-sm font-medium text-canvas sm:text-section">{title}</h2>
          </div>
          <div className="mt-7 lg:col-span-4 lg:mt-0">
            <p className="max-w-md text-sm leading-7 text-canvas/72 sm:text-base sm:leading-8">{description}</p>
            <ButtonLink data-whatsapp-surface href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" variant="light" className="mt-7 w-full sm:w-auto">Conversar com a Carla</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
