import React from 'react';
import { ReservationItem } from '../types';
import { RESERVATION_TYPE_LABELS } from '../constants';
import { formatDate, getInitials } from '../utils/helpers';
import { Edit2, Trash2, MapPin, Bed, Camera, Car, FileText, Plane, Package, MoreHorizontal } from 'lucide-react';

interface ReservationItemsListProps {
  items: ReservationItem[];
  onEdit: (item: ReservationItem) => void;
  onDelete: (itemId: string) => void;
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

function getItemSummary(item: ReservationItem): string {
  switch (item.type) {
    case 'open-trips':
      return `${(item as any).destination} • ${(item as any).pax} pax • ${(item as any).duration}`;
    case 'accommodation':
      return `${(item as any).hotelName} • ${(item as any).rooms} room(s) • ${(item as any).guests} guest(s)`;
    case 'attraction':
      return `${(item as any).attractionName} • ${(item as any).pax} pax${(item as any).time ? ` • ${(item as any).time}` : ''}`;
    case 'transfer-transport':
      return `${(item as any).route} • ${(item as any).vehicle} • ${(item as any).pax} pax`;
    case 'travel-document':
      return `${(item as any).documentType} • ${(item as any).destination} • ${(item as any).applicants} applicant(s)`;
    case 'air-ticket':
      return `${(item as any).from} → ${(item as any).to}${(item as any).returnDate ? ' • Roundtrip' : ' • Oneway'} • ${(item as any).passengers} pax`;
    case 'tour-package':
      return `${(item as any).packageName} • ${(item as any).duration} • ${(item as any).pax} pax`;
    case 'other-services':
      return `${(item as any).serviceName}${(item as any).quantity ? ` • Qty: ${(item as any).quantity}` : ''}`;
    default:
      return '';
  }
}

function getItemDate(item: ReservationItem): string {
  switch (item.type) {
    case 'open-trips':
    case 'attraction':
    case 'transfer-transport':
    case 'tour-package':
      return formatDate((item as any).date);
    case 'accommodation':
      return `${formatDate((item as any).checkIn)} - ${formatDate((item as any).checkOut)}`;
    case 'travel-document':
      return formatDate((item as any).submissionDate);
    case 'air-ticket':
      return formatDate((item as any).departureDate);
    case 'other-services':
      return (item as any).date ? formatDate((item as any).date) : '';
    default:
      return '';
  }
}

export default function ReservationItemsList({ items, onEdit, onDelete }: ReservationItemsListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const IconComponent = TYPE_ICONS[item.type];
        return (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  item.status === 'confirmed' 
                    ? 'bg-green-100' 
                    : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-5 h-5 ${
                    item.status === 'confirmed'
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-operational-text">
                    {RESERVATION_TYPE_LABELS[item.type]}
                  </h3>
                  <p className="text-sm text-operational-muted mt-0.5">
                    {getItemSummary(item)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-gray-400 hover:text-brand-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="text-sm text-operational-muted">
                {getItemDate(item)}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                item.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.status === 'confirmed' ? 'Confirmed' : 'Draft'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
