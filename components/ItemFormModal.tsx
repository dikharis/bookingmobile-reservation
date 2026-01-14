import React, { useState } from 'react';
import { ReservationItem, ReservationItemType } from '../types';
import { RESERVATION_TYPES } from '../constants';
import { X, MapPin, Bed, Camera, Car, FileText, Plane, Package, MoreHorizontal } from 'lucide-react';
import OpenTripsForm from './forms/OpenTripsForm';
import AccommodationForm from './forms/AccommodationForm';
import AttractionForm from './forms/AttractionForm';
import TransferForm from './forms/TransferForm';
import TravelDocumentForm from './forms/TravelDocumentForm';
import AirTicketForm from './forms/AirTicketForm';
import TourPackageForm from './forms/TourPackageForm';
import OtherServicesForm from './forms/OtherServicesForm';

interface ItemFormModalProps {
  itemType: ReservationItemType | null;
  item: ReservationItem | null;
  onClose: () => void;
  onSave: (item: Partial<ReservationItem>) => void;
}

const TYPE_ICONS = {
  'open-trips': MapPin,
  'accommodation': Bed,
  'attraction': Camera,
  'transfer-transport': Car,
  'travel-document': FileText,
  'air-ticket': Plane,
  'tour-package': Package,
  'other-services': MoreHorizontal
};

export default function ItemFormModal({ itemType, item, onClose, onSave }: ItemFormModalProps) {
  const [selectedType, setSelectedType] = useState<ReservationItemType | null>(itemType);
  const [formData, setFormData] = useState<Partial<ReservationItem>>(item || {});

  const handleTypeSelect = (type: ReservationItemType) => {
    setSelectedType(type);
    setFormData({
      id: item?.id || '',
      type,
      status: 'draft' as const
    });
  };

  const handleFormSubmit = (data: any) => {
    onSave({ ...formData, ...data });
  };

  const renderForm = () => {
    if (!selectedType) return null;

    const formProps = {
      initialData: item,
      onSubmit: handleFormSubmit,
      onCancel: onClose
    };

    switch (selectedType) {
      case 'open-trips':
        return <OpenTripsForm {...formProps} />;
      case 'accommodation':
        return <AccommodationForm {...formProps} />;
      case 'attraction':
        return <AttractionForm {...formProps} />;
      case 'transfer-transport':
        return <TransferForm {...formProps} />;
      case 'travel-document':
        return <TravelDocumentForm {...formProps} />;
      case 'air-ticket':
        return <AirTicketForm {...formProps} />;
      case 'tour-package':
        return <TourPackageForm {...formProps} />;
      case 'other-services':
        return <OtherServicesForm {...formProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-operational-text">
            {item ? 'Edit Item' : selectedType ? RESERVATION_TYPES.find(t => t.value === selectedType)?.label : 'Add Item'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!selectedType ? (
            <div className="grid grid-cols-2 gap-3">
              {RESERVATION_TYPES.map((type) => {
                const IconComponent = TYPE_ICONS[type.value];
                return (
                  <button
                    key={type.value}
                    onClick={() => handleTypeSelect(type.value)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-brand-500 hover:bg-brand-50 transition-all"
                  >
                    <IconComponent className="w-6 h-6 text-brand-600 mb-2 mx-auto" />
                    <div className="text-sm font-medium text-operational-text">{type.label}</div>
                  </button>
                );
              })}
            </div>
          ) : (
            renderForm()
          )}
        </div>
      </div>
    </div>
  );
}
