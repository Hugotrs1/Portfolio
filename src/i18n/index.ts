import type { Metadata } from 'next';

import { en } from './en';
import { fr } from './fr';
import type { Dictionary } from './types';

export { en, fr };
export type { Dictionary, Locale } from './types';

const paths = { fr: '/', en: '/en/' } as const;

export function buildMetadata(dict: Dictionary): Metadata {
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { canonical: paths[dict.locale], languages: paths },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      url: paths[dict.locale],
      locale: dict.locale === 'fr' ? 'fr_FR' : 'en_GB',
      type: 'website',
    },
  };
}
