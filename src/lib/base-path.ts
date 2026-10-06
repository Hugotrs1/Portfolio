// next/image (export statique, unoptimized) n'ajoute pas le basePath aux fichiers de public/.
const basePath = process.env.NODE_ENV === 'production' ? '/Portfolio' : '';

export const asset = (path: string) => `${basePath}${path}`;
