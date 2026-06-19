import { useState } from 'react';
import './App.css';
import login from './components/login';
import DoctorSearch from './components/DoctorSearch';
import DoctorDetails from './components/DoctorDetails';
import Payment from './components/Payment';
import PatientProfile from './components/PatientProfile';
import ConsultationHistory from './components/ConsultationHistory';
import PrescriptionsOrders from './components/PrescriptionsOrders';
import WeightLogging from './components/WeightLogging';

const Login = login;

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">SlimRx</div>
        <div className="navbar-menu">
          <button onClick={() => setCurrentPage('home')}>Doctor Search</button>
          <button onClick={() => setCurrentPage('profile')}>My Profile</button>
          <button onClick={() => setCurrentPage('consultationHistory')}>Consultations</button>
          <button onClick={() => setCurrentPage('prescriptions')}>Prescriptions</button>
          <button onClick={() => setCurrentPage('weight')}>Weight Log</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'home' && <DoctorSearch />}
        {currentPage === 'profile' && <PatientProfile />}
        {currentPage === 'consultationHistory' && <ConsultationHistory />}
        {currentPage === 'prescriptions' && <PrescriptionsOrders />}
        {currentPage === 'weight' && <WeightLogging />}
      </main>
    </div>
  );
}