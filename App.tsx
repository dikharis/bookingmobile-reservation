import React, { useState } from 'react';
import { Reservation, CustomerInfo, ReservationItem } from './types.ts';
import { ReservationItemType } from './types.ts';
import HomePage from './components/HomePage.tsx';
import CustomerSection from './components/CustomerSection.tsx';
import ReservationItemsList from './components/ReservationItemsList.tsx';
import AddItemButton from './components/AddItemButton.tsx';
import ItemFormModal from './components/ItemFormModal.tsx';
import ActionBar from './components/ActionBar.tsx';
import { generateId } from './utils/helpers.ts';

function App() {
  const [showHome, setShowHome] = useState(true);
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    notes: ''
  });

  const [items, setItems] = useState<ReservationItem[]>([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState<ReservationItemType | null>(null);
  const [editingItem, setEditingItem] = useState<ReservationItem | null>(null);
  const [isCustomerCollapsed, setIsCustomerCollapsed] = useState(false);

  const handleAddItem = (type: ReservationItemType) => {
    setSelectedItemType(type);
    setEditingItem(null);
    setShowAddItemModal(true);
  };

  const handleEditItem = (item: ReservationItem) => {
    setSelectedItemType(item.type);
    setEditingItem(item);
    setShowAddItemModal(true);
  };

  const handleSaveItem = (itemData: Partial<ReservationItem>) => {
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...itemData } as ReservationItem
          : item
      ));
    } else {
      const newItem: ReservationItem = {
        ...itemData as ReservationItem,
        id: generateId(),
        status: 'draft'
      };
      setItems([...items, newItem]);
    }
    setShowAddItemModal(false);
    setSelectedItemType(null);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleCreateReservation = () => {
    setShowHome(false);
  };

  const handleBackToHome = () => {
    setShowHome(true);
    // Reset form
    setCustomer({ name: '', phone: '', notes: '' });
    setItems([]);
  };

  const handleSaveDraft = () => {
    const reservation: Reservation = {
      id: generateId(),
      customer,
      items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    console.log('Saving draft:', reservation);
    // TODO: Implement save to backend
    alert('Draft saved successfully!');
  };

  const handleConfirmReservation = () => {
    const reservation: Reservation = {
      id: generateId(),
      customer,
      items: items.map(item => ({ ...item, status: 'confirmed' as const })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    console.log('Confirming reservation:', reservation);
    // TODO: Implement save to backend
    alert('Reservation confirmed successfully!');
  };

  return (
    <>
      {showHome ? (
        <HomePage onCreateReservation={handleCreateReservation} />
      ) : (
        <div className="min-h-screen bg-operational-bg pb-20">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-4 py-3 flex items-center gap-3">
              <button
                onClick={handleBackToHome}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ←
              </button>
              <h1 className="text-xl font-semibold text-operational-text">New Reservation</h1>
            </div>
          </header>

          {/* Customer Section */}
          <CustomerSection
            customer={customer}
            onChange={setCustomer}
            isCollapsed={isCustomerCollapsed}
            onToggleCollapse={() => setIsCustomerCollapsed(!isCustomerCollapsed)}
          />

          {/* Reservation Items Section */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-operational-text">Reservation Items</h2>
              <span className="text-sm text-operational-muted">{items.length} items</span>
            </div>

            <ReservationItemsList
              items={items}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />

            {items.length === 0 && (
              <div className="text-center py-8">
                <div className="text-operational-muted mb-2">No items added yet</div>
                <div className="text-sm text-operational-muted">Add your first reservation item to get started</div>
              </div>
            )}
          </div>

          {/* Add Item Button */}
          <AddItemButton onClick={() => setShowAddItemModal(true)} />

          {/* Item Form Modal */}
          {showAddItemModal && (
            <ItemFormModal
              itemType={selectedItemType}
              item={editingItem}
              onClose={() => {
                setShowAddItemModal(false);
                setSelectedItemType(null);
                setEditingItem(null);
              }}
              onSave={handleSaveItem}
            />
          )}

          {/* Action Bar */}
          <ActionBar
            itemsCount={items.length}
            onSaveDraft={handleSaveDraft}
            onConfirm={handleConfirmReservation}
            disabled={items.length === 0 || !customer.name || !customer.phone}
          />
        </div>
      )}
    </>
  );
}

export default App;
