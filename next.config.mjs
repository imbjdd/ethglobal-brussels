// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', /* add any other modules that might be causing the error */);
    return config;
  },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://67.207.72.8:3005/:path*',
          },
        ]
      },
};

export default nextConfig;
