import './globals.css';

import { Provider as ChakraProvider } from '@/components/ui/provider';
import { Geist, Geist_Mono } from 'next/font/google';
import StoreProvider from '@/store/provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'RankMatrix',
  description:
    'A free tool for JoSAA Aspirants to help choose thier dream college',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
