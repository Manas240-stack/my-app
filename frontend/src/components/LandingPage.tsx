import "./LandingPage.css";

export default function LandingPage({
  onGetStarted,
}: {
  onGetStarted: () => void;
}) {
  return (
    <div className="landing">
      <nav className="navbar-landing">
        <div className="logo">SlimRx</div>
        <button className="nav-btn" onClick={onGetStarted}>
          Login
        </button>
      </nav>

      <section className="hero-section">
        <div className="hero-left">
          <h1>
            Doctor Guided <span>GLP-1</span> Weight Loss
          </h1>

          <p>
            Consult verified doctors, manage prescriptions, track weight
            progress and transform your health journey online.
          </p>

          <button className="hero-btn" onClick={onGetStarted}>
            Get Started
          </button>
        </div>

        <div className="hero-right">
          <div className="floating-card">👨‍⚕️ 50+ Doctors</div>
          <div className="floating-card">📊 Weight Tracking</div>
          <div className="floating-card">💊 GLP-1 Care</div>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">Online Consultation</div>
        <div className="feature-card">Digital Prescriptions</div>
        <div className="feature-card">Weight Analytics</div>
        <div className="feature-card">Secure Payments</div>
      </section>
    </div>
  );
}
