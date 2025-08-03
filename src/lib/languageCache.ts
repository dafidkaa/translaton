import { Language } from "../components/CustomLanguageDialog";

// Cache key for localStorage
const CUSTOM_LANGUAGES_CACHE_KEY = 'custom_languages';

/**
 * Gets custom languages from localStorage
 */
export function getCustomLanguages(): Language[] {
  try {
    if (typeof window === 'undefined') return [];
    
    const customLanguages = localStorage.getItem(CUSTOM_LANGUAGES_CACHE_KEY);
    return customLanguages ? JSON.parse(customLanguages) : [];
  } catch (error) {
    console.error('Error getting custom languages:', error);
    return [];
  }
}

/**
 * Adds a custom language to localStorage
 */
export function addCustomLanguage(language: Language): void {
  try {
    if (typeof window === 'undefined') return;
    
    const customLanguages = getCustomLanguages();
    
    // Check if language already exists
    const existingIndex = customLanguages.findIndex(l => l.code === language.code);
    if (existingIndex >= 0) {
      // Update existing language
      customLanguages[existingIndex] = language;
    } else {
      // Add new language
      customLanguages.push(language);
    }
    
    localStorage.setItem(CUSTOM_LANGUAGES_CACHE_KEY, JSON.stringify(customLanguages));
  } catch (error) {
    console.error('Error adding custom language:', error);
  }
}

/**
 * Removes a custom language from localStorage
 */
export function removeCustomLanguage(languageCode: string): void {
  try {
    if (typeof window === 'undefined') return;
    
    const customLanguages = getCustomLanguages();
    const filteredLanguages = customLanguages.filter(l => l.code !== languageCode);
    localStorage.setItem(CUSTOM_LANGUAGES_CACHE_KEY, JSON.stringify(filteredLanguages));
  } catch (error) {
    console.error('Error removing custom language:', error);
  }
}

/**
 * Gets all languages (default + custom) combined
 */
export function getAllLanguages(defaultLanguages: Language[]): Language[] {
  try {
    const customLanguages = getCustomLanguages();
    
    // Combine and remove duplicates (custom languages override default ones with same code)
    const allLanguages = [...defaultLanguages];
    
    customLanguages.forEach(customLang => {
      const existingIndex = allLanguages.findIndex(lang => lang.code === customLang.code);
      if (existingIndex >= 0) {
        // Replace existing with custom version
        allLanguages[existingIndex] = customLang;
      } else {
        // Add new custom language
        allLanguages.push(customLang);
      }
    });
    
    // Sort alphabetically by name
    return allLanguages.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error getting all languages:', error);
    return defaultLanguages;
  }
}
