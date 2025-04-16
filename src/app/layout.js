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
  title: 'RankMatrix',
  description: 'A free tool for JoSAA Aspirants to help choose thier dream college',
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
