"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";

interface StopConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  progress: number;
  totalEntries: number;
  completedEntries: number;
}

export function StopConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  progress,
  totalEntries,
  completedEntries,
}: StopConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <DialogTitle>Stop Translation?</DialogTitle>
          </div>
          <DialogDescription className="space-y-2">
            <p>
              Are you sure you want to stop the translation process? This will cancel the current translation and you'll lose progress.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg space-y-1">
              <div className="text-sm font-medium text-gray-700">Current Progress:</div>
              <div className="text-sm text-gray-600">
                • {completedEntries} of {totalEntries} entries translated ({progress}%)
              </div>
              <div className="text-sm text-gray-600">
                • {totalEntries - completedEntries} entries remaining
              </div>
            </div>
            <p className="text-sm text-gray-500">
              <strong>Tip:</strong> You can pause the translation instead to make changes to settings and resume later.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="w-full sm:w-auto">
            Stop Translation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
