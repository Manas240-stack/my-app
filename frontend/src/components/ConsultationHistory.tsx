import { useState, useEffect } from "react";
import { patientAPI } from "../api";
import "./ConsultationHistory.css";

interface ConsultationHistoryProps {
  onBack: () => void;
}

export const ConsultationHistory = ({ onBack }: ConsultationHistoryProps) => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await patientAPI.getConsultations(token || "");
      setConsultations(result.consultations || []);
    } catch (error) {
      console.error("Failed to fetch consultations", error);
    }
    setLoading(false);
  };

  const handleCancel = (consultationId: string) => {
    if (window.confirm("Are you sure you want to cancel this consultation?")) {
      setConsultations(
        consultations.map((c) =>
          c.id === consultationId ? { ...c, status: "cancelled" } : c
        )
      );
      alert("Consultation cancelled");
    }
  };

  const handleReschedule = (consultationId: string) => {
    alert("Reschedule feature coming soon!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "status-scheduled";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  const getDoctorInfo = (doctorId: string) => {
    const doctors: any = {
      D001: {
        name: "Dr. Kavitha Rajan",
        specialty: "Endocrinology",
        avatar: "👩‍⚕️",
      },
      D002: {
        name: "Dr. Ramesh Kumar",
        specialty: "Internal Medicine",
        avatar: "👨‍⚕️",
      },
      D003: {
        name: "Dr. Priya Sharma",
        specialty: "Cardiology",
        avatar: "👩‍",
      },
    };
    return doctors[doctorId] || { name: "Doctor", specialty: "Unknown", avatar: "👨‍⚕️" };
  };

  if (loading) return <div className="loading">Loading consultations...</div>;

  return (
    <div className="consultation-history-container">
      <div className="history-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1>My Consultations</h1>
        <div style={{ width: "80px" }}></div>
      </div>

      {consultations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h2>No Consultations Yet</h2>
          <p>Book a consultation with a doctor to get started</p>
        </div>
      ) : (
        <div className="consultations-list">
          {consultations.map((consultation) => {
            const doctor = getDoctorInfo(consultation.doctor_id);
            const scheduledDate = new Date(consultation.scheduled_at);
            const isUpcoming = scheduledDate > new Date();

            return (
              <div key={consultation.id} className="consultation-card">
                <div className="consultation-top">
                  <div className="doctor-info">
                    <div className="doctor-avatar">{doctor.avatar}</div>
                    <div className="doctor-details">
                      <h3>{doctor.name}</h3>
                      <p className="specialty">{doctor.specialty}</p>
                    </div>
                  </div>
                  <span className={`status ${getStatusColor(consultation.status)}`}>
                    {consultation.status.charAt(0).toUpperCase() +
                      consultation.status.slice(1)}
                  </span>
                </div>

                <div className="consultation-details">
                  <div className="detail-item">
                    <span className="label">📅 Date & Time</span>
                    <span className="value">
                      {scheduledDate.toLocaleDateString()} at{" "}
                      {scheduledDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">📞 Mode</span>
                    <span className="value">
                      {consultation.mode === "video"
                        ? "📹 Video Call"
                        : consultation.mode === "audio"
                        ? "☎️ Audio Call"
                        : "💬 Chat"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">⏱️ Duration</span>
                    <span className="value">
                      {consultation.duration_mins || 30} minutes
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">💰 Fee</span>
                    <span className="value">₹{consultation.fee_charged}</span>
                  </div>

                  <div className="detail-item">
                    <span className="label">📝 Booking Reference</span>
                    <span className="value">{consultation.booking_ref}</span>
                  </div>
                </div>

                <div className="consultation-actions">
                  {isUpcoming && consultation.status === "scheduled" && (
                    <>
                      <button
                        className="action-btn reschedule-btn"
                        onClick={() => handleReschedule(consultation.id)}
                      >
                        📅 Reschedule
                      </button>
                      <button
                        className="action-btn cancel-btn"
                        onClick={() => handleCancel(consultation.id)}
                      >
                        ❌ Cancel
                      </button>
                    </>
                  )}
                  {consultation.status === "completed" && (
                    <button className="action-btn completed-btn">
                      ✅ Completed
                    </button>
                  )}
                  {consultation.status === "cancelled" && (
                    <button className="action-btn cancelled-btn">
                      ❌ Cancelled
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};