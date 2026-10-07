'use client';

import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { asset } from '@/lib/base-path';
import type { Dictionary, ProjectText } from '@/i18n/types';
import type { Project } from '@/types';

import { BrowserFrame } from './browser-frame';
import { ArrowUpRight } from './icons';
import { Reveal } from './reveal';
import { ScreenViewer, type Screen } from './screen-viewer';

type FeaturedProjectProps = {
  project: Project;
  text: ProjectText;
  labels: Dictionary['projects'];
};

export function FeaturedProject({ project, text, labels }: FeaturedProjectProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const coverY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const offsets = [
    useTransform(scrollYProgress, [0, 1], [60, -60]),
    useTransform(scrollYProgress, [0, 1], [140, -140]),
    useTransform(scrollYProgress, [0, 1], [90, -90]),
  ];
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [hidden, setHidden] = useState<number | null>(null);
  const screens: Screen[] = (project.screens ?? []).map((src, index) => ({
    src,
    title: text.screenTitles?.[index] ?? '',
    alt: text.screenAlts?.[index] ?? '',
  }));

  function show(index: number) {
    setActive(index);
    setHidden(index);
  }

  return (
    <article ref={ref} className="space-y-16 lg:space-y-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="label text-accent">{labels.featuredLabel}</p>
            <h3 className="mt-4 font-serif text-6xl leading-none sm:text-7xl">{text.title}</h3>
            <p className="text-ink-soft mt-6 leading-relaxed">{text.description}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="border-line mt-10 space-y-6 border-t pt-6 text-base leading-relaxed">
              {text.role ? (
                <div>
                  <dt className="label text-muted">{labels.roleLabel}</dt>
                  <dd className="mt-1.5">{text.role}</dd>
                </div>
              ) : null}
              <div>
                <dt className="label text-muted">{labels.stackLabel}</dt>
                <dd className="mt-1.5">{project.tags.join(', ')}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border-ink hover:bg-ink hover:text-paper inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[0.95rem] transition-colors duration-300"
                >
                  {link.label}
                  <ArrowUpRight />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="bg-ink relative overflow-hidden lg:col-span-8">
          {project.cover ? (
            <motion.div style={{ y: coverY }} className="absolute inset-[-10%_0] opacity-40">
              <Image
                src={asset(project.cover)}
                alt=""
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover grayscale"
              />
            </motion.div>
          ) : null}
          <div className="relative flex min-h-[34rem] items-center justify-center gap-4 px-6 py-16 sm:gap-8 sm:py-24">
            {screens.map((screen, index) => (
              <Phone
                key={screen.src}
                screen={screen}
                openLabel={labels.screens.open}
                hidden={hidden === index}
                onOpen={() => show(index)}
                frameRef={(element) => {
                  frames.current[index] = element;
                }}
                y={offsets[index % offsets.length]}
                className={index === 1 ? 'w-[34%] max-w-60' : 'w-[28%] max-w-48'}
              />
            ))}
          </div>
          {screens.length ? (
            <p className="label text-paper/80 absolute bottom-5 left-6">{labels.screens.hint}</p>
          ) : null}
        </div>
      </div>

      {text.achievements || project.webScreen ? (
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {text.achievements ? (
            <Reveal className="lg:col-span-4">
              <h4 className="label text-muted">{labels.achievementsLabel}</h4>
              <ol className="mt-4">
                {text.achievements.map((item, index) => (
                  <li
                    key={item}
                    className="border-line flex gap-4 border-t py-4 text-base leading-relaxed last:border-b"
                  >
                    <span className="label text-accent w-6 shrink-0 pt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}

          {project.webScreen ? (
            <Reveal delay={0.1} className="lg:col-span-8">
              <figure>
                <BrowserFrame url="garezvous.fr">
                  <Image
                    src={asset(project.webScreen)}
                    alt={text.webAlt ?? ''}
                    width={1600}
                    height={757}
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="h-auto w-full"
                  />
                </BrowserFrame>
                <figcaption className="label text-muted mt-3">{labels.webCaption}</figcaption>
              </figure>
            </Reveal>
          ) : null}
        </div>
      ) : null}
      <AnimatePresence
        onExitComplete={() => {
          if (hidden !== null)
            frames.current[hidden]?.closest('button')?.focus({ preventScroll: true });
          setHidden(null);
        }}
      >
        {active !== null ? (
          <ScreenViewer
            project={text.title}
            screens={screens}
            index={active}
            onIndexChange={show}
            onClose={() => setActive(null)}
            getOrigin={(index) => frames.current[index]?.getBoundingClientRect()}
            labels={labels.screens}
          />
        ) : null}
      </AnimatePresence>
    </article>
  );
}

type PhoneProps = {
  screen: Screen;
  openLabel: string;
  hidden: boolean;
  onOpen: () => void;
  frameRef: (element: HTMLDivElement | null) => void;
  y: MotionValue<number>;
  className: string;
};

function Phone({ screen, openLabel, hidden, onOpen, frameRef, y, className }: PhoneProps) {
  return (
    <motion.div style={{ y }} className={className}>
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`${openLabel} : ${screen.title}`}
        className="group block w-full cursor-zoom-in"
      >
        <div
          ref={frameRef}
          className={`ease-out-expo relative rounded-[1.6rem] bg-[#0b0b0a] p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition duration-700 group-hover:-translate-y-3 group-hover:ring-white/40 ${hidden ? 'invisible' : ''}`}
        >
          <Image
            src={asset(screen.src)}
            alt={screen.alt}
            width={600}
            height={1300}
            sizes="(min-width: 1024px) 240px, 30vw"
            className="aspect-[6/13] w-full rounded-[1.25rem] object-cover object-top"
          />
          <span className="label bg-paper text-ink ease-out-expo absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 rounded-full px-3 py-1.5 whitespace-nowrap opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-sm:hidden">
            {screen.title}
          </span>
        </div>
      </button>
    </motion.div>
  );
}
