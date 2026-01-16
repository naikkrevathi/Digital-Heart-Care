const express = require('express');
const db = require('../db');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/patients/add', async (req, res) => {
    console.log('Register endpoint hit');
    const { username, full_name, email, phone, gender, dob, age, address, injuries } = req.body;
    console.log('Request body:', req.body);
  
    const password = `PAss${Math.floor(100000 + Math.random() * 900000)}`;
    const uhid = `UHID${Math.floor(100000 + Math.random() * 900000)}`;
    const appname = "Cardiology";
    
    // Set default values for missing fields
    const status = true;
    const image = 'user/patient_image.jpg';
    
    const sqlPatient = `INSERT INTO patient_master (full_name, email, phone, username, status, image, UHID, gender, age, address, injuries, dob) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const sqlUser = `INSERT INTO user_master (username, type, password, status) VALUES (?, ?, ?, ?)`;
    
    try {
      // Insert into patient_master
      await new Promise((resolve, reject) => {
        db.execute(sqlPatient, [
          full_name, 
          email, 
          phone, 
          username, 
          status, 
          image, 
          uhid, 
          gender, 
          age, 
          address, 
          injuries, 
          dob
        ], (err, result) => {
          if (err) {
            console.error('Error inserting into patient_master:', err);
            return reject(err);
          }
          resolve(result);
        });
      });
  
      // Insert into user_master
      await new Promise((resolve, reject) => {
        db.execute(sqlUser, [username, 'Patient', password, status], (err, result) => {
          if (err) {
            console.error('Error inserting into user_master:', err);
            return reject(err);
          }
          resolve(result);
        });
      });
  
      // Email sending logic remains the same
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
        html: `Dear ${full_name},<br> You have recently registered to our webpage.<br> USERNAME: ${username}<br>PASSWORD: ${password}<br>UHID: ${uhid}<br><br>Thank you,<br>Team ${appname}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: 'User registered successfully!' });
    } catch (err) {
      console.error('Error in registration process:', err);
      res.status(500).json({ success: false, message: 'Unable to process, kindly try again later.' });
    }
  });

// Get all patients
router.get('/patients', (req, res) => {
    db.query('SELECT * FROM patient_master ORDER BY id DESC', (err, rows) => {
        if (err) {
            console.error('Error fetching patients:', err);
            return res.status(500).send('Unable to fetch patients.');
        }
        res.json(rows);
    });
});


// Get a single patient by username
router.get('/patients/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM patient_master WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(404).send('Patient not found.');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching patient:', err);
        res.status(500).send('Unable to fetch patient.');
    }
});

// Delete a patient by username
router.delete('/patients/:username', async (req, res) => {
    const { username } = req.params;
    try {
        await db.execute('DELETE FROM patient_master WHERE username = ?', [username]);
        await db.execute('DELETE FROM user_master WHERE username = ?', [username]);
        res.json({ success: true, message: 'Patient deleted successfully.' });
    } catch (err) {
        console.error('Error deleting patient:', err);
        res.status(500).send('Unable to delete patient.');
    }
});

// Update a patient
router.put('/patients/:username', async (req, res) => {
    const { username } = req.params;
    const { full_name, email, phone, gender, age, address, injuries, dob } = req.body;
    try {
        await db.execute(
            'UPDATE patient_master SET full_name = ?, email = ?, phone = ?, gender = ?, age = ?, address = ?, injuries = ?, dob = ? WHERE username = ?',
            [full_name, email, phone, gender, age, address, injuries, dob, username]
        );
        res.json({ success: true, message: 'Patient updated successfully.' });
    } catch (err) {
        console.error('Error updating patient:', err);
        res.status(500).send('Unable to update patient.');
    }
});


module.exports = router;