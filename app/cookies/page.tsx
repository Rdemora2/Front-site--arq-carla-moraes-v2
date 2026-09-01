import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { CookieSettingsButton } from "@/components/privacy/cookie-settings-button";
import { business } from "@/lib/data/business";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Política de Cookies",
  description: `Saiba quais tecnologias a ${business.name} utiliza e gerencie suas preferências de medição.`,
  path: "/cookies",
  socialDescription: "Entenda e controle as tecnologias necessárias e analíticas deste site.",
  index: false,
});

export default function CookiesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Política de Cookies",
    url: `${business.website}/cookies`,
    inLanguage: "pt-BR",
    dateModified: "2026-08-31",
    isPartOf: { "@id": `${business.website}/#website` },
  };

  return (
    <>
      <LegalPage
        eyebrow="Cookies · Escolhas"
        title="Medição somente com a sua permissão."
        description="Nenhum recurso analítico é carregado antes do consentimento. Aqui você entende cada categoria e pode mudar sua escolha."
        updatedAt="31 de agosto de 2026"
      >
        <h2>1. O que são cookies</h2>
        <p>Cookies e tecnologias semelhantes permitem armazenar pequenas informações no navegador. Neste site, elas são usadas para lembrar escolhas e, somente com sua autorização, gerar métricas de uso.</p>

        <h2>2. Categorias utilizadas</h2>
        <ul>
          <li><strong>Necessários:</strong> guardam sua preferência de consentimento e permitem funções essenciais. Não podem ser desativados pelo banner.</li>
          <li><strong>Preferências:</strong> lembram o tema claro ou escuro escolhido. Não realizam rastreamento publicitário.</li>
          <li><strong>Google Analytics e Tag Manager:</strong> podem medir visitas e gerenciar tags autorizadas. Permanecem desativados até consentimento.</li>
          <li><strong>Microsoft Clarity:</strong> pode medir cliques, rolagem e sessões para identificar problemas de experiência. Permanece desativado até consentimento.</li>
        </ul>

        <h2>3. Tecnologias previstas</h2>
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table>
            <thead>
              <tr><th>Tecnologia</th><th>Finalidade</th><th>Ativação</th><th>Retenção</th></tr>
            </thead>
            <tbody>
              <tr><td><code>cm:privacy-consent:v1</code></td><td>Registrar sua decisão neste dispositivo.</td><td>Sempre necessária</td><td>180 dias</td></tr>
              <tr><td><code>cm-theme</code></td><td>Lembrar tema claro ou escuro.</td><td>Ao escolher um tema</td><td>Até nova escolha</td></tr>
              <tr><td><code>_ga</code> e <code>_ga_*</code></td><td>Distinguir sessões e gerar métricas no Google Analytics.</td><td>Somente com consentimento Google</td><td>Conforme configuração do Analytics</td></tr>
              <tr><td>Google Tag Manager</td><td>Gerenciar a ativação de tags autorizadas; por si só, não precisa criar cookies.</td><td>Somente com consentimento Google</td><td>Depende das tags configuradas</td></tr>
              <tr><td><code>_clck</code>, <code>_clsk</code> e <code>CLID</code></td><td>Gerar métricas de comportamento e sessão no Microsoft Clarity.</td><td>Somente com consentimento Microsoft</td><td>Conforme configuração do Clarity</td></tr>
            </tbody>
          </table>
        </div>
        <p>Os nomes efetivamente criados podem variar conforme a configuração dos fornecedores. Se os identificadores das plataformas não estiverem configurados, nenhum script externo é solicitado mesmo depois de uma autorização.</p>

        <h2>4. Suas escolhas</h2>
        <p>No primeiro acesso, você pode aceitar analíticos, recusar opcionais ou personalizar cada fornecedor. Recusar não limita o acesso ao conteúdo. Ao retirar o consentimento, novas coletas opcionais são interrompidas e os identificadores removíveis neste navegador são apagados.</p>
        <CookieSettingsButton className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-6 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-content-onContrast no-underline transition-colors hover:bg-surface-contrast hover:text-content-onContrast">
          Abrir preferências de cookies
        </CookieSettingsButton>

        <h2>5. Serviços externos</h2>
        <p>Links para WhatsApp, Instagram, LinkedIn e e-mail não instalam cookies dessas plataformas enquanto não forem abertos. Ao acessá-los, passam a valer as políticas do respectivo serviço.</p>

        <h2>6. Documentação dos fornecedores</h2>
        <ul>
          <li><Link href="https://support.google.com/analytics/answer/6004245?hl=pt-BR" target="_blank" rel="noopener noreferrer">Privacidade e proteção de dados no Google Analytics</Link></li>
          <li><Link href="https://support.google.com/tagmanager/answer/9323295?hl=pt-BR" target="_blank" rel="noopener noreferrer">Privacidade e segurança no Google Tag Manager</Link></li>
          <li><Link href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2" target="_blank" rel="noopener noreferrer">Consentimento no Microsoft Clarity</Link></li>
          <li><Link href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf" target="_blank" rel="noopener noreferrer">Guia de Cookies e Proteção de Dados da ANPD</Link></li>
        </ul>

        <h2>7. Mais informações</h2>
        <p>Consulte a <Link href="/privacidade">Política de Privacidade</Link> ou envie sua dúvida para <Link href={`mailto:${business.email}`}>{business.email}</Link>.</p>
      </LegalPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
