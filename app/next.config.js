/** @type {import('next').NextConfig} */
/** Keep in mind: Changes here do need a restart of the server */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.chem.uzh.ch"],
  },
};

module.exports = nextConfig;
