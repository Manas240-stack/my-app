import { useState } from "react";
import "./App.css";

import LandingPage from "./components/LandingPage";
import DoctorSearch from "./components/DoctorSearch";
import DoctorDetails from "./components/DoctorDetails";
import Payment from "./components/Payment";
import PatientProfile from "./components/PatientProfile";
import ConsultationHistory from "./components/ConsultationHistory";
import PrescriptionsOrders from "./components/PrescriptionsOrders";
import WeightLogging from "./components/WeightLogging";

type Page =
  | "landing"
  | "login"
  | "home"
  | "doctorDetails"
  | "payment"
  | "profile"
  | "consultationHistory"
  | "prescriptions"
  | "weight";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience_years: number;
  rating: number;
  total_reviews: number;
  consult_fee: number;
  bio: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setSelectedDoctor(null);
  };

  if (!isLoggedIn) {
    return <Login onSuccess={handleLogin} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">SlimRx</div>

        <div className="navbar-menu">
          <button onClick={() => setCurrentPage("home")}>
            Doctor Search
          </button>

          <button onClick={() => setCurrentPage("profile")}>
            My Profile
          </button>

          <button onClick={() => setCurrentPage("consultationHistory")}>
            Consultations
          </button>

          <button onClick={() => setCurrentPage("prescriptions")}>
            Prescriptions
          </button>

          <button onClick={() => setCurrentPage("weight")}>
            Weight Log
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === "home" && (
          <DoctorSearch
            onSelectDoctor={(doctor) => {
              setSelectedDoctor(doctor);
              setCurrentPage("doctorDetails");
            }}
          />
        )}

        {currentPage === "doctorDetails" && selectedDoctor && (
          <DoctorDetails
            doctor={selectedDoctor}
            onBooking={() => setCurrentPage("payment")}
          />
        )}

        {currentPage === "payment" && (
          <Payment onSuccess={() => setCurrentPage("home")} />
        )}

        {currentPage === "profile" && <PatientProfile />}

        {currentPage === "consultationHistory" && (
          <ConsultationHistory />
        )}

        {currentPage === "prescriptions" && (
          <PrescriptionsOrders />
        )}

        {currentPage === "weight" && (
          <WeightLogging />
        )}
      </main>
    </div>
  );
}
