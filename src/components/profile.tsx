import { education, experiences } from "@/data/experience";
import { person } from "@/data/profile";

import { Reveal } from "./reveal";

export function Profile() {
  return (
    <div className="space-y-24">
      <Reveal className="lg:ml-[25%] lg:pl-2">
        <p className="max-w-4xl font-serif text-3xl leading-[1.2] sm:text-4xl">{person.about}</p>
      </Reveal>

      <Timeline title="Expérience">
        {experiences.map((item) => (
          <Row key={`${item.role}-${item.period}`} period={item.period} current={item.current}>
            <h4 className="text-xl">
              {item.role} <span className="text-muted">— {item.company}</span>
            </h4>
            <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{item.details}</p>
            <p className="label mt-4 text-muted">{item.technologies.join(" · ")}</p>
          </Row>
        ))}
      </Timeline>

      <Timeline title="Formation">
        {education.map((item) => (
          <Row key={item.title} period={item.year}>
            <h4 className="text-xl">{item.title}</h4>
            <p className="mt-2 text-ink-soft">{item.school}</p>
          </Row>
        ))}
      </Timeline>
    </div>
  );
}

function Timeline({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <h3 className="label pt-7 text-muted lg:col-span-3">{title}</h3>
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
  current?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="border-t border-line py-7 last:border-b">
      <Reveal className="grid gap-3 sm:grid-cols-9 sm:gap-8">
        <p className="label pt-1.5 text-muted sm:col-span-3">
          {period}
          {current ? <span className="ml-3 text-accent">En cours</span> : null}
        </p>
        <div className="sm:col-span-6">{children}</div>
      </Reveal>
    </li>
  );
}
