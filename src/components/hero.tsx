'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { person } from '@/data/profile';

import { Container } from './container';
import { ArrowDown } from './icons';
import { easeOutExpo } from './reveal';
import { SplitText } from './split-text';

const highlights = [
  { term: 'Actuellement', detail: 'Alternance chez Agelid' },
  { term: 'Projet phare', detail: 'GarezVous, en production sur iOS, Android et web' },
  { term: 'Formation', detail: 'Bac+2 obtenu, Bachelor (Bac+3) en cours au CESI' },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: easeOutExpo },
  });

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
      <Container>
        <motion.div
          {...fadeIn(0.1)}
          className="label text-muted flex flex-wrap items-center gap-x-8 gap-y-2"
        >
          <span className="text-ink inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
            </span>
            {person.status}
          </span>
          <span>{person.location}</span>
          <span>Bachelor CESI Rouen</span>
        </motion.div>

        <motion.h1
          style={{ y: titleY }}
          className="mt-10 font-serif leading-[0.85] tracking-[-0.02em]"
        >
          <SplitText
            immediate
            delay={0.2}
            text={person.firstName}
            className="block text-[clamp(4.5rem,15vw,14rem)]"
          />
          <SplitText
            immediate
            delay={0.35}
            text={person.lastName}
            className="text-accent block pl-[8vw] text-[clamp(4.5rem,15vw,14rem)] italic"
          />
        </motion.h1>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-8 lg:col-span-6">
            <motion.p {...fadeIn(0.6)} className="text-ink-soft max-w-lg text-lg leading-relaxed">
              <span className="text-ink">
                {person.role} — {person.stack}.
              </span>{' '}
              {person.introduction}
            </motion.p>

            <motion.div {...fadeIn(0.75)} className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#projets"
                className="group bg-ink text-paper hover:bg-accent inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm transition-colors duration-300"
              >
                Voir les projets
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
              </a>
              <a href={`mailto:${person.email}`} className="link-underline text-sm">
                {person.email}
              </a>
            </motion.div>
          </div>

          <motion.dl {...fadeIn(0.85)} className="lg:col-span-5 lg:col-start-8">
            {highlights.map((item) => (
              <div
                key={item.term}
                className="border-line grid grid-cols-3 gap-4 border-t py-4 last:border-b"
              >
                <dt className="label text-muted pt-0.5">{item.term}</dt>
                <dd className="col-span-2">{item.detail}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </Container>
    </section>
  );
}
