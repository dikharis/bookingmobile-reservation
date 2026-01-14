import React, { useState, useEffect } from 'react';
import { RESERVATION_TYPES, COMMON_FIELDS } from './constants';
import { ReservationTypeConfig, ReservationCategory, ReservationStatus, ParsedReservationIntent } from './types';
import { Icon } from './components/ui/Icon';
import { CounterInput, ChipSelect, MobileTextInput, MobileDateInput } from './components/SmartInputs';
import { MagicPaste } from './components/MagicPaste';

type ViewState = 'LIST' | 'TYPE_SELECT' | 'FORM' | 'SUCCESS';

const App = () => {
  const [view, setView] = useState<ViewState>('LIST');
  const [selectedType, setSelectedType] = useState<ReservationTypeConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [reservations, setReservations] = useState<any[]>([]);
  const [showMagicPaste, setShowMagicPaste] = useState(false);

  // --- Handlers ---

  const handleStartNew = () => {
    setFormData({});
    setSelectedType(null);
    setView('TYPE_SELECT');
  };

  const handleSelectType = (type: ReservationTypeConfig) => {
    setSelectedType(type);
    // Initialize defaults
    setFormData(prev => ({
      ...prev,
      type: type.id,
      pax: prev.pax || 1,
      date: prev.date || new Date().toISOString().split('T')[0]
    }));
    setView('FORM');
  };

  const handleInputChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = (status: ReservationStatus) => {
    const newReservation = {
      id: Math.random().toString(36).substr(2, 9),
      status,
      createdAt: new Date().toISOString(),
      typeConfig: selectedType, // store for display convenience
      ...formData
    };
    setReservations([newReservation, ...reservations]);
    setView('SUCCESS');
  };

  const handleMagicParsed = (data: ParsedReservationIntent) => {
    // 1. Determine Type
    let typeConfig = null;
    if (data.category) {
      typeConfig = RESERVATION_TYPES.find(t => t.id === data.category);
    }
    
    // If we have a type, set it
    if (typeConfig) {
      setSelectedType(typeConfig);
    } 
    // If not, we might need to stay on select screen or default to TOUR, 
    // but for now let's default to TOUR if unsure so we can show the form
    else {
      typeConfig = RESERVATION_TYPES[0];
      setSelectedType(typeConfig);
    }

    // 2. Merge Data
    const mergedData = {
      ...formData,
      guestName: data.guestName || formData.guestName,
      contactNumber: data.contactNumber || formData.contactNumber,
      pax: data.pax || formData.pax || 1,
      date: data.date || formData.date || new Date().toISOString().split('T')[0],
      time: data.time || formData.time,
      notes: data.notes || formData.notes
    };

    setFormData(mergedData);
    setShowMagicPaste(false);
    setView('FORM');
  };

  // --- Render Views ---

  const renderDashboard = () => (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <button 
            onClick={() => setShowMagicPaste(true)}
            className="bg-brand-50 text-brand-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1"
          >
            <Icon name="Sparkles" size={14} />
            <span>AI Input</span>
          </button>
        </div>
        
        {/* Quick Stats or Filters could go here */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
          <span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">All Active</span>
          <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">Today</span>
          <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">Drafts</span>
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {reservations.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-20" />
            <p>No reservations yet.</p>
            <p className="text-sm">Tap + to create one.</p>
          </div>
        ) : (
          reservations.map(res => (
            <div key={res.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start space-x-4 active:bg-gray-50 transition-colors">
               <div className={`p-3 rounded-lg ${res.typeConfig?.color || 'bg-gray-100 text-gray-500'}`}>
                 <Icon name={res.typeConfig?.icon || 'FileText'} size={24} />
               </div>
               <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start">
                   <h3 className="font-bold text-gray-900 truncate">{res.guestName || 'Unknown Guest'}</h3>
                   <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                     res.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                   }`}>
                     {res.status}
                   </span>
                 </div>
                 <p className="text-sm text-gray-500 truncate">{res.typeConfig?.name} • {res.pax} Pax</p>
                 <p className="text-xs text-gray-400 mt-1">{res.date}</p>
               </div>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={handleStartNew}
          className="bg-brand-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-brand-700 active:scale-95 transition-all"
        >
          <Icon name="Plus" size={32} />
        </button>
      </div>
    </div>
  );

  const renderTypeSelect = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-4 border-b border-gray-100 sticky top-0 z-10 flex items-center space-x-3">
        <button onClick={() => setView('LIST')} className="p-2 -ml-2 text-gray-500">
          <Icon name="X" size={24} />
        </button>
        <h2 className="text-lg font-bold">New Reservation</h2>
      </div>

      <div className="p-4 flex-1">
        <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">Select Category</p>
        <div className="grid grid-cols-2 gap-4">
          {RESERVATION_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => handleSelectType(type)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-3 aspect-square active:scale-[0.98] transition-transform"
            >
              <div className={`p-4 rounded-full ${type.color}`}>
                <Icon name={type.icon} size={32} />
              </div>
              <span className="font-bold text-gray-700 text-sm">{type.name}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowMagicPaste(true)}
          className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl shadow-lg flex items-center justify-center space-x-3 active:scale-[0.98] transition-all"
        >
          <Icon name="Sparkles" size={20} />
          <span className="font-bold">Magic Auto-Fill</span>
        </button>
      </div>
    </div>
  );

  const renderForm = () => {
    if (!selectedType) return null;

    const allFields = [...selectedType.fields, ...COMMON_FIELDS];

    return (
      <div className="min-h-screen bg-operational-bg flex flex-col">
        {/* Nav */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button onClick={() => setView('TYPE_SELECT')} className="p-2 -ml-2 text-gray-400 hover:text-gray-900">
              <Icon name="ChevronLeft" size={24} />
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase">Creating</span>
              <span className="text-sm font-bold text-gray-900">{selectedType.name}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowMagicPaste(true)}
            className="text-brand-600 bg-brand-50 p-2 rounded-full"
          >
             <Icon name="Sparkles" size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-5 pb-32 overflow-y-auto">
          <div className="space-y-6">
            {allFields.map(field => {
              if (field.type === 'counter') {
                return (
                  <CounterInput 
                    key={field.id}
                    label={field.label}
                    value={formData[field.id] || (field.id === 'pax' ? 1 : 0)}
                    onChange={(val) => handleInputChange(field.id, val)}
                  />
                );
              }
              if (field.type === 'select') {
                return (
                  <ChipSelect
                    key={field.id}
                    label={field.label}
                    options={field.options || []}
                    value={formData[field.id]}
                    onChange={(val) => handleInputChange(field.id, val)}
                  />
                );
              }
              if (field.type === 'date') {
                 return (
                  <MobileDateInput
                    key={field.id}
                    label={field.label}
                    value={formData[field.id] || ''}
                    onChange={(e: any) => handleInputChange(field.id, e.target.value)}
                  />
                 );
              }
              // Fallback to text/textarea/tel/time
              const Component = field.type === 'textarea' ? 'textarea' : 'input';
              return (
                <MobileTextInput
                  key={field.id}
                  as={Component}
                  label={field.label}
                  type={field.type === 'textarea' ? undefined : field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e: any) => handleInputChange(field.id, e.target.value)}
                  rows={field.type === 'textarea' ? 3 : undefined}
                />
              );
            })}
          </div>
        </div>

        {/* Sticky Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30 flex space-x-3">
          <button
            onClick={() => handleSave(ReservationStatus.DRAFT)}
            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 font-bold text-gray-600 active:bg-gray-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(ReservationStatus.CONFIRMED)}
            className="flex-1 py-3.5 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-200 active:bg-brand-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
        <Icon name="CheckCircle" size={40} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Reservation Saved!</h2>
      <p className="text-gray-500 mb-8">The booking has been successfully recorded.</p>
      
      <button 
        onClick={() => setView('LIST')}
        className="w-full max-w-xs bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
      >
        Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden">
      {view === 'LIST' && renderDashboard()}
      {view === 'TYPE_SELECT' && renderTypeSelect()}
      {view === 'FORM' && renderForm()}
      {view === 'SUCCESS' && renderSuccess()}
      
      {showMagicPaste && (
        <MagicPaste 
          onClose={() => setShowMagicPaste(false)} 
          onParsed={handleMagicParsed} 
        />
      )}
    </div>
  );
};

export default App;