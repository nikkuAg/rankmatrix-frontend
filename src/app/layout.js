import { Poppins } from 'next/font/google';

import { ThemeProviderWrapper } from '../theme/ThemeContext';
import StoreProvider from '../store/provider';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'RankMatrix',
  description:
    'A free tool for JoSAA Aspirants to help choose thier dream college',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <StoreProvider>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
