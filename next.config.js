/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // The page used to live at the misspelled /portofolio.
    return [{ source: '/portofolio', destination: '/portfolio', permanent: true }];
  },
};

module.exports = nextConfig;
