import { ReservationTypeConfig, ReservationField } from './types';
import { Ship, Car, Map, Anchor } from 'lucide-react';

export const RESERVATION_TYPES: ReservationTypeConfig[] = [
  {
    id: 'TOUR',
    name: 'Tour Booking',
    icon: 'Map',
    color: 'bg-blue-100 text-blue-700',
    fields: [
      { id: 'tourName', label: 'Tour Name', type: 'select', options: ['Sunset Cliff', 'Jungle Trek', 'City Heritage', 'Food Walk'], required: true },
      { id: 'guestName', label: 'Guest Name', type: 'text', placeholder: 'e.g. John Doe', required: true },
      { id: 'pax', label: 'Guests', type: 'counter', required: true },
      { id: 'date', label: 'Date', type: 'date', required: true },
      { id: 'pickup', label: 'Pickup Location', type: 'text', placeholder: 'Hotel Name / Address' },
    ]
  },
  {
    id: 'TRANSFER',
    name: 'Transport',
    icon: 'Car',
    color: 'bg-green-100 text-green-700',
    fields: [
      { id: 'route', label: 'Route', type: 'select', options: ['Airport -> Hotel', 'Hotel -> Airport', 'Inter-city'], required: true },
      { id: 'guestName', label: 'Guest Name', type: 'text', placeholder: 'e.g. Jane Smith', required: true },
      { id: 'pax', label: 'Passengers', type: 'counter', required: true },
      { id: 'date', label: 'Date', type: 'date', required: true },
      { id: 'time', label: 'Pickup Time', type: 'time', required: true },
      { id: 'flightNumber', label: 'Flight No.', type: 'text', placeholder: 'e.g. GA-402' },
    ]
  },
  {
    id: 'FAST_BOAT',
    name: 'Fast Boat',
    icon: 'Ship',
    color: 'bg-orange-100 text-orange-700',
    fields: [
      { id: 'destination', label: 'Destination', type: 'select', options: ['Nusa Penida', 'Gili T', 'Lembongan'], required: true },
      { id: 'guestName', label: 'Guest Name', type: 'text', required: true },
      { id: 'pax', label: 'Tickets', type: 'counter', required: true },
      { id: 'date', label: 'Date', type: 'date', required: true },
      { id: 'tripType', label: 'Trip Type', type: 'select', options: ['One Way', 'Return'] },
    ]
  },
  {
    id: 'CHARTER',
    name: 'Private Charter',
    icon: 'Anchor',
    color: 'bg-purple-100 text-purple-700',
    fields: [
      { id: 'vessel', label: 'Vessel Type', type: 'select', options: ['Luxury Yacht', 'Speedboat', 'Catamaran'], required: true },
      { id: 'guestName', label: 'Lead Guest', type: 'text', required: true },
      { id: 'duration', label: 'Duration (Hours)', type: 'counter' },
      { id: 'date', label: 'Date', type: 'date', required: true },
      { id: 'specialRequests', label: 'Special Requests', type: 'textarea' },
    ]
  }
];

export const COMMON_FIELDS: ReservationField[] = [
  { id: 'contactNumber', label: 'WhatsApp / Phone', type: 'tel', placeholder: '+1 234...' },
  { id: 'notes', label: 'Internal Notes', type: 'textarea', placeholder: 'Payment details, allergies...' },
];