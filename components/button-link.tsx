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
    primary: "bg-forest text-canvas hover:bg-forest-deep",
    light: "bg-canvas text-forest-deep hover:bg-white",
    outline: "border border-line-strong text-forest-deep hover:border-forest hover:bg-forest hover:text-canvas",
    outlineInverse: "border border-canvas/45 text-canvas hover:border-canvas hover:bg-canvas hover:text-forest-deep",
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
