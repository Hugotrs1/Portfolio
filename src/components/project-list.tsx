import type { ProjectText } from '@/i18n/types';
import type { Project, ProjectId } from '@/types';

import { ArrowUpRight } from './icons';
import { Reveal } from './reveal';

type ProjectListProps = {
  projects: Project[];
  texts: Record<ProjectId, ProjectText>;
  start?: number;
};

const rowClass = 'grid items-baseline gap-3 py-8 sm:grid-cols-12 sm:gap-8';

export function ProjectList({ projects, texts, start = 1 }: ProjectListProps) {
  return (
    <ul>
      {projects.map((project, index) => {
        const text = texts[project.id];
        const url = project.links[0]?.url;
        const content = (
          <>
            <span className="label text-muted sm:col-span-1">
              {String(start + index).padStart(2, '0')}
            </span>
            <span className="ease-out-expo font-serif text-4xl leading-none transition-transform duration-700 group-hover:translate-x-3 sm:col-span-5 sm:text-5xl">
              {text.title}
            </span>
            <span className="text-ink-soft text-base leading-relaxed sm:col-span-4">
              {text.description}
            </span>
            <span className="label text-muted flex items-center justify-between gap-2 sm:col-span-2 sm:justify-end">
              {project.tags.join(' · ')}
              {url ? (
                <ArrowUpRight className="text-ink group-hover:text-accent h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              ) : null}
            </span>
          </>
        );

        return (
          <li key={project.id} className="border-line border-t last:border-b">
            <Reveal delay={index * 0.08}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`group hover:text-accent transition-colors duration-500 ${rowClass}`}
                >
                  {content}
                </a>
              ) : (
                <div className={rowClass}>{content}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
