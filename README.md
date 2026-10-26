# Portfolio

Mon portfolio : https://portfolio.hugotrs.fr

Fait avec Next.js, TypeScript et Tailwind CSS. Export statique (`out/`) servi par Caddy sur mon VPS.

## Commandes

```bash
npm install
npm run dev       # http://localhost:3000
npm run deploy    # build + envoi sur le serveur (alias SSH « hugotrs », clé chargée dans l'agent SSH)
```

Le formulaire de contact a besoin des clés EmailJS dans `.env.local` (jamais commité) au moment du build.
