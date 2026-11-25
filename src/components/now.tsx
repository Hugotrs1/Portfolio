import { nowItems } from '@/data/now';
import type { Dictionary } from '@/i18n';

export function Now({ texts }: { texts: Dictionary['now'] }) {
  return (
    <ul>
      {nowItems.map((id) => (
        <li
          key={id}
          className="border-line grid gap-x-8 gap-y-2 border-t py-6 last:border-b lg:grid-cols-12"
        >
          <h3 className="text-xl leading-7 lg:col-span-3">{texts[id].title}</h3>
          <p className="text-ink-soft max-w-2xl leading-[1.6] lg:col-span-9">{texts[id].body}</p>
        </li>
      ))}
    </ul>
  );
}
