// Google Analytics 4 event tracking utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Track a custom event in Google Analytics
 * @param action The action being performed
 * @param category The category of the event
 * @param label Optional label for the event
 * @param value Optional numeric value
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track page views (automatically handled by GA4, but useful for SPA navigation)
 * @param url The page URL
 * @param title The page title
 */
export function trackPageView(url: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-3PC4TDWLLE', {
      page_location: url,
      page_title: title,
    });
  }
}

/**
 * Track translation events
 */
export const trackTranslation = {
  started: (fileType: string, targetLanguage: string, fileSize?: number) => {
    trackEvent('translation_started', 'translation', `${fileType}_to_${targetLanguage}`, fileSize);
  },
  
  completed: (fileType: string, targetLanguage: string, duration?: number) => {
    trackEvent('translation_completed', 'translation', `${fileType}_to_${targetLanguage}`, duration);
  },
  
  failed: (fileType: string, targetLanguage: string, error?: string) => {
    trackEvent('translation_failed', 'translation', `${fileType}_to_${targetLanguage}_${error}`);
  },
  
  downloaded: (fileType: string, targetLanguage: string) => {
    trackEvent('translation_downloaded', 'translation', `${fileType}_to_${targetLanguage}`);
  }
};

/**
 * Track user engagement events
 */
export const trackEngagement = {
  fileUploaded: (fileType: string, fileSize?: number) => {
    trackEvent('file_uploaded', 'engagement', fileType, fileSize);
  },
  
  modelChanged: (modelName: string) => {
    trackEvent('model_changed', 'engagement', modelName);
  },
  
  languageChanged: (language: string) => {
    trackEvent('language_changed', 'engagement', language);
  },
  
  contactFormOpened: () => {
    trackEvent('contact_form_opened', 'engagement');
  },
  
  contactFormSubmitted: (category: string) => {
    trackEvent('contact_form_submitted', 'engagement', category);
  },
  
  cookiesAccepted: () => {
    trackEvent('cookies_accepted', 'engagement');
  },
  
  cookiesRejected: () => {
    trackEvent('cookies_rejected', 'engagement');
  }
};

/**
 * Track navigation events
 */
export const trackNavigation = {
  pageVisited: (pageName: string) => {
    trackEvent('page_visited', 'navigation', pageName);
  },
  
  externalLinkClicked: (url: string) => {
    trackEvent('external_link_clicked', 'navigation', url);
  },
  
  ctaClicked: (ctaName: string, location: string) => {
    trackEvent('cta_clicked', 'navigation', `${ctaName}_${location}`);
  }
};

/**
 * Track conversion events
 */
export const trackConversion = {
  signupStarted: () => {
    trackEvent('signup_started', 'conversion');
  },
  
  signupCompleted: () => {
    trackEvent('signup_completed', 'conversion');
  },
  
  firstTranslation: (fileType: string) => {
    trackEvent('first_translation', 'conversion', fileType);
  }
};
