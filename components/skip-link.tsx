const DEFAULT_TARGET = "conteudo";

interface SkipLinkProps {
  readonly targetId?: string;
}

export function SkipLink({ targetId = DEFAULT_TARGET }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-surface px-5 py-3 text-sm font-semibold text-content transition-transform focus:translate-y-0">
      Ir para o conteúdo
    </a>
  );
}
