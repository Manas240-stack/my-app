import { useState } from "react";
import "./PrescriptionGenerator.css";

export default function PrescriptionGenerator() {
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");

  return (
    <div className="prescription-page">
      <div className="prescription-card">
        <h1>Generate Prescription</h1>

        <input
          placeholder="Medication"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
        />

        <input
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />

        <textarea placeholder="Instructions" />

        <button>Generate Prescription</button>
      </div>
    </div>
  );
}
