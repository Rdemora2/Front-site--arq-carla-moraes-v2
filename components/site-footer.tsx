import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";
import { business, contactLinks, navigation } from "@/lib/data/business";

export function SiteFooter() {
  return (
    <footer className="safe-bottom bg-forest-deep text-canvas">
      <div className="page-frame grid gap-14 border-b border-canvas/15 py-16 sm:py-20 lg:grid-cols-[1.25fr_0.7fr_0.9fr] lg:gap-20">
        <div>
          <Brand inverse />
          <p className="mt-7 max-w-sm text-sm leading-7 text-canvas/65">
            Projetos paisagísticos que unem arquitetura, natureza e a forma particular de viver cada espaço.
          </p>
          <div className="mt-7 flex gap-3">
            <Link href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Carla Moraes" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-canvas/25 text-canvas/80 transition-colors hover:border-canvas hover:text-canvas">
              <InstagramIcon className="h-5 w-5" />
            </Link>
            <Link href={business.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Carla Moraes" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-canvas/25 text-canvas/80 transition-colors hover:border-canvas hover:text-canvas">
              <LinkedInIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[0.61rem] font-semibold uppercase tracking-[0.2em] text-sage">Navegação</p>
          <nav aria-label="Navegação do rodapé" className="mt-5 flex flex-col">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} className="flex min-h-11 items-center border-b border-canvas/10 text-sm text-canvas/72 transition-colors hover:text-canvas">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[0.61rem] font-semibold uppercase tracking-[0.2em] text-sage">Contato direto</p>
          <div className="mt-5 flex flex-col">
            <Link href={contactLinks.telephone} className="flex min-h-11 items-center border-b border-canvas/10 text-sm text-canvas/72 transition-colors hover:text-canvas">
              {business.phoneDisplay}
            </Link>
            <Link href={contactLinks.email} className="flex min-h-11 items-center break-all border-b border-canvas/10 text-sm text-canvas/72 transition-colors hover:text-canvas">
              {business.email}
            </Link>
            <p className="flex min-h-11 items-center text-sm text-canvas/72">{business.location}</p>
          </div>
          <Image
            src="/brand/safe-browsing.webp"
            alt="Google Safe Browsing"
            width={640}
            height={273}
            sizes="144px"
            className="mt-7 h-auto w-36 rounded-md"
          />
        </div>
      </div>

      <div className="page-frame flex flex-col gap-2 py-7 text-[0.62rem] uppercase tracking-[0.14em] text-canvas/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {business.name}</p>
        <p>Paisagismo · Jardins · São Paulo</p>
      </div>
    </footer>
  );
}
