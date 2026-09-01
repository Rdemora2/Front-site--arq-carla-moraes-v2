import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { ArrowUpRightIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { CookieSettingsButton } from "@/components/privacy/cookie-settings-button";
import { business, contactLinks, navigation } from "@/lib/data/business";

export function SiteFooter() {
  return (
    <footer className="safe-bottom bg-surface-contrast text-content-onContrast">
      <div className="page-frame grid gap-14 border-b border-stroke-onContrast/15 py-16 sm:py-20 lg:grid-cols-[1.25fr_0.7fr_0.9fr] lg:gap-20">
        <div>
          <Brand inverse />
          <p className="mt-7 max-w-sm text-sm leading-7 text-content-onContrast/65">
            Projetos paisagísticos que unem arquitetura, natureza e a forma particular de viver cada espaço.
          </p>
          <div className="mt-7 flex gap-3">
            <Link href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Carla Moraes" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stroke-onContrast/25 text-content-onContrast/80 transition-colors hover:border-stroke-onContrast hover:text-content-onContrast">
              <InstagramIcon className="h-5 w-5" />
            </Link>
            <Link href={business.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Carla Moraes" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stroke-onContrast/25 text-content-onContrast/80 transition-colors hover:border-stroke-onContrast hover:text-content-onContrast">
              <LinkedInIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[0.61rem] font-semibold uppercase tracking-[0.2em] text-sage">Navegação</p>
          <nav aria-label="Navegação do rodapé" className="mt-5 flex flex-col">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} className="flex min-h-11 items-center border-b border-stroke-onContrast/10 text-sm text-content-onContrast/72 transition-colors hover:text-content-onContrast">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[0.61rem] font-semibold uppercase tracking-[0.2em] text-sage">Contato direto</p>
          <div className="mt-5 flex flex-col">
            <Link href={contactLinks.telephone} className="flex min-h-11 items-center border-b border-stroke-onContrast/10 text-sm text-content-onContrast/72 transition-colors hover:text-content-onContrast">
              {business.phoneDisplay}
            </Link>
            <Link href={contactLinks.email} className="flex min-h-11 items-center break-all border-b border-stroke-onContrast/10 text-sm text-content-onContrast/72 transition-colors hover:text-content-onContrast">
              {business.email}
            </Link>
            <p className="flex min-h-11 items-center text-sm text-content-onContrast/72">{business.location}</p>
          </div>
          <Link href="https://transparencyreport.google.com/safe-browsing/search?hl=pt_BR&url=arqcarlamoraes.com.br" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 flex-col items-start justify-center" aria-label="Consultar o domínio no Google Safe Browsing">
            <Image
              src="/brand/safe-browsing.webp"
              alt="Google Safe Browsing"
              width={640}
              height={273}
              sizes="144px"
              className="h-auto w-36 rounded-md"
            />
            <span className="mt-2 text-[0.52rem] uppercase tracking-[0.14em] text-content-onContrast/55">Consultar status no Google</span>
          </Link>
        </div>
      </div>

      <div className="page-frame grid gap-5 py-7 text-[0.6rem] uppercase tracking-[0.13em] text-content-onContrast/60 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <p>© {new Date().getFullYear()} {business.name}</p>
        <nav aria-label="Privacidade" className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-center">
          <Link href="/privacidade" className="inline-flex min-h-11 items-center transition-colors hover:text-content-onContrast">Privacidade</Link>
          <Link href="/cookies" className="inline-flex min-h-11 items-center transition-colors hover:text-content-onContrast">Cookies</Link>
          <CookieSettingsButton className="inline-flex min-h-11 items-center text-left uppercase tracking-[0.13em] transition-colors hover:text-content-onContrast" />
        </nav>
        <p className="flex flex-wrap items-center gap-x-2 sm:col-span-2 lg:col-span-1 lg:justify-end">
          <span>Desenvolvido por</span>
          <Link href="https://portifolio-roberto-moraes-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="group/developer relative inline-flex min-h-11 items-center gap-1.5 font-editorial text-base normal-case tracking-normal text-content-onContrast/88 transition-colors hover:text-content-onContrast focus-visible:ring-offset-surface-contrast">
            Roberto Moraes
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-500 ease-organic group-hover/developer:-translate-y-0.5 group-hover/developer:translate-x-0.5 group-focus-visible/developer:-translate-y-0.5 group-focus-visible/developer:translate-x-0.5" />
            <span aria-hidden="true" className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent-soft transition-transform duration-500 ease-organic group-hover/developer:scale-x-100 group-focus-visible/developer:scale-x-100" />
          </Link>
        </p>
      </div>
    </footer>
  );
}
