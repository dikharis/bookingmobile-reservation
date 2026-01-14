export interface CustomerInfo {
  name: string;
  phone: string;
  notes?: string;
}

export type ReservationItemType = 
  | 'open-trips'
  | 'accommodation'
  | 'attraction'
  | 'transfer-transport'
  | 'travel-document'
  | 'air-ticket'
  | 'tour-package'
  | 'other-services';

export interface BaseReservationItem {
  id: string;
  type: ReservationItemType;
  status: 'draft' | 'confirmed';
}

export interface OpenTripsItem extends BaseReservationItem {
  type: 'open-trips';
  destination: string;
  date: string;
  pax: number;
  duration: string;
}

export interface AccommodationItem extends BaseReservationItem {
  type: 'accommodation';
  hotelName: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
}

export interface AttractionItem extends BaseReservationItem {
  type: 'attraction';
  attractionName: string;
  date: string;
  pax: number;
  time?: string;
}

export interface TransferTransportItem extends BaseReservationItem {
  type: 'transfer-transport';
  service: 'transfer' | 'transport';
  route: string;
  date: string;
  time: string;
  vehicle: string;
  pax: number;
}

export interface TravelDocumentItem extends BaseReservationItem {
  type: 'travel-document';
  documentType: 'visa' | 'passport' | 'insurance' | 'other';
  destination: string;
  submissionDate: string;
  completionDate?: string;
  applicants: number;
}

export interface AirTicketItem extends BaseReservationItem {
  type: 'air-ticket';
  flightType: 'oneway' | 'roundtrip' | 'multicity';
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class: 'economy' | 'business' | 'first';
}

export interface TourPackageItem extends BaseReservationItem {
  type: 'tour-package';
  packageName: string;
  date: string;
  duration: string;
  pax: number;
  inclusions: string[];
}

export interface OtherServicesItem extends BaseReservationItem {
  type: 'other-services';
  serviceName: string;
  description: string;
  date?: string;
  quantity?: number;
  price?: number;
}

export type ReservationItem = 
  | OpenTripsItem
  | AccommodationItem
  | AttractionItem
  | TransferTransportItem
  | TravelDocumentItem
  | AirTicketItem
  | TourPackageItem
  | OtherServicesItem;

export interface Reservation {
  id: string;
  customer: CustomerInfo;
  items: ReservationItem[];
  createdAt: string;
  updatedAt: string;
}
