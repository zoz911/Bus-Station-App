/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
// <<<<<<< HEAD
// =======
  // Fix static files issues
  output: 'standalone',
  trailingSlash: false,
  // Ensure CSS is properly loaded
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
// >>>>>>> 7bbc05a (fixing and updating broken functions)
}

export default nextConfig
