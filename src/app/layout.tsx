import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/sonner";

// Optimize Poppins font loading for Lighthouse performance
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap', // Ensures text remains visible during font swap
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://translaton.com'),
  title: {
    default: "Translaton - Universal AI Translation Platform",
    template: "%s | Translaton"
  },
  description: "Translate ANY file format to ANY language with 15+ premium AI models. Support for JSON, CSV, HTML, PO, XML, TXT, YAML files. Professional translation automation for developers, marketers, and growing teams.",
  keywords: [
    "AI translation",
    "file translation",
    "JSON translation",
    "CSV translation",
    "HTML translation",
    "PO file translation",
    "WordPress translation",
    "bulk translation",
    "automated translation",
    "developer tools",
    "localization",
    "internationalization",
    "OpenRouter",
    "Claude",
    "GPT translation"
  ],
  authors: [{ name: "Translaton" }],
  creator: "Translaton",
  publisher: "Translaton",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://translaton.com',
    siteName: 'Translaton',
    title: 'Translaton - Universal AI Translation Platform',
    description: 'Translate ANY file format to ANY language with 15+ premium AI models. Professional translation automation for developers and enterprises.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Translaton - Universal AI Translation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Translaton - Universal AI Translation Platform',
    description: 'Translate ANY file format to ANY language with 15+ premium AI models.',
    images: ['/og-image.png'],
    creator: '@translaton',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://translaton.com',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/icon-192x192.png',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Translaton",
    "description": "Universal AI Translation Platform for any file format",
    "url": "https://translaton.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Translaton"
    },
    "featureList": [
      "JSON file translation",
      "CSV file translation",
      "HTML file translation",
      "PO/POT file translation",
      "XML file translation",
      "YAML file translation",
      "15+ AI models",
      "100+ languages",
      "Bulk translation",
      "Real-time progress"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://translaton.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#155dfc" />
        <meta name="msvalidate.01" content="6A39E20A92DFA1100DECF03DD119E043" />

        {/* Performance Optimization - Resource Hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://api.indexnow.org" />

        {/* Critical CSS for LCP optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            *{box-sizing:border-box}
            body{font-family:'Poppins',system-ui,-apple-system,sans-serif;margin:0;padding:0;line-height:1.6;color:#1f2937;background:#fff;-webkit-font-smoothing:antialiased}
            .hero-section{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(to bottom right,#dbeafe,#fff,#e0e7ff);position:relative}
            .hero-content{text-align:center;max-width:1200px;padding:2rem}
            .hero-title{font-size:clamp(2.5rem,5vw,4rem);font-weight:700;line-height:1.2;margin-bottom:1.5rem;color:#1f2937}
            .hero-gradient-text{background:linear-gradient(135deg,#155dfc 0%,#4f46e5 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
            .hero-description{font-size:1.25rem;color:#6b7280;margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto}
            .hero-button{display:inline-flex;align-items:center;gap:0.5rem;background:linear-gradient(135deg,#155dfc 0%,#4f46e5 100%);color:white;padding:1rem 2rem;border-radius:0.75rem;text-decoration:none;font-weight:600;font-size:1.125rem;box-shadow:0 4px 20px rgba(21,93,252,0.15);transition:transform 0.2s ease}
            .hero-button:hover{transform:translateY(-2px)}
            .header{position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);border-bottom:1px solid rgba(0,0,0,0.1);z-index:50;padding:1rem 0}
            .nav-container{max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;justify-content:space-between}
            .logo{font-size:1.5rem;font-weight:700;color:#1f2937;text-decoration:none}
            @media (max-width:768px){.hero-title{font-size:2.5rem}.hero-description{font-size:1.125rem}.hero-content{padding:1rem}}
          `
        }} />

        {/* Optimize font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Google Analytics with BFCache optimization */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3PC4TDWLLE"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3PC4TDWLLE');

              // BFCache optimization
              window.addEventListener('pageshow', function(event) {
                if (event.persisted) {
                  gtag('event', 'page_view');
                }
              });
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "sorrxfxyua");
            `,
          }}
        />

        {/* Performance Optimization - BFCache Compatible */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // BFCache compatible performance monitoring
              if (typeof window !== 'undefined') {
                let observer;

                function measureWebVitals() {
                  if ('PerformanceObserver' in window && !observer) {
                    observer = new PerformanceObserver((list) => {
                      for (const entry of list.getEntries()) {
                        if (window.gtag) {
                          window.gtag('event', 'web_vitals', {
                            event_category: 'performance',
                            event_label: entry.name,
                            value: Math.round(entry.value)
                          });
                        }
                      }
                    });
                    try {
                      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
                    } catch (e) {}
                  }
                }

                function cleanup() {
                  if (observer) {
                    observer.disconnect();
                    observer = null;
                  }
                }

                // BFCache event handlers
                window.addEventListener('pageshow', (event) => {
                  if (event.persisted) {
                    measureWebVitals();
                  }
                });

                window.addEventListener('pagehide', cleanup);
                window.addEventListener('beforeunload', cleanup);

                // Initialize
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', measureWebVitals);
                } else {
                  measureWebVitals();
                }
              }
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-poppins antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
