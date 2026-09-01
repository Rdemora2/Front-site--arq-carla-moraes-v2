/**
 * FASE 1 — REGISTRO DA MIGRAÇÃO DE OLD (31/08/2026)
 *
 * Copy: a marca antiga era “Carla Moraes Arquitetura Paisagística”. A história
 * pública começa em 1996 e posiciona o escritório como especialista em projetos
 * paisagísticos personalizados, consultoria, projeto executivo, acompanhamento
 * e implementação com parceiros. O novo nome “Arquitetura Floral” foi definido
 * pelo cliente como evolução da identidade do mesmo trabalho paisagístico — não
 * como decoração de eventos.
 *
 * Paleta original: #6B7959 (oliva), #3E4D2C (floresta), #FCFAF7 (off-white),
 * #A99960 (dourado), #91A082 (sálvia) e #F9F5EF (bege). O refinamento semântico
 * correspondente está documentado em tailwind.config.ts.
 *
 * Portfólio: quatro projetos reais (Jardim Francês Clássico, Jardim Tropical
 * Moderno, Hotel nos Jardins e SICOOB Metalcred), nas categorias Residencial e
 * Corporativo, com 36 fotografias-fonte migradas para public/images/projects.
 *
 * Contatos visíveis e preservados: WhatsApp (11) 99985-4345, e-mail
 * arq.carlamoraes@gmail.com, Instagram @arqcamoraes e LinkedIn da Carla.
 * OLD não contém endereço físico completo confiável.
 *
 * Informação complementar confirmada pelo responsável em 31/08/2026: mais de
 * 350 projetos realizados, satisfação garantida, reconhecimento como referência
 * no mercado e atuação com grandes bandeiras hoteleiras nacionais e
 * internacionais. Como não há termos documentados para uma garantia comercial,
 * a copy pública comunica compromisso com cada entrega. O selo Safe Browsing de
 * OLD foi mantido a pedido do cliente.
 *
 * Inconsistências que não viraram alegações públicas: 310+ versus 500+ projetos,
 * 120 mil m², 98% de satisfação, nota 4,9/127 avaliações, CEP/coordenadas
 * genéricos e e-mail divergente no JSON-LD.
 * O único depoimento foi preservado abaixo como legado não verificado e não é
 * renderizado como prova social até que sua autenticidade seja confirmada.
 */

export type ProjectCategory = "residencial" | "corporativo";

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export interface BusinessProfile {
  readonly name: string;
  readonly legacyName: string;
  readonly legalShortName: string;
  readonly foundedIn: number;
  readonly location: string;
  readonly website: string;
  readonly description: string;
  readonly email: string;
  readonly phoneDisplay: string;
  readonly phoneE164: string;
  readonly instagram: string;
  readonly instagramLabel: string;
  readonly linkedin: string;
}

export interface Service {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly deliverables: readonly string[];
}

export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface ProjectImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly position?: string;
}

export interface Project {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly location: string;
  readonly year: string;
  readonly description: string;
  readonly fullDescription: string;
  readonly cover: ProjectImage;
  readonly images: readonly ProjectImage[];
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly customerName: string;
  readonly customerLocation: string;
  readonly isVerified: boolean;
  readonly migrationNote: string;
}

export interface TrustSignal {
  readonly value: string;
  readonly label: string;
  readonly detail: string;
}

export interface ContactIntent {
  readonly number: string;
  readonly title: string;
  readonly context: string;
  readonly href: string;
}

export const business = {
  name: "Carla Moraes Arquitetura Floral",
  legacyName: "Carla Moraes Arquitetura Paisagística",
  legalShortName: "Carla Moraes",
  foundedIn: 1996,
  location: "São Paulo, SP",
  website: "https://arqcarlamoraes.com.br",
  description:
    "Desde 1996, criando projetos paisagísticos exclusivos que harmonizam arquitetura e natureza, do conceito ao acompanhamento da implantação.",
  email: "arq.carlamoraes@gmail.com",
  phoneDisplay: "(11) 99985-4345",
  phoneE164: "5511999854345",
  instagram:
    "https://www.instagram.com/arqcamoraes?igsh=MTF3MW5kdG5jaTRmaQ==",
  instagramLabel: "@arqcamoraes",
  linkedin: "https://www.linkedin.com/in/carla-m-b47a0554/",
} as const satisfies BusinessProfile;

const whatsappMessage =
  "Olá! Vim pelo site da Carla Moraes e gostaria de conversar sobre um projeto paisagístico.";

function createWhatsAppLink(message: string): string {
  return `https://wa.me/${business.phoneE164}?text=${encodeURIComponent(message)}`;
}

export const contactLinks = {
  whatsapp: createWhatsAppLink(whatsappMessage),
  telephone: `tel:+${business.phoneE164}`,
  email: `mailto:${business.email}`,
} as const;

export const contactIntents = [
  {
    number: "01",
    title: "Projetar um novo jardim",
    context: "Residências, varandas e terraços",
    href: createWhatsAppLink(
      "Olá! Vim pelo site da Carla Moraes e gostaria de conversar sobre o projeto de um novo jardim.",
    ),
  },
  {
    number: "02",
    title: "Transformar um espaço existente",
    context: "Consultoria e renovação paisagística",
    href: createWhatsAppLink(
      "Olá! Vim pelo site da Carla Moraes e gostaria de uma consultoria para transformar um espaço existente.",
    ),
  },
  {
    number: "03",
    title: "Desenvolver um projeto corporativo",
    context: "Empresas e hotelaria",
    href: createWhatsAppLink(
      "Olá! Vim pelo site da Carla Moraes e gostaria de conversar sobre um projeto paisagístico corporativo.",
    ),
  },
] as const satisfies readonly ContactIntent[];

export const navigation = [
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Processo", href: "/processo" },
  { label: "Contato", href: "/contato" },
] as const satisfies readonly NavigationItem[];

export const institutionalCopy = {
  heroEyebrow: "Paisagismo autoral · São Paulo",
  heroTitle: {
    full: "Transformamos espaços em experiências naturais.",
    lines: ["Transformamos", "espaços em", "experiências", "naturais."],
  },
  heroDescription:
    "Paisagismo autoral desde 1996, do conceito ao acompanhamento da implantação.",
  aboutEyebrow: "Carla Moraes · Desde 1996",
  aboutTitle: "Jardins únicos, desenhados para combinar com quem vai vivê-los.",
  aboutParagraphs: [
    "A trajetória começou em 1996 com a missão de conectar pessoas à natureza através do paisagismo. Cada projeto respeita o estilo de vida do cliente e as características do espaço.",
    "Cada jardim deve refletir a personalidade de quem vai vivê-lo. A escuta das ideias, do estilo e da rotina orienta um espaço que funciona de verdade.",
    "Carla trabalha junto com você desde a primeira conversa até o detalhamento, integrando parceiros especializados quando necessário para preservar cada escolha do projeto.",
  ],
  portfolioTitle: "Menos fórmula. Mais identidade em cada paisagem.",
  portfolioDescription:
    "Residências, empresas e hotelaria resolvidas com o mesmo rigor e uma leitura própria de cada espaço.",
  marketStatement:
    "Mais de 350 projetos realizados e atuação para grandes bandeiras nacionais e internacionais de hotelaria.",
} as const;

export const trustSignals = [
  {
    value: "1996",
    label: "Início da trajetória",
    detail: "Experiência construída projeto a projeto.",
  },
  {
    value: "350+",
    label: "Projetos realizados",
    detail: "Entre jardins residenciais e espaços corporativos.",
  },
  {
    value: "Hotelaria",
    label: "Grandes bandeiras",
    detail: "Atuação nacional e internacional.",
  },
  {
    value: "Compromisso",
    label: "com cada entrega",
    detail: "Compromisso com cada escolha e cada entrega.",
  },
] as const satisfies readonly TrustSignal[];

export const services = [
  {
    number: "01",
    title: "Projeto paisagístico",
    description:
      "Projetos exclusivos para residências e ambientes corporativos, criados a partir das características do espaço, da arquitetura existente e da rotina de quem vai vivê-lo.",
    deliverables: [
      "Visita técnica e levantamento",
      "Estudo preliminar e anteprojeto",
      "Projeto executivo",
      "Especificação de materiais e espécies",
    ],
  },
  {
    number: "02",
    title: "Consultoria especializada",
    description:
      "Orientação técnica para transformar jardins, varandas e terraços com escolhas coerentes de espécies, composição, manutenção e uso do espaço.",
    deliverables: [
      "Leitura das condições do local",
      "Seleção de espécies adaptadas",
      "Diretrizes de composição",
      "Soluções para pequenos espaços",
    ],
  },
  {
    number: "03",
    title: "Acompanhamento de obra",
    description:
      "Acompanhamento técnico para preservar a intenção do projeto durante a implantação, em integração com parceiros de confiança e especialistas complementares.",
    deliverables: [
      "Orientação da implantação",
      "Compatibilização com parceiros",
      "Irrigação e iluminação com especialistas",
      "Fidelidade ao projeto aprovado",
    ],
  },
] as const satisfies readonly Service[];

export const processSteps = [
  {
    number: "01",
    title: "Escuta e visita técnica",
    description:
      "A primeira conversa aproxima necessidades, desejos e rotina. A visita revela luz, solo, arquitetura e as possibilidades reais do espaço.",
  },
  {
    number: "02",
    title: "Conceito e anteprojeto",
    description:
      "A intenção ganha forma: organização dos ambientes, linguagem do jardim, volumes, caminhos e uma seleção inicial de espécies e materiais.",
  },
  {
    number: "03",
    title: "Projeto executivo",
    description:
      "O desenho é detalhado com as especificações necessárias para orientar uma implantação precisa e fiel às decisões aprovadas.",
  },
  {
    number: "04",
    title: "Implantação acompanhada",
    description:
      "Quando contratada, a Carla acompanha a execução e trabalha junto aos parceiros para preservar cada escolha do projeto.",
  },
] as const satisfies readonly ProcessStep[];

const frenchImages = [
  {
    src: "/images/projects/jardim-frances/frances-4.jpg",
    width: 1920,
    height: 1457,
    alt: "Jardim francês com espelho d’água, gramado e vasos ornamentais",
    position: "center 58%",
  },
  {
    src: "/images/projects/jardim-frances/frances-3.jpg",
    width: 1024,
    height: 683,
    alt: "Espelho d’água ladeado por gramado e vasos em jardim residencial",
  },
  {
    src: "/images/projects/jardim-frances/frances-1.jpg",
    width: 1920,
    height: 1478,
    alt: "Fachada residencial integrada ao paisagismo francês ao entardecer",
  },
  {
    src: "/images/projects/jardim-frances/frances-2.jpg",
    width: 1920,
    height: 1472,
    alt: "Topiarias e volumes geométricos do Jardim Francês Clássico",
  },
  {
    src: "/images/projects/jardim-frances/frances-5.jpg",
    width: 1920,
    height: 1467,
    alt: "Iluminação noturna refletida no espelho d’água do jardim",
  },
] as const satisfies readonly ProjectImage[];

const tropicalImages = [
  {
    src: "/images/projects/jardim-tropical/tropical-2.jpg",
    width: 1920,
    height: 1474,
    alt: "Jardim tropical com bromélias, pedras roladas e espelho d’água",
    position: "center 62%",
  },
  {
    src: "/images/projects/jardim-tropical/tropical-1.jpg",
    width: 1920,
    height: 1490,
    alt: "Caminho entre folhagens tropicais conduzindo ao espelho d’água",
  },
  {
    src: "/images/projects/jardim-tropical/tropical-3.jpg",
    width: 1920,
    height: 2524,
    alt: "Detalhe vertical da composição de bromélias e pedras naturais",
  },
  {
    src: "/images/projects/jardim-tropical/tropical-4.jpg",
    width: 1920,
    height: 2522,
    alt: "Folhagens tropicais refletidas na água em acesso residencial",
  },
  {
    src: "/images/projects/jardim-tropical/tropical-5.jpg",
    width: 1920,
    height: 2541,
    alt: "Bromélias e orquídeas compondo o jardim tropical moderno",
  },
  {
    src: "/images/projects/jardim-tropical/tropical-6.jpg",
    width: 1920,
    height: 2531,
    alt: "Bromélia entre pedras e água no jardim tropical",
  },
] as const satisfies readonly ProjectImage[];

const hotelImages = [
  {
    src: "/images/projects/hotel-jardins/jardins-03.jpg",
    width: 1600,
    height: 757,
    alt: "Canteiros com palmeiras e diferentes volumes no hotel nos Jardins",
    position: "center 55%",
  },
  {
    src: "/images/projects/hotel-jardins/jardins-02.jpg",
    width: 1600,
    height: 757,
    alt: "Composição paisagística e fonte na área externa do hotel",
  },
  {
    src: "/images/projects/hotel-jardins/jardins-01.jpg",
    width: 1600,
    height: 757,
    alt: "Vista geral do novo paisagismo do hotel nos Jardins",
  },
  {
    src: "/images/projects/hotel-jardins/jardins-04.jpg",
    width: 1303,
    height: 954,
    alt: "Palmeiras Phoenix preservadas e novos canteiros do hotel",
  },
  {
    src: "/images/projects/hotel-jardins/jardins-05.jpg",
    width: 757,
    height: 1600,
    alt: "Detalhe vertical de espécies e volumes do paisagismo corporativo",
  },
  {
    src: "/images/projects/hotel-jardins/jardins-06.jpg",
    width: 757,
    height: 1600,
    alt: "Canteiro com espécies selecionadas para a área externa do hotel",
  },
  {
    src: "/images/projects/hotel-jardins/jardins-07.jpg",
    width: 757,
    height: 1600,
    alt: "Composição vertical do projeto paisagístico do hotel",
  },
  {
    src: "/images/projects/hotel-jardins/jardins-08.jpg",
    width: 757,
    height: 1600,
    alt: "Folhagens e canteiros integrados à fachada do hotel",
  },
  {
    src: "/images/projects/hotel-jardins/jardins-09.jpg",
    width: 757,
    height: 1600,
    alt: "Detalhe final da implantação paisagística no hotel nos Jardins",
  },
] as const satisfies readonly ProjectImage[];

const sicoobDimensions = [
  [774, 968],
  [774, 968],
  [722, 902],
  [1080, 1350],
  [774, 774],
  [774, 774],
  [723, 724],
  [725, 724],
  [774, 774],
  [656, 655],
  [617, 617],
  [731, 730],
  [774, 931],
  [669, 836],
  [1080, 1113],
  [1080, 1284],
] as const;

const sicoobAlts = [
  "Árvore ornamental em vaso de cimento junto ao guarda-corpo da varanda do SICOOB Metalcred",
  "Árvore ornamental em vaso cinza diante da parede verde na área externa do SICOOB Metalcred",
  "Árvore jovem em vaso de cimento com a fachada do SICOOB Metalcred ao fundo",
  "Vasos com árvores ornamentais alinhados ao longo da varanda do SICOOB Metalcred",
  "Folhagens altas em jardineira retangular e vaso de cimento na área externa do SICOOB Metalcred",
  "Composição de iúcas e folhagens vinho em vasos de cimento no SICOOB Metalcred",
  "Folhagens esculturais em jardineira e vasos sobre pedriscos no SICOOB Metalcred",
  "Cica, agave e arbusto podado compondo o jardim em vasos do SICOOB Metalcred",
  "Detalhe de agave em vaso redondo com cobertura de casca de pinus no SICOOB Metalcred",
  "Jardineira com arbustos e vaso de flores vermelhas na área externa do SICOOB Metalcred",
  "Cica, arbusto topiado, agave e flores compondo o terraço do SICOOB Metalcred",
  "Agave em primeiro plano entre cica, arbusto podado e jardineira no SICOOB Metalcred",
  "Pata-de-elefante em vaso branco junto à janela de uma sala do SICOOB Metalcred",
  "Planta de folhas estreitas em vaso branco no ambiente de trabalho do SICOOB Metalcred",
  "Lanças-de-são-jorge em vaso branco diante da divisória de vidro do SICOOB Metalcred",
  "Pata-de-elefante em vaso branco no corredor interno do SICOOB Metalcred",
] as const satisfies readonly string[] & {
  length: typeof sicoobDimensions["length"];
};

const sicoobImages = sicoobDimensions.map(([width, height], index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    src: `/images/projects/sicoob-metalcred/sicoob-${number}.jpg`,
    width,
    height,
    alt: sicoobAlts[index]!,
  };
}) satisfies readonly ProjectImage[];

export const projects = [
  {
    id: 1,
    slug: "jardim-frances-classico",
    title: "Jardim Francês Clássico",
    category: "residencial",
    location: "Morumbi, SP",
    year: "2023",
    description:
      "Um jardim clássico e elegante com simetria, formas geométricas e topiarias artesanais.",
    fullDescription:
      "Este projeto residencial no Morumbi apresenta um jardim francês clássico e elegante, conhecido por sua simetria e ordem. Formas geométricas e plantas cuidadosamente podadas criam um ambiente sofisticado e harmonioso, valorizando a precisão e a beleza formal.",
    cover: frenchImages[0],
    images: frenchImages,
  },
  {
    id: 2,
    slug: "jardim-tropical-moderno",
    title: "Jardim Tropical Moderno",
    category: "residencial",
    location: "São Paulo, SP",
    year: "2023",
    description:
      "Folhagens diversas conduzem ao espelho d’água entre pedras roladas, bromélias e orquídeas.",
    fullDescription:
      "Este jardim tropical cria um caminho desde a rampa de acesso até o espelho d’água. Folhagens diversificadas, pedras roladas, bromélias e orquídeas formam uma composição moderna e elegante, conectando os moradores à natureza de forma contemporânea.",
    cover: tropicalImages[0],
    images: tropicalImages,
  },
  {
    id: 3,
    slug: "hotel-nos-jardins",
    title: "Paisagismo Hotel nos Jardins",
    category: "corporativo",
    location: "Jardins, SP",
    year: "2022",
    description:
      "Novo paisagismo que preserva as palmeiras Phoenix e cria movimento por formas e volumes nos canteiros.",
    fullDescription:
      "O novo projeto para a área verde externa preservou as palmeiras Phoenix como elementos estruturais. Strelitzia, buxus, murta, dianella e moreia formam canteiros com volumes dinâmicos, em uma composição corporativa sofisticada e de baixa manutenção.",
    cover: hotelImages[0],
    images: hotelImages,
  },
  {
    id: 4,
    slug: "sicoob-metalcred",
    title: "SICOOB Metalcred — Sede Corporativa",
    category: "corporativo",
    location: "Liberdade, SP",
    year: "2020",
    description:
      "Paisagismo corporativo com peças internas em fibra branca e vasos externos em cimento natural.",
    fullDescription:
      "O projeto para a sede da SICOOB Metalcred combina funcionalidade empresarial e elementos naturais. Peças internas em fibra branca criam uma presença leve; na área externa, vasos em cimento natural e bambu mossô torto trazem robustez e movimento.",
    cover: sicoobImages[3]!,
    images: sicoobImages,
  },
] as const satisfies readonly Project[];

export const faqs = [
  {
    question: "Como funciona o desenvolvimento de um projeto paisagístico?",
    answer:
      "O processo começa com visita técnica e conversa para compreender necessidades e desejos. Em seguida, são desenvolvidos estudo preliminar, anteprojeto e projeto executivo, com especificações de materiais e espécies. O acompanhamento da implantação pode ser contratado para preservar a fidelidade ao projeto.",
  },
  {
    question: "Quanto tempo leva para desenvolver um projeto completo?",
    answer:
      "O prazo depende da complexidade e do tamanho da área. Um projeto residencial típico pode levar de 30 a 60 dias entre estudo, desenvolvimento e detalhamento. Projetos maiores ou corporativos podem exigir mais tempo.",
  },
  {
    question: "Vocês trabalham apenas com projeto ou também com a execução?",
    answer:
      "O foco é o desenvolvimento de projetos paisagísticos. O acompanhamento de obra também pode ser contratado, e Carla trabalha com parceiros de confiança para formar uma equipe integrada durante a implantação.",
  },
  {
    question: "Como as espécies vegetais são escolhidas?",
    answer:
      "A seleção considera clima, exposição solar, solo, disponibilidade de água, estilo do projeto, manutenção e preferências do cliente. Espécies adaptadas ao local são priorizadas para favorecer longevidade e equilíbrio.",
  },
  {
    question: "Vocês desenvolvem projetos para pequenos espaços?",
    answer:
      "Sim. Jardins compactos, varandas e terraços podem se transformar com planejamento adequado. Cada centímetro é considerado para criar um espaço funcional e harmonioso.",
  },
  {
    question: "O projeto pode incluir irrigação e iluminação?",
    answer:
      "Sim. O projeto executivo pode incluir detalhamentos de irrigação e iluminação paisagística, desenvolvidos em parceria com especialistas dessas áreas.",
  },
] as const satisfies readonly FaqItem[];

export const legacyTestimonials = [
  {
    quote:
      "Nossa casa ganhou uma nova vida depois do projeto da Carla Moraes. O jardim se transformou no coração da casa, onde passamos momentos de qualidade em família. Cada detalhe foi pensado com cuidado, respeitando nossas preferências e trazendo soluções que não imaginávamos.",
    customerName: "Família Rodrigues",
    customerLocation: "São Paulo, SP",
    isVerified: false,
    migrationNote:
      "Preservado de OLD, mas acompanhado apenas por imagens genéricas do Unsplash; aguarda validação antes de publicação.",
  },
] as const satisfies readonly Testimonial[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getCategoryLabel(category: ProjectCategory): string {
  return category === "residencial" ? "Residencial" : "Corporativo";
}
