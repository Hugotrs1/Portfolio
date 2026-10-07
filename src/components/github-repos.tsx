'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { person } from '@/data/profile';
import type { Dictionary } from '@/i18n';

import { ArrowUpRight } from './icons';
import { easeOutExpo } from './reveal';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

type Status = 'loading' | 'ready' | 'error';

export function GithubRepos({ t }: { t: Dictionary['github'] }) {
  const dateFormat = new Intl.DateTimeFormat(t.dateLocale, { month: 'short', year: 'numeric' });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${person.githubUser}/repos?per_page=100&sort=pushed`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Repo[]>;
      })
      .then((data) => {
        const list = data.filter((repo) => !repo.fork).slice(0, 6);
        if (!list.length) throw new Error('Aucun dépôt');
        setRepos(list);
        setStatus('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });

    return () => controller.abort();
  }, []);

  if (status === 'error') {
    return (
      <p className="text-ink-soft">
        {t.unavailable}{' '}
        <a
          href={person.github}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-ink"
        >
          github.com/{person.githubUser}
        </a>
        .
      </p>
    );
  }

  return (
    <div>
      <ul aria-busy={status === 'loading'}>
        {status === 'loading'
          ? Array.from({ length: 4 }, (_, index) => (
              <li
                key={index}
                className="border-line flex h-[5.5rem] items-center border-t last:border-b"
              >
                <span className="bg-paper-deep h-4 w-1/3 animate-pulse" />
              </li>
            ))
          : repos.map((repo, index) => (
              <motion.li
                key={repo.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.06, ease: easeOutExpo }}
                className="border-line border-t last:border-b"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group hover:bg-paper-deep/60 grid items-baseline gap-2 py-6 transition-colors duration-300 sm:grid-cols-12 sm:gap-8 sm:px-3"
                >
                  <span className="font-mono text-base sm:col-span-4">{repo.name}</span>
                  <span className="text-ink-soft text-base sm:col-span-5">{repo.description}</span>
                  <span className="label text-muted flex items-center justify-between gap-4 sm:col-span-3 sm:justify-end">
                    <span>
                      {[
                        repo.language,
                        repo.stargazers_count > 0 ? `${repo.stargazers_count} ${t.stars}` : null,
                        dateFormat.format(new Date(repo.pushed_at)),
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                    <ArrowUpRight className="text-ink h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </a>
              </motion.li>
            ))}
      </ul>

      <a
        href={person.github}
        target="_blank"
        rel="noreferrer noopener"
        className="link-underline mt-8 inline-flex items-center gap-2 text-base"
      >
        {t.all}
        <ArrowUpRight />
      </a>
    </div>
  );
}
