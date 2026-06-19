import { useState, useEffect } from "react";
import { patientAPI } from "../api";
import "./PrescriptionsOrders.css";

interface PrescriptionsOrdersProps {
  onBack: () => void;
}

export const PrescriptionsOrders = ({ onBack }: PrescriptionsOrdersProps) => {
  const [activeTab, setActiveTab] = useState<"prescriptions" | "orders">(
    "prescriptions"
  );
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const prescResult = await patientAPI.getPrescriptions(token || "");
      setPrescriptions(prescResult.prescriptions || []);

      const ordersResult = await patientAPI.getOrders(token || "");
      setOrders(ordersResult.orders || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "status-active";
      case "completed":
        return "status-completed";
      case "expired":
        return "status-expired";
      default:
        return "status-pending";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "confirmed":
        return "status-confirmed";
      case "dispatched":
        return "status-dispatched";
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "confirmed":
        return "✅";
      case "dispatched":
        return "📦";
      case "delivered":
        return "🎉";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  if (loading) return <div className="loading">Loading prescriptions & orders...</div>;

  return (
    <div className="prescriptions-orders-container">
      <div className="po-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1>Prescriptions & Orders</h1>
        <div style={{ width: "80px" }}></div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "prescriptions" ? "active" : ""}`}
          onClick={() => setActiveTab("prescriptions")}
        >
          💊 Prescriptions
        </button>
        <button
          className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          📦 Orders
        </button>
      </div>

      {/* PRESCRIPTIONS TAB */}
      {activeTab === "prescriptions" && (
        <div className="tab-content">
          {prescriptions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💊</div>
              <h2>No Prescriptions</h2>
              <p>Book a consultation to get prescriptions</p>
            </div>
          ) : (
            <div className="prescriptions-list">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="prescription-card">
                  <div className="prescription-top">
                    <div className="medication-info">
                      <h3>{prescription.medication_name}</h3>
                      <p className="rx-number">Rx: {prescription.rx_number}</p>
                    </div>
                    <span className={`status ${getStatusColor(prescription.status)}`}>
                      {prescription.status.charAt(0).toUpperCase() +
                        prescription.status.slice(1)}
                    </span>
                  </div>

                  <div className="prescription-details">
                    <div className="detail-item">
                      <span className="label">💊 Dose</span>
                      <span className="value">{prescription.dose}</span>
                    </div>

                    <div className="detail-item">
                      <span className="label">⏰ Frequency</span>
                      <span className="value">{prescription.frequency}</span>
                    </div>

                    <div className="detail-item">
                      <span className="label">📅 Duration</span>
                      <span className="value">{prescription.duration_days} days</span>
                    </div>

                    <div className="detail-item">
                      <span className="label">⏳ Valid Until</span>
                      <span className="value">
                        {new Date(prescription.valid_until).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="label">📝 Created</span>
                      <span className="value">
                        {new Date(prescription.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="prescription-actions">
                    <button className="action-btn refill-btn">🔄 Refill</button>
                    <button className="action-btn download-btn">⬇️ Download</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="tab-content">
          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h2>No Orders</h2>
              <p>Your medicine orders will appear here</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-top">
                    <div className="order-info">
                      <h3>Order #{order.order_number}</h3>
                      <p className="order-date">
                        Placed on{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`status ${getOrderStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="order-timeline">
                    <div className={`timeline-step ${order.status === "pending" || ["confirmed", "dispatched", "delivered"].includes(order.status) ? "completed" : ""}`}>
                      <div className="timeline-dot">📋</div>
                      <p>Order Placed</p>
                    </div>
                    <div className={`timeline-step ${["confirmed", "dispatched", "delivered"].includes(order.status) ? "completed" : ""}`}>
                      <div className="timeline-dot">✅</div>
                      <p>Confirmed</p>
                    </div>
                    <div className={`timeline-step ${["dispatched", "delivered"].includes(order.status) ? "completed" : ""}`}>
                      <div className="timeline-dot">📦</div>
                      <p>Dispatched</p>
                    </div>
                    <div className={`timeline-step ${order.status === "delivered" ? "completed" : ""}`}>
                      <div className="timeline-dot">🎉</div>
                      <p>Delivered</p>
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="detail-group">
                      <h4>Delivery Address</h4>
                      <p>{order.delivery_address?.full_name}</p>
                      <p>{order.delivery_address?.address_line1}</p>
                      <p>
                        {order.delivery_address?.city},{" "}
                        {order.delivery_address?.state}{" "}
                        {order.delivery_address?.pincode}
                      </p>
                      <p>📞 {order.delivery_address?.phone}</p>
                    </div>

                    <div className="detail-group">
                      <h4>Shipping Details</h4>
                      {order.tracking_number && (
                        <>
                          <p>
                            <strong>Courier:</strong> {order.courier}
                          </p>
                          <p>
                            <strong>Tracking No:</strong> {order.tracking_number}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="detail-group">
                      <h4>Order Summary</h4>
                      <p>
                        <strong>Amount:</strong> ₹{order.amount}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {order.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="order-actions">
                    {order.status === "dispatched" && (
                      <button className="action-btn track-btn">
                        🗺️ Track Package
                      </button>
                    )}
                    {order.status === "delivered" && (
                      <button className="action-btn reorder-btn">
                        🔄 Reorder
                      </button>
                    )}
                    {order.status === "pending" && (
                      <button className="action-btn cancel-btn">
                        ❌ Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};