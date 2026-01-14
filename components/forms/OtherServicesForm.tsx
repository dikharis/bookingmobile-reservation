import React, { useState } from 'react';
import { OtherServicesItem } from '../../types';
import { MoreHorizontal, Calendar, DollarSign, Package } from 'lucide-react';

interface OtherServicesFormProps {
  initialData?: OtherServicesItem | null;
  onSubmit: (data: Partial<OtherServicesItem>) => void;
  onCancel: () => void;
}

export default function OtherServicesForm({ initialData, onSubmit, onCancel }: OtherServicesFormProps) {
  const [formData, setFormData] = useState({
    serviceName: initialData?.serviceName || '',
    description: initialData?.description || '',
    date: initialData?.date || '',
    quantity: initialData?.quantity || 1,
    price: initialData?.price || 0
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
          Service Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Package className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.serviceName}
            onChange={(e) => updateField('serviceName', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="e.g., Tour Guide, Photography Equipment, SIM Card"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
          placeholder="Describe the service details..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Date (optional)
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Quantity (optional)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="99"
              value={formData.quantity}
              onChange={(e) => updateField('quantity', parseInt(e.target.value) || 1)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => updateField('quantity', Math.max(1, formData.quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => updateField('quantity', Math.min(99, formData.quantity + 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Price (optional)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="0.00"
            />
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
