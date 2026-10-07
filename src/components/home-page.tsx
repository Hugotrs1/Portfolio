import { projects } from '@/data/projects';
import type { Dictionary } from '@/i18n';

import { Contact } from './contact';
import { DocumentLang } from './document-lang';
import { FeaturedProject } from './featured-project';
import { Footer } from './footer';
import { GithubRepos } from './github-repos';
import { Header } from './header';
import { Hero } from './hero';
import { LanguageCurtain } from './language-switch';
import { Marquee } from './marquee';
import { Now } from './now';
import { Profile } from './profile';
import { ProjectList } from './project-list';
import { ScrollProgress } from './scroll-progress';
import { Section } from './section';
import { Skills } from './skills';

const featured = projects.filter((project) => project.kind === 'pro');
const others = projects.filter((project) => project.kind !== 'pro');

export function HomePage({ dict }: { dict: Dictionary }) {
  const { sections } = dict;

  return (
    <>
      <DocumentLang lang={dict.locale} />
      <ScrollProgress />
      <Header nav={dict.nav} />

      <main>
        <Hero hero={dict.hero} />
        <Marquee />

        <Section id="profil" index="01" {...sections.profile}>
          <Profile profile={dict.profile} />
        </Section>

        <Section id="projets" index="02" {...sections.projects}>
          <div className="space-y-24">
            {featured.map((project) => (
              <FeaturedProject
                key={project.id}
                project={project}
                text={dict.projects.items[project.id]}
                labels={dict.projects}
              />
            ))}
            <ProjectList
              projects={others}
              texts={dict.projects.items}
              start={featured.length + 1}
            />
          </div>
        </Section>

        <Section id="competences" index="03" {...sections.skills}>
          <Skills levels={dict.skills.levels} />
        </Section>

        <Section id="en-ce-moment" index="04" {...sections.now}>
          <Now texts={dict.now} />
        </Section>

        <Section id="github" index="05" {...sections.github}>
          <GithubRepos t={dict.github} />
        </Section>

        <Contact contact={dict.contact} />
      </main>

      <Footer backToTop={dict.footer.backToTop} />
      <LanguageCurtain />
    </>
  );
}
