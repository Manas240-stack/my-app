import { useState, useEffect } from "react";
import { patientAPI } from "../api";
import "./WeightLogging.css";

interface WeightLoggingProps {
  onBack: () => void;
}

export const WeightLogging = ({ onBack }: WeightLoggingProps) => {
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      
      const profileResult = await patientAPI.getProfile(token || "");
      setProfile(profileResult.patient);

      const logsResult = await patientAPI.getWeightLogs(token || "");
      setLogs(logsResult.logs || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    setLoading(false);
  };

  const handleLogWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || parseFloat(weight) <= 0) {
      alert("Please enter a valid weight");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("access_token");
      const result = await patientAPI.logWeight(
        token || "",
        parseFloat(weight),
        note
      );

      if (result.log) {
        setLogs([result.log, ...logs]);
        setWeight("");
        setNote("");
        alert("Weight logged successfully!");
      }
    } catch (error) {
      console.error("Failed to log weight", error);
      alert("Failed to log weight");
    }
    setSubmitting(false);
  };

  const getWeightStatus = (currentWeight: number) => {
    if (!profile?.goal_weight || !profile?.start_weight) return "";
    
    const progress = ((profile.start_weight - currentWeight) / (profile.start_weight - profile.goal_weight)) * 100;
    
    if (progress >= 100) return "🎉 Goal Reached!";
    if (progress >= 75) return "🔥 Almost There!";
    if (progress >= 50) return "💪 Halfway There!";
    if (progress >= 25) return "👍 Good Progress!";
    return "🚀 Keep Going!";
  };

  const calculateStats = () => {
    if (logs.length === 0) return null;

    const weights = logs.map((l) => l.weight_kg);
    const avgWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);

    return {
      average: avgWeight.toFixed(1),
      min: minWeight.toFixed(1),
      max: maxWeight.toFixed(1),
      total: logs.length,
    };
  };

  if (loading) return <div className="loading">Loading weight data...</div>;

  const stats = calculateStats();
  const latestWeight = logs.length > 0 ? logs[0].weight_kg : null;

  return (
    <div className="weight-logging-container">
      <div className="logging-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1>Weight Tracking</h1>
        <div style={{ width: "80px" }}></div>
      </div>

      {/* Profile Summary */}
      {profile && (
        <div className="profile-summary">
          <div className="summary-card">
            <label>Start Weight</label>
            <p className="weight-big">{profile.start_weight} kg</p>
          </div>
          <div className="summary-card current">
            <label>Current Weight</label>
            <p className="weight-big">{profile.current_weight} kg</p>
          </div>
          <div className="summary-card goal">
            <label>Goal Weight</label>
            <p className="weight-big">{profile.goal_weight} kg</p>
          </div>
        </div>
      )}

      {/* Status */}
      {latestWeight && (
        <div className="status-box">
          <p>{getWeightStatus(latestWeight)}</p>
          <p className="progress-text">
            You've lost {(profile.start_weight - latestWeight).toFixed(1)} kg!
          </p>
        </div>
      )}

      {/* Log Form */}
      <div className="logging-form-section">
        <h2>Log Weight Today</h2>
        <form onSubmit={handleLogWeight} className="weight-form">
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label>Notes (Optional)</label>
            <input
              type="text"
              placeholder="e.g., After workout, morning weight"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={submitting}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Logging..." : "Log Weight"}
          </button>
        </form>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="stats-section">
          <h2>Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <label>Average Weight</label>
              <p className="stat-value">{stats.average} kg</p>
            </div>
            <div className="stat-card">
              <label>Lowest Weight</label>
              <p className="stat-value">{stats.min} kg</p>
            </div>
            <div className="stat-card">
              <label>Highest Weight</label>
              <p className="stat-value">{stats.max} kg</p>
            </div>
            <div className="stat-card">
              <label>Total Logs</label>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
        </div>
      )}

      {/* Weight History */}
      <div className="history-section">
        <h2>Weight History</h2>
        {logs.length === 0 ? (
          <div className="empty-logs">
            <p>📊 No weight logs yet. Start by logging your weight above!</p>
          </div>
        ) : (
          <div className="logs-list">
            {logs.map((log, index) => (
              <div key={log.id || index} className="log-item">
                <div className="log-main">
                  <div className="log-weight">
                    <p className="weight-number">{log.weight_kg} kg</p>
                    {index > 0 && (
                      <p className="weight-change">
                        {log.weight_kg < logs[index - 1].weight_kg
                          ? `↓ ${(logs[index - 1].weight_kg - log.weight_kg).toFixed(1)} kg`
                          : `↑ ${(log.weight_kg - logs[index - 1].weight_kg).toFixed(1)} kg`}
                      </p>
                    )}
                  </div>
                  <div className="log-details">
                    <p className="log-date">
                      {new Date(log.logged_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(log.logged_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {log.note && <p className="log-note">📝 {log.note}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};