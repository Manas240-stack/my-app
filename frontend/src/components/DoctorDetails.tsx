import { useState, useEffect } from 'react';
import './DoctorDetails.css';

export default function DoctorDetails({ doctor, onBooking }: { doctor: any; onBooking: () => void }) {
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/v1/doctors/${doctor.id}/slots`);
        const data = await response.json();
        setSlots(data.slots || []);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
      setLoading(false);
    };

    fetchSlots();
  }, [doctor.id]);

  const handleBook = async () => {
    if (!selectedSlot) {
      alert('Please select a slot');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor_id: doctor.id,
          scheduled_at: new Date().toISOString(),
          mode: 'video',
        }),
      });

      if (response.ok) {
        onBooking();
      }
    } catch (error) {
      console.error('Error booking:', error);
    }
  };

  return (
    <div className="doctor-details-container">
      <div className="doctor-info">
        <h2>{doctor.name}</h2>
        <p>{doctor.specialty}</p>
        <p>Experience: {doctor.experience_years} years</p>
        <p>Rating: {doctor.rating} ⭐ ({doctor.total_reviews} reviews)</p>
        <p>Fee: ₹{doctor.consult_fee}</p>
        <p>Bio: {doctor.bio}</p>
      </div>

      <div className="booking-section">
        <h3>Select a Time Slot</h3>
        {loading ? (
          <p>Loading slots...</p>
        ) : (
          <>
            <div className="slots-grid">
              {slots.map((slot) => (
                <button
                  key={slot}
                  className={selectedSlot === slot ? 'slot active' : 'slot'}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>

            {selectedSlot && (
              <button className="book-btn" onClick={handleBook}>
                Book Consultation - ₹{doctor.consult_fee}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}