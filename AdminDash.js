import React from 'react';
import AdminNavbar from '../../Component/AdminNavbar';

const AdminDash = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminNavbar />
      <div style={{ marginLeft: '280px', padding: '20px', width: '100%' }}>
        <h1>Welcome to Admin Dashboard</h1>
        <p>Access administrative controls here.</p>
      </div>
    </div>
  );
};

export default AdminDash;
