import type { NextConfig } from 'next';

// Export statique (dossier out/), servi par Caddy sur https://portfolio.hugotrs.fr
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;