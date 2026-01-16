import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';
import DoctorHeader from '../../Component/DoctorHeader';
import DoctorFooter from '../../Component/DoctorFooter';

const SettingsDoctor = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = async () => {
    // Basic validation
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('Password should be at least 6 characters long.');
      return;
    }

    const adminId = localStorage.getItem('userId'); // Retrieve adminId from local storage
    if (!adminId) {
      setErrorMessage('Admin ID not found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/change-password-doctor', {
        adminId,
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setSuccessMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
      } else {
        setErrorMessage('Incorrect current password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
               <DoctorHeader />
<section className="breadcrumb_part breadcrumb_bg">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breadcrumb_iner">
          <div className="breadcrumb_iner_item">
            <h2>Change Password</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
          }}
        >
          <Box sx={{ width: '100%', mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              Change Password
            </Typography>
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePasswordChange}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Container>
      <DoctorFooter/>
    </>
  );
};

export default SettingsDoctor;
