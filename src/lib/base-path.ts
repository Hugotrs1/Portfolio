// En export statique, next/image (unoptimized) n'ajoute pas le basePath
// aux fichiers de public/ : on le préfixe à la main.
export const basePath = process.env.NODE_ENV === "production" ? "/Portfolio" : "";

export const asset = (path: string) => `${basePath}${path}`;
