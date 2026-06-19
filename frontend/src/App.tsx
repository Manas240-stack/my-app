import { useState } from "react";
import { Login } from "./components/Login";
import { DoctorSearch } from "./components/DoctorSearch";
import { DoctorDetails } from "./components/DoctorDetails";
import { PatientProfile } from "./components/PatientProfile";
import { ConsultationHistory } from "./components/ConsultationHistory";
import { WeightLogging } from "./components/WeightLogging";
import { PrescriptionsOrders } from "./components/PrescriptionsOrders";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("doctors");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  if (!isLoggedIn) {
    return <Login onSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="App">
      <div className="navbar">
        <h1 className="logo">SlimRx</h1>
        <div className="nav-links">
          <button
            className={currentPage === "doctors" ? "active" : ""}
            onClick={() => {
              setCurrentPage("doctors");
              setSelectedDoctorId(null);
            }}
          >
            🏥 Doctors
          </button>
          <button
            className={currentPage === "profile" ? "active" : ""}
            onClick={() => setCurrentPage("profile")}
          >
            👤 Profile
          </button>
          <button
            className={currentPage === "consultations" ? "active" : ""}
            onClick={() => setCurrentPage("consultations")}
          >
            📋 Consultations
          </button>
          <button
            className={currentPage === "weight" ? "active" : ""}
            onClick={() => setCurrentPage("weight")}
          >
            ⚖️ Weight
          </button>
          <button
            className={currentPage === "prescriptions" ? "active" : ""}
            onClick={() => setCurrentPage("prescriptions")}
          >
            💊 Prescriptions
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              setIsLoggedIn(false);
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="page-content">
        {selectedDoctorId ? (
          <DoctorDetails
            doctorId={selectedDoctorId}
            onBack={() => setSelectedDoctorId(null)}
            onBooked={() => {
              alert("Consultation booked! Check your consultations");
              setCurrentPage("consultations");
              setSelectedDoctorId(null);
            }}
          />
        ) : currentPage === "doctors" ? (
          <DoctorSearch onDoctorSelect={(id) => setSelectedDoctorId(id)} />
        ) : currentPage === "profile" ? (
          <PatientProfile onNavigate={(page) => setCurrentPage(page)} />
        ) : currentPage === "consultations" ? (
          <ConsultationHistory onBack={() => setCurrentPage("doctors")} />
        ) : currentPage === "weight" ? (
          <WeightLogging onBack={() => setCurrentPage("doctors")} />
        ) : currentPage === "prescriptions" ? (
          <PrescriptionsOrders onBack={() => setCurrentPage("doctors")} />
        ) : null}
      </div>
    </div>
  );
}

export default App;