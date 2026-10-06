import type { Project } from '@/types';

import { ArrowUpRight } from './icons';
import { Reveal } from './reveal';

export function ProjectList({ projects, start = 1 }: { projects: Project[]; start?: number }) {
  return (
    <ul>
      {projects.map((project, index) => (
        <li key={project.title} className="border-line border-t last:border-b">
          <Reveal delay={index * 0.08}>
            <a
              href={project.links[0]?.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group hover:text-accent grid items-baseline gap-3 py-8 transition-colors duration-500 sm:grid-cols-12 sm:gap-8"
            >
              <span className="label text-muted sm:col-span-1">
                {String(start + index).padStart(2, '0')}
              </span>
              <span className="ease-out-expo font-serif text-4xl leading-none transition-transform duration-700 group-hover:translate-x-3 sm:col-span-5 sm:text-5xl">
                {project.title}
              </span>
              <span className="text-ink-soft text-sm leading-relaxed sm:col-span-4">
                {project.description}
              </span>
              <span className="label text-muted flex items-center justify-between gap-2 sm:col-span-2 sm:justify-end">
                {project.tags.join(' · ')}
                <ArrowUpRight className="text-ink group-hover:text-accent h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
