"use client";

import Script from "next/script";
import type { ConsentChoices } from "@/lib/privacy/consent";

interface AnalyticsScriptsProps {
  readonly consent: ConsentChoices;
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export function AnalyticsScripts({ consent }: AnalyticsScriptsProps) {
  const loadGoogle = consent.googleAnalytics && Boolean(gtmId || gaId);
  const loadDirectAnalytics = loadGoogle && !gtmId && Boolean(gaId);
  const loadClarity = consent.microsoftClarity && Boolean(clarityId);

  return (
    <>
      {loadGoogle && (
        <Script id="google-consent-state" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
            gtag('consent', 'update', { analytics_storage: 'granted' });
          `}
        </Script>
      )}

      {loadGoogle && gtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer',${JSON.stringify(gtmId)});
          `}
        </Script>
      )}

      {loadDirectAnalytics && gaId && (
        <>
          {/* WHY: quando GTM existe, GA direto não é carregado para evitar pageviews duplicados. */}
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${JSON.stringify(gaId)}, { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {loadClarity && clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,'clarity','script',${JSON.stringify(clarityId)});
            window.clarity('consentv2', {
              ad_Storage: 'denied',
              analytics_Storage: 'granted'
            });
          `}
        </Script>
      )}
    </>
  );
}
