import "./DoctorDashboard.css";

const appointments = [
  {
    id: 1,
    patient: "Rahul Sharma",
    time: "10:00 AM",
    reason: "Weight Management"
  },
  {
    id: 2,
    patient: "Priya Mehta",
    time: "11:30 AM",
    reason: "GLP-1 Follow-up"
  }
];

export default function DoctorDashboard() {
  return (
    <div className="doctor-dashboard-page">
      <div className="doctor-header">
        <h1>Doctor Dashboard</h1>
        <p>Manage consultations and patient care</p>
      </div>

      <div className="doctor-metrics">
        <div className="doctor-metric-card">
          <h4>Appointments</h4>
          <h2>12</h2>
        </div>

        <div className="doctor-metric-card">
          <h4>Revenue</h4>
          <h2>₹24,500</h2>
        </div>

        <div className="doctor-metric-card">
          <h4>Follow Ups</h4>
          <h2>18</h2>
        </div>
      </div>

      <div className="appointment-list">
        <h2>Today's Queue</h2>

        {appointments.map((appt) => (
          <div key={appt.id} className="appointment-card">
            <div>
              <h3>{appt.patient}</h3>
              <p>{appt.reason}</p>
            </div>

            <div className="appointment-right">
              <span>{appt.time}</span>
              <button>Open Case</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
