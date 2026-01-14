import React, { useState } from 'react';
import { AirTicketItem } from '../../types';
import { Plane, Calendar, Users, MapPin } from 'lucide-react';

interface AirTicketFormProps {
  initialData?: AirTicketItem | null;
  onSubmit: (data: Partial<AirTicketItem>) => void;
  onCancel: () => void;
}

export default function AirTicketForm({ initialData, onSubmit, onCancel }: AirTicketFormProps) {
  const [formData, setFormData] = useState({
    flightType: initialData?.flightType || 'oneway',
    from: initialData?.from || '',
    to: initialData?.to || '',
    departureDate: initialData?.departureDate || '',
    returnDate: initialData?.returnDate || '',
    passengers: initialData?.passengers || 1,
    class: initialData?.class || 'economy'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDepartureDateChange = (date: string) => {
    updateField('departureDate', date);
    // Clear return date if it's before departure date
    if (formData.returnDate && new Date(date) > new Date(formData.returnDate)) {
      updateField('returnDate', '');
    }
  };

  const swapCities = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Flight Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'oneway', label: 'One Way' },
            { value: 'roundtrip', label: 'Round Trip' },
            { value: 'multicity', label: 'Multi City' }
          ].map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateField('flightType', type.value as any)}
              className={`px-3 py-2 rounded-lg border transition-colors text-sm ${
                formData.flightType === type.value
                  ? 'border-brand-500 bg-brand-50 text-brand-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            From <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.from}
              onChange={(e) => updateField('from', e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g., CGK - Jakarta"
              required
            />
            <button
              type="button"
              onClick={swapCities}
              className="absolute right-3 top-2.5 p-1 hover:bg-gray-100 rounded"
            >
              <Plane className="w-4 h-4 text-gray-400 rotate-90" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            To <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.to}
              onChange={(e) => updateField('to', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g., DPS - Bali"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Departure Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) => handleDepartureDateChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
        </div>

        {formData.flightType === 'roundtrip' && (
          <div>
            <label className="block text-sm font-medium text-operational-text mb-1">
              Return Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => updateField('returnDate', e.target.value)}
                min={formData.departureDate}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                required={formData.flightType === 'roundtrip'}
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Passengers <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                min="1"
                max="9"
                value={formData.passengers}
                onChange={(e) => updateField('passengers', parseInt(e.target.value) || 1)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => updateField('passengers', Math.max(1, formData.passengers - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => updateField('passengers', Math.min(9, formData.passengers + 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.class}
            onChange={(e) => updateField('class', e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
            required
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
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
