import { skillLevels, skills } from '@/data/skills';
import type { Dictionary } from '@/i18n';

export function Skills({ levels }: { levels: Dictionary['skills']['levels'] }) {
  return (
    <dl>
      {skillLevels.map((level) => (
        <div
          key={level}
          className="border-line grid gap-x-8 gap-y-2 border-t py-6 last:border-b lg:grid-cols-12"
        >
          <dt className="text-muted leading-8 lg:col-span-3">{levels[level]}</dt>
          <dd className="lg:col-span-9">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-xl leading-8 sm:text-2xl">
              {skills
                .filter((skill) => skill.level === level)
                .map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
