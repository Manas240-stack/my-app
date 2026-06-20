import { useState, useEffect } from "react";
import "./DoctorSearch.css";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  consult_fee: number;
  experience_years: number;
}

interface Props {
  onSelectDoctor: (doctor: Doctor) => void;
}

export default function DoctorSearch({ onSelectDoctor }: Props) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://my-app-production-ac5b.up.railway.app/api/v1/doctors"
        );
        const data = await response.json();
        setDoctors(data.doctors || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctor-search-page">
      <h1>Find Your Doctor</h1>
      <p>Choose from certified GLP-1 specialists</p>

      {loading ? (
        <div className="loading-box">Loading doctors...</div>
      ) : (
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-avatar">👨‍⚕️</div>

              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>

              <div className="doctor-meta">
                <span>{doctor.rating} ⭐</span>
                <span>{doctor.experience_years} yrs</span>
              </div>

              <div className="doctor-price">₹{doctor.consult_fee}</div>

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
