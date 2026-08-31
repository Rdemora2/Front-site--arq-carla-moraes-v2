import Image from "next/image";
import Link from "next/link";

interface BrandProps {
  readonly inverse?: boolean;
  readonly compact?: boolean;
}

export function Brand({ inverse = false, compact = false }: BrandProps) {
  return (
    <Link
      href="/"
      aria-label="Carla Moraes Arquitetura Floral — página inicial"
      className={`group inline-flex min-h-11 items-center gap-3 rounded-sm ${inverse ? "text-content-onContrast" : "text-content"}`}
    >
      <Image
        src="/brand/mark.webp"
        alt=""
        width={294}
        height={668}
        sizes="26px"
        className={`brand-mark h-11 w-auto object-contain transition-transform duration-500 ease-organic group-hover:-rotate-3 sm:h-12 ${inverse ? "brand-mark-inverse brightness-0 invert" : ""}`}
      />
      <span className="flex flex-col leading-none">
        <span className="font-editorial text-[1.35rem] font-medium tracking-[-0.025em] sm:text-[1.5rem]">
          Carla Moraes
        </span>
        {!compact && (
          <span className="mt-1 text-[0.53rem] font-semibold uppercase tracking-[0.22em] opacity-75 sm:text-[0.58rem]">
            Arquitetura Floral
          </span>
        )}
      </span>
    </Link>
  );
}
