import type { ReactNode } from 'react';

import type { Dictionary } from '@/i18n';

export function Profile({ profile }: { profile: Dictionary['profile'] }) {
  return (
    <div className="space-y-16">
      <div className="grid lg:grid-cols-12 lg:gap-8">
        <p className="max-w-3xl text-xl leading-[1.6] lg:col-span-9 lg:col-start-4">
          {profile.about}
        </p>
      </div>

      <Timeline title={profile.experienceTitle}>
        {profile.experiences.map((item) => (
          <Row
            key={`${item.role}-${item.period}`}
            period={item.period}
            current={item.current ? profile.current : undefined}
          >
            <h4 className="text-xl leading-7">
              {item.role}
              <span className="text-muted">, {item.company}</span>
            </h4>
            <p className="text-ink-soft mt-2 max-w-2xl leading-[1.6]">{item.details}</p>
            <p className="label text-muted mt-2">{item.technologies.join(', ')}</p>
          </Row>
        ))}
      </Timeline>

      <Timeline title={profile.educationTitle}>
        {profile.education.map((item) => (
          <Row key={item.title} period={item.year}>
            <h4 className="text-xl leading-7">{item.title}</h4>
            <p className="text-ink-soft mt-1">{item.school}</p>
          </Row>
        ))}
      </Timeline>
    </div>
  );
}

function Timeline({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
      <h3 className="text-xl leading-7 font-medium lg:col-span-3 lg:pt-6">{title}</h3>
      <ol className="lg:col-span-9">{children}</ol>
    </div>
  );
}

type RowProps = { period: string; current?: string; children: ReactNode };

function Row({ period, current, children }: RowProps) {
  return (
    <li className="border-line grid gap-x-8 gap-y-2 border-t py-6 last:border-b sm:grid-cols-9">
      <p className="label text-muted sm:col-span-3 sm:leading-7">
        {period}
        {current ? <span className="text-accent block">{current}</span> : null}
      </p>
      <div className="sm:col-span-6">{children}</div>
    </li>
  );
}
