"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { AnalyticsScripts } from "@/components/privacy/analytics-scripts";
import {
  acceptedConsent,
  ANALYTICS_COOKIE_ROOT_DOMAIN,
  CONSENT_STORAGE_KEY,
  deniedConsent,
  OPEN_CONSENT_EVENT,
  readStoredConsent,
  storeConsent,
  type ConsentChoices,
  type StoredConsent,
} from "@/lib/privacy/consent";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function eraseAnalyticsCookies() {
  const removablePrefixes = ["_ga", "_gid", "_gat", "_clck", "_clsk", "CLID"];
  // WHY: domínios brasileiros usam sufixos compostos (.com.br); explicitar o
  // domínio canônico evita tentar apagar cookies em um domínio público inválido.
  const domains = new Set([
    window.location.hostname,
    `.${window.location.hostname}`,
    ANALYTICS_COOKIE_ROOT_DOMAIN,
  ]);

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !removablePrefixes.some((prefix) => name.startsWith(prefix))) return;

    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    });
  });
}

function disableLoadedAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  if (measurementId) {
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
  }
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "denied",
  });
  window.clarity?.("consent", false);
  eraseAnalyticsCookies();
}

export function ConsentManager() {
  const [storedConsent, setStoredConsent] = useState<StoredConsent | null | undefined>(undefined);
  const [draft, setDraft] = useState<ConsentChoices>(deniedConsent);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const storedConsentRef = useRef<StoredConsent | null>(null);

  useEffect(() => {
    const stored = readStoredConsent();
    storedConsentRef.current = stored;
    setStoredConsent(stored);
    if (stored) setDraft(stored.choices);

    const openSettings = () => {
      const current = readStoredConsent();
      setDraft(current?.choices ?? deniedConsent);
      setIsPreferencesOpen(true);
    };
    const synchronizeTabs = (event: StorageEvent) => {
      if (event.key !== CONSENT_STORAGE_KEY) return;

      const previous = storedConsentRef.current;
      const next = readStoredConsent();
      const revokedLoadedScript = Boolean(
        previous &&
          ((!next?.choices.googleAnalytics && previous.choices.googleAnalytics) ||
            (!next?.choices.microsoftClarity && previous.choices.microsoftClarity)),
      );

      storedConsentRef.current = next;
      setStoredConsent(next);
      setDraft(next?.choices ?? deniedConsent);

      if (revokedLoadedScript) {
        disableLoadedAnalytics();
        // WHY: uma revogação feita em outra aba precisa interromper também os
        // scripts que já executaram neste documento.
        window.location.reload();
      }
    };
    window.addEventListener(OPEN_CONSENT_EVENT, openSettings);
    window.addEventListener("storage", synchronizeTabs);
    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, openSettings);
      window.removeEventListener("storage", synchronizeTabs);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isPreferencesOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPreferencesOpen]);

  const save = (choices: ConsentChoices) => {
    const revokedLoadedScript = Boolean(
      storedConsent &&
        ((storedConsent.choices.googleAnalytics && !choices.googleAnalytics) ||
          (storedConsent.choices.microsoftClarity && !choices.microsoftClarity)),
    );
    const nextConsent = storeConsent(choices);
    storedConsentRef.current = nextConsent;
    setStoredConsent(nextConsent);
    setDraft(choices);
    setIsPreferencesOpen(false);

    if (revokedLoadedScript) {
      disableLoadedAnalytics();
      // WHY: scripts de terceiros já executados não podem ser descarregados com segurança;
      // o reload ocorre apenas ao revogar e garante um novo documento sem trackers.
      window.location.reload();
    }
  };

  return (
    <>
      {storedConsent && <AnalyticsScripts consent={storedConsent.choices} />}

      {storedConsent === null && (
        <aside
          data-cookie-consent
          role="region"
          aria-live="polite"
          aria-labelledby="consent-title"
          className="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[60] mx-auto max-w-[84rem] border border-stroke bg-surface-elevated p-3 shadow-lift sm:inset-x-6 sm:bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:p-7"
        >
          <div>
            <p className="hidden text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-accent-text sm:block">Privacidade sob seu controle</p>
            <h2 id="consent-title" className="font-editorial text-lg font-medium leading-tight text-content sm:mt-2 sm:text-3xl">Sua privacidade, sua escolha.</h2>
            <p className="mt-1.5 max-w-3xl text-[0.66rem] leading-[1.15rem] text-content-muted sm:mt-3 sm:text-sm sm:leading-6">
              <span className="sm:hidden">Analytics e Clarity só são ativados com sua autorização. </span>
              <span className="hidden sm:inline">Usamos armazenamento necessário para lembrar sua escolha. Google e Microsoft só medem a experiência após sua autorização. </span>
              <Link href="/cookies" className="underline decoration-accent underline-offset-4">Saiba mais</Link>.
            </p>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:mt-5 sm:grid-cols-3 sm:gap-2 lg:mt-0 lg:min-w-[31rem]">
            <button type="button" onClick={() => save(deniedConsent)} className="min-h-11 rounded-full border border-stroke-strong px-4 text-[0.59rem] font-semibold uppercase tracking-[0.12em] text-content transition-colors hover:border-content sm:min-h-12 sm:px-5 sm:text-[0.61rem] sm:tracking-[0.14em]"><span className="sm:hidden">Recusar</span><span className="hidden sm:inline">Recusar opcionais</span></button>
            <button type="button" onClick={() => setIsPreferencesOpen(true)} className="min-h-11 rounded-full border border-stroke-strong px-4 text-[0.59rem] font-semibold uppercase tracking-[0.12em] text-content transition-colors hover:border-content sm:min-h-12 sm:px-5 sm:text-[0.61rem] sm:tracking-[0.14em]">Personalizar</button>
            <button type="button" onClick={() => save(acceptedConsent)} className="col-span-2 min-h-11 rounded-full bg-forest px-4 text-[0.59rem] font-semibold uppercase tracking-[0.12em] text-content-onContrast transition-colors hover:bg-surface-contrast sm:col-span-1 sm:min-h-12 sm:px-5 sm:text-[0.61rem] sm:tracking-[0.14em]"><span className="sm:hidden">Aceitar</span><span className="hidden sm:inline">Aceitar analíticos</span></button>
          </div>
        </aside>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="preferences-title"
        onClose={() => setIsPreferencesOpen(false)}
        className="m-auto max-h-[min(90dvh,48rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border border-stroke bg-surface-elevated p-0 text-content shadow-lift backdrop:bg-surface-contrast/75"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stroke bg-surface-elevated px-5 py-4 sm:px-7">
          <div>
            <p className="text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-accent-text">Centro de privacidade</p>
            <h2 id="preferences-title" className="mt-1 font-editorial text-2xl font-medium">Preferências de cookies</h2>
          </div>
          <button type="button" onClick={() => setIsPreferencesOpen(false)} aria-label="Fechar preferências" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stroke-strong">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-5 py-6 sm:px-7 sm:py-7">
          <p className="text-sm leading-7 text-content-muted">Os opcionais ficam desativados por padrão. Sua decisão vale por 180 dias neste dispositivo e pode ser alterada a qualquer momento no rodapé.</p>

          <div className="border border-stroke bg-surface p-5">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3 className="font-editorial text-xl font-medium">Necessários e preferências</h3>
                <p className="mt-2 text-sm leading-6 text-content-muted">Guardam a escolha de consentimento e o tema claro ou escuro. Não realizam rastreamento publicitário.</p>
              </div>
              <span className="shrink-0 rounded-full bg-sage-pale px-3 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-content-onLight">Sempre ativos</span>
            </div>
          </div>

          <label className="flex cursor-pointer items-start justify-between gap-5 border border-stroke bg-surface p-5">
            <span>
              <span className="block font-editorial text-xl font-medium">Google Analytics e Tag Manager</span>
              <span className="mt-2 block text-sm leading-6 text-content-muted">Mede visitas e navegação. O GTM somente gerencia tags autorizadas; todos os recursos publicitários permanecem negados.</span>
            </span>
            <input type="checkbox" checked={draft.googleAnalytics} onChange={(event) => setDraft((current) => ({ ...current, googleAnalytics: event.target.checked }))} className="mt-1 h-6 w-6 shrink-0 accent-[#29392D]" />
          </label>

          <label className="flex cursor-pointer items-start justify-between gap-5 border border-stroke bg-surface p-5">
            <span>
              <span className="block font-editorial text-xl font-medium">Microsoft Clarity</span>
              <span className="mt-2 block text-sm leading-6 text-content-muted">Ajuda a identificar problemas de usabilidade por meio de métricas de cliques, rolagem e sessões.</span>
            </span>
            <input type="checkbox" checked={draft.microsoftClarity} onChange={(event) => setDraft((current) => ({ ...current, microsoftClarity: event.target.checked }))} className="mt-1 h-6 w-6 shrink-0 accent-[#29392D]" />
          </label>

          <p className="text-xs leading-6 text-content-muted">Nenhuma ferramenta é carregada se o respectivo identificador não estiver configurado. Veja detalhes nas páginas de <Link href="/privacidade" className="underline decoration-accent underline-offset-4">Privacidade</Link> e <Link href="/cookies" className="underline decoration-accent underline-offset-4">Cookies</Link>.</p>
        </div>

        <div className="sticky bottom-0 grid gap-2 border-t border-stroke bg-surface-elevated px-5 py-4 sm:grid-cols-2 sm:px-7">
          <button type="button" onClick={() => save(deniedConsent)} className="min-h-12 rounded-full border border-stroke-strong px-5 text-[0.61rem] font-semibold uppercase tracking-[0.14em]">Recusar todos os opcionais</button>
          <button type="button" onClick={() => save(draft)} className="min-h-12 rounded-full bg-forest px-5 text-[0.61rem] font-semibold uppercase tracking-[0.14em] text-content-onContrast">Salvar escolhas</button>
        </div>
      </dialog>
    </>
  );
}
