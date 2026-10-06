'use client';

import { useEffect } from 'react';

import type { Locale } from '@/i18n';

// Le layout racine est commun aux deux langues (export statique) : on ajuste <html lang>.
export function DocumentLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
