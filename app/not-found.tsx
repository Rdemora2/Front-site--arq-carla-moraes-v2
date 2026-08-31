import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader tone="dark" />
      <main className="page-frame flex min-h-screen items-center bg-canvas pb-16 pt-36">
        <div className="max-w-3xl">
          <p className="eyebrow">Erro 404</p>
          <h1 className="mt-5 font-editorial text-display-sm font-medium text-forest-deep lg:text-display">Este caminho ainda não floresceu.</h1>
          <p className="mt-7 max-w-lg text-base leading-8 text-ink-muted">A página que você procurou não existe ou mudou de endereço.</p>
          <Link href="/" className="group mt-9 inline-flex min-h-14 items-center gap-3 rounded-full bg-forest px-7 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-canvas">
            Voltar para a página inicial
            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
    </>
  );
}
