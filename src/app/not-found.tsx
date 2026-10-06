import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/container';
import { ArrowUpRight } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Page introuvable — Hugo Troussel',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center">
      <Container className="py-24">
        <p className="label text-muted">
          <span className="text-accent">404</span>
          <span className="mx-2">/</span>
          Hugo Troussel
        </p>

        <h1 className="text-accent mt-6 font-serif text-[clamp(8rem,30vw,22rem)] leading-[0.8] italic">
          404
        </h1>

        <div className="border-line mt-12 grid gap-10 border-t pt-8 sm:grid-cols-2">
          <div>
            <p className="font-serif text-3xl sm:text-4xl">Cette page n&apos;existe pas.</p>
            <Link href="/" className="group mt-6 inline-flex items-center gap-2 text-sm">
              <span className="link-underline">Retour à l&apos;accueil</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div lang="en">
            <p className="text-ink-soft font-serif text-3xl sm:text-4xl">
              This page doesn&apos;t exist.
            </p>
            <Link href="/en/" className="group mt-6 inline-flex items-center gap-2 text-sm">
              <span className="link-underline">Back to the homepage</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
