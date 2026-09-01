"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/brand";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { contactLinks, navigation } from "@/lib/data/business";

interface SiteHeaderProps {
  readonly tone?: "light" | "dark";
}

export function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const useDarkInk = tone === "dark" && !isOpen;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const backgroundElements = document.querySelectorAll<HTMLElement>(
      "main, footer, [data-floating-contact], [data-cookie-consent]",
    );
    backgroundElements.forEach((element) => {
      element.inert = isOpen;
      if (isOpen) element.setAttribute("aria-hidden", "true");
      else element.removeAttribute("aria-hidden");
    });

    if (!isOpen) return;

    const focusable = Array.from(
      headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
    ).filter((element) => element.getClientRects().length > 0);
    toggleRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable.length) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      backgroundElements.forEach((element) => {
        element.inert = false;
        element.removeAttribute("aria-hidden");
      });
    };
  }, [isOpen]);

  return (
    <header ref={headerRef} className={`absolute inset-x-0 top-0 z-[80] pt-[env(safe-area-inset-top)] ${useDarkInk ? "text-content" : "text-content-onContrast"}`}>
      <div className="page-frame flex h-24 items-center justify-between sm:h-28">
        <div className="relative z-[80]">
          <Brand inverse={!useDarkInk} />
        </div>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
              className={`relative flex min-h-11 items-center text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition-colors after:absolute after:bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full aria-[current=page]:after:w-full ${useDarkInk ? "text-content/75 hover:text-content" : "text-content-onContrast/80 hover:text-content-onContrast"}`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle inverse={!useDarkInk} />
          <Link
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-12 items-center rounded-full border px-6 text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition-colors ${useDarkInk ? "border-stroke-strong hover:border-forest hover:bg-forest hover:text-content-onContrast" : "border-stroke-onContrast/45 hover:border-stroke-onContrast hover:bg-petal hover:text-content-onLight"}`}
          >
            Iniciar um projeto
          </Link>
        </nav>

        <div className="relative z-[80] flex items-center gap-2 lg:hidden">
          <ThemeToggle inverse={!useDarkInk} />
          <button
            ref={toggleRef}
            type="button"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsOpen((current) => !current)}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border ${useDarkInk ? "border-stroke-strong text-content" : "border-stroke-onContrast/35 text-content-onContrast"}`}
          >
            {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[70] flex bg-surface-contrast px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(8rem+env(safe-area-inset-top))] transition-[opacity,visibility] duration-500 ease-organic lg:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav aria-label="Navegação mobile" className="flex w-full flex-col justify-between">
          <div className="divide-y divide-stroke-onContrast/15 border-y border-stroke-onContrast/15">
            {navigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className="flex min-h-16 items-center justify-between py-3 font-editorial text-3xl text-content-onContrast aria-[current=page]:text-accent-soft"
              >
                {item.label}
                <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">0{index + 1}</span>
              </Link>
            ))}
          </div>
          <Link
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-petal px-6 text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-content-onLight"
          >
            Conversar pelo WhatsApp
          </Link>
        </nav>
      </div>
    </header>
  );
}
