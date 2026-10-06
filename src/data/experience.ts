import type { Education, Experience } from '@/types';

export const experiences: Experience[] = [
  {
    company: 'Agelid',
    role: 'Développeur en alternance',
    period: "Oct. 2025 — aujourd'hui",
    details:
      "Refonte de GarezVous, l'application de stationnement ponctuel proposée aux collectivités clientes. J'y ai ajouté le stationnement avec compte et sans compte, et repris le design comme le code de l'application, sur mobile et sur web.",
    technologies: ['Flutter', 'Dart', 'Java', 'JSP'],
    current: true,
  },
  {
    company: 'Agelid',
    role: 'Stage développement mobile',
    period: 'Mars — Juin 2025',
    details:
      "Réalisation d'un POC (proof of concept) : intégration d'une fonctionnalité de stationnement dans une application mobile existante, à partir de données simulées.",
    technologies: ['Flutter', 'Dart', 'Java'],
  },
];

export const education: Education[] = [
  {
    title: "Bachelor Concepteur Développeur d'Applications (Bac+3), en alternance",
    school: 'CESI Rouen',
    year: '2026 — 2027',
  },
  {
    title: 'Titre Développeur Informatique (Bac+2), obtenu',
    school: 'CESI Rouen',
    year: '2024 — 2026',
  },
  {
    title: 'Baccalauréat général, spécialités Mathématiques & NSI',
    school: 'Lycée Jacques Prévert, Pont-Audemer',
    year: '2024',
  },
];
