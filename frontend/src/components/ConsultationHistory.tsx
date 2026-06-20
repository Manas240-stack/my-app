import { useEffect, useState } from "react";
import "./ConsultationHistory.css";

export default function ConsultationHistory() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://my-app-production-ac5b.up.railway.app/api/v1/patients/consultations"
      );
      const data = await response.json();
      setConsultations(data.consultations || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="consultation-page">
      <h1>Consultation History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : consultations.length === 0 ? (
        <p>No consultations yet</p>
      ) : (
        <div className="consultation-grid">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="consultation-card">
              <h3>Consultation #{consultation.id}</h3>
              <p>Status: {consultation.status}</p>
              <p>Mode: {consultation.mode}</p>
              <p>
                Date:{" "}
                {new Date(consultation.scheduled_at).toLocaleDateString()}
              </p>
              <p>Fee Paid: ₹{consultation.fee_charged}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
