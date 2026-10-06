import type { NextConfig } from "next";

// Servi sur https://hugotrs1.github.io/Portfolio/ : le basePath doit
// correspondre exactement au nom du repo (sensible à la casse).
const repo = "Portfolio";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
