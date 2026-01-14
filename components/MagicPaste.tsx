import React, { useState } from 'react';
import { Icons } from './ui/Icon';
import { parseReservationText } from '../services/geminiService';
import { ParsedReservationIntent } from '../types';

interface MagicPasteProps {
  onParsed: (data: ParsedReservationIntent) => void;
  onClose: () => void;
}

export const MagicPaste: React.FC<MagicPasteProps> = ({ onParsed, onClose }) => {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleParse = async () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    setError('');
    
    try {
      const result = await parseReservationText(text);
      if (result) {
        onParsed(result);
      } else {
        setError('Could not understand the text. Please try again or enter manually.');
      }
    } catch (e) {
      setError('Connection error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="bg-brand-50 p-4 flex justify-between items-center border-b border-brand-100">
          <div className="flex items-center space-x-2 text-brand-700">
            <Icons.Sparkles size={20} className="text-brand-600" />
            <span className="font-bold">Magic Paste</span>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-100 text-gray-500">
            <Icons.X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600">
            Paste a message from WhatsApp or type notes. AI will fill the form for you.
          </p>
          
          <textarea
            className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none resize-none text-base"
            placeholder="e.g. John Doe, 2 people for Sunset Tour tomorrow at 5pm. Pickup at Hilton."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isProcessing}
            autoFocus
          />

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start space-x-2">
              <Icons.X size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleParse}
            disabled={!text.trim() || isProcessing}
            className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center space-x-2 shadow-lg transition-all
              ${!text.trim() || isProcessing ? 'bg-gray-300' : 'bg-gradient-to-r from-brand-500 to-brand-600 active:scale-[0.98]'}`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Icons.Sparkles size={18} />
                <span>Auto-Fill Form</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};