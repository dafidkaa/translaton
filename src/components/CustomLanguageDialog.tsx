"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Info, Globe } from "lucide-react";

export interface Language {
  code: string;
  name: string;
  flag: string;
}

interface CustomLanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLanguage: (language: Language) => void;
}

export function CustomLanguageDialog({ open, onOpenChange, onAddLanguage }: CustomLanguageDialogProps) {
  const [languageCode, setLanguageCode] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [languageFlag, setLanguageFlag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Basic validation
      if (!languageCode.trim()) {
        throw new Error("Language code is required");
      }

      if (!languageName.trim()) {
        throw new Error("Language name is required");
      }

      // Validate language code format (basic check)
      const codePattern = /^[a-zA-Z]{2,3}(-[a-zA-Z]{2,4})?$/;
      if (!codePattern.test(languageCode.trim())) {
        throw new Error("Language code should be in format like 'en', 'es', 'zh-CN', etc.");
      }

      const customLanguage: Language = {
        code: languageCode.trim(),
        name: languageName.trim(),
        flag: languageFlag.trim() || "🌐"
      };

      onAddLanguage(customLanguage);
      
      // Reset form
      setLanguageCode("");
      setLanguageName("");
      setLanguageFlag("");
      onOpenChange(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add custom language");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setLanguageCode("");
    setLanguageName("");
    setLanguageFlag("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Custom Language</span>
          </DialogTitle>
          <DialogDescription>
            Add a language that's not in our default list for translation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium text-blue-800">Language Code Guidelines:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use ISO 639-1 codes (2 letters): en, es, fr, de, etc.</li>
                  <li>Or ISO 639-1 + region: en-US, zh-CN, pt-BR, etc.</li>
                  <li>Examples: ja (Japanese), ko (Korean), ar (Arabic)</li>
                  <li>Flag emoji is optional but recommended</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="languageCode">Language Code *</Label>
              <Input
                id="languageCode"
                placeholder="e.g., ja, ko, ar, zh-CN, pt-BR"
                value={languageCode}
                onChange={(e) => setLanguageCode(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                ISO 639-1 language code (2-3 letters, optionally with region)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="languageName">Language Name *</Label>
              <Input
                id="languageName"
                placeholder="e.g., Japanese, Korean, Arabic, Chinese (Simplified)"
                value={languageName}
                onChange={(e) => setLanguageName(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Full name of the language as it should appear in the dropdown
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="languageFlag">Flag Emoji (optional)</Label>
              <Input
                id="languageFlag"
                placeholder="e.g., 🇯🇵, 🇰🇷, 🇸🇦, 🇨🇳"
                value={languageFlag}
                onChange={(e) => setLanguageFlag(e.target.value)}
                maxLength={4}
              />
              <p className="text-xs text-gray-500">
                Flag emoji to display next to the language name
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !languageCode.trim() || !languageName.trim()}
              >
                {isLoading ? "Adding..." : "Add Language"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
