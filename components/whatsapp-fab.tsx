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
    const contactSurfaces = document.querySelectorAll<HTMLElement>(
      "[data-whatsapp-surface]",
    );
    if (!contactSurfaces.length) {
      setIsVisible(true);
      return;
    }

    const visibleSurfaces = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSurfaces.add(entry.target);
          else visibleSurfaces.delete(entry.target);
        }
        setIsVisible(visibleSurfaces.size === 0);
      },
      { threshold: 0.2 },
    );
    contactSurfaces.forEach((surface) => observer.observe(surface));
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
