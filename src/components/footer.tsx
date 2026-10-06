import { person } from '@/data/profile';

import { Container } from './container';

export function Footer() {
  return (
    <footer className="bg-ink text-paper overflow-hidden">
      <Container>
        <div className="label border-paper/15 text-paper/50 flex flex-col justify-between gap-4 border-t py-8 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <p>Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
          <a href="#top" className="link-underline text-paper self-start sm:self-auto">
            Retour en haut
          </a>
        </div>
      </Container>
      <p
        aria-hidden
        className="text-paper/[0.06] text-center font-serif text-[15vw] leading-[0.75] tracking-tight whitespace-nowrap select-none"
      >
        Hugo Troussel
      </p>
    </footer>
  );
}
