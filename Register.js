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
  MenuItem,
} from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [injuries, setInjuries] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        name,
        email,
        gender,
        dob,
        age,
        address,
        injuries,
        contact,
      });
      navigate('/');
      alert('Registration successful');
    } catch (error) {
      alert(`Registration failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <Container maxWidth="xl" style={{ backgroundColor: '#f5f5f5', padding: '2rem' }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <img src="/img/icon/feature_2.svg" alt="Register" style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <Typography variant="body1" gutterBottom>
              Create your account to get started.
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
                label="Name"
                variant="outlined"
                margin="normal"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Gender"
                select
                variant="outlined"
                margin="normal"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDob(e.target.value)}
              />
              <TextField
                fullWidth
                label="Age"
                type="number"
                variant="outlined"
                margin="normal"
                onChange={(e) => setAge(e.target.value)}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                fullWidth
                label="Injuries"
                variant="outlined"
                margin="normal"
                onChange={(e) => setInjuries(e.target.value)}
              />
              <TextField
                fullWidth
                label="Contact"
                variant="outlined"
                margin="normal"
                onChange={(e) => setContact(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
                onClick={handleRegister}
              >
                Register
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  Already registered?{' '}
                  <Link href="/" underline="hover">
                    Login here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
