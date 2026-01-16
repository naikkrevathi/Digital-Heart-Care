import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';
import DoctorNavbar from '../../Component/DoctorNavbar';
import DoctorFooter from '../../Component/DoctorFooter';
import DoctorHeader from '../../Component/DoctorHeader';

const AddPatientSymptoms = () => {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [formData, setFormData] = useState({
        user: '',
        symptom: '',
    });
    const [patientSymptoms, setPatientSymptoms] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchSymptoms();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/patients');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchSymptoms = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/symptoms');
            setSymptoms(response.data);
        } catch (error) {
            console.error('Error fetching symptoms:', error);
        }
    };

    const fetchPatientSymptoms = async (user) => {
        try {
            const response = await axios.post('http://localhost:5000/api/patient-symptoms/view', { user });
            setPatientSymptoms(response.data);
        } catch (error) {
            console.error('Error fetching patient symptoms:', error);
        }
    };

    const handleOpen = () => {
        setFormData({ user: '', symptom: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                user: formData.user,
                symptom: formData.symptom,
            };

            await axios.post('http://localhost:5000/api/patient-symptoms/add', payload);
            alert('Symptom added successfully!');
            fetchPatientSymptoms(formData.user); // Refresh the list
            handleClose();
        } catch (error) {
            console.error('Error adding symptom:', error);
            alert('Unable to insert your data, kindly try again later.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/patient-symptoms/${id}`);
            alert('Symptom deleted successfully!');
            fetchPatientSymptoms(formData.user); // Refresh the list
        } catch (error) {
            console.error('Error deleting symptom:', error);
            alert('Unable to delete the symptom, kindly try again later.');
        }
    };

    const handleUserChange = (e) => {
        const user = e.target.value;
        setFormData((prev) => ({ ...prev, user }));
        fetchPatientSymptoms(user);
    };

    return (
        <div>
                     <DoctorHeader />
<section className="breadcrumb_part breadcrumb_bg">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breadcrumb_iner">
          <div className="breadcrumb_iner_item">
            <h2>Add Patient Symptoms</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            <div style={{ padding: '20px',alignItems: 'center', justifyContent: 'center' }}>
                <h2>Add Patient Symptoms</h2>
                <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '10px' }}>
                    Add Symptom
                </Button>
                <h2>View Symptoms-Patients</h2>
                <TextField
                    select
                    margin="dense"
                    label="Select User"
                    name="user"
                    value={formData.user}
                    onChange={handleUserChange}
                    fullWidth
                    required
                    style={{ marginBottom: '20px' }}
                >
                    <MenuItem value="">
                        <em>Select User</em>
                    </MenuItem>
                    {users.map((user) => (
                        <MenuItem key={user.UHID} value={user.UHID}>
                            {user.UHID} ({user.full_name})
                        </MenuItem>
                    ))}
                </TextField>
               

                {/* Patient Symptoms List */}
                <List>
                    {patientSymptoms.map((symptom) => (
                        <ListItem key={symptom.id} secondaryAction={
                            <IconButton edge="end" onClick={() => handleDelete(symptom.id)}>
                                <Delete />
                            </IconButton>
                        }>
                            <ListItemText primary={symptom.symptoms} />
                        </ListItem>
                    ))}
                </List>

                {/* Add Symptom Dialog */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Patient Symptom</DialogTitle>
                    <DialogContent>
                        <TextField
                            select
                            margin="dense"
                            label="Select Symptom"
                            name="symptom"
                            value={formData.symptom}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="">
                                <em>Select Symptom</em>
                            </MenuItem>
                            {symptoms.map((symptom) => (
                                <MenuItem key={symptom.id} value={symptom.id}>
                                    {symptom.symptoms}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <DoctorFooter />
        </div>
    );
};

export default AddPatientSymptoms;
