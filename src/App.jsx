import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";




import LoginPage from "./components/AuthComponents/loginComponent";

import RegisterPage from "./components/AuthComponents/signupComponent";

import BrowseDoctors from "./components/patientComponent/pages/BrowseDoctors";

import PatientLayout from "./components/patientComponent/patientLayout";

import MyAppointments from "./components/patientComponent/patientAppointments";
import DoctorLayout from "./components/DoctorComponent/DoctorLayout";
import DoctorAppointments from "./components/DoctorComponent/pages/DoctorAppointment";
import DoctorSchedule from "./components/DoctorComponent/pages/DoctorSchedule";
import AdminLayout from "./components/AdminComponent/AdminLayOut";
import ManageDoctors from "./components/AdminComponent/Admin/AdminDoctor";
import Patients from "./components/AdminComponent/Admin/AdminPatient";
import Appointments from "./components/AdminComponent/Admin/AdminAppointment";
import AdminOverview from "./components/AdminComponent/Admin/AdminStats";
import DoctorProfile from "./components/DoctorComponent/pages/DoctorProfile";
import HomePage from "./components/pages/HomePage";
import { ToastContainer,toast } from "react-toastify";

function App() {
  return (
    <>
    
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* Patient Layout */}
        <Route path="/patient" element={<PatientLayout />}>

         <Route
    index
    element={<BrowseDoctors />}
  />
          {/* Browse Doctors */}
          <Route path="browse" element={<BrowseDoctors />} />

          {/* My Appointments */}
          <Route path="appointments" element={<MyAppointments />} />
        </Route>

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="schedule" element={<DoctorSchedule />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="overview" element={<AdminOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
