import { useEffect, useState } from "react";
import "./PrescriptionsOrders.css";

export default function PrescriptionsOrders() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    activeTab === "prescriptions"
      ? fetchPrescriptions()
      : fetchOrders();
  }, [activeTab]);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://my-app-production-ac5b.up.railway.app/api/v1/patients/prescriptions"
      );
      const data = await response.json();
      setPrescriptions(data.prescriptions || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://my-app-production-ac5b.up.railway.app/api/v1/patients/orders"
      );
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="prescription-page">
      <h1>Prescriptions & Orders</h1>

      <div className="tabs">
        <button
          className={activeTab === "prescriptions" ? "active" : ""}
          onClick={() => setActiveTab("prescriptions")}
        >
          Prescriptions
        </button>

        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : activeTab === "prescriptions" ? (
        prescriptions.map((item) => (
          <div key={item.id} className="item-card">
            Prescription #{item.id}
          </div>
        ))
      ) : (
        orders.map((item) => (
          <div key={item.id} className="item-card">
            Order #{item.id}
          </div>
        ))
      )}
    </div>
  );
}
