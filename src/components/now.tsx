'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { nowItems } from '@/data/now';
import type { Dictionary } from '@/i18n';
import { asset } from '@/lib/base-path';

import { easeOutExpo, Reveal } from './reveal';

const curtain = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: (index: number) => ({
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1.3, delay: index * 0.12, ease: easeOutExpo },
  }),
};

const zoom = {
  hidden: { scale: 1.3 },
  visible: (index: number) => ({
    scale: 1,
    transition: { duration: 1.8, delay: index * 0.12, ease: easeOutExpo },
  }),
};

export function Now({ texts }: { texts: Dictionary['now'] }) {
  return (
    <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
      {nowItems.map((item, index) => (
        <motion.li
          key={item.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          custom={index}
          className={`group ${index === 1 ? 'md:mt-24' : ''}`}
        >
          <motion.div
            custom={index}
            variants={curtain}
            className="bg-paper-deep relative aspect-[4/5] overflow-hidden"
          >
            <motion.div custom={index} variants={zoom} className="absolute inset-0">
              <Image
                src={asset(item.image)}
                alt={texts[item.id].alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="photo object-cover"
              />
            </motion.div>
          </motion.div>
          <Reveal delay={0.2 + index * 0.1}>
            <p className="label text-accent mt-5">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-serif text-3xl">{texts[item.id].title}</h3>
            <p className="text-ink-soft mt-3 leading-relaxed">{texts[item.id].body}</p>
          </Reveal>
        </motion.li>
      ))}
    </ul>
  );
}
