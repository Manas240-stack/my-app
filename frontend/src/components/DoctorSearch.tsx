import { useState, useEffect } from "react";
import { doctorAPI } from "../api";
import "./DoctorSearch.css";

interface DoctorSearchProps {
  onDoctorSelect: (doctorId: string) => void;
}

export const DoctorSearch = ({ onDoctorSelect }: DoctorSearchProps) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await doctorAPI.searchDoctors();
        setDoctors(result.doctors);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
      setLoading(false);
    };
    fetchDoctors();
  }, []);

  if (loading) return <div>Loading doctors...</div>;

  return (
    <div className="doctor-container">
      <h2>Find Doctors</h2>
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p className="specialty">{doctor.specialty}</p>
            <p>Experience: {doctor.experience_years} years</p>
            <p className="rating">⭐ {doctor.rating} ({doctor.total_reviews} reviews)</p>
            <p className="fee">₹{doctor.consult_fee} per consultation</p>
            <button onClick={() => onDoctorSelect(doctor.id)}>
              View Details & Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};