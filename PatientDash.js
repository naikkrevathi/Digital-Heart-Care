import React from 'react';
import AdminNavbar from '../../Component/AdminNavbar';
import PatientNavbar from '../../Component/PatientNavbar';

const PatientDash = () => {
  return (
    <div style={{ display: 'flex' }}>
      <PatientNavbar />
      <div style={{ marginLeft: '280px', padding: '20px', width: '100%' }}>
        <h1>Welcome to Patient Dashboard</h1>
        <p>Access administrative controls here.</p>
      </div>
    </div>
  );
};

export default PatientDash;
