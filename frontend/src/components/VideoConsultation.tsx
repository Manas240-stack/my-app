import "./VideoConsultation.css";

export default function VideoConsultation() {
  return (
    <div className="video-page">
      <div className="video-main">
        <div className="doctor-video">
          <div className="live-badge">LIVE</div>
          <div className="video-name">Dr. Kavita Sharma</div>
        </div>

        <div className="patient-video">
          <div className="video-name small">You</div>
        </div>
      </div>

      <aside className="consult-sidebar">
        <div className="consult-card">
          <h2>Consultation Notes</h2>

          <textarea
            placeholder="Doctor notes, symptoms, recommendations..."
          />
        </div>

        <div className="consult-card">
          <h2>Prescription</h2>
          <ul>
            <li>Semaglutide 0.25mg</li>
            <li>Weekly injection</li>
            <li>High-protein diet</li>
          </ul>
        </div>

        <div className="call-actions">
          <button className="mute-btn">Mute</button>
          <button className="camera-btn">Camera</button>
          <button className="end-btn">End Call</button>
        </div>
      </aside>
    </div>
  );
}
