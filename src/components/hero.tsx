import { person } from '@/data/profile';
import { projects } from '@/data/projects';
import type { Dictionary } from '@/i18n';

import { Container } from './container';
import { ArrowDown } from './icons';
import { ParkingLot } from './parking-lot';
import { Phone } from './phone';

const [parkingScreen, homeScreen] =
  projects.find((project) => project.id === 'garezvous')?.screens ?? [];

type HeroProps = { hero: Dictionary['hero']; screenAlts?: string[] };

export function Hero({ hero, screenAlts = [] }: HeroProps) {
  const phone = {
    sizes: '(min-width: 1024px) 18vw, 40vw',
    priority: true,
    className: 'animate-rise',
  };

  return (
    <>
      <section
        id="top"
        className="bg-ink text-paper relative overflow-hidden lg:flex lg:min-h-[clamp(40rem,100svh,60rem)] lg:items-center"
      >
        <Container className="relative z-10 pt-28 pb-12 lg:py-28">
          <div className="animate-rise max-w-[38rem] lg:max-w-[min(38rem,42vw)]">
            <p className="text-on-ink-soft text-lg">{hero.role}</p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.06] font-medium tracking-[-0.02em] text-balance xl:text-[3.5rem]">
              {hero.title}
            </h1>
            <p className="text-on-ink-soft mt-6 max-w-xl text-lg leading-[1.6]">
              {hero.introduction}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projets"
                className="bg-paper text-ink inline-flex h-12 items-center gap-2 rounded-[10px] px-5 text-base font-medium transition-[background-color,transform] duration-150 hover:bg-white active:scale-[0.98]"
              >
                {hero.cta}
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${person.email}`}
                className="bg-ink-raised hover:bg-ink-soft inline-flex h-12 items-center rounded-[10px] px-5 text-base ring-1 ring-white/10 transition-[background-color,transform] duration-150 active:scale-[0.98]"
              >
                {person.email}
              </a>
            </div>
          </div>
        </Container>

        <div className="relative h-[27rem] overflow-hidden sm:h-[34rem] lg:absolute lg:inset-0 lg:h-auto">
          <ParkingLot
            className="top-[-6.5rem] left-[6vw] [--bay:clamp(10rem,44vw,15rem)] sm:left-[16vw] lg:top-[calc(50%-var(--bay)*1.35)] lg:left-[51vw] lg:[--bay:clamp(13rem,18.5vw,17rem)]"
            bays={[
              {
                key: 'home',
                content: <Phone src={homeScreen} alt={screenAlts[1] ?? ''} {...phone} />,
              },
              {
                key: 'parking',
                blue: true,
                content: <Phone src={parkingScreen} alt={screenAlts[0] ?? ''} {...phone} />,
              },
              { key: 'free-1' },
              { key: 'free-2' },
              { key: 'free-3' },
              { key: 'free-4' },
            ]}
          />
        </div>
      </section>

      <Container>
        <dl className="grid gap-x-8 sm:grid-cols-3">
          {hero.highlights.map((item) => (
            <div key={item.term} className="border-line border-b py-6 sm:py-8">
              <dt className="label text-muted">{item.term}</dt>
              <dd className="mt-1 text-pretty">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
