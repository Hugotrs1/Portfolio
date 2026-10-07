import type { Dictionary } from './types';

export const en: Dictionary = {
  locale: 'en',
  meta: {
    title: 'Hugo Troussel — Software Developer (Flutter & Java)',
    description:
      'Portfolio of Hugo Troussel, work-study software developer at Agelid. Redesign of GarezVous (Flutter), projects and GitHub repositories.',
    ogDescription: 'Work-study software developer — Flutter & Java.',
  },
  nav: {
    label: 'Main navigation',
    mobileLabel: 'Mobile navigation',
    items: [
      { label: 'Profile', href: '#profil' },
      { label: 'Projects', href: '#projets' },
      { label: 'Skills', href: '#competences' },
      { label: 'GitHub', href: '#github' },
      { label: 'Contact', href: '#contact' },
    ],
    cv: 'Resume',
    open: 'Menu',
    close: 'Close',
    switchLabel: 'FR',
    switchHref: '/',
    switchTitle: 'Version française',
  },
  hero: {
    status: 'Work-study at Agelid',
    location: 'Normandy, France',
    school: "Bachelor's at CESI Rouen",
    role: 'Software developer',
    stack: 'Flutter & Java',
    introduction:
      "I work on GarezVous, Agelid's parking app, on mobile and web with Flutter. I led its redesign and added parking with and without an account. I care as much about polishing an interface as about understanding the business behind it.",
    highlights: [
      { term: 'Currently', detail: 'Work-study at Agelid' },
      { term: 'Flagship project', detail: 'GarezVous, live on iOS, Android and web' },
      {
        term: 'Education',
        detail: "Two-year degree completed, Bachelor's (third year) in progress at CESI",
      },
    ],
    cta: 'See projects',
  },
  sections: {
    profile: { label: 'Profile', title: 'From mobile to back office.' },
    projects: {
      label: 'Projects',
      title: 'Selected work.',
      intro: 'One professional project in production, and projects built during my studies.',
    },
    skills: {
      label: 'Skills',
      title: 'Everyday tools.',
      intro: 'The technologies I use at school, in projects and at work.',
    },
    now: {
      label: 'Right now',
      title: 'What keeps me busy.',
      intro: "What I'm learning right now, and what keeps me busy away from code.",
    },
    github: {
      label: 'GitHub',
      title: 'Latest repositories.',
      intro: 'My most recent public repositories, synced automatically.',
    },
  },
  profile: {
    about:
      "Work-study student at Agelid, a software publisher for local authorities, I'm starting the final year of my Bachelor's at CESI Rouen after earning my Software Developer certification (two-year degree). In a team of three developers, I own the GarezVous front end from start to finish: scoping with the back end, screen design, development, testing and release. My belief: code comes after understanding the need.",
    experienceTitle: 'Experience',
    educationTitle: 'Education',
    current: 'Current',
    experiences: [
      {
        company: 'Agelid',
        role: 'Work-study software developer',
        period: 'Oct 2025 — present',
        details:
          'Redesign of GarezVous, the on-street parking app offered to client local authorities. I added parking with and without an account, and reworked both the design and the code of the app, on mobile and web.',
        technologies: ['Flutter', 'Dart', 'Java', 'JSP'],
        current: true,
      },
      {
        company: 'Agelid',
        role: 'Mobile development internship',
        period: 'Mar — Jun 2025',
        details:
          'Built a proof of concept (POC): a parking feature integrated into an existing mobile app, using simulated data.',
        technologies: ['Flutter', 'Dart', 'Java'],
      },
    ],
    education: [
      {
        title: "Bachelor's in Application Design & Development (Bac+3), work-study",
        school: 'CESI Rouen',
        year: '2026 — 2027',
      },
      {
        title: 'Software Developer certification (Bac+2), completed',
        school: 'CESI Rouen',
        year: '2024 — 2026',
      },
      {
        title: 'French Baccalaureate, Mathematics & Computer Science majors',
        school: 'Lycée Jacques Prévert, Pont-Audemer',
        year: '2024',
      },
    ],
  },
  projects: {
    featuredLabel: 'Professional project — in production',
    roleLabel: 'Role',
    stackLabel: 'Stack',
    achievementsLabel: 'What I built',
    webCaption: 'Web version: same Flutter code as mobile',
    screens: {
      hint: 'Select a screen to enlarge it',
      open: 'Open screen',
      close: 'Close',
      previous: 'Previous screen',
      next: 'Next screen',
    },
    items: {
      garezvous: {
        title: 'GarezVous',
        description:
          "On-street parking app for the residents of local authorities. Agelid's client towns enable it as a module from Logipol Web, the company's main platform.",
        role: 'Redesign of the app, on mobile and web.',
        achievements: [
          'Added parking with an account.',
          'Added parking without an account, using only the licence plate.',
          'Redesigned both the look and the code of the app.',
        ],
        screenTitles: ['Create a ticket', 'Home', 'Subscriptions'],
        screenAlts: [
          'Creating a parking ticket: choosing the zone on the map',
          'GarezVous home screen with access to parking without an account',
          'Subscription cards and their statuses in GarezVous',
        ],
        webAlt: "GarezVous Web: managing a subscription card's vehicles",
      },
      whatsapp: {
        title: 'WhatsApp clone',
        description:
          'Flutter messaging app backed by a PHP API written without a framework: token authentication, conversations, friend requests and profiles.',
      },
      videGrenier: {
        title: 'Vide Grenier en ligne',
        description:
          'Second-hand classifieds website in PHP (MVC), containerised with Docker across three environments (dev, staging, prod) and tested with PHPUnit.',
      },
      apiValorant: {
        title: 'Valorant API',
        description:
          'API serving information about Valorant agents, consumed by a browsing front end.',
      },
    },
  },
  skills: {
    levels: { advanced: 'Advanced', intermediate: 'Intermediate', beginner: 'Beginner' },
  },
  now: {
    ai: {
      title: 'AI & emerging tech',
      body: 'I closely follow how AI and emerging technologies evolve, and I try out whatever can improve the way I build software.',
      alt: 'Glowing filaments evoking a neural network',
    },
    code: {
      title: 'Going deeper with Flutter & Java',
      body: 'I keep leveling up on the languages I use every day, on mobile as well as on the back office.',
      alt: 'Laptop showing code in an editor',
    },
    games: {
      title: 'Video games',
      body: 'Away from code, I play both competitive and single-player games, for the challenge as much as for the story.',
      alt: 'Backlit game controller',
    },
  },
  github: {
    unavailable: 'Repositories are unavailable right now. Find them on',
    all: 'All repositories on GitHub',
    stars: 'stars',
    dateLocale: 'en-GB',
  },
  contact: {
    label: 'Contact',
    title: 'An idea, a project, a question?',
    intro:
      'The simplest way: an email with some context (topic, stack, goal). Otherwise, the form works just fine.',
    cvLabel: 'Resume (PDF, in French)',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending',
      hint: 'Reply within 24 hours',
      missing: 'Please fill in all fields.',
      invalidEmail: 'Invalid email address.',
      error: "Your message couldn't be sent right now. Please try again later.",
      success: 'Thanks, your message has been sent.',
    },
  },
  footer: { backToTop: 'Back to top' },
};
