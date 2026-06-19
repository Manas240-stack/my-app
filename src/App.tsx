import { BrowserRouter, Routes, Route } from "react-router-dom";

import Glp1Telehealth from "./landing/Glp1Telehealth";
import Auth from "./pages/auth/Auth";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Glp1Telehealth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;