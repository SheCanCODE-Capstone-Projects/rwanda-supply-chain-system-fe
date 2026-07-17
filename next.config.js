/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Ensure Turbopack resolves the project root from this config file location
    root: __dirname,
  },
};

module.exports = nextConfig;
