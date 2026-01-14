import React from 'react';
import { Icons } from './ui/Icon';

interface CounterProps {
  value: number;
  onChange: (val: number) => void;
  label: string;
}

export const CounterInput: React.FC<CounterProps> = ({ value, onChange, label }) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent focus loss
    onChange(Math.max(1, value - 1));
  };
  
  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(value + 1);
  };

  return (
    <div className="flex flex-col space-y-1.5 mb-4">
      <label className="text-sm font-semibold text-operational-muted uppercase tracking-wide">{label}</label>
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-1 shadow-sm h-14">
        <button 
          type="button"
          onClick={handleDecrement}
          className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-600 rounded-lg active:bg-gray-200 touch-manipulation"
        >
          <Icons.Minus size={20} />
        </button>
        <span className="text-xl font-bold text-gray-900">{value || 1}</span>
        <button 
          type="button"
          onClick={handleIncrement}
          className="w-12 h-12 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg active:bg-brand-100 touch-manipulation"
        >
          <Icons.Plus size={20} />
        </button>
      </div>
    </div>
  );
};

interface SelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

export const ChipSelect: React.FC<SelectProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <label className="text-sm font-semibold text-operational-muted uppercase tracking-wide">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation
              ${value === opt 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export const MobileTextInput: React.FC<any> = ({ label, type = "text", ...props }) => (
  <div className="flex flex-col space-y-1.5 mb-4">
    <label className="text-sm font-semibold text-operational-muted uppercase tracking-wide">{label}</label>
    <input 
      className="w-full bg-white text-lg px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all placeholder:text-gray-300"
      type={type}
      {...props}
    />
  </div>
);

export const MobileDateInput: React.FC<any> = ({ label, ...props }) => (
  <div className="flex flex-col space-y-1.5 mb-4">
    <label className="text-sm font-semibold text-operational-muted uppercase tracking-wide">{label}</label>
    <div className="relative">
        <input 
          type="date"
          className="w-full bg-white text-lg px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none appearance-none min-h-[50px]"
          {...props}
        />
        <Icons.Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
    </div>
  </div>
);
