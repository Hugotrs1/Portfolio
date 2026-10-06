# Portfolio — Hugo Troussel

Portfolio personnel, développé avec Next.js (App Router), TypeScript, Tailwind CSS v4,
Framer Motion et Lenis. Exporté en statique et déployé sur GitHub Pages :
https://hugotrs1.github.io/Portfolio/

## Prérequis

Node.js 20 ou plus (version LTS recommandée) : https://nodejs.org/fr/download

## Développement

```bash
npm install      # une seule fois, puis après chaque changement de dépendances
npm run dev      # serveur local sur http://localhost:3000, rechargement à chaud
```

## Compiler

```bash
npm run lint     # vérifie le code
npm run build    # génère le site statique dans out/
```

Le dossier `out/` est prévu pour être servi sous `/Portfolio/` (GitHub Pages) : l'ouvrir
directement depuis le disque ne fonctionne pas, il faut passer par le déploiement ou par
`npm run dev`.

Le formulaire de contact passe par EmailJS. En local, renseigner dans `.env.local` :

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
```

## Structure

- `src/data/` : tout le contenu (profil, expériences, projets, compétences).
- `src/components/` : sections de la page et primitives d'animation.
- `public/images/` : captures GarezVous et photos d'illustration.
- `public/icons/` : logos des technologies.

## Déploiement

Chaque push sur `master` déclenche `.github/workflows/deploy.yml`, qui build l'export
statique (`out/`) et le publie sur GitHub Pages.

## Crédits

- Photos : [Unsplash](https://unsplash.com) (licence Unsplash).
- Logos des technologies : [Devicon](https://devicon.dev) (MIT).
- Captures GarezVous : fiche App Store de l'application.
