'use client';

import { motion, useInView, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

import { easeOutExpo } from './reveal';

const tilt = { stiffness: 150, damping: 20 };

// Fenêtre de navigateur : l'adresse se tape, la page « charge », et la fenêtre suit la souris.
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const rotateX = useSpring(0, tilt);
  const rotateY = useSpring(0, tilt);

  const done = reduceMotion || typed >= url.length;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let count = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        count += 1;
        setTyped(count);
        if (count >= url.length) clearInterval(interval);
      }, 75);
    }, 500);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [inView, reduceMotion, url]);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 7);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div ref={ref} className="[perspective:1400px]">
      <motion.div
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        className="ring-line overflow-hidden rounded-lg bg-[#e3ddd0] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)] ring-1"
      >
        <div className="flex items-center gap-1.5 px-4 py-3" aria-hidden>
          <span className="bg-ink/15 h-2.5 w-2.5 rounded-full" />
          <span className="bg-ink/15 h-2.5 w-2.5 rounded-full" />
          <span className="bg-ink/15 h-2.5 w-2.5 rounded-full" />
          <span className="bg-paper/70 text-muted ml-4 flex h-6 max-w-64 flex-1 items-center rounded px-3 font-mono text-[0.8rem]">
            {reduceMotion ? url : url.slice(0, typed)}
            {done ? null : <span className="bg-accent ml-px h-3.5 w-px animate-pulse" />}
          </span>
        </div>
        <div className="relative">
          <motion.div
            initial={false}
            animate={{ opacity: done ? 1 : 0.25, filter: done ? 'blur(0px)' : 'blur(6px)' }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            {children}
          </motion.div>
          <motion.span
            aria-hidden
            initial={false}
            animate={{ scaleX: done ? 1 : 0, opacity: done ? 0 : 1 }}
            transition={{
              scaleX: { duration: 0.7, ease: easeOutExpo },
              opacity: { duration: 0.4, delay: 0.6 },
            }}
            className="bg-accent absolute inset-x-0 top-0 h-0.5 origin-left"
          />
        </div>
      </motion.div>
    </div>
  );
}
