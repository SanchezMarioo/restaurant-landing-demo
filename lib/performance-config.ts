// Resource hints and preloading configuration
export const RESOURCE_HINTS = {
  // Critical resources to preload
  preload: [
    {
      href: '/placeholder.svg',
      as: 'image',
      type: 'image/svg+xml',
    },
    // Add more critical resources here
  ],
  
  // External domains to preconnect
  preconnect: [
    'https://images.unsplash.com',
    'https://fonts.gstatic.com',
  ],
  
  // DNS prefetch for non-critical resources
  dnsPrefetch: [
    'https://tile.openstreetmap.org',
    'https://unpkg.com',
  ],
}

// Image optimization settings
export const IMAGE_CONFIG = {
  // Responsive image sizes
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
  // Quality settings based on priority
  quality: {
    high: 85,      // For above-the-fold images
    medium: 75,    // For below-the-fold images
    low: 60,       // For decorative images
  },
  
  // Default sizes attribute for responsive images
  sizes: {
    mobile: '100vw',
    tablet: '50vw', 
    desktop: '33vw',
    hero: '100vw',
  },
}

// Lazy loading configuration
export const LAZY_CONFIG = {
  // Intersection Observer options
  rootMargin: '50px',
  threshold: 0.1,
  
  // Component lazy loading delays
  componentDelay: 100,
  imageDelay: 200,
}

// Animation optimization
export const ANIMATION_CONFIG = {
  // Respect user's motion preferences
  respectReducedMotion: true,
  
  // Default animation settings
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
  },
  
  easing: {
    default: 'easeOut',
    bounce: 'easeInOut',
    spring: 'spring(1, 80, 10, 0)',
  },
}
