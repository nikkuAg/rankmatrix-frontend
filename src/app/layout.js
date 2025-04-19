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

export const metadata = {
  title: 'RankMatrix Dashboard – Your Gateway to JoSAA Insights',
  description:
    'Navigate through colleges, branches, rank trends, seat matrix, and get personalized college predictions based on your JEE Mains/Advanced rank.',
  openGraph: {
    title: 'RankMatrix Dashboard – Explore Colleges & Predict Your Future',
    description:
      'Explore JoSAA participating institutes, rank trends, and use our prediction tool to find the best college and branch for you.',
    url: 'https://rankmatrix.in/dashboard',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RankMatrix Dashboard',
    description: 'Explore JoSAA data and find your dream college with our JEE Main rank predictor.',
  },
  keywords: [
    'JoSAA',
    'JOSAA counselling',
    'JEE College Predictor',
    'Seat Matrix',
    'Opening and Closing Rank',
    'Participating Colleges',
    'Engineering Admission',
    'Rank Trends',
  ],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MANAGMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_MANAGMENT_ID}');
          `}
      </Script>
      <Script
        strategy="afterInteractive"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_AD_ID}`}
        crossOrigin="anonymous"
      />
      <body className={`${poppins.variable}`}>
        <StoreProvider>
          <ThemeProviderWrapper>
            <RankMatrixLayout>{children}</RankMatrixLayout>
          </ThemeProviderWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
