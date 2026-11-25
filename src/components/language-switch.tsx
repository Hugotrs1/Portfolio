import Link from 'next/link';

import type { Dictionary } from '@/i18n';

export function LanguageSwitch({ nav }: { nav: Dictionary['nav'] }) {
  return (
    <Link
      href={nav.switchHref}
      title={nav.switchTitle}
      hrefLang={nav.switchLabel.toLowerCase()}
      className="text-[0.9375rem] opacity-75 transition-opacity duration-150 hover:opacity-100"
    >
      {nav.switchLabel}
    </Link>
  );
}
