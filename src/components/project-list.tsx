import type { ProjectText } from '@/i18n/types';
import type { Project, ProjectId } from '@/types';

import { ArrowUpRight } from './icons';

type ProjectListProps = {
  projects: Project[];
  texts: Record<ProjectId, ProjectText>;
};

export function ProjectList({ projects, texts }: ProjectListProps) {
  return (
    <ul>
      {projects.map((project) => {
        const text = texts[project.id];

        return (
          <li
            key={project.id}
            className="border-line grid gap-x-8 gap-y-3 border-t py-8 last:border-b lg:grid-cols-12"
          >
            <h3 className="text-2xl leading-8 lg:col-span-4">{text.title}</h3>
            <div className="lg:col-span-6">
              <p className="text-ink-soft max-w-2xl leading-[1.6]">{text.description}</p>
              <p className="label text-muted mt-2">{project.tags.join(', ')}</p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-2 lg:flex-col lg:items-end">
              {project.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${link.label} : ${text.title}`}
                    className="hover:text-accent inline-flex items-center gap-2 transition-colors duration-150"
                  >
                    <span className="link-underline">{link.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
