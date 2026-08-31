export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "cm:privacy-consent:v1";
export const OPEN_CONSENT_EVENT = "cm:open-consent-settings";

const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;

export interface ConsentChoices {
  readonly googleAnalytics: boolean;
  readonly microsoftClarity: boolean;
}

export interface StoredConsent {
  readonly version: typeof CONSENT_VERSION;
  readonly choices: ConsentChoices;
  readonly decidedAt: string;
  readonly expiresAt: string;
}

export const deniedConsent: ConsentChoices = {
  googleAnalytics: false,
  microsoftClarity: false,
};

export const acceptedConsent: ConsentChoices = {
  googleAnalytics: true,
  microsoftClarity: true,
};

function isConsentChoices(value: unknown): value is ConsentChoices {
  if (!value || typeof value !== "object") return false;
  const choices = value as Partial<ConsentChoices>;
  return (
    typeof choices.googleAnalytics === "boolean" &&
    typeof choices.microsoftClarity === "boolean"
  );
}

export function readStoredConsent(): StoredConsent | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as Partial<StoredConsent>;
    if (
      parsed.version !== CONSENT_VERSION ||
      !isConsentChoices(parsed.choices) ||
      typeof parsed.decidedAt !== "string" ||
      typeof parsed.expiresAt !== "string" ||
      Date.parse(parsed.expiresAt) <= Date.now()
    ) {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return parsed as StoredConsent;
  } catch {
    return null;
  }
}

export function storeConsent(choices: ConsentChoices): StoredConsent {
  const decidedAt = new Date();
  const storedConsent: StoredConsent = {
    version: CONSENT_VERSION,
    choices,
    decidedAt: decidedAt.toISOString(),
    expiresAt: new Date(decidedAt.getTime() + CONSENT_DURATION_MS).toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(storedConsent));
  } catch {
    // A decisão continua válida na sessão mesmo quando o navegador bloqueia storage.
  }
  return storedConsent;
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
