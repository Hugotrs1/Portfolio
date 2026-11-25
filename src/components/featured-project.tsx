'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

import type { Dictionary, ProjectText } from '@/i18n/types';
import type { Project } from '@/types';

import { BrowserFrame } from './browser-frame';
import { ArrowUpRight } from './icons';
import { Phone } from './phone';
import { ScreenViewer, type Screen } from './screen-viewer';

type FeaturedProjectProps = {
  project: Project;
  text: ProjectText;
  labels: Dictionary['projects'];
};

export function FeaturedProject({ project, text, labels }: FeaturedProjectProps) {
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
    <article className="space-y-12 lg:space-y-16">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-muted">{labels.featuredLabel}</p>
          <h3 className="mt-2 text-[2rem] leading-[1.1] font-medium tracking-[-0.02em] sm:text-[2.75rem]">
            {text.title}
          </h3>
          <p className="text-ink-soft mt-4 leading-[1.6]">{text.description}</p>

          <dl className="border-line mt-8 space-y-4 border-t pt-6">
            {text.role ? (
              <div>
                <dt className="label text-muted">{labels.roleLabel}</dt>
                <dd>{text.role}</dd>
              </div>
            ) : null}
            <div>
              <dt className="label text-muted">{labels.stackLabel}</dt>
              <dd>{project.tags.join(', ')}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="ring-line hover:bg-paper-deep inline-flex h-11 items-center gap-2 rounded-[10px] bg-white px-4 text-[0.9375rem] ring-1 transition-[background-color,transform] duration-150 active:scale-[0.98]"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {screens.length ? (
          <div className="bg-paper-deep flex flex-col justify-center rounded-2xl p-4 sm:p-8 lg:col-span-8">
            <ul className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-8">
              {screens.map((screen, index) => (
                <li key={screen.src}>
                  <button
                    type="button"
                    onClick={() => show(index)}
                    aria-haspopup="dialog"
                    aria-label={`${labels.screens.open} : ${screen.title}`}
                    className="group block w-full cursor-zoom-in"
                  >
                    <Phone
                      src={screen.src}
                      alt={screen.alt}
                      sizes="(min-width: 1024px) 220px, 30vw"
                      className={`max-sm:rounded-2xl max-sm:p-1 max-sm:[&>img]:rounded-xl ${
                        hidden === index ? 'invisible' : ''
                      }`}
                      ref={(element) => {
                        frames.current[index] = element;
                      }}
                    />
                    <span className="label mt-3 block underline-offset-4 group-hover:underline max-sm:text-[0.8125rem] max-sm:leading-5">
                      {screen.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="label text-muted mt-6 text-center">{labels.screens.hint}</p>
          </div>
        ) : null}
      </div>

      {text.achievements || project.webScreen ? (
        <div className="grid gap-8 lg:grid-cols-12">
          {text.achievements ? (
            <div className="lg:col-span-4">
              <h4 className="label text-muted">{labels.achievementsLabel}</h4>
              <ul className="mt-3">
                {text.achievements.map((item) => (
                  <li key={item} className="border-line border-t py-4 last:border-b">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.webScreen ? (
            <figure className="lg:col-span-8">
              <BrowserFrame url="garezvous.fr">
                <Image
                  src={project.webScreen}
                  alt={text.webAlt ?? ''}
                  width={1600}
                  height={757}
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="h-auto w-full"
                />
              </BrowserFrame>
              <figcaption className="label text-muted mt-3">{labels.webCaption}</figcaption>
            </figure>
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
