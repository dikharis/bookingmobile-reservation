import { Plus, Calendar, Users, MapPin } from 'lucide-react';

interface HomePageProps {
  onCreateReservation: () => void;
}

export default function HomePage({ onCreateReservation }: HomePageProps) {
  return (
    <div className="min-h-screen bg-operational-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-operational-text">QuickRes</h1>
          <p className="text-sm text-operational-muted mt-1">Internal Reservation System</p>
        </div>
      </header>

      {/* Welcome Section */}
      <main className="px-4 py-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-brand-600" />
          </div>
          <h2 className="text-2xl font-semibold text-operational-text mb-2">
            Welcome to QuickRes
          </h2>
          <p className="text-operational-muted">
            Create and manage reservations quickly and efficiently
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-operational-text mb-1">Quick Create</h3>
            <p className="text-sm text-operational-muted">Start a new reservation</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-operational-text mb-1">Recent</h3>
            <p className="text-sm text-operational-muted">View recent bookings</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-operational-text mb-1">Destinations</h3>
            <p className="text-sm text-operational-muted">Popular destinations</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-operational-text mb-1">Schedule</h3>
            <p className="text-sm text-operational-muted">View calendar</p>
          </div>
        </div>

        {/* Create Reservation Button */}
        <button
          onClick={onCreateReservation}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create New Reservation
        </button>

        {/* Recent Activity Placeholder */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-operational-text mb-4">Recent Activity</h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <p className="text-operational-muted">No recent reservations</p>
            <p className="text-sm text-operational-muted mt-1">Create your first reservation to get started</p>
          </div>
        </div>
      </main>
    </div>
  );
}
