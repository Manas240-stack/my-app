import { useState, useEffect } from "react";
import { doctorAPI, consultationAPI } from "../api";
import { Payment } from "./Payment";
import "./DoctorDetails.css";

interface DoctorDetailsProps {
  doctorId: string;
  onBack: () => void;
  onBooked: () => void;
}

export const DoctorDetails = ({
  doctorId,
  onBack,
  onBooked,
}: DoctorDetailsProps) => {
  const [doctor, setDoctor] = useState<any>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const result = await doctorAPI.getDoctorDetails(doctorId);
        setDoctor(result.doctor);

        const slotsResult = await doctorAPI.getDoctorSlots(doctorId);
        setSlots(slotsResult.slots);
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
      setLoading(false);
    };
    fetchDoctorDetails();
  }, [doctorId]);

  const handleBookConsultation = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date and time slot");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    setBooking(true);
    try {
      const dateTime = `${selectedDate}T${selectedSlot}`;
      const token = localStorage.getItem("access_token");

      const result = await consultationAPI.bookConsultation(
        token || "",
        doctorId,
        dateTime,
        "video"
      );

      if (result.consultation) {
        alert("Consultation booked successfully!");
        setShowPayment(false);
        onBooked();
      }
    } catch (error) {
      console.error("Failed to book consultation", error);
      alert("Failed to book consultation");
    }
    setBooking(false);
  };

  if (loading) return <div>Loading doctor details...</div>;
  if (!doctor) return <div>Doctor not found</div>;

  return (
    <div className="doctor-details-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="doctor-details-content">
        <div className="doctor-header">
          <h2>{doctor.name}</h2>
          <p className="specialty">{doctor.specialty}</p>
        </div>

        <div className="doctor-info">
          <div className="info-item">
            <label>Experience</label>
            <p>{doctor.experience_years} years</p>
          </div>
          <div className="info-item">
            <label>Rating</label>
            <p>⭐ {doctor.rating} ({doctor.total_reviews} reviews)</p>
          </div>
          <div className="info-item">
            <label>Patients</label>
            <p>{doctor.total_patients}+</p>
          </div>
          <div className="info-item">
            <label>Fee</label>
            <p className="fee">₹{doctor.consult_fee}</p>
          </div>
        </div>

        <div className="doctor-bio">
          <h3>About</h3>
          <p>{doctor.bio}</p>
        </div>

        <div className="doctor-languages">
          <h3>Languages</h3>
          <div className="tags">
            {doctor.languages?.map((lang: string) => (
              <span key={lang} className="tag">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="booking-form">
          <h3>Book Consultation</h3>

          <div className="form-group">
            <label>Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="form-group">
            <label>Select Time Slot</label>
            <div className="slots">
              {slots.map((slot) => (
                <button
                  key={slot}
                  className={`slot ${selectedSlot === slot ? "selected" : ""}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="booking-summary">
            <p>Consultation Fee: <strong>₹{doctor.consult_fee}</strong></p>
            <p>Mode: <strong>Video Call</strong></p>
            <p>Duration: <strong>30 minutes</strong></p>
          </div>

          <button
            className="book-btn"
            onClick={handleBookConsultation}
            disabled={booking || !selectedDate || !selectedSlot}
          >
            {booking ? "Booking..." : "Proceed to Payment"}
          </button>
        </div>
      </div>

      {showPayment && (
        <Payment
          consultationFee={doctor.consult_fee}
          doctorName={doctor.name}
          consultationDate={`${selectedDate}T${selectedSlot}`}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};