import Image from 'next/image';

import { nowItems } from '@/data/now';
import type { Dictionary } from '@/i18n';

export function Now({ texts }: { texts: Dictionary['now'] }) {
  return (
    <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
      {nowItems.map((item) => (
        <li key={item.id} className="group">
          <div className="bg-paper-deep relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={item.image}
              alt={texts[item.id].alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
            />
          </div>
          <h3 className="mt-5 text-2xl leading-8">{texts[item.id].title}</h3>
          <p className="text-ink-soft mt-2 leading-[1.6]">{texts[item.id].body}</p>
        </li>
      ))}
    </ul>
  );
}
