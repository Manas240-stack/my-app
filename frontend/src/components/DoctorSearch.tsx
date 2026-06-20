import { useEffect, useState } from "react";
import "./DoctorSearch.css";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  consult_fee: number;
  experience_years: number;
}

export default function DoctorSearch({
  onSelectDoctor,
}: {
  onSelectDoctor: (doctor: Doctor) => void;
}) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch("https://my-app-production-ac5b.up.railway.app/api/v1/doctors")
      .then((r) => r.json())
      .then((data) => setDoctors(data.doctors || []));
  }, []);

  return (
    <div className="doctor-page">
      <div className="doctor-header">
        <h1>Choose Your Specialist</h1>
        <p>Board-certified obesity & metabolic specialists</p>
      </div>

      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <div className="premium-doctor-card" key={doctor.id}>
            <div className="doctor-top">
              <div className="avatar">👨‍⚕️</div>
              <div>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </div>
            </div>

            <div className="doctor-stats">
              <div>{doctor.rating} ⭐</div>
              <div>{doctor.experience_years} yrs</div>
            </div>

            <div className="doctor-fee">
              ₹{doctor.consult_fee}
            </div>

            <button onClick={() => onSelectDoctor(doctor)}>
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
