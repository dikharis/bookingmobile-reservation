import React, { useState } from 'react';
import { TransferTransportItem } from '../../types';
import { Car, Calendar, Clock, Users, Route } from 'lucide-react';

interface TransferFormProps {
  initialData?: TransferTransportItem | null;
  onSubmit: (data: Partial<TransferTransportItem>) => void;
  onCancel: () => void;
}

export default function TransferForm({ initialData, onSubmit, onCancel }: TransferFormProps) {
  const [formData, setFormData] = useState({
    service: initialData?.service || 'transfer',
    route: initialData?.route || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    vehicle: initialData?.vehicle || '',
    pax: initialData?.pax || 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const vehicleOptions = {
    transfer: [
      'Standard Car (4 seats)',
      'Minivan (7 seats)',
      'Van (10-12 seats)',
      'Bus (25-30 seats)',
      'Premium Car',
      'SUV'
    ],
    transport: [
      'Standard Car (4 seats)',
      'Minivan (7 seats)',
      'Van (10-12 seats)',
      'Bus (25-30 seats)',
      'Premium Car',
      'SUV',
      'Motorcycle',
      'Bicycle'
    ]
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Service Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateField('service', 'transfer')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              formData.service === 'transfer'
                ? 'border-brand-500 bg-brand-50 text-brand-600'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Transfer
          </button>
          <button
            type="button"
            onClick={() => updateField('service', 'transport')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              formData.service === 'transport'
                ? 'border-brand-500 bg-brand-50 text-brand-600'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Transport
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Route <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Route className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.route}
            onChange={(e) => updateField('route', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="e.g., Airport → Hotel, Hotel → City Tour"
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
            Time <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <select
              value={formData.time}
              onChange={(e) => updateField('time', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
              required
            >
              <option value="">Select time</option>
              <option value="00:00">12:00 AM</option>
              <option value="01:00">01:00 AM</option>
              <option value="02:00">02:00 AM</option>
              <option value="03:00">03:00 AM</option>
              <option value="04:00">04:00 AM</option>
              <option value="05:00">05:00 AM</option>
              <option value="06:00">06:00 AM</option>
              <option value="07:00">07:00 AM</option>
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
              <option value="19:00">07:00 PM</option>
              <option value="20:00">08:00 PM</option>
              <option value="21:00">09:00 PM</option>
              <option value="22:00">10:00 PM</option>
              <option value="23:00">11:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Vehicle Type <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.vehicle}
          onChange={(e) => updateField('vehicle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
          required
        >
          <option value="">Select vehicle</option>
          {vehicleOptions[formData.service as keyof typeof vehicleOptions].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
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
              max={formData.vehicle.includes('Bus') ? 50 : formData.vehicle.includes('Van') ? 12 : formData.vehicle.includes('Minivan') ? 7 : 4}
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
              onClick={() => updateField('pax', Math.min(
                formData.vehicle.includes('Bus') ? 50 : formData.vehicle.includes('Van') ? 12 : formData.vehicle.includes('Minivan') ? 7 : 4,
                formData.pax + 1
              ))}
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
