import type { Dictionary } from '@/i18n';

import { Reveal } from './reveal';

export function Profile({ profile }: { profile: Dictionary['profile'] }) {
  return (
    <div className="space-y-24">
      <Reveal className="lg:ml-[25%] lg:pl-2">
        <p className="max-w-4xl font-serif text-3xl leading-[1.2] sm:text-4xl">{profile.about}</p>
      </Reveal>

      <Timeline title={profile.experienceTitle}>
        {profile.experiences.map((item) => (
          <Row
            key={`${item.role}-${item.period}`}
            period={item.period}
            current={item.current ? profile.current : undefined}
          >
            <h4 className="text-xl">
              {item.role} <span className="text-muted">— {item.company}</span>
            </h4>
            <p className="text-ink-soft mt-2 max-w-2xl leading-relaxed">{item.details}</p>
            <p className="label text-muted mt-4">{item.technologies.join(' · ')}</p>
          </Row>
        ))}
      </Timeline>

      <Timeline title={profile.educationTitle}>
        {profile.education.map((item) => (
          <Row key={item.title} period={item.year}>
            <h4 className="text-xl">{item.title}</h4>
            <p className="text-ink-soft mt-2">{item.school}</p>
          </Row>
        ))}
      </Timeline>
    </div>
  );
}

function Timeline({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <h3 className="label text-muted pt-7 lg:col-span-3">{title}</h3>
      <ol className="lg:col-span-9">{children}</ol>
    </div>
  );
}

function Row({
  period,
  current,
  children,
}: {
  period: string;
  current?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border-line border-t py-7 last:border-b">
      <Reveal className="grid gap-3 sm:grid-cols-9 sm:gap-8">
        <p className="label text-muted pt-1.5 sm:col-span-3">
          {period}
          {current ? <span className="text-accent ml-3">{current}</span> : null}
        </p>
        <div className="sm:col-span-6">{children}</div>
      </Reveal>
    </li>
  );
}
