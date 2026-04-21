import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { RankMatrixLayout } from '@/components/RankMatrixLayout';
import StoreProvider from '@/store/provider';
import { ThemeProviderWrapper } from '@/theme/ThemeContext';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const SITE_URL = 'https://rankmatrix.in';
const SITE_NAME = 'RankMatrix';
const SITE_TAGLINE = 'Free JEE college predictor with official JoSAA data';
const SITE_DESCRIPTION =
  'Free JEE Main & Advanced college predictor for JoSAA counselling. Explore opening and closing ranks, seat matrix, participating colleges and branches using official JoSAA data. No signup, no phone number, no email, and zero marketing spam — ever.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: '%s | RankMatrix',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Divyansh Agarwal' }],
  creator: 'Divyansh Agarwal',
  publisher: 'RankMatrix',
  keywords: [
    'JoSAA counselling',
    'JEE Main college predictor',
    'JEE Advanced college predictor',
    'JoSAA cutoff',
    'JoSAA opening closing rank',
    'JoSAA seat matrix',
    'Free JEE rank predictor',
    'IIT NIT IIIT GFTI counselling',
    'Engineering admission India',
    'JEE rank to college',
    'RankMatrix',
  ],
  category: 'education',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@rankmatrix',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-9885608075288305',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: SITE_DESCRIPTION,
  founder: { '@type': 'Person', name: 'Divyansh Agarwal' },
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
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-IN',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/colleges?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AppRouterCacheProvider options={{ enableCssLayer: false, key: 'mui' }}>
          <StoreProvider>
            <ThemeProviderWrapper>
              <RankMatrixLayout>{children}</RankMatrixLayout>
            </ThemeProviderWrapper>
          </StoreProvider>
        </AppRouterCacheProvider>
        {process.env.NEXT_PUBLIC_GOOGLE_MANAGMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_MANAGMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_AD_ID && (
          <Script
            id="google-adsense"
            strategy="afterInteractive"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_AD_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
