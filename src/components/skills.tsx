'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { skillLevels, skills } from '@/data/skills';
import type { Dictionary } from '@/i18n';
import { asset } from '@/lib/base-path';

import { easeOutExpo, Reveal } from './reveal';

const bar = {
  empty: { scaleY: 0 },
  filled: (delay: number) => ({
    scaleY: 1,
    transition: { duration: 0.7, delay: 0.3 + delay, ease: easeOutExpo },
  }),
};

export function Skills({ levels }: { levels: Dictionary['skills']['levels'] }) {
  return (
    <div>
      {skillLevels.map((level, levelIndex) => {
        const items = skills.filter((skill) => skill.level === level);
        const filled = skillLevels.length - levelIndex;

        return (
          <Reveal
            key={level}
            delay={levelIndex * 0.08}
            className="border-line grid gap-6 border-t py-8 last:border-b lg:grid-cols-12 lg:gap-8"
          >
            <div className="flex items-center gap-4 lg:col-span-3">
              <motion.span
                aria-hidden
                initial="empty"
                whileInView="filled"
                viewport={{ once: true, margin: '-10% 0px' }}
                className="flex gap-1"
              >
                {skillLevels.map((_, index) => (
                  <span key={index} className="bg-line relative h-4 w-1 overflow-hidden">
                    {index < filled ? (
                      <motion.span
                        custom={levelIndex * 0.1 + index * 0.15}
                        variants={bar}
                        className="bg-accent absolute inset-0 origin-bottom"
                      />
                    ) : null}
                  </span>
                ))}
              </motion.span>
              <h3 className="label text-muted">{levels[level]}</h3>
            </div>

            <ul className="flex flex-wrap gap-x-10 gap-y-6 lg:col-span-9">
              {items.map((skill) => (
                <li key={skill.name} className="group flex items-center gap-3">
                  <Image
                    src={asset(skill.icon)}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 grayscale transition duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:grayscale-0"
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
