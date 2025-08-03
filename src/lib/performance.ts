// Performance monitoring utilities for Lighthouse optimization

export function measureWebVitals() {
  if (typeof window === 'undefined') return;

  // Core Web Vitals monitoring
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const metricName = entry.name;
      const value = Math.round(entry.value);
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'performance',
          event_label: metricName,
          value: value,
          custom_parameter_1: entry.rating || 'unknown'
        });
      }

      console.log(`${metricName}: ${value}ms`);
    }
  });

  // Observe Core Web Vitals
  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (error) {
    console.warn('Performance observer not supported:', error);
  }
}

export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    '/favicon.ico',
    '/logo.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

export function optimizeImages() {
  if (typeof window === 'undefined') return;

  // Add loading="lazy" to images below the fold
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    if (img.getBoundingClientRect().top > window.innerHeight) {
      img.loading = 'lazy';
    }
  });
}

export function enableServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize performance optimizations
export function initPerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Measure Web Vitals
  measureWebVitals();
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Optimize images
  optimizeImages();
  
  // Enable service worker for caching
  enableServiceWorker();
  
  // Prefetch important pages
  const prefetchLinks = [
    '/web-development',
    '/mobile-apps',
    '/json-translation',
    '/csv-translation'
  ];
  
  prefetchLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
}
