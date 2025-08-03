"use client";

import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { ConfigurationForm } from "./ConfigurationForm";
import { TranslationProgress } from "./TranslationProgress";
import { TranslationTable } from "./TranslationTable";
import { DownloadResult } from "./DownloadResult";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Languages, Sparkles } from "lucide-react";

// Types for our application state
export interface PoEntry {
  msgid: string;
  msgstr: string;
  comments?: string[];
  flags?: string[];
  references?: string[];
}

export interface TranslationConfig {
  apiKey: string;
  model: string;
  targetLanguage: string;
  description?: string;
  tone?: string;
}

export interface TranslationState {
  status: 'idle' | 'uploading' | 'configuring' | 'translating' | 'paused' | 'completed' | 'error' | 'cancelled';
  file?: File;
  poEntries?: PoEntry[];
  config?: TranslationConfig;
  progress?: number;
  translatedEntries?: PoEntry[];
  error?: string;
  downloadUrl?: string;
  isStopRequested?: boolean;
  hasManualEdits?: boolean;
}

interface TranslatorAppProps {
  onBack?: () => void;
}

export function TranslatorApp({ onBack }: TranslatorAppProps = {}) {
  const [state, setState] = useState<TranslationState>({ status: 'idle' });
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const handleFileUpload = (file: File, entries: PoEntry[]) => {
    setState({
      status: 'configuring',
      file,
      poEntries: entries,
    });
  };

  const handleConfigSubmit = (config: TranslationConfig) => {
    const controller = new AbortController();
    setAbortController(controller);

    setState(prev => ({
      ...prev,
      status: 'translating',
      config,
      progress: 0,
      isStopRequested: false,
    }));

    // Start translation process
    startTranslation(config, controller);
  };

  const handleStopTranslation = () => {
    if (abortController) {
      abortController.abort();
    }
    setState(prev => ({
      ...prev,
      status: 'cancelled',
      isStopRequested: true,
    }));
  };

  const handlePauseTranslation = () => {
    // Abort the current translation process
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setState(prev => ({
      ...prev,
      status: 'paused',
    }));
  };

  const handleResumeTranslation = () => {
    if (!state.config) return;

    // Create new abort controller for resumed translation
    const controller = new AbortController();
    setAbortController(controller);

    setState(prev => ({
      ...prev,
      status: 'translating',
    }));

    // Resume translation from where we left off
    startTranslation(state.config, controller);
  };

  const handleUpdateTranslation = (index: number, newTranslation: string) => {
    if (!state.poEntries || !state.translatedEntries) return;

    // Find the actual entry in the original array
    const displayEntries = state.poEntries.filter(entry => entry.msgid.trim() !== '');
    const targetEntry = displayEntries[index];

    if (!targetEntry) return;

    // Update the translated entries
    const updatedTranslatedEntries = state.translatedEntries.map(entry => {
      if (entry.msgid === targetEntry.msgid) {
        return { ...entry, msgstr: newTranslation };
      }
      return entry;
    });

    setState(prev => ({
      ...prev,
      translatedEntries: updatedTranslatedEntries,
      hasManualEdits: true,
    }));

    // Regenerate download URL with updated translations
    regenerateDownloadUrl(updatedTranslatedEntries);
  };

  const regenerateDownloadUrl = (updatedEntries: PoEntry[]) => {
    try {
      const poContent = generatePoFile(updatedEntries);
      const blob = new Blob([poContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      // Clean up previous URL
      if (state.downloadUrl) {
        URL.revokeObjectURL(state.downloadUrl);
      }

      setState(prev => ({
        ...prev,
        downloadUrl: url,
      }));
    } catch (error) {
      console.error('Failed to regenerate download URL:', error);
    }
  };

  const startTranslation = async (config: TranslationConfig, controller: AbortController) => {
    if (!state.poEntries) return;

    try {
      // Start from existing translated entries if resuming
      const existingTranslated = state.translatedEntries || [];
      const translatedEntries: PoEntry[] = [...existingTranslated];
      const totalEntries = state.poEntries.filter(entry => entry.msgid.trim() !== '').length;
      let processedEntries = existingTranslated.filter(entry => entry.msgid.trim() !== '').length;

      for (const entry of state.poEntries) {
        // Check if stop was requested
        if (controller.signal.aborted) {
          console.log('Translation aborted by user');
          return; // Exit cleanly when aborted
        }

        if (entry.msgid.trim() === '') {
          // Keep empty entries as-is
          if (!translatedEntries.find(t => t.msgid === entry.msgid)) {
            translatedEntries.push(entry);
          }
          continue;
        }

        // Skip if already translated (for resume functionality)
        if (translatedEntries.find(t => t.msgid === entry.msgid && t.msgstr.trim() !== '')) {
          continue;
        }

        // Call OpenRouter API for translation
        const translatedText = await translateText(entry.msgid, config, controller.signal);

        const newTranslatedEntry = {
          ...entry,
          msgstr: translatedText,
        };

        // Update or add the translated entry
        const existingIndex = translatedEntries.findIndex(t => t.msgid === entry.msgid);
        if (existingIndex >= 0) {
          translatedEntries[existingIndex] = newTranslatedEntry;
        } else {
          translatedEntries.push(newTranslatedEntry);
        }

        processedEntries++;
        const progress = Math.round((processedEntries / totalEntries) * 100);

        // Update state with current progress and translated entries for live view
        setState(prev => ({
          ...prev,
          progress,
          translatedEntries: [...translatedEntries],
        }));

        // Add small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Generate downloadable .po file
      const poContent = generatePoFile(translatedEntries, state.file?.name || 'translated.po');
      const blob = new Blob([poContent], { type: 'text/plain' });
      const downloadUrl = URL.createObjectURL(blob);

      setState(prev => ({
        ...prev,
        status: 'completed',
        translatedEntries,
        downloadUrl,
      }));

    } catch (error) {
      // Don't show error if translation was aborted (paused/stopped)
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Translation was aborted');
        return;
      }

      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Translation failed',
      }));
    }
  };

  const translateText = async (text: string, config: TranslationConfig, signal?: AbortSignal): Promise<string> => {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Translaton Universal Translation Platform',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the given text to ${config.targetLanguage}. Return only the translated text, no explanations or additional content. Preserve any HTML tags, placeholders like %s, %d, or {{variables}} exactly as they appear.${config.description ? `\n\nContext: This text is from ${config.description}. Use this context to provide more accurate and appropriate translations.` : ''}${config.tone ? `\n\nTone: Use a ${config.tone} tone and style in your translations.` : ''}`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || text;
  };

  const generatePoFile = (entries: PoEntry[], originalFilename: string): string => {
    let content = `# Translation file generated by AI-Powered WordPress Language File Translator
# Original file: ${originalFilename}
# Generated on: ${new Date().toISOString()}

`;

    for (const entry of entries) {
      // Add comments
      if (entry.comments) {
        for (const comment of entry.comments) {
          content += `${comment}\n`;
        }
      }

      // Add references
      if (entry.references) {
        for (const reference of entry.references) {
          content += `#: ${reference}\n`;
        }
      }

      // Add flags
      if (entry.flags) {
        for (const flag of entry.flags) {
          content += `#, ${flag}\n`;
        }
      }

      // Add msgid and msgstr
      content += `msgid "${entry.msgid}"\n`;
      content += `msgstr "${entry.msgstr}"\n\n`;
    }

    return content;
  };

  const resetApp = () => {
    setState({ status: 'idle' });
  };

  // Determine current step based on state
  const getCurrentStep = () => {
    switch (state.status) {
      case 'idle':
        return 1;
      case 'uploading':
        return 1;
      case 'configuring':
        return 2;
      case 'translating':
      case 'paused':
        return 3;
      case 'completed':
        return 4;
      case 'cancelled':
        return 4;
      case 'error':
        // Return the step where error occurred
        if (state.file) return 2; // Error during config
        return 1; // Error during upload
      default:
        return 1;
    }
  };

  const currentStep = getCurrentStep();

  const steps = [
    { number: 1, title: 'Upload File', description: 'Choose your translation file' },
    { number: 2, title: 'Configure', description: 'Set translation options' },
    { number: 3, title: 'Translate', description: 'AI translation in progress' },
    { number: 4, title: 'Download', description: 'Get your translated file' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="mr-4 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to home
                </Button>
              )}
              <div className="flex items-center space-x-3">
                {/* Logo */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl shadow-lg bg-white p-1">
                  <img
                    src="/logo.png"
                    alt="Translaton Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Translaton</h1>
                  <p className="text-xs text-gray-500 -mt-1">AI Translation Platform</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-gray-600 font-medium">Universal AI Translation Platform</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 rounded-full mr-3" style={{background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)'}}></div>
                <h3 className="font-bold text-gray-900">Translation Steps</h3>
              </div>
              <nav className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step.number} className={`relative flex items-start p-3 rounded-lg transition-all duration-200 ${
                    step.number === currentStep
                      ? 'bg-blue-50 border border-blue-200'
                      : step.number < currentStep
                      ? 'bg-green-50 border border-green-200'
                      : 'hover:bg-gray-50'
                  }`}>
                    {/* Connection line */}
                    {index < steps.length - 1 && (
                      <div className={`absolute left-6 top-11 w-0.5 h-6 ${
                        step.number < currentStep ? 'bg-green-300' : 'bg-gray-200'
                      }`}></div>
                    )}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                      step.number < currentStep
                        ? 'bg-green-500 text-white'
                        : step.number === currentStep
                        ? 'text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`} style={step.number === currentStep ? {background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)'} : {}}>
                      {step.number < currentStep ? '✓' : step.number}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className={`text-sm font-semibold ${
                        step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className={`text-xs mt-1 ${
                        step.number <= currentStep ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              {/* Step 1: File Upload */}
              {currentStep === 1 && (
                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-8 rounded-full mr-4" style={{background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)'}}></div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">Upload Your Translation File</h1>
                        <p className="text-gray-600 mt-2">Choose a file to translate. We support JSON, CSV, HTML, PO/POT, XML, TXT, YAML, and MO formats.</p>
                      </div>
                    </div>
                  </div>
                  <FileUpload
                    onFileUpload={handleFileUpload}
                    disabled={state.status !== 'idle'}
                  />
                  {state.status === 'error' && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        <p className="text-red-700 font-medium text-sm">{state.error}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Configuration */}
              {currentStep === 2 && (
                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-8 rounded-full mr-4" style={{background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)'}}></div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">Configure Translation</h1>
                        <p className="text-gray-600 mt-2">Set your translation preferences and AI model settings.</p>
                      </div>
                    </div>
                  </div>
                  {state.status === 'paused' && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <p className="text-blue-800 text-sm font-medium">
                          <strong>Translation Paused:</strong> You can modify the settings below and resume translation with the new configuration.
                        </p>
                      </div>
                    </div>
                  )}
                  <ConfigurationForm
                    onSubmit={handleConfigSubmit}
                    disabled={state.status !== 'configuring' && state.status !== 'paused'}
                    initialConfig={state.config}
                    isPaused={state.status === 'paused'}
                  />
                </div>
              )}

              {/* Step 3: Translation Progress */}
              {currentStep === 3 && (
                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-8 rounded-full mr-4" style={{background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)'}}></div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">Translation in Progress</h1>
                        <p className="text-gray-600 mt-2">Your file is being translated using AI. You can monitor progress and make edits below.</p>
                      </div>
                    </div>
                  </div>
                  <TranslationProgress
                    progress={state.progress || 0}
                    status={state.status}
                    totalEntries={state.poEntries?.filter(e => e.msgid.trim() !== '').length || 0}
                    onStop={handleStopTranslation}
                    onPause={handlePauseTranslation}
                    onResume={handleResumeTranslation}
                  />

                  {/* Live Translation Table */}
                  {state.poEntries && state.config && (
                    <div className="mt-8">
                      <TranslationTable
                        entries={state.poEntries}
                        translatedEntries={state.translatedEntries || []}
                        isTranslating={state.status === 'translating'}
                        isCompleted={state.status === 'completed'}
                        onUpdateTranslation={handleUpdateTranslation}
                        targetLanguage={state.config.targetLanguage}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Download Result */}
              {currentStep === 4 && state.downloadUrl && (
                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-8 rounded-full mr-4 bg-green-500"></div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">Translation Complete!</h1>
                        <p className="text-gray-600 mt-2">Your file has been successfully translated. Download it below or start a new translation.</p>
                      </div>
                    </div>
                  </div>
                  <DownloadResult
                    downloadUrl={state.downloadUrl}
                    filename={state.file?.name?.replace(/\.(po|pot)$/, '_translated.po') || 'translated.po'}
                    onReset={resetApp}
                    hasManualEdits={state.hasManualEdits}
                    translatedEntries={state.translatedEntries || []}
                    originalFileName={state.file?.name || 'unknown'}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
