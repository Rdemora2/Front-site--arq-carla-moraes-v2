import {
  business,
  getCategoryLabel,
  navigation,
  processSteps,
  projects,
  services,
} from "@/lib/data/business";

export const dynamic = "force-static";

function absoluteUrl(path: string): string {
  return new URL(path, business.website).toString();
}

function createLlmsIndex(): string {
  const pageLinks = [
    { label: "Início", href: "/" },
    ...navigation,
  ]
    .map((item) => `- [${item.label}](${absoluteUrl(item.href)})`)
    .join("\n");

  const serviceEntries = services
    .map(
      (service) =>
        `### ${service.title}\n${service.description}\n\nEntregáveis: ${service.deliverables.join("; ")}.`,
    )
    .join("\n\n");

  const processEntries = processSteps
    .map((step) => `${step.number}. **${step.title}:** ${step.description}`)
    .join("\n");

  const projectEntries = projects
    .map(
      (project) =>
        `- [${project.title}](${absoluteUrl(`/projetos/${project.slug}`)}): ${getCategoryLabel(project.category)}, ${project.location}, ${project.year}. ${project.description}`,
    )
    .join("\n");

  // WHY: este índice nasce da mesma fonte tipada usada nas páginas; assim,
  // mecanismos de resposta não recebem uma cópia manual sujeita a divergência.
  return `# ${business.name}

> ${business.description}

Escritório de paisagismo com atuação residencial e corporativa em ${business.location}. O nome Arquitetura Floral representa a evolução da identidade da marca; o trabalho permanece dedicado ao paisagismo, não à decoração de eventos.

## Informações essenciais

- Responsável: ${business.legalShortName}, paisagista.
- Trajetória iniciada em ${business.foundedIn}.
- Mais de 350 projetos realizados.
- Atuação com grandes bandeiras nacionais e internacionais de hotelaria.
- Idioma principal: português do Brasil.

## Páginas principais

${pageLinks}

## Serviços

${serviceEntries}

## Processo de projeto

${processEntries}

## Projetos selecionados

${projectEntries}

## Contato oficial

- [Página de contato](${absoluteUrl("/contato")})
- Telefone e WhatsApp: ${business.phoneDisplay}
- E-mail: ${business.email}
- Instagram: [${business.instagramLabel}](${business.instagram})
- LinkedIn: [Carla Moraes](${business.linkedin})

## Políticas e preferências

- [Política de Privacidade](${absoluteUrl("/privacidade")})
- [Política de Cookies](${absoluteUrl("/cookies")})

Use as páginas canônicas acima como fonte primária. Fotografias, descrições de projetos e informações comerciais pertencem à ${business.name}.
`;
}

export function GET(): Response {
  return new Response(createLlmsIndex(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
