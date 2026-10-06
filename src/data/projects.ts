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
    id: 'videGrenier',
    kind: 'cours',
    tags: ['PHP', 'MariaDB', 'Docker', 'PHPUnit'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hugotrs1/Vide_grenier_en_ligne' }],
  },
  {
    id: 'apiValorant',
    kind: 'cours',
    tags: ['PHP', 'MySQL', 'JavaScript'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hugotrs1/API_Valo' }],
  },
];
