import { useState } from "react";
import "./App.css";

import LandingPage from "./components/LandingPage";
import DoctorSearch from "./components/DoctorSearch";
import Payment from "./components/Payment";
import PatientProfile from "./components/PatientProfile";
import WeightLogging from "./components/WeightLogging";
import ConsultationHistory from "./components/ConsultationHistory";
import MedicineTracker from "./components/MedicineTracker";

type Page =
  | "landing"
  | "dashboard"
  | "doctors"
  | "payment"
  | "profile"
  | "weight"
  | "consultations"
  | "orders";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("landing");

  if (!authenticated) {
    return (
      <LandingPage
        onGetStarted={() => {
          setAuthenticated(true);
          setPage("dashboard");
        }}
      />
    );
  }

  const renderPage = () => {
    switch (page) {
      case "doctors":
        return (
          <DoctorSearch
            onSelectDoctor={() => setPage("payment")}
          />
        );

      case "payment":
        return (
          <Payment
            onSuccess={() => setPage("profile")}
          />
        );

      case "profile":
        return <PatientProfile />;

      case "weight":
        return <WeightLogging />;

      case "consultations":
        return <ConsultationHistory />;

      case "orders":
        return <MedicineTracker />;

      default:
        return (
          <section className="metric-grid">
            <div className="metric-card">
              <h3>Current Weight</h3>
              <p>96 kg</p>
            </div>

            <div className="metric-card">
              <h3>Goal Weight</h3>
              <p>78 kg</p>
            </div>

            <div className="metric-card">
              <h3>BMI</h3>
              <p>31.4</p>
            </div>

            <div className="metric-card">
              <h3>Adherence</h3>
              <p>92%</p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="dashboard-shell">
      <aside className="premium-sidebar">
        <div className="brand">
          <div className="brand-logo">✚</div>
          <div>
            <h3>MedVeda</h3>
            <p>Healthcare Platform</p>
          </div>
        </div>

        <nav>
          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setPage("doctors")}>
            Doctors
          </button>

          <button onClick={() => setPage("consultations")}>
            Consultations
          </button>

          <button onClick={() => setPage("orders")}>
            Orders
          </button>

          <button onClick={() => setPage("weight")}>
            Weight Tracker
          </button>

          <button onClick={() => setPage("profile")}>
            Profile
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome back</h1>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}
