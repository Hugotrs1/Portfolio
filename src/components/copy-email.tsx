'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Check } from './icons';
import { easeOutExpo } from './reveal';

export function CopyEmail({
  email,
  copy,
  copied,
}: {
  email: string;
  copy: string;
  copied: string;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const timeout = setTimeout(() => setDone(false), 2200);
    return () => clearTimeout(timeout);
  }, [done]);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="label text-paper/60 hover:text-paper relative inline-flex h-5 items-center overflow-hidden transition-colors"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={done ? 'copied' : 'copy'}
          aria-live="polite"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '-110%' }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
          className={`inline-flex items-center gap-2 ${done ? 'text-accent' : ''}`}
        >
          {done ? <Check /> : null}
          {done ? copied : copy}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
