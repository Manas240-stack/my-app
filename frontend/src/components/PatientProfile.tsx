import { useState, useEffect } from 'react';
import './PatientProfile.css';

export default function PatientProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://my-app-production-ac5b.up.railway.app/api/v1/patients/profile');
      const data = await response.json();
      setProfile(data.patient);
      setFormData(data.patient);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://my-app-production-ac5b.up.railway.app/api/v1/patients/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.patient);
        setEditing(false);
        alert('Profile updated!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setLoading(false);
  };

  if (loading && !profile) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {profile && !editing && (
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Current Weight:</strong> {profile.current_weight} kg</p>
          <p><strong>Goal Weight:</strong> {profile.goal_weight} kg</p>
          <p><strong>Height:</strong> {profile.height_cm} cm</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>Conditions:</strong> {profile.conditions?.join(', ')}</p>
          <p><strong>Medications:</strong> {profile.medications}</p>

          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}

      {editing && (
        <div className="profile-form">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Current Weight"
            value={formData.current_weight}
            onChange={(e) => setFormData({ ...formData, current_weight: parseFloat(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Goal Weight"
            value={formData.goal_weight}
            onChange={(e) => setFormData({ ...formData, goal_weight: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />

          <button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
