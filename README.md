<p align="center">
  <img src="./public/brand/mark.webp" width="72" alt="Símbolo da Carla Moraes Arquitetura Floral" />
</p>

<h1 align="center">Carla Moraes Arquitetura Floral</h1>

<p align="center">
  Site institucional de paisagismo autoral, projetado para comunicar trajetória, rigor técnico e confiança com uma experiência digital contemporânea.
</p>

<p align="center">
  <code>Next.js 15</code> · <code>React 19</code> · <code>TypeScript strict</code> · <code>Tailwind CSS</code> · <code>SSG</code> · <code>Vercel</code>
</p>

![Capa institucional da Carla Moraes Arquitetura Floral](./public/images/og-cover.jpg)

## Visão geral

Este repositório contém a reconstrução completa do site da **Carla Moraes Arquitetura Floral**, evolução de identidade da antiga Carla Moraes Arquitetura Paisagística.

Apesar do novo nome, o escopo do negócio permanece o **paisagismo**: projetos residenciais e corporativos, consultoria especializada e acompanhamento de implantação. A marca não atua com decoração de eventos.

O projeto foi desenvolvido como produto de produção, não como demonstração visual. A aplicação é estática, mobile-first, acessível, independente de backend próprio e preparada para publicação na Vercel sem configuração adicional de infraestrutura.

### Objetivos de engenharia

- Comunicar autoridade com fatos reais: atuação desde 1996, mais de 350 projetos e experiência em hotelaria nacional e internacional.
- Concentrar conteúdo institucional em uma fonte local, tipada e auditável.
- Entregar páginas estáticas com baixo custo operacional e baixa superfície de falha.
- Preservar desempenho mobile em conexões comuns, sem bibliotecas pesadas de animação.
- Tratar SEO, AEO, acessibilidade, privacidade e segurança como requisitos de produto.
- Manter analytics opcionais e bloqueados até consentimento explícito.

## Escopo

### Incluído

- Home institucional orientada à conversão.
- Páginas dedicadas de sobre, serviços, processo, projetos e contato.
- Quatro estudos de caso reais, gerados estaticamente.
- Tema claro e escuro persistente.
- Movimento orgânico reativo ao scroll e adaptativo ao contraste do fundo.
- Banner e central de preferências de cookies.
- Integrações opcionais com Google Tag Manager, Google Analytics e Microsoft Clarity.
- Metadados, canonical, Open Graph, Twitter Cards, sitemap, `llms.txt`, robots, manifest e JSON-LD.
- Políticas de privacidade e cookies.
- Quality gate automatizado em GitHub Actions para pushes e pull requests.
- Testes dos artefatos estáticos, capas sociais e fontes de imagem de produção.

### Fora do escopo atual

- CMS, banco de dados ou API própria.
- Área autenticada ou painel administrativo.
- Formulário com persistência de dados.
- E-commerce, pagamentos ou automações de atendimento.
- Suíte end-to-end com navegador e monitoramento contínuo de Web Vitals em produção.

## Arquitetura

O conteúdo é resolvido em build time. Não há `fetch` de infraestrutura própria em runtime.

```text
lib/data/business.ts
        │
        ├── páginas institucionais e projetos
        ├── metadata, canonical e JSON-LD
        ├── llms.txt e dados de navegação
        └── CTAs e links de contato

Git + dependências das rotas ──> sitemap-lastmod.json ──> sitemap.xml

social-cards.json ──> gerador determinístico ──> JPEGs versionados por hash

assets/source-images ──> JPEG-fonte em public ──> next/image ──> AVIF/WebP responsivo

consentimento local
        ├── Google autorizado ──> GTM ou GA direto
        └── Microsoft autorizado ──> Clarity
```

### Estrutura principal

```text
app/
├── page.tsx                    # Home
├── sobre/                      # História e posicionamento
├── servicos/                   # Serviços e perguntas frequentes
├── processo/                   # Etapas de trabalho
├── projetos/                   # Índice e páginas estáticas por slug
├── contato/                    # Contatos e CTA direto
├── privacidade/ e cookies/     # Transparência e preferências
├── llms.txt/                    # Índice curado e estático para agentes
├── manifest.ts                 # Web App Manifest
├── robots.ts                   # Política de crawling
└── sitemap.ts                  # Descoberta de rotas e imagens

components/
├── privacy/                    # Consentimento e carregamento de trackers
├── organic-growth.tsx          # Assinatura orgânica reativa ao scroll
└── ...                         # Componentes institucionais reutilizáveis

lib/
├── data/business.ts            # Fonte de verdade tipada do conteúdo
├── data/social-cards.*         # Definições e registro tipado das capas
├── generated/                  # Manifestos determinísticos de build
├── privacy/consent.ts          # Contrato e persistência do consentimento
└── seo.ts                      # Factory de metadata por rota

public/
├── brand/                      # Marca e Safe Browsing
├── images/projects/            # JPEGs-fonte processáveis pelo next/image
└── images/social/v1/           # Capas JPEG versionadas por conteúdo

assets/source-images/           # Originais preservados, nunca servidos

scripts/
├── generate-social-cards.mjs   # Composição das capas sociais
└── generate-sitemap-lastmod.mjs # Datas editoriais derivadas do Git

tests/                          # Contratos dos artefatos de produção
.github/workflows/quality.yml   # CI com histórico Git completo
```

## Stack e decisões técnicas

| Camada | Tecnologia | Decisão |
| --- | --- | --- |
| Framework | Next.js 15, App Router | SSG, metadata nativa e deploy direto na Vercel |
| UI | React 19 | Componentização sem dependências de interface externas |
| Linguagem | TypeScript 5 | `strict`, `noUncheckedIndexedAccess` e `noImplicitOverride` |
| Estilos | Tailwind CSS 3 | Tokens semânticos e implementação mobile-first |
| Imagens | `next/image` + Sharp | JPEG-fonte processável, saída AVIF/WebP responsiva, `sizes` e lazy loading |
| Fontes | `next/font` | Cormorant Garamond + Manrope, hospedadas pelo próprio build |
| Conteúdo | Objetos TypeScript locais | Sem CMS, banco ou disponibilidade externa em runtime |
| Motion | SVG + `requestAnimationFrame` | Scroll reativo sem biblioteca de animação |
| Analytics | GTM, GA4 e Clarity opcionais | Consent-first e nenhum tracker obrigatório |

Os tokens de marca e papéis semânticos estão em [`tailwind.config.ts`](./tailwind.config.ts). Os valores alternados por tema e o tratamento de contraste da animação orgânica estão em [`app/globals.css`](./app/globals.css).

## Requisitos

- Node.js `>= 20.9.0`
- npm compatível com o `package-lock.json`
- Git

O lockfile é a referência de instalação. Para builds reproduzíveis, use `npm ci` em vez de `npm install`.

## Execução local

```bash
git clone git@github.com:Rdemora2/Front-site--arq-carla-moraes-v2.git
cd Front-site--arq-carla-moraes-v2
npm ci
cp .env.example .env.local
npm run dev
```

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

As variáveis de analytics são opcionais. Sem `.env.local`, o site continua funcional e nenhum tracker externo é carregado.

## Variáveis de ambiente

| Variável | Obrigatória | Finalidade |
| --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | Não | Container do Google Tag Manager, no formato `GTM-...` |
| `NEXT_PUBLIC_GA_ID` | Não | Medição direta do GA4, no formato `G-...` |
| `NEXT_PUBLIC_CLARITY_ID` | Não | Projeto do Microsoft Clarity |

### Precedência Google

Se `NEXT_PUBLIC_GTM_ID` estiver configurada, o carregamento direto de `NEXT_PUBLIC_GA_ID` é desativado para evitar pageviews duplicados. Nesse cenário, o GA4 deve ser administrado dentro do GTM.

IDs prefixados com `NEXT_PUBLIC_` ficam visíveis no bundle do navegador e **não devem conter segredos**. Valores específicos de ambiente devem permanecer em `.env.local` ou nas configurações da plataforma de deploy.

## Scripts

| Comando | Função |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run generate:social` | Recria as capas sociais determinísticas |
| `npm run generate:sitemap` | Atualiza datas confiáveis do sitemap pelo histórico Git |
| `npm run generate:seo` | Executa os dois geradores de SEO |
| `npm run build` | Executa os geradores e valida o build de produção |
| `npm run start` | Serve localmente o último build de produção |
| `npm run lint` | Executa as regras ESLint do Next.js |
| `npm run typecheck` | Valida TypeScript sem emitir arquivos |
| `npm run test:production` | Valida rotas estáticas, metatags, social cards e fontes de imagem após o build |
| `npm run check` | Executa lint, tipos, build e testes de produção em sequência |

### Quality gate mínimo

Antes de abrir PR ou publicar uma versão:

```bash
npm run check
```

O build deve manter as páginas institucionais como conteúdo estático (`○`) e os projetos como SSG com `generateStaticParams` (`●`).

O workflow `quality.yml` executa o mesmo comando em pushes para `main` e pull requests, usando `npm ci` e histórico Git completo. Os testes cobrem contratos objetivos do build; QA visual, fluxos de consentimento e métricas em dispositivos reais continuam necessários.

## Rotas

| Rota | Estratégia | Responsabilidade |
| --- | --- | --- |
| `/` | Estática | Resumo institucional e conversão |
| `/sobre` | Estática | História, método e autoridade |
| `/servicos` | Estática | Serviços e respostas frequentes |
| `/processo` | Estática | Processo de contratação e implantação |
| `/projetos` | Estática | Portfólio editorial |
| `/projetos/[slug]` | SSG | Estudo de caso gerado em build time |
| `/contato` | Estática | WhatsApp, telefone, e-mail e redes sociais |
| `/privacidade` | Estática | Política de privacidade |
| `/cookies` | Estática | Política e reabertura das preferências |

Rotas técnicas: `/sitemap.xml`, `/robots.txt`, `/llms.txt` e `/manifest.webmanifest`.

## Conteúdo e portfólio

[`lib/data/business.ts`](./lib/data/business.ts) é a fonte de verdade para:

- identificação e contatos do negócio;
- copy institucional;
- serviços e processo;
- sinais de confiança;
- perguntas frequentes;
- projetos, slugs, descrições e metadados das imagens.

O cabeçalho desse arquivo registra a migração do site anterior, as fontes preservadas e as alegações descartadas por inconsistência. Não adicione números, clientes, prêmios ou depoimentos sem validação do responsável pelo negócio.

### Adicionando um projeto

1. Preserve o original em `assets/source-images/projects/<slug>/` e gere um JPEG-fonte de alta qualidade em `public/images/projects/<slug>/`.
2. Registre cada imagem com `src`, `width`, `height` e `alt` descritivo.
3. Adicione um objeto que satisfaça a interface `Project` em `business.ts`.
4. Use um slug estável e exclusivo.
5. Registre a capa em `lib/data/social-cards.json`, no tipo `SocialCardKey` e no mapeamento do gerador de datas.
6. Rode `npm run check`.
7. Verifique a página, o sitemap, o `llms.txt` e o compartilhamento social gerados.

Dimensões declaradas são obrigatórias para evitar CLS. A imagem principal de cada rota deve ser tratada como candidata a LCP; as demais devem permanecer lazy. Não use um AVIF já comprimido como fonte no Next.js 15: o otimizador pode devolvê-lo intacto, sem redimensionamento. O AVIF deve ser a saída negociada pelo `next/image`, não a entrada pública.

## SEO e AEO

A camada de descoberta inclui:

- metadata e canonical por rota;
- Open Graph e Twitter Cards específicos por rota e projeto;
- 12 capas JPEG em `1200 × 630`, menores que 160 KB e versionadas por hash de conteúdo;
- sitemap com imagens do portfólio e `lastModified` derivado do histórico das dependências reais;
- `llms.txt` curado, estático e gerado da mesma fonte tipada das páginas;
- `robots.txt` e host canônico;
- Web App Manifest e favicons próprios;
- headings e conteúdo semântico renderizados no HTML estático;
- JSON-LD para `ProfessionalService`, `WebSite`, `Person`, `Service`, `CreativeWork`, `FAQPage`, `ItemList`, `CollectionPage` e breadcrumbs, conforme a rota.

O domínio canônico é definido em `business.website`. SEO técnico melhora a capacidade de descoberta, mas não representa garantia de indexação ou posicionamento.

O `prebuild` recria as capas e o manifesto de datas. Se o ambiente não expuser histórico Git suficiente, o gerador preserva as últimas datas confiáveis já versionadas; ele nunca usa a hora do deploy como substituto. As metatags apontam diretamente para arquivos imutáveis com hash, sem endpoint de imagem em runtime.

## Privacidade, LGPD e analytics

O modelo é **opt-in**:

1. Nenhum script opcional é carregado antes de uma decisão válida.
2. Google e Microsoft podem ser autorizados ou recusados separadamente.
3. A escolha é armazenada neste dispositivo por 180 dias.
4. O usuário pode reabrir as preferências pelo rodapé.
5. Ao revogar, novas coletas são interrompidas e identificadores removíveis são limpos no navegador.

GTM deve aplicar verificações de consentimento nas próprias tags. Recursos publicitários permanecem negados pelo site.

As páginas de privacidade e cookies documentam o comportamento técnico atual. Antes do lançamento comercial, os textos e a configuração dos fornecedores devem receber revisão jurídica compatível com a operação real; documentação técnica não equivale a parecer legal.

## Acessibilidade e experiência

- Navegação completa por teclado e estados de foco visíveis.
- Link de salto para o conteúdo principal.
- Áreas interativas com pelo menos `44 × 44 px`.
- Contraste orientado a WCAG AA.
- Escala tipográfica responsiva para telas estreitas.
- `prefers-reduced-motion` respeitado.
- Safe areas de iOS consideradas nos elementos fixos.
- Menu mobile com controle de foco e bloqueio de conteúdo de fundo.
- Tema claro/escuro persistente e aplicado antes da primeira pintura.

## Performance

As metas de produto são LCP `< 2,0 s`, CLS `< 0,05` e INP `< 150 ms`. Elas devem ser verificadas novamente no ambiente publicado, em dispositivos e redes representativos; não são apresentadas como medições universais de laboratório.

Decisões implementadas para sustentar essas metas:

- HTML pré-renderizado e ausência de fetch próprio em runtime;
- uma única imagem priorizada no hero;
- lazy loading e `sizes` responsivos nas galerias;
- JPEGs-fonte redimensionados e convertidos para AVIF/WebP pelo `next/image`;
- fontes self-hosted pelo build do Next.js;
- dimensões de imagem definidas para estabilidade visual;
- motion orgânico processado em um único frame por scroll;
- ausência de dependências de scroll, UI ou animação de terceiros.

## Segurança

[`next.config.ts`](./next.config.ts) configura:

- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: SAMEORIGIN`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy` sem câmera, microfone ou geolocalização;
- `Strict-Transport-Security` em produção;
- `Content-Security-Policy` nos builds de produção, com origens limitadas aos
  provedores opcionais de analytics;
- remoção do header `X-Powered-By`.

A CSP bloqueia objetos, iframes e handlers inline, restringe conexões e permite
scripts externos apenas de GTM/GA e Clarity. O `unsafe-inline` permanece limitado
ao `script-src` porque o App Router injeta bootstrap e hidratação inline no HTML
estático, além do bootstrap de tema e dos scripts consentidos. Um nonce por
resposta exigiria renderização dinâmica; essa troca foi evitada para preservar o
SSG. A política não habilita `unsafe-eval`.

Nunca comite credenciais, arquivos `.env.local`, certificados ou chaves. A aplicação não exige segredos para funcionar.

## Deploy na Vercel

1. Importe este repositório na Vercel.
2. Confirme a detecção automática de Next.js.
3. Configure somente as variáveis opcionais que serão realmente utilizadas.
4. Execute o deploy sem alterar build command ou output directory.
5. Associe o domínio canônico e valide HTTPS.
6. Faça o checklist pós-deploy.

### Checklist pós-deploy

- Confirmar canonical, Open Graph e a capa específica de cada tipo de página.
- Abrir `/sitemap.xml`, `/robots.txt`, `/llms.txt` e `/manifest.webmanifest`.
- Validar os quatro projetos e imagens em viewport mobile.
- Testar WhatsApp, telefone, e-mail e links externos.
- Testar aceitar, recusar, personalizar e revogar analytics.
- Conferir o comportamento de GTM/GA/Clarity no Network do navegador.
- Navegar por teclado e com redução de movimento habilitada.
- Executar Lighthouse/Web Vitals no domínio publicado.
- Consultar o domínio no Google Safe Browsing.

### Mudança de domínio

Se o domínio mudar, revise em conjunto:

- `business.website` em `lib/data/business.ts`;
- `ANALYTICS_COOKIE_ROOT_DOMAIN` em `lib/privacy/consent.ts`;
- URL de consulta do Safe Browsing em `components/site-footer.tsx`;
- domínio configurado na Vercel e nos fornecedores de analytics.

## Fluxo de contribuição

Fluxo recomendado:

1. Crie uma branch curta a partir de `main`.
2. Mantenha cada mudança em escopo claro.
3. Use Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
4. Rode `npm run check`.
5. Abra PR com contexto, impacto visual e evidência de validação.
6. Evite misturar alterações de conteúdo, design e infraestrutura no mesmo commit.

Mudanças de copy, contatos, métricas ou provas de autoridade exigem validação do responsável pelo negócio.

## Propriedade

Repositório de uso proprietário. Nenhuma licença open source é concedida implicitamente. Fotografias, marca e conteúdo institucional não devem ser reutilizados fora deste projeto sem autorização.

Desenvolvimento: [Roberto Moraes](https://portifolio-roberto-moraes-projects.vercel.app/).
