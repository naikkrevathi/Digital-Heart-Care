import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';
import AdminHeader from '../../Component/AdminHeader';
import AdminFooter from '../../Component/AdminFooter';

const ManagePatients = () => {
    const [patients, setPatients] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        age: '',
        address: '',
        injuries: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editUsername, setEditUsername] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/patients');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleOpen = () => {
        setIsEditing(false);
        setFormData({
            username: '',
            full_name: '',
            email: '',
            phone: '',
            gender: '',
            dob: '',
            age: '',
            address: '',
            injuries: '',
        });
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
                username: formData.username,
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone,
                gender: formData.gender,
                dob: formData.dob,
                age: formData.age,
                address: formData.address,
                injuries: formData.injuries
            };
    
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/patients/${editUsername}`, payload);
            } else {
                await axios.post('http://localhost:5000/api/patients/add', payload);
            }
            fetchPatients();
            handleClose();
        } catch (error) {
            console.error('Error saving patient:', error);
            alert('Error saving patient: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (username) => {
        const patient = patients.find((patient) => patient.username === username);
        setFormData({
            username: patient.username,
            full_name: patient.full_name,
            email: patient.email,
            phone: patient.phone,
            gender: patient.gender,
            dob: patient.dob,
            age: patient.age,
            address: patient.address,
            injuries: patient.injuries,
        });
        setEditUsername(username);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (username) => {
        try {
            await axios.delete(`http://localhost:5000/api/patients/${username}`);
            fetchPatients();
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const columns = [
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'full_name', headerName: 'Full Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'age', headerName: 'Age', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row.username)} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.username)} color="secondary">
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div>
            <AdminHeader/>
<section className="breadcrumb_part breadcrumb_bg">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breadcrumb_iner">
          <div className="breadcrumb_iner_item">
            <h2>Manage Patients</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            <div>
                <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '10px' }}>
                    Add Patient
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={patients} columns={columns} pageSize={5} checkboxSelection getRowId={(row) => row.username} />
                </div>

                {/* Add/Edit Patient Dialog */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{isEditing ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Username"
                            name="username"
                            value={formData.username || ''}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={isEditing}
                        />
                        <TextField
                            margin="dense"
                            label="Full Name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Injuries"
                            name="injuries"
                            value={formData.injuries}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            {isEditing ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <AdminFooter/>
        </div>
    );
};

export default ManagePatients;
