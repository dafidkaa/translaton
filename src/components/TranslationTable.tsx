"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Edit2, Check, X, Save, RotateCcw } from "lucide-react";
import { PoEntry } from "./TranslatorApp";

interface TranslationTableProps {
  entries: PoEntry[];
  translatedEntries: PoEntry[];
  isTranslating: boolean;
  isCompleted: boolean;
  onUpdateTranslation?: (index: number, newTranslation: string) => void;
  targetLanguage: string;
}

interface EditingState {
  index: number;
  value: string;
}

export function TranslationTable({ 
  entries, 
  translatedEntries, 
  isTranslating, 
  isCompleted,
  onUpdateTranslation,
  targetLanguage 
}: TranslationTableProps) {
  const [editingState, setEditingState] = useState<EditingState | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Filter out empty entries for display
  const displayEntries = entries.filter(entry => entry.msgid.trim() !== '');
  
  // Get the current translation for an entry
  const getTranslation = (index: number): string => {
    const originalIndex = entries.findIndex(entry => entry.msgid === displayEntries[index].msgid);
    const translatedEntry = translatedEntries.find(entry => entry.msgid === displayEntries[index].msgid);
    return translatedEntry?.msgstr || '';
  };

  // Get translation status
  const getStatus = (index: number): 'pending' | 'translating' | 'completed' | 'error' => {
    const translation = getTranslation(index);
    
    if (!isTranslating && !isCompleted) return 'pending';
    if (translation) return 'completed';
    if (isTranslating) {
      // Check if this entry should be translated by now
      const completedCount = translatedEntries.filter(e => e.msgstr && e.msgid.trim() !== '').length;
      if (index < completedCount) return 'completed';
      if (index === completedCount) return 'translating';
    }
    return 'pending';
  };

  const handleEdit = (index: number) => {
    const currentTranslation = getTranslation(index);
    setEditingState({ index, value: currentTranslation });
  };

  const handleSave = () => {
    if (editingState && onUpdateTranslation) {
      onUpdateTranslation(editingState.index, editingState.value);
      setEditingState(null);
      setHasUnsavedChanges(true);
    }
  };

  const handleCancel = () => {
    setEditingState(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'translating':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Translating...</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };



  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Translation Progress</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Target: {targetLanguage}
          </span>
          {hasUnsavedChanges && (
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              <Save className="h-3 w-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead className="w-1/3">Original Text</TableHead>
              <TableHead className="w-1/3">Translation</TableHead>
              <TableHead className="w-24">Status</TableHead>
              {isCompleted && <TableHead className="w-20">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayEntries.map((entry, index) => {
              const status = getStatus(index);
              const translation = getTranslation(index);
              const isEditing = editingState?.index === index;

              return (
                <TableRow key={index} className={status === 'translating' ? 'bg-blue-50' : ''}>
                  <TableCell className="font-mono text-sm">{index + 1}</TableCell>
                  
                  <TableCell className="max-w-xs">
                    <div className="break-words whitespace-pre-wrap">
                      {entry.msgid}
                    </div>
                  </TableCell>
                  
                  <TableCell className="max-w-xs">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={editingState.value}
                          onChange={(e) => setEditingState({ ...editingState, value: e.target.value })}
                          onKeyDown={handleKeyDown}
                          className="w-full"
                          placeholder="Enter translation..."
                          autoFocus
                        />
                        <div className="flex space-x-1">
                          <Button size="sm" onClick={handleSave} className="h-6 px-2">
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel} className="h-6 px-2">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500">
                          Ctrl+Enter to save, Esc to cancel
                        </div>
                      </div>
                    ) : (
                      <div className="break-words whitespace-pre-wrap">
                        {translation ? translation : (
                          <span className="text-gray-400 italic">
                            {status === 'translating' ? 'Translating...' : 'Pending translation'}
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {getStatusBadge(status)}
                  </TableCell>
                  
                  {isCompleted && (
                    <TableCell>
                      {!isEditing && translation && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(index)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <div className="flex justify-between">
          <span>
            Showing {displayEntries.length} translatable entries
          </span>
          <span>
            Completed: {translatedEntries.filter(e => e.msgstr && e.msgid.trim() !== '').length} / {displayEntries.length}
          </span>
        </div>
      </div>
    </Card>
  );
}
