import type { Dictionary } from './types';

export const fr: Dictionary = {
  locale: 'fr',
  meta: {
    title: 'Hugo Troussel — Développeur informatique (Flutter & Java)',
    description:
      'Portfolio de Hugo Troussel, développeur informatique en alternance chez Agelid. Refonte de GarezVous (Flutter), projets et dépôts GitHub.',
    ogDescription: 'Développeur informatique en alternance — Flutter & Java.',
  },
  nav: {
    label: 'Navigation principale',
    mobileLabel: 'Navigation mobile',
    items: [
      { label: 'Profil', href: '#profil' },
      { label: 'Projets', href: '#projets' },
      { label: 'Compétences', href: '#competences' },
      { label: 'GitHub', href: '#github' },
      { label: 'Contact', href: '#contact' },
    ],
    cv: 'CV',
    open: 'Menu',
    close: 'Fermer',
    switchLabel: 'EN',
    switchHref: '/en/',
    switchTitle: 'English version',
  },
  hero: {
    status: 'En alternance chez Agelid',
    location: 'Normandie, France',
    school: 'Bachelor CESI Rouen',
    role: 'Développeur informatique',
    stack: 'Flutter & Java',
    introduction:
      "Je travaille sur GarezVous, l'application de stationnement d'Agelid, sur mobile et sur web en Flutter. J'ai mené sa refonte et ajouté le stationnement avec et sans compte. J'aime autant soigner une interface que comprendre le métier qui se cache derrière.",
    highlights: [
      { term: 'Actuellement', detail: 'Alternance chez Agelid' },
      { term: 'Projet phare', detail: 'GarezVous, en production sur iOS, Android et web' },
      { term: 'Formation', detail: 'Bac+2 obtenu, Bachelor (Bac+3) en cours au CESI' },
    ],
    cta: 'Voir les projets',
  },
  sections: {
    profile: { label: 'Profil', title: 'Du mobile au back-office.' },
    projects: {
      label: 'Projets',
      title: 'Travaux choisis.',
      intro: 'Un projet professionnel en production, et des projets réalisés en formation.',
    },
    skills: {
      label: 'Compétences',
      title: 'Outils du quotidien.',
      intro: 'Les technologies utilisées en cours, en projets et en alternance.',
    },
    now: {
      label: 'En ce moment',
      title: "Ce qui m'occupe.",
      intro: "Ce que j'apprends en ce moment, et ce qui m'occupe en dehors du code.",
    },
    github: {
      label: 'GitHub',
      title: 'Derniers dépôts.',
      intro: 'Mes dépôts publics les plus récents, synchronisés automatiquement.',
    },
  },
  profile: {
    about:
      "Alternant chez Agelid, éditeur de logiciels pour les collectivités, j'entame ma dernière année de Bachelor au CESI Rouen après avoir obtenu mon titre Développeur Informatique (Bac+2). Dans une équipe de trois développeurs, je porte le front de GarezVous de bout en bout : cadrage avec le back-end, conception des écrans, développement, tests et mise en production. Ma conviction : le code vient après la compréhension du besoin.",
    experienceTitle: 'Expérience',
    educationTitle: 'Formation',
    current: 'En cours',
    experiences: [
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
    ],
    education: [
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
    ],
  },
  projects: {
    featuredLabel: 'Projet professionnel — en production',
    roleLabel: 'Rôle',
    stackLabel: 'Stack',
    achievementsLabel: 'Réalisations',
    webCaption: 'Version web : même code Flutter que le mobile',
    items: {
      garezvous: {
        title: 'GarezVous',
        description:
          "Application de stationnement ponctuel destinée aux usagers des collectivités. Les communes clientes d'Agelid l'activent comme module depuis Logipol Web, la plateforme principale de l'entreprise.",
        role: "Refonte de l'application, sur mobile et sur web.",
        achievements: [
          'Ajout du stationnement avec compte.',
          "Ajout du stationnement sans compte, à partir de la seule plaque d'immatriculation.",
          "Refonte du design et du code de l'application.",
        ],
        screenAlts: [
          "Création d'un ticket de stationnement : choix de la zone sur la carte",
          "Accueil de GarezVous avec l'accès au stationnement sans compte",
          "Cartes d'abonnement et leurs statuts dans GarezVous",
        ],
        webAlt: "GarezVous Web : gestion des véhicules d'une carte d'abonnement",
      },
      whatsapp: {
        title: 'Clone de WhatsApp',
        description:
          "Messagerie mobile en Flutter adossée à une API PHP écrite sans framework : authentification par jeton, conversations, demandes d'amis et profils.",
      },
      videGrenier: {
        title: 'Vide Grenier en ligne',
        description:
          'Site de petites annonces de seconde main en PHP (MVC), conteneurisé avec Docker sur trois environnements (dev, recette, prod) et testé avec PHPUnit.',
      },
      apiValorant: {
        title: 'API Valorant',
        description:
          'API exposant les informations des agents du jeu Valorant, consommée par un front-end de consultation.',
      },
    },
  },
  skills: {
    levels: { advanced: 'Avancé', intermediate: 'Intermédiaire', beginner: 'Débutant' },
  },
  now: {
    ai: {
      title: 'IA & nouvelles technos',
      body: "Je suis de près l'évolution de l'IA et des technologies émergentes, et je teste ce qui peut améliorer ma façon de développer.",
      alt: 'Réseau de filaments lumineux évoquant un réseau de neurones',
    },
    code: {
      title: 'Approfondir Flutter & Java',
      body: "Je continue de monter en compétence sur les langages que j'utilise au quotidien, côté mobile comme côté back-office.",
      alt: 'Ordinateur portable affichant du code dans un éditeur',
    },
    games: {
      title: 'Jeux vidéo',
      body: "En dehors du code, je joue aussi bien à des jeux compétitifs qu'à des jeux solo, pour le challenge comme pour l'histoire.",
      alt: 'Manette de jeu rétroéclairée',
    },
  },
  github: {
    unavailable: 'Dépôts indisponibles pour le moment. Retrouvez-les sur',
    all: 'Tous les dépôts sur GitHub',
    stars: 'étoiles',
    dateLocale: 'fr-FR',
  },
  contact: {
    label: 'Contact',
    title: 'Une idée, un projet, une question ?',
    intro:
      "Le plus simple : un mail avec le contexte (sujet, stack, objectif). Sinon, le formulaire fait très bien l'affaire.",
    cvLabel: 'CV (PDF)',
    form: {
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer le message',
      sending: 'Envoi en cours',
      hint: 'Réponse sous 24 h',
      missing: 'Merci de remplir tous les champs.',
      invalidEmail: 'Adresse email invalide.',
      error: "Impossible d'envoyer le message pour le moment. Réessaie plus tard.",
      success: 'Merci, ton message a bien été envoyé.',
    },
  },
  footer: { backToTop: 'Retour en haut' },
};
