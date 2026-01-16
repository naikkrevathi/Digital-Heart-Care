import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const PatientNavbar = () => {
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
      <Link to="/PatientDash" style={linkStyle}>Dashboard</Link>
        <Link to="/patient/view-echo" style={linkStyle}>View ECHO</Link>

        <Link to="/patient/view-ecg" style={linkStyle}>View ECG</Link>
        <Link to="/patient/view-tmt" style={linkStyle}>View TMT</Link>  
        <Link to="/patient/profile" style={linkStyle}>Profile</Link>
      <Link to="/patient/settings" style={linkStyle}>Settings</Link>
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

export default PatientNavbar;
