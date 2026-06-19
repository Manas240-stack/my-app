import { useState } from 'react';
import './App.css';

// Import components - CORRECT CASE
import Login from './components/login';
import DoctorSearch from './components/DoctorSearch';
import DoctorDetails from './components/DoctorDetails';
import Payment from './components/Payment';
import PatientProfile from './components/PatientProfile';
import ConsultationHistory from './components/ConsultationHistory';
import PrescriptionsOrders from './components/PrescriptionsOrders';
import WeightLogging from './components/WeightLogging';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
    setSelectedDoctor(null);
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setCurrentPage('doctorDetails');
  };

  const handleBooking = () => {
    setShowPayment(true);
    setCurrentPage('payment');
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setCurrentPage('consultationHistory');
  };

  // Not logged in - show login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Logged in - show navbar and pages
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">SlimRx</div>
        <div className="navbar-menu">
          <button 
            className={currentPage === 'home' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('home')}
          >
            Doctor Search
          </button>
          <button 
            className={currentPage === 'profile' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('profile')}
          >
            My Profile
          </button>
          <button 
            className={currentPage === 'consultationHistory' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('consultationHistory')}
          >
            Consultations
          </button>
          <button 
            className={currentPage === 'prescriptions' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('prescriptions')}
          >
            Prescriptions
          </button>
          <button 
            className={currentPage === 'weight' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('weight')}
          >
            Weight Log
          </button>
          <button className="nav-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="main-content">
        {currentPage === 'home' && (
          <DoctorSearch onSelectDoctor={handleDoctorSelect} />
        )}

        {currentPage === 'doctorDetails' && selectedDoctor && (
          <DoctorDetails doctor={selectedDoctor} onBooking={handleBooking} />
        )}

        {currentPage === 'payment' && showPayment && (
          <Payment onSuccess={handlePaymentSuccess} />
        )}

        {currentPage === 'profile' && (
          <PatientProfile />
        )}

        {currentPage === 'consultationHistory' && (
          <ConsultationHistory />
        )}

        {currentPage === 'prescriptions' && (
          <PrescriptionsOrders />
        )}

        {currentPage === 'weight' && (
          <WeightLogging />
        )}
      </main>
    </div>
  );
}