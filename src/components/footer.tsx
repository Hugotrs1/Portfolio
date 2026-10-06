import { person } from "@/data/profile";

import { Container } from "./container";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <Container>
        <div className="label flex flex-col justify-between gap-4 border-t border-paper/15 py-8 text-paper/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <p>Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
          <a href="#top" className="link-underline self-start text-paper sm:self-auto">
            Retour en haut
          </a>
        </div>
      </Container>
      <p
        aria-hidden
        className="select-none whitespace-nowrap text-center font-serif text-[15vw] leading-[0.75] tracking-tight text-paper/[0.06]"
      >
        Hugo Troussel
      </p>
    </footer>
  );
}
