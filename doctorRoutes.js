const express = require('express');
const db = require('../db');
const nodemailer = require('nodemailer');
const router = express.Router();

// Add a new doctor
router.post('/doctors/add', async (req, res) => {
    const { username, full_name, email, specialization, qualification, contact } = req.body;

    const password = `PAss${Math.floor(100000 + Math.random() * 900000)}`;
    const appname = "Cardiology";
    const status = true;
    const image = 'user/doctor_image.jpg';

    const sqlDoctor = `INSERT INTO doctor_master (full_name, email, phone, username, doctor_status, image, specialization, qualification) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const sqlUser = `INSERT INTO user_master (username, type, password, status) VALUES (?, ?, ?, ?)`;

    try {
        // Insert into doctor_master
        await new Promise((resolve, reject) => {
            db.execute(sqlDoctor, [
                full_name,
                email,
                contact,
                username,
                status,
                image,
                specialization,
                qualification
            ], (err, result) => {
                if (err) {
                    console.error('Error inserting into doctor_master:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        // Insert into user_master
        await new Promise((resolve, reject) => {
            db.execute(sqlUser, [username, 'Doctor', password, status], (err, result) => {
                if (err) {
                    console.error('Error inserting into user_master:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"${appname}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `User Registration: ${appname}`,
            html: `Dear ${full_name},<br> You have recently registered to our webpage.<br> USERNAME: ${username}<br>PASSWORD: ${password}<br><br>Thank you,<br>Team ${appname}`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Doctor registered successfully!' });
    } catch (err) {
        console.error('Error in registration process:', err);
        res.status(500).json({ success: false, message: 'Unable to process, kindly try again later.' });
    }
});

// Delete a doctor by username
router.delete('/doctors/:username', async (req, res) => {
    const { username } = req.params;
    try {
        await db.execute('DELETE FROM doctor_master WHERE username = ?', [username]);
        await db.execute('DELETE FROM user_master WHERE username = ?', [username]);
        res.json({ success: true, message: 'Doctor deleted successfully.' });
    } catch (err) {
        console.error('Error deleting doctor:', err);
        res.status(500).send('Unable to delete doctor.');
    }
});

// Update a doctor's details
router.put('/doctors/:username', async (req, res) => {
    const { username } = req.params;
    const { full_name, email, specialization, qualification, contact, doctor_status } = req.body;

    const sqlUpdate = `UPDATE doctor_master 
                       SET full_name = ?, email = ?, phone = ?, specialization = ?, qualification = ?, doctor_status = ? 
                       WHERE username = ?`;

    try {
        await new Promise((resolve, reject) => {
            db.execute(sqlUpdate, [
                full_name,
                email,
                contact,
                specialization,
                qualification,
                doctor_status,
                username
            ], (err, result) => {
                if (err) {
                    console.error('Error updating doctor details:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        res.json({ success: true, message: 'Doctor details updated successfully.' });
    } catch (err) {
        console.error('Error updating doctor:', err);
        res.status(500).json({ success: false, message: 'Unable to update doctor details.' });
    }
});

// Get all doctors
router.get('/doctors', (req, res) => {
    db.query('SELECT * FROM doctor_master ORDER BY doctor_id DESC', (err, rows) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            return res.status(500).send('Unable to fetch doctors.');
        }
        res.json(rows);
    });
});

module.exports = router;
