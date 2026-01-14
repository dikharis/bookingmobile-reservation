export type ReservationCategory = 'TOUR' | 'TRANSFER' | 'FAST_BOAT' | 'CHARTER';

export enum ReservationStatus {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID'
}

export interface ReservationField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'time' | 'tel' | 'select' | 'textarea' | 'counter';
  options?: string[]; // For select inputs
  placeholder?: string;
  required?: boolean;
}

export interface ReservationTypeConfig {
  id: ReservationCategory;
  name: string;
  icon: string;
  color: string;
  fields: ReservationField[];
}

export interface ReservationData {
  id: string;
  type: ReservationCategory;
  status: ReservationStatus;
  createdAt: string;
  [key: string]: any; // Dynamic form fields
}

// Extracted data structure from AI
export interface ParsedReservationIntent {
  guestName?: string;
  contactNumber?: string;
  date?: string;
  time?: string;
  pax?: number;
  notes?: string;
  category?: ReservationCategory;
}