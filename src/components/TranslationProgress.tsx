"use client";

import { useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { CheckCircle, Clock, Zap, Square, Pause, Play } from "lucide-react";
import { StopConfirmationDialog } from "./StopConfirmationDialog";

interface TranslationProgressProps {
  progress: number;
  status: 'translating' | 'paused' | 'completed' | 'error' | 'cancelled';
  totalEntries: number;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export function TranslationProgress({ progress, status, totalEntries, onStop, onPause, onResume }: TranslationProgressProps) {
  const [showStopDialog, setShowStopDialog] = useState(false);
  const currentEntry = Math.round((progress / 100) * totalEntries);

  const handleStopClick = () => {
    setShowStopDialog(true);
  };

  const handleConfirmStop = () => {
    if (onStop) {
      onStop();
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Translation Complete!';
      case 'paused':
        return 'Translation Paused';
      case 'cancelled':
        return 'Translation Cancelled';
      case 'translating':
      default:
        return 'Translating your file...';
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">
            {getStatusText()}
          </span>
          <span className="text-gray-500">
            {currentEntry} / {totalEntries} entries
          </span>
        </div>
        
        <Progress value={progress} className="h-3" />
        
        <div className="text-center text-lg font-semibold">
          {progress}%
        </div>
      </div>

      {/* Control Buttons */}
      {(status === 'translating' || status === 'paused') && (
        <div className="flex justify-center space-x-3">
          {status === 'translating' && onPause && (
            <Button
              onClick={onPause}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </Button>
          )}

          {status === 'paused' && onResume && (
            <Button
              onClick={onResume}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Resume</span>
            </Button>
          )}

          {onStop && (
            <Button
              onClick={handleStopClick}
              variant="destructive"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Square className="h-4 w-4" />
              <span>Stop</span>
            </Button>
          )}
        </div>
      )}

      {/* Status Messages */}
      <div className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-blue-50 border border-blue-200">
        {status === 'translating' && (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-800">
              Processing translations... please wait.
            </span>
          </>
        )}

        {status === 'paused' && (
          <>
            <Pause className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-800">
              Translation paused. Click Resume to continue.
            </span>
          </>
        )}

        {status === 'cancelled' && (
          <>
            <Square className="h-5 w-5 text-red-600" />
            <span className="text-red-800">
              Translation was cancelled.
            </span>
          </>
        )}

        {status === 'completed' && (
          <>
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800">
              All translations completed successfully!
            </span>
          </>
        )}
      </div>

      {/* Progress Details */}
      {status === 'translating' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <div className="font-medium">Estimated Time</div>
              <div className="text-gray-600">
                {Math.max(1, Math.round(((totalEntries - currentEntry) * 0.5) / 60))} min remaining
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Zap className="h-4 w-4 text-gray-500" />
            <div>
              <div className="font-medium">Processing Speed</div>
              <div className="text-gray-600">~2 entries/second</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="h-4 w-4 text-gray-500" />
            <div>
              <div className="font-medium">Quality</div>
              <div className="text-gray-600">AI-powered translation</div>
            </div>
          </div>
        </div>
      )}

      {/* Important Notes */}
      <div className="text-sm text-gray-600 space-y-1 p-4 bg-gray-50 rounded-lg">
        <p className="font-medium">Please note:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Keep this tab open while translation is in progress</li>
          <li>Large files may take several minutes to complete</li>
          <li>Your API usage will be charged according to OpenRouter's pricing</li>
          <li>HTML tags and placeholders are preserved in translations</li>
        </ul>
      </div>

      <StopConfirmationDialog
        isOpen={showStopDialog}
        onClose={() => setShowStopDialog(false)}
        onConfirm={handleConfirmStop}
        progress={progress}
        totalEntries={totalEntries}
        completedEntries={currentEntry}
      />
    </div>
  );
}
