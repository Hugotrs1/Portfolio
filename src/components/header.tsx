'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { person } from '@/data/profile';
import type { Dictionary } from '@/i18n';
import { easeOutExpo } from '@/lib/motion';

import { Container } from './container';
import { LanguageSwitch } from './language-switch';

export function Header({ nav }: { nav: Dictionary['nav'] }) {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | undefined>();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
      setOverHero((document.querySelector('#top')?.getBoundingClientRect().bottom ?? 0) > 64);

      // Section active : la dernière dont le haut a dépassé le tiers de l'écran.
      const line = window.innerHeight * 0.35;
      const reached = nav.items.filter(
        (item) =>
          (document.querySelector(item.href)?.getBoundingClientRect().top ?? Infinity) < line,
      );
      setActive(reached.at(-1)?.href);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [nav.items]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const dark = overHero && !open;
  const surface = dark
    ? `text-paper ${scrolled ? 'bg-ink border-white/10' : 'border-transparent'}`
    : 'text-ink bg-paper border-line';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${surface}`}
      >
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="text-lg font-medium" onClick={() => setOpen(false)}>
            {person.name}
          </a>

          <nav aria-label={nav.label} className="hidden items-center gap-6 md:flex">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? 'location' : undefined}
                className={`text-[0.9375rem] underline-offset-8 transition-opacity duration-150 hover:opacity-100 ${
                  active === item.href ? 'underline decoration-2' : 'opacity-75'
                }`}
              >
                {item.label}
              </a>
            ))}
            <LanguageSwitch nav={nav} />
            <a
              href={person.cvPath}
              target="_blank"
              rel="noreferrer noopener"
              className={`inline-flex h-9 items-center rounded-lg px-4 text-[0.9375rem] font-medium transition-colors duration-150 ${
                dark ? 'bg-paper text-ink hover:bg-white' : 'bg-ink text-paper hover:bg-ink-raised'
              }`}
            >
              {nav.cv}
            </a>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitch nav={nav} />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 h-11 px-2 text-[0.9375rem] font-medium"
            >
              {open ? nav.close : nav.open}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: easeOutExpo }}
            className="bg-paper fixed inset-0 z-40 overflow-y-auto pt-20 md:hidden"
          >
            <Container>
              <nav aria-label={nav.mobileLabel} className="flex flex-col">
                {[...nav.items, { label: nav.cv, href: person.cvPath }].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-line border-b py-4 text-2xl"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
