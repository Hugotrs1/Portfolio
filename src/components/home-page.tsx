import { projects } from '@/data/projects';
import type { Dictionary } from '@/i18n';

import { Contact } from './contact';
import { DocumentLang } from './document-lang';
import { FeaturedProject } from './featured-project';
import { Footer } from './footer';
import { GithubRepos } from './github-repos';
import { Header } from './header';
import { Hero } from './hero';
import { Now } from './now';
import { Profile } from './profile';
import { ProjectList } from './project-list';
import { Section } from './section';
import { Skills } from './skills';

const featured = projects.filter((project) => project.kind === 'pro');
const others = projects.filter((project) => project.kind !== 'pro');

export function HomePage({ dict }: { dict: Dictionary }) {
  const { sections } = dict;

  return (
    <>
      <DocumentLang lang={dict.locale} />
      <Header nav={dict.nav} />

      <main>
        <Hero hero={dict.hero} screenAlts={dict.projects.items.garezvous.screenAlts} />

        <Section id="profil" {...sections.profile}>
          <Profile profile={dict.profile} />
        </Section>

        <Section id="projets" {...sections.projects}>
          <div className="space-y-16 lg:space-y-24">
            {featured.map((project) => (
              <FeaturedProject
                key={project.id}
                project={project}
                text={dict.projects.items[project.id]}
                labels={dict.projects}
              />
            ))}
            <ProjectList projects={others} texts={dict.projects.items} />
          </div>
        </Section>

        <Section id="competences" {...sections.skills}>
          <Skills levels={dict.skills.levels} />
        </Section>

        <Section id="en-ce-moment" {...sections.now}>
          <Now texts={dict.now} />
        </Section>

        <Section id="github" {...sections.github}>
          <GithubRepos t={dict.github} />
        </Section>

        <Contact contact={dict.contact} />
      </main>

      <Footer backToTop={dict.footer.backToTop} />
    </>
  );
}
