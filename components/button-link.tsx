import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowUpRightIcon } from "@/components/icons";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  readonly variant?: "primary" | "light" | "outline" | "outlineInverse";
  readonly showArrow?: boolean;
}

export function ButtonLink({
  className = "",
  children,
  variant = "primary",
  showArrow = true,
  ...props
}: ButtonLinkProps) {
  const variants = {
    primary: "bg-forest text-content-onContrast hover:bg-surface-contrast",
    light: "bg-petal text-content-onLight hover:bg-white",
    outline: "border border-stroke-strong text-content hover:border-forest hover:bg-forest hover:text-content-onContrast",
    outlineInverse: "border border-stroke-onContrast/45 text-content-onContrast hover:border-stroke-onContrast hover:bg-petal hover:text-content-onLight",
  } as const;

  return (
    <Link
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 sm:min-h-14 sm:px-7 ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 ease-organic group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
