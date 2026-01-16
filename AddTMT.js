import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import DoctorNavbar from '../../Component/DoctorNavbar';
import DoctorFooter from '../../Component/DoctorFooter';
import DoctorHeader from '../../Component/DoctorHeader';
const AddTMT = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        patient_id: '',
        stage: '',
        stage_time: '',
        speed_grade: '',
        hr: '',
        bp: '',
        rpp: '',
        comments: '',
        st: '',
        total_exercise_time: '',
        max_workload: '',
        max_hr: '',
        distance_covered: '',
        max_bp: '',
        test_date: '',
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
            const response = await axios.post('http://localhost:5000/api/tmt/add', formData);
            alert(response.data.message);
            setFormData({
                patient_id: '',
                stage: '',
                stage_time: '',
                speed_grade: '',
                hr: '',
                bp: '',
                rpp: '',
                comments: '',
                st: '',
                total_exercise_time: '',
                max_workload: '',
                max_hr: '',
                distance_covered: '',
                max_bp: '',
                test_date: '',
            });
        } catch (error) {
            console.error('Error adding TMT:', error);
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
            <h2>Add TMT</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            <div >
                <h2>Add TMT</h2>
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
                        label="Stage"
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Stage Time"
                        name="stage_time"
                        value={formData.stage_time}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Speed Grade"
                        name="speed_grade"
                        value={formData.speed_grade}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Heart Rate (HR)"
                        name="hr"
                        value={formData.hr}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Blood Pressure (BP)"
                        name="bp"
                        value={formData.bp}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Rate Pressure Product (RPP)"
                        name="rpp"
                        value={formData.rpp}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="ST"
                        name="st"
                        value={formData.st}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Total Exercise Time"
                        name="total_exercise_time"
                        value={formData.total_exercise_time}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Max Workload"
                        name="max_workload"
                        value={formData.max_workload}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Max Heart Rate (HR)"
                        name="max_hr"
                        value={formData.max_hr}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Distance Covered"
                        name="distance_covered"
                        value={formData.distance_covered}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Max Blood Pressure (BP)"
                        name="max_bp"
                        value={formData.max_bp}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Test Date"
                        name="test_date"
                        type="date"
                        value={formData.test_date}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
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

export default AddTMT;
