import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '12px 16px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600' }}>New Reservation</h1>
      </header>

      <main>
        <h2 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Customer Information</h2>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Customer Name"
            style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Reservation Items</h2>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>No items added yet</p>
          <button
            onClick={() => setCount(count + 1)}
            style={{ padding: '12px 24px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px' }}
          >
            Add Item
          </button>
          <p style={{ marginTop: '10px' }}>Button clicked: {count} times</p>
        </div>
      </main>
    </div>
  );
}

export default App;
