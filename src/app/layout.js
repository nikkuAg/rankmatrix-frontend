import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { RankMatrixLayout } from '@/components/RankMatrixLayout';
import { ADSENSE_CLIENT_ID } from '@/constants';
import StoreProvider from '@/store/provider';
import { ThemeProviderWrapper } from '@/theme/ThemeContext';
import { serializeJsonLd } from '@/utils/jsonLd';
import {
  buildMetadata,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
  SITE_URL,
} from '@/utils/metadata.mjs';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
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
      <body className={poppins.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
        <AppRouterCacheProvider options={{ enableCssLayer: false, key: 'mui' }}>
          <StoreProvider>
            <ThemeProviderWrapper>
              <RankMatrixLayout>{children}</RankMatrixLayout>
            </ThemeProviderWrapper>
          </StoreProvider>
        </AppRouterCacheProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
