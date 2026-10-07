'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { person } from '@/data/profile';
import type { Dictionary } from '@/i18n';
import { asset } from '@/lib/base-path';

import { Container } from './container';
import { easeOutExpo } from './reveal';

export function Header({ nav }: { nav: Dictionary['nav'] }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 24);
    setHidden(current > previous && current > 240);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const languageSwitch = (
    <Link
      href={nav.switchHref}
      title={nav.switchTitle}
      hrefLang={nav.switchLabel.toLowerCase()}
      className="label text-muted hover:text-ink transition-colors"
    >
      {nav.switchLabel}
    </Link>
  );

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? 'border-line bg-paper/85 border-b backdrop-blur-md' : ''
        }`}
      >
        <Container className="flex h-16 items-center justify-between">
          <a
            href="#top"
            className="font-serif text-2xl leading-none"
            onClick={() => setOpen(false)}
          >
            {person.name}
          </a>

          <nav aria-label={nav.label} className="hidden items-center gap-8 md:flex">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-ink-soft hover:text-ink text-[0.95rem]"
              >
                {item.label}
              </a>
            ))}
            {languageSwitch}
            <a
              href={asset(person.cvPath)}
              target="_blank"
              rel="noreferrer noopener"
              className="border-ink hover:bg-ink hover:text-paper rounded-full border px-4 py-1.5 text-[0.95rem] transition-colors duration-300"
            >
              {nav.cv}
            </a>
          </nav>

          <div className="relative z-10 flex items-center gap-6 md:hidden">
            {languageSwitch}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="label"
            >
              {open ? nav.close : nav.open}
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="bg-paper fixed inset-0 z-40 flex flex-col justify-end pb-12 md:hidden"
          >
            <Container>
              <nav aria-label={nav.mobileLabel} className="border-line flex flex-col border-t">
                {[...nav.items, { label: nav.cv, href: asset(person.cvPath) }].map(
                  (item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.15 + index * 0.05, ease: easeOutExpo }}
                      className="border-line flex items-baseline justify-between border-b py-4 font-serif text-4xl"
                    >
                      {item.label}
                      <span className="label text-muted">0{index + 1}</span>
                    </motion.a>
                  ),
                )}
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
