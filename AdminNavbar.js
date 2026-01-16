import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const AdminNavbar = () => {
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
      <Link to="/AdminDash" style={linkStyle}>Dashboard</Link>
      <Link to="/admin/manage-patient" style={linkStyle}>Manage Patients</Link>
      <Link to="/admin/manage-doctor" style={linkStyle}>Manage Doctors</Link>
      <Link to="/admin/ecg-report" style={linkStyle}>ECG Report</Link>
      <Link to="/admin/echo-report" style={linkStyle}>ECHO Report</Link>
      <Link to="/admin/tmt-report" style={linkStyle}>TMT Report</Link>
      <Link to="/admin/settings" style={linkStyle}>Settings</Link>
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

export default AdminNavbar;
