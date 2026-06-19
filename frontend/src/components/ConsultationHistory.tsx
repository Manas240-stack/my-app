import { useState, useEffect } from 'react';
import './ConsultationHistory.css';

export default function ConsultationHistory() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/patients/consultations');
      const data = await response.json();
      setConsultations(data.consultations || []);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }
    setLoading(false);
  };

  return (
    <div className="consultation-container">
      <h2>Consultation History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : consultations.length === 0 ? (
        <p>No consultations yet</p>
      ) : (
        <div className="consultation-list">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="consultation-card">
              <h3>Dr. {consultation.doctor_id}</h3>
              <p><strong>Date:</strong> {new Date(consultation.scheduled_at).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(consultation.scheduled_at).toLocaleTimeString()}</p>
              <p><strong>Mode:</strong> {consultation.mode}</p>
              <p><strong>Status:</strong> {consultation.status}</p>
              <p><strong>Fee Paid:</strong> ₹{consultation.fee_charged}</p>
              <p><strong>Booking Ref:</strong> {consultation.booking_ref}</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={fetchConsultations} className="refresh-btn">
        Refresh
      </button>
    </div>
  );
}