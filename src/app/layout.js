import { Fraunces, Manrope } from 'next/font/google';
import '@/styles/tokens.css';
import Script from 'next/script';
import { AnalyticsInteractions } from '@/components/AnalyticsInteractions';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { RankMatrixLayout } from '@/components/RankMatrixLayout';
import { SiteInteractions } from '@/components/SiteInteractions';
import { ADSENSE_CLIENT_ID } from '@/constants';
import StoreProvider from '@/store/provider';
import { analyticsBootstrap } from '@/utils/analyticsTransport.mjs';
import { serializeJsonLd } from '@/utils/jsonLd';
import {
  buildMetadata,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
  SITE_URL,
} from '@/utils/metadata.mjs';

const manrope = Manrope({ variable: '--font-body', subsets: ['latin'], display: 'swap' });
const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  // Used above the fold in the hero and workspace; fetch with the body font.
  preload: true,
});

const SITE_DESCRIPTION = HOME_DESCRIPTION;

export const metadata = {
  ...buildMetadata({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${HOME_TITLE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  authors: [{ name: 'Divyansh Agarwal' }],
  creator: 'Divyansh Agarwal',
  publisher: SITE_NAME,
  category: 'education',
  other: { 'google-adsense-account': ADSENSE_CLIENT_ID },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#141816',
};

const FOUNDER = {
  '@type': 'Person',
  name: 'Divyansh Agarwal',
  url: 'https://www.linkedin.com/in/ag-divyansh/',
  sameAs: ['https://github.com/nikkuAg', 'https://www.linkedin.com/in/ag-divyansh/'],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: SITE_DESCRIPTION,
  founder: FOUNDER,
  foundingDate: '2025',
  areaServed: 'IN',
  knowsAbout: [
    'JoSAA counselling',
    'JEE Main',
    'JEE Advanced',
    'Engineering admissions in India',
    'IIT admissions',
    'NIT admissions',
    'IIIT admissions',
    'GFTI admissions',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${fraunces.variable}`}>
        {analyticsBootstrap(process.env.NEXT_PUBLIC_GA_ID) && (
          <script
            id="rankmatrix-analytics-init"
            dangerouslySetInnerHTML={{
              __html: analyticsBootstrap(process.env.NEXT_PUBLIC_GA_ID),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
        <StoreProvider>
          <RankMatrixLayout footer={<Footer />} navigation={<Navbar />}>
            {children}
          </RankMatrixLayout>
        </StoreProvider>
        <SiteInteractions />
        {analyticsBootstrap(process.env.NEXT_PUBLIC_GA_ID) && (
          <>
            <AnalyticsInteractions />
            <Script
              id="rankmatrix-analytics"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
          </>
        )}
        {process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true' && (
          <Script
            id="google-adsense"
            strategy="afterInteractive"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
