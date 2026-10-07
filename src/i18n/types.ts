import type { NowId, ProjectId, SkillLevel } from '@/types';

export type Locale = 'fr' | 'en';

type SectionText = { label: string; title: string; intro?: string };

export type ProjectText = {
  title: string;
  description: string;
  role?: string;
  achievements?: string[];
  screenTitles?: string[];
  screenAlts?: string[];
  webAlt?: string;
};

export type Dictionary = {
  locale: Locale;
  meta: { title: string; description: string; ogDescription: string };
  nav: {
    label: string;
    mobileLabel: string;
    items: { label: string; href: string }[];
    cv: string;
    open: string;
    close: string;
    switchLabel: string;
    switchHref: string;
    switchTitle: string;
    switchName: string;
  };
  hero: {
    status: string;
    location: string;
    school: string;
    role: string;
    stack: string;
    introduction: string;
    highlights: { term: string; detail: string }[];
    cta: string;
  };
  sections: Record<'profile' | 'projects' | 'skills' | 'now' | 'github', SectionText>;
  profile: {
    about: string;
    experienceTitle: string;
    educationTitle: string;
    current: string;
    experiences: {
      company: string;
      role: string;
      period: string;
      details: string;
      technologies: string[];
      current?: boolean;
    }[];
    education: { title: string; school: string; year: string }[];
  };
  projects: {
    featuredLabel: string;
    roleLabel: string;
    stackLabel: string;
    achievementsLabel: string;
    webCaption: string;
    screens: { hint: string; open: string; close: string; previous: string; next: string };
    items: Record<ProjectId, ProjectText>;
  };
  skills: { levels: Record<SkillLevel, string> };
  now: Record<NowId, { title: string; body: string; alt: string }>;
  github: {
    unavailable: string;
    all: string;
    stars: string;
    repos: string;
    languages: string;
    dateLocale: string;
  };
  contact: {
    label: string;
    title: string;
    intro: string;
    cvLabel: string;
    copy: string;
    copied: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      sent: string;
      hint: string;
      missing: string;
      invalidEmail: string;
      error: string;
      success: string;
    };
  };
  footer: { backToTop: string };
};
