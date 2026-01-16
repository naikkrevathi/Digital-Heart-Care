import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';
import AdminFooter from '../../Component/AdminFooter';
import AdminHeader from '../../Component/AdminHeader';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        specialization: '',
        qualification: '',
        contact: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editUsername, setEditUsername] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleOpen = () => {
        setIsEditing(false);
        setFormData({
            username: '',
            full_name: '',
            email: '',
            specialization: '',
            qualification: '',
            contact: '',
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
                specialization: formData.specialization,
                qualification: formData.qualification,
                contact: formData.contact,
            };

            if (isEditing) {
                await axios.put(`http://localhost:5000/api/doctors/${editUsername}`, payload);
            } else {
                await axios.post('http://localhost:5000/api/doctors/add', payload);
            }
            fetchDoctors();
            handleClose();
        } catch (error) {
            console.error('Error saving doctor:', error);
            alert('Error saving doctor: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (username) => {
        const doctor = doctors.find((doctor) => doctor.username === username);
        setFormData({
            username: doctor.username,
            full_name: doctor.full_name,
            email: doctor.email,
            specialization: doctor.specialization,
            qualification: doctor.qualification,
            contact: doctor.phone,
        });
        setEditUsername(username);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (username) => {
        try {
            await axios.delete(`http://localhost:5000/api/doctors/${username}`);
            fetchDoctors();
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    const columns = [
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'full_name', headerName: 'Full Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'specialization', headerName: 'Specialization', width: 200 },
        { field: 'qualification', headerName: 'Qualification', width: 200 },
        { field: 'phone', headerName: 'Contact', width: 150 },
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
        <div >
                     <AdminHeader />
<section className="breadcrumb_part breadcrumb_bg">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breadcrumb_iner">
          <div className="breadcrumb_iner_item">
            <h2>Manage Doctor</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            <div >
                <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '10px' }}>
                    Add Doctor
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={doctors} columns={columns} pageSize={5} checkboxSelection getRowId={(row) => row.username} />
                </div>

                {/* Add/Edit Doctor Dialog */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{isEditing ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
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
                            label="Specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Qualification"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Contact"
                            name="contact"
                            value={formData.contact}
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
            <AdminFooter />
        </div>
    );
};

export default ManageDoctors;
