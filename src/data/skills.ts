import type { Skill, SkillLevel } from '@/types';

export const skills: Skill[] = [
  { name: 'Flutter', icon: '/icons/flutter.svg', level: 'advanced' },
  { name: 'Java', icon: '/icons/java.svg', level: 'intermediate' },
  { name: 'JSP', icon: '/icons/jsp.png', level: 'intermediate' },
  { name: 'SQL', icon: '/icons/mysql.svg', level: 'intermediate' },
  { name: 'HTML', icon: '/icons/html5.svg', level: 'intermediate' },
  { name: 'CSS', icon: '/icons/css3.svg', level: 'intermediate' },
  { name: 'JavaScript', icon: '/icons/javascript.svg', level: 'beginner' },
  { name: 'PHP', icon: '/icons/php.svg', level: 'beginner' },
  { name: 'Python', icon: '/icons/python.svg', level: 'beginner' },
  { name: 'Git & GitHub', icon: '/icons/github.svg', level: 'beginner' },
];

export const skillLevels: SkillLevel[] = ['advanced', 'intermediate', 'beginner'];
