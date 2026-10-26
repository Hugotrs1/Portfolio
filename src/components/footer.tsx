'use client';

import { motion } from 'framer-motion';

import { person } from '@/data/profile';

import { Container } from './container';
import { ArrowLeft } from './icons';
import { easeOutExpo } from './reveal';

const letter = {
  hidden: { y: '130%' },
  visible: (index: number) => ({
    y: '0%',
    transition: { duration: 1.2, delay: index * 0.04, ease: easeOutExpo },
  }),
};

export function Footer({ backToTop }: { backToTop: string }) {
  return (
    <footer className="bg-ink text-paper overflow-hidden">
      <Container>
        <div className="label border-paper/15 text-paper/50 flex flex-col justify-between gap-4 border-t py-8 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <p>Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
          <a
            href="https://hugotrs.fr"
            className="group text-paper inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <ArrowLeft className="h-3 w-3 transition-transform duration-500 group-hover:-translate-x-1" />
            <span className="link-underline">hugotrs.fr</span>
          </a>
          <a href="#top" className="link-underline text-paper self-start sm:self-auto">
            {backToTop}
          </a>
        </div>
      </Container>
      <motion.p
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="text-paper/[0.06] pointer-events-none text-center font-serif text-[15vw] leading-[0.75] tracking-tight whitespace-nowrap select-none"
      >
        {[...person.name].map((character, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letter}
            className="inline-block whitespace-pre"
          >
            {character}
          </motion.span>
        ))}
      </motion.p>
    </footer>
  );
}
