'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import type { Dictionary } from '@/i18n';

import { easeOutExpo } from './reveal';

// Le rideau se ferme sur la page quittée, puis se rouvre sur la nouvelle.
const storageKey = 'language-curtain';

function Curtain({ word, onDone }: { word: string; onDone?: () => void }) {
  return (
    <motion.div
      aria-hidden
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      onAnimationComplete={onDone}
      className="bg-ink text-paper fixed inset-0 z-[120] flex items-center justify-center"
    >
      <motion.span
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
        className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-none italic"
      >
        {word}
      </motion.span>
    </motion.div>
  );
}

export function LanguageSwitch({ nav }: { nav: Dictionary['nav'] }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (reduceMotion || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }
    event.preventDefault();
    try {
      sessionStorage.setItem(storageKey, nav.switchName);
    } catch {}
    router.prefetch(nav.switchHref);
    setLeaving(true);
  }

  return (
    <>
      <Link
        href={nav.switchHref}
        title={nav.switchTitle}
        hrefLang={nav.switchLabel.toLowerCase()}
        onClick={onClick}
        className="label text-muted hover:text-ink transition-colors"
      >
        {nav.switchLabel}
      </Link>
      {leaving
        ? createPortal(
            <Curtain word={nav.switchName} onDone={() => router.push(nav.switchHref)} />,
            document.body,
          )
        : null}
    </>
  );
}

export function LanguageCurtain() {
  const [word, setWord] = useState<string | null>(null);

  useLayoutEffect(() => {
    try {
      const stored = sessionStorage.getItem(storageKey);
      sessionStorage.removeItem(storageKey);
      // Lu au montage : la page arrive d'un changement de langue.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setWord(stored);
    } catch {}
  }, []);

  useLayoutEffect(() => {
    if (!word) return;
    const timeout = setTimeout(() => setWord(null), 250);
    return () => clearTimeout(timeout);
  }, [word]);

  return (
    <AnimatePresence>
      {word ? (
        <motion.div
          key="curtain"
          aria-hidden
          initial={false}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
          className="bg-ink text-paper fixed inset-0 z-[120] flex items-center justify-center"
        >
          <motion.span
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-none italic"
          >
            {word}
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
