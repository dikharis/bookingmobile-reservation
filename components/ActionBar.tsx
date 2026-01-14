import React from 'react';
import { Save, CheckCircle } from 'lucide-react';

interface ActionBarProps {
  itemsCount: number;
  onSaveDraft: () => void;
  onConfirm: () => void;
  disabled: boolean;
}

export default function ActionBar({ itemsCount, onSaveDraft, onConfirm, disabled }: ActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-operational-muted">
          {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
        </span>
        {disabled && (
          <span className="text-xs text-red-600">
            Please fill customer info and add at least one item
          </span>
        )}
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onSaveDraft}
          disabled={disabled}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </button>
        
        <button
          onClick={onConfirm}
          disabled={disabled}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}
