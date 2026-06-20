import { useState } from "react";
import "./App.css";

import Login from "./components/Login";
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
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  function handleLogin() {
    setIsLoggedIn(true);
    setCurrentPage("home");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setSelectedDoctor(null);
    setCurrentPage("login");
  }

  if (currentPage === "landing") {
    return (
      <LandingPage
        onGetStarted={() => setCurrentPage("login")}
      />
    );
  }

  if (!isLoggedIn) {
    return <Login onSuccess={handleLogin} />;
  }

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <header className="top-nav">
        <div className="nav-left">
          <div className="logo-box">🌿</div>

          <div>
            <div className="brand-name">SlimRx</div>
            <div className="role-badge">PATIENT</div>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <button
            className={currentPage === "home" ? "nav-item active" : "nav-item"}
            onClick={() => setCurrentPage("home")}
          >
            📊 Dashboard
          </button>

          <button
            className={
              currentPage === "profile" ? "nav-item active" : "nav-item"
            }
            onClick={() => setCurrentPage("profile")}
          >
            👤 Profile
          </button>

          <button
            className={
              currentPage === "consultationHistory"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setCurrentPage("consultationHistory")}
          >
            📋 Consultations
          </button>

          <button
            className={
              currentPage === "prescriptions"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setCurrentPage("prescriptions")}
          >
            💊 Prescriptions
          </button>

          <button
            className={
              currentPage === "weight" ? "nav-item active" : "nav-item"
            }
            onClick={() => setCurrentPage("weight")}
          >
            ⚖️ Weight Tracker
          </button>
        </aside>

        {/* Main Content */}
        <main className="content">
          <section className="page-header">
            <h1>SlimRx Dashboard</h1>
            <p>Manage your GLP-1 treatment journey</p>
          </section>

          <section className="page-body">
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
          </section>
        </main>
      </div>
    </div>
  );
}
