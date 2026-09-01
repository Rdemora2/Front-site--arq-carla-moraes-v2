"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { contactLinks } from "@/lib/data/business";

export function WhatsAppFab() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-site-hero]");

    if (!hero) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
    // WHY: o fim geométrico do hero é estável em qualquer viewport; a altura total
    // da página e os CTAs intermediários não devem atrasar o contato flutuante.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <Link
      data-floating-contact
      href={contactLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com Carla Moraes pelo WhatsApp"
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 inline-flex min-h-14 items-center gap-3 rounded-full bg-whatsapp px-4 text-white shadow-lift transition-[background-color,opacity,transform] duration-300 hover:-translate-y-1 hover:bg-whatsapp-hover sm:px-5 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.14em] min-[380px]:inline">
        Fale com a Carla
      </span>
    </Link>
  );
}
