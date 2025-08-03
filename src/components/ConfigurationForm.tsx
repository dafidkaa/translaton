"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { HelpCircle, Key, Brain, Globe, RefreshCw, FileText, Palette, Plus } from "lucide-react";
import { TranslationConfig } from "./TranslatorApp";
import { getAllModels, addCustomModel, refreshModelCache, getCacheAge, type OpenRouterModel } from "../lib/modelScraper";
import { CustomModelDialog } from "./CustomModelDialog";
import { CustomLanguageDialog, type Language } from "./CustomLanguageDialog";
import { getAllLanguages, addCustomLanguage } from "../lib/languageCache";

interface ConfigurationFormProps {
  onSubmit: (config: TranslationConfig) => void;
  disabled?: boolean;
  initialConfig?: TranslationConfig;
  isPaused?: boolean;
}

// Popular OpenRouter models with descriptions
const MODELS = [
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    description: "Latest OpenAI model, excellent for translation",
    provider: "OpenAI"
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    description: "Faster and more cost-effective GPT-4 variant",
    provider: "OpenAI"
  },
  {
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's most capable model for complex tasks",
    provider: "Anthropic"
  },
  {
    id: "anthropic/claude-3-haiku",
    name: "Claude 3 Haiku",
    description: "Fast and efficient for simple translations",
    provider: "Anthropic"
  },
  {
    id: "google/gemini-pro-1.5",
    name: "Gemini Pro 1.5",
    description: "Google's advanced language model",
    provider: "Google"
  },
  {
    id: "meta-llama/llama-3.1-70b-instruct",
    name: "Llama 3.1 70B",
    description: "Meta's open-source model, good for translations",
    provider: "Meta"
  }
];

// Default target languages with flag emojis
const DEFAULT_LANGUAGES: Language[] = [
  { code: "Spanish", name: "Spanish", flag: "🇪🇸" },
  { code: "French", name: "French", flag: "🇫🇷" },
  { code: "German", name: "German", flag: "🇩🇪" },
  { code: "Italian", name: "Italian", flag: "🇮🇹" },
  { code: "Portuguese", name: "Portuguese", flag: "🇵🇹" },
  { code: "Dutch", name: "Dutch", flag: "🇳🇱" },
  { code: "Russian", name: "Russian", flag: "🇷🇺" },
  { code: "Chinese (Simplified)", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "Japanese", name: "Japanese", flag: "🇯🇵" },
  { code: "Korean", name: "Korean", flag: "🇰🇷" },
  { code: "Arabic", name: "Arabic", flag: "🇸🇦" },
  { code: "Hindi", name: "Hindi", flag: "🇮🇳" },
  { code: "Polish", name: "Polish", flag: "🇵🇱" },
  { code: "Swedish", name: "Swedish", flag: "🇸🇪" },
  { code: "Norwegian", name: "Norwegian", flag: "🇳🇴" },
  { code: "Croatian", name: "Croatian", flag: "🇭🇷" },
  { code: "Hungarian", name: "Hungarian", flag: "🇭🇺" },
];

export function ConfigurationForm({ onSubmit, disabled, initialConfig, isPaused }: ConfigurationFormProps) {
  const [apiKey, setApiKey] = useState(initialConfig?.apiKey || "");
  const [model, setModel] = useState(initialConfig?.model || "");
  const [targetLanguage, setTargetLanguage] = useState(initialConfig?.targetLanguage || "");
  const [description, setDescription] = useState(initialConfig?.description || "");
  const [tone, setTone] = useState(initialConfig?.tone || "");
  const [showApiKeyHelp, setShowApiKeyHelp] = useState(false);
  const [models, setModels] = useState<OpenRouterModel[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [cacheAge, setCacheAge] = useState<number>(-1);
  const [showCustomModelDialog, setShowCustomModelDialog] = useState(false);
  const [showCustomLanguageDialog, setShowCustomLanguageDialog] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);

  // Load models and languages on component mount
  useEffect(() => {
    loadModels();
    loadLanguages();
  }, []);

  const loadLanguages = () => {
    const allLanguages = getAllLanguages(DEFAULT_LANGUAGES);
    setLanguages(allLanguages);
  };

  const loadModels = async () => {
    setIsLoadingModels(true);
    try {
      const fetchedModels = await getAllModels();
      setModels(fetchedModels);
      setCacheAge(getCacheAge());
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleRefreshModels = async () => {
    setIsLoadingModels(true);
    try {
      const refreshedModels = await refreshModelCache();
      const allModels = await getAllModels();
      setModels(allModels);
      setCacheAge(getCacheAge());
    } catch (error) {
      console.error('Failed to refresh models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleAddCustomModel = async (customModel: OpenRouterModel) => {
    try {
      addCustomModel(customModel);
      await loadModels(); // Reload to include the new custom model
      setModel(customModel.id); // Auto-select the newly added model
    } catch (error) {
      console.error('Failed to add custom model:', error);
    }
  };

  const handleAddCustomLanguage = (customLanguage: Language) => {
    try {
      addCustomLanguage(customLanguage);
      loadLanguages(); // Reload to include the new custom language
      setTargetLanguage(customLanguage.code); // Auto-select the newly added language
    } catch (error) {
      console.error('Failed to add custom language:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      alert("Please enter your OpenRouter API key");
      return;
    }
    
    if (!model) {
      alert("Please select a translation model");
      return;
    }
    
    if (!targetLanguage) {
      alert("Please select a target language");
      return;
    }

    onSubmit({
      apiKey: apiKey.trim(),
      model,
      targetLanguage,
      description: description.trim() || undefined,
      tone: tone || undefined,
    });
  };

  const isFormValid = apiKey.trim() && model && targetLanguage;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
      {/* API Key Input */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Key className="h-4 w-4 text-gray-500" />
          <Label htmlFor="apiKey">OpenRouter API Key</Label>
          <button
            type="button"
            onClick={() => setShowApiKeyHelp(!showApiKeyHelp)}
            className="text-gray-400 hover:text-gray-600"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
        
        <Input
          id="apiKey"
          type="password"
          placeholder="sk-or-v1-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={disabled}
          className="font-mono"
        />
        
        {showApiKeyHelp && (
          <Card className="p-3 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-800">
              You can get your OpenRouter API key at{" "}
              <a 
                href="https://openrouter.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                openrouter.ai
              </a>
              . Create an account, go to Keys, and generate a new API key.
            </p>
          </Card>
        )}
      </div>

      {/* Model Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-gray-500" />
            <Label htmlFor="model">Translation Model</Label>
          </div>
          <div className="flex items-center space-x-2">
            {cacheAge >= 0 && (
              <span className="text-xs text-gray-500">
                Updated {cacheAge === 0 ? 'today' : `${cacheAge} days ago`}
              </span>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRefreshModels}
              disabled={isLoadingModels}
              className="h-6 w-6 p-0"
            >
              <RefreshCw className={`h-3 w-3 ${isLoadingModels ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <Select
          value={model}
          onValueChange={(value) => {
            if (value === "__add_custom__") {
              setShowCustomModelDialog(true);
            } else {
              setModel(value);
            }
          }}
          disabled={disabled || isLoadingModels}
        >
          <SelectTrigger>
            <SelectValue placeholder={isLoadingModels ? "Loading models..." : "Pick your translation model"} />
          </SelectTrigger>
          <SelectContent>
            {models.map((modelOption) => (
              <SelectItem key={modelOption.id} value={modelOption.id}>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{modelOption.name}</span>
                    {modelOption.ranking && modelOption.ranking <= 5 && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
                        #{modelOption.ranking}
                      </span>
                    )}
                    {modelOption.ranking === 999 && (
                      <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                        Custom
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{modelOption.description}</div>
                </div>
              </SelectItem>
            ))}

            {/* Add Custom Model Option */}
            <SelectItem value="__add_custom__">
              <div className="flex items-center space-x-2 text-blue-600">
                <Plus className="h-4 w-4" />
                <span className="font-medium">Add Custom Model...</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {model && (
          <div className="text-sm text-gray-600">
            Selected: {models.find(m => m.id === model)?.name} by {models.find(m => m.id === model)?.provider}
          </div>
        )}
      </div>

      {/* Target Language Selection */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-gray-500" />
          <Label htmlFor="language">Target Language</Label>
        </div>
        
        <Select
          value={targetLanguage}
          onValueChange={(value) => {
            if (value === "__add_custom_language__") {
              setShowCustomLanguageDialog(true);
            } else {
              setTargetLanguage(value);
            }
          }}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose your target language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className="flex items-center space-x-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {!DEFAULT_LANGUAGES.find(dl => dl.code === lang.code) && (
                    <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                      Custom
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}

            {/* Add Custom Language Option */}
            <SelectItem value="__add_custom_language__">
              <div className="flex items-center space-x-2 text-blue-600">
                <Plus className="h-4 w-4" />
                <span className="font-medium">Add Custom Language...</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Translation Context Description */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <Label htmlFor="description">Translation Context (Optional)</Label>
        </div>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you're translating (e.g., 'Mobile app for food delivery', 'E-commerce product catalog', 'Marketing website for SaaS platform', 'Game dialogue and UI text')..."
          disabled={disabled}
          className="min-h-[80px]"
        />
        <p className="text-xs text-gray-500">
          Help the AI understand the context for better translations. Mention the type of content, target audience, or industry.
        </p>
      </div>

      {/* Translation Tone & Style */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Palette className="h-4 w-4 text-gray-500" />
          <Label htmlFor="tone">Tone & Style (Optional)</Label>
        </div>
        <Select value={tone} onValueChange={setTone} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder="Choose translation tone and style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional & Formal</SelectItem>
            <SelectItem value="friendly">Friendly & Conversational</SelectItem>
            <SelectItem value="casual">Casual & Relaxed</SelectItem>
            <SelectItem value="technical">Technical & Precise</SelectItem>
            <SelectItem value="marketing">Marketing & Persuasive</SelectItem>
            <SelectItem value="neutral">Neutral & Balanced</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Choose the appropriate tone for your target audience and content type.
        </p>
      </div>

      {/* Cost Estimate */}
      {model && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2">💡 Cost Estimate</h4>
          <p className="text-sm text-yellow-700">
            Translation costs vary by model and text length. Most files cost between $0.10 - $2.00 to translate.
            You'll only be charged for successful API calls through OpenRouter.
          </p>
        </Card>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={disabled || !isFormValid}
        size="lg"
      >
        {disabled ? "Translating..." : isPaused ? "Update Settings & Resume" : "Start Translation"}
      </Button>
      </form>

      {/* Custom Model Dialog */}
    <CustomModelDialog
      open={showCustomModelDialog}
      onOpenChange={setShowCustomModelDialog}
      onAddModel={handleAddCustomModel}
    />

    {/* Custom Language Dialog */}
    <CustomLanguageDialog
      open={showCustomLanguageDialog}
      onOpenChange={setShowCustomLanguageDialog}
      onAddLanguage={handleAddCustomLanguage}
    />
    </>
  );
}
