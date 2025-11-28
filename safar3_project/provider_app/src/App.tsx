import React, { useState, useEffect } from 'react';

// URL of the main Safar Backend
// const BACKEND_URL = 'http://localhost:3000/api'; // Not used in mock

interface Offer {
  id: string;
  flightNumber: string;
  route: string;
  price: number;
  status: 'Active' | 'Pending' | 'Expired';
}

const ProviderDashboard: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, ] = useState<string | null>(null);

  // Mock data fetch for demonstration
  useEffect(() => {
    // In a real app, this would fetch data from a protected backend endpoint
    // Example: fetch(`${BACKEND_URL}/provider/offers`, { headers: { Authorization: 'Bearer ...' } })
    setTimeout(() => {
      setOffers([
        { id: 'O1', flightNumber: 'SV101', route: 'RUH - JED', price: 350, status: 'Active' },
        { id: 'O2', flightNumber: 'EK202', route: 'DXB - LHR', price: 1200, status: 'Pending' },
        { id: 'O3', flightNumber: 'QR303', route: 'DOH - JFK', price: 2100, status: 'Active' },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleUpdateStatus = (id: string, newStatus: Offer['status']) => {
    // In a real app, this would send a PUT request to the backend
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, status: newStatus } : offer
    ));
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>جاري تحميل لوحة التحكم...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>خطأ: {error}</div>;

  return (
    <div style={{ padding: '20px', direction: 'rtl', textAlign: 'right' }}>
      <h1 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>لوحة تحكم مزود السفر</h1>
      <p>مرحباً بك، مزود السفر. يمكنك إدارة عروضك وحجوزاتك من هنا.</p>

      <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
        <h2>إحصائيات سريعة</h2>
        <p>إجمالي العروض النشطة: {offers.filter(o => o.status === 'Active').length}</p>
        <p>إجمالي الحجوزات المعلقة: 5</p>
      </div>

      <h2>إدارة العروض</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>رقم الرحلة</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>المسار</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>السعر ($)</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الحالة</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {offers.map(offer => (
            <tr key={offer.id} style={{ backgroundColor: offer.status === 'Active' ? '#d4edda' : offer.status === 'Pending' ? '#fff3cd' : '#f8d7da' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{offer.flightNumber}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{offer.route}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{offer.price}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{offer.status}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <select 
                  value={offer.status} 
                  onChange={(e) => handleUpdateStatus(offer.id, e.target.value as Offer['status'])}
                  style={{ padding: '5px', borderRadius: '3px' }}
                >
                  <option value="Active">نشط</option>
                  <option value="Pending">معلق</option>
                  <option value="Expired">منتهي</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <ProviderDashboard />
    </div>
  );
};

export default App;
