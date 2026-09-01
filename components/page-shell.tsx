import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { WhatsAppFab } from "@/components/whatsapp-fab";

interface PageShellProps {
  readonly children: ReactNode;
  readonly headerTone?: "light" | "dark";
  readonly structuredData: unknown;
}

export function PageShell({ children, headerTone = "light", structuredData }: PageShellProps) {
  return (
    <>
      <SkipLink />
      {headerTone === "dark" ? <SiteHeader tone="dark" /> : <SiteHeader />}
      <main id="conteudo">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
      <JsonLd data={structuredData} />
    </>
  );
}
