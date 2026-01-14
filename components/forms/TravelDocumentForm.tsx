import React, { useState } from 'react';
import { TravelDocumentItem } from '../../types';
import { FileText, Calendar, MapPin, Users } from 'lucide-react';

interface TravelDocumentFormProps {
  initialData?: TravelDocumentItem | null;
  onSubmit: (data: Partial<TravelDocumentItem>) => void;
  onCancel: () => void;
}

export default function TravelDocumentForm({ initialData, onSubmit, onCancel }: TravelDocumentFormProps) {
  const [formData, setFormData] = useState({
    documentType: initialData?.documentType || 'visa',
    destination: initialData?.destination || '',
    submissionDate: initialData?.submissionDate || '',
    completionDate: initialData?.completionDate || '',
    applicants: initialData?.applicants || 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmissionDateChange = (date: string) => {
    updateField('submissionDate', date);
    // Auto-set completion date to 7 days later if not set or before submission
    if (!formData.completionDate || new Date(date) >= new Date(formData.completionDate)) {
      const completionDate = new Date(date);
      completionDate.setDate(completionDate.getDate() + 7);
      updateField('completionDate', completionDate.toISOString().split('T')[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Document Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'visa', label: 'Visa' },
            { value: 'passport', label: 'Passport' },
            { value: 'insurance', label: 'Insurance' },
            { value: 'other', label: 'Other' }
          ].map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateField('documentType', type.value as any)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                formData.documentType === type.value
                  ? 'border-brand-500 bg-brand-50 text-brand-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

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
            placeholder="e.g., Singapore, Japan, USA"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Submission Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.submissionDate}
              onChange={(e) => handleSubmissionDateChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-operational-text mb-1">
            Completion Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.completionDate}
              onChange={(e) => updateField('completionDate', e.target.value)}
              min={formData.submissionDate}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-operational-text mb-1">
          Number of Applicants <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="20"
              value={formData.applicants}
              onChange={(e) => updateField('applicants', parseInt(e.target.value) || 1)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => updateField('applicants', Math.max(1, formData.applicants - 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => updateField('applicants', Math.min(20, formData.applicants + 1))}
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
