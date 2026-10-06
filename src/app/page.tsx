import { Contact } from "@/components/contact";
import { FeaturedProject } from "@/components/featured-project";
import { Footer } from "@/components/footer";
import { GithubRepos } from "@/components/github-repos";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Now } from "@/components/now";
import { Profile } from "@/components/profile";
import { ProjectList } from "@/components/project-list";
import { ScrollProgress } from "@/components/scroll-progress";
import { Section } from "@/components/section";
import { Skills } from "@/components/skills";
import { projects } from "@/data/projects";

const featured = projects.filter((project) => project.kind === "pro");
const coursework = projects.filter((project) => project.kind === "cours");

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <Marquee />

        <Section id="profil" index="01" label="Profil" title="Du mobile au back-office.">
          <Profile />
        </Section>

        <Section
          id="projets"
          index="02"
          label="Projets"
          title="Travaux choisis."
          intro="Un projet professionnel en production, et des projets réalisés en formation."
        >
          <div className="space-y-24">
            {featured.map((project) => (
              <FeaturedProject key={project.title} project={project} />
            ))}
            <ProjectList projects={coursework} start={featured.length + 1} />
          </div>
        </Section>

        <Section
          id="competences"
          index="03"
          label="Compétences"
          title="Outils du quotidien."
          intro="Les technologies utilisées en cours, en projets et en alternance."
        >
          <Skills />
        </Section>

        <Section
          id="en-ce-moment"
          index="04"
          label="En ce moment"
          title="Ce qui m'occupe."
          intro="Ce que j'apprends en ce moment, et ce qui m'occupe en dehors du code."
        >
          <Now />
        </Section>

        <Section
          id="github"
          index="05"
          label="GitHub"
          title="Derniers dépôts."
          intro="Mes dépôts publics les plus récents, synchronisés automatiquement."
        >
          <GithubRepos />
        </Section>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
