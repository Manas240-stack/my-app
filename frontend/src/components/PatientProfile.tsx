import { useState, useEffect } from "react";
import "./PatientProfile.css";

export default function PatientProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        "https://my-app-production-ac5b.up.railway.app/api/v1/patients/profile"
      );
      const data = await response.json();
      setProfile(data.patient);
      setFormData(data.patient);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://my-app-production-ac5b.up.railway.app/api/v1/patients/profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfile(data.patient);
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>

          <div>
            <h1>{profile.name}</h1>
            <p>{profile.phone}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div className="profile-grid">
              <div>Weight: {profile.current_weight} kg</div>
              <div>Goal: {profile.goal_weight} kg</div>
              <div>Height: {profile.height_cm} cm</div>
              <div>City: {profile.city}</div>
            </div>

            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        ) : (
          <>
            <div className="form-grid">
              <input
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
              />

              <input
                value={formData.current_weight || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    current_weight: e.target.value,
                  })
                }
                placeholder="Current Weight"
              />

              <input
                value={formData.goal_weight || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    goal_weight: e.target.value,
                  })
                }
                placeholder="Goal Weight"
              />

              <input
                value={formData.city || ""}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="City"
              />
            </div>

            <button onClick={handleSave}>Save Changes</button>
          </>
        )}
      </div>
    </div>
  );
}
