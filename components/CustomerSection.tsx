import React from 'react';
import { CustomerInfo } from '../types';
import { ChevronDown, ChevronUp, User, Phone, MessageSquare } from 'lucide-react';

interface CustomerSectionProps {
  customer: CustomerInfo;
  onChange: (customer: CustomerInfo) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function CustomerSection({ customer, onChange, isCollapsed, onToggleCollapse }: CustomerSectionProps) {
  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    onChange({ ...customer, [field]: value });
  };

  return (
    <section className="bg-white border-b border-gray-200">
      <div
        className="px-4 py-3 flex items-center justify-between cursor-pointer"
        onClick={onToggleCollapse}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <h2 className="font-medium text-operational-text">Customer Information</h2>
            {customer.name && (
              <p className="text-sm text-operational-muted">{customer.name}</p>
            )}
          </div>
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-5 h-5 text-operational-muted" />
        ) : (
          <ChevronUp className="w-5 h-5 text-operational-muted" />
        )}
      </div>

      {!isCollapsed && (
        <div className="px-4 pb-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-operational-text mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-operational-text mb-1">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="+62 812-3456-7890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-operational-text mb-1">
              Notes
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <textarea
                value={customer.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                placeholder="Additional notes (optional)"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
