"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { person } from "@/data/profile";

import { ArrowUpRight } from "./icons";
import { easeOutExpo } from "./reveal";

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

type Status = "loading" | "ready" | "error";

const dateFormat = new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" });

export function GithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<Status>("loading");

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
        if (!list.length) throw new Error("Aucun dépôt");
        setRepos(list);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });

    return () => controller.abort();
  }, []);

  if (status === "error") {
    return (
      <p className="text-ink-soft">
        Dépôts indisponibles pour le moment. Retrouvez-les sur{" "}
        <a href={person.github} target="_blank" rel="noreferrer noopener" className="link-underline text-ink">
          github.com/{person.githubUser}
        </a>
        .
      </p>
    );
  }

  return (
    <div>
      <ul aria-busy={status === "loading"}>
        {status === "loading"
          ? Array.from({ length: 4 }, (_, index) => (
              <li key={index} className="flex h-[5.5rem] items-center border-t border-line last:border-b">
                <span className="h-4 w-1/3 animate-pulse bg-paper-deep" />
              </li>
            ))
          : repos.map((repo, index) => (
              <motion.li
                key={repo.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.06, ease: easeOutExpo }}
                className="border-t border-line last:border-b"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid items-baseline gap-2 py-6 transition-colors duration-300 hover:bg-paper-deep/60 sm:grid-cols-12 sm:gap-8 sm:px-3"
                >
                  <span className="font-mono text-base sm:col-span-4">{repo.name}</span>
                  <span className="text-sm text-ink-soft sm:col-span-5">
                    {repo.description}
                  </span>
                  <span className="label flex items-center justify-between gap-4 text-muted sm:col-span-3 sm:justify-end">
                    <span>
                      {[repo.language, repo.stargazers_count > 0 ? `${repo.stargazers_count} étoiles` : null, dateFormat.format(new Date(repo.pushed_at))]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </a>
              </motion.li>
            ))}
      </ul>

      <a
        href={person.github}
        target="_blank"
        rel="noreferrer noopener"
        className="link-underline mt-8 inline-flex items-center gap-2 text-sm"
      >
        Tous les dépôts sur GitHub
        <ArrowUpRight />
      </a>
    </div>
  );
}
