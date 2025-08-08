/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Optimización mejorada de imágenes
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.mariosanchez.store',
        port: '',
        pathname: '/api/media/**',
      },
    ],
  },
  experimental: {
    // Optimizaciones de paquetes para reducir bundle size
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-icons'],
    // Preload links críticos
    typedRoutes: true,
    // Turbopack para desarrollo más rápido
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  compiler: {
    // Remover console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuraciones de producción
  poweredByHeader: false,
  compress: true,
  // Optimizaciones de webpack compatibles con Next.js
  webpack: (config, { dev, isServer }) => {
    // Solo en producción
    if (!dev && !isServer) {
      // Split chunks optimizado para Next.js
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 20,
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            chunks: 'all',
          },
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui',
            priority: 10,
            chunks: 'all',
          },
        },
      }
    }

    return config
  },
}

export default nextConfig
