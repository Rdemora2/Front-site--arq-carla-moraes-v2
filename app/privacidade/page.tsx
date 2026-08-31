import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { business } from "@/lib/data/business";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Entenda como a ${business.name} trata dados pessoais, cookies e solicitações de titulares.`,
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: `Política de Privacidade | ${business.name}`,
    description: `Entenda como a ${business.name} trata dados pessoais e respeita suas escolhas.`,
    url: "/privacidade",
  },
};

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Política de Privacidade",
    url: `${business.website}/privacidade`,
    inLanguage: "pt-BR",
    dateModified: "2026-08-31",
    isPartOf: { "@id": `${business.website}/#website` },
  };

  return (
    <>
      <LegalPage
        eyebrow="Privacidade · LGPD"
        title="Seus dados tratados com clareza."
        description="Este aviso explica, em linguagem direta, quais dados podem ser tratados durante a navegação e como exercer seus direitos."
        updatedAt="31 de agosto de 2026"
      >
        <h2>1. Sobre esta política</h2>
        <p>A Carla Moraes Arquitetura Floral respeita a sua privacidade. Esta política explica como dados pessoais podem ser tratados durante a navegação neste site e como você pode exercer seus direitos.</p>

        <h2>2. Quem é responsável pelo tratamento</h2>
        <p>A Carla Moraes Arquitetura Floral, conduzida por Carla Moraes em São Paulo, é responsável pelas decisões relacionadas ao tratamento descrito nesta política. Dúvidas e solicitações sobre privacidade podem ser enviadas para <Link href={`mailto:${business.email}`}>{business.email}</Link>.</p>

        <h2>3. Quais dados podem ser tratados</h2>
        <p>O site não possui cadastro, área de usuário, formulário próprio ou banco de dados de visitantes. Durante a navegação, a infraestrutura de hospedagem e segurança pode processar dados técnicos mínimos, como endereço IP, data e horário de acesso, navegador, dispositivo e registros de segurança.</p>
        <p>Quando você autoriza ferramentas analíticas, também podem ser tratados dados de uso, como páginas visitadas, origem da visita, interações, rolagens, cliques e informações aproximadas sobre dispositivo e região. As preferências de cookies e de tema ficam armazenadas no seu próprio dispositivo.</p>

        <h2>4. Contato por serviços externos</h2>
        <p>Ao escolher WhatsApp, e-mail, Instagram ou LinkedIn, você será direcionado ao respectivo serviço. Os dados fornecidos nesses canais serão tratados conforme a sua iniciativa de contato e as regras de privacidade de cada plataforma. Este site não recebe automaticamente o conteúdo dessas conversas.</p>

        <h2>5. Finalidades e bases legais</h2>
        <ul>
          <li>Dados técnicos estritamente necessários: entregar o site, manter sua segurança e prevenir falhas ou abusos.</li>
          <li>Dados analíticos opcionais: compreender desempenho e usabilidade, somente mediante o seu consentimento.</li>
          <li>Dados enviados voluntariamente por canais de contato: responder à solicitação e, quando aplicável, adotar medidas relacionadas a uma possível contratação.</li>
        </ul>

        <h2>6. Ferramentas opcionais e compartilhamento</h2>
        <p>Se configurados e autorizados por você, poderão ser utilizados Google Tag Manager, Google Analytics e Microsoft Clarity. Esses fornecedores atuam como prestadores de tecnologia e podem tratar dados fora do Brasil, conforme seus contratos, medidas de segurança e políticas de privacidade. Nenhuma dessas ferramentas é carregada antes do consentimento.</p>
        <p>Consulte a <Link href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">Política de Privacidade do Google</Link> e a <Link href="https://privacy.microsoft.com/pt-br/privacystatement" target="_blank" rel="noopener noreferrer">Política de Privacidade da Microsoft</Link>.</p>

        <h2>7. Retenção</h2>
        <p>Dados são mantidos apenas pelo período necessário às finalidades informadas, às configurações das ferramentas utilizadas e ao cumprimento de obrigações aplicáveis. A escolha de consentimento permanece neste dispositivo por 180 dias e pode ser alterada a qualquer momento.</p>

        <h2>8. Seus direitos</h2>
        <p>Nos termos da LGPD, você pode solicitar, quando aplicável, confirmação e acesso ao tratamento, correção, informação sobre compartilhamentos, anonimização, bloqueio ou eliminação, portabilidade, oposição, revisão de decisões automatizadas e revogação do consentimento. Envie a solicitação para <Link href={`mailto:${business.email}`}>{business.email}</Link>. Poderemos pedir informações mínimas para confirmar a identidade do solicitante.</p>

        <h2>9. Segurança</h2>
        <p>Adotamos medidas técnicas e organizacionais proporcionais para proteger os dados tratados. Nenhum ambiente digital é totalmente isento de riscos; por isso, não prometemos segurança absoluta.</p>

        <h2>10. Alterações</h2>
        <p>Esta política poderá ser atualizada para refletir mudanças no site, nas ferramentas utilizadas ou na legislação. A versão vigente e sua data de atualização permanecerão disponíveis nesta página. Para informações sobre tecnologias locais e como alterar sua decisão, consulte a <Link href="/cookies">Política de Cookies</Link>.</p>
      </LegalPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
