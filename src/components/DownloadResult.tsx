"use client";

import { Download, RefreshCw, CheckCircle, Upload, FileDown } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { PoEntry } from "./TranslatorApp";
import { generateFile, downloadFile, ExportFormat } from "../lib/fileGenerators";

interface DownloadResultProps {
  downloadUrl: string;
  filename: string;
  onReset: () => void;
  hasManualEdits?: boolean;
  translatedEntries: PoEntry[];
  originalFileName: string;
}

export function DownloadResult({
  downloadUrl,
  filename,
  onReset,
  hasManualEdits,
  translatedEntries,
  originalFileName
}: DownloadResultProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('po');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormatDownload = () => {
    try {
      const { content, filename: newFilename, mimeType } = generateFile(
        translatedEntries,
        selectedFormat,
        originalFileName
      );
      downloadFile(content, newFilename, mimeType);
    } catch (error) {
      console.error('Failed to generate file:', error);
      alert('Failed to generate file. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="flex items-center justify-center space-x-3 p-6 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle className="h-8 w-8 text-green-600" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-800">
            Translation Complete!
          </h3>
          <p className="text-green-700">
            Your translation file has been successfully processed with AI-powered precision.
            {hasManualEdits && (
              <span className="block mt-1 text-sm">
                ✨ Includes your manual edits
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Download Section */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Download Your Translated File
            </h3>
            <p className="text-blue-700 mb-4">
              Original: <code className="bg-blue-100 px-2 py-1 rounded text-sm">{filename}</code>
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Original Format
            </Button>

            <div className="border-t pt-4">
              <h4 className="font-medium text-blue-800 mb-3">Download in Different Format</h4>
              <div className="flex space-x-2">
                <Select value={selectedFormat} onValueChange={(value: ExportFormat) => setSelectedFormat(value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Choose format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="po">.po (Software Localization)</SelectItem>
                    <SelectItem value="pot">.pot (Translation Template)</SelectItem>
                    <SelectItem value="json">JSON (App Localization)</SelectItem>
                    <SelectItem value="csv">CSV (Bulk Data)</SelectItem>
                    <SelectItem value="html">HTML (Translation Report)</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleFormatDownload}
                  variant="outline"
                  className="px-6"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
              1
            </div>
            <div>
              <p className="font-medium">Deploy Your Translations</p>
              <p className="text-gray-600">
                Integrate the translated files into your application, website, or project
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
              2
            </div>
            <div>
              <p className="font-medium">Test & Validate</p>
              <p className="text-gray-600">
                Review translations in context and test functionality with your target audience
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
              3
            </div>
            <div>
              <p className="font-medium">Scale Globally</p>
              <p className="text-gray-600">
                Use Translaton for additional languages and file formats as you expand internationally
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quality Notice */}
      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2">📝 Translation Quality</h4>
        <p className="text-sm text-yellow-700">
          AI translations are generally very good but may need minor adjustments for context-specific terms. 
          Consider reviewing important strings before going live.
        </p>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onReset}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          <Upload className="h-5 w-5 mr-2" />
          Translate Another File
        </Button>
        
        <Button 
          onClick={handleDownload}
          size="lg"
          className="flex-1"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Again
        </Button>
      </div>
    </div>
  );
}
