import definitions from "@/lib/data/social-cards.json";
import manifest from "@/lib/generated/social-cards.json";

export const socialCardKeys = [
  "home",
  "sobre",
  "servicos",
  "projetos",
  "processo",
  "contato",
  "privacidade",
  "cookies",
  "projeto-jardim-frances-classico",
  "projeto-jardim-tropical-moderno",
  "projeto-hotel-nos-jardins",
  "projeto-sicoob-metalcred",
] as const;

export interface SocialCardAsset {
  readonly url: string;
  readonly width: 1200;
  readonly height: 630;
  readonly type: "image/jpeg";
  readonly alt: string;
}

export type SocialCardKey = (typeof socialCardKeys)[number];

interface GeneratedSocialCard {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly type: string;
  readonly alt: string;
}

const generatedCards = manifest.cards as Readonly<Record<string, GeneratedSocialCard>>;
const knownKeys = new Set<string>(socialCardKeys);

// WHY: o gerador consome JSON para continuar independente do bundle do Next;
// esta validação impede que o registro tipado e as definições visuais divirjam.
if (
  definitions.length !== socialCardKeys.length ||
  definitions.some((definition) => !knownKeys.has(definition.key))
) {
  throw new Error("As definições de social cards não correspondem ao registro tipado.");
}

export function getSocialCard(key: SocialCardKey): SocialCardAsset {
  const card = generatedCards[key];

  if (!card || card.width !== 1200 || card.height !== 630 || card.type !== "image/jpeg") {
    throw new Error(`Social card ausente ou inválido para a chave "${key}".`);
  }

  return {
    url: card.url,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: card.alt,
  };
}

export function getProjectSocialCardKey(slug: string): SocialCardKey {
  const key = `projeto-${slug}`;
  return knownKeys.has(key) ? (key as SocialCardKey) : "projetos";
}
