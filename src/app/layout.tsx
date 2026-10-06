import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hugotrs1.github.io/Portfolio"),
  title: "Hugo Troussel — Développeur informatique (Flutter & Java)",
  description:
    "Portfolio de Hugo Troussel, développeur informatique en alternance chez Agelid. Refonte de GarezVous (Flutter), projets et dépôts GitHub.",
  openGraph: {
    title: "Hugo Troussel — Développeur informatique",
    description: "Développeur informatique en alternance — Flutter & Java.",
    url: "https://hugotrs1.github.io/Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
