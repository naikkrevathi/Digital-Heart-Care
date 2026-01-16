import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import DoctorFooter from '../../Component/DoctorFooter';
import DoctorHeader from '../../Component/DoctorHeader';

const AddECHO = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        patient_id: '',
        order_date: '',
        order_no: '',
        ipno: '',
        bed_no: '',
        aortic_root: '',
        left_atrium: '',
        ivsd: '',
        lvpwd: '',
        lvidd: '',
        lvids: '',
        lvef: '',
        impression: '',
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/patients');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/echo/add', formData);
            alert(response.data.message);
            setFormData({
                patient_id: '',
                order_date: '',
                order_no: '',
                ipno: '',
                bed_no: '',
                aortic_root: '',
                left_atrium: '',
                ivsd: '',
                lvpwd: '',
                lvidd: '',
                lvids: '',
                lvef: '',
                impression: '',
            });
        } catch (error) {
            console.error('Error adding ECHO:', error);
            alert('Unable to insert your data, kindly try again later.');
        }
    };

    return (
        <div >
                     <DoctorHeader />
<section className="breadcrumb_part breadcrumb_bg">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breadcrumb_iner">
          <div className="breadcrumb_iner_item">
            <h2>Add ECHO</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            <div>
                <h2>Add ECHO</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <TextField
                        select
                        margin="dense"
                        label="Select Patient"
                        name="patient_id"
                        value={formData.patient_id}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        <MenuItem value="">
                            <em>Select Patient</em>
                        </MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.UHID} ({user.full_name})
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        label="Order Date"
                        name="order_date"
                        type="date"
                        value={formData.order_date}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Order No"
                        name="order_no"
                        value={formData.order_no}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="IP No"
                        name="ipno"
                        value={formData.ipno}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Bed No"
                        name="bed_no"
                        value={formData.bed_no}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Aortic Root"
                        name="aortic_root"
                        value={formData.aortic_root}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Left Atrium"
                        name="left_atrium"
                        value={formData.left_atrium}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="IVSd"
                        name="ivsd"
                        value={formData.ivsd}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="LVPWd"
                        name="lvpwd"
                        value={formData.lvpwd}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="LVIDd"
                        name="lvidd"
                        value={formData.lvidd}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="LVIDs"
                        name="lvids"
                        value={formData.lvids}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="LVEF"
                        name="lvef"
                        value={formData.lvef}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Impression"
                        name="impression"
                        value={formData.impression}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                    >
                        Submit
                    </Button>
                </form>
            </div>
            <DoctorFooter/>
        </div>
    );
};

export default AddECHO;
