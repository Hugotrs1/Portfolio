'use client';

import { AnimatePresence, motion, useAnimate, usePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';

import type { Dictionary } from '@/i18n/types';
import { asset } from '@/lib/base-path';

import { ArrowLeft, ArrowRight, Close } from './icons';
import { Magnetic } from './magnetic';
import { easeOutExpo } from './reveal';

export type Screen = { src: string; title: string; alt: string };

type ScreenViewerProps = {
  project: string;
  screens: Screen[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  getOrigin: (index: number) => DOMRect | undefined;
  labels: Dictionary['projects']['screens'];
};

const flightSpring = { type: 'spring', bounce: 0.18, duration: 0.75 } as const;

const slide = {
  enter: (direction: number) => ({ x: direction >= 0 ? '100%' : '-100%' }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? '-35%' : '35%', opacity: 0.3 }),
};

// Position de l'écran dans la page, sans la transformation appliquée par l'animation.
function layoutRect(element: HTMLElement) {
  const transform = element.style.transform;
  element.style.transform = 'none';
  const rect = element.getBoundingClientRect();
  element.style.transform = transform;
  return rect;
}

function offsetFrom(origin: DOMRect, target: DOMRect) {
  return {
    x: origin.left + origin.width / 2 - (target.left + target.width / 2),
    y: origin.top + origin.height / 2 - (target.top + target.height / 2),
    scale: origin.width / target.width,
  };
}

export function ScreenViewer({
  project,
  screens,
  index,
  onIndexChange,
  onClose,
  getOrigin,
  labels,
}: ScreenViewerProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [isPresent, safeToRemove] = usePresence();
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const screen = screens[index];

  function go(step: number) {
    setDirection(step);
    onIndexChange((index + step + screens.length) % screens.length);
  }

  useLayoutEffect(() => {
    const frame = scope.current.querySelector<HTMLElement>('[data-frame]');
    const origin = getOrigin(index);
    if (!frame || !origin || reduceMotion) return;

    const from = offsetFrom(origin, layoutRect(frame));
    frame.style.transform = `translate(${from.x}px, ${from.y}px) scale(${from.scale})`;
    animate(frame, { x: [from.x, 0], y: [from.y, 0], scale: [from.scale, 1] }, flightSpring);
    // L'ouverture ne se joue qu'une fois, au montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPresent) return;

    const frame = scope.current.querySelector<HTMLElement>('[data-frame]');
    const origin = getOrigin(index);
    if (!frame || !origin || reduceMotion) {
      safeToRemove();
      return;
    }

    const to = offsetFrom(origin, layoutRect(frame));
    Promise.all([
      animate(frame, to, { ...flightSpring, bounce: 0.1, duration: 0.6 }),
      animate('[data-fade]', { opacity: 0 }, { duration: 0.35 }),
    ]).then(safeToRemove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent]);

  useEffect(() => {
    scope.current.querySelector<HTMLElement>('[data-close]')?.focus({ preventScroll: true });

    // Bloque le défilement de la page (Lenis compris) tant que la visionneuse est ouverte.
    const block = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    window.addEventListener('wheel', block, { capture: true, passive: false });
    window.addEventListener('touchmove', block, { capture: true, passive: false });

    return () => {
      window.removeEventListener('wheel', block, { capture: true });
      window.removeEventListener('touchmove', block, { capture: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') go(1);
      else if (event.key === 'ArrowLeft') go(-1);
      else if (event.key === 'Tab') {
        const buttons = [...scope.current.querySelectorAll<HTMLElement>('button')];
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      } else return;
      if (event.key !== 'Tab') event.preventDefault();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div
      ref={scope}
      role="dialog"
      aria-modal="true"
      aria-label={`${project} — ${screen.title}`}
      data-lenis-prevent
      className="fixed inset-0 z-[100]"
    >
      <motion.div
        data-fade
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="bg-ink/95 absolute inset-0 backdrop-blur-sm"
      />

      <motion.button
        data-fade
        data-close
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-paper hover:bg-paper hover:text-ink absolute top-5 right-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[0.95rem] transition-colors duration-300 sm:top-8 sm:right-8"
      >
        {labels.close}
        <Close />
      </motion.button>

      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center gap-8 px-6 py-20 lg:flex-row lg:gap-20">
        <div
          data-frame
          className="pointer-events-auto relative aspect-[6/13] h-[min(62svh,40rem)] shrink-0 rounded-[2.2rem] bg-[#0b0b0a] p-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 lg:h-[min(80svh,46rem)]"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-[#0b0b0a]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={screen.src}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: easeOutExpo }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={asset(screen.src)}
                  alt={screen.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 380px, 60vw"
                  className="object-cover object-top select-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          data-fade
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeOutExpo }}
          className="text-paper pointer-events-auto w-full max-w-xs text-center lg:text-left"
        >
          <p className="label text-paper/50">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            {String(screens.length).padStart(2, '0')}
            <span className="mx-2">—</span>
            {project}
          </p>
          <div aria-live="polite">
            <h3 className="mt-3 font-serif text-3xl leading-none lg:mt-4 lg:text-5xl">
              {screen.title}
            </h3>
            <p className="text-paper/70 mt-4 hidden leading-relaxed lg:block">{screen.alt}</p>
          </div>

          <div className="mt-6 flex justify-center gap-3 lg:mt-10 lg:justify-start">
            <Magnetic>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={labels.previous}
                className="hover:bg-paper hover:text-ink flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={labels.next}
                className="hover:bg-paper hover:text-ink flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-colors duration-300"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
