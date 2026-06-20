interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({
  onGetStarted,
}: LandingPageProps) {
  return (
    <div className="hero-wrapper">
      <nav className="hero-nav">
        <h2>MedVeda</h2>
        <button onClick={onGetStarted}>Get Started</button>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <span className="badge">Doctor Guided Weight Loss</span>

          <h1>
            Lose Weight with
            <span> GLP-1 Treatment</span>
          </h1>

          <p>
            India's premium digital metabolic health platform for weight loss,
            medicine delivery, video consultations and health tracking.
          </p>

          <button onClick={onGetStarted}>
            Start Assessment
          </button>
        </div>

        <div className="hero-right">
          <div>10,000+ Patients</div>
          <div>250+ Doctors</div>
          <div>4.9 Rating</div>
        </div>
      </section>
    </div>
  );
}
