import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User', station_id: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/users'); // API endpoint to fetch users
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpen = () => {
    setIsEditing(false);
    setFormData({ name: '', email: '', password: '', role: 'User' });
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
      if (isEditing) {
        // Update user
        await axios.put(`http://localhost:5000/api/auth/users/${editUserId}`, formData);
      } else {
        // Add new user
        await axios.post('http://localhost:5000/api/auth/register', formData);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user_id) => {
    const user = users.find((user) => user.user_id === user_id);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role});
    setEditUserId(user_id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (user_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${user_id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    { field: 'user_id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.user_id)} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.user_id)} color="secondary">
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <AdminNavbar />
      <div style={{ marginLeft: '270px', padding: '20px', width: '100%' }}>
        <h2>Manage Users</h2>
        <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '10px' }}>
          Add User
        </Button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={users} columns={columns} pageSize={5} checkboxSelection getRowId={(row) => row.user_id} />
        </div>

        {/* Add/Edit User Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={formData.name}
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
            {!isEditing && (
              <TextField
                margin="dense"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            )}
            <TextField
              margin="dense"
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
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
    </div>
  );
};

export default ManageUsers;
