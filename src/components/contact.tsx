import { person } from '@/data/profile';
import type { Dictionary } from '@/i18n';

import { ContactForm } from './contact-form';
import { CopyEmail } from './copy-email';
import { Container } from './container';
import { ArrowUpRight } from './icons';

export function Contact({ contact }: { contact: Dictionary['contact'] }) {
  const links = [
    { label: 'GitHub', href: person.github },
    { label: 'LinkedIn', href: person.linkedin },
    { label: contact.cvLabel, href: person.cvPath },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink text-paper">
      <Container className="py-16 sm:py-24">
        <p className="text-on-ink-soft flex items-start gap-3">
          <span aria-hidden className="bay-mark text-paper" />
          {contact.label}
        </p>

        <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2
              id="contact-title"
              className="text-[2rem] leading-[1.1] font-medium tracking-[-0.02em] text-balance sm:text-[2.75rem]"
            >
              {contact.title}
            </h2>
            <p className="text-on-ink-soft mt-4 max-w-md leading-[1.6]">{contact.intro}</p>

            <a
              href={`mailto:${person.email}`}
              className="link-underline mt-8 inline-block text-2xl"
            >
              {person.email}
            </a>
            <div className="mt-2">
              <CopyEmail email={person.email} copy={contact.copy} copied={contact.copied} />
            </div>

            <ul className="mt-8 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2"
                  >
                    <span className="link-underline">{link.label}</span>
                    <ArrowUpRight className="text-on-ink-muted h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm t={contact.form} />
          </div>
        </div>
      </Container>
    </section>
  );
}
