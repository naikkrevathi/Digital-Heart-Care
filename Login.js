import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
} from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const type = response.data.type;
      const id = response.data.id;
      localStorage.setItem('username', username);
      localStorage.setItem('userId', id);
      localStorage.setItem('userType', type);
      
      // Redirect based on type
      if (type === 'Admin') {
        navigate('/admin/home');
      } else if (type === 'Doctor') {
        navigate('/doctor/home');
      } else if (type === 'Patient') {
        navigate('/patient/home');
      } else {
        alert('type not recognized');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xl" style={{ backgroundColor: '#f5f5f5', padding: '2rem' }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <img src="/img/icon/feature_2.svg" alt="Heart Health" style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Typography variant="body1" gutterBottom>
              Welcome back! Please enter your details to access your account.
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link href="/register" underline="hover">
                    Register here
                  </Link>
                </Typography>
                {/* <Typography variant="body2" sx={{ mt: 1 }}>
                  <Link href="/forgot-password" underline="hover">
                    Forgot Password?
                  </Link>
                </Typography> */}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;