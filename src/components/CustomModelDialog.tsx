"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ExternalLink, Plus, Info } from "lucide-react";
import { OpenRouterModel } from "../lib/modelScraper";

interface CustomModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddModel: (model: OpenRouterModel) => void;
}

export function CustomModelDialog({ open, onOpenChange, onAddModel }: CustomModelDialogProps) {
  const [modelId, setModelId] = useState("");
  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Basic validation
      if (!modelId.trim()) {
        throw new Error("Model ID is required");
      }

      if (!modelId.includes("/")) {
        throw new Error("Model ID must be in format 'provider/model-name'");
      }

      const [providerFromId] = modelId.split("/");
      
      const customModel: OpenRouterModel = {
        id: modelId.trim(),
        name: modelName.trim() || modelId.split("/")[1],
        description: description.trim() || "Custom model",
        provider: provider.trim() || providerFromId,
        ranking: 999 // Custom models get low ranking
      };

      onAddModel(customModel);
      
      // Reset form
      setModelId("");
      setModelName("");
      setDescription("");
      setProvider("");
      onOpenChange(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add custom model");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setModelId("");
    setModelName("");
    setDescription("");
    setProvider("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Custom OpenRouter Model</span>
          </DialogTitle>
          <DialogDescription>
            Add a custom model from OpenRouter that's not in our default list.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium text-blue-800">How to find OpenRouter model IDs:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-700">
                  <li>Visit <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">OpenRouter Models</a></li>
                  <li>Find your desired model and click on it</li>
                  <li>Copy the model ID (format: provider/model-name)</li>
                  <li>Paste it below</li>
                </ol>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://openrouter.ai/models", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Browse Models
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modelId">Model ID *</Label>
              <Input
                id="modelId"
                placeholder="e.g., anthropic/claude-3-opus, openai/gpt-4-turbo"
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Must be in format: provider/model-name
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelName">Display Name (optional)</Label>
              <Input
                id="modelName"
                placeholder="e.g., Claude 3 Opus, GPT-4 Turbo"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Leave empty to use model name from ID
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider">Provider (optional)</Label>
              <Input
                id="provider"
                placeholder="e.g., Anthropic, OpenAI, Google"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Leave empty to use provider from ID
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the model's capabilities"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
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
                disabled={isLoading || !modelId.trim()}
              >
                {isLoading ? "Adding..." : "Add Model"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
