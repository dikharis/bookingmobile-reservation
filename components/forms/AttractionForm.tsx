import React, { useState } from 'react';
import { AttractionItem } from '../../types';
import { Camera, Calendar, Users, Clock } from 'lucide-react';

interface AttractionFormProps {
  initialData?: AttractionItem | null;
  onSubmit: (data: Partial<AttractionItem>) => void;
  onCancel: () => void;
}

export default function AttractionForm({ initialData, onSubmit, onCancel }: AttractionFormProps) {
  const [formData, setFormData] = useState({
    attractionName: initialData?.attractionName || '',
    date: initialData?.date || '',
    pax: initialData?.pax || 1,
    time: initialData?.time || ''
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
          Attraction Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Camera className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.attractionName}
            onChange={(e) => updateField('attractionName', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="e.g., Tanah Lot Temple, Universal Studios Singapore"
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
          Time (optional)
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <select
            value={formData.time}
            onChange={(e) => updateField('time', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
          >
            <option value="">Select time</option>
            <option value="08:00">08:00 AM</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">01:00 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
            <option value="17:00">05:00 PM</option>
            <option value="18:00">06:00 PM</option>
            <option value="Full day">Full day</option>
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
