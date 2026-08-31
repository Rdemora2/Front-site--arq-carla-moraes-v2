import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { contactLinks } from "@/lib/data/business";

export function WhatsAppFab() {
  return (
    <Link
      href={contactLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com Carla Moraes pelo WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 inline-flex min-h-14 items-center gap-3 rounded-full bg-whatsapp px-4 text-white shadow-lift transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-whatsapp-hover sm:px-5"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.14em] min-[380px]:inline">
        Fale com a Carla
      </span>
    </Link>
  );
}
