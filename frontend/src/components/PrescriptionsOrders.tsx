import { useState, useEffect } from 'react';
import './PrescriptionsOrders.css';

export default function PrescriptionsOrders() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'prescriptions') {
      fetchPrescriptions();
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://my-app-production-ac5b.up.railway.app/api/v1/patients/prescriptions');
      const data = await response.json();
      setPrescriptions(data.prescriptions || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://my-app-production-ac5b.up.railway.app/api/v1/patients/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  return (
    <div className="prescriptions-container">
      <h2>Prescriptions & Orders</h2>

      <div className="tabs">
        <button
          className={activeTab === 'prescriptions' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('prescriptions')}
        >
          Prescriptions
        </button>
        <button
          className={activeTab === 'orders' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : activeTab === 'prescriptions' ? (
        prescriptions.length === 0 ? (
          <p>No prescriptions</p>
        ) : (
          <div className="items-list">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="item-card">
                <h3>Prescription #{prescription.id}</h3>
                <p><strong>Doctor:</strong> {prescription.doctor_id}</p>
                <p><strong>Date:</strong> {new Date(prescription.created_at).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {prescription.status}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        orders.length === 0 ? (
          <p>No orders</p>
        ) : (
          <div className="items-list">
            {orders.map((order) => (
              <div key={order.id} className="item-card">
                <h3>Order #{order.id}</h3>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
