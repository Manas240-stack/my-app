import { useEffect, useState } from "react";
import "./WeightLogging.css";

export default function WeightLogging() {
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://my-app-production-ac5b.up.railway.app/api/v1/patients/weight-logs"
      );
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleAddLog = async () => {
    if (!weight) return;

    await fetch(
      "https://my-app-production-ac5b.up.railway.app/api/v1/patients/weight-logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weight_kg: Number(weight),
          note,
        }),
      }
    );

    setWeight("");
    setNote("");
    fetchLogs();
  };

  return (
    <div className="weight-page">
      <h1>Weight Tracking</h1>

      <div className="weight-form">
        <input
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <input
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button onClick={handleAddLog}>Add Log</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="weight-list">
          {logs.map((log) => (
            <div key={log.id} className="weight-card">
              <h3>{log.weight_kg} kg</h3>
              <p>{log.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
