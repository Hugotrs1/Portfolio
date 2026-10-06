import type { PropsWithChildren, ReactNode } from 'react';

import { Container } from './container';
import { Reveal } from './reveal';
import { SplitText } from './split-text';

type SectionProps = PropsWithChildren<{
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: ReactNode;
}>;

export function Section({ id, index, label, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-24 sm:py-32">
      <Container>
        <div className="border-line grid gap-y-6 border-t pt-6 lg:grid-cols-12 lg:gap-x-8">
          <p className="label text-muted lg:col-span-3">
            <span className="text-accent">{index}</span>
            <span className="mx-2">/</span>
            {label}
          </p>
          <div className="lg:col-span-9">
            <SplitText
              as="h2"
              id={`${id}-title`}
              text={title}
              className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            />
            {intro ? (
              <Reveal delay={0.15} className="text-ink-soft mt-6 max-w-xl text-lg leading-relaxed">
                {intro}
              </Reveal>
            ) : null}
          </div>
        </div>
        <div className="mt-16 sm:mt-20">{children}</div>
      </Container>
    </section>
  );
}
