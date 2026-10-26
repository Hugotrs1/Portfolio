// Envoie out/ (export statique de Next.js) sur le serveur, puis remplace l'ancienne version d'un coup.
// Utilise l'alias SSH « hugotrs » (voir ~/.ssh/config) : la clé doit être chargée dans l'agent SSH.
// Pour revenir à la version précédente :
//   ssh hugotrs "cd /srv/sites && mv portfolio portfolio.new && mv portfolio.old portfolio"
import { execFileSync } from 'node:child_process';

const cible = '/srv/sites/portfolio';
const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'inherit' });

console.log('→ Envoi de out/ vers le serveur…');
run('ssh', ['hugotrs', `rm -rf ${cible}.new`]);
run('scp', ['-r', '-q', 'out', `hugotrs:${cible}.new`]);

console.log('→ Bascule vers la nouvelle version…');
run('ssh', ['hugotrs', `rm -rf ${cible}.old && mv ${cible} ${cible}.old && mv ${cible}.new ${cible}`]);

console.log('✅ En ligne sur https://portfolio.hugotrs.fr');
