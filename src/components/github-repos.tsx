'use client';

import { useEffect, useState } from 'react';

import { person } from '@/data/profile';
import type { Dictionary } from '@/i18n';

import { ArrowUpRight } from './icons';

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
type Stats = { repos: number; languages: number };

export function GithubRepos({ t }: { t: Dictionary['github'] }) {
  const dateFormat = new Intl.DateTimeFormat(t.dateLocale, { month: 'short', year: 'numeric' });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [stats, setStats] = useState<Stats>({ repos: 0, languages: 0 });

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
        const own = data.filter((repo) => !repo.fork);
        if (!own.length) throw new Error('Aucun dépôt');
        setRepos(own.slice(0, 6));
        setStats({
          repos: own.length,
          languages: new Set(own.map((repo) => repo.language).filter(Boolean)).size,
        });
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
          ? Array.from({ length: 6 }, (_, index) => (
              <li key={index} className="border-line flex h-20 items-center border-t last:border-b">
                <span className="bg-paper-deep h-4 w-1/3 rounded" />
              </li>
            ))
          : repos.map((repo) => (
              <li key={repo.id} className="border-line border-t last:border-b">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-accent grid items-baseline gap-x-8 gap-y-1 py-5 transition-colors duration-150 lg:grid-cols-12"
                >
                  <span className="lg:col-span-4">{repo.name}</span>
                  <span className="text-ink-soft lg:col-span-5">{repo.description}</span>
                  <span className="label text-muted flex items-center justify-between gap-4 lg:col-span-3 lg:justify-end">
                    <span>
                      {[
                        repo.language,
                        repo.stargazers_count > 0 ? `${repo.stargazers_count} ${t.stars}` : null,
                        dateFormat.format(new Date(repo.pushed_at)),
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                    <ArrowUpRight className="text-ink h-4 w-4 shrink-0" />
                  </span>
                </a>
              </li>
            ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <a
          href={person.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2"
        >
          <span className="link-underline">{t.all}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
        {status === 'ready' ? (
          <p className="label text-muted">
            {stats.repos} {t.repos}, {stats.languages} {t.languages}
          </p>
        ) : null}
      </div>
    </div>
  );
}
