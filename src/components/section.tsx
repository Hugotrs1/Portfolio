import type { PropsWithChildren, ReactNode } from 'react';

import { Container } from './container';

type SectionProps = PropsWithChildren<{
  id: string;
  label: string;
  title: string;
  intro?: ReactNode;
}>;

export function Section({ id, label, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-y-4 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-muted flex items-start gap-3 lg:col-span-3 lg:pt-2">
            <span aria-hidden className="bay-mark text-ink" />
            {label}
          </p>
          <div className="lg:col-span-9">
            <h2
              id={`${id}-title`}
              className="max-w-3xl text-[2rem] leading-[1.1] font-medium tracking-[-0.02em] text-balance sm:text-[2.75rem]"
            >
              {title}
            </h2>
            {intro ? (
              <p className="text-ink-soft mt-4 max-w-xl text-lg leading-[1.6] text-pretty">
                {intro}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}
