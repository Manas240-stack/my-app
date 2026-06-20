import { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return (
      <>
        <LandingPage onGetStarted={() => setAuthenticated(true)} />
      </>
    );
  }

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
          <button className="active">Dashboard</button>
          <button>Doctors</button>
          <button>Consultations</button>
          <button>Prescriptions</button>
          <button>Weight Tracker</button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome back</h1>
          <button>Profile</button>
        </header>

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
      </main>
    </div>
  );
}
