'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useRef } from 'react';

const words = ['Flutter', 'Java', 'Dart', 'JSP', 'JavaScript', 'PHP', 'SQL', 'Python', 'Git'];

// Pourcentage de la piste parcouru par seconde, sans défilement de la page.
const baseSpeed = 1.25;

export function Marquee() {
  const sequence = [...words, ...words];
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const x = useTransform(progress, (value) => `${value}%`);

  // Le bandeau accélère avec le scroll et change de sens quand on remonte.
  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const extra = boost.get();
    if (extra < 0) direction.current = -1;
    else if (extra > 0) direction.current = 1;

    const step = direction.current * baseSpeed * (1 + Math.abs(extra)) * (delta / 1000);
    const next = progress.get() - step;
    progress.set((((next % 50) + 50) % 50) - 50);
  });

  return (
    <div className="border-line overflow-hidden border-y py-6" aria-hidden>
      <motion.div style={{ x }} className="flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {sequence.map((word, index) => (
              <span key={`${copy}-${index}`} className="flex items-center">
                <span className="px-8 font-serif text-4xl italic sm:text-5xl">{word}</span>
                <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
