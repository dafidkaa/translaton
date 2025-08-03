// OpenRouter Model Scraper
// Fetches the most popular translation models from OpenRouter rankings

export interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  tokens?: string;
  change?: string;
  ranking?: number;
}

// Cache key for localStorage
const MODELS_CACHE_KEY = 'openrouter_translation_models';
const CACHE_TIMESTAMP_KEY = 'openrouter_models_timestamp';
const CUSTOM_MODELS_CACHE_KEY = 'openrouter_custom_models';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Fallback models in case scraping fails
const FALLBACK_MODELS: OpenRouterModel[] = [
  {
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's most capable model for complex tasks",
    provider: "Anthropic",
    ranking: 1
  },
  {
    id: "google/gemini-2.0-flash-exp",
    name: "Gemini 2.0 Flash",
    description: "Google's latest experimental model",
    provider: "Google",
    ranking: 2
  },
  {
    id: "google/gemini-pro-1.5",
    name: "Gemini Pro 1.5",
    description: "Google's advanced language model",
    provider: "Google",
    ranking: 3
  },
  {
    id: "deepseek/deepseek-chat",
    name: "DeepSeek Chat",
    description: "Advanced reasoning model",
    provider: "DeepSeek",
    ranking: 4
  },
  {
    id: "anthropic/claude-3-haiku",
    name: "Claude 3 Haiku",
    description: "Fast and efficient for simple translations",
    provider: "Anthropic",
    ranking: 5
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    description: "OpenAI's flagship multimodal model",
    provider: "OpenAI",
    ranking: 6
  },
  {
    id: "meta-llama/llama-3.1-70b-instruct",
    name: "Llama 3.1 70B",
    description: "Meta's open-source model, good for translations",
    provider: "Meta",
    ranking: 7
  }
];

/**
 * Scrapes OpenRouter translation rankings page
 */
async function scrapeOpenRouterRankings(): Promise<OpenRouterModel[]> {
  try {
    // Note: This would need a backend proxy to avoid CORS issues
    // For now, we'll simulate the scraping with a mock implementation
    
    // In a real implementation, you would:
    // 1. Set up a backend API endpoint that scrapes the OpenRouter rankings
    // 2. Parse the HTML to extract model information
    // 3. Return the structured data
    
    // Mock implementation that simulates fetching from rankings
    const mockRankingsData = await simulateRankingsFetch();
    return mockRankingsData;
    
  } catch (error) {
    console.error('Failed to scrape OpenRouter rankings:', error);
    return FALLBACK_MODELS;
  }
}

/**
 * Simulates fetching rankings data (replace with actual scraping)
 */
async function simulateRankingsFetch(): Promise<OpenRouterModel[]> {
  // This simulates the data structure from the rankings page
  // In production, this would be replaced with actual web scraping
  return [
    {
      id: "anthropic/claude-3.5-sonnet",
      name: "Claude Sonnet 4",
      description: "Anthropic's most capable model",
      provider: "Anthropic",
      tokens: "613B tokens",
      change: "↑11%",
      ranking: 1
    },
    {
      id: "google/gemini-2.5-flash",
      name: "Gemini 2.5 Flash",
      description: "Google's latest flash model",
      provider: "Google",
      tokens: "283B tokens",
      change: "↓15%",
      ranking: 2
    },
    {
      id: "google/gemini-2.0-flash",
      name: "Gemini 2.0 Flash",
      description: "Google's experimental model",
      provider: "Google",
      tokens: "273B tokens",
      change: "↑5%",
      ranking: 3
    },
    {
      id: "deepseek/deepseek-chat",
      name: "DeepSeek Chat",
      description: "Advanced reasoning model",
      provider: "DeepSeek",
      tokens: "213B tokens",
      change: "↑3%",
      ranking: 4
    },
    {
      id: "google/gemini-2.5-pro",
      name: "Gemini 2.5 Pro",
      description: "Google's pro model",
      provider: "Google",
      tokens: "164B tokens",
      change: "↓11%",
      ranking: 5
    }
  ];
}

/**
 * Gets cached models or fetches new ones if cache is expired
 */
export async function getTranslationModels(): Promise<OpenRouterModel[]> {
  try {
    // Skip cache operations during SSR
    if (typeof window === 'undefined') {
      return await scrapeOpenRouterRankings();
    }

    // Clear any invalid models from cache first
    clearInvalidModelsFromCache();

    // Check if we have cached data
    const cachedModels = localStorage.getItem(MODELS_CACHE_KEY);
    const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedModels && cacheTimestamp) {
      const timestamp = parseInt(cacheTimestamp);
      const now = Date.now();

      // If cache is still valid (less than 7 days old)
      if (now - timestamp < CACHE_DURATION) {
        const models: OpenRouterModel[] = JSON.parse(cachedModels);
        // Double-check that all cached models are valid
        const validModels = models.filter(model => validateModelId(model.id));
        if (validModels.length === models.length) {
          return models;
        }
      }
    }
    
    // Cache is expired or doesn't exist, fetch new data
    const models = await scrapeOpenRouterRankings();
    
    // Cache the results
    localStorage.setItem(MODELS_CACHE_KEY, JSON.stringify(models));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    
    return models;
    
  } catch (error) {
    console.error('Error getting translation models:', error);
    
    // Try to return cached data even if expired
    const cachedModels = localStorage.getItem(MODELS_CACHE_KEY);
    if (cachedModels) {
      return JSON.parse(cachedModels);
    }
    
    // Fall back to hardcoded models
    return FALLBACK_MODELS;
  }
}

/**
 * Forces a refresh of the model cache
 */
export async function refreshModelCache(): Promise<OpenRouterModel[]> {
  try {
    // Clear existing cache
    if (typeof window !== 'undefined') {
      localStorage.removeItem(MODELS_CACHE_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    }

    // Fetch fresh data
    return await getTranslationModels();
  } catch (error) {
    console.error('Error refreshing model cache:', error);
    return FALLBACK_MODELS;
  }
}

/**
 * Validates model IDs to ensure they exist in OpenRouter
 */
export function validateModelId(modelId: string): boolean {
  // List of known valid model ID patterns
  const validPatterns = [
    /^anthropic\/claude-/,
    /^google\/gemini-/,
    /^openai\/gpt-/,
    /^deepseek\/deepseek-chat/,
    /^meta-llama\/llama-/,
    /^mistralai\//,
    /^cohere\//
  ];

  return validPatterns.some(pattern => pattern.test(modelId));
}

/**
 * Clears invalid models from cache
 */
export function clearInvalidModelsFromCache(): void {
  try {
    if (typeof window === 'undefined') return;
    const cachedModels = localStorage.getItem(MODELS_CACHE_KEY);
    if (cachedModels) {
      const models: OpenRouterModel[] = JSON.parse(cachedModels);
      const validModels = models.filter(model => validateModelId(model.id));

      if (validModels.length !== models.length) {
        console.log('Clearing invalid models from cache');
        localStorage.removeItem(MODELS_CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }
    }
  } catch (error) {
    console.error('Error validating cached models:', error);
    localStorage.removeItem(MODELS_CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  }
}

/**
 * Gets the age of the current cache in days
 */
export function getCacheAge(): number {
  if (typeof window === 'undefined') return -1;
  const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!cacheTimestamp) return -1;

  const timestamp = parseInt(cacheTimestamp);
  const now = Date.now();
  const ageInDays = (now - timestamp) / (24 * 60 * 60 * 1000);

  return Math.floor(ageInDays);
}

/**
 * Gets custom models from localStorage
 */
export function getCustomModels(): OpenRouterModel[] {
  try {
    if (typeof window === 'undefined') return [];
    const customModels = localStorage.getItem(CUSTOM_MODELS_CACHE_KEY);
    return customModels ? JSON.parse(customModels) : [];
  } catch (error) {
    console.error('Error getting custom models:', error);
    return [];
  }
}

/**
 * Adds a custom model to localStorage
 */
export function addCustomModel(model: OpenRouterModel): void {
  try {
    if (typeof window === 'undefined') return;
    const customModels = getCustomModels();

    // Check if model already exists
    const existingIndex = customModels.findIndex(m => m.id === model.id);
    if (existingIndex >= 0) {
      // Update existing model
      customModels[existingIndex] = model;
    } else {
      // Add new model
      customModels.push(model);
    }

    localStorage.setItem(CUSTOM_MODELS_CACHE_KEY, JSON.stringify(customModels));
  } catch (error) {
    console.error('Error adding custom model:', error);
  }
}

/**
 * Removes a custom model from localStorage
 */
export function removeCustomModel(modelId: string): void {
  try {
    if (typeof window === 'undefined') return;
    const customModels = getCustomModels();
    const filteredModels = customModels.filter(m => m.id !== modelId);
    localStorage.setItem(CUSTOM_MODELS_CACHE_KEY, JSON.stringify(filteredModels));
  } catch (error) {
    console.error('Error removing custom model:', error);
  }
}

/**
 * Gets all models (default + custom) combined
 */
export async function getAllModels(): Promise<OpenRouterModel[]> {
  try {
    const defaultModels = await getTranslationModels();
    const customModels = getCustomModels();

    // Combine and sort by ranking
    const allModels = [...defaultModels, ...customModels];
    return allModels.sort((a, b) => (a.ranking || 999) - (b.ranking || 999));
  } catch (error) {
    console.error('Error getting all models:', error);
    return FALLBACK_MODELS;
  }
}
