import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'garezvous',
    kind: 'pro',
    tags: ['Flutter', 'Dart'],
    links: [
      { label: 'Site', url: 'https://www.garezvous.fr/' },
      { label: 'App Store', url: 'https://apps.apple.com/fr/app/garezvous-fr/id6742316147' },
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.agelid.garezvous',
      },
    ],
    cover: '/images/photos/parking.webp',
    screens: [
      '/images/garezvous/mobile-stationnement.jpg',
      '/images/garezvous/mobile-accueil.jpg',
      '/images/garezvous/mobile-abonnements.jpg',
    ],
    webScreen: '/images/garezvous/web-vehicules.jpg',
  },
  {
    id: 'whatsapp',
    kind: 'cours',
    tags: ['Flutter', 'Dart', 'PHP', 'PostgreSQL'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hugotrs1/WhatsApp' }],
  },
  {
    id: 'jarvis',
    kind: 'perso',
    tags: ['Python', 'discord.py', 'SQLite', 'Docker'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hugotrs1/Bot_Discord_Jarvis' }],
  },
  {
    id: 'readLater',
    kind: 'perso',
    tags: ['JavaScript', 'Manifest V3', 'Discord'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hugotrs1/Extension_A_Lire_Plus_Tard' }],
  },
  {
    id: 'downloads',
    kind: 'perso',
    tags: ['Python', 'YAML'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hugotrs1/Rangement_Telechargements' }],
  },
];
