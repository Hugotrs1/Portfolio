# Portfolio

Mon portfolio : https://portfolio.hugotrs.fr

Fait avec Next.js, TypeScript et Tailwind CSS. Export statique (`out/`) servi par Caddy sur mon VPS.

## Commandes

```bash
npm install
npm run dev       # http://localhost:3000
npm run deploy    # build + envoi sur le serveur (alias SSH « hugotrs », clé chargée dans l'agent SSH)
```

Le formulaire de contact envoie à `/api/contact`, servi en production par le service `contact` du VPS (voir `infra-vps/apps/contact`). Il ne marche donc pas en `npm run dev`.
