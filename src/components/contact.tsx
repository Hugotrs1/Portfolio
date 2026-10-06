import { person } from '@/data/profile';
import type { Dictionary } from '@/i18n';
import { asset } from '@/lib/base-path';

import { ContactForm } from './contact-form';
import { Container } from './container';
import { ArrowUpRight } from './icons';
import { Reveal } from './reveal';
import { SplitText } from './split-text';

export function Contact({ contact }: { contact: Dictionary['contact'] }) {
  const links = [
    { label: 'GitHub', href: person.github },
    { label: 'LinkedIn', href: person.linkedin },
    { label: contact.cvLabel, href: asset(person.cvPath) },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink text-paper">
      <Container className="py-24 sm:py-32">
        <p className="label text-paper/50">
          <span className="text-accent">06</span>
          <span className="mx-2">/</span>
          {contact.label}
        </p>

        <SplitText
          as="h2"
          id="contact-title"
          text={contact.title}
          className="mt-8 max-w-5xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        />

        <Reveal delay={0.2} className="mt-10">
          <a
            href={`mailto:${person.email}`}
            className="group text-accent inline-flex items-center gap-4 font-serif text-3xl italic sm:text-5xl"
          >
            <span className="link-underline">{person.email}</span>
            <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-8 sm:w-8" />
          </a>
        </Reveal>

        <div className="border-paper/15 mt-24 grid gap-16 border-t pt-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="text-paper/70 max-w-xs leading-relaxed">{contact.intro}</p>
            <ul className="mt-10 space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2"
                  >
                    <span className="link-underline">{link.label}</span>
                    <ArrowUpRight className="text-paper/50 group-hover:text-accent h-3.5 w-3.5 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <ContactForm t={contact.form} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
