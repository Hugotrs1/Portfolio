import { person } from '@/data/profile';

import { Container } from './container';

export function Footer({ backToTop }: { backToTop: string }) {
  return (
    <footer className="bg-ink text-paper">
      <Container>
        <div className="label text-on-ink-muted flex flex-col justify-between gap-3 border-t border-white/10 py-8 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <p>Next.js, TypeScript, Tailwind CSS, Framer Motion</p>
          <a href="https://hugotrs.fr" className="link-underline text-paper self-start">
            hugotrs.fr
          </a>
          <a href="#top" className="link-underline text-paper self-start">
            {backToTop}
          </a>
        </div>
      </Container>
    </footer>
  );
}
