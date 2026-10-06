import Image from "next/image";

import { skillLevels, skills } from "@/data/skills";
import { asset } from "@/lib/base-path";

import { Reveal } from "./reveal";

export function Skills() {
  return (
    <div>
      {skillLevels.map((level, levelIndex) => {
        const items = skills.filter((skill) => skill.level === level);
        const filled = skillLevels.length - levelIndex;

        return (
          <Reveal
            key={level}
            delay={levelIndex * 0.08}
            className="grid gap-6 border-t border-line py-8 last:border-b lg:grid-cols-12 lg:gap-8"
          >
            <div className="flex items-center gap-4 lg:col-span-3">
              <span className="flex gap-1" aria-hidden>
                {skillLevels.map((_, index) => (
                  <span
                    key={index}
                    className={`h-3 w-1 ${index < filled ? "bg-accent" : "bg-line"}`}
                  />
                ))}
              </span>
              <h3 className="label text-muted">{level}</h3>
            </div>

            <ul className="flex flex-wrap gap-x-10 gap-y-6 lg:col-span-9">
              {items.map((skill) => (
                <li key={skill.name} className="group flex items-center gap-3">
                  <Image
                    src={asset(skill.icon)}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 grayscale transition duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <span className="font-serif text-3xl">{skill.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}
