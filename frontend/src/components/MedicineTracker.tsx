import { useState } from "react";
import "./MedicineTracker.css";

export default function MedicineTracker() {
  const [activeTab, setActiveTab] = useState("orders");

  const orders = [
    {
      id: "RX-24122",
      status: "Shipped",
      eta: "Tomorrow",
      medicine: "Semaglutide 0.5mg"
    },
    {
      id: "RX-24123",
      status: "Delivered",
      eta: "Delivered",
      medicine: "Protein Supplements"
    }
  ];

  const subscriptions = [
    {
      id: 1,
      plan: "Monthly GLP-1 Plan",
      nextBilling: "15 June",
      amount: 4999
    }
  ];

  return (
    <div className="medicine-page">
      <div className="medicine-header">
        <h1>Medicine & Refills</h1>
        <p>Manage subscriptions, orders and deliveries</p>
      </div>

      <div className="medicine-tabs">
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>

        <button
          className={activeTab === "subscriptions" ? "active" : ""}
          onClick={() => setActiveTab("subscriptions")}
        >
          Subscriptions
        </button>
      </div>

      {activeTab === "orders" && (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="status-badge">
                {order.status}
              </div>

              <h3>{order.medicine}</h3>
              <p>Order ID: {order.id}</p>
              <p>ETA: {order.eta}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "subscriptions" && (
        <div className="sub-grid">
          {subscriptions.map((sub) => (
            <div className="sub-card" key={sub.id}>
              <h3>{sub.plan}</h3>
              <p>Next Billing: {sub.nextBilling}</p>
              <h2>₹{sub.amount}</h2>

              <button>Manage Plan</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
