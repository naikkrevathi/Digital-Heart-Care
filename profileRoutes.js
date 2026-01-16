const express = require('express');
const db = require('../db');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Get profile data
router.get('/getProfile', async (req, res) => {
    try {
        const { username } = req.query;
        
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const query = 'SELECT * FROM patient_master WHERE username = ?';
        db.query(query, [username], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            res.json(results[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update profile
router.put('/updateProfile', async (req, res) => {
    try {
        // Debug the incoming request
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Full request body:', req.body);
        console.log('Files:', req.files);
        
        // Extract currentUsername specifically - ensure it's a string
        const currentUsername = String(req.body.currentUsername || '');
        const { username, name, email, contact, injuries, address, age, dob, gender } = req.body;

        console.log('Extracted currentUsername:', currentUsername);
        
        if (!currentUsername || currentUsername === 'undefined' || currentUsername === 'null') {
            return res.status(400).json({ message: 'Current username is required.' });
        }

        console.log('Processing update for currentUsername:', currentUsername);
        console.log('Request body details:', req.body);

        // Check if new username already exists (but only if username is being changed)
        if (currentUsername !== username) {
            const checkUsernameQuery = 'SELECT COUNT(*) as count FROM patient_master WHERE username = ? AND username != ?';
            db.query(checkUsernameQuery, [username, currentUsername], async (checkError, checkResults) => {
                if (checkError) {
                    console.error('Error checking username:', checkError);
                    return res.status(500).json({ message: 'Database error' });
                }

                if (checkResults[0].count > 0) {
                    return res.status(400).json({ message: 'Username already exists. Please choose another.' });
                }
                
                // Continue with profile update if username is unique
                proceedWithUpdate();
            });
        } else {
            // If username isn't changing, proceed with update directly
            proceedWithUpdate();
        }

        async function proceedWithUpdate() {
            let imagePath = null;

            // Handle image upload if present
            if (req.files && req.files.image) {
                const file = req.files.image;
                const fileName = `${currentUsername}-${Date.now()}${path.extname(file.name)}`;
                imagePath = path.join('uploads', fileName);

                await file.mv(path.join(__dirname, '../../', imagePath));

                // Delete old image if exists
                db.query('SELECT image FROM patient_master WHERE username = ?', [currentUsername], async (error, results) => {
                    if (error) {
                        console.error('Error fetching existing image:', error);
                        return res.status(500).json({ message: 'Database error' });
                    }

                    if (results[0]?.image) {
                        try {
                            const oldImagePath = path.join(__dirname, '../../', results[0].image);
                            if (fs.existsSync(oldImagePath)) {
                                fs.unlinkSync(oldImagePath);
                            }
                        } catch (err) {
                            console.error('Error deleting old image:', err);
                        }
                    }
                });
            }

            const query = `
                UPDATE patient_master 
                SET 
                    username = ?,
                    full_name = ?, 
                    email = ?, 
                    phone = ?, 
                    ${imagePath ? 'image = ?, ' : ''}
                    injuries = ?, 
                    dob = ?, 
                    address = ?, 
                    age = ?, 
                    gender = ? 
                WHERE username = ?
            `;

            const params = imagePath
                ? [username, name, email, contact, imagePath, injuries, dob, address, age, gender, currentUsername]
                : [username, name, email, contact, injuries, dob, address, age, gender, currentUsername];

            console.log('Query:', query);
            console.log('Parameters:', params);

            db.query(query, params, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Database error' });
                }

                if (results.affectedRows > 0) {
                    res.json({ 
                        message: 'Profile updated successfully!',
                        usernameChanged: username !== currentUsername
                    });
                } else {
                    res.status(400).json({ message: 'Unable to update profile. Please check the provided data.' });
                }
            });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;