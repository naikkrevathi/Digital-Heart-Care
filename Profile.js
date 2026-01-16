import React, { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
// import FormDataDebugger from './FormDataDebugger';

const Profile = () => {
    const [formData, setFormData] = useState({
        currentUsername: '',
        username: '',
        name: '',
        email: '',
        contact: '',
        injuries: '',
        address: '',
        age: '',
        dob: '',
        gender: '',
        image: null,
        currentImageUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const currentUsername = localStorage.getItem('username');
                console.log('Current Username:', currentUsername);
                if (!currentUsername) {
                    throw new Error('Username not found');
                }

                const response = await axios.get('http://localhost:5000/api/getProfile', {
                    params: { username: currentUsername }
                });

                const profileData = response.data;
                const formattedDob = profileData.dob ? new Date(profileData.dob).toISOString().split('T')[0] : '';

                setFormData(prev => ({
                    ...prev,
                    currentUsername: currentUsername,
                    username: profileData.username || '',
                    name: profileData.full_name || '',
                    email: profileData.email || '',
                    contact: profileData.phone || '',
                    injuries: profileData.injuries || '',
                    address: profileData.address || '',
                    age: profileData.age || '',
                    dob: formattedDob,
                    gender: profileData.gender || '',
                    currentImageUrl: profileData.image ? `http://localhost:5000/${profileData.image}` : ''
                }));
            } catch (error) {
                console.error('Error fetching profile:', error);
                alert('Unable to load profile data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Get currentUsername from both state and localStorage as backup
        const currentUser = formData.currentUsername || localStorage.getItem('username');
        
        if (!currentUser) {
            alert('User session expired. Please login again.');
            setIsSubmitting(false);
            return;
        }

        console.log('Submitting with currentUsername:', currentUser);
        
        const formDataToSend = new FormData();
        // Explicitly set currentUsername with proper encoding
        formDataToSend.append('currentUsername', currentUser);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('contact', formData.contact);
        formDataToSend.append('injuries', formData.injuries);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('age', formData.age);
        formDataToSend.append('dob', formData.dob);
        formDataToSend.append('gender', formData.gender);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }
        
        // Debug: Check what's in the FormData
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            // Alternative approach: Use a direct object instead of FormData
            // Sometimes the express-fileupload middleware has issues parsing FormData correctly
            if (!formData.image) {
                // If no image, use regular JSON approach
                const jsonData = {
                    currentUsername: currentUser,
                    username: formData.username,
                    name: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                    injuries: formData.injuries,
                    address: formData.address,
                    age: formData.age,
                    dob: formData.dob,
                    gender: formData.gender
                };
                
                console.log('Sending JSON data:', jsonData);
                
                const response = await axios.put('http://localhost:5000/api/updateProfile', jsonData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                handleSuccessResponse(response);
            } else {
                // If there's an image, use FormData
                console.log('Sending FormData with image');
                const response = await axios.put('http://localhost:5000/api/updateProfile', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
                handleSuccessResponse(response);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(error.response?.data?.message || 'Unable to update profile. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
        
        function handleSuccessResponse(response) {
            // Update localStorage with new username only after successful API response
            if (formData.username !== currentUser) {
                localStorage.setItem('username', formData.username);
                console.log('Updated localStorage username to:', formData.username);
            }
            
            alert(response.data.message);
            // Redirect or reload with a short timeout to ensure localStorage is updated
            setTimeout(() => {
                window.location.reload();
            }, 300); // Increased timeout for safety
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Update Profile</h2>
            
            {/* Debug helper - remove after fixing */}
            {/* <FormDataDebugger formData={formData} /> */}
            
            <form onSubmit={handleSubmit}>
                {formData.currentImageUrl && (
                    <div style={{ marginBottom: '20px' }}>
                        <p>Current Profile Image:</p>
                        <img 
                            src={formData.currentImageUrl} 
                            alt="Profile" 
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    </div>
                )}
                <TextField
                    margin="dense"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    margin="dense"
                    label="Full Name"
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
                <TextField
                    margin="dense"
                    label="Contact"
                    name="contact"
                    type="tel"
                    value={formData.contact}
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
                    multiline
                    rows={3}
                />
                <TextField
                    margin="dense"
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={3}
                />
                <TextField
                    margin="dense"
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
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
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    fullWidth
                    required
                    select
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                </TextField>
                <div style={{ marginTop: '20px' }}>
                    <label>Update Profile Image: </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Update Profile'}
                </Button>
            </form>
        </div>
    );
};

export default Profile;