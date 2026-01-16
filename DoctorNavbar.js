import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const DoctorNavbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px', 
      padding: '20px', 
      background: '#f0f0f0', 
      height: '100vh', 
      width: '250px', 
      position: 'fixed',
      overflowY: 'auto' 
    }}>
      <Link to="/DoctorDash" style={linkStyle}>Dashboard</Link>
        <Link to="/doctor/add-patient-symptoms" style={linkStyle}>Add Patient Symptoms</Link>
        <Link to="/doctor/add-ecg" style={linkStyle}>Add ECG</Link>
        <Link to="/doctor/add-tmt" style={linkStyle}>Add TMT</Link>
        <Link to="/doctor/add-echo" style={linkStyle}>Add ECHO</Link>
        <Link to="/doctor/settings" style={linkStyle}>Settings</Link>
      <LogoutButton />
    </nav>
  );
};

const linkStyle = {
  color: '#333',
  textDecoration: 'none',
  fontSize: '18px',
  padding: '10px 0',
  borderBottom: '1px solid #ddd'
};

export default DoctorNavbar;
