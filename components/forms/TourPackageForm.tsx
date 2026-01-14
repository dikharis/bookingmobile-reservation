import React, { useState } from 'react';
import { TourPackageItem } from '../../types';
import { Package, Calendar, Users, Clock, Check } from 'lucide-react';

interface TourPackageFormProps {
  initialData?: TourPackageItem | null;
  onSubmit: (data: Partial<TourPackageItem>) => void;
  onCancel: () => void;
}

const commonInclusions = [
  'Hotel accommodation',
  'Daily breakfast',
  'Airport transfer',
  'Tour guide',
  'Entrance fees',
  'Transportation',
  'Lunch & dinner',
  'Travel insurance'
];

export default function TourPackageForm({ initialData, onSubmit, onCancel }: TourPackageFormProps) {
  const [formData, setFormData] = useState({
    packageName: initialData?.packageName || '',
    date: initialData?.date || '',
    duration: initialData?.duration || '',
    pax: initialData?.pax || 1,
    inclusions: initialData?.inclusions || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInclusion = (inclusion: string) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.includes(inclusion)
        ? prev.inclusions.filter(i => i !== inclusion)
        : [...prev.inclusions, inclusion]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Package Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Package className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.packageName}
            onChange={(e) => updateField('packageName', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="e.g., Bali Paradise 4D3N, Singapore Adventure"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Duration <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <select
              value={formData.duration}
              onChange={(e) => updateField('duration', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
              required
            >
              <option value="">Select duration</option>
              <option value="1 day">1 day</option>
              <option value="2 days 1 night">2 days 1 night</option>
              <option value="3 days 2 nights">3 days 2 nights</option>
              <option value="4 days 3 nights">4 days 3 nights</option>
              <option value="5 days 4 nights">5 days 4 nights</option>
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Number of Pax <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="50"
              value={formData.pax}
              onChange={(e) => updateField('pax', parseInt(e.target.value) || 1)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => updateField('pax', Math.max(1, formData.pax - 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => updateField('pax', Math.min(50, formData.pax + 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-2">
          Inclusions
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {commonInclusions.map((inclusion) => (
            <label
              key={inclusion}
              className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.inclusions.includes(inclusion)}
                onChange={() => toggleInclusion(inclusion)}
                className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
              />
              <span className="text-sm text-operational-text">{inclusion}</span>
              {formData.inclusions.includes(inclusion) && (
                <Check className="w-4 h-4 text-brand-600 ml-auto" />
              )}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
        >
          {initialData ? 'Update' : 'Add'} Item
        </button>
      </div>
    </form>
  );
}
