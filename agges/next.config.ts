import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.espaciourbano.cl',
      },
      {
        protocol: 'https',
        hostname: 'ecoed.cl',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.ebcoenergia.cl',
      },
      {
        protocol: 'https',
        hostname: 'crcconstructora.cl',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.fcab.cl',
      },
      {
        protocol: 'https',
        hostname: 'spanish.flandersinc.com',
      },
    ],
  },
};

export default nextConfig;
