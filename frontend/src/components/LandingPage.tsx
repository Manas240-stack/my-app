import "./LandingPage.css";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({
  onGetStarted,
}: LandingPageProps) {
  return (
    <div className="landing-wrapper">
      <nav className="landing-nav">
        <div className="landing-logo">🌿 SlimRx</div>

        <button className="landing-login-btn" onClick={onGetStarted}>
          Login
        </button>
      </nav>

      <section className="hero-section">
        <div className="hero-left">
          <span className="hero-badge">Doctor Guided Weight Loss</span>

          <h1>
            Your <span>GLP-1</span> Health Journey Starts Here
          </h1>

          <p>
            Connect with certified doctors, manage prescriptions, track weight
            progress, and transform your health with expert care.
          </p>

          <button className="hero-btn" onClick={onGetStarted}>
            Get Started
          </button>
        </div>

        <div className="hero-right">
          <div className="glass-card">👨‍⚕️ 50+ Doctors</div>
          <div className="glass-card">💊 Digital Prescriptions</div>
          <div className="glass-card">⚖️ Weight Analytics</div>
        </div>
      </section>
    </div>
  );
}
