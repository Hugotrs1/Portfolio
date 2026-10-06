export type ProjectId = 'garezvous' | 'whatsapp' | 'videGrenier' | 'apiValorant';

export type NowId = 'ai' | 'code' | 'games';

export type SkillLevel = 'advanced' | 'intermediate' | 'beginner';

export type Skill = {
  name: string;
  icon: string;
  level: SkillLevel;
};

export type ExternalLink = {
  label: string;
  url: string;
};

export type Project = {
  id: ProjectId;
  kind: 'pro' | 'cours';
  tags: string[];
  links: ExternalLink[];
  cover?: string;
  screens?: string[];
  webScreen?: string;
};

export type NowItem = {
  id: NowId;
  image: string;
};
