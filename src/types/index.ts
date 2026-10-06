export type SkillLevel = 'Avancé' | 'Intermédiaire' | 'Débutant';

export type Skill = {
  name: string;
  icon: string;
  level: SkillLevel;
};

export type ExternalLink = {
  label: string;
  url: string;
};

export type Picture = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  kind: 'pro' | 'cours';
  description: string;
  tags: string[];
  links: ExternalLink[];
  cover?: Picture;
  role?: string;
  achievements?: string[];
  screens?: Picture[];
  webScreen?: Picture;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  details: string;
  technologies: string[];
  current?: boolean;
};

export type Education = {
  title: string;
  school: string;
  year: string;
};

export type NowItem = {
  title: string;
  body: string;
  image: Picture;
};
