// Lazy loading components to reduce initial bundle size
import { lazy } from 'react';

// Lazy load heavy components that are not critical for LCP
export const TranslatorApp = lazy(() => import('./TranslatorApp'));
export const ContactForm = lazy(() => import('./ContactForm'));
export const CookieConsent = lazy(() => import('./CookieConsent'));

// Lazy load icons to reduce bundle size
export const LazyIcons = {
  ArrowRight: lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowRight }))),
  CheckCircle: lazy(() => import('lucide-react').then(mod => ({ default: mod.CheckCircle }))),
  Globe: lazy(() => import('lucide-react').then(mod => ({ default: mod.Globe }))),
  Zap: lazy(() => import('lucide-react').then(mod => ({ default: mod.Zap }))),
  Shield: lazy(() => import('lucide-react').then(mod => ({ default: mod.Shield }))),
  Languages: lazy(() => import('lucide-react').then(mod => ({ default: mod.Languages }))),
  Sparkles: lazy(() => import('lucide-react').then(mod => ({ default: mod.Sparkles }))),
  Code: lazy(() => import('lucide-react').then(mod => ({ default: mod.Code }))),
  Smartphone: lazy(() => import('lucide-react').then(mod => ({ default: mod.Smartphone }))),
  FileText: lazy(() => import('lucide-react').then(mod => ({ default: mod.FileText }))),
  Database: lazy(() => import('lucide-react').then(mod => ({ default: mod.Database }))),
  Palette: lazy(() => import('lucide-react').then(mod => ({ default: mod.Palette }))),
  Users: lazy(() => import('lucide-react').then(mod => ({ default: mod.Users }))),
};

// Preload critical icons
export const preloadCriticalIcons = () => {
  if (typeof window !== 'undefined') {
    // Preload only the most critical icons
    import('lucide-react').then(mod => {
      // Cache the most used icons
      const criticalIcons = [mod.ArrowRight, mod.CheckCircle, mod.Globe];
      return criticalIcons;
    });
  }
};

// Component wrapper for lazy icons with fallback
export const LazyIcon = ({ 
  name, 
  className = '', 
  fallback = <div className={`w-6 h-6 bg-gray-200 rounded ${className}`} />
}: {
  name: keyof typeof LazyIcons;
  className?: string;
  fallback?: React.ReactNode;
}) => {
  const IconComponent = LazyIcons[name];
  
  return (
    <IconComponent 
      className={className}
      fallback={fallback}
    />
  );
};
