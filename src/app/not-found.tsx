import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Page introuvable | Hugo Troussel',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="bg-ink text-paper flex min-h-svh items-center">
      <Container className="py-24">
        <p className="text-on-ink-soft flex items-start gap-3">
          <span aria-hidden className="bay-mark text-paper" />
          404
        </p>

        <div className="mt-6 grid gap-12 sm:grid-cols-2">
          <div>
            <h1 className="text-[2rem] leading-[1.1] font-medium tracking-[-0.02em] sm:text-[2.75rem]">
              Cette place est vide
            </h1>
            <p className="text-on-ink-soft mt-4">La page demandée n&apos;existe pas</p>
            <Link href="/" className="link-underline mt-6 inline-block">
              Retour à l&apos;accueil
            </Link>
          </div>
          <div lang="en">
            <p className="text-[2rem] leading-[1.1] font-medium tracking-[-0.02em] sm:text-[2.75rem]">
              This spot is empty
            </p>
            <p className="text-on-ink-soft mt-4">The page you asked for doesn&apos;t exist</p>
            <Link href="/en/" className="link-underline mt-6 inline-block">
              Back to the homepage
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
