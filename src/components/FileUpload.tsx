"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { PoEntry } from "./TranslatorApp";
import { parseFile } from "../lib/fileParsers";

interface FileUploadProps {
  onFileUpload: (file: File, entries: PoEntry[]) => void;
  disabled?: boolean;
}

export function FileUpload({ onFileUpload, disabled }: FileUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Validate file extension
      const fileName = file.name.toLowerCase();
      const extension = fileName.split('.').pop();
      const supportedExtensions = ['po', 'pot', 'json', 'csv', 'html', 'htm', 'mo'];

      if (!extension || !supportedExtensions.includes(extension)) {
        throw new Error(`Unsupported file format. Supported formats: ${supportedExtensions.join(', ')}`);
      }

      // Read file content
      let content: string | ArrayBuffer;
      if (extension === 'mo') {
        content = await file.arrayBuffer();
      } else {
        content = await file.text();
      }

      // Parse file using the appropriate parser
      const parsedFile = await parseFile(file, content);

      if (parsedFile.entries.length === 0) {
        throw new Error('No translatable entries found in the file');
      }

      // Count translatable entries (non-empty msgid)
      const translatableCount = parsedFile.entries.filter(entry => entry.msgid.trim() !== '').length;

      if (translatableCount === 0) {
        throw new Error('No translatable text found in the file');
      }

      onFileUpload(file, parsedFile.entries);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.po', '.pot', '.csv', '.html'],
      'application/octet-stream': ['.po', '.pot', '.mo'],
      'application/json': ['.json'],
      'text/html': ['.html'],
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    disabled: disabled || isProcessing,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled || isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-lg font-medium">Processing your translation file...</p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium mb-2">
                  {isDragActive ? 'Drop your file here' : 'Upload Your Translation File'}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop your translation file here, or click to browse
                </p>
                <Button variant="outline" disabled={disabled || isProcessing}>
                  <FileText className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="text-sm text-gray-500 space-y-1">
        <p>• Supported formats: JSON, CSV, HTML, PO/POT, XML, TXT, YAML, MO</p>
        <p>• File should contain translatable text strings</p>
        <p>• Maximum file size: 10MB</p>
      </div>
    </div>
  );
}
