import { useEffect, useState } from "react";
import "./PatientProfile.css";

export default function PatientProfile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch(
      "https://my-app-production-ac5b.up.railway.app/api/v1/patients/profile"
    )
      .then((r) => r.json())
      .then((d) => setProfile(d.patient));
  }, []);

  if (!profile) return <p>Loading...</p>;

  const bmi = (
    profile.current_weight /
    ((profile.height_cm / 100) * (profile.height_cm / 100))
  ).toFixed(1);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar">👤</div>

          <div>
            <h1>{profile.name}</h1>
            <p>{profile.phone}</p>
          </div>
        </div>

        <div className="metric-grid">
          <div className="metric-box">
            <h4>Current Weight</h4>
            <p>{profile.current_weight} kg</p>
          </div>

          <div className="metric-box">
            <h4>Goal Weight</h4>
            <p>{profile.goal_weight} kg</p>
          </div>

          <div className="metric-box">
            <h4>Height</h4>
            <p>{profile.height_cm} cm</p>
          </div>

          <div className="metric-box">
            <h4>BMI</h4>
            <p>{bmi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
