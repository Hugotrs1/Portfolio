'use client';

import { useEffect, useState } from 'react';

import { Check } from './icons';

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
      className="label text-on-ink-soft hover:text-paper inline-flex items-center gap-2 transition-colors duration-150"
    >
      {done ? <Check className="h-4 w-4" /> : null}
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  );
}
