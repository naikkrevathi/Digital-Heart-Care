import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import DoctorNavbar from '../../Component/DoctorNavbar';
import DoctorHeader from '../../Component/DoctorHeader';
import DoctorFooter from '../../Component/DoctorFooter';

const AddECG = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        user: '',
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: '',
        seven: '',
        eight: '',
        type: '',
        image: null,
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

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('user', formData.user);
        formDataToSend.append('one', formData.one);
        formDataToSend.append('two', formData.two);
        formDataToSend.append('three', formData.three);
        formDataToSend.append('four', formData.four);
        formDataToSend.append('five', formData.five);
        formDataToSend.append('six', formData.six);
        formDataToSend.append('seven', formData.seven);
        formDataToSend.append('eight', formData.eight);
        formDataToSend.append('type', formData.type);
        formDataToSend.append('image', formData.image);

        try {
            const response = await axios.post('http://localhost:5000/api/ecg/add', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            setFormData({
                user: '',
                one: '',
                two: '',
                three: '',
                four: '',
                five: '',
                six: '',
                seven: '',
                eight: '',
                type: '',
                image: null,
            });
        } catch (error) {
            console.error('Error adding ECG:', error);
            alert('Unable to insert your data, kindly try again later.');
        }
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
            <h2>Add ECG</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            <div >
                <h2>Add ECG</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <TextField
                        select
                        margin="dense"
                        label="Select User"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        <MenuItem value="">
                            <em>Select User</em>
                        </MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.UHID} ({user.full_name})
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
    margin="dense"
    label="QRS (Normal: 80-120 ms)"
    name="one"
    type="number"
    value={formData.one}
    onChange={handleChange}
    fullWidth
    required
    helperText="Normal range: 80-120 ms"
/>
<TextField
    margin="dense"
    label="QT/QTcB (Normal: <440 ms)"
    name="two"
    type="number"
    value={formData.two}
    onChange={handleChange}
    fullWidth
    required
    helperText="Normal range: <440 ms"
/>
<TextField
    margin="dense"
    label="PR (Normal: 120-200 ms)"
    name="three"
    type="number"
    value={formData.three}
    onChange={handleChange}
    fullWidth
    required
    helperText="Normal range: 120-200 ms"
/>
<TextField
    margin="dense"
    label="P (Normal: 80-100 ms)"
    name="four"
    type="number"
    value={formData.four}
    onChange={handleChange}
    fullWidth
    required
    helperText="Normal range: 80-100 ms"
/>
<TextField
    margin="dense"
    label="RR (Normal: 600-1200 ms)"
    name="five"
    type="number"
    value={formData.five}
    onChange={handleChange}
    fullWidth
    required
    helperText="Normal range: 600-1200 ms"
/>
<TextField
    margin="dense"
    label="P/QRS/T (Normal: Varies)"
    name="six"
    type="number"
    value={formData.six}
    onChange={handleChange}
    fullWidth
    required
    helperText="Normal range: Varies"
/>
<TextField
    margin="dense"
    label="QTD/QTcBD (Normal: <50 ms)"
    name="seven"
    type="number"
    value={formData.seven}
    onChange={handleChange}
    fullWidth
    required
    helperText="Normal range: <50 ms"
/>
<TextField
    margin="dense"
    label="Sokolow (Normal: <35 mm)"
    name="eight"
    type="number"
    value={formData.eight}
    onChange={handleChange}
    fullWidth
    required
    helperText="Normal range: <35 mm"
/>

                    <TextField
                        margin="dense"
                        label="Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginTop: '20px' }}
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

export default AddECG;
