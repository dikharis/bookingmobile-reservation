import React, { useState } from 'react';
import { OpenTripsItem } from '../../types';
import { MapPin, Calendar, Users, Clock } from 'lucide-react';

interface OpenTripsFormProps {
  initialData?: OpenTripsItem | null;
  onSubmit: (data: Partial<OpenTripsItem>) => void;
  onCancel: () => void;
}

export default function OpenTripsForm({ initialData, onSubmit, onCancel }: OpenTripsFormProps) {
  const [formData, setFormData] = useState({
    destination: initialData?.destination || '',
    date: initialData?.date || '',
    pax: initialData?.pax || 1,
    duration: initialData?.duration || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Destination <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => updateField('destination', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="e.g., Bali, Lombok, Yogyakarta"
            required
          />
        </div>
      </div>

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
            <option value="Custom">Custom</option>
          </select>
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
