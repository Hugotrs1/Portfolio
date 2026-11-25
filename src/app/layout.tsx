import type { Metadata } from 'next';
import { Schibsted_Grotesk } from 'next/font/google';

import { Providers } from '@/components/providers';
import './globals.css';

const schibstedGrotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.hugotrs.fr/'),
  title: 'Hugo Troussel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${schibstedGrotesk.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
