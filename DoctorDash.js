import React from 'react';
import DoctorNavbar from '../../Component/DoctorNavbar';

const DoctorDash = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DoctorNavbar />
      <div style={{ marginLeft: '280px', padding: '20px', width: '100%' }}>
        <h1>Welcome to Doctor Dashboard</h1>
        <p>Access administrative controls here.</p>
      </div>
    </div>
  );
};

export default DoctorDash;
