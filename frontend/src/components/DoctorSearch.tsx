import { useState, useEffect } from 'react';
import './DoctorSearch.css';

export default function DoctorSearch({ onSelectDoctor }: { onSelectDoctor: (doctor: any) => void }) {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://my-app-production-ac5b.up.railway.app/api/v1/doctors');
        const data = await response.json();
        setDoctors(data.doctors || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctor-search-container">
      <h2>Find a Doctor</h2>
      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p>Rating: {doctor.rating} ⭐</p>
              <p>Fee: ₹{doctor.consult_fee}</p>
              <button onClick={() => onSelectDoctor(doctor)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
