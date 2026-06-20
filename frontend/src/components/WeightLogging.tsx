import { useState, useEffect } from 'react';
import './WeightLogging.css';

export default function WeightLogging() {
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://my-app-production-ac5b.up.railway.app/api/v1/patients/weight-logs');
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
    setLoading(false);
  };

  const handleAddLog = async () => {
    if (!weight) {
      alert('Please enter weight');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://my-app-production-ac5b.up.railway.app/api/v1/patients/weight-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weight_kg: parseFloat(weight),
          note: note || undefined,
        }),
      });

      if (response.ok) {
        alert('Weight logged successfully!');
        setWeight('');
        setNote('');
        await fetchLogs();
      }
    } catch (error) {
      console.error('Error adding log:', error);
      alert('Failed to log weight');
    }
    setLoading(false);
  };

  return (
    <div className="weight-logging-container">
      <h2>Weight Logging</h2>

      <div className="log-form">
        <h3>Log Your Weight</h3>
        <div className="form-group">
          <input
            type="number"
            step="0.1"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button onClick={handleAddLog} disabled={loading}>
            {loading ? 'Adding...' : 'Add Log'}
          </button>
        </div>
      </div>

      <div className="logs-section">
        <h3>Recent Logs</h3>
        {logs.length === 0 ? (
          <p>No weight logs yet</p>
        ) : (
          <div className="logs-list">
            {logs.map((log) => (
              <div key={log.id} className="log-item">
                <div className="weight-display">
                  <span className="weight-value">{log.weight_kg} kg</span>
                  <span className="log-date">
                    {new Date(log.logged_at).toLocaleDateString()}
                  </span>
                </div>
                {log.note && <p className="log-note">{log.note}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={fetchLogs} className="refresh-btn">
        Refresh Logs
      </button>
    </div>
  );
}
