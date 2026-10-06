import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "GarezVous",
    kind: "pro",
    description:
      "Application de stationnement ponctuel destinée aux usagers des collectivités. Les communes clientes d'Agelid l'activent comme module depuis Logipol Web, la plateforme principale de l'entreprise.",
    role: "Refonte de l'application, sur mobile et sur web.",
    achievements: [
      "Ajout du stationnement avec compte.",
      "Ajout du stationnement sans compte, à partir de la seule plaque d'immatriculation.",
      "Refonte du design et du code de l'application.",
    ],
    tags: ["Flutter", "Dart"],
    links: [
      { label: "Site", url: "https://www.garezvous.fr/" },
      { label: "App Store", url: "https://apps.apple.com/fr/app/garezvous-fr/id6742316147" },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.agelid.garezvous",
      },
    ],
    cover: {
      src: "/images/photos/parking.webp",
      alt: "Vue aérienne d'un parking urbain",
    },
    screens: [
      { src: "/images/garezvous/mobile-menu.jpg", alt: "Menu de navigation de GarezVous" },
      {
        src: "/images/garezvous/mobile-accueil.jpg",
        alt: "Accueil de GarezVous avec l'accès au stationnement sans compte",
      },
      {
        src: "/images/garezvous/mobile-abonnements.jpg",
        alt: "Cartes d'abonnement et leurs statuts dans GarezVous",
      },
    ],
    webScreen: {
      src: "/images/garezvous/web-vehicules.jpg",
      alt: "GarezVous Web : gestion des véhicules d'une carte d'abonnement",
    },
  },
  {
    title: "Projet SQL — GTA",
    kind: "cours",
    description:
      "Base de données relationnelle sur le thème de GTA : modélisation, jeux de données et requêtes.",
    tags: ["SQL", "MySQL"],
    links: [{ label: "GitHub", url: "https://github.com/Hugotrs1/Projet_SQL" }],
  },
  {
    title: "API Valorant",
    kind: "cours",
    description:
      "API exposant les informations des agents du jeu Valorant, consommée par un front-end de consultation.",
    tags: ["PHP", "MySQL", "JavaScript"],
    links: [{ label: "GitHub", url: "https://github.com/Hugotrs1/API_VALO" }],
  },
];
