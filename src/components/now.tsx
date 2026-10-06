import Image from "next/image";

import { nowItems } from "@/data/now";
import { asset } from "@/lib/base-path";

import { Reveal } from "./reveal";

export function Now() {
  return (
    <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
      {nowItems.map((item, index) => (
        <li key={item.title} className={index === 1 ? "md:mt-24" : ""}>
          <Reveal delay={index * 0.1} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
              <Image
                src={asset(item.image.src)}
                alt={item.image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="photo object-cover"
              />
            </div>
            <p className="label mt-5 text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-serif text-3xl">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
