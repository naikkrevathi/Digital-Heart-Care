import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';

import AdminDash from './pages/admin/AdminDash';
import Settings from './pages/admin/Settings';
import ProtectedRoute from './Component/ProtectedRoute';

import ManageUsers from './pages/admin/ManageUser';
import ManagePatients from './pages/admin/ManagePatient';
import ManageDoctors from './pages/admin/ManageDoctor';
import ECGReport from './pages/admin/ECGReport';
import ECGReportDetails from './pages/admin/ECGReportDetails';
import ECHOReport from './pages/admin/ECHOReport';
import ECHOReportDetails from './pages/admin/ECHOReportDetails';
import TMTReport from './pages/admin/TMTReport';
import TMTReportDetails from './pages/admin/TMTReportDetails';

import DoctorDash from './pages/doctor/DoctorDash';
import DoctorHome from './pages/doctor/DoctorHome';
import DoctorAbout from './pages/doctor/DoctorAbout';
import AddPatientSymptoms from './pages/doctor/AddPatientSymptoms';
import AddECG from './pages/doctor/AddECG';
import AddTMT from './pages/doctor/AddTMT';
import AddECHO from './pages/doctor/AddECHO';
import SettingsDoctor from './pages/doctor/SettingsDoctor';

import PatientDash from './pages/patient/PatientDash';
import Profile from './pages/patient/Profile';
import ViewECG from './pages/patient/ViewECG';
import ViewECHO from './pages/patient/ViewECHO';
import ViewTMT from './pages/patient/ViewTMT';
import SettingsPatient from './pages/patient/SettingsPatient';
import Home from './pages/patient/Home';
import About from './pages/patient/About';
import AdminHome from './pages/admin/AdminHome';

function App() {
    const userRole = 'admin';
    const isAuthenticated = true; 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Forgot-Password" element={<ForgotPassword />} />

                <Route path="/admin/manage-user" element={<ManageUsers />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/manage-patient" element={<ManagePatients />} />
                <Route path="/admin/manage-doctor" element={<ManageDoctors />} />
                <Route path="/admin/ecg-report" element={<ECGReport />} />
                <Route path="/admin/ecg-report-details/:id" element={<ECGReportDetails />} />
                <Route path="/admin/echo-report" element={<ECHOReport />} />
                <Route path="/admin/echo-report-details/:id" element={<ECHOReportDetails />} />
                <Route path="/admin/tmt-report" element={<TMTReport />} />
                <Route path="/admin/tmt-report-details/:id" element={<TMTReportDetails />} />

                <Route path='/DoctorDash' element={<DoctorDash />} />
                <Route path='/doctor/home' element={<DoctorHome />} />
                <Route path='/doctor/about' element={<DoctorAbout />} />
                <Route path='/doctor/add-patient-symptoms' element={<AddPatientSymptoms />} />
                <Route path='/doctor/add-ecg' element={<AddECG />} />
                <Route path='/doctor/add-tmt' element={<AddTMT />} />
                <Route path='/doctor/add-echo' element={<AddECHO />} />
                <Route path='/doctor/settings' element={<SettingsDoctor />} />

                <Route path="/PatientDash" element={<PatientDash />} />
                <Route path="/patient/home" element={<Home />} />
                <Route path="/patient/about" element={<About />} />
                <Route path="/patient/profile" element={<Profile />} />
                <Route path="/patient/view-ecg" element={<ViewECG />} />
                <Route path="/patient/view-echo" element={<ViewECHO />} />
                <Route path="/patient/view-tmt" element={<ViewTMT />} />
                <Route path="/patient/settings" element={<SettingsPatient />} />

                {/* Protected Routes */}
              
                <Route
                    path="/AdminDash"
                    element={
                        <ProtectedRoute allowedRoles={['admin']} userRole={userRole} isAuthenticated={isAuthenticated}>
                            <AdminDash />
                        </ProtectedRoute>
                    }
                />
    
                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute allowedRoles={['admin']} userRole={userRole} isAuthenticated={isAuthenticated}>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
