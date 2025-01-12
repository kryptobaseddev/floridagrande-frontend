/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'upload.wikimedia.org',
      'ktla.com',
      'www.attractiontickets.com',
      'media1.thrillophilia.com',
      'www.horseillustrated.com',
      'orlandoinformer.com',
      'rn1.ede.myftpupload.com',
      'storage.googleapis.com', // For uploaded images
      'lh3.googleusercontent.com', // For Google profile pictures
      'avatars.githubusercontent.com', // For GitHub profile pictures
      'platform-lookaside.fbsbx.com' // For Facebook profile pictures
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ktla.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'www.attractiontickets.com',
        pathname: '/sites/**',
      },
      {
        protocol: 'https',
        hostname: 'media1.thrillophilia.com',
        pathname: '/filestore/**',
      },
      {
        protocol: 'https',
        hostname: 'www.horseillustrated.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'orlandoinformer.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'rn1.ede.myftpupload.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.fbsbx.com',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
        permanent: true,
      },
    ];
  },
  // Serve static files from the documentation/build directory
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: '/docs/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
