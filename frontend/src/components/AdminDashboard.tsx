import "./AdminDashboard.css";

const recentOrders = [
  {
    id: "ORD-1001",
    customer: "Rahul Sharma",
    status: "Shipped"
  },
  {
    id: "ORD-1002",
    customer: "Ananya Patel",
    status: "Pending"
  }
];

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Operations, revenue & platform health</p>
      </div>

      <div className="admin-metrics">
        <div className="admin-card">
          <h4>Total Revenue</h4>
          <h2>₹18.2L</h2>
        </div>

        <div className="admin-card">
          <h4>Active Patients</h4>
          <h2>2,483</h2>
        </div>

        <div className="admin-card">
          <h4>Doctors</h4>
          <h2>148</h2>
        </div>

        <div className="admin-card">
          <h4>Orders Today</h4>
          <h2>214</h2>
        </div>
      </div>

      <div className="ops-panel">
        <h2>Recent Orders</h2>

        {recentOrders.map((order) => (
          <div key={order.id} className="order-row">
            <div>
              <h4>{order.id}</h4>
              <p>{order.customer}</p>
            </div>

            <span className="status">{order.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
