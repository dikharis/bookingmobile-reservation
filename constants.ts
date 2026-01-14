import { ReservationItemType } from './types';

export const RESERVATION_TYPES: { value: ReservationItemType; label: string; icon: string }[] = [
  { value: 'open-trips', label: 'Open Trips', icon: 'MapPin' },
  { value: 'accommodation', label: 'Accommodation', icon: 'Bed' },
  { value: 'attraction', label: 'Attraction', icon: 'Camera' },
  { value: 'transfer-transport', label: 'Transfer & Transport', icon: 'Car' },
  { value: 'travel-document', label: 'Travel Document', icon: 'FileText' },
  { value: 'air-ticket', label: 'Air Ticket', icon: 'Plane' },
  { value: 'tour-package', label: 'Tour Package', icon: 'Package' },
  { value: 'other-services', label: 'Other Services', icon: 'MoreHorizontal' }
];

export const RESERVATION_TYPE_LABELS: Record<ReservationItemType, string> = {
  'open-trips': 'Open Trips',
  'accommodation': 'Accommodation',
  'attraction': 'Attraction',
  'transfer-transport': 'Transfer & Transport',
  'travel-document': 'Travel Document',
  'air-ticket': 'Air Ticket',
  'tour-package': 'Tour Package',
  'other-services': 'Other Services'
};
