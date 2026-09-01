interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

type FaqAccordionVariant = "default" | "compact" | "contact";

interface FaqAccordionProps {
  readonly items: readonly FaqItem[];
  readonly variant?: FaqAccordionVariant;
}

const styles: Record<FaqAccordionVariant, { summary: string; icon: string; answer: string }> = {
  default: {
    summary: "flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 font-editorial text-xl font-medium leading-tight text-content marker:hidden sm:min-h-24 sm:text-2xl",
    icon: "relative h-10 w-10 shrink-0 rounded-full border border-stroke-strong group-open:bg-forest group-open:text-content-onContrast",
    answer: "max-w-2xl pb-8 pr-12 text-sm leading-7 text-content-muted sm:text-base sm:leading-8",
  },
  compact: {
    summary: "flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 font-editorial text-xl font-medium leading-tight text-content marker:hidden sm:text-2xl",
    icon: "relative h-10 w-10 shrink-0 rounded-full border border-stroke-strong transition-colors group-open:bg-forest group-open:text-content-onContrast",
    answer: "max-w-xl pb-7 pr-10 text-sm leading-7 text-content-muted",
  },
  contact: {
    summary: "flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 font-editorial text-xl font-medium text-content marker:hidden sm:min-h-24 sm:text-2xl",
    icon: "relative h-10 w-10 shrink-0 rounded-full border border-stroke-strong group-open:bg-forest group-open:text-content-onContrast",
    answer: "max-w-2xl pb-8 pr-12 text-sm leading-7 text-content-muted",
  },
};

export function FaqAccordion({ items, variant = "default" }: FaqAccordionProps) {
  const variantStyles = styles[variant];

  return items.map((faq) => (
    <details key={faq.question} className="group">
      <summary className={variantStyles.summary}>
        {faq.question}
        <span aria-hidden="true" className={variantStyles.icon}>
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform group-open:rotate-90" />
        </span>
      </summary>
      <p className={variantStyles.answer}>{faq.answer}</p>
    </details>
  ));
}
