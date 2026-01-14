import React, { useState } from 'react';
import { AccommodationItem } from '../../types';
import { Bed, Calendar, Users, Home } from 'lucide-react';

interface AccommodationFormProps {
  initialData?: AccommodationItem | null;
  onSubmit: (data: Partial<AccommodationItem>) => void;
  onCancel: () => void;
}

export default function AccommodationForm({ initialData, onSubmit, onCancel }: AccommodationFormProps) {
  const [formData, setFormData] = useState({
    hotelName: initialData?.hotelName || '',
    checkIn: initialData?.checkIn || '',
    checkOut: initialData?.checkOut || '',
    rooms: initialData?.rooms || 1,
    guests: initialData?.guests || 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckInChange = (date: string) => {
    updateField('checkIn', date);
    // Auto-set checkOut to next day if not set or before checkIn
    if (!formData.checkOut || new Date(date) >= new Date(formData.checkOut)) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      updateField('checkOut', nextDay.toISOString().split('T')[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Hotel Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Home className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.hotelName}
            onChange={(e) => updateField('hotelName', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="e.g., Grand Hyatt Bali"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Check-in Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={formData.checkIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Check-out Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={formData.checkOut}
            onChange={(e) => updateField('checkOut', e.target.value)}
            min={formData.checkIn}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Number of Rooms <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Bed className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="10"
              value={formData.rooms}
              onChange={(e) => updateField('rooms', parseInt(e.target.value) || 1)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => updateField('rooms', Math.max(1, formData.rooms - 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => updateField('rooms', Math.min(10, formData.rooms + 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Number of Guests <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="50"
              value={formData.guests}
              onChange={(e) => updateField('guests', parseInt(e.target.value) || 1)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => updateField('guests', Math.max(1, formData.guests - 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => updateField('guests', Math.min(50, formData.guests + 1))}
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
