import { useEffect, useState } from "react";
import "./DoctorDetails.css";

export default function DoctorDetails({
  doctor,
  onBooking,
}: any) {
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    fetch(
      `https://my-app-production-ac5b.up.railway.app/api/v1/doctors/${doctor.id}/slots`
    )
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []));
  }, [doctor]);

  return (
    <div className="doctor-details-page">
      <div className="profile-card">
        <h1>{doctor.name}</h1>
        <p>{doctor.specialty}</p>

        <div className="meta-grid">
          <div>{doctor.rating} ⭐</div>
          <div>{doctor.experience_years} yrs</div>
          <div>Video Consultation</div>
        </div>

        <p>{doctor.bio}</p>
      </div>

      <div className="slots-card">
        <h2>Select Consultation Slot</h2>

        <div className="slots-grid">
          {slots.map((slot: string) => (
            <button
              key={slot}
              className={selectedSlot === slot ? "slot active" : "slot"}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>

        {selectedSlot && (
          <button className="book-btn" onClick={onBooking}>
            Continue to Payment
          </button>
        )}
      </div>
    </div>
  );
}
