import { useEffect, useState } from "react";
import "./ConsultationHistory.css";

export default function ConsultationHistory() {
  const [consultations, setConsultations] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://my-app-production-ac5b.up.railway.app/api/v1/patients/consultations"
    )
      .then((r) => r.json())
      .then((d) => setConsultations(d.consultations || []));
  }, []);

  return (
    <div className="consult-page">
      <h1>Consultation History</h1>

      <div className="consult-grid">
        {consultations.map((item) => (
          <div key={item.id} className="consult-card">
            <h3>Consultation #{item.id}</h3>
            <p>{item.mode}</p>
            <p>{item.status}</p>
            <p>₹{item.fee_charged}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
