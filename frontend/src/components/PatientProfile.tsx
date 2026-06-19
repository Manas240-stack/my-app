import { useState, useEffect } from "react";
import { patientAPI } from "../api";
import "./PatientProfile.css";

interface PatientProfileProps {
  onNavigate: (page: string) => void;
}

export const PatientProfile = ({ onNavigate }: PatientProfileProps) => {
  const [patient, setPatient] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await patientAPI.getProfile(token || "");
      setPatient(result.patient);
      setFormData(result.patient);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
    setLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "current_weight" ||
        name === "start_weight" ||
        name === "goal_weight" ||
        name === "height_cm"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSave = async () => {
    try {
      setPatient(formData);
      setFormData(formData);
      setIsEditing(false);
      alert("Profile saved!");
    } catch (error: any) {
      alert("Error saving profile");
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!patient) return <div className="loading">Profile not found</div>;

  const weightProgress =
    patient.start_weight &&
    patient.current_weight &&
    patient.goal_weight
      ? ((patient.start_weight - patient.current_weight) /
          (patient.start_weight - patient.goal_weight)) *
        100
      : 0;

  return (
    <div className="patient-profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button
          className="edit-btn"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="form-grid">
            <div className="form-field">
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{patient.name}</p>
              )}
            </div>

            <div className="form-field">
              <label>Phone</label>
              <p>{patient.phone}</p>
            </div>

            <div className="form-field">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{patient.email || "Not set"}</p>
              )}
            </div>

            <div className="form-field">
              <label>City</label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{patient.city || "Not set"}</p>
              )}
            </div>

            <div className="form-field">
              <label>Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p>{patient.gender || "Not set"}</p>
              )}
            </div>

            <div className="form-field">
              <label>Height (cm)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="height_cm"
                  value={formData.height_cm || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{patient.height_cm ? `${patient.height_cm} cm` : "Not set"}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Weight Tracking</h2>
          <div className="weight-grid">
            <div className="weight-card">
              <label>Start Weight</label>
              {isEditing ? (
                <input
                  type="number"
                  name="start_weight"
                  value={formData.start_weight || ""}
                  onChange={handleInputChange}
                  step="0.1"
                />
              ) : (
                <p className="weight-value">
                  {patient.start_weight ? `${patient.start_weight} kg` : "Not set"}
                </p>
              )}
            </div>

            <div className="weight-card">
              <label>Current Weight</label>
              {isEditing ? (
                <input
                  type="number"
                  name="current_weight"
                  value={formData.current_weight || ""}
                  onChange={handleInputChange}
                  step="0.1"
                />
              ) : (
                <p className="weight-value current">
                  {patient.current_weight ? `${patient.current_weight} kg` : "Not set"}
                </p>
              )}
            </div>

            <div className="weight-card">
              <label>Goal Weight</label>
              {isEditing ? (
                <input
                  type="number"
                  name="goal_weight"
                  value={formData.goal_weight || ""}
                  onChange={handleInputChange}
                  step="0.1"
                />
              ) : (
                <p className="weight-value goal">
                  {patient.goal_weight ? `${patient.goal_weight} kg` : "Not set"}
                </p>
              )}
            </div>
          </div>

          {patient.start_weight &&
            patient.current_weight &&
            patient.goal_weight && (
              <div className="progress-section">
                <label>Progress to Goal</label>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min(weightProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="progress-text">
                  {weightProgress.toFixed(1)}% of goal achieved
                </p>
              </div>
            )}
        </div>

        <div className="profile-section">
          <h2>Medical Information</h2>
          <div className="form-grid">
            <div className="form-field full-width">
              <label>Medical Conditions</label>
              {isEditing ? (
                <input
                  type="text"
                  name="conditions"
                  value={(formData.conditions || []).join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      conditions: e.target.value
                        .split(",")
                        .map((c) => c.trim()),
                    })
                  }
                  placeholder="e.g., Type 2 Diabetes, PCOS"
                />
              ) : (
                <p>{patient.conditions?.join(", ") || "None listed"}</p>
              )}
            </div>

            <div className="form-field full-width">
              <label>Current Medications</label>
              {isEditing ? (
                <input
                  type="text"
                  name="medications"
                  value={formData.medications || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., Metformin 500mg"
                />
              ) : (
                <p>{patient.medications || "None listed"}</p>
              )}
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-btn"
            onClick={() => onNavigate("consultations")}
          >
            📋 My Consultations
          </button>
          <button className="nav-btn" onClick={() => onNavigate("weight")}>
            ⚖️ Log Weight
          </button>
          <button
            className="nav-btn"
            onClick={() => onNavigate("prescriptions")}
          >
            💊 Prescriptions & Orders
          </button>
        </div>
      </div>
    </div>
  );
};