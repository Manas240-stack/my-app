import { useEffect, useState } from "react";
import "./WeightLogging.css";

export default function WeightLogging() {
  const [weight, setWeight] = useState("");
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const response = await fetch(
      "https://my-app-production-ac5b.up.railway.app/api/v1/patients/weight-logs"
    );
    const data = await response.json();
    setLogs(data.logs || []);
  };

  return (
    <div className="weight-page">
      <div className="weight-top">
        <h1>Weight Progress</h1>

        <input
          placeholder="Enter weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className="weight-grid">
        {logs.map((log) => (
          <div key={log.id} className="weight-card">
            <h2>{log.weight_kg} kg</h2>
            <p>{log.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
