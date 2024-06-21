/** @type {import('next').NextConfig} */

// TODO: Setup env when necessary
// const isProduction = process.env.NODE_ENV === "production";
const isProduction = true;
const repositoryName = "iskandarzhilmi.github.io";

const nextConfig = {
  output: "export",
  basePath: isProduction ? `/${repositoryName}` : "",
  assetPrefix: isProduction ? `/${repositoryName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
